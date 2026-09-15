<template>
  <div 
    :class="currentUser ? 'bg-slate-900 text-slate-100 selection:bg-emerald-500 selection:text-white' : 'bg-[#FAF8F5] text-[#1E2820] selection:bg-[#C85A32] selection:text-white'" 
    class="min-h-screen flex flex-col transition-colors duration-300"
  >
    <!-- Top Navbar -->
    <Navbar 
      :user="currentUser" 
      :is-online="isOnline" 
      :offline-count="offlineQueue.length"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @logout="handleLogout"
      @open-auth="openAuthModal"
    />

    <!-- Toast Notification Banner -->
    <transition name="fade">
      <div 
        v-if="toastMsg" 
        class="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-slate-800 border border-emerald-500/60 text-white shadow-2xl text-xs font-semibold flex items-center gap-3 max-w-md glow-emerald"
      >
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{{ toastMsg }}</span>
      </div>
    </transition>

    <!-- 1. HIGH-ENERGY NARRATIVE LANDING PAGE (When unauthenticated) -->
    <LandingPage 
      v-if="!currentUser"
      @open-register="openAuthModal('register')"
      @open-login="openAuthModal('login')"
    />

    <!-- 2. AUTHENTICATED PLATFORM PORTAL (When logged in) -->
    <div v-else class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar Navigation -->
      <Sidebar 
        :user="currentUser" 
        :current-view="currentView" 
        :is-open="sidebarOpen"
        @navigate="handleNavigate"
      />

      <!-- Main Portal Workspace -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <!-- 1. Dashboard View (Seller / Agent / Admin) -->
        <div v-if="currentView === 'dashboard'">
          <SellerDashboard 
            v-if="currentUser.role === 'seller'" 
            :seller="currentUser"
            :assigned-agent="sellerData.assigned_agent"
            :stats="sellerData.stats || {}"
            :site-qr="sellerData.site_qr || {}"
            :recent-receipts="sellerData.recent_receipts || []"
            @create-receipt="handleCreateReceipt"
            @view-ledger="currentView = 'receipts'"
            @update-location="handleUpdateSellerLocationSelf"
          />

          <AgentDashboard 
            v-else-if="currentUser.role === 'agent'"
            :agent="currentUser"
            :stats="agentData.stats || {}"
            :stops="agentData.stops || []"
            :open-receipts="agentData.open_receipts || []"
            :recent-settled="agentData.recent_settled || []"
            :offline-queue="offlineQueue"
            :is-online="isOnline"
            @settle-receipt="handleSettleReceipt"
            @scan-site="handleScanSite"
            @scan-receipt="handleScanReceipt"
            @toggle-offline="isOnline = !isOnline"
            @sync-offline="handleSyncOffline"
            @update-gps="handleUpdateAgentGps"
          />

          <AdminDashboard 
            v-else-if="currentUser.role === 'admin'"
            :stats="adminData.stats || {}"
            :pending-users="adminData.pending_users || []"
            :rate-card="adminData.rate_card || {}"
            :fleet-agents="fleetData"
            :manifest-stops="adminManifestStops"
            :batches="biodieselBatches"
            :approved-sellers="approvedSellers"
            :active-agents="activeAgents"
            @update-user-status="handleUpdateUserStatus"
            @update-rate-card="handleUpdateRateCard"
            @inject-stop="handleInjectStop"
            @update-seller-location="handleUpdateSellerLocation"
            @delete-user="handleDeleteUser"
          />
        </div>

        <!-- 2. Master Receipt & Certificate Ledger -->
        <ReceiptLedger 
          v-else-if="currentView === 'receipts'"
          :receipts="allReceipts"
          :user-role="currentUser.role"
          @toggle-flag="handleToggleFlag"
          @blacklist-user="handleBlacklistUser"
        />

        <!-- 3. Smart Logistics / Fleet Map -->
        <div v-else-if="currentView === 'logistics'" class="space-y-4">
          <MapboxView 
            :title="currentUser.role === 'admin' ? 'Live Fleet GPS Tracking & Dispatch' : 'Assigned Route Stop Navigation'"
            :subtitle="currentUser.role === 'admin' ? 'Real-time vehicle locations and route clusters' : 'Daily stops arranged in optimized order'"
            :agents="currentUser.role === 'admin' ? fleetData : []"
            :stops="currentUser.role === 'admin' ? adminManifestStops : agentData.stops"
          />
        </div>

        <!-- 4. Append-Only Audit Log -->
        <AuditLedger 
          v-else-if="currentView === 'audit'"
          :audit-logs="auditLogs"
        />
      </main>
    </div>

    <!-- Auth Modal (Login / Register) -->
    <AuthModal 
      v-if="authModalOpen"
      :initial-mode="authInitialMode"
      @close="authModalOpen = false"
      @login="handleLogin"
      @register="handleRegister"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from './services/api';
