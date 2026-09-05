from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from backend.models import db, User, SellerProfile, AgentProfile
from backend.services.audit_service import log_audit
import random

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    name = data.get("name", "").strip()
    role = data.get("role", "seller").strip().lower()
    phone = data.get("phone", "").strip()

    if not email or not password or not name or not role:
        return jsonify({"error": "Missing required registration fields"}), 400

    if role not in ["seller", "agent"]:
        return jsonify({"error": "Invalid registration role"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email is already registered"}), 409

    # Generate unique user ID
    if role == "seller":
        user_id = f"SELL-{random.randint(1000, 9999)}"
        while db.session.get(User, user_id):
            user_id = f"SELL-{random.randint(1000, 9999)}"
    else:
        user_id = f"AGT-{random.randint(500, 999)}"
        while db.session.get(User, user_id):
            user_id = f"AGT-{random.randint(500, 999)}"

    # New users start as pending per specification
    user = User(
        id=user_id,
        email=email,
        name=name,
        phone=phone,
        role=role,
        status="pending"
    )
    user.set_password(password)
    db.session.add(user)

    lat = None
    lng = None
    if "latitude" in data and data["latitude"] not in (None, ""):
        try:
            lat = float(data["latitude"])
        except (ValueError, TypeError):
            pass
    if "longitude" in data and data["longitude"] not in (None, ""):
        try:
            lng = float(data["longitude"])
        except (ValueError, TypeError):
            pass

    if role == "seller":
        fssai = data.get("fssai_license_no", f"FSSAI-{random.randint(1000, 9999)}-UCO")
        profile = SellerProfile(
            user_id=user_id,
            fssai_license_no=fssai,
            kyc_status="Submitted",
            address=data.get("address", "").strip() or "Address Pending",
            city=data.get("city", "").strip() or None,
            pincode=data.get("pincode", "").strip() or None,
            latitude=lat,
            longitude=lng,
            static_qr_code=f"RUCO-SITE-{user_id}",
            pickup_preference=data.get("pickup_preference", "Morning (9 AM - 12 PM)").strip()
        )
        db.session.add(profile)
    elif role == "agent":
        vehicle = data.get("vehicle_no", f"EV-{random.randint(1000,9999)}")
        profile = AgentProfile(
            user_id=user_id,
            vehicle_no=vehicle,
            current_lat=lat,
            current_lng=lng
        )
        db.session.add(profile)


    log_audit(user_id, role, "Submitted Registration", "User", user_id, f"Registered with status: pending")
    db.session.commit()

    return jsonify({
        "message": "Registration submitted successfully. Pending Super Admin approval.",
        "user_id": user_id,
        "status": "pending"
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    if user.status == "pending":
        return jsonify({"error": "This account is currently pending Super Admin approval. Log in as Super Admin (admin@geofield.com) to approve it."}), 403
    elif user.status == "blacklisted":
        return jsonify({"error": "Your account has been suspended or blacklisted. Contact compliance support."}), 403
    elif user.status == "rejected":
        return jsonify({"error": "Your registration was rejected by Super Admin."}), 403

    login_user(user, remember=True)
    log_audit(user.id, user.role, "User Logged In", "User", user.id)
    db.session.commit()

    return jsonify({
        "message": "Logged in successfully",
        "user": user.to_dict()
    }), 200


@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    uid = current_user.id
    role = current_user.role
    logout_user()
    log_audit(uid, role, "User Logged Out", "User", uid)
    db.session.commit()
    return jsonify({"message": "Logged out successfully"}), 200


@auth_bp.route("/me", methods=["GET"])
def me():
    if not current_user.is_authenticated:
        return jsonify({"authenticated": False}), 200
    return jsonify({
        "authenticated": True,
        "user": current_user.to_dict()
    }), 200
