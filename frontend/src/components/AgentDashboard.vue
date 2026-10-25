<template>
  <div class="space-y-5 sm:space-y-6">
    <!-- Header Stats & Offline Mode Bar -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div class="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#0E1B14] via-[#0A130E] to-[#080E0B] border border-white/10 hover:border-[#22C55E]/30 transition-all duration-300 relative overflow-hidden shadow-xl">
        <div class="text-[10px] sm:text-xs font-semibold text-gray-400 mb-1 truncate">{{ $t('agent.assignedStops') }}</div>
        <div class="text-xl sm:text-2xl font-display font-extrabold text-white">{{ stats.total_assigned_stops || 0 }}</div>
        <div class="text-[10px] sm:text-[11px] text-emerald-400 mt-1.5 sm:mt-2 truncate">{{ stats.visited_stops || 0 }} visited today</div>
      </div>

      <div class="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#0E1B14] via-[#0A130E] to-[#080E0B] border border-white/10 hover:border-[#22C55E]/30 transition-all duration-300 relative overflow-hidden shadow-xl">
        <div class="text-[10px] sm:text-xs font-semibold text-gray-400 mb-1 truncate">{{ $t('agent.openReceipts') }}</div>
        <div class="text-xl sm:text-2xl font-display font-extrabold text-[#F59E0B]">{{ stats.open_receipts_count || 0 }}</div>
        <div class="text-[10px] sm:text-[11px] text-gray-400 mt-1.5 sm:mt-2 truncate">Ready for collection</div>
      </div>

      <div class="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#0E1B14] via-[#0A130E] to-[#080E0B] border border-white/10 hover:border-[#22C55E]/30 transition-all duration-300 relative overflow-hidden shadow-xl flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-[10px] sm:text-xs font-semibold text-gray-400 mb-1">
            <span>{{ $t('agent.vehicleGps') }}</span>
            <span v-if="gpsSynced" class="text-[9px] sm:text-[10px] text-emerald-400 font-mono">Synced ✓</span>
          </div>
          <div class="text-base sm:text-xl font-bold font-mono text-cyan-300 truncate">{{ agent.agent_profile?.vehicle_no || 'EV-COLLECTOR' }}</div>
          <div class="text-[10px] sm:text-[11px] text-gray-400 mt-1 font-mono flex items-center gap-1 truncate">
            <span>📍</span>
            <span v-if="agent.agent_profile?.current_lat">{{ Number(agent.agent_profile.current_lat).toFixed(3) }}, {{ Number(agent.agent_profile.current_lng).toFixed(3) }}</span>
            <span v-else class="text-gray-500">No GPS locked</span>
          </div>
        </div>
        <div class="mt-2 sm:mt-2.5">
          <button 
            @click="broadcastGps"
            :disabled="syncingGps"
            class="w-full py-1.5 px-2 bg-cyan-600/30 hover:bg-cyan-600 text-cyan-200 hover:text-white rounded-lg text-[9px] sm:text-[10px] font-bold transition flex items-center justify-center gap-1 border border-cyan-500/30 shadow active:scale-95 min-h-[36px] cursor-pointer"
          >
            <span>{{ syncingGps ? '📡' : '🎯' }}</span>
            <span class="truncate">{{ syncingGps ? $t('agent.acquiringGps') : $t('agent.broadcastGps') }}</span>
          </button>
        </div>
      </div>

      <div 
        :class="isOnline ? 'bg-[#0A130E] border-white/10' : 'bg-amber-950/40 border-amber-800/60'"
        class="rounded-2xl border p-3.5 sm:p-5 shadow-lg flex flex-col justify-between"
      >
        <div>
          <div class="text-[10px] sm:text-xs font-semibold text-gray-400 mb-1 truncate">{{ $t('agent.offlineQueue') }}</div>
          <div class="text-xl sm:text-2xl font-display font-extrabold text-white">{{ offlineQueue.length }}</div>
        </div>
        <div class="flex items-center gap-1.5 sm:gap-2 mt-2">
          <button 
            @click="$emit('toggle-offline')" 
            class="px-2 py-1 text-[10px] sm:text-[11px] font-semibold rounded bg-slate-700 hover:bg-slate-600 text-gray-200 min-h-[36px] flex items-center justify-center flex-1 cursor-pointer"
          >
            {{ isOnline ? 'Offline' : 'Online' }}
          </button>
          <button 
            v-if="offlineQueue.length && isOnline"
            @click="$emit('sync-offline')"
            class="px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold rounded bg-[#22C55E] hover:bg-[#16A34A] text-[#050A07] hover:text-white font-bold transition-all text-white min-h-[36px] flex items-center justify-center cursor-pointer"
          >
            Sync
          </button>
        </div>
      </div>
    </div>

    <!-- Dual Action Workflow (QR Scanner + Measurement Settlement Form) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- QR Scanner Component -->
      <QrScanner 
        :title="$t('agent.scannerTitle')"
        :subtitle="$t('agent.scannerSubtitle')"
        :presets="qrPresets"
        @scanned="handleQrScanned"
      />

      <!-- Measurement & Settlement Form -->
      <div class="rounded-2xl border border-white/10 bg-[#0A130E] shadow-xl p-4 sm:p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">
              ⚡
            </div>
            <div>
              <h2 class="text-sm font-bold text-white">{{ $t('agent.logSettleTitle') }}</h2>
              <p class="text-xs text-gray-400">{{ $t('agent.logSettleSubtitle') }}</p>
            </div>
          </div>
          <span 
            v-if="activeReceipt"
            class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          >
            {{ activeReceipt.id }}
          </span>
          <span v-else class="text-xs text-gray-500 font-medium">Select or Scan Receipt</span>
        </div>

        <!-- Selected Seller & Receipt Details Header -->
        <div v-if="activeSeller || activeReceipt" class="p-3.5 bg-slate-900/90 rounded-xl border border-white/10 space-y-2.5 text-xs">
          <!-- Rich Scanned Seller Dossier -->
          <div v-if="activeSeller" class="space-y-2">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-gray-400 font-mono text-[10px] uppercase tracking-wider block">Authenticated FBO Seller</span>
                <strong class="text-white text-sm">{{ activeSeller.name }}</strong>
              </div>
              <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                ✓ Verified
              </span>
            </div>

            <!-- Key Info Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-white/10 text-[11px]">
              <div>
                <span class="text-gray-500 block">FSSAI Licence No:</span>
                <strong class="text-amber-400 font-mono">{{ activeSeller.seller_profile?.fssai_license_no || 'Verified' }}</strong>
              </div>
              <div v-if="activeSeller.seller_profile?.gst_no">
                <span class="text-gray-500 block">GSTIN:</span>
                <span class="text-gray-200 font-mono">{{ activeSeller.seller_profile.gst_no }}</span>
              </div>
              <div>
                <span class="text-gray-500 block">Primary Contact:</span>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-gray-200">{{ activeSeller.seller_profile?.contact_name || activeSeller.name }}</span>
                  <a 
                    v-if="activeSeller.phone" 
                    :href="'tel:' + activeSeller.phone"
                    class="text-emerald-400 hover:underline font-mono font-bold"
                  >
                    📞 {{ activeSeller.phone }}
                  </a>
                </div>
              </div>
              <div v-if="activeSeller.seller_profile?.alt_phone">
                <span class="text-gray-500 block">Alt Contact:</span>
                <a :href="'tel:' + activeSeller.seller_profile.alt_phone" class="text-emerald-400/80 hover:underline font-mono">
                  📞 {{ activeSeller.seller_profile.alt_phone }}
                </a>
              </div>
            </div>

            <!-- Address & Actions -->
            <div class="pt-1 border-t border-white/10 flex items-center justify-between text-[11px]">
              <div class="text-gray-300 truncate max-w-[240px]">
                📍 {{ activeSeller.seller_profile?.address || 'Site Registered' }}, {{ activeSeller.seller_profile?.city || 'Mumbai' }}
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <a 
                  v-if="activeSeller.seller_profile?.latitude && activeSeller.seller_profile?.longitude"
                  :href="`https://www.google.com/maps?q=${activeSeller.seller_profile.latitude},${activeSeller.seller_profile.longitude}`"
                  target="_blank"
                  class="text-teal-300 hover:underline font-mono text-[10px]"
                >
                  Map ↗
                </a>
                <button 
                  type="button"
                  @click="$emit('inspect-seller', activeSeller.id, activeSeller)"
                  class="px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-semibold border border-emerald-500/40 cursor-pointer"
                >
                  Full Dossier
                </button>
              </div>
            </div>
          </div>

          <div v-if="activeReceipt" class="flex justify-between border-t border-white/10 pt-1.5">
            <span class="text-gray-400">Target Receipt:</span>
            <span class="font-mono text-emerald-400 font-bold">{{ activeReceipt.id }} ({{ activeReceipt.requested_volume }}L Requested)</span>
          </div>
        </div>

        <form @submit.prevent="submitSettlement" class="space-y-4">
          <!-- Receipt Selector dropdown if not scanned -->
          <div>
            <label class="block text-xs font-semibold text-gray-300 mb-1">Open Receipt</label>
            <select 
              v-model="selectedReceiptId" 
              class="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="" disabled>-- Select open receipt --</option>
              <option v-for="rct in openReceipts" :key="rct.id" :value="rct.id">
                {{ rct.id }} - {{ rct.seller_name }} ({{ rct.requested_volume }} L)
              </option>
            </select>
          </div>

          <!-- Volume & TPC Inputs with Validation -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">
                Measured Volume (L)
                <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model.number="form.measured_volume" 
                type="number" 
                min="0.1" 
                step="0.1" 
                placeholder="e.g. 118" 
                required 
                class="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <span class="text-[10px] text-gray-500">Rejects 0 or negative</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">
                TPC % Reading
                <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model.number="form.tpc_percentage" 
                type="number" 
                min="1.0" 
                max="40.0" 
                step="0.1" 
                placeholder="e.g. 19.5" 
                required 
                class="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <span class="text-[10px] text-gray-500">Valid range: 1.0 - 40.0%</span>
            </div>
          </div>

          <!-- Recalculate Rate & Breakdown Card -->
          <div class="p-3 bg-slate-900/90 rounded-xl border border-white/10 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-gray-300">Rate & Payout Calculation</span>
              <button 
                type="button" 
                @click="recalculateRate"
                class="px-2.5 py-1 bg-bio/15 hover:bg-bio/25 border border-bio/40 text-bio rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
              >
                <span>🔄</span> Recalculate
              </button>
            </div>

            <!-- Real-time Rate Breakdown Strip -->
            <div class="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center font-mono">
              <div class="bg-[#0A130E]/60 p-2 rounded-lg">
                <span class="text-[9px] uppercase text-gray-400 block">Base Rate</span>
                <span class="text-xs font-bold text-gray-200">₹55.00/L</span>
              </div>
              <div class="bg-[#0A130E]/60 p-2 rounded-lg">
                <span class="text-[9px] uppercase text-gray-400 block">TPC Adjustment</span>
                <span class="text-xs font-bold" :class="rateBreakdown.color">
                  {{ rateBreakdown.bonus }}
                </span>
              </div>
              <div class="bg-[#0A130E]/60 p-2 rounded-lg border border-bio/30">
                <span class="text-[9px] uppercase text-gray-400 block">Calculated Rate</span>
                <span class="text-xs font-bold text-bio">₹{{ calculatedRate }}.00/L</span>
              </div>
            </div>

            <div class="text-[11px] text-gray-400 flex items-center justify-between pt-0.5">
              <span>Rule: <strong class="text-gray-300">{{ rateBreakdown.label }}</strong></span>
              <span class="font-mono text-emerald-400 font-bold text-xs">Total: ₹{{ formatNumber(estimatedPayout) }}</span>
            </div>

            <div v-if="recalculatedNotice" class="text-[11px] font-mono font-bold text-bio bg-bio/10 border border-bio/30 p-1.5 rounded-lg text-center animate-pulse">
              {{ recalculatedNotice }}
            </div>
          </div>

          <!-- Payment Settlement Option -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Settlement Mode</label>
              <select 
                v-model="form.payment_status" 
                class="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="paid">Paid Now (Instant)</option>
                <option value="pending">To Be Paid Later</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-300 mb-1">Estimated Payout</label>
              <div class="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold">
                ₹{{ formatNumber(estimatedPayout) }}
              </div>
            </div>
          </div>

          <!-- Real-time ESG Offset Impact Preview -->
          <div v-if="form.measured_volume > 0" class="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs font-mono">
            <span class="text-emerald-400 flex items-center gap-1 font-semibold">
              <span>🌱</span> CO₂ Offset: <strong>{{ (form.measured_volume * 2.8).toFixed(1) }} kg</strong>
            </span>
            <span class="text-cyan-300 flex items-center gap-1 font-semibold">
              <span>💧</span> Water Shielded: <strong>{{ formatNumber(form.measured_volume * 1000) }} L</strong>
            </span>
          </div>

          <button 
            type="submit" 
            :disabled="!selectedReceiptId || settling"
            class="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
          >
            <span v-if="settling">Settling & Issuing Certificate...</span>
            <span v-else>Approve & Settle Collection</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Route Map & Manifest Navigation -->
    <MapboxView 
      title="Daily Manifest Route"
      subtitle="Assigned stops for collection vehicle"
      :stops="stops"
      :agents="agentVehicles"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import QrScanner from './QrScanner.vue';