import { getOfflineQueue, addOfflineSettlement, clearOfflineQueue, cacheManifest, getCachedManifest } from './services/db';

import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import AuthModal from './components/AuthModal.vue';
import LandingPage from './components/LandingPage.vue';
import SellerDashboard from './components/SellerDashboard.vue';
import AgentDashboard from './components/AgentDashboard.vue';
import AdminDashboard from './components/AdminDashboard.vue';
import ReceiptLedger from './components/ReceiptLedger.vue';
import AuditLedger from './components/AuditLedger.vue';
import MapboxView from './components/MapboxView.vue';

const currentUser = ref(null);
const currentView = ref('dashboard');
const sidebarOpen = ref(false);
const authModalOpen = ref(false);
const authInitialMode = ref('login');
const isOnline = ref(navigator.onLine);
const toastMsg = ref('');
const offlineQueue = ref([]);

// Portal State Data
const sellerData = ref({});
const agentData = ref({ stops: [], open_receipts: [], stats: {} });
const adminData = ref({ stats: {}, pending_users: [], rate_card: {} });
const allReceipts = ref([]);
const fleetData = ref([]);
const adminManifestStops = ref([]);
const biodieselBatches = ref([]);
const auditLogs = ref([]);
const approvedSellers = ref([]);
const activeAgents = ref([]);


function showToast(msg) {
  toastMsg.value = msg;
  setTimeout(() => {
    toastMsg.value = '';
  }, 3500);
}

function openAuthModal(mode = 'login') {
  authInitialMode.value = mode;
  authModalOpen.value = true;
}

onMounted(async () => {
  window.addEventListener('online', () => { isOnline.value = true; handleSyncOffline(); });
  window.addEventListener('offline', () => { isOnline.value = false; });
  
  await refreshOfflineQueue();
  await checkAuth();
});

async function refreshOfflineQueue() {
  offlineQueue.value = await getOfflineQueue();
}

async function checkAuth() {
  try {
    const res = await api.getMe();
    if (res.authenticated) {
      currentUser.value = res.user;
      await loadRoleData();
    }
  } catch (e) {
    currentUser.value = null;
  }
}

