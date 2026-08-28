from datetime import datetime
from . import db

class DisposalCertificate(db.Model):
    __tablename__ = "disposal_certificates"

    id = db.Column(db.String(64), primary_key=True)  # e.g., 'CERT-RUCO-2026-0891'
    receipt_id = db.Column(db.String(64), db.ForeignKey("receipts.id"), unique=True, nullable=False)
    pdf_filename = db.Column(db.String(255), nullable=True)
    fssai_serial = db.Column(db.String(100), nullable=False)
    compliance_hash = db.Column(db.String(128), nullable=False)  # SHA-256 integrity hash
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "receipt_id": self.receipt_id,
            "fssai_serial": self.fssai_serial,
            "compliance_hash": self.compliance_hash,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "pdf_url": f"/api/certificates/{self.receipt_id}/download",
        }