import MapboxView from './MapboxView.vue';

const props = defineProps({
  agent: { type: Object, default: () => ({}) },
  stats: { type: Object, default: () => ({}) },
  stops: { type: Array, default: () => [] },
  openReceipts: { type: Array, default: () => [] },
  recentSettled: { type: Array, default: () => [] },
  offlineQueue: { type: Array, default: () => [] },
  isOnline: { type: Boolean, default: true },
});

const emit = defineEmits(['settle-receipt', 'scan-site', 'scan-receipt', 'toggle-offline', 'sync-offline', 'update-gps', 'inspect-seller']);

const agentVehicles = computed(() => {
  if (!props.agent) return [];
  const prof = props.agent.agent_profile || {};
  return [{
    id: props.agent.id || props.agent.uid || 'current-agent',
    name: props.agent.name || 'Your Collection Vehicle',
    phone: props.agent.phone || '',
    vehicle_no: prof.vehicle_number || 'Field Vehicle',
    vehicle_number: prof.vehicle_number || 'Field Vehicle',
    latitude: prof.latitude || prof.current_lat || 19.0760,
    longitude: prof.longitude || prof.current_lng || 72.8777,
    status: 'Live Collection Vehicle'
  }];
});

const selectedReceiptId = ref('');
const activeSeller = ref(null);
const activeReceipt = ref(null);
const settling = ref(false);

