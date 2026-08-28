from datetime import datetime
from . import db

class AuditLog(db.Model):
    __tablename__ = "audit_logs"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    actor_id = db.Column(db.String(64), nullable=False)
    actor_role = db.Column(db.String(30), nullable=False)
    action = db.Column(db.String(120), nullable=False)  # e.g., 'Approved Receipt', 'Blacklisted Seller'
    entity_type = db.Column(db.String(60), nullable=False)  # 'Receipt', 'User', 'RateCard', 'System'
    entity_id = db.Column(db.String(64), nullable=False)
    details = db.Column(db.Text, nullable=True)
    ip_address = db.Column(db.String(50), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)

    def to_dict(self):
        return {
            "id": f"LOG-{self.id}",
            "actor_id": self.actor_id,
            "actor_role": self.actor_role,
            "action": self.action,
            "entity_type": self.entity_type,
            "entity_id": self.entity_id,
            "details": self.details,
            "ip_address": self.ip_address,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None,
        }
