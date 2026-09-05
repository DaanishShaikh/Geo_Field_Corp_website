from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from backend.models import db, User, Receipt, RateCard, AuditLog, RouteStop, BiodieselBatch
from backend.services.audit_service import log_audit
from datetime import datetime, date

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")

def check_admin():
    if not current_user.is_authenticated or current_user.role != "admin":
        return jsonify({"error": "Unauthorized. Super Admin access only."}), 403
    return None

@admin_bp.route("/overview", methods=["GET"])
@login_required
def overview():
    auth_err = check_admin()
    if auth_err: return auth_err

    pending_users = User.query.filter_by(status="pending").all()
    all_receipts = Receipt.query.order_by(Receipt.created_at.desc()).all()
    flagged_receipts = [r for r in all_receipts if r.flagged]
    active_agents = User.query.filter_by(role="agent", status="approved").all()
    active_sellers = User.query.filter_by(role="seller", status="approved").all()
    
    total_volume_collected = sum((r.measured_volume or 0) for r in all_receipts if r.status == "settled")
    total_payout = sum((r.amount or 0) for r in all_receipts if r.status == "settled")

    rate_card = RateCard.query.order_by(RateCard.id.desc()).first()
    if not rate_card:
        rate_card = RateCard(base_rate=55.0, low_tpc_bonus=5.0, high_tpc_penalty=8.0)
        db.session.add(rate_card)
        db.session.commit()

    manifest_stops = RouteStop.query.order_by(RouteStop.scheduled_date.desc(), RouteStop.stop_order.asc()).all()

    return jsonify({
        "stats": {
            "pending_approvals_count": len(pending_users),
            "total_receipts_count": len(all_receipts),
            "flagged_receipts_count": len(flagged_receipts),
            "active_agents_count": len(active_agents),
            "active_sellers_count": len(active_sellers),
            "total_volume_collected_liters": round(total_volume_collected, 2),
            "total_payout_inr": round(total_payout, 2)
        },
        "pending_users": [u.to_dict() for u in pending_users],
        "flagged_receipts": [r.to_dict() for r in flagged_receipts],
        "manifest_stops": [s.to_dict() for s in manifest_stops],
        "rate_card": rate_card.to_dict()
    }), 200


@admin_bp.route("/users", methods=["GET"])
@login_required
def list_users():
    auth_err = check_admin()
    if auth_err: return auth_err

    role = request.args.get("role")
    status = request.args.get("status")

    query = User.query
    if role:
        query = query.filter_by(role=role)
    if status:
        query = query.filter_by(status=status)

    users = query.order_by(User.created_at.desc()).all()
    return jsonify({"users": [u.to_dict() for u in users]}), 200


@admin_bp.route("/users/<user_id>/status", methods=["PATCH"])
@login_required
def update_user_status(user_id):
    auth_err = check_admin()
    if auth_err: return auth_err

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json() or {}
    new_status = data.get("status")

    if new_status not in ["approved", "rejected", "blacklisted", "pending"]:
        return jsonify({"error": "Invalid status value"}), 400

    old_status = user.status
    user.status = new_status

    if user.role == "seller" and user.seller_profile and new_status == "approved":
        user.seller_profile.kyc_status = "Verified"

    log_audit(
        current_user.id, "admin", f"Updated User Status ({old_status} -> {new_status})",
        "User", user.id, f"User: {user.name} ({user.email})"
    )
    db.session.commit()

    return jsonify({
        "message": f"User status updated to {new_status}",
        "user": user.to_dict()
    }), 200


@admin_bp.route("/users/<user_id>", methods=["DELETE"])
@login_required
def delete_user(user_id):
    """Super Admin endpoint to permanently delete a seller or agent account."""
    auth_err = check_admin()
    if auth_err: return auth_err

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.id == current_user.id or user.role == "admin":
        return jsonify({"error": "Super Admin account cannot be deleted."}), 400

    user_name = user.name
    user_role = user.role
    user_email = user.email

    # Clean up associated route stops
    RouteStop.query.filter((RouteStop.seller_id == user.id) | (RouteStop.agent_id == user.id)).delete(synchronize_session=False)

    log_audit(
        current_user.id, "admin", f"Deleted {user_role.capitalize()} Account",
        "User", user.id, f"Deleted user: {user_name} ({user_email})"
    )

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        "message": f"Account for {user_name} ({user_role}) deleted permanently."
    }), 200


