from datetime import datetime, date
from . import db

class RouteStop(db.Model):
    __tablename__ = "route_stops"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    agent_id = db.Column(db.String(64), db.ForeignKey("users.id"), nullable=False, index=True)
    seller_id = db.Column(db.String(64), db.ForeignKey("users.id"), nullable=False)
    stop_order = db.Column(db.Integer, nullable=False, default=1)
    status = db.Column(db.String(30), default="assigned", nullable=False)  # 'assigned', 'visited', 'skipped'
    scheduled_date = db.Column(db.Date, default=date.today, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    agent = db.relationship("User", foreign_keys=[agent_id])
    seller = db.relationship("User", foreign_keys=[seller_id])

    def to_dict(self):
        seller_prof = self.seller.seller_profile if self.seller else None
        agent_prof = self.agent.agent_profile if self.agent else None
        return {
            "id": self.id,
            "agent_id": self.agent_id,
            "agent_name": self.agent.name if self.agent else None,
            "agent_phone": self.agent.phone if self.agent else None,
            "agent_email": self.agent.email if self.agent else None,
            "agent_vehicle": agent_prof.vehicle_no if agent_prof else "KA-02-EV-4412",
            "seller_id": self.seller_id,
            "seller_name": self.seller.name if self.seller else None,
            "seller_phone": self.seller.phone if self.seller else None,
            "seller_email": self.seller.email if self.seller else None,
            "seller_address": seller_prof.address if seller_prof else None,
            "seller_city": seller_prof.city if seller_prof else None,
            "seller_fssai": seller_prof.fssai_license_no if seller_prof else None,
            "seller_lat": seller_prof.latitude if seller_prof else None,
            "seller_lng": seller_prof.longitude if seller_prof else None,
            "seller_site_qr": seller_prof.static_qr_code if seller_prof else None,
            "pickup_enabled": seller_prof.pickup_enabled if seller_prof else True,
            "pickup_preference": seller_prof.pickup_preference if seller_prof else "Morning (9 AM - 12 PM)",
            "special_instructions": seller_prof.special_instructions if seller_prof else None,
            "stop_order": self.stop_order,
            "status": self.status,
            "scheduled_date": self.scheduled_date.isoformat() if self.scheduled_date else None,
        }


class BiodieselBatch(db.Model):
    __tablename__ = "biodiesel_batches"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    batch_code = db.Column(db.String(64), unique=True, nullable=False)  # e.g., 'BIO-BATCH-2026-BLR-01'
    total_volume = db.Column(db.Float, nullable=False)
    refinery_destination = db.Column(db.String(150), default="Karnataka Biofuel Development Board, Bengaluru")
    status = db.Column(db.String(30), default="Aggregated")  # 'Aggregated', 'Dispatched', 'Processed'
    dispatch_date = db.Column(db.Date, default=date.today)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "batch_code": self.batch_code,
            "total_volume": self.total_volume,
            "refinery_destination": self.refinery_destination,
            "status": self.status,
            "dispatch_date": self.dispatch_date.isoformat() if self.dispatch_date else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
