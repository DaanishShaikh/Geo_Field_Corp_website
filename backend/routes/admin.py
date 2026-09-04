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
    
    # Realistic GPS coordinates around Bengaluru
    coords_pool = [
        {"lat": 12.9716, "lng": 77.5946, "zone": "Central Bengaluru"},
        {"lat": 12.9352, "lng": 77.6245, "zone": "Koramangala"},
        {"lat": 12.9784, "lng": 77.6408, "zone": "Indiranagar"},
        {"lat": 12.9141, "lng": 77.6101, "zone": "BTM Layout"},
        {"lat": 12.9856, "lng": 77.7289, "zone": "Whitefield"},
    ]

    for idx, agent in enumerate(agents):
        prof = agent.agent_profile
        coord = coords_pool[idx % len(coords_pool)]
        current_stops = RouteStop.query.filter_by(agent_id=agent.id).all()
        visited = sum(1 for s in current_stops if s.status == "visited")
        
        agent_locations.append({
            "agent_id": agent.id,
            "name": agent.name,
            "vehicle_no": prof.vehicle_no if prof else "KA-05-UCO-1000",
            "lat": prof.current_lat if prof and prof.current_lat else coord["lat"],
            "lng": prof.current_lng if prof and prof.current_lng else coord["lng"],
            "zone": coord["zone"],
            "total_stops": len(current_stops),
            "completed_stops": visited,
            "status": "In Transit" if visited < len(current_stops) else "Completed Route",
            "last_ping": datetime.utcnow().isoformat()
        })

    return jsonify({"fleet": agent_locations}), 200


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
