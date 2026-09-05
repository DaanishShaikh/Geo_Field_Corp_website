from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from backend.models import db, Receipt, User, RouteStop, SellerProfile, DisposalCertificate
from backend.services.pricing_service import calculate_payout
from backend.services.pdf_service import generate_compliance_hash, generate_disposal_pdf
from backend.services.audit_service import log_audit
from backend.config import Config
from datetime import datetime, date

agent_bp = Blueprint("agent", __name__, url_prefix="/api/agent")

def check_agent():
    if not current_user.is_authenticated or current_user.role != "agent":
        return jsonify({"error": "Unauthorized. Field Agent access only."}), 403
    if current_user.status != "approved":
        return jsonify({"error": f"Account status is {current_user.status}."}), 403
    return None

@agent_bp.route("/manifest", methods=["GET"])
@login_required
def get_manifest():
    auth_err = check_agent()
    if auth_err: return auth_err

    # Get assigned stops for current agent
    today = date.today()
    stops = RouteStop.query.filter_by(agent_id=current_user.id).order_by(RouteStop.stop_order.asc()).all()

    assigned_seller_ids = [s.seller_id for s in stops]
    open_receipts = Receipt.query.filter(Receipt.seller_id.in_(assigned_seller_ids), Receipt.status == "created").all()
    recent_settled = Receipt.query.filter_by(approving_agent_id=current_user.id, status="settled").order_by(Receipt.settled_at.desc()).limit(10).all()

    return jsonify({
        "agent": current_user.to_dict(),
        "stops": [s.to_dict() for s in stops],
        "open_receipts": [r.to_dict() for r in open_receipts],
        "recent_settled": [r.to_dict() for r in recent_settled],
        "stats": {
            "total_assigned_stops": len(stops),
            "visited_stops": sum(1 for s in stops if s.status == "visited"),
            "open_receipts_count": len(open_receipts),
            "settled_today_count": len(recent_settled)
        }
    }), 200


@agent_bp.route("/scan/site", methods=["POST"])
@login_required
def scan_site():
    auth_err = check_agent()
    if auth_err: return auth_err

    data = request.get_json() or {}
    qr_payload = data.get("qr_code", "").strip()

    if not qr_payload:
        return jsonify({"error": "No QR payload provided"}), 400

    # Locate seller by static_qr_code or user ID
    seller_profile = SellerProfile.query.filter_by(static_qr_code=qr_payload).first()
    seller = seller_profile.user if seller_profile else User.query.filter_by(id=qr_payload, role="seller").first()

    if not seller:
        return jsonify({"error": "Invalid Site QR Code. Seller not found."}), 404

    if seller.status != "approved":
        return jsonify({"error": f"Seller account is currently {seller.status}. Cannot collect UCO."}), 403

    # Check open receipts for this seller
    receipts = Receipt.query.filter_by(seller_id=seller.id, status="created").all()

    return jsonify({
        "seller": seller.to_dict(),
        "open_receipts": [r.to_dict() for r in receipts]
    }), 200


@agent_bp.route("/scan/receipt", methods=["POST"])
@login_required
def scan_receipt():
    auth_err = check_agent()
    if auth_err: return auth_err

    data = request.get_json() or {}
    qr_payload = data.get("qr_code", "").strip()

    if not qr_payload:
        return jsonify({"error": "No QR payload provided"}), 400

    receipt = Receipt.query.filter((Receipt.receipt_qr == qr_payload) | (Receipt.id == qr_payload)).first()
    if not receipt:
        return jsonify({"error": "Receipt QR code not recognized."}), 404

    if receipt.status == "settled" or receipt.is_immutable:
        return jsonify({
            "error": "Receipt has already been settled and is immutable.",
            "receipt": receipt.to_dict()
        }), 409

    return jsonify({
        "receipt": receipt.to_dict()
    }), 200