const syncingGps = ref(false);
const gpsSynced = ref(false);

function broadcastGps() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }
  syncingGps.value = true;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      syncingGps.value = false;
      const lat = parseFloat(pos.coords.latitude.toFixed(6));
      const lng = parseFloat(pos.coords.longitude.toFixed(6));
      gpsSynced.value = true;
      emit('update-gps', lat, lng);
      setTimeout(() => { gpsSynced.value = false; }, 4000);
    },
    (err) => {
      syncingGps.value = false;
      alert(`Could not acquire GPS: ${err.message}`);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}


const form = ref({
  measured_volume: 120,
  tpc_percentage: 20.0,
  payment_status: 'paid',
});

const qrPresets = [
  { label: 'Royal Palace Site QR', code: 'RUCO-SITE-GEO-9082' },
  { label: 'Lotus Canteen Site QR', code: 'RUCO-SITE-SELL-1002' },
  { label: 'Live Receipt RCT-9083', code: 'RUCO-RCT-9083-LIVE' },
  { label: 'Sample Receipt RCT-9082', code: 'RUCO-RCT-9082-SAMPLE' },
];

// Automatically select first open receipt if available
watch(() => props.openReceipts, (newReceipts) => {
  if (newReceipts && newReceipts.length && !selectedReceiptId.value) {
    selectedReceiptId.value = newReceipts[0].id;
  }
}, { immediate: true });

