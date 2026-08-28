import os
from celery import Celery

def make_celery(app_name=__name__):
    broker = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0")
    backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
    
    celery_app = Celery(app_name, broker=broker, backend=backend)
    return celery_app

celery_app = make_celery("geofield_uco_tasks")

@celery_app.task(name="tasks.async_generate_certificate")
def async_generate_certificate(receipt_id):
    """
    Background worker task to generate PDF disposal certificate.
    """
    try:
        from backend.models import db, Receipt, User, DisposalCertificate
        from backend.services.pdf_service import generate_disposal_pdf, generate_compliance_hash
        from backend.config import Config
        
        receipt = Receipt.query.get(receipt_id)
        if not receipt:
            return {"status": "error", "message": "Receipt not found"}
            
        seller = User.query.get(receipt.seller_id)
        agent = User.query.get(receipt.approving_agent_id) if receipt.approving_agent_id else None
        
        cert = receipt.certificate
        if not cert:
            cert_id = f"CERT-RUCO-{datetime.utcnow().year}-{receipt.id.replace('RCT-', '')}"
            fssai = seller.seller_profile.fssai_license_no if seller and seller.seller_profile else "FSSAI-UNASSIGNED"
            comp_hash = generate_compliance_hash(receipt.id, seller.id, receipt.measured_volume, receipt.tpc_percentage, fssai)
            
            cert = DisposalCertificate(
                id=cert_id,
                receipt_id=receipt.id,
                pdf_filename=f"{cert_id}.pdf",
                fssai_serial=fssai,
                compliance_hash=comp_hash
            )
            db.session.add(cert)
            db.session.commit()
            
        pdf_path = generate_disposal_pdf(receipt, seller, agent, cert.id, Config.CERTIFICATES_DIR)
        return {"status": "success", "certificate_id": cert.id, "path": pdf_path}
    except Exception as e:
        return {"status": "error", "message": str(e)}
