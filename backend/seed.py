import os
import sys
from datetime import datetime, timedelta

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app import create_app
from backend.models import db, User, SellerProfile, AgentProfile, Receipt, DisposalCertificate, RateCard, AuditLog, RouteStop, BiodieselBatch
from backend.services.pdf_service import generate_compliance_hash, generate_disposal_pdf
from backend.config import Config

app = create_app()

def seed():
    with app.app_context():
        print("Recreating database tables...")
        db.drop_all()
        db.create_all()

        print("Seeding Rate Card...")
        rate_card = RateCard(
            base_rate=55.0,
            low_tpc_bonus=5.0,
            high_tpc_penalty=8.0
        )
        db.session.add(rate_card)

        print("Seeding Users...")
        # 1. Super Admin
        admin = User(
            id="ADM-001",
            email="admin@geofield.com",
            name="Super Admin (GeoField Platform Owner)",
            phone="+91 98800 11223",
            role="admin",
            status="approved"
        )
        admin.set_password("admin123")
        db.session.add(admin)

        # 2. Approved Seller: Royal Palace Kitchen & Bistro (Matching PDF page 2)
        seller1 = User(
            id="GEO-9082",
            email="seller@royalpalace.com",
            name="Royal Palace Kitchen & Bistro",
            phone="+91 99450 78120",
            role="seller",
            status="approved"
        )
        seller1.set_password("seller123")
        db.session.add(seller1)

        seller1_profile = SellerProfile(
            user_id="GEO-9082",
            fssai_license_no="10020011003456",
            kyc_status="Verified",
            address="Plot 42, 80 Feet Road, Koramangala 4th Block",
            city="Bengaluru",
            pincode="560034",
            latitude=12.9352,
            longitude=77.6245,
            static_qr_code="RUCO-SITE-GEO-9082"
        )
        db.session.add(seller1_profile)

        # 3. Pending Seller: Lotus Green Canteen
        seller2 = User(
            id="SELL-1002",
            email="lotus@canteen.com",
            name="Lotus Green Canteen & Bakery",
            phone="+91 97310 44556",
            role="seller",
            status="pending"
        )
        seller2.set_password("seller123")
        db.session.add(seller2)

        seller2_profile = SellerProfile(
            user_id="SELL-1002",
            fssai_license_no="10021055009812",
            kyc_status="Submitted",
            address="12th Main Road, Indiranagar",
            city="Bengaluru",
            pincode="560038",
            latitude=12.9784,
            longitude=77.6408,
            static_qr_code="RUCO-SITE-SELL-1002"
        )
        db.session.add(seller2_profile)

        # 4. Approved Field Agent: Rajesh Kumar (Matching PDF page 2)
        agent1 = User(
            id="AGT-501",
            email="agent@geofield.com",
            name="Rajesh Kumar",
            phone="+91 94480 33221",
            role="agent",
            status="approved"
        )
        agent1.set_password("agent123")
        db.session.add(agent1)

        agent1_profile = AgentProfile(
            user_id="AGT-501",
            vehicle_no="KA-02-EV-4412",
            current_lat=12.9352,
            current_lng=77.6245
        )
        db.session.add(agent1_profile)

        # 5. Pending Field Agent: Priya Sharma
        agent2 = User(
            id="AGT-502",
            email="priya@geofield.com",
            name="Priya Sharma",
            phone="+91 91122 33445",
            role="agent",
            status="pending"
        )
        agent2.set_password("agent123")
        db.session.add(agent2)

        agent2_profile = AgentProfile(
            user_id="AGT-502",
            vehicle_no="KA-05-EV-9901",
            current_lat=12.9716,
            current_lng=77.5946
        )
        db.session.add(agent2_profile)

        print("Seeding Receipts & Disposal Certificates...")
        # Settled Receipt matching PDF page 2 sample: 320 Liters, ₹16,640, TPC 19.5%
        receipt1 = Receipt(
            id="RCT-9082",
            seller_id="GEO-9082",
            receipt_qr="RUCO-RCT-9082-SAMPLE",
            requested_volume=320.0,
            measured_volume=320.0,
            tpc_percentage=19.5,
            amount=16640.0,  # 320 * (55 - 3 = 52, or rate card match)
            payment_status="paid",
            status="settled",
            flagged=False,
            approving_agent_id="AGT-501",
            is_immutable=True,
            created_at=datetime.utcnow() - timedelta(days=3),
            settled_at=datetime.utcnow() - timedelta(days=3)
        )
        db.session.add(receipt1)

        cert_id = "RUCO-GEO-2025-0891"
        comp_hash = generate_compliance_hash(receipt1.id, "GEO-9082", 320.0, 19.5, "10020011003456")
        cert1 = DisposalCertificate(
            id=cert_id,
            receipt_id="RCT-9082",
            pdf_filename=f"{cert_id}.pdf",
            fssai_serial="10020011003456",
            compliance_hash=comp_hash,
            created_at=datetime.utcnow() - timedelta(days=3)
        )
        db.session.add(cert1)

        # Open created receipt ready for agent pickup
        receipt2 = Receipt(
            id="RCT-9083",
            seller_id="GEO-9082",
            receipt_qr="RUCO-RCT-9083-LIVE",
            requested_volume=150.0,
            payment_status="pending",
            status="created",
            flagged=False,
            is_immutable=False,
            created_at=datetime.utcnow() - timedelta(hours=2)
        )
        db.session.add(receipt2)

        print("Seeding Assigned Route Stops & Manifest...")
        stop1 = RouteStop(
            agent_id="AGT-501",
            seller_id="GEO-9082",
            stop_order=1,
            status="visited",
            scheduled_date=datetime.utcnow().date()
        )
        stop2 = RouteStop(
            agent_id="AGT-501",
            seller_id="SELL-1002",
            stop_order=2,
            status="assigned",
            scheduled_date=datetime.utcnow().date()
        )
        db.session.add(stop1)
        db.session.add(stop2)

        print("Seeding Biodiesel Batches...")
        batch1 = BiodieselBatch(
            batch_code="RUCO-BIO-BATCH-202608-01",
            total_volume=4500.0,
            refinery_destination="Karnataka State Biofuel Development Board Refinery",
            status="Dispatched",
            dispatch_date=datetime.utcnow().date()
        )
        db.session.add(batch1)

        print("Seeding Audit Logs...")
        audit1 = AuditLog(
            actor_id="system",
            actor_role="system",
            action="Platform System Initialization",
            entity_type="System",
            entity_id="RUCO-PLATFORM",
            details="System initialized with FSSAI RUCO compliance standard."
        )
        audit2 = AuditLog(
            actor_id="AGT-501",
            actor_role="agent",
            action="Approved & Settled Collection",
            entity_type="Receipt",
            entity_id="RCT-9082",
            details="320 Liters collected, TPC 19.5%, Payout: INR 16,640 (Settled)"
        )
        db.session.add(audit1)
        db.session.add(audit2)

        db.session.commit()

        # Pre-generate the sample PDF certificate
        try:
            generate_disposal_pdf(receipt1, seller1, agent1, cert_id, Config.CERTIFICATES_DIR)
            print(f"Sample certificate generated at {Config.CERTIFICATES_DIR}/{cert_id}.pdf")
        except Exception as e:
            print(f"PDF pre-generation warning: {e}")

        print("[OK] Database successfully seeded!")
        print("Demo Credentials:")
        print("  Super Admin : admin@geofield.com  / admin123")
        print("  Seller (FBO): seller@royalpalace.com / seller123")
        print("  Field Agent : agent@geofield.com  / agent123")

if __name__ == "__main__":
    seed()
