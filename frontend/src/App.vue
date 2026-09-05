<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
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

    <!-- 1. PUBLIC LANDING PAGE (When unauthenticated) -->
    <div v-if="!currentUser" class="flex-1 flex flex-col">
      <!-- Hero Section -->
      <section class="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center space-y-8">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
          <span>🌿</span> FSSAI RUCO Compliant &bull; Biofuel Conversion Network
        </div>

        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Closed-Loop Logistics & Compliance for <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Used Cooking Oil</span>
        </h1>

        <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          GeoField connects Food Business Operators (FBOs), field collection fleets, and certified biodiesel refineries under tamper-proof FSSAI RUCO compliance records.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button 
            @click="openAuthModal('register')"
            class="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm rounded-2xl shadow-xl hover:shadow-emerald-900/50 transition transform hover:-translate-y-0.5"
          >
            Register Food Business (FBO)
          </button>
          <button 
            @click="openAuthModal('login')"
            class="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm rounded-2xl border border-slate-700 hover:border-slate-600 transition"
          >
            Sign In to Portal
          </button>
        </div>

        <!-- Live Platform Impact Stats Counter -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-5xl mx-auto">
          <div class="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div class="text-2xl sm:text-3xl font-black text-white font-mono">100%</div>
            <div class="text-xs text-slate-400 font-medium mt-1">RUCO Traceability</div>
          </div>
          <div class="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div class="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">₹55 - 60</div>
            <div class="text-xs text-slate-400 font-medium mt-1">Base Payout / Liter</div>
          </div>
          <div class="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div class="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">&le; 25%</div>
            <div class="text-xs text-slate-400 font-medium mt-1">FSSAI Max TPC Standard</div>
          </div>
          <div class="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div class="text-2xl sm:text-3xl font-black text-amber-400 font-mono">Instant</div>
            <div class="text-xs text-slate-400 font-medium mt-1">PDF Disposal Certs</div>
          </div>
        </div>
      </section>

      <!-- Interactive UCO Revenue & ESG Impact Calculator -->
      <section class="py-12 bg-slate-950/60 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto bg-slate-900 rounded-3xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl space-y-6">
          <div class="text-center space-y-2">
            <h2 class="text-xl sm:text-2xl font-black text-white">Commercial UCO Revenue & ESG Calculator</h2>
            <p class="text-xs sm:text-sm text-slate-400">Estimate your monthly earnings and environmental carbon offset</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Monthly Used Cooking Oil Produced:</span>
                  <span class="text-emerald-400 font-bold font-mono">{{ calcLiters }} Liters</span>
                </div>
                <input 
                  type="range" 
                  v-model.number="calcLiters" 
                  min="20" 
                  max="2000" 
                  step="10" 
                  class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div class="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Average Quality (TPC %):</span>
                  <span class="text-teal-400 font-bold font-mono">{{ calcTpc }}% ({{ calcTpc <= 22 ? '+₹5 Bonus Tier' : (calcTpc >= 30 ? '-₹8 Penalty' : 'Standard Rate') }})</span>
                </div>
                <input 
                  type="range" 
                  v-model.number="calcTpc" 
                  min="10" 
                  max="35" 
                  step="1" 
                  class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>
            </div>

            <!-- Output Box -->
            <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-400">Estimated Monthly Earnings:</span>
                <span class="text-xl font-black text-emerald-400 font-mono">₹{{ formatNumber(estimatedMonthlyRevenue) }}</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-400">CO₂ Avoided / Month:</span>
                <span class="font-bold text-white font-mono">{{ (calcLiters * 0.0028).toFixed(2) }} Tons</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-400">Clean Water Protected:</span>
                <span class="font-bold text-cyan-300 font-mono">{{ formatNumber(calcLiters * 24000) }} Liters</span>
              </div>
              <div class="pt-2 border-t border-slate-800">
                <button 
                  @click="openAuthModal('register')"
                  class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Onboard Your Kitchen Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div class="text-center space-y-2">
          <h2 class="text-2xl sm:text-3xl font-black text-white">4-Step End-to-End Compliance Workflow</h2>
          <p class="text-xs sm:text-sm text-slate-400">Zero manual paperwork, full FSSAI legal traceability</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 relative">
            <div class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black flex items-center justify-center text-sm">1</div>
            <h3 class="text-sm font-bold text-white">Onboard & Static QR</h3>
            <p class="text-xs text-slate-400 leading-relaxed">FBO registers with FSSAI license. Super Admin verifies KYC and issues a permanent static site QR code sticker.</p>
          </div>

          <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 relative">
            <div class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black flex items-center justify-center text-sm">2</div>
            <h3 class="text-sm font-bold text-white">Receipt Creation</h3>
            <p class="text-xs text-slate-400 leading-relaxed">FBO generates a collection receipt specifying estimated volume, producing a dynamic receipt approval QR.</p>
          </div>

          <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 relative">
            <div class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black flex items-center justify-center text-sm">3</div>
            <h3 class="text-sm font-bold text-white">On-Site Measurement</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Field executive scans site & receipt QR, tests oil quality (TPC %), measures volume, and records settlement.</p>
          </div>

          <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 relative">
            <div class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black flex items-center justify-center text-sm">4</div>
            <h3 class="text-sm font-bold text-white">Official Certificate</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Backend locks the immutable record and auto-generates official FSSAI Disposal PDF certificates for health audits.</p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="mt-auto border-t border-slate-800 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2">
        <p>GeoField Bio-Logistics &bull; Enforcing FSSAI RUCO Compliance &bull; Clean Energy Conversion</p>
        <p class="text-[11px] text-slate-600">Tamper-Evident SHA-256 Ledger &bull; Offline-First PWA &bull; Biofuel Delivery Aggregator</p>
      </footer>
    </div>

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

// Calculator State
const calcLiters = ref(300);
const calcTpc = ref(20);

const estimatedMonthlyRevenue = computed(() => {
  let rate = 55;
  if (calcTpc.value <= 22) rate += 5;
  else if (calcTpc.value >= 30) rate -= 8;
  return calcLiters.value * rate;
});

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
      
      const sellersRes = await api.getAdminUsers({ role: 'seller', status: 'approved' });
      approvedSellers.value = sellersRes.users || [];
      const agentsRes = await api.getAdminUsers({ role: 'agent', status: 'approved' });
      activeAgents.value = agentsRes.users || [];
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
