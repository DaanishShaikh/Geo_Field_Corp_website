<template>
  <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-base font-bold text-white">Master Receipt & Compliance Ledger</h2>
        <p class="text-xs text-slate-400">Immutable ledger of all collections, FSSAI serials, and payouts</p>
      </div>

      <!-- Search & Filters -->
      <div class="flex flex-wrap items-center gap-2">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search receipt, FSSAI, seller..." 
          class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-48 sm:w-64"
        />
        <select 
          v-model="statusFilter" 
          class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="all">All Statuses</option>
          <option value="settled">Settled</option>
          <option value="created">Created (Open)</option>
          <option value="flagged">Flagged Only</option>
        </select>
      </div>
    </div>

    <!-- Receipts Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="border-b border-slate-700 text-slate-400 text-[11px] uppercase tracking-wider">
            <th class="py-3 px-3">Receipt</th>
            <th class="py-3 px-3">Seller / FBO</th>
            <th class="py-3 px-3">Volume</th>
            <th class="py-3 px-3">TPC %</th>
            <th class="py-3 px-3">Amount</th>
            <th class="py-3 px-3">Payment</th>
            <th class="py-3 px-3">Status</th>
            <th class="py-3 px-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-700/60">
          <tr v-if="!filteredReceipts.length">
            <td colspan="8" class="py-8 text-center text-slate-500">No receipts match your search or filter criteria.</td>
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
              <div class="text-[10px] text-slate-400 font-mono">{{ r.receipt_qr }}</div>
            </td>

            <!-- Seller -->
            <td class="py-3 px-3">
              <div class="font-semibold text-white">{{ r.seller_name || r.seller_id }}</div>
              <div class="text-[10px] text-slate-400 font-mono">FSSAI: {{ r.seller_fssai || 'N/A' }}</div>
            </td>

            <!-- Volume -->
            <td class="py-3 px-3">
              <span class="font-bold text-white">{{ r.measured_volume || r.requested_volume }} L</span>
              <div v-if="!r.measured_volume" class="text-[10px] text-amber-400">Requested</div>
            </td>

            <!-- TPC % -->
            <td class="py-3 px-3">
              <span v-if="r.tpc_percentage" :class="r.tpc_percentage <= 22 ? 'text-emerald-400' : (r.tpc_percentage >= 30 ? 'text-rose-400' : 'text-slate-300')" class="font-semibold">
                {{ r.tpc_percentage }}%
              </span>
              <span v-else class="text-slate-500">-</span>
            </td>

            <!-- Amount -->
            <td class="py-3 px-3">
              <span v-if="r.amount" class="font-bold text-emerald-400">₹{{ formatNumber(r.amount) }}</span>
              <span v-else class="text-slate-500">Pending</span>
            </td>

            <!-- Payment Status -->
            <td class="py-3 px-3">
              <span 
                :class="r.payment_status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-700 text-slate-300 border-slate-600'"
                class="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold border"
              >
                {{ r.payment_status }}
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
                <a 
                  v-if="r.status === 'settled'"
                  :href="'/api/certificates/' + r.id + '/download'"
                  target="_blank"
                  class="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white transition border border-emerald-500/30"
                  title="Download RUCO PDF Certificate"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </a>

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
                  class="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-700 hover:bg-rose-900 text-slate-300 hover:text-rose-200 transition"
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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
</script>
