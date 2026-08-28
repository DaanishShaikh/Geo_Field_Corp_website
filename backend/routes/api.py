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


@api_bp.route("/certificates/<receipt_id>/download", methods=["GET"])
def download_certificate(receipt_id):
    receipt = Receipt.query.get(receipt_id)
    if not receipt:
        return jsonify({"error": "Receipt not found"}), 404

    if receipt.status != "settled":
        return jsonify({"error": "Disposal Certificate is only available after collection is settled."}), 400

    seller = User.query.get(receipt.seller_id)
    agent = User.query.get(receipt.approving_agent_id) if receipt.approving_agent_id else None
    
    cert_id = receipt.certificate.id if receipt.certificate else f"CERT-RUCO-{receipt.id.replace('RCT-', '')}"
    
    pdf_path = generate_disposal_pdf(receipt, seller, agent, cert_id, Config.CERTIFICATES_DIR)

    if not os.path.exists(pdf_path):
        return jsonify({"error": "Failed to generate certificate PDF"}), 500

    return send_file(
        pdf_path,
        mimetype="application/pdf",
        as_attachment=True,
        download_name=f"RUCO_Disposal_Certificate_{receipt.id}.pdf"
    )
