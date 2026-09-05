import os
import sys
from datetime import datetime, timedelta

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.models import (
    db, User, SellerProfile, AgentProfile, Receipt,
    DisposalCertificate, RateCard, AuditLog, RouteStop, BiodieselBatch
)
from backend.services.pdf_service import generate_compliance_hash
from backend.config import Config

def seed_database(drop=False):
    """Seed the database with initial rate card, approved sellers, active agents, and routes."""
    if drop:
        print("Recreating database tables...")
        db.drop_all()
    
    db.create_all()

    # If users already exist and we're not dropping, skip to avoid duplicates
    if not drop and User.query.first():
        print("Database already contains users. Ensuring rate card exists...")
        if not RateCard.query.first():
            rate_card = RateCard(base_rate=55.0, low_tpc_bonus=5.0, high_tpc_penalty=8.0)
            db.session.add(rate_card)
            db.session.commit()
        return

    print("Seeding Rate Card...")
    rate_card = RateCard.query.first()
    if not rate_card:
        rate_card = RateCard(base_rate=55.0, low_tpc_bonus=5.0, high_tpc_penalty=8.0)
        db.session.add(rate_card)

    print("Seeding Users & Profiles...")
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

    # 2. Approved Seller 1: Royal Palace Kitchen & Bistro
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
        static_qr_code="RUCO-SITE-GEO-9082",
        pickup_enabled=True,
        pickup_preference="Morning (9 AM - 12 PM)",
        special_instructions="Ring back kitchen doorbell, entry via service lane."
    )
    db.session.add(seller1_profile)

    # 3. Approved Seller 2: Spice Garden Barbeque & Grill
    seller3 = User(
        id="GEO-9083",
        email="spicegarden@blr.com",
        name="Spice Garden Barbeque & Grill",
        phone="+91 98801 23456",
        role="seller",
        status="approved"
    )
    seller3.set_password("seller123")
    db.session.add(seller3)

    seller3_profile = SellerProfile(
        user_id="GEO-9083",
        fssai_license_no="10021022008765",
        kyc_status="Verified",
        address="100 Feet Ring Road, BTM 2nd Stage",
        city="Bengaluru",
        pincode="560076",
        latitude=12.9141,
        longitude=77.6101,
        static_qr_code="RUCO-SITE-GEO-9083",
        pickup_enabled=True,
        pickup_preference="Afternoon (1 PM - 4 PM)",
        special_instructions="Store oil barrels near loading dock 2."
    )
    db.session.add(seller3_profile)

    # 4. Approved Seller 3: Grand Maurya Caterers & Banquets
    seller4 = User(
        id="GEO-9084",
        email="maurya@caterers.in",
        name="Grand Maurya Banquets & Caterers",
        phone="+91 97400 98765",
        role="seller",
        status="approved"
    )
    seller4.set_password("seller123")
    db.session.add(seller4)

    seller4_profile = SellerProfile(
        user_id="GEO-9084",
        fssai_license_no="10022044007890",
        kyc_status="Verified",
        address="12th Main Road, HAL 2nd Stage, Indiranagar",
        city="Bengaluru",
        pincode="560038",
        latitude=12.9784,
        longitude=77.6408,
        static_qr_code="RUCO-SITE-GEO-9084",
        pickup_enabled=True,
        pickup_preference="Evening (5 PM - 8 PM)",
        special_instructions="Security guard has key to oil storage room."
    )
    db.session.add(seller4_profile)

    # 5. Pending Seller: Lotus Green Canteen & Bakery
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
        address="Whitefield Main Road, ITPL",
        city="Bengaluru",
        pincode="560066",
        latitude=12.9856,
        longitude=77.7289,
        static_qr_code="RUCO-SITE-SELL-1002",
        pickup_enabled=True,
        pickup_preference="Morning (9 AM - 12 PM)",
        special_instructions="Awaiting Super Admin KYC verification."
    )
    db.session.add(seller2_profile)

    # 6. Approved Field Agent 1: Rajesh Kumar
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

    # 7. Approved Field Agent 2: Amit Patel
    agent3 = User(
        id="AGT-503",
        email="amit@geofield.com",
        name="Amit Patel",
        phone="+91 98450 11990",
        role="agent",
        status="approved"
    )
    agent3.set_password("agent123")
    db.session.add(agent3)

    agent3_profile = AgentProfile(
        user_id="AGT-503",
        vehicle_no="KA-01-EV-9021",
        current_lat=12.9716,
        current_lng=77.5946
    )
    db.session.add(agent3_profile)

    # 8. Pending Field Agent: Priya Sharma
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
    receipt1 = Receipt(
        id="RCT-9082",
        seller_id="GEO-9082",
        receipt_qr="RUCO-RCT-9082-SAMPLE",
        requested_volume=320.0,
        measured_volume=320.0,
        tpc_percentage=19.5,
        amount=16640.0,
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

    receipt3 = Receipt(
        id="RCT-9084",
        seller_id="GEO-9083",
        receipt_qr="RUCO-RCT-9084-LIVE",
        requested_volume=220.0,
        payment_status="pending",
        status="created",
        flagged=False,
        is_immutable=False,
        created_at=datetime.utcnow() - timedelta(hours=1)
    )
    db.session.add(receipt3)

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
        seller_id="GEO-9083",
        stop_order=2,
        status="assigned",
        scheduled_date=datetime.utcnow().date()
    )
    stop3 = RouteStop(
        agent_id="AGT-501",
        seller_id="GEO-9084",
        stop_order=3,
        status="assigned",
        scheduled_date=datetime.utcnow().date()
    )
    db.session.add(stop1)
    db.session.add(stop2)
    db.session.add(stop3)

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
    print("[OK] Database successfully seeded!")

def seed():
    from backend.app import create_app
    app = create_app()
    with app.app_context():
        seed_database(drop=True)

if __name__ == "__main__":
    seed()
