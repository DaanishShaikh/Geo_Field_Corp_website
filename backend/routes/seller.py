from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from backend.models import db, Receipt, User
from backend.services.pricing_service import calculate_esg_impact
from backend.services.qr_service import generate_qr_base64
from backend.services.audit_service import log_audit
import random
from datetime import datetime

seller_bp = Blueprint("seller", __name__, url_prefix="/api/seller")

def check_seller():
    if not current_user.is_authenticated or current_user.role != "seller":
        return jsonify({"error": "Unauthorized. Seller access only."}), 403
    if current_user.status != "approved":
        return jsonify({"error": f"Account status is {current_user.status}."}), 403
    return None

@seller_bp.route("/dashboard", methods=["GET"])
@login_required
def dashboard():
    auth_err = check_seller()
    if auth_err: return auth_err

    receipts = Receipt.query.filter_by(seller_id=current_user.id).order_by(Receipt.created_at.desc()).all()
    settled_receipts = [r for r in receipts if r.status == "settled"]

    total_volume = sum((r.measured_volume or r.requested_volume or 0) for r in settled_receipts)
    total_earnings = sum((r.amount or 0) for r in settled_receipts)
    pending_volume = sum((r.requested_volume or 0) for r in receipts if r.status == "created")

    esg = calculate_esg_impact(total_volume)
    
    site_qr_code = current_user.seller_profile.static_qr_code if current_user.seller_profile else f"RUCO-SITE-{current_user.id}"
    site_qr_data_url = generate_qr_base64(site_qr_code)

    # Find currently assigned agent for this seller if any
    from backend.models import RouteStop
    active_stop = RouteStop.query.filter_by(seller_id=current_user.id).order_by(RouteStop.scheduled_date.desc(), RouteStop.id.desc()).first()
    assigned_agent = None
    if active_stop and active_stop.agent:
        ag = active_stop.agent
        ag_prof = ag.agent_profile
        assigned_agent = {
            "id": ag.id,
            "name": ag.name,
            "phone": ag.phone or "+91 94480 33221",
            "email": ag.email,
            "vehicle_no": ag_prof.vehicle_no if ag_prof else "KA-02-EV-4412",
            "stop_order": active_stop.stop_order,
            "status": active_stop.status,
            "scheduled_date": active_stop.scheduled_date.isoformat() if active_stop.scheduled_date else None
        }

    return jsonify({
        "seller": current_user.to_dict(),
        "assigned_agent": assigned_agent,
        "stats": {
            "total_volume_liters": round(total_volume, 2),
            "total_earnings_inr": round(total_earnings, 2),
            "pending_volume_liters": round(pending_volume, 2),
            "settled_count": len(settled_receipts),
            "total_receipts_count": len(receipts),
            "esg": esg
        },
        "site_qr": {
            "code": site_qr_code,
            "data_url": site_qr_data_url
        },
        "recent_receipts": [r.to_dict() for r in receipts[:10]]
    }), 200


@seller_bp.route("/receipts", methods=["GET"])
@login_required
def get_receipts():
    auth_err = check_seller()
    if auth_err: return auth_err

    receipts = Receipt.query.filter_by(seller_id=current_user.id).order_by(Receipt.created_at.desc()).all()
    return jsonify({
        "receipts": [r.to_dict() for r in receipts]
    }), 200


@seller_bp.route("/receipts", methods=["POST"])
@login_required
def create_receipt():
    auth_err = check_seller()
    if auth_err: return auth_err

    data = request.get_json() or {}
    try:
        req_vol = float(data.get("requested_volume", 0))
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid requested volume"}), 400

    if req_vol <= 0:
        return jsonify({"error": "Requested volume must be greater than 0"}), 400

    # Auto-generate receipt ID and receipt QR
    rct_suffix = random.randint(1000, 9999)
    receipt_id = f"RCT-{rct_suffix}"
    while Receipt.query.get(receipt_id):
        receipt_id = f"RCT-{random.randint(1000, 9999)}"

    receipt_qr = f"RUCO-RCT-{receipt_id}-{random.randint(100, 999)}"

    receipt = Receipt(
        id=receipt_id,
        seller_id=current_user.id,
        receipt_qr=receipt_qr,
        requested_volume=req_vol,
        payment_status="pending",
        status="created",
        flagged=False,
        is_immutable=False
    )
    db.session.add(receipt)
    log_audit(current_user.id, "seller", "Created Collection Receipt", "Receipt", receipt.id, f"Requested Volume: {req_vol}L")
    db.session.commit()

    receipt_dict = receipt.to_dict()
    receipt_dict["qr_data_url"] = generate_qr_base64(receipt.receipt_qr)

    return jsonify({
        "message": "Collection receipt generated successfully",
        "receipt": receipt_dict
    }), 201


@seller_bp.route("/receipts/<receipt_id>/qr", methods=["GET"])
@login_required
def get_receipt_qr(receipt_id):
    auth_err = check_seller()
    if auth_err: return auth_err

    receipt = Receipt.query.filter_by(id=receipt_id, seller_id=current_user.id).first()
    if not receipt:
        return jsonify({"error": "Receipt not found"}), 404

    qr_url = generate_qr_base64(receipt.receipt_qr)
    return jsonify({
        "receipt_id": receipt.id,
        "receipt_qr": receipt.receipt_qr,
        "qr_data_url": qr_url
    }), 200
