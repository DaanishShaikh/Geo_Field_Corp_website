import os
from flask import Blueprint, request, jsonify, send_file, current_app
from flask_restful import Api, Resource
from flask_login import current_user, login_required
from backend.models import db, Receipt, DisposalCertificate, User
from backend.services.pdf_service import generate_disposal_pdf
from backend.services.qr_service import generate_qr_base64
from backend.config import Config

api_bp = Blueprint("api", __name__, url_prefix="/api")
restful_api = Api(api_bp)

class SystemStatusResource(Resource):
    def get(self):
        return {
            "status": "online",
            "platform": "RUCO-Compliant UCO Logistics Platform",
            "compliance_standard": "FSSAI RUCO Regulation (Repurpose Used Cooking Oil)",
            "version": "2.0.0-production",
            "features": [
                "Role-Based Access Control (Super Admin, Seller FBO, Approval Agent)",
                "Static Site QR & Dynamic Receipt QR Verification",
                "Input bounds validation (Volume > 0, TPC 1-40%)",
                "Offline-first PWA IndexedDB synchronization",
                "Automated PDF Disposal Certificates (WeasyPrint / FPDF2)",
                "Mapbox & Leaflet Smart Logistics & Live Fleet Tracking",
                "Append-only Tamper-proof Audit Ledger"
            ]
        }

class QRCodeResource(Resource):
    def post(self):
        data = request.get_json() or {}
        text = data.get("text", "")
        if not text:
            return {"error": "Text is required to generate QR code"}, 400
        qr_b64 = generate_qr_base64(text)
        return {"qr_data_url": qr_b64, "text": text}

restful_api.add_resource(SystemStatusResource, "/status")
restful_api.add_resource(QRCodeResource, "/qr/generate")


@api_bp.route("/debug", methods=["GET"])
def debug_info():
    """Temporary diagnostic endpoint — exposes DB connection status."""
    import os, sys
    info = {
        "python": sys.version,
        "database_url_set": bool(os.environ.get("DATABASE_URL")),
        "database_url_prefix": os.environ.get("DATABASE_URL", "NOT SET")[:30] + "..." if os.environ.get("DATABASE_URL") else "NOT SET",
        "secret_key_set": bool(os.environ.get("SECRET_KEY")),
        "vercel": bool(os.environ.get("VERCEL")),
    }
    try:
        from backend.models import User
        count = User.query.count()
        info["db_status"] = "connected"
        info["user_count"] = count
    except Exception as e:
        info["db_status"] = "ERROR"
        info["db_error"] = str(e)
    return jsonify(info)


@api_bp.route("/certificates/<receipt_id>/download", methods=["GET"])
def download_certificate(receipt_id):
    import io
    from backend.services.pdf_service import generate_disposal_pdf_bytes

    receipt = db.session.get(Receipt, receipt_id)
    if not receipt:
        return jsonify({"error": "Receipt not found"}), 404

    if receipt.status != "settled":
        return jsonify({"error": "Disposal Certificate is only available after collection is settled."}), 400

    seller = db.session.get(User, receipt.seller_id)
    agent = db.session.get(User, receipt.approving_agent_id) if receipt.approving_agent_id else None
    
    cert_id = receipt.certificate.id if receipt.certificate else f"CERT-RUCO-{receipt.id.replace('RCT-', '')}"
    
    try:
        pdf_bytes = generate_disposal_pdf_bytes(receipt, seller, agent, cert_id)
        return send_file(
            io.BytesIO(pdf_bytes),
            mimetype="application/pdf",
            as_attachment=True,
            download_name=f"RUCO_Disposal_Certificate_{receipt.id}.pdf"
        )
    except Exception as e:
        return jsonify({"error": "Failed to generate certificate PDF", "details": str(e)}), 500