watch(selectedReceiptId, (newId) => {
  if (newId) {
    activeReceipt.value = (props.openReceipts || []).find(r => r.id === newId) || null;
    if (activeReceipt.value) {
      form.value.measured_volume = activeReceipt.value.requested_volume || 100;
    }
  }
});

const recalculatedNotice = ref('');

const calculatedRate = computed(() => {
  const tpc = Number(form.value.tpc_percentage) || 20;
  let rate = 55;
  if (tpc <= 22) rate += 5;
  else if (tpc >= 30) rate -= 8;
  return rate;
});

const rateBreakdown = computed(() => {
  const tpc = Number(form.value.tpc_percentage) || 20;
  if (tpc <= 22) return { bonus: '+₹5.00/L', label: 'Premium Grade (Low TPC ≤ 22%)', color: 'text-bio' };
  if (tpc >= 30) return { bonus: '-₹8.00/L', label: 'High Degradation (TPC ≥ 30%)', color: 'text-rose-400' };
  return { bonus: '₹0.00', label: 'Standard Compliant Grade', color: 'text-gray-300' };
});

const estimatedPayout = computed(() => {
  const vol = Number(form.value.measured_volume) || 0;
  return Math.max(0, Math.round(vol * calculatedRate.value));
});

function recalculateRate() {
  const rate = calculatedRate.value;
  const total = estimatedPayout.value;
  recalculatedNotice.value = `✓ Recalculated: ₹${rate}.00/L (${rateBreakdown.value.label}) • Estimated Total: ₹${formatNumber(total)}`;
  setTimeout(() => {
    recalculatedNotice.value = '';
  }, 4500);
}