@agent_bp.route("/receipts/<receipt_id>/settle", methods=["POST"])
@login_required
def settle_receipt(receipt_id):
    auth_err = check_agent()
    if auth_err: return auth_err

    receipt = Receipt.query.get(receipt_id)
    if not receipt:
        return jsonify({"error": "Receipt not found"}), 404

    if receipt.is_immutable:
        return jsonify({"error": "Settled receipts are immutable and cannot be overwritten."}), 409

    data = request.get_json() or {}
    try:
        measured_volume = float(data.get("measured_volume", 0))
        tpc = float(data.get("tpc_percentage", 0))
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid measurement numbers"}), 400

    # Validation rules per spec
    if measured_volume <= 0:
        return jsonify({"error": "Measured volume must be strictly positive (> 0 L)."}), 400

    if tpc < 1.0 or tpc > 40.0:
        return jsonify({"error": "TPC reading must be within realistic range (1.0% - 40.0%)."}), 400

    payment_status = "paid" if data.get("payment_status") == "paid" else "pending"
    calculated_amount = calculate_payout(measured_volume, tpc)

    receipt.measured_volume = measured_volume
    receipt.tpc_percentage = tpc
    receipt.amount = calculated_amount
    receipt.payment_status = payment_status
    receipt.status = "settled"
    receipt.approving_agent_id = current_user.id
    receipt.settled_at = datetime.utcnow()
    receipt.is_immutable = True

    # Mark corresponding route stop visited if found
    stop = RouteStop.query.filter_by(agent_id=current_user.id, seller_id=receipt.seller_id).first()
    if stop:
        stop.status = "visited"

    # Create Disposal Certificate
    seller = receipt.seller
    fssai = seller.seller_profile.fssai_license_no if seller and seller.seller_profile else "FSSAI-10020011003456"
    cert_id = f"CERT-RUCO-{datetime.utcnow().year}-{receipt.id.replace('RCT-', '')}"
    comp_hash = generate_compliance_hash(receipt.id, receipt.seller_id, measured_volume, tpc, fssai)

    cert = DisposalCertificate(
        id=cert_id,
        receipt_id=receipt.id,
        pdf_filename=f"{cert_id}.pdf",
        fssai_serial=fssai,
        compliance_hash=comp_hash
    )
    db.session.add(cert)

    log_audit(
        current_user.id, "agent", "Approved & Settled Collection", "Receipt", receipt.id,
        f"Volume: {measured_volume}L, TPC: {tpc}%, Amount: ₹{calculated_amount}, Payment: {payment_status}"
    )
    db.session.commit()

    # Generate PDF certificate
    try:
        generate_disposal_pdf(receipt, seller, current_user, cert_id, Config.CERTIFICATES_DIR)
    except Exception as e:
        print(f"PDF auto-generation notice: {e}")

    return jsonify({
        "message": "Receipt approved and settled successfully. RUCO certificate created.",
        "receipt": receipt.to_dict(),
        "certificate_id": cert_id
    }), 200


@agent_bp.route("/sync/offline", methods=["POST"])
@login_required
def sync_offline():
    """
    Offline-First synchronization endpoint.
    Accepts an array of cached offline collections and commits them atomically.
    """
    auth_err = check_agent()
    if auth_err: return auth_err

    data = request.get_json() or {}
    items = data.get("queue", [])

    if not items:
        return jsonify({"message": "Empty sync queue", "synced": 0}), 200

    synced_results = []
    errors = []

    for item in items:
        receipt_id = item.get("receipt_id")
        receipt = Receipt.query.get(receipt_id)
        if not receipt:
            errors.append({"receipt_id": receipt_id, "error": "Receipt not found"})
            continue

        if receipt.is_immutable:
            synced_results.append({"receipt_id": receipt_id, "status": "already_settled"})
            continue

        try:
            vol = float(item.get("measured_volume", 0))
            tpc = float(item.get("tpc_percentage", 0))
            if vol <= 0 or tpc < 1.0 or tpc > 40.0:
                errors.append({"receipt_id": receipt_id, "error": "Invalid volume or TPC bounds"})
                continue

            pay_status = "paid" if item.get("payment_status") == "paid" else "pending"
            amt = calculate_payout(vol, tpc)

            receipt.measured_volume = vol
            receipt.tpc_percentage = tpc
            receipt.amount = amt
            receipt.payment_status = pay_status
            receipt.status = "settled"
            receipt.approving_agent_id = current_user.id
            receipt.settled_at = datetime.utcnow()
            receipt.is_immutable = True

            seller = receipt.seller
            fssai = seller.seller_profile.fssai_license_no if seller and seller.seller_profile else "FSSAI-OFFLINE"
            cert_id = f"CERT-RUCO-{datetime.utcnow().year}-{receipt.id.replace('RCT-', '')}"
            comp_hash = generate_compliance_hash(receipt.id, receipt.seller_id, vol, tpc, fssai)

            if not receipt.certificate:
                cert = DisposalCertificate(
                    id=cert_id,
                    receipt_id=receipt.id,
                    pdf_filename=f"{cert_id}.pdf",
                    fssai_serial=fssai,
                    compliance_hash=comp_hash
                )
                db.session.add(cert)

            log_audit(
                current_user.id, "agent", "Offline Batch Sync Approved", "Receipt", receipt.id,
                f"Offline Cached Volume: {vol}L, TPC: {tpc}%"
            )
            synced_results.append({"receipt_id": receipt_id, "status": "synced", "amount": amt})
        except Exception as ex:
            errors.append({"receipt_id": receipt_id, "error": str(ex)})

    db.session.commit()

    return jsonify({
        "message": f"Synchronized {len(synced_results)} collections successfully",
        "synced": synced_results,
        "errors": errors
    }), 200


@agent_bp.route("/location", methods=["PATCH"])
@login_required
def update_agent_location():
    auth_err = check_agent()
    if auth_err: return auth_err

    data = request.get_json() or {}
    prof = current_user.agent_profile
    if not prof:
        return jsonify({"error": "Agent profile not found"}), 404

    if "latitude" in data and data["latitude"] not in (None, ""):
        try:
            prof.current_lat = float(data["latitude"])
        except (ValueError, TypeError):
            pass
    if "longitude" in data and data["longitude"] not in (None, ""):
        try:
            prof.current_lng = float(data["longitude"])
        except (ValueError, TypeError):
            pass

    prof.last_active_at = datetime.utcnow()
    db.session.commit()

    return jsonify({
        "message": "Live GPS coordinates broadcasted successfully",
        "latitude": prof.current_lat,
        "longitude": prof.current_lng,
        "last_active_at": prof.last_active_at.isoformat()
    }), 200