async function loadRoleData() {
  if (!currentUser.value) return;

  try {
    if (currentUser.value.role === 'seller') {
      sellerData.value = await api.getSellerDashboard();
      const recRes = await api.getSellerReceipts();
      allReceipts.value = recRes.receipts || [];
    } else if (currentUser.value.role === 'agent') {
      try {
        agentData.value = await api.getAgentManifest();
        await cacheManifest(agentData.value);
      } catch (err) {
        const cached = await getCachedManifest();
        if (cached) agentData.value = cached;
      }
      allReceipts.value = agentData.value.open_receipts || [];
    } else if (currentUser.value.role === 'admin') {
      adminData.value = await api.getAdminOverview();
      const recs = await api.getAdminReceipts();
      allReceipts.value = recs.receipts || [];
      const fleet = await api.getLiveFleet();
      fleetData.value = fleet.fleet || [];
      const batches = await api.getBiodieselBatches();
      biodieselBatches.value = batches.batches || [];
      const logs = await api.getAuditLogs();
      auditLogs.value = logs.audit_logs || [];
      
      // Load approved sellers for manifest stops
      const sellersApprovedRes = await api.getAdminUsers({ role: 'seller', status: 'approved' });
      adminManifestStops.value = (sellersApprovedRes.users || []).map((s, idx) => ({
        stop_order: idx + 1,
        seller_id: s.id,
        seller_name: s.name,
        seller_phone: s.phone,
        seller_address: s.seller_profile?.address ? `${s.seller_profile.address}${s.seller_profile.city ? ', ' + s.seller_profile.city : ''}${s.seller_profile.pincode ? ' - ' + s.seller_profile.pincode : ''}` : (s.seller_profile?.city || ''),
        seller_lat: s.seller_profile?.latitude,
        seller_lng: s.seller_profile?.longitude,
        seller_fssai: s.seller_profile?.fssai_license_no || 'Verified',
        pickup_enabled: s.seller_profile?.pickup_enabled !== false,
        pickup_preference: s.seller_profile?.pickup_preference || 'Morning (9 AM - 12 PM)',
        status: 'pending'
      }));
      // Load ALL sellers (approved + blacklisted) so they remain visible for management
      const sellersRes = await api.getAdminUsers({ role: 'seller' });
      approvedSellers.value = (sellersRes.users || []).filter(u => u.status !== 'pending' && u.status !== 'rejected');
      // Load ALL agents (approved + blacklisted) so they remain visible for management
      const agentsRes = await api.getAdminUsers({ role: 'agent' });
      activeAgents.value = (agentsRes.users || []).filter(u => u.status !== 'pending' && u.status !== 'rejected');
    }
  } catch (e) {
    showToast(e.message || 'Failed to load operational data');
  }
}

function handleNavigate(view) {
  currentView.value = view;
  sidebarOpen.value = false;
}

async function handleLogin(email, password, callback) {
  try {
    const res = await api.login(email, password);
    currentUser.value = res.user;
    authModalOpen.value = false;
    currentView.value = 'dashboard';
    showToast(`Welcome back, ${res.user.name}!`);
    await loadRoleData();
  } catch (e) {
    if (callback) callback(e.message);
  }
}

async function handleRegister(payload, callback) {
  try {
    const res = await api.register(payload);
    showToast(res.message || 'Registration submitted for Super Admin review');
    authModalOpen.value = false;
  } catch (e) {
    if (callback) callback(e.message);
  }
}

async function handleLogout() {
  try {
    await api.logout();
    currentUser.value = null;
    currentView.value = 'dashboard';
    showToast('Signed out successfully');
  } catch (e) {
    currentUser.value = null;
  }
}

// Seller Handlers
async function handleCreateReceipt(volume, callback) {
  try {
    const res = await api.createReceipt(volume);
    showToast(`Receipt ${res.receipt.id} generated with dynamic QR`);
    if (callback) callback(res.receipt);
    await loadRoleData();
  } catch (e) {
    showToast(e.message || 'Failed to generate receipt');
  }
}

// Agent Handlers
async function handleScanSite(qrCode, callback) {
  try {
    const res = await api.scanSiteQr(qrCode);
    showToast(`Authenticated FBO: ${res.seller.name}`);
    if (callback) callback(res);
  } catch (e) {
    showToast(e.message || 'Site QR verification failed');
  }
}

async function handleScanReceipt(qrCode, callback) {
  try {
    const res = await api.scanReceiptQr(qrCode);
    showToast(`Loaded Receipt: ${res.receipt.id}`);
    if (callback) callback(res);
  } catch (e) {
    showToast(e.message || 'Receipt QR verification failed');
  }
}

