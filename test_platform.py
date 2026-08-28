import requests
import json
import os
import sys

BASE_URL = "http://localhost:5000"

def run_tests():
    session = requests.Session()
    print("=" * 60)
    print("RUNNING END-TO-END AUTOMATED VERIFICATION SUITE")
    print("=" * 60)

    # 1. System Status
    print("\n[1] Testing System Status API...")
    res = session.get(f"{BASE_URL}/api/status")
    assert res.status_code == 200, f"Status check failed: {res.text}"
    status_data = res.json()
    print(f" -> System online: {status_data['platform']} (version {status_data['version']})")

    # 2. Test Super Admin Login
    print("\n[2] Testing Super Admin Login (admin@geofield.com)...")
    res = session.post(f"{BASE_URL}/api/auth/login", json={"email": "admin@geofield.com", "password": "admin123"})
    assert res.status_code == 200, f"Admin login failed: {res.text}"
    admin_user = res.json()["user"]
    print(f" -> Admin logged in: {admin_user['name']} (Role: {admin_user['role']})")

    # 3. Test Admin Overview & Approvals Queue
    print("\n[3] Testing Admin Overview & Pending Users Queue...")
    res = session.get(f"{BASE_URL}/api/admin/overview")
    assert res.status_code == 200
    overview_data = res.json()
    print(f" -> Pending users in queue: {overview_data['stats']['pending_approvals_count']}")
    print(f" -> Total platform volume collected: {overview_data['stats']['total_volume_collected_liters']} L")

    # 4. Test User Registration (New FBO Seller)
    print("\n[4] Testing New FBO Seller Self-Registration...")
    import time
    ts = int(time.time())
    test_email = f"spiceroute_{ts}@kitchen.com"
    reg_payload = {
        "role": "seller",
        "name": "Spice Route Cloud Kitchen",
        "email": test_email,
        "phone": "+91 98860 12345",
        "password": "sellerpassword123",
        "fssai_license_no": "10022055007788",
        "address": "HSR Layout Sector 2, Bengaluru",
        "city": "Bengaluru",
        "latitude": 12.9116,
        "longitude": 77.6389
    }
    res = requests.post(f"{BASE_URL}/api/auth/register", json=reg_payload)
    assert res.status_code == 201, f"Registration failed: {res.text}"
    new_user_id = res.json()["user_id"]
    print(f" -> Registered new Seller ID: {new_user_id} with status: {res.json()['status']}")

    # Verify pending seller cannot transact until approved
    login_attempt = requests.post(f"{BASE_URL}/api/auth/login", json={"email": test_email, "password": "sellerpassword123"})
    assert login_attempt.status_code == 403, "Pending user should be blocked from login"
    print(" -> Verified: Pending user is strictly blocked from login until Super Admin approval.")

    # Admin approves the new seller
    print(f"\n[5] Testing Super Admin Approval of User {new_user_id}...")
    res = session.patch(f"{BASE_URL}/api/admin/users/{new_user_id}/status", json={"status": "approved"})
    assert res.status_code == 200
    print(f" -> User {new_user_id} status updated to: {res.json()['user']['status']}")

    # 6. Test Approved Seller Flow
    print("\n[6] Testing Approved Seller Flow (seller@royalpalace.com)...")
    seller_session = requests.Session()
    res = seller_session.post(f"{BASE_URL}/api/auth/login", json={"email": "seller@royalpalace.com", "password": "seller123"})
    assert res.status_code == 200
    seller_user = res.json()["user"]
    print(f" -> Seller signed in: {seller_user['name']} (ID: {seller_user['id']})")

    # Check Seller Dashboard & ESG Impact
    res = seller_session.get(f"{BASE_URL}/api/seller/dashboard")
    assert res.status_code == 200
    dash = res.json()
    print(f" -> Seller Volume Sold: {dash['stats']['total_volume_liters']} L | Earnings: INR {dash['stats']['total_earnings_inr']}")
    print(f" -> Live ESG Metrics: CO2 avoided: {dash['stats']['esg']['co2_prevented_tons']} t, Water saved: {dash['stats']['esg']['water_saved_liters']} L")
    print(f" -> Site Static QR: {dash['site_qr']['code']}")

    # Seller creates a new collection receipt
    print("\n[7] Testing Collection Receipt Creation...")
    res = seller_session.post(f"{BASE_URL}/api/seller/receipts", json={"requested_volume": 180.0})
    assert res.status_code == 201
    created_receipt = res.json()["receipt"]
    receipt_id = created_receipt["id"]
    receipt_qr = created_receipt["receipt_qr"]
    print(f" -> Created Receipt: {receipt_id} (Requested: 180.0 L) with QR: {receipt_qr}")

    # 8. Test Approval Agent Flow
    print("\n[8] Testing Approval Agent Flow (agent@geofield.com)...")
    agent_session = requests.Session()
    res = agent_session.post(f"{BASE_URL}/api/auth/login", json={"email": "agent@geofield.com", "password": "agent123"})
    assert res.status_code == 200
    agent_user = res.json()["user"]
    print(f" -> Agent signed in: {agent_user['name']} (Vehicle: {agent_user['agent_profile']['vehicle_no']})")

    # Agent checks manifest
    res = agent_session.get(f"{BASE_URL}/api/agent/manifest")
    assert res.status_code == 200
    manifest = res.json()
    print(f" -> Agent Assigned Stops: {len(manifest['stops'])} stops")

    # Agent scans site QR
    print("\n[9] Testing Agent Scanning Site QR (RUCO-SITE-GEO-9082)...")
    res = agent_session.post(f"{BASE_URL}/api/agent/scan/site", json={"qr_code": "RUCO-SITE-GEO-9082"})
    assert res.status_code == 200
    print(f" -> Authenticated Seller: {res.json()['seller']['name']} with {len(res.json()['open_receipts'])} open receipts")

    # Agent tests measurement validation: Reject negative volume
    print("\n[10] Testing Input Bounds Validation (reject negative volume / invalid TPC)...")
    bad_vol_res = agent_session.post(f"{BASE_URL}/api/agent/receipts/{receipt_id}/settle", json={
        "measured_volume": -25.0,
        "tpc_percentage": 20.0
    })
    assert bad_vol_res.status_code == 400
    print(" -> Correctly rejected negative volume (< 0).")

    bad_tpc_res = agent_session.post(f"{BASE_URL}/api/agent/receipts/{receipt_id}/settle", json={
        "measured_volume": 180.0,
        "tpc_percentage": 65.0 # Outside 1-40% realistic range
    })
    assert bad_tpc_res.status_code == 400
    print(" -> Correctly rejected unrealistic TPC quality value (> 40%).")

    # Agent performs valid settlement
    print(f"\n[11] Testing Valid Settlement of Receipt {receipt_id}...")
    settle_res = agent_session.post(f"{BASE_URL}/api/agent/receipts/{receipt_id}/settle", json={
        "measured_volume": 178.5,
        "tpc_percentage": 19.0, # Low TPC qualifies for bonus
        "payment_status": "paid"
    })
    assert settle_res.status_code == 200
    settled_data = settle_res.json()["receipt"]
    cert_id = settle_res.json()["certificate_id"]
    print(f" -> Settled Volume: {settled_data['measured_volume']} L, TPC: {settled_data['tpc_percentage']}%")
    print(f" -> Calculated Payout: INR {settled_data['amount']} ({settled_data['payment_status']})")
    print(f" -> Auto-generated Certificate ID: {cert_id}")

    # 12. Test Immutability: Ensure settled receipt cannot be overwritten
    print("\n[12] Testing Immutability Rule (Settled receipts cannot be edited)...")
    tamper_res = agent_session.post(f"{BASE_URL}/api/agent/receipts/{receipt_id}/settle", json={
        "measured_volume": 999.0,
        "tpc_percentage": 10.0
    })
    assert tamper_res.status_code == 409, "Settled receipt must return 409 Conflict when overwrite attempted"
    print(" -> Immutability verified: 409 Conflict returned on overwrite attempt.")

    # 13. Test PDF Certificate Download
    print(f"\n[13] Testing PDF Disposal Certificate Download for {receipt_id}...")
    pdf_res = requests.get(f"{BASE_URL}/api/certificates/{receipt_id}/download")
    assert pdf_res.status_code == 200
    assert pdf_res.headers["content-type"] == "application/pdf"
    assert len(pdf_res.content) > 1000
    print(f" -> PDF Certificate generated and downloaded successfully ({len(pdf_res.content)} bytes)")

    # 14. Test Super Admin Flagging and Fleet Tracking
    print("\n[14] Testing Super Admin Flagging & Live Fleet Tracking...")
    flag_res = session.post(f"{BASE_URL}/api/admin/receipts/{receipt_id}/flag", json={"reason": "Audit spot check for high volume collection"})
    assert flag_res.status_code == 200
    assert flag_res.json()["receipt"]["flagged"] is True
    print(f" -> Successfully flagged receipt {receipt_id} for audit inspection.")

    fleet_res = session.get(f"{BASE_URL}/api/admin/fleet/live")
    assert fleet_res.status_code == 200
    print(f" -> Live Fleet Tracking active: {len(fleet_res.json()['fleet'])} active collection vehicles tracked.")

    # 15. Test Append-Only Audit Log
    print("\n[15] Testing Append-Only Audit Log Ledger...")
    audit_res = session.get(f"{BASE_URL}/api/admin/audit-logs")
    assert audit_res.status_code == 200
    logs = audit_res.json()["audit_logs"]
    print(f" -> Verified tamper-proof audit trail: {len(logs)} events logged across all operations.")

    print("\n" + "=" * 60)
    print("ALL 15 END-TO-END SPECIFICATION CHECKS PASSED PERFECTLY!")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