@admin_bp.route("/receipts", methods=["GET"])
@login_required
def list_receipts():
    auth_err = check_admin()
    if auth_err: return auth_err

    query = Receipt.query
    flagged = request.args.get("flagged")
    status = request.args.get("status")

    if flagged is not None:
        query = query.filter_by(flagged=(flagged.lower() == "true"))
    if status:
        query = query.filter_by(status=status)

    receipts = query.order_by(Receipt.created_at.desc()).all()
    return jsonify({"receipts": [r.to_dict() for r in receipts]}), 200


@admin_bp.route("/receipts/<receipt_id>/flag", methods=["POST"])
@login_required
def toggle_flag_receipt(receipt_id):
    auth_err = check_admin()
    if auth_err: return auth_err

    receipt = Receipt.query.get(receipt_id)
    if not receipt:
        return jsonify({"error": "Receipt not found"}), 404

    data = request.get_json() or {}
    reason = data.get("reason", "Flagged by Super Admin for inspection")

    receipt.flagged = not receipt.flagged
    receipt.flag_reason = reason if receipt.flagged else None

    action_label = "Flagged Receipt for Inspection" if receipt.flagged else "Resolved/Cleared Receipt Flag"
    log_audit(
        current_user.id, "admin", action_label,
        "Receipt", receipt.id, f"Reason: {reason}"
    )
    db.session.commit()

    return jsonify({
        "message": f"Receipt {'flagged' if receipt.flagged else 'cleared'}",
        "receipt": receipt.to_dict()
    }), 200


@admin_bp.route("/rate-card", methods=["GET", "POST"])
@login_required
def manage_rate_card():
    auth_err = check_admin()
    if auth_err: return auth_err

    rate_card = RateCard.query.order_by(RateCard.id.desc()).first()
    if not rate_card:
        rate_card = RateCard(base_rate=55.0, low_tpc_bonus=5.0, high_tpc_penalty=8.0)
        db.session.add(rate_card)
        db.session.commit()

    if request.method == "POST":
        data = request.get_json() or {}
        try:
            rate_card.base_rate = float(data.get("base_rate", rate_card.base_rate))
            rate_card.low_tpc_bonus = float(data.get("low_tpc_bonus", rate_card.low_tpc_bonus))
            rate_card.high_tpc_penalty = float(data.get("high_tpc_penalty", rate_card.high_tpc_penalty))
            log_audit(
                current_user.id, "admin", "Updated Dynamic Rate Card",
                "RateCard", str(rate_card.id),
                f"Base: ₹{rate_card.base_rate}/L, Bonus: ₹{rate_card.low_tpc_bonus}/L, Penalty: ₹{rate_card.high_tpc_penalty}/L"
            )
            db.session.commit()
            return jsonify({
                "message": "Rate card updated successfully",
                "rate_card": rate_card.to_dict()
            }), 200
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid rate numbers"}), 400

    return jsonify({"rate_card": rate_card.to_dict()}), 200


@admin_bp.route("/fleet/live", methods=["GET"])
@login_required
def fleet_tracking():
    auth_err = check_admin()
    if auth_err: return auth_err

    agents = User.query.filter_by(role="agent", status="approved").all()
    agent_locations = []

    for agent in agents:
        prof = agent.agent_profile
        current_stops = RouteStop.query.filter_by(agent_id=agent.id).all()
        visited = sum(1 for s in current_stops if s.status == "visited")
        has_gps = prof and prof.current_lat and prof.current_lng

        agent_locations.append({
            "agent_id": agent.id,
            "name": agent.name,
            "vehicle_no": prof.vehicle_no if prof else "N/A",
            "lat": prof.current_lat if has_gps else None,
            "lng": prof.current_lng if has_gps else None,
            "zone": f"GPS: {prof.current_lat:.4f}, {prof.current_lng:.4f}" if has_gps else "Location not broadcast yet",
            "total_stops": len(current_stops),
            "completed_stops": visited,
            "status": "In Transit" if visited < len(current_stops) else "Completed Route",
            "last_ping": datetime.utcnow().isoformat()
        })

    return jsonify({"fleet": agent_locations}), 200


