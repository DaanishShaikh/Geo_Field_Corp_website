<template>
  <div class="space-y-6">
    <!-- Header Stats & Offline Mode Bar -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg">
        <div class="text-xs font-semibold text-slate-400 mb-1">ASSIGNED MANIFEST STOPS</div>
        <div class="text-2xl font-black text-white">{{ stats.total_assigned_stops || 0 }}</div>
        <div class="text-[11px] text-emerald-400 mt-2">{{ stats.visited_stops || 0 }} visited today</div>
      </div>

      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg">
        <div class="text-xs font-semibold text-slate-400 mb-1">OPEN RECEIPTS</div>
        <div class="text-2xl font-black text-amber-400">{{ stats.open_receipts_count || 0 }}</div>
        <div class="text-[11px] text-slate-400 mt-2">Ready for physical collection</div>
      </div>

      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg">
        <div class="text-xs font-semibold text-slate-400 mb-1">VEHICLE ASSIGNED</div>
        <div class="text-xl font-bold font-mono text-cyan-300">{{ agent.agent_profile?.vehicle_no || 'KA-02-EV-4412' }}</div>
        <div class="text-[11px] text-slate-400 mt-2">GeoField Electric Bio-Logistics</div>
      </div>

      <div 
        :class="isOnline ? 'bg-slate-800/80 border-slate-700/80' : 'bg-amber-950/40 border-amber-800/60'"
        class="rounded-2xl border p-5 shadow-lg flex flex-col justify-between"
      >
        <div>
          <div class="text-xs font-semibold text-slate-400 mb-1">OFFLINE CACHE QUEUE</div>
          <div class="text-2xl font-black text-white">{{ offlineQueue.length }}</div>
        </div>
        <div class="flex items-center gap-2 mt-2">
          <button 
            @click="$emit('toggle-offline')" 
            class="px-2.5 py-1 text-[11px] font-semibold rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
          >
            {{ isOnline ? 'Simulate Offline' : 'Reconnect' }}
          </button>
          <button 
            v-if="offlineQueue.length && isOnline"
            @click="$emit('sync-offline')"
            class="px-2.5 py-1 text-[11px] font-semibold rounded bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            Sync Now
          </button>
        </div>
      </div>
    </div>

    <!-- Dual Action Workflow (QR Scanner + Measurement Settlement Form) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- QR Scanner Component -->
      <QrScanner 
        title="Field QR Scanner"
        subtitle="1. Scan Site QR to authenticate FBO -> 2. Scan Receipt QR to settle"
        :presets="qrPresets"
        @scanned="handleQrScanned"
      />

      <!-- Measurement & Settlement Form -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">
              ⚡
            </div>
            <div>
              <h2 class="text-sm font-bold text-white">Log Measurements & Settle</h2>
              <p class="text-xs text-slate-400">Strict validation: Volume & TPC % bounded</p>
            </div>
          </div>
          <span 
            v-if="activeReceipt"
            class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          >
            {{ activeReceipt.id }}
          </span>
          <span v-else class="text-xs text-slate-500 font-medium">Select or Scan Receipt</span>
        </div>

        <!-- Selected Seller & Receipt Details Header -->
        <div v-if="activeSeller || activeReceipt" class="p-3 bg-slate-900/90 rounded-xl border border-slate-700 space-y-1 text-xs">
          <div v-if="activeSeller" class="flex justify-between">
            <span class="text-slate-400">FBO Seller:</span>
            <strong class="text-white">{{ activeSeller.name }} ({{ activeSeller.id }})</strong>
          </div>
          <div v-if="activeSeller" class="flex justify-between">
            <span class="text-slate-400">FSSAI License:</span>
            <span class="font-mono text-slate-200">{{ activeSeller.seller_profile?.fssai_license_no || 'Verified' }}</span>
          </div>
          <div v-if="activeReceipt" class="flex justify-between border-t border-slate-800 pt-1">
            <span class="text-slate-400">Target Receipt:</span>
            <span class="font-mono text-emerald-400 font-bold">{{ activeReceipt.id }} ({{ activeReceipt.requested_volume }}L Requested)</span>
          </div>
        </div>

        <form @submit.prevent="submitSettlement" class="space-y-4">
          <!-- Receipt Selector dropdown if not scanned -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Open Receipt</label>
            <select 
              v-model="selectedReceiptId" 
              class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
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
              <label class="block text-xs font-semibold text-slate-300 mb-1">
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
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <span class="text-[10px] text-slate-500">Rejects 0 or negative</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">
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
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <span class="text-[10px] text-slate-500">Valid range: 1.0 - 40.0%</span>
            </div>
          </div>

          <!-- Payment Settlement Option -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Settlement Mode</label>
              <select 
                v-model="form.payment_status" 
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="paid">Paid Now (Instant)</option>
                <option value="pending">To Be Paid Later</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Estimated Payout</label>
              <div class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold">
                ₹{{ formatNumber(estimatedPayout) }}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="!selectedReceiptId || settling"
            class="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
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

const emit = defineEmits(['settle-receipt', 'scan-site', 'scan-receipt', 'toggle-offline', 'sync-offline']);

const selectedReceiptId = ref('');
const activeSeller = ref(null);
const activeReceipt = ref(null);
const settling = ref(false);

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

const estimatedPayout = computed(() => {
  const vol = Number(form.value.measured_volume) || 0;
  const tpc = Number(form.value.tpc_percentage) || 20;
  let rate = 55;
  if (tpc <= 22) rate += 5;
  else if (tpc >= 30) rate -= 8;
  return Math.max(0, Math.round(vol * rate));
});

function handleQrScanned(code) {
  if (code.includes('SITE') || code.startsWith('SELL-') || code.startsWith('GEO-')) {
    emit('scan-site', code, (sellerData) => {
      activeSeller.value = sellerData.seller;
    });
  } else {
    emit('scan-receipt', code, (rctData) => {
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
      tpc_percentage: form.value.tpc_percentage,
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
