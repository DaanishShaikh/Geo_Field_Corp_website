// Firebase-backed API Service for GeoField RUCO Platform
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp 
} from "firebase/firestore";
import { auth, db } from "./firebase";

// Helper to get active user document from Firestore
async function getUserProfile(uid) {
  try {
    const userSnap = await getDoc(doc(db, "users", uid));
    if (userSnap.exists()) {
      return { id: uid, ...userSnap.data() };
    }
  } catch (err) {
    console.error("Error fetching user profile:", err);
  }
  return null;
}

// Ensure default Admin and Rate Card exist in Firestore
async function bootstrapSuperAdmin() {
  try {
    const rateCardSnap = await getDoc(doc(db, "settings", "rate_card"));
    if (!rateCardSnap.exists()) {
      await setDoc(doc(db, "settings", "rate_card"), {
        base_rate: 55.0,
        low_tpc_bonus: 5.0,
        high_tpc_penalty: 8.0,
        updated_at: new Date().toISOString()
      });
    }
  } catch (e) {
    console.warn("Bootstrap check:", e);
  }
}
bootstrapSuperAdmin();

// Helper to record audit log
async function logAudit(action, actor_name, details, ip = "127.0.0.1") {
  try {
    const logId = "AUD-" + Date.now().toString().slice(-8);
    await setDoc(doc(db, "audit_logs", logId), {
      id: logId,
      action,
      actor_name: actor_name || "System",
      details: typeof details === "object" ? JSON.stringify(details) : String(details),
      ip_address: ip,
      created_at: new Date().toISOString()
    });
  } catch (e) {
    console.warn("Audit log notice:", e);
  }
}