function handleQrScanned(code) {
  const c = String(code || '').trim();
  if (
    c.includes('verify_seller') || 
    c.includes('SITE') || 
    c.startsWith('SELL-') || 
    c.startsWith('GEO-') ||
    c.includes('seller_id') ||
    c.includes('?verify')
  ) {
    emit('scan-site', c, (sellerData) => {
      activeSeller.value = sellerData.seller;
    });
  } else {
    emit('scan-receipt', c, (rctData) => {
      activeReceipt.value = rctData.receipt;
      selectedReceiptId.value = rctData.receipt.id;
    });
  }
}

async function submitSettlement() {
  if (!selectedReceiptId.value) return;
  settling.value = true;
  try {
    await emit('settle-receipt', selectedReceiptId.value, {
      measured_volume: form.value.measured_volume,
      settled_volume: form.value.measured_volume,
      tpc_percentage: form.value.tpc_percentage,
      tpc_reading: form.value.tpc_percentage,
      actual_rate: calculatedRate.value,
      total_amount: estimatedPayout.value,
      amount: estimatedPayout.value,
      payment_status: form.value.payment_status,
    });
    selectedReceiptId.value = '';
    activeReceipt.value = null;
  } finally {
    settling.value = false;
  }
}

function formatNumber(val) {
  return Number(val || 0).toLocaleString('en-IN');
}
</script>
