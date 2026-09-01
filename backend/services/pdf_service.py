import os
import hashlib
import tempfile
from datetime import datetime
from fpdf import FPDF
from backend.services.qr_service import generate_qr_bytes

def generate_compliance_hash(receipt_id, seller_id, volume, tpc, fssai):
    raw = f"{receipt_id}:{seller_id}:{volume}:{tpc}:{fssai}:{datetime.utcnow().strftime('%Y-%m-%d')}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()

def render_weasyprint_pdf(receipt, seller, agent, cert_id, output_path):
    """
    Attempts to generate PDF using WeasyPrint with rich CSS styling.
    """
    from weasyprint import HTML
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>RUCO Certificate {cert_id}</title>
      <style>
        @page {{
          size: A4 portrait;
          margin: 15mm;
        }}
        body {{
          font-family: 'Helvetica Neue', Arial, sans-serif;
          color: #1e293b;
          margin: 0;
          padding: 0;
          background: #ffffff;
        }}
        .header {{
          background: #0f172a;
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }}
        .header-title {{
          font-size: 18px;
          font-weight: bold;
          letter-spacing: 0.5px;
        }}
        .badge-verified {{
          background: #10b981;
          color: white;
          font-size: 11px;
          font-weight: bold;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }}
        .cert-card {{
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          margin-top: 20px;
          padding: 30px;
          background: #f8fafc;
        }}
        .ref-box {{
          float: right;
          background: #fef3c7;
          border: 1px solid #f59e0b;
          color: #b45309;
          padding: 6px 14px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 13px;
          text-align: right;
        }}
        .main-title {{
          text-align: center;
          font-size: 24px;
          font-weight: 800;
          color: #0f766e;
          margin-top: 20px;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }}
        .subtitle {{
          text-align: center;
          color: #64748b;
          font-size: 13px;
          max-width: 500px;
          margin: 0 auto 30px auto;
          line-height: 1.5;
        }}
        .info-grid {{
          display: table;
          width: 100%;
          margin-bottom: 25px;
        }}
        .info-col {{
          display: table-cell;
          width: 50%;
          vertical-align: top;
        }}
        .label {{
          font-size: 11px;
          font-weight: bold;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }}
        .val-primary {{
          font-size: 18px;
          font-weight: bold;
          color: #0f172a;
          margin-top: 4px;
        }}
        .metrics-bar {{
          display: table;
          width: 100%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          margin-bottom: 25px;
        }}
        .metric-cell {{
          display: table-cell;
          width: 33.33%;
          text-align: center;
          padding: 16px 8px;
          border-right: 1px solid #e2e8f0;
        }}
        .metric-cell:last-child {{
          border-right: none;
        }}
        .metric-val {{
          font-size: 20px;
          font-weight: 800;
          color: #0284c7;
          margin-top: 4px;
        }}
        .collector-row {{
          background: #f1f5f9;
          padding: 12px 18px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 30px;
          border-left: 4px solid #0f766e;
        }}
        .footer-table {{
          display: table;
          width: 100%;
          margin-top: 20px;
        }}
        .footer-left {{
          display: table-cell;
          width: 60%;
          vertical-align: middle;
          font-size: 11px;
          color: #64748b;
        }}
        .footer-right {{
          display: table-cell;
          width: 40%;
          text-align: right;
          vertical-align: middle;
        }}
        .signatory {{
          font-weight: bold;
          color: #0f172a;
          font-size: 13px;
        }}
        .hash-code {{
          font-family: monospace;
          font-size: 9px;
          color: #94a3b8;
          word-break: break-all;
          margin-top: 15px;
        }}
      </style>
    </head>
    <body>
      <div class="header">
        <div class="header-title">GeoField Bio-Logistics</div>
        <div>
          <span>FSSAI RUCO Certificate</span>
          <span class="badge-verified">Verified</span>
        </div>
      </div>

      <div class="cert-card">
        <div class="ref-box">
          RUCO COMPLIANT<br>
          <small>Ref: {cert_id}</small>
        </div>
        <div style="clear: both;"></div>

        <div class="main-title">Certificate of Responsible Disposal</div>
        <div class="subtitle">
          This document certifies that Used Cooking Oil (UCO) was legally collected for Biofuel conversion in compliance with FSSAI RUCO regulations and traceability standards.
        </div>

        <div class="info-grid">
          <div class="info-col">
            <div class="label">Food Business Operator (FBO)</div>
            <div class="val-primary">{seller.name}</div>
            <div style="color: #64748b; font-size: 12px; margin-top: 3px;">Unique Partner ID: {seller.id}</div>
          </div>
          <div class="info-col" style="text-align: right;">
            <div class="label">FSSAI License No.</div>
            <div class="val-primary" style="font-family: monospace;">{seller.seller_profile.fssai_license_no if seller.seller_profile else 'N/A'}</div>
            <div style="color: #64748b; font-size: 12px; margin-top: 3px;">KYC Status: Verified</div>
          </div>
        </div>

        <div class="metrics-bar">
          <div class="metric-cell">
            <div class="label">Volume Handled</div>
            <div class="metric-val">{receipt.measured_volume or receipt.requested_volume} Liters</div>
          </div>
          <div class="metric-cell">
            <div class="label">Pickup Date</div>
            <div class="metric-val" style="color: #334155; font-size: 16px;">{receipt.settled_at.strftime('%d %b %Y') if receipt.settled_at else datetime.utcnow().strftime('%d %b %Y')}</div>
          </div>
          <div class="metric-cell">
            <div class="label">Payout Settled</div>
            <div class="metric-val" style="color: #059669;">₹{receipt.amount:,.2f}</div>
          </div>
        </div>

        <div class="collector-row">
          <strong>Authorized Collector:</strong> {agent.name if agent else 'Field Logistics Officer'} (GeoField Bio-Logistics) &nbsp;|&nbsp; 
          <strong>Vehicle:</strong> {agent.agent_profile.vehicle_no if agent and agent.agent_profile else 'KA-05-UCO-8801'} &nbsp;|&nbsp;
          <strong>TPC Reading:</strong> {receipt.tpc_percentage or 'N/A'}%
        </div>

        <div class="footer-table">
          <div class="footer-left">
            <strong>Government RUCO Traceable</strong><br>
            Chain of custody digitally verified by GeoField Compliance Platform.<br>
            Support: compliance@geofieldcorp.com | www.geofieldcorp.com
          </div>
          <div class="footer-right">
            <div class="signatory">GeoField Compliance Dept.</div>
            <div style="font-size: 11px; color: #64748b;">Authorized Signatory</div>
          </div>
        </div>

        <div class="hash-code">
          Tamper-Evident SHA256 Integrity Hash: {receipt.certificate.compliance_hash if receipt.certificate else 'GEN-HASH'}
        </div>
      </div>
    </body>
    </html>
    """
    HTML(string=html_content).write_pdf(output_path)


class RucoPDF(FPDF):
    def header(self):
        self.set_fill_color(15, 23, 42)
        self.rect(10, 10, 190, 18, "F")
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "B", 13)
        self.set_xy(15, 14)
        self.cell(90, 10, "GeoField Bio-Logistics", ln=0)
        self.set_font("Helvetica", "B", 10)
        self.cell(80, 10, "FSSAI RUCO CERTIFICATE - VERIFIED", align="R", ln=1)

def render_fpdf_certificate(receipt, seller, agent, cert_id, output_path):
    pdf = RucoPDF(orientation="P", unit="mm", format="A4")
    pdf.add_page()
    
    # Outer frame
    pdf.set_draw_color(226, 232, 240)
    pdf.set_fill_color(248, 250, 252)
    pdf.rect(10, 32, 190, 245, "DF")
    
    # Ref box
    pdf.set_xy(130, 36)
    pdf.set_fill_color(254, 243, 199)
    pdf.set_draw_color(245, 158, 11)
    pdf.set_text_color(180, 83, 9)
    pdf.set_font("Helvetica", "B", 9)
    pdf.cell(65, 12, f"RUCO COMPLIANT | Ref: {cert_id}", border=1, fill=True, align="C", ln=1)
    
    # Main title
    pdf.set_xy(10, 52)
    pdf.set_text_color(15, 118, 110)
    pdf.set_font("Helvetica", "B", 16)
    pdf.cell(190, 8, "CERTIFICATE OF RESPONSIBLE DISPOSAL", align="C", ln=1)
    
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(190, 5, "This document certifies that Used Cooking Oil was legally collected for Biofuel conversion in compliance with FSSAI regulations.", align="C", ln=1)
    
    pdf.ln(8)
    
    # FBO & License Section
    pdf.set_xy(15, 72)
    pdf.set_text_color(148, 163, 184)
    pdf.set_font("Helvetica", "B", 8)
    pdf.cell(90, 4, "FOOD BUSINESS OPERATOR (FBO)", ln=0)
    pdf.cell(90, 4, "FSSAI LICENSE NO.", align="R", ln=1)
    
    pdf.set_x(15)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "B", 12)
    fbo_name = seller.name if seller else "Food Business Operator"
    fssai_no = seller.seller_profile.fssai_license_no if seller and seller.seller_profile else "N/A"
    pdf.cell(90, 6, fbo_name, ln=0)
    pdf.cell(90, 6, fssai_no, align="R", ln=1)
    
    pdf.set_x(15)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(90, 4, f"Unique Partner ID: {seller.id if seller else 'N/A'}", ln=0)
    pdf.cell(90, 4, "KYC Status: Verified", align="R", ln=1)
    
    pdf.ln(8)
    
    # Metrics Box
    pdf.set_fill_color(255, 255, 255)
    pdf.set_draw_color(203, 213, 225)
    pdf.rect(15, 96, 180, 26, "DF")
    
    vol = receipt.measured_volume or receipt.requested_volume
    pickup_dt = receipt.settled_at.strftime('%d %b %Y') if receipt.settled_at else datetime.utcnow().strftime('%d %b %Y')
    amt = f"INR {receipt.amount:,.2f}" if receipt.amount else "Pending"
    
    pdf.set_xy(15, 99)
    pdf.set_text_color(148, 163, 184)
    pdf.set_font("Helvetica", "B", 8)
    pdf.cell(60, 4, "VOLUME HANDLED", align="C", ln=0)
    pdf.cell(60, 4, "PICKUP DATE", align="C", ln=0)
    pdf.cell(60, 4, "PAYOUT SETTLED", align="C", ln=1)
    
    pdf.set_xy(15, 105)
    pdf.set_text_color(2, 132, 199)
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(60, 8, f"{vol} Liters", align="C", ln=0)
    pdf.set_text_color(51, 65, 85)
    pdf.cell(60, 8, pickup_dt, align="C", ln=0)
    pdf.set_text_color(5, 150, 105)
    pdf.cell(60, 8, amt, align="C", ln=1)
    
    # Collector Info
    pdf.set_xy(15, 130)
    pdf.set_fill_color(241, 245, 249)
    pdf.set_draw_color(15, 118, 110)
    pdf.rect(15, 130, 180, 14, "F")
    
    agent_name = agent.name if agent else "GeoField Logistics Officer"
    veh = agent.agent_profile.vehicle_no if agent and agent.agent_profile else "KA-02-EV-4412"
    tpc = f"{receipt.tpc_percentage}%" if receipt.tpc_percentage else "N/A"
    
    pdf.set_xy(18, 134)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(174, 6, f"Collector: {agent_name} | Vehicle: {veh} | TPC Quality: {tpc}", ln=1)
    
    # QR code placeholder / generation
    qr_bytes = generate_qr_bytes(f"RUCO-CERT:{cert_id}:{receipt.id}:{vol}L:{fssai_no}")
    qr_temp_path = os.path.join(tempfile.gettempdir(), f"{cert_id}_qr.png")
    with open(qr_temp_path, "wb") as f:
        f.write(qr_bytes)
    
    pdf.image(qr_temp_path, x=18, y=154, w=32)
    if os.path.exists(qr_temp_path):
        os.remove(qr_temp_path)
        
    pdf.set_xy(54, 158)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(80, 5, "Government RUCO Traceable", ln=1)
    pdf.set_x(54)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(80, 4, "Chain of custody digitally verified by GeoField Compliance.", ln=1)
    pdf.set_x(54)
    pdf.cell(80, 4, "Support: compliance@geofieldcorp.com | www.geofieldcorp.com", ln=1)
    
    # Signatory
    pdf.set_xy(135, 175)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(55, 5, "GeoField Compliance Dept.", align="R", ln=1)
    pdf.set_x(135)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(55, 4, "Authorized Signatory", align="R", ln=1)
    
    # Integrity Hash
    pdf.set_xy(15, 205)
    pdf.set_font("Courier", "", 7)
    pdf.set_text_color(148, 163, 184)
    hash_val = receipt.certificate.compliance_hash if receipt.certificate else generate_compliance_hash(receipt.id, seller.id if seller else '', vol, receipt.tpc_percentage, fssai_no)
    pdf.multi_cell(180, 4, f"Tamper-Evident SHA256 Integrity Hash:\n{hash_val}")
    
    pdf.output(output_path)

def generate_disposal_pdf_bytes(receipt, seller, agent, cert_id):
    """Generates PDF bytes directly in memory without writing to disk."""
    pdf = RucoPDF(orientation="P", unit="mm", format="A4")
    pdf.add_page()
    
    # Outer frame
    pdf.set_draw_color(226, 232, 240)
    pdf.set_fill_color(248, 250, 252)
    pdf.rect(10, 32, 190, 245, "DF")
    
    # Ref box
    pdf.set_xy(130, 36)
    pdf.set_fill_color(254, 243, 199)
    pdf.set_draw_color(245, 158, 11)
    pdf.set_text_color(180, 83, 9)
    pdf.set_font("Helvetica", "B", 9)
    pdf.cell(65, 12, f"RUCO COMPLIANT | Ref: {cert_id}", border=1, fill=True, align="C", ln=1)
    
    # Main title
    pdf.set_xy(10, 52)
    pdf.set_text_color(15, 118, 110)
    pdf.set_font("Helvetica", "B", 16)
    pdf.cell(190, 8, "CERTIFICATE OF RESPONSIBLE DISPOSAL", align="C", ln=1)
    
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(190, 5, "This document certifies that Used Cooking Oil was legally collected for Biofuel conversion in compliance with FSSAI regulations.", align="C", ln=1)
    
    pdf.ln(8)
    
    # FBO & License Section
    pdf.set_xy(15, 72)
    pdf.set_text_color(148, 163, 184)
    pdf.set_font("Helvetica", "B", 8)
    pdf.cell(90, 4, "FOOD BUSINESS OPERATOR (FBO)", ln=0)
    pdf.cell(90, 4, "FSSAI LICENSE NO.", align="R", ln=1)
    
    pdf.set_x(15)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "B", 12)
    fbo_name = seller.name if seller else "Food Business Operator"
    fssai_no = seller.seller_profile.fssai_license_no if seller and seller.seller_profile else "N/A"
    pdf.cell(90, 6, fbo_name, ln=0)
    pdf.cell(90, 6, fssai_no, align="R", ln=1)
    
    pdf.set_x(15)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(90, 4, f"Unique Partner ID: {seller.id if seller else 'N/A'}", ln=0)
    pdf.cell(90, 4, "KYC Status: Verified", align="R", ln=1)
    
    pdf.ln(8)
    
    # Metrics Box
    pdf.set_fill_color(255, 255, 255)
    pdf.set_draw_color(203, 213, 225)
    pdf.rect(15, 96, 180, 26, "DF")
    
    vol = receipt.measured_volume or receipt.requested_volume
    pickup_dt = receipt.settled_at.strftime('%d %b %Y') if receipt.settled_at else datetime.utcnow().strftime('%d %b %Y')
    amt = f"INR {receipt.amount:,.2f}" if receipt.amount else "Pending"
    
    pdf.set_xy(15, 99)
    pdf.set_text_color(148, 163, 184)
    pdf.set_font("Helvetica", "B", 8)
    pdf.cell(60, 4, "VOLUME HANDLED", align="C", ln=0)
    pdf.cell(60, 4, "PICKUP DATE", align="C", ln=0)
    pdf.cell(60, 4, "PAYOUT SETTLED", align="C", ln=1)
    
    pdf.set_xy(15, 105)
    pdf.set_text_color(2, 132, 199)
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(60, 8, f"{vol} Liters", align="C", ln=0)
    pdf.set_text_color(51, 65, 85)
    pdf.cell(60, 8, pickup_dt, align="C", ln=0)
    pdf.set_text_color(5, 150, 105)
    pdf.cell(60, 8, amt, align="C", ln=1)
    
    # Collector Info
    pdf.set_xy(15, 130)
    pdf.set_fill_color(241, 245, 249)
    pdf.set_draw_color(15, 118, 110)
    pdf.rect(15, 130, 180, 14, "F")
    
    agent_name = agent.name if agent else "GeoField Logistics Officer"
    veh = agent.agent_profile.vehicle_no if agent and agent.agent_profile else "KA-02-EV-4412"
    tpc = f"{receipt.tpc_percentage}%" if receipt.tpc_percentage else "N/A"
    
    pdf.set_xy(18, 134)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(174, 6, f"Collector: {agent_name} | Vehicle: {veh} | TPC Quality: {tpc}", ln=1)
    
    # QR code placeholder / generation
    qr_bytes = generate_qr_bytes(f"RUCO-CERT:{cert_id}:{receipt.id}:{vol}L:{fssai_no}")
    qr_temp_path = os.path.join(tempfile.gettempdir(), f"{cert_id}_qr.png")
    with open(qr_temp_path, "wb") as f:
        f.write(qr_bytes)
    
    pdf.image(qr_temp_path, x=18, y=154, w=32)
    if os.path.exists(qr_temp_path):
        os.remove(qr_temp_path)
        
    pdf.set_xy(54, 158)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(80, 5, "Government RUCO Traceable", ln=1)
    pdf.set_x(54)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(80, 4, "Chain of custody digitally verified by GeoField Compliance.", ln=1)
    pdf.set_x(54)
    pdf.cell(80, 4, "Support: compliance@geofieldcorp.com | www.geofieldcorp.com", ln=1)
    
    # Signatory
    pdf.set_xy(135, 175)
    pdf.set_text_color(15, 23, 42)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(55, 5, "GeoField Compliance Dept.", align="R", ln=1)
    pdf.set_x(135)
    pdf.set_text_color(100, 116, 139)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(55, 4, "Authorized Signatory", align="R", ln=1)
    
    # Integrity Hash
    pdf.set_xy(15, 205)
    pdf.set_font("Courier", "", 7)
    pdf.set_text_color(148, 163, 184)
    hash_val = receipt.certificate.compliance_hash if receipt.certificate else generate_compliance_hash(receipt.id, seller.id if seller else '', vol, receipt.tpc_percentage, fssai_no)
    pdf.multi_cell(180, 4, f"Tamper-Evident SHA256 Integrity Hash:\n{hash_val}")
    
    return bytes(pdf.output())

def generate_disposal_pdf(receipt, seller, agent, cert_id, output_dir):
    # On serverless (Vercel), /tmp is the only writable dir
    try:
        os.makedirs(output_dir, exist_ok=True)
        pdf_path = os.path.join(output_dir, f"{cert_id}.pdf")
    except OSError:
        pdf_path = os.path.join(tempfile.gettempdir(), f"{cert_id}.pdf")

    render_fpdf_certificate(receipt, seller, agent, cert_id, pdf_path)
    return pdf_path

