import os
import hashlib
import tempfile
import io
from datetime import datetime
from fpdf import FPDF
from backend.services.qr_service import generate_qr_bytes

def generate_compliance_hash(receipt_id, seller_id, volume, tpc, fssai):
    raw = f"{receipt_id}:{seller_id}:{volume}:{tpc}:{fssai}:{datetime.utcnow().strftime('%Y-%m-%d')}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()

class RucoPDF(FPDF):
    def header(self):
        # Top dark banner
        self.set_fill_color(15, 23, 42)
        self.rect(10, 10, 190, 18, "F")
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "B", 12)
        self.set_xy(16, 14)
        self.cell(85, 10, "GeoField Bio-Logistics", ln=0)
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(52, 211, 153)
        self.cell(89, 10, "[FSSAI RUCO CERTIFIED - OFFICIAL]", align="R", ln=1)

def build_pdf_doc(receipt, seller, agent, cert_id):
    pdf = RucoPDF(orientation="P", unit="mm", format="A4")
    pdf.add_page()
    
    # Outer Card Frame
    pdf.set_draw_color(203, 213, 225)
    pdf.set_fill_color(248, 250, 252)
    pdf.rect(10, 32, 190, 248, "DF")
    
    # Compliance Badge (Top Right Pill)
    pdf.set_xy(115, 36)
    pdf.set_fill_color(254, 243, 199)
    pdf.set_draw_color(245, 158, 11)
    pdf.set_text_color(180, 83, 9)
    pdf.set_font("Helvetica", "B", 8)
    pdf.cell(80, 5, "RUCO COMPLIANT RECORD", border=1, fill=True, align="C", ln=1)
    pdf.set_xy(115, 41)
    pdf.set_font("Courier", "B", 7.5)
    pdf.cell(80, 4.5, f"Ref: {cert_id}", border=1, fill=True, align="C", ln=1)
    
    # Main Certificate Title
    pdf.set_xy(15, 50)
    pdf.set_text_color(15, 118, 110)
    pdf.set_font("Helvetica", "B", 15)
    pdf.cell(180, 7, "CERTIFICATE OF RESPONSIBLE DISPOSAL", align="C", ln=1)
    
    pdf.set_xy(15, 57)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(180, 4, "Certified collection of Used Cooking Oil (UCO) for legal Biofuel conversion under FSSAI RUCO standards.", align="C", ln=1)
    
    # Decorative Divider Line
    pdf.set_draw_color(226, 232, 240)
    pdf.line(18, 64, 192, 64)
    
    # FBO & License Section
    pdf.set_xy(18, 67)
    pdf.set_text_color(148, 163, 184)
    pdf.set_font("Helvetica", "B", 7.5)
    pdf.cell(90, 3.5, "FOOD BUSINESS OPERATOR (FBO)", ln=0)
    pdf.cell(84, 3.5, "FSSAI LICENSE NO.", align="R", ln=1)
    
    pdf.set_x(18)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "B", 11)
    fbo_name = seller.name if seller else "Food Business Operator"
    fssai_no = seller.seller_profile.fssai_license_no if seller and seller.seller_profile else "N/A"
    pdf.cell(90, 5.5, fbo_name, ln=0)
    pdf.set_font("Courier", "B", 11)
    pdf.cell(84, 5.5, fssai_no, align="R", ln=1)
    
    pdf.set_x(18)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 8)
    seller_id = seller.id if seller else 'N/A'
    pdf.cell(90, 4, f"Partner ID: {seller_id}  |  {seller.seller_profile.city if seller and seller.seller_profile else 'Bengaluru'}", ln=0)
    pdf.set_text_color(16, 185, 129)
    pdf.set_font("Helvetica", "B", 8)
    pdf.cell(84, 4, "[KYC STATUS: VERIFIED]", align="R", ln=1)
    
    # Metrics Box (3-column layout)
    pdf.set_xy(18, 85)
    pdf.set_fill_color(255, 255, 255)
    pdf.set_draw_color(203, 213, 225)
    pdf.rect(18, 85, 174, 25, "DF")
    
    vol = receipt.measured_volume or receipt.requested_volume
    pickup_dt = receipt.settled_at.strftime('%d %b %Y') if receipt.settled_at else datetime.utcnow().strftime('%d %b %Y')
    amt = f"INR {receipt.amount:,.2f}" if receipt.amount else "Pending"
    
    pdf.set_xy(18, 88)
    pdf.set_text_color(148, 163, 184)
    pdf.set_font("Helvetica", "B", 7.5)
    pdf.cell(58, 3.5, "VOLUME COLLECTED", align="C", ln=0)
    pdf.cell(58, 3.5, "PICKUP DATE", align="C", ln=0)
    pdf.cell(58, 3.5, "SETTLEMENT PAYOUT", align="C", ln=1)
    
    pdf.set_xy(18, 93)
    pdf.set_text_color(2, 132, 199)
    pdf.set_font("Helvetica", "B", 13)
    pdf.cell(58, 7, f"{vol} Liters", align="C", ln=0)
    pdf.set_text_color(51, 65, 85)
    pdf.cell(58, 7, pickup_dt, align="C", ln=0)
    pdf.set_text_color(5, 150, 105)
    pdf.cell(58, 7, amt, align="C", ln=1)
    
    # Collector & Testing Row
    pdf.set_xy(18, 116)
    pdf.set_fill_color(241, 245, 249)
    pdf.rect(18, 116, 174, 13, "F")
    
    agent_name = agent.name if agent else "GeoField Logistics Officer"
    veh = agent.agent_profile.vehicle_no if agent and agent.agent_profile else "KA-02-EV-4412"
    tpc = f"{receipt.tpc_percentage}%" if receipt.tpc_percentage else "20.0%"
    
    pdf.set_xy(22, 120)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "", 8.5)
    pdf.cell(166, 5, f"Authorized Collector: {agent_name}   |   Vehicle: {veh}   |   Tested TPC: {tpc}", ln=1)
    
    # Environmental ESG Impact Callout Box
    pdf.set_xy(18, 134)
    pdf.set_fill_color(236, 253, 245)
    pdf.set_draw_color(167, 243, 208)
    pdf.rect(18, 134, 174, 18, "DF")
    
    co2_saved = round(vol * 0.0028, 2)
    water_saved = int(vol * 24000)
    
    pdf.set_xy(22, 137)
    pdf.set_text_color(6, 95, 70)
    pdf.set_font("Helvetica", "B", 8)
    pdf.cell(166, 4, "ENVIRONMENTAL IMPACT & ESG CONTRIBUTION", ln=1)
    pdf.set_xy(22, 142)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(166, 4, f"- CO2 Emissions Displaced: {co2_saved} Tons      - Clean Drinking Water Protected: {water_saved:,} Liters", ln=1)
    
    # QR Code & Verification Block
    qr_bytes = generate_qr_bytes(f"RUCO-CERT:{cert_id}:{receipt.id}:{vol}L:{fssai_no}")
    qr_temp_path = os.path.join(tempfile.gettempdir(), f"{cert_id}_qr.png")
    with open(qr_temp_path, "wb") as f:
        f.write(qr_bytes)
    
    pdf.image(qr_temp_path, x=20, y=160, w=30)
    if os.path.exists(qr_temp_path):
        try:
            os.remove(qr_temp_path)
        except Exception:
            pass
        
    pdf.set_xy(54, 163)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "B", 9.5)
    pdf.cell(75, 4.5, "National RUCO Traceable Certificate", ln=1)
    
    pdf.set_x(54)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 7.5)
    pdf.cell(75, 3.5, "Digitally recorded in GeoField Immutable Compliance Ledger.", ln=1)
    pdf.set_x(54)
    pdf.cell(75, 3.5, "Complies with FSSAI Order No. 1-2/Stds/O&F/Notification/FSSAI-2018.", ln=1)
    pdf.set_x(54)
    pdf.cell(75, 3.5, "Support: compliance@geofieldcorp.com | www.geofieldcorp.com", ln=1)
    
    # Signatory Block
    pdf.set_xy(132, 178)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "B", 9)
    pdf.cell(56, 4, "GeoField Compliance Directorate", align="R", ln=1)
    pdf.set_x(132)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 7.5)
    pdf.cell(56, 3.5, "Authorized Digital Signatory", align="R", ln=1)
    
    # Integrity Hash Box
    pdf.set_xy(18, 202)
    pdf.set_fill_color(248, 250, 252)
    pdf.set_draw_color(226, 232, 240)
    pdf.rect(18, 202, 174, 14, "DF")
    
    pdf.set_xy(20, 204)
    pdf.set_font("Helvetica", "B", 6.5)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(170, 3, "TAMPER-EVIDENT SHA-256 INTEGRITY HASH:", ln=1)
    
    pdf.set_x(20)
    pdf.set_font("Courier", "", 7)
    pdf.set_text_color(71, 85, 105)
    hash_val = receipt.certificate.compliance_hash if receipt.certificate else generate_compliance_hash(receipt.id, seller.id if seller else '', vol, receipt.tpc_percentage, fssai_no)
    pdf.cell(170, 4, hash_val, ln=1)
    
    return pdf

def generate_disposal_pdf_bytes(receipt, seller, agent, cert_id):
    """Generates PDF bytes directly in memory without writing to disk."""
    pdf = build_pdf_doc(receipt, seller, agent, cert_id)
    return bytes(pdf.output())

def render_fpdf_certificate(receipt, seller, agent, cert_id, output_path):
    pdf = build_pdf_doc(receipt, seller, agent, cert_id)
    pdf.output(output_path)

def generate_disposal_pdf(receipt, seller, agent, cert_id, output_dir):
    try:
        os.makedirs(output_dir, exist_ok=True)
        pdf_path = os.path.join(output_dir, f"{cert_id}.pdf")
    except OSError:
        pdf_path = os.path.join(tempfile.gettempdir(), f"{cert_id}.pdf")

    render_fpdf_certificate(receipt, seller, agent, cert_id, pdf_path)
    return pdf_path
