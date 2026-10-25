<template>
  <div class="rounded-2xl border border-white/10 bg-[#0A130E] p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      <div>
        <h2 class="text-base font-bold text-white">{{ $t('receipts.title') }}</h2>
        <p class="text-xs text-gray-400">{{ $t('receipts.subtitle') }}</p>
      </div>

      <!-- Search & Filters -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
        <input 
          v-model="searchQuery" 
          type="text" 
          :placeholder="$t('receipts.searchPlaceholder')" 
          class="bg-[#060A08] border border-white/10 focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-64 min-h-[40px]"
        />
        <select 
          v-model="statusFilter" 
          class="bg-[#060A08] border border-white/10 focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 min-h-[40px]"
        >
          <option value="all">{{ $t('receipts.allStatuses') }}</option>
          <option value="settled">{{ $t('receipts.settled') }}</option>
          <option value="created">{{ $t('receipts.created') }}</option>
          <option value="flagged">{{ $t('receipts.flaggedOnly') }}</option>
        </select>
      </div>
    </div>

    <!-- Mobile Card Layout (< md) -->
    <div class="block md:hidden space-y-3">
      <div v-if="!filteredReceipts.length" class="py-8 text-center text-gray-500 text-xs">
        No receipts match your search or filter criteria.
      </div>
      <div 
        v-for="r in filteredReceipts" 
        :key="r.id"
        :class="r.flagged ? 'bg-rose-950/20 border-rose-800/40' : 'bg-[#060A08] border-white/10'"
        class="rounded-xl p-4 border space-y-3"
      >
        <div class="flex items-start justify-between gap-2">
          <div>
            <div class="font-mono font-bold text-white text-sm">{{ r.id }}</div>
            <div class="text-[10px] text-gray-400 font-mono">{{ r.receipt_qr }}</div>
          </div>
          <div>
            <span 
              v-if="r.flagged"
              class="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              Flagged
            </span>
            <span 
              v-else
              :class="r.status === 'settled' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'"
              class="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold border"
            >
              {{ r.status }}
            </span>
          </div>
        </div>

        <div class="bg-[#060A08] p-2.5 rounded-xl border border-white/10 text-xs">
          <div class="font-semibold text-white">{{ r.seller_name || r.seller_id }}</div>
          <div class="text-[10px] text-gray-400 font-mono mt-0.5">FSSAI: {{ r.seller_fssai || 'N/A' }}</div>
        </div>

        <div class="grid grid-cols-3 gap-2 text-center text-xs">
          <div class="bg-[#060A08] p-2 rounded-xl border border-white/10">
            <span class="text-[9px] uppercase font-bold text-gray-400 block">Volume</span>
            <span class="font-bold font-mono text-white mt-0.5 block">{{ r.settled_volume || r.measured_volume || r.requested_volume }} L</span>
            <span v-if="r.status === 'settled'" class="text-[9px] text-emerald-400">Settled</span>
            <span v-else class="text-[9px] text-amber-400">Req.</span>
          </div>
          <div class="bg-[#060A08] p-2 rounded-xl border border-white/10">
            <span class="text-[9px] uppercase font-bold text-gray-400 block">TPC</span>
            <span v-if="r.tpc_reading != null || r.tpc_percentage != null" :class="(r.tpc_reading ?? r.tpc_percentage) <= 22 ? 'text-emerald-400' : ((r.tpc_reading ?? r.tpc_percentage) >= 30 ? 'text-rose-400' : 'text-gray-300')" class="font-bold font-mono mt-0.5 block">
              {{ r.tpc_reading ?? r.tpc_percentage }}%
            </span>
            <span v-else class="text-gray-500 mt-0.5 block">-</span>
          </div>
          <div class="bg-[#060A08] p-2 rounded-xl border border-white/10">
            <span class="text-[9px] uppercase font-bold text-gray-400 block">Amount</span>
            <span v-if="getReceiptAmount(r)" class="font-bold text-emerald-400 font-mono mt-0.5 block">₹{{ formatNumber(getReceiptAmount(r)) }}</span>
            <span v-else class="text-gray-500 mt-0.5 block">Pending</span>
          </div>
        </div>

        <!-- Environmental ESG Offset (CO2 & Water) -->
        <div class="flex items-center justify-between bg-emerald-950/30 border border-emerald-800/40 rounded-lg px-2.5 py-1.5 text-[11px] font-mono">
          <span class="text-emerald-400 flex items-center gap-1 font-semibold" title="CO2 Emissions Displaced">
            <span>🌱</span> {{ getCo2Offset(r) }}
          </span>
          <span class="text-cyan-300 flex items-center gap-1 font-semibold" title="Clean Water Protected">
            <span>💧</span> {{ getWaterOffset(r) }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          <span 
            :class="(r.payment_status === 'paid' || r.status === 'settled') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-gray-300 border-white/10'"
            class="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold border font-mono"
          >
            {{ r.payment_status || (r.status === 'settled' ? 'paid' : 'pending') }}
          </span>

          <div class="flex items-center gap-1.5">
            <!-- PDF Certificate Download -->
            <button 
              v-if="r.status === 'settled'"
              @click="openCertificate(r)"
              class="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white transition border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 min-h-[36px]"
              title="View / Print RUCO Certificate"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Cert</span>
            </button>

            <!-- Super Admin Flag / Resolve Button -->
            <button 
              v-if="userRole === 'admin'"
              @click="$emit('toggle-flag', r.id)"
              :class="r.flagged ? 'bg-amber-600/20 hover:bg-amber-600 text-amber-300' : 'bg-rose-600/20 hover:bg-rose-600 text-rose-300'"
              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-transparent transition min-h-[36px]"
            >
              {{ r.flagged ? 'Clear' : 'Flag' }}
            </button>

            <!-- Super Admin Blacklist Toggle -->
            <button 
              v-if="userRole === 'admin'"
              @click="$emit('blacklist-user', r.seller_id)"
              class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 hover:bg-rose-900 text-gray-300 hover:text-rose-200 transition min-h-[36px]"
              title="Suspend or blacklist seller"
            >
              Blacklist
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Receipts Table (>= md) -->
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full text-left text-xs min-w-[760px]">
        <thead>
          <tr class="border-b border-white/10 text-gray-400 text-[11px] uppercase tracking-wider">
            <th class="py-3 px-3">{{ $t('receipts.colReceiptId') }}</th>
            <th class="py-3 px-3">{{ $t('receipts.colSeller') }}</th>
            <th class="py-3 px-3">{{ $t('receipts.colVolume') }}</th>
            <th class="py-3 px-3">{{ $t('receipts.colTpc') }}</th>
            <th class="py-3 px-3">{{ $t('receipts.colAmount') }}</th>
            <th class="py-3 px-3">Payment</th>
            <th class="py-3 px-3">{{ $t('receipts.colStatus') }}</th>
            <th class="py-3 px-3 text-right">{{ $t('receipts.colActions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-700/60">
          <tr v-if="!filteredReceipts.length">
            <td colspan="8" class="py-8 text-center text-gray-500">No receipts match your search or filter criteria.</td>
          </tr>
          <tr 
            v-for="r in filteredReceipts" 
            :key="r.id"
            :class="r.flagged ? 'bg-rose-950/20' : 'hover:bg-slate-700/20'"
            class="transition"
          >
            <!-- Receipt & QR -->
            <td class="py-3 px-3">
              <div class="font-mono font-bold text-white">{{ r.id }}</div>
              <div class="text-[10px] text-gray-400 font-mono">{{ r.receipt_qr }}</div>
            </td>

            <!-- Seller -->
            <td class="py-3 px-3">
              <div class="font-semibold text-white">{{ r.seller_name || r.seller_id }}</div>
              <div class="text-[10px] text-gray-400 font-mono">FSSAI: {{ r.seller_fssai || 'N/A' }}</div>
            </td>

            <!-- Volume & ESG Impact -->
            <td class="py-3 px-3">
              <span class="font-bold text-white font-mono">{{ r.settled_volume || r.measured_volume || r.requested_volume }} L</span>
              <div v-if="r.status === 'settled'" class="text-[10px] text-emerald-400 font-semibold">Settled</div>
              <div v-else class="text-[10px] text-amber-400 font-semibold">Requested</div>
              <div class="mt-1 space-y-0.5 text-[10px] font-mono whitespace-nowrap">
                <span class="text-emerald-400 flex items-center gap-1" title="CO2 Offset">
                  🌱 {{ getCo2Offset(r) }}
                </span>
                <span class="text-cyan-300 flex items-center gap-1" title="Water Protected">
                  💧 {{ getWaterOffset(r) }}
                </span>
              </div>
            </td>

            <!-- TPC % -->
            <td class="py-3 px-3">
              <span v-if="r.tpc_reading != null || r.tpc_percentage != null" :class="(r.tpc_reading ?? r.tpc_percentage) <= 22 ? 'text-emerald-400' : ((r.tpc_reading ?? r.tpc_percentage) >= 30 ? 'text-rose-400' : 'text-gray-300')" class="font-semibold font-mono">
                {{ r.tpc_reading ?? r.tpc_percentage }}%
              </span>
              <span v-else class="text-gray-500">-</span>
            </td>

            <!-- Amount -->
            <td class="py-3 px-3">
              <span v-if="getReceiptAmount(r)" class="font-bold text-emerald-400 font-mono">₹{{ formatNumber(getReceiptAmount(r)) }}</span>
              <span v-else class="text-gray-500">Pending</span>
            </td>

            <!-- Payment Status -->
            <td class="py-3 px-3">
              <span 
                :class="(r.payment_status === 'paid' || r.status === 'settled') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-700 text-gray-300 border-slate-600'"
                class="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold border font-mono"
              >
                {{ r.payment_status || (r.status === 'settled' ? 'paid' : 'pending') }}
              </span>
            </td>

            <!-- Status & Flag -->
            <td class="py-3 px-3">
              <span 
                v-if="r.flagged"
                class="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 w-fit"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                Flagged
              </span>
              <span 
                v-else
                :class="r.status === 'settled' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'"
                class="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold border"
              >
                {{ r.status }}
              </span>
            </td>

            <!-- Actions -->
            <td class="py-3 px-3 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <!-- PDF Certificate Download -->
                <button 
                  v-if="r.status === 'settled'"
                  @click="openCertificate(r)"
                  class="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white transition border border-emerald-500/30 cursor-pointer"
                  title="View / Print RUCO Certificate"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </button>

                <!-- Super Admin Flag / Resolve Button -->
                <button 
                  v-if="userRole === 'admin'"
                  @click="$emit('toggle-flag', r.id)"
                  :class="r.flagged ? 'bg-amber-600/20 hover:bg-amber-600 text-amber-300' : 'bg-rose-600/20 hover:bg-rose-600 text-rose-300'"
                  class="px-2.5 py-1 rounded-lg text-[10px] font-semibold border border-transparent transition"
                >
                  {{ r.flagged ? 'Clear Flag' : 'Flag' }}
                </button>

                <!-- Super Admin Blacklist Toggle -->
                <button 
                  v-if="userRole === 'admin'"
                  @click="$emit('blacklist-user', r.seller_id)"
                  class="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-700 hover:bg-rose-900 text-gray-300 hover:text-rose-200 transition"
                  title="Suspend or blacklist seller"
                >
                  Blacklist
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- RUCO Compliance Certificate Modal -->
    <CertificateModal 
      v-if="selectedCertificate" 
      :receipt="selectedCertificate" 
      @close="selectedCertificate = null" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CertificateModal from './CertificateModal.vue';

const props = defineProps({
  receipts: {
    type: Array,
    default: () => []
  },
  userRole: String,
});

defineEmits(['toggle-flag', 'blacklist-user']);

const searchQuery = ref('');
const statusFilter = ref('all');
const selectedCertificate = ref(null);

const filteredReceipts = computed(() => {
  return props.receipts.filter((r) => {
    const q = searchQuery.value.toLowerCase();
    const matchesSearch = !q || (
      (r.id && r.id.toLowerCase().includes(q)) ||
      (r.seller_name && r.seller_name.toLowerCase().includes(q)) ||
      (r.seller_fssai && r.seller_fssai.toLowerCase().includes(q)) ||
      (r.receipt_qr && r.receipt_qr.toLowerCase().includes(q))
    );

    let matchesStatus = true;
    if (statusFilter.value === 'settled') matchesStatus = r.status === 'settled';
    else if (statusFilter.value === 'created') matchesStatus = r.status === 'created';
    else if (statusFilter.value === 'flagged') matchesStatus = r.flagged;

    return matchesSearch && matchesStatus;
  });
});

function formatNumber(val) {
  return Number(val || 0).toLocaleString('en-IN');
}

function getReceiptAmount(r) {
  if (r.total_amount && Number(r.total_amount) > 0) return Number(r.total_amount);
  if (r.amount && Number(r.amount) > 0) return Number(r.amount);
  if (r.status === 'settled') {
    const vol = Number(r.settled_volume || r.measured_volume || r.requested_volume || 0);
    const rate = Number(r.actual_rate || 55.0);
    return Math.round(vol * rate);
  }
  return null;
}

function getReceiptVolume(r) {
  return Number(r.settled_volume || r.measured_volume || r.requested_volume || 0);
}

function getCo2Offset(r) {
  if (r.co2_offset_kg != null) {
    const kg = Number(r.co2_offset_kg);
    return kg >= 1000 ? `${(kg / 1000).toFixed(2)} t CO₂` : `${kg} kg CO₂`;
  }
  const vol = getReceiptVolume(r);
  const kg = Number((vol * 2.8).toFixed(1));
  return kg >= 1000 ? `${(kg / 1000).toFixed(2)} t CO₂` : `${kg} kg CO₂`;
}

function getWaterOffset(r) {
  if (r.water_offset_liters != null) {
    return `${Number(r.water_offset_liters).toLocaleString('en-IN')} L H₂O`;
  }
  const vol = getReceiptVolume(r);
  return `${(vol * 1000).toLocaleString('en-IN')} L H₂O`;
}

function openCertificate(r) {
  selectedCertificate.value = r;
}
</script>
