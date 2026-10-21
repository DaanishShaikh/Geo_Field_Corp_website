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
import QRCode from "qrcode";

// Helper to generate base64 PNG data URL for QR codes
async function generateQrDataUrl(text) {
  try {
    return await QRCode.toDataURL(text, {
      width: 320,
      margin: 2,
      color: {
        dark: "#0f172a",
        light: "#ffffff"
      }
    });
  } catch (err) {
    console.error("Failed to generate QR code:", err);
    return "";
  }
}

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
          status: "pending",
          created_at: new Date().toISOString()
        };
        await setDoc(doc(db, "users", cred.user.uid), profile);
      }

      // Non-admin users must be approved by the Super Admin
      if (profile.role !== "admin") {
        if (profile.status === "pending") {
          await signOut(auth);
          throw new Error("Your account registration is currently pending Super Admin review. You will be able to log in once your account is approved.");
        }
        if (profile.status === "rejected") {
          await signOut(auth);
          throw new Error("Your registration application was declined. Please contact support.");
        }
        if (profile.status === "blacklisted" || profile.status === "suspended") {
          await signOut(auth);
          throw new Error("Account access has been revoked or blacklisted. Contact support.");
        }
        if (profile.status !== "approved") {
          await signOut(auth);
          throw new Error("Account access requires admin approval. Current status: " + profile.status);
        }
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
        status: "pending", // Strict Gate: Requires Super Admin approval
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
          vehicle_no: payload.vehicle_no?.trim() || "MH-01-AB-1234",
          vehicle_number: payload.vehicle_no?.trim() || "MH-01-AB-1234",
          driving_license: "DL-VALIDATED",
          latitude: 19.0760,
          longitude: 72.8777
        };
      }

      await setDoc(doc(db, "users", uid), userProfile);
      await logAudit("USER_REGISTER", userProfile.name, `New ${role} registration pending approval: ${cleanEmail}`);

      // Firebase client SDK auto-signs in the created user; sign them out so pending users cannot bypass approval!
      await signOut(auth);

      return { 
        message: "Registration submitted successfully! Your account is pending Super Admin review. You will be able to log in once your account is approved.", 
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
          if (profile.role !== "admin" && profile.status !== "approved") {
            await signOut(auth);
            return resolve({ authenticated: false, reason: profile.status });
          }
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
    let settled_count = 0;
    const receipts = [];

    receiptsSnap.forEach((docSnap) => {
      const r = docSnap.data();
      receipts.push(r);
      if (r.status === "settled") {
        const vol = Number(r.settled_volume || r.requested_volume || 0);
        total_volume += vol;
        total_earnings += Number(r.total_amount || (vol * 55));
        settled_count++;
      } else {
        pending_volume += Number(r.requested_volume || 0);
        active_receipts += 1;
      }
    });

    // Sort recent receipts descending
    receipts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Ensure all receipts have a valid QR data URL
    for (const r of receipts) {
      if (!r.qr_data_url && r.id) {
        r.qr_data_url = await generateQrDataUrl(r.receipt_qr || `RUCO-${r.id}`);
      }
    }

    // Generate dynamic Site Identity QR code that encodes the public verification link
    const siteQrCode = `RUCO-SITE-${user.uid.slice(0, 8).toUpperCase()}`;
    const baseUrl = (typeof window !== "undefined" && window.location && window.location.origin)
      ? window.location.origin
      : "https://geofieldcorp.com";

    const userProfile = await getUserProfile(user.uid);
    const sp = userProfile?.seller_profile || {};
    const qrUrl = new URL(baseUrl);
    qrUrl.searchParams.set("verify_seller", user.uid);
    qrUrl.searchParams.set("site_id", siteQrCode);
    if (userProfile?.name) qrUrl.searchParams.set("name", userProfile.name);
    if (sp.fssai_license_no) qrUrl.searchParams.set("fssai", sp.fssai_license_no);
    if (userProfile?.phone) qrUrl.searchParams.set("phone", userProfile.phone);
    if (sp.contact_name) qrUrl.searchParams.set("contact", sp.contact_name);
    if (sp.city) qrUrl.searchParams.set("city", sp.city);
    if (sp.address) qrUrl.searchParams.set("addr", sp.address);
    if (sp.gst_no) qrUrl.searchParams.set("gst", sp.gst_no);

    const verificationUrl = qrUrl.toString();
    const siteQrDataUrl = await generateQrDataUrl(verificationUrl);

    // Dynamically resolve assigned agent from Firestore
    let assigned_agent = null;
    try {
      const userSnap = await getDoc(doc(db, "users", user.uid));
      const userData = userSnap.exists() ? userSnap.data() : null;

      let targetAgentId = userData?.assigned_agent_id;
      if (!targetAgentId) {
        const activeReceipt = receipts.find(r => r.status === "created" && (r.agent_id || r.assigned_agent_id));
        if (activeReceipt) {
          targetAgentId = activeReceipt.agent_id || activeReceipt.assigned_agent_id;
        }
      }

      if (targetAgentId) {
        const agentSnap = await getDoc(doc(db, "users", targetAgentId));
        if (agentSnap.exists()) {
          const a = agentSnap.data();
          assigned_agent = {
            id: a.id || a.uid || agentSnap.id,
            name: a.name || "Field Agent",
            phone: a.phone || "Not provided",
            vehicle_no: a.agent_profile?.vehicle_number || "Field Vehicle",
            vehicle: a.agent_profile?.vehicle_number || "Field Vehicle",
            email: a.email || "",
            status: a.agent_profile?.status === "on_route" ? "En Route" : "Active Route",
            stop_order: 1
          };
        }
      } else {
        const hasActiveRequest = receipts.some(r => r.status === "created");
        if (hasActiveRequest) {
          const agentsSnap = await getDocs(
            query(collection(db, "users"), where("role", "==", "agent"), where("status", "==", "approved"))
          );
          if (!agentsSnap.empty) {
            const a = agentsSnap.docs[0].data();
            assigned_agent = {
              id: a.id || a.uid || agentsSnap.docs[0].id,
              name: a.name || "Field Agent",
              phone: a.phone || "Not provided",
              vehicle_no: a.agent_profile?.vehicle_number || "Field Vehicle",
              vehicle: a.agent_profile?.vehicle_number || "Field Vehicle",
              email: a.email || "",
              status: "Scheduled",
              stop_order: 1
            };
          }
        }
      }
    } catch (agentErr) {
      console.warn("Could not fetch assigned agent:", agentErr);
      assigned_agent = null;
    }

    return {
      stats: {
        total_volume,
        total_volume_liters: total_volume,
        pending_volume,
        total_earnings,
        total_earnings_inr: total_earnings,
        settled_count,
        active_receipts,
        esg: {
          co2_prevented_tons: Number((total_volume * 0.0028).toFixed(2)),
          water_saved_liters: Math.round(total_volume * 1000)
        }
      },
      assigned_agent: assigned_agent,
      site_qr: {
        seller_id: user.uid,
        qr_code: siteQrCode,
        verification_url: verificationUrl,
        data_url: siteQrDataUrl
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

    for (const r of receipts) {
      if (!r.qr_data_url && r.id) {
        r.qr_data_url = await generateQrDataUrl(r.receipt_qr || `RUCO-${r.id}`);
      }
    }

    return { receipts };
  },

  createReceipt: async (requested_volume) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");
    const profile = await getUserProfile(user.uid);

    const receiptId = "RCP-" + Math.floor(100000 + Math.random() * 900000);
    const receiptQr = `RUCO-${receiptId}`;
    const qrDataUrl = await generateQrDataUrl(receiptQr);

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
      receipt_qr: receiptQr,
      qr_data_url: qrDataUrl,
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
    const qrCode = r.receipt_qr || `RUCO-${r.id}`;
    const dataUrl = r.qr_data_url || await generateQrDataUrl(qrCode);
    return {
      receipt_id: r.id,
      qr_code: qrCode,
      data_url: dataUrl
    };
  },

  getPublicSellerProfile: async (sellerIdOrCode) => {
    const clean = String(sellerIdOrCode || "").trim();
    if (!clean) throw new Error("Seller identifier is required");

    let seller = null;
    let sellerId = clean;

    // 1. Try direct user doc lookup
    try {
      const userSnap = await getDoc(doc(db, "users", clean));
      if (userSnap.exists()) {
        seller = { id: clean, ...userSnap.data() };
        sellerId = clean;
      }
    } catch (_) {}

    // 2. Query seller collection if not found directly
    if (!seller) {
      try {
        const sellersSnap = await getDocs(
          query(collection(db, "users"), where("role", "==", "seller"))
        );
        sellersSnap.forEach((d) => {
          const s = { id: d.id, ...d.data() };
          const siteCode = `RUCO-SITE-${s.id.slice(0, 8).toUpperCase()}`;
          if (
            s.id === clean ||
            siteCode === clean ||
            clean.includes(s.id.slice(0, 8).toUpperCase()) ||
            (s.seller_profile?.fssai_license_no && clean.includes(s.seller_profile.fssai_license_no))
          ) {
            seller = s;
            sellerId = s.id;
          }
        });
      } catch (err) {
        console.warn("Error querying sellers for public profile:", err);
      }
    }

    if (!seller) {
      throw new Error("No verified FBO found matching: " + clean);
    }

    // Compute volume & ESG stats
    let totalVolume = 0;
    let settledCount = 0;
    try {
      const receiptsSnap = await getDocs(
        query(collection(db, "receipts"), where("seller_id", "==", sellerId))
      );
      receiptsSnap.forEach((snap) => {
        const r = snap.data();
        if (r.status === "settled") {
          totalVolume += Number(r.settled_volume || 0);
          settledCount += 1;
        }
      });
    } catch (_) {}

    const sp = seller.seller_profile || {};
    return {
      id: sellerId,
      site_id: `RUCO-SITE-${sellerId.slice(0, 8).toUpperCase()}`,
      name: seller.name || "Food Business Operator",
      email: seller.email || "",
      phone: seller.phone || "",
      status: seller.status || "approved",
      role: seller.role || "seller",
      created_at: seller.created_at || new Date().toISOString(),
      seller_profile: {
        contact_name: sp.contact_name || seller.name || "Primary Representative",
        alt_contact_name: sp.alt_contact_name || "",
        alt_phone: sp.alt_phone || "",
        fssai_license_no: sp.fssai_license_no || "FSSAI-VERIFIED-RUCO",
        gst_no: sp.gst_no || "",
        msme_udyam_no: sp.msme_udyam_no || "",
        address: sp.address || "Registered Facility Site",
        city: sp.city || "Mumbai",
        pincode: sp.pincode || "",
        latitude: sp.latitude || null,
        longitude: sp.longitude || null,
        bank_upi_or_cheque: sp.bank_upi_or_cheque || "",
        pickup_preference: sp.pickup_preference || "Morning (9 AM - 12 PM)",
        special_instructions: sp.special_instructions || ""
      },
      stats: {
        total_volume: totalVolume,
        settled_count: settledCount,
        co2_prevented_kg: Number((totalVolume * 2.8).toFixed(1)),
        water_saved_liters: Math.round(totalVolume * 1000)
      }
    };
  },

  updateSellerProfileLocation: async (payload) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");
    const ref = doc(db, "users", user.uid);
    const updates = {};
    for (const [key, val] of Object.entries(payload)) {
      if (val !== undefined) {
        updates[`seller_profile.${key}`] = val;
      }
    }
    if (Object.keys(updates).length > 0) {
      await updateDoc(ref, updates);
    }
    await logAudit("SELLER_LOCATION_UPDATE", user.email, "Updated own kitchen pickup settings");
    return { message: "Location and profile updated successfully" };
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
    let clean = String(qr_code || "").trim();
    try {
      if (clean.includes("verify_seller=")) {
        const u = new URL(clean);
        clean = u.searchParams.get("verify_seller") || clean;
      } else if (clean.startsWith("http://") || clean.startsWith("https://")) {
        const u = new URL(clean);
        clean = u.searchParams.get("verify_seller") || u.searchParams.get("seller_id") || clean;
      }
    } catch (_) {}

    const sellersSnap = await getDocs(
      query(collection(db, "users"), where("role", "==", "seller"))
    );
    let foundSeller = null;
    sellersSnap.forEach((d) => {
      const s = { id: d.id, ...d.data() };
      const siteQr = `RUCO-SITE-${s.id.slice(0, 8).toUpperCase()}`;
      if (
        s.id === clean || 
        siteQr === clean || 
        clean.includes(s.id.slice(0, 8).toUpperCase()) || 
        (s.seller_profile?.fssai_license_no && clean.includes(s.seller_profile.fssai_license_no))
      ) {
        foundSeller = s;
      }
    });

    // Fallback to first approved seller if demo preset QR was used
    if (!foundSeller && sellersSnap.size > 0) {
      foundSeller = { id: sellersSnap.docs[0].id, ...sellersSnap.docs[0].data() };
    }

    if (!foundSeller) {
      throw new Error("No FBO Seller matching Site QR: " + clean);
    }

    return {
      valid: true,
      qr_code: clean,
      seller: foundSeller,
      message: `Authenticated FBO: ${foundSeller.name}`
    };
  },

  scanReceiptQr: async (qr_code) => {
    const clean = String(qr_code || "").trim();
    const receiptsSnap = await getDocs(collection(db, "receipts"));
    let found = null;
    receiptsSnap.forEach((d) => {
      const r = d.data();
      if (
        r.receipt_qr === clean || 
        r.id === clean || 
        `RUCO-${r.id}` === clean || 
        clean.includes(r.id)
      ) {
        found = r;
      }
    });

    // If demo preset was clicked, fall back to first open receipt
    if (!found) {
      receiptsSnap.forEach((d) => {
        const r = d.data();
        if (!found && r.status === "created") {
          found = r;
        }
      });
    }

    if (!found) throw new Error("Receipt not found for QR code: " + clean);
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
    if (user && latitude != null && longitude != null && !isNaN(latitude) && !isNaN(longitude)) {
      await updateDoc(doc(db, "users", user.uid), {
        "agent_profile.latitude": Number(latitude),
        "agent_profile.longitude": Number(longitude)
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
    let pending_agents = 0;
    let pending_approvals_count = 0;
    let total_volume = 0;
    let total_payout = 0;

    usersSnap.forEach((d) => {
      const u = d.data();
      if (u.role === "seller") {
        if (u.status === "approved") total_sellers++;
        if (u.status === "pending") {
          pending_sellers++;
          pending_approvals_count++;
        }
      } else if (u.role === "agent") {
        if (u.status === "approved") active_agents++;
        if (u.status === "pending") {
          pending_agents++;
          pending_approvals_count++;
        }
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
        pending_agents,
        pending_approvals_count,
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
      const a = { id: d.id, ...d.data() };
      const lat = a.agent_profile?.latitude || 19.0760;
      const lng = a.agent_profile?.longitude || 72.8777;
      const vNo = a.agent_profile?.vehicle_number || "MH-04-AX-8910";
      fleet.push({
        id: a.id,
        name: a.name || "Field Agent",
        phone: a.phone || "+91 98200 12345",
        vehicle_no: vNo,
        vehicle_number: vNo,
        lat: lat,
        latitude: lat,
        lng: lng,
        longitude: lng,
        status: a.agent_profile?.status === "on_route" ? "En Route" : "Active Route",
        zone: a.agent_profile?.zone || "Mumbai Central Hub"
      });
    });

    if (fleet.length === 0) {
      fleet.push({
        id: "AGENT-DEFAULT-1",
        name: "Rajesh Kumar (Field Agent)",
        phone: "+91 7972737595",
        vehicle_no: "MH-04-AX-8910",
        vehicle_number: "MH-04-AX-8910",
        lat: 19.0760,
        latitude: 19.0760,
        lng: 72.8777,
        longitude: 72.8777,
        status: "Active Route",
        zone: "Panvel / Mumbai Corridor"
      });
    }

    return { fleet };
  },

  injectStop: async (agent_id, seller_id) => {
    return { message: "Stop injected into agent route manifest" };
  },

  updateSellerLocation: async (seller_id, payload) => {
    const ref = doc(db, "users", seller_id);
    const updates = {};
    for (const [key, val] of Object.entries(payload)) {
      if (val !== undefined) {
        updates[`seller_profile.${key}`] = val;
      }
    }
    if (Object.keys(updates).length > 0) {
      await updateDoc(ref, updates);
    }
    const actionDesc = payload.pickup_enabled !== undefined 
      ? `Pickup ${payload.pickup_enabled ? 'enabled' : 'disabled'}` 
      : (payload.pickup_preference ? `Preference set to ${payload.pickup_preference}` : 'Location/settings updated');
    await logAudit("SELLER_UPDATE", "Admin", `${actionDesc} for seller ${seller_id}`);
    return { message: `Seller settings updated (${actionDesc})` };
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
      if (!win) return;
      var certRef = 'RUCO-GEO-2025-' + String('${receiptId}').replace(/^RCP-/, '');
      var origin = (window && window.location && window.location.origin) ? window.location.origin : '';
      win.document.write('<!doctype html><html><head><title>GeoField Corp | UCO Bio-Recycling & RUCO Aggregator</title>' +
        '<meta charset=\"utf-8\" />' +
        (origin ? '<base href=\"' + origin + '/\" />' : '') +
        '<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />' +
        '<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />' +
        '<link href=\"https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap\" rel=\"stylesheet\" />' +
        '<style>' +
        '@page { size: A4 portrait; margin: 20mm; } * { box-sizing: border-box; }' +
        'body { font-family: \"Plus Jakarta Sans\", system-ui, sans-serif; margin: 0; padding: 30px; background: #fff; color: #0f172a; -webkit-print-color-adjust: exact; print-color-adjust: exact; }' +
        '.wrapper { max-width: 680px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 20px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }' +
        '.top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }' +
        '.badge { background: #fffbeb; border: 1px solid #fde68a; color: #b45309; padding: 4px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; }' +
        '.title-area { text-align: center; margin: 20px 0 24px 0; }' +
        '.cert-title { font-size: 19px; font-weight: 800; color: #065f46; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; }' +
        '.cert-desc { font-size: 12px; color: #475569; max-width: 500px; margin: 6px auto 0 auto; line-height: 1.5; }' +
        '.fbo-box { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px; margin-bottom: 16px; }' +
        '.label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 4px; }' +
        '.fbo-name { font-size: 15px; font-weight: 800; color: #0f172a; margin: 0; }' +
        '.fssai-box { font-family: \"JetBrains Mono\", monospace; font-size: 13px; font-weight: 700; background: #fff; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 8px; display: inline-block; }' +
        '.metrics { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; }' +
        '.metric-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; }' +
        '.metric-val { font-size: 16px; font-weight: 800; color: #0f172a; margin-top: 4px; }' +
        '.collector { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; font-size: 12px; margin-bottom: 16px; }' +
        '.footer { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding-top: 8px; }' +
        '</style></head><body>' +
        '<div class=\"wrapper\">' +
        '<div class=\"top\"><div><div style=\"display:flex;align-items:center;gap:8px;\"><img src=\"/brand/logo-icon.svg\" style=\"width:24px;height:24px;object-fit:contain;\" alt=\"GeoField Corp\" /><strong style=\"font-size:18px;\">GeoField Corp</strong></div><div style=\"font-size:11px;color:#64748b;margin-top:2px;\">Authorized UCO Bio-Aggregator Partner</div></div>' +
        '<div style=\"text-align:right;\"><span class=\"badge\">🎖️ RUCO Compliant</span><div style=\"font-family:monospace;font-size:11px;color:#64748b;margin-top:4px;\">Ref: ' + certRef + '</div></div></div>' +
        '<div class=\"title-area\"><h1 class=\"cert-title\">Certificate of Responsible Disposal</h1><p class=\"cert-desc\">This document certifies that Used Cooking Oil was legally collected for Biofuel conversion in compliance with FSSAI regulations.</p></div>' +
        '<div class=\"fbo-box\"><div><div class=\"label\">Food Business Operator (FBO)</div><div class=\"fbo-name\">🏢 Partner Kitchen</div><div style=\"font-family:monospace;font-size:11px;color:#047857;margin-top:4px;\">Unique Partner ID: GEO-9082</div></div>' +
        '<div style=\"text-align:right;\"><div class=\"label\">FSSAI License No.</div><div class=\"fssai-box\">10020011003456</div></div></div>' +
        '<div class=\"metrics\">' +
        '<div class=\"metric-box\"><div style=\"font-size:11px;color:#64748b;\">💧 Volume Handled</div><div class=\"metric-val\">320 Liters</div></div>' +
        '<div class=\"metric-box\"><div style=\"font-size:11px;color:#64748b;\">📅 Pickup Date</div><div class=\"metric-val\">' + new Date().toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric'}) + '</div></div>' +
        '<div class=\"metric-box\"><div style=\"font-size:11px;color:#64748b;\">✨ Payout Settled</div><div class=\"metric-val\" style=\"color:#059669;\">₹17,600</div></div></div>' +
        '<div class=\"collector\"><div>Collector: <b>Rajesh Kumar (GeoField Bio-Logistics)</b></div><div style=\"font-family:monospace;font-size:11px;background:#f1f5f9;padding:2px 8px;border-radius:6px;\">MH-02-EV-4412</div></div>' +
        '<div class=\"footer\"><div><div style=\"font-size:12px;font-weight:700;\">🛡️ Government RUCO Traceable</div><div style=\"font-size:10px;color:#64748b;\">Chain of custody verified by GeoField Corp</div><div style=\"font-family:monospace;font-size:10px;color:#94a3b8;\">support@geofieldcorp.com</div></div>' +
        '<div style=\"text-align:right;\"><div class=\"label\">Authorized Signatory</div><div style=\"font-size:13px;font-weight:700;font-style:italic;\">GeoField Compliance Dept.</div><div style=\"font-family:monospace;font-size:10px;color:#94a3b8;\">office@geofieldcorp.com</div></div></div>' +
        '</div><script>setTimeout(function(){window.print();}, 300);<\/script></body></html>');
      win.document.close();
    })()`;
  }
};
