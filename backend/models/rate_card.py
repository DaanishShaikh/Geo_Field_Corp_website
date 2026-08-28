from datetime import datetime
from . import db

class RateCard(db.Model):
    __tablename__ = "rate_cards"

    id = db.Column(db.Integer, primary_key=True)
    base_rate = db.Column(db.Float, default=55.0, nullable=False)  # INR per Liter
    low_tpc_bonus = db.Column(db.Float, default=5.0, nullable=False)  # bonus if TPC <= 22%
    high_tpc_penalty = db.Column(db.Float, default=8.0, nullable=False)  # penalty if TPC >= 30%
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def calculate_rate(self, tpc_percentage):
        rate = self.base_rate
        if tpc_percentage is not None:
            if tpc_percentage <= 22.0:
                rate += self.low_tpc_bonus
            elif tpc_percentage >= 30.0:
                rate -= self.high_tpc_penalty
        return max(10.0, rate)

    def calculate_amount(self, volume, tpc_percentage):
        if not volume or volume <= 0:
            return 0.0
        rate = self.calculate_rate(tpc_percentage)
        return round(volume * rate, 2)

    def to_dict(self):
        return {
            "id": self.id,
            "base_rate": self.base_rate,
            "low_tpc_bonus": self.low_tpc_bonus,
            "high_tpc_penalty": self.high_tpc_penalty,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