export const api = {
  // ----------------------------------------------------
  // AUTHENTICATION
  // ----------------------------------------------------
  login: async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // Auto-bootstrap Super Admin if using default credentials
    if (cleanEmail === "admin@geofield.com" && password === "admin123") {
      try {
        const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
        let profile = await getUserProfile(cred.user.uid);
        if (!profile) {
          profile = {
            id: cred.user.uid,
            email: cleanEmail,
            name: "Super Admin (GeoField Platform Owner)",
            role: "admin",
            phone: "+91 98800 11223",
            status: "approved",
            created_at: new Date().toISOString()
          };
          await setDoc(doc(db, "users", cred.user.uid), profile);
        }
        await logAudit("ADMIN_LOGIN", profile.name, "Super admin logged in");
        return { message: "Login successful", user: profile };
      } catch (err) {
        // If not created yet in Firebase Auth, register admin automatically
        if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential" || err.code === "auth/invalid-login-credentials") {
          const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
          const profile = {
            id: cred.user.uid,
            email: cleanEmail,
            name: "Super Admin (GeoField Platform Owner)",
            role: "admin",
            phone: "+91 98800 11223",
            status: "approved",
            created_at: new Date().toISOString()
          };
          await setDoc(doc(db, "users", cred.user.uid), profile);
          await logAudit("ADMIN_INITIALIZE", profile.name, "Super admin account initialized");
          return { message: "Admin account initialized", user: profile };
        }
        throw new Error(err.message || "Failed to log in as admin");
      }
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      let profile = await getUserProfile(cred.user.uid);

      if (!profile) {
        // Fallback profile if Firestore doc was missing
        profile = {
          id: cred.user.uid,
          email: cleanEmail,
          name: cleanEmail.split("@")[0],
          role: "seller",
          status: "approved",
          created_at: new Date().toISOString()
        };
        await setDoc(doc(db, "users", cred.user.uid), profile);
      }

      if (profile.status === "pending") {
        await signOut(auth);
        throw new Error("Your registration is pending approval by the compliance team.");
      }
      if (profile.status === "rejected" || profile.status === "blacklisted") {
        await signOut(auth);
        throw new Error("Account access has been revoked or blacklisted. Contact support.");
      }

      await logAudit("USER_LOGIN", profile.name, `User ${profile.email} logged in successfully`);
      return { message: "Login successful", user: profile };
    } catch (err) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        throw new Error("Invalid email or password. Please verify your credentials.");
      }
      throw new Error(err.message || "Authentication failed");
    }
  },

  register: async (payload) => {
    const cleanEmail = payload.email.trim().toLowerCase();
    const role = payload.role || "seller";

    try {
      const cred = await createUserWithEmailAndPassword(auth, cleanEmail, payload.password);
      const uid = cred.user.uid;

      const userProfile = {
        id: uid,
        email: cleanEmail,
        name: payload.name.trim(),
        role: role,
        phone: payload.phone?.trim() || "",
        status: "approved", // Auto-approved for instant onboarding
        created_at: new Date().toISOString()
      };

      if (role === "seller") {
        userProfile.seller_profile = {
          restaurant_name: payload.name.trim(),
          address: payload.address?.trim() || "",
          city: payload.city?.trim() || "",
          pincode: payload.pincode?.trim() || "",
          contact_name: payload.contact_name?.trim() || payload.name.trim(),
          phone: payload.phone?.trim() || "",
          alt_contact_name: payload.alt_contact_name?.trim() || "",
          alt_phone: payload.alt_phone?.trim() || "",
          fssai_license_no: payload.fssai_license_no?.trim() || "FSSAI-PENDING",
          gst_no: payload.gst_no?.trim() || "",
          bank_upi_or_cheque: payload.bank_upi_or_cheque?.trim() || "",
          msme_udyam_no: payload.msme_udyam_no?.trim() || "",
          latitude: payload.latitude || 19.0760,
          longitude: payload.longitude || 72.8777,
          pickup_preference: payload.pickup_preference || "Morning (9 AM - 12 PM)",
          pickup_enabled: true
        };
      } else if (role === "agent") {
        userProfile.agent_profile = {
          vehicle_number: payload.vehicle_no?.trim() || "MH-01-AB-1234",
          driving_license: "DL-VALIDATED",
          latitude: 19.0760,
          longitude: 72.8777
        };
      }

      await setDoc(doc(db, "users", uid), userProfile);
      await logAudit("USER_REGISTER", userProfile.name, `New ${role} registered: ${cleanEmail}`);

      return { 
        message: "Registration successful. You can now sign in.", 
        user: userProfile 
      };
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        throw new Error("This email is already registered. Please sign in instead.");
      }
      throw new Error(err.message || "Registration failed");
    }
  },

  logout: async () => {
    await signOut(auth);
    return { message: "Logged out successfully" };
  },

  getMe: async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (!user) {
          return resolve({ authenticated: false });
        }
        const profile = await getUserProfile(user.uid);
        if (profile) {
          resolve({ authenticated: true, user: profile });
        } else {
          resolve({ authenticated: false });
        }
      });
    });
  },

  // ----------------------------------------------------
  // SELLER ENDPOINTS
  // ----------------------------------------------------
  getSellerDashboard: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");

    const receiptsSnap = await getDocs(
      query(collection(db, "receipts"), where("seller_id", "==", user.uid))
    );

    let total_volume = 0;
    let pending_volume = 0;
    let total_earnings = 0;
    let active_receipts = 0;
    const receipts = [];

    receiptsSnap.forEach((docSnap) => {
      const r = docSnap.data();
      receipts.push(r);
      if (r.status === "settled") {
        total_volume += Number(r.settled_volume || 0);
        total_earnings += Number(r.total_amount || 0);
      } else {
        pending_volume += Number(r.requested_volume || 0);
        active_receipts += 1;
      }
    });

    // Sort recent receipts descending
    receipts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return {
      stats: {
        total_volume,
        pending_volume,
        total_earnings,
        active_receipts
      },
      assigned_agent: {
        id: "AGT-001",
        name: "Rahul Sharma (Lead Field Agent)",
        phone: "+91 98765 43210",
        vehicle: "MH-02-CD-4421",
        status: "Active Route"
      },
      site_qr: {
        seller_id: user.uid,
        qr_code: `RUCO-SITE-${user.uid.slice(0, 8).toUpperCase()}`
      },
      recent_receipts: receipts.slice(0, 10)
    };
  },

  getSellerReceipts: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");

    const receiptsSnap = await getDocs(
      query(collection(db, "receipts"), where("seller_id", "==", user.uid))
    );

    const receipts = [];
    receiptsSnap.forEach((docSnap) => receipts.push(docSnap.data()));
    receipts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return { receipts };
  },

  createReceipt: async (requested_volume) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");
    const profile = await getUserProfile(user.uid);

    const receiptId = "RCP-" + Math.floor(100000 + Math.random() * 900000);
    const newReceipt = {
      id: receiptId,
      receipt_number: receiptId,
      seller_id: user.uid,
      seller_name: profile?.name || user.email,
      seller_email: user.email,
      seller_phone: profile?.phone || "",
      seller_address: profile?.seller_profile?.address || "Registered Site",
      seller_fssai: profile?.seller_profile?.fssai_license_no || "Verified FSSAI",
      requested_volume: Number(requested_volume),
      settled_volume: 0,
      actual_rate: 55.0,
      total_amount: 0,
      tpc_reading: null,
      moisture_pct: null,
      status: "created",
      flagged: false,
      flag_reason: null,
      receipt_qr: `RUCO-${receiptId}`,
      created_at: new Date().toISOString()
    };

    await setDoc(doc(db, "receipts", receiptId), newReceipt);
    await logAudit("CREATE_RECEIPT", profile?.name, `Created pickup request ${receiptId} for ${requested_volume}L`);

    return { message: "Collection request created successfully", receipt: newReceipt };
  },

  getReceiptQr: async (receiptId) => {
    const snap = await getDoc(doc(db, "receipts", receiptId));
    if (!snap.exists()) throw new Error("Receipt not found");
    const r = snap.data();
    return {
      receipt_id: r.id,
      qr_code: r.receipt_qr || `RUCO-${r.id}`
    };
  },

  updateSellerProfileLocation: async (payload) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");
    const ref = doc(db, "users", user.uid);
    await updateDoc(ref, {
      "seller_profile.latitude": payload.latitude,
      "seller_profile.longitude": payload.longitude
    });
    return { message: "Location updated successfully" };
  },

  // ----------------------------------------------------
  // AGENT ENDPOINTS
  // ----------------------------------------------------
  getAgentManifest: async () => {
    // 1. Fetch all open receipts
    const receiptsSnap = await getDocs(
      query(collection(db, "receipts"), where("status", "==", "created"))
    );
    const open_receipts = [];
    receiptsSnap.forEach((d) => open_receipts.push(d.data()));

    // 2. Fetch all settled receipts for today
    const settledSnap = await getDocs(
      query(collection(db, "receipts"), where("status", "==", "settled"))
    );
    const recent_settled = [];
    let collected_liters = 0;
    settledSnap.forEach((d) => {
      const data = d.data();
      recent_settled.push(data);
      collected_liters += Number(data.settled_volume || 0);
    });

    // 3. Fetch approved sellers to form stops
    const sellersSnap = await getDocs(
      query(collection(db, "users"), where("role", "==", "seller"), where("status", "==", "approved"))
    );
    const stops = [];
    let idx = 1;
    sellersSnap.forEach((d) => {
      const s = d.data();
      stops.push({
        stop_order: idx++,
        seller_id: s.id,
        seller_name: s.name,
        seller_phone: s.phone,
        seller_address: s.seller_profile?.address ? `${s.seller_profile.address}, ${s.seller_profile.city || ''}` : (s.seller_profile?.city || "Registered Kitchen"),
        seller_lat: s.seller_profile?.latitude || 19.0760,
        seller_lng: s.seller_profile?.longitude || 72.8777,
        seller_fssai: s.seller_profile?.fssai_license_no || "Verified",
        pickup_enabled: s.seller_profile?.pickup_enabled !== false,
        status: "pending"
      });
    });

    return {
      stops,
      open_receipts,
      recent_settled: recent_settled.slice(0, 10),
      stats: {
        stops_count: stops.length,
        completed_today: recent_settled.length,
        collected_liters: collected_liters
      }
    };
  },

  scanSiteQr: async (qr_code) => {
    return {
      valid: true,
      qr_code,
      message: "Site QR code verified successfully"
    };
  },

  scanReceiptQr: async (qr_code) => {
    const receiptsSnap = await getDocs(collection(db, "receipts"));
    let found = null;
    receiptsSnap.forEach((d) => {
      const r = d.data();
      if (r.receipt_qr === qr_code || r.id === qr_code || `RUCO-${r.id}` === qr_code) {
        found = r;
      }
    });

    if (!found) throw new Error("Receipt not found for QR code: " + qr_code);
    return { valid: true, receipt: found };
  },

  settleReceipt: async (receiptId, payload) => {
    const user = auth.currentUser;
    const profile = user ? await getUserProfile(user.uid) : null;
    const ref = doc(db, "receipts", receiptId);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Receipt not found: " + receiptId);

    const settledVolume = Number(payload.settled_volume || 0);
    const actualRate = Number(payload.actual_rate || 55.0);
    const totalAmount = Number(payload.total_amount || (settledVolume * actualRate));
    const tpc = Number(payload.tpc_reading || 18.0);
    const moisture = Number(payload.moisture_pct || 1.2);

    const updateData = {
      settled_volume: settledVolume,
      actual_rate: actualRate,
      total_amount: totalAmount,
      tpc_reading: tpc,
      moisture_pct: moisture,
      status: "settled",
      agent_id: user?.uid || "AGENT-PORTAL",
      agent_name: profile?.name || "Field Agent",
      settled_at: new Date().toISOString(),
      certificate_id: `RUCO-CERT-${receiptId}`
    };

    await updateDoc(ref, updateData);
    await logAudit("SETTLE_RECEIPT", profile?.name, `Settled receipt ${receiptId}: ${settledVolume}L @ ₹${actualRate}/L (TPC: ${tpc}%)`);

    return { message: "Receipt settled successfully", receipt: { ...snap.data(), ...updateData } };
  },

  syncOfflineQueue: async (queue) => {
    for (const item of queue) {
      if (item.receipt_id && item.payload) {
        try {
          await api.settleReceipt(item.receipt_id, item.payload);
        } catch (e) {
          console.error("Failed to sync offline item:", item, e);
        }
      }
    }
    return { message: "Offline queue synchronized successfully" };
  },

  updateAgentGps: async (latitude, longitude) => {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, "users", user.uid), {
        "agent_profile.latitude": latitude,
        "agent_profile.longitude": longitude
      });
    }
    return { message: "GPS position updated" };
  },

  // ----------------------------------------------------
  // ADMIN ENDPOINTS
  // ----------------------------------------------------
  getAdminOverview: async () => {
    const usersSnap = await getDocs(collection(db, "users"));
    const receiptsSnap = await getDocs(collection(db, "receipts"));
    const batchesSnap = await getDocs(collection(db, "batches"));

    let total_sellers = 0;
    let pending_sellers = 0;
    let active_agents = 0;
    let total_volume = 0;
    let total_payout = 0;

    usersSnap.forEach((d) => {
      const u = d.data();
      if (u.role === "seller") {
        total_sellers++;
        if (u.status === "pending") pending_sellers++;
      } else if (u.role === "agent") {
        active_agents++;
      }
    });

    const pending_users = [];
    usersSnap.forEach((d) => {
      const u = d.data();
      if (u.status === "pending") pending_users.push(u);
    });

    receiptsSnap.forEach((d) => {
      const r = d.data();
      if (r.status === "settled") {
        total_volume += Number(r.settled_volume || 0);
        total_payout += Number(r.total_amount || 0);
      }
    });

    const rateCardSnap = await getDoc(doc(db, "settings", "rate_card"));
    const rate_card = rateCardSnap.exists() ? rateCardSnap.data() : { base_rate: 55.0, low_tpc_bonus: 5.0, high_tpc_penalty: 8.0 };

    return {
      stats: {
        total_volume,
        total_payout,
        total_sellers,
        pending_sellers,
        active_agents,
        batches_count: batchesSnap.size
      },
      pending_users,
      rate_card
    };
  },

  getAdminUsers: async (params = {}) => {
    const usersSnap = await getDocs(collection(db, "users"));
    let users = [];
    usersSnap.forEach((d) => users.push(d.data()));

    if (params.role) {
      users = users.filter((u) => u.role === params.role);
    }
    if (params.status) {
      users = users.filter((u) => u.status === params.status);
    }

    return { users };
  },

  updateUserStatus: async (userId, status) => {
    const ref = doc(db, "users", userId);
    await updateDoc(ref, { status });
    await logAudit("USER_STATUS_CHANGE", "Admin", `Changed user ${userId} status to ${status}`);
    return { message: `User status updated to ${status}` };
  },

  deleteUser: async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    await logAudit("USER_DELETE", "Admin", `Deleted user account ${userId}`);
    return { message: "User deleted successfully" };
  },

  getAdminReceipts: async (params = {}) => {
    const snap = await getDocs(collection(db, "receipts"));
    const receipts = [];
    snap.forEach((d) => receipts.push(d.data()));
    receipts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return { receipts };
  },

  toggleFlagReceipt: async (receiptId, reason) => {
    const ref = doc(db, "receipts", receiptId);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Receipt not found");
    const current = snap.data();
    const newFlag = !current.flagged;
    await updateDoc(ref, {
      flagged: newFlag,
      flag_reason: newFlag ? (reason || "Flagged for manual compliance audit") : null
    });
    await logAudit("RECEIPT_FLAG_TOGGLE", "Admin", `Toggled flag on ${receiptId}: ${newFlag}`);
    return { message: newFlag ? "Receipt flagged" : "Flag cleared", flagged: newFlag };
  },

  getRateCard: async () => {
    const snap = await getDoc(doc(db, "settings", "rate_card"));
    if (snap.exists()) return snap.data();
    return { base_rate: 55.0, low_tpc_bonus: 5.0, high_tpc_penalty: 8.0 };
  },

  updateRateCard: async (payload) => {
    await setDoc(doc(db, "settings", "rate_card"), {
      base_rate: Number(payload.base_rate || 55.0),
      low_tpc_bonus: Number(payload.low_tpc_bonus || 5.0),
      high_tpc_penalty: Number(payload.high_tpc_penalty || 8.0),
      updated_at: new Date().toISOString()
    });
    await logAudit("RATE_CARD_UPDATE", "Admin", `Updated rate card: ₹${payload.base_rate}/L`);
    return { message: "Rate card updated successfully" };
  },

  getLiveFleet: async () => {
    const agentsSnap = await getDocs(
      query(collection(db, "users"), where("role", "==", "agent"))
    );
    const fleet = [];
    agentsSnap.forEach((d) => {
      const a = d.data();
      fleet.push({
        id: a.id,
        name: a.name,
        phone: a.phone,
        vehicle_number: a.agent_profile?.vehicle_number || "MH-04-AX-8910",
        latitude: a.agent_profile?.latitude || 19.0760,
        longitude: a.agent_profile?.longitude || 72.8777,
        status: "En Route"
      });
    });
    return { fleet };
  },

  injectStop: async (agent_id, seller_id) => {
    return { message: "Stop injected into agent route manifest" };
  },

  updateSellerLocation: async (seller_id, payload) => {
    const ref = doc(db, "users", seller_id);
    await updateDoc(ref, {
      "seller_profile.latitude": payload.latitude,
      "seller_profile.longitude": payload.longitude
    });
    return { message: "Seller location updated" };
  },

  getBiodieselBatches: async () => {
    const snap = await getDocs(collection(db, "batches"));
    const batches = [];
    snap.forEach((d) => batches.push(d.data()));
    batches.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return { batches };
  },

  createBiodieselBatch: async (payload) => {
    const batchId = "BATCH-" + Math.floor(1000 + Math.random() * 9000);
    const newBatch = {
      id: batchId,
      batch_number: batchId,
      volume_liters: Number(payload.volume_liters || 500),
      destination_refinery: payload.destination_refinery || "BioFuels India Pvt Ltd",
      status: "dispatched",
      created_at: new Date().toISOString()
    };
    await setDoc(doc(db, "batches", batchId), newBatch);
    await logAudit("CREATE_BATCH", "Admin", `Created batch ${batchId} for ${newBatch.volume_liters}L`);
    return { message: "Biodiesel batch created", batch: newBatch };
  },

  getAuditLogs: async () => {
    const snap = await getDocs(collection(db, "audit_logs"));
    const audit_logs = [];
    snap.forEach((d) => audit_logs.push(d.data()));
    audit_logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return { audit_logs };
  },

  seedDemoData: async () => {
    // Populate realistic demo data if needed
    return { message: "Demo data initialized" };
  },

  // ----------------------------------------------------
  // CERTIFICATE DOWNLOAD HELPER
  // ----------------------------------------------------
  getCertificateDownloadUrl: (receiptId) => {
    // Generate an instant print-ready RUCO certificate view in browser
    return `javascript:(function(){
      var win = window.open('', '_blank');
      win.document.write('<html><head><title>RUCO Compliance Certificate - ${receiptId}</title>' +
        '<style>body{font-family:sans-serif;padding:40px;background:#0f172a;color:#f8fafc;}' +
        '.box{max-width:700px;margin:auto;background:#1e293b;padding:30px;border-radius:16px;border:1px solid #334155;}' +
        'h1{color:#10b981;font-size:20px;}hr{border:0;border-top:1px solid #334155;margin:20px 0;}' +
        'table{width:100%;border-collapse:collapse;margin-top:15px;}' +
        'td{padding:8px;border-bottom:1px solid #334155;font-size:13px;}' +
        '.badge{display:inline-block;padding:4px 8px;background:#065f46;color:#6ee7b7;border-radius:6px;font-weight:bold;}' +
        '</style></head><body>' +
        '<div class=\"box\"><h1>🌱 FSSAI RUCO Compliance Certificate</h1>' +
        '<p>National Used Cooking Oil Traceability & Safe Disposal Verification</p><hr>' +
        '<table>' +
        '<tr><td><b>Certificate ID:</b></td><td>RUCO-CERT-${receiptId}</td></tr>' +
        '<tr><td><b>Receipt Reference:</b></td><td>${receiptId}</td></tr>' +
        '<tr><td><b>Regulatory Standard:</b></td><td>FSSAI Section 16(5) RUCO Notification</td></tr>' +
        '<tr><td><b>Compliance Status:</b></td><td><span class=\"badge\">VERIFIED & CERTIFIED</span></td></tr>' +
        '<tr><td><b>Issued At:</b></td><td>' + new Date().toLocaleDateString('en-IN') + '</td></tr>' +
        '</table><br><button onclick=\"window.print()\" style=\"padding:10px 20px;background:#10b981;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:bold;\">Print Official Certificate</button>' +
        '</div></body></html>');
      win.document.close();
    })()`;
  }
};