async function handleSettleReceipt(receiptId, payload) {
  if (!isOnline.value) {
    // Offline caching in IndexedDB
    await addOfflineSettlement({ receipt_id: receiptId, ...payload });
    await refreshOfflineQueue();
    showToast(`Offline mode: Collection cached in IndexedDB (${offlineQueue.value.length} pending sync)`);
    return;
  }

  try {
    const res = await api.settleReceipt(receiptId, payload);
    showToast(`Settled ${receiptId}! Official PDF Certificate issued.`);
    await loadRoleData();
  } catch (e) {
    showToast(e.message || 'Settlement failed');
  }
}

async function handleSyncOffline() {
  if (!offlineQueue.value.length) return;
  try {
    const res = await api.syncOfflineQueue(offlineQueue.value);
    await clearOfflineQueue();
    await refreshOfflineQueue();
    showToast(res.message || 'Offline entries synchronized successfully');
    await loadRoleData();
  } catch (e) {
    showToast('Offline sync failed');
  }
}

// Admin Handlers
async function handleUpdateUserStatus(userId, status) {
  try {
    const res = await api.updateUserStatus(userId, status);
    showToast(`Updated user status to ${status}`);
    await loadRoleData();
  } catch (e) {
    showToast(e.message || 'Failed to update user status');
  }
}

async function handleDeleteUser(userId, userName = 'this account') {
  if (!confirm(`Are you sure you want to permanently delete ${userName}? This action cannot be undone.`)) {
    return;
  }
  try {
    const res = await api.deleteUser(userId);
    showToast(res.message || 'Account deleted permanently');
    await loadRoleData();
  } catch (e) {
    showToast(e.message || 'Failed to delete account');
  }
}

async function handleUpdateRateCard(rateCard) {
  try {
    const res = await api.updateRateCard(rateCard);
    showToast('Rate card published to network');
    await loadRoleData();
  } catch (e) {
    showToast(e.message || 'Failed to update rate card');
  }
}

async function handleToggleFlag(receiptId) {
  try {
    const res = await api.toggleFlagReceipt(receiptId);
    showToast(res.message || 'Receipt flag updated');
    await loadRoleData();
  } catch (e) {
    showToast(e.message || 'Failed to toggle flag');
  }
}

async function handleBlacklistUser(userId) {
  if (confirm(`Are you sure you want to suspend/blacklist account ${userId}?`)) {
    await handleUpdateUserStatus(userId, 'blacklisted');
  }
}

async function handleInjectStop(agentId, sellerId) {
  try {
    const res = await api.injectStop(agentId, sellerId);
    showToast(res.message || 'Ad-hoc stop injected');
    await loadRoleData();
  } catch (e) {
    showToast(e.message || 'Failed to inject stop');
  }
}

async function handleUpdateSellerLocation(sellerId, payload) {
  try {
    const res = await api.updateSellerLocation(sellerId, payload);
    showToast(res.message || 'Pickup location updated');
    await loadRoleData();
  } catch (e) {
    showToast(e.message || 'Failed to update location');
  }
}

async function handleUpdateSellerLocationSelf(payload) {
  try {
    const res = await api.updateSellerProfileLocation(payload);
    showToast(res.message || 'Pickup location and GPS updated');
    currentUser.value = res.seller;
    await loadRoleData();
  } catch (e) {
    showToast(e.message || 'Failed to update location');
  }
}

async function handleUpdateAgentGps(lat, lng) {
  try {
    const res = await api.updateAgentGps(lat, lng);
    showToast(`GPS Broadcasted: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    if (currentUser.value && currentUser.value.agent_profile) {
      currentUser.value.agent_profile.current_lat = lat;
      currentUser.value.agent_profile.current_lng = lng;
    }
  } catch (e) {
    showToast(e.message || 'Failed to update GPS location');
  }
}

function formatNumber(val) {



  return Number(val || 0).toLocaleString('en-IN');
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