@admin_bp.route("/sellers/<seller_id>/location", methods=["PATCH"])
@login_required
def update_seller_location(seller_id):
    """Super Admin endpoint to edit seller pickup location, enable/disable pickup, and set time preferences."""
    auth_err = check_admin()
    if auth_err: return auth_err

    user = User.query.get(seller_id)
    if not user or user.role != "seller" or not user.seller_profile:
        return jsonify({"error": "Seller or profile not found"}), 404

    prof = user.seller_profile
    data = request.get_json() or {}

    if "pickup_enabled" in data:
        prof.pickup_enabled = bool(data["pickup_enabled"])
    if "pickup_preference" in data:
        prof.pickup_preference = str(data["pickup_preference"]).strip()
    if "address" in data:
        prof.address = str(data["address"]).strip()
    if "latitude" in data and data["latitude"] is not None:
        try:
            prof.latitude = float(data["latitude"])
        except (ValueError, TypeError):
            pass
    if "longitude" in data and data["longitude"] is not None:
        try:
            prof.longitude = float(data["longitude"])
        except (ValueError, TypeError):
            pass
    if "special_instructions" in data:
        prof.special_instructions = str(data["special_instructions"]).strip()
    if "city" in data and data["city"]:
        prof.city = str(data["city"]).strip()
    if "pincode" in data and data["pincode"]:
        prof.pincode = str(data["pincode"]).strip()

    status_str = "ENABLED" if prof.pickup_enabled else "DISABLED"
    log_audit(
        current_user.id, "admin", f"Updated Pickup Location ({status_str})",
        "SellerProfile", str(prof.id),
        f"Seller: {user.name}, Pref: {prof.pickup_preference}, Addr: {prof.address}"
    )
    db.session.commit()

    return jsonify({
        "message": f"Pickup location for {user.name} updated successfully ({status_str})",
        "user": user.to_dict()
    }), 200


@admin_bp.route("/routing/inject-stop", methods=["POST"])
@login_required
def inject_stop():
    auth_err = check_admin()
    if auth_err: return auth_err

    data = request.get_json() or {}
    agent_id = data.get("agent_id")
    seller_id = data.get("seller_id")

    if not agent_id or not seller_id:
        return jsonify({"error": "Missing agent_id or seller_id"}), 400

    existing_stops = RouteStop.query.filter_by(agent_id=agent_id).count()
    stop = RouteStop(
        agent_id=agent_id,
        seller_id=seller_id,
        stop_order=existing_stops + 1,
        status="assigned",
        scheduled_date=date.today()
    )
    db.session.add(stop)
    log_audit(current_user.id, "admin", "Injected Ad-Hoc Route Stop", "RouteStop", f"{agent_id}-{seller_id}")
    db.session.commit()

    return jsonify({
        "message": "Ad-hoc stop injected into agent manifest",
        "stop": stop.to_dict()
    }), 201


@admin_bp.route("/compliance/batches", methods=["GET", "POST"])
@login_required
def compliance_batches():
    auth_err = check_admin()
    if auth_err: return auth_err

    if request.method == "POST":
        data = request.get_json() or {}
        vol = float(data.get("total_volume", 1000))
        refinery = data.get("refinery_destination", "Karnataka State Biofuel Board, Bengaluru")
        batch_code = f"RUCO-BIO-BATCH-{datetime.utcnow().strftime('%Y%m%d')}-{random.randint(100, 999)}"

        batch = BiodieselBatch(
            batch_code=batch_code,
            total_volume=vol,
            refinery_destination=refinery,
            status="Dispatched",
            dispatch_date=date.today()
        )
        db.session.add(batch)
        log_audit(current_user.id, "admin", "Generated Downstream Biodiesel Batch", "BiodieselBatch", batch.batch_code, f"{vol}L to {refinery}")
        db.session.commit()
        return jsonify({"message": "Biodiesel compliance batch created", "batch": batch.to_dict()}), 201

    batches = BiodieselBatch.query.order_by(BiodieselBatch.created_at.desc()).all()
    return jsonify({"batches": [b.to_dict() for b in batches]}), 200


@admin_bp.route("/audit-logs", methods=["GET"])
@login_required
def audit_logs():
    auth_err = check_admin()
    if auth_err: return auth_err

    logs = AuditLog.query.order_by(AuditLog.timestamp.desc()).limit(200).all()
    return jsonify({"audit_logs": [l.to_dict() for l in logs]}), 200


@admin_bp.route("/seed", methods=["POST"])
@login_required
def trigger_seed():
    auth_err = check_admin()
    if auth_err: return auth_err

    from backend.seed import seed_database
    seed_database(drop=True)
    return jsonify({"message": "Database successfully reset and re-seeded with demo agents, kitchens, and routes!"}), 200

