from datetime import datetime
from . import db

class Receipt(db.Model):
    __tablename__ = "receipts"

    id = db.Column(db.String(64), primary_key=True)  # e.g., 'RCT-9082'
    seller_id = db.Column(db.String(64), db.ForeignKey("users.id"), nullable=False, index=True)
    receipt_qr = db.Column(db.String(120), unique=True, nullable=False, index=True)
    requested_volume = db.Column(db.Float, nullable=False)
    measured_volume = db.Column(db.Float, nullable=True)
    tpc_percentage = db.Column(db.Float, nullable=True)  # Total Polar Compounds %
    amount = db.Column(db.Float, nullable=True)  # Settlement amount in INR
    payment_status = db.Column(db.String(30), default="pending", nullable=False)  # 'pending', 'paid'
    status = db.Column(db.String(30), default="created", nullable=False)  # 'created', 'settled', 'cancelled'
    flagged = db.Column(db.Boolean, default=False, nullable=False)
    flag_reason = db.Column(db.Text, nullable=True)
    approving_agent_id = db.Column(db.String(64), db.ForeignKey("users.id"), nullable=True)
    
    # Immutability flag to enforce tamper resistance
    is_immutable = db.Column(db.Boolean, default=False, nullable=False)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    settled_at = db.Column(db.DateTime, nullable=True)

    # Relationships
    seller = db.relationship("User", foreign_keys=[seller_id], backref=db.backref("seller_receipts", lazy="dynamic"))
    approving_agent = db.relationship("User", foreign_keys=[approving_agent_id], backref=db.backref("approved_receipts", lazy="dynamic"))
    certificate = db.relationship("DisposalCertificate", backref="receipt", uselist=False, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "seller_id": self.seller_id,
            "seller_name": self.seller.name if self.seller else None,
            "seller_fssai": self.seller.seller_profile.fssai_license_no if self.seller and self.seller.seller_profile else None,
            "receipt_qr": self.receipt_qr,
            "requested_volume": self.requested_volume,
            "measured_volume": self.measured_volume,
            "tpc_percentage": self.tpc_percentage,
            "amount": self.amount,
            "payment_status": self.payment_status,
            "status": self.status,
            "flagged": self.flagged,
            "flag_reason": self.flag_reason,
            "approving_agent_id": self.approving_agent_id,
            "approving_agent_name": self.approving_agent.name if self.approving_agent else None,
            "is_immutable": self.is_immutable,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "settled_at": self.settled_at.isoformat() if self.settled_at else None,
            "has_certificate": bool(self.certificate),
            "certificate_id": self.certificate.id if self.certificate else None,
        }
