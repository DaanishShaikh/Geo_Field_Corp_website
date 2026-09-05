from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from . import db

class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.String(64), primary_key=True)  # e.g., 'ADM-001', 'SELL-1001', 'AGT-501'
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    phone = db.Column(db.String(30), nullable=True)
    role = db.Column(db.String(30), nullable=False)  # 'seller', 'agent', 'admin'
    status = db.Column(db.String(30), default="pending", nullable=False)  # 'pending', 'approved', 'rejected', 'blacklisted'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    seller_profile = db.relationship("SellerProfile", backref="user", uselist=False, cascade="all, delete-orphan")
    agent_profile = db.relationship("AgentProfile", backref="user", uselist=False, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        data = {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "phone": self.phone,
            "role": self.role,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
        if self.role == "seller" and self.seller_profile:
            data["seller_profile"] = self.seller_profile.to_dict()
        elif self.role == "agent" and self.agent_profile:
            data["agent_profile"] = self.agent_profile.to_dict()
        return data


class SellerProfile(db.Model):
    __tablename__ = "seller_profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(64), db.ForeignKey("users.id"), nullable=False, unique=True)
    fssai_license_no = db.Column(db.String(60), nullable=False)
    kyc_status = db.Column(db.String(30), default="Submitted")  # 'Submitted', 'Verified', 'Rejected'
    address = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    pincode = db.Column(db.String(20), nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    static_qr_code = db.Column(db.String(120), unique=True, nullable=False)  # e.g., 'RUCO-SITE-SELL-1001'
    pickup_enabled = db.Column(db.Boolean, default=True, nullable=False)
    pickup_preference = db.Column(db.String(100), default="Morning (9 AM - 12 PM)", nullable=False)
    special_instructions = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "fssai_license_no": self.fssai_license_no,
            "kyc_status": self.kyc_status,
            "address": self.address,
            "city": self.city,
            "pincode": self.pincode,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "static_qr_code": self.static_qr_code,
            "pickup_enabled": self.pickup_enabled,
            "pickup_preference": self.pickup_preference,
            "special_instructions": self.special_instructions,
        }


class AgentProfile(db.Model):
    __tablename__ = "agent_profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(64), db.ForeignKey("users.id"), nullable=False, unique=True)
    vehicle_no = db.Column(db.String(50), nullable=False)
    current_lat = db.Column(db.Float, nullable=True)
    current_lng = db.Column(db.Float, nullable=True)
    last_active_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "vehicle_no": self.vehicle_no,
            "current_lat": self.current_lat,
            "current_lng": self.current_lng,
            "last_active_at": self.last_active_at.isoformat() if self.last_active_at else None,
        }
