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
        return {
            "id": self.id,
            "agent_id": self.agent_id,
            "seller_id": self.seller_id,
            "seller_name": self.seller.name if self.seller else None,
            "seller_address": self.seller.seller_profile.address if self.seller and self.seller.seller_profile else None,
            "seller_fssai": self.seller.seller_profile.fssai_license_no if self.seller and self.seller.seller_profile else None,
            "seller_lat": self.seller.seller_profile.latitude if self.seller and self.seller.seller_profile else None,
            "seller_lng": self.seller.seller_profile.longitude if self.seller and self.seller.seller_profile else None,
            "seller_site_qr": self.seller.seller_profile.static_qr_code if self.seller and self.seller.seller_profile else None,
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
