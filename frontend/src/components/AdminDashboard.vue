<template>
  <div class="space-y-6">
    <!-- Super Admin Header Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg">
        <div class="text-xs font-semibold text-slate-400 mb-1">PENDING ONBOARDING</div>
        <div class="text-2xl font-black text-amber-400">{{ stats.pending_approvals_count || 0 }}</div>
        <div class="text-[11px] text-slate-400 mt-2">Sellers & Agents awaiting review</div>
      </div>

      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg">
        <div class="text-xs font-semibold text-slate-400 mb-1">TOTAL UCO COLLECTED</div>
        <div class="text-2xl font-black text-white">{{ stats.total_volume_collected_liters || 0 }} L</div>
        <div class="text-[11px] text-emerald-400 mt-2">Platform-wide settled volume</div>
      </div>

      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg">
        <div class="text-xs font-semibold text-slate-400 mb-1">FLAGGED / DISPUTED</div>
        <div class="text-2xl font-black text-rose-400">{{ stats.flagged_receipts_count || 0 }}</div>
        <div class="text-[11px] text-slate-400 mt-2">Audited errors & discrepancies</div>
      </div>

      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg">
        <div class="text-xs font-semibold text-slate-400 mb-1">ACTIVE FLEET AGENTS</div>
        <div class="text-2xl font-black text-cyan-300">{{ stats.active_agents_count || 0 }}</div>
        <div class="text-[11px] text-slate-400 mt-2">EV collection trucks deployed</div>
      </div>
    </div>

    <!-- Onboarding Approvals Queue & Dynamic Rate Card -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 1. Onboarding Approvals Queue -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-xs">
              ⏳
            </div>
            <div>
              <h2 class="text-sm font-bold text-white">Onboarding Approvals Queue</h2>
              <p class="text-xs text-slate-400">Review Seller (FBO) and Field Agent sign-ups</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {{ pendingUsers.length }} Pending
          </span>
        </div>

        <div v-if="!pendingUsers.length" class="p-6 text-center text-slate-400 text-xs bg-slate-900/60 rounded-xl border border-slate-700/60">
          No pending user registrations. New sign-ups will queue here automatically.
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="u in pendingUsers" 
            :key="u.id"
            class="p-4 bg-slate-900/90 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div class="space-y-1 text-xs">
              <div class="flex items-center gap-2">
                <strong class="text-white text-sm">{{ u.name }}</strong>
                <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase text-[10px] font-bold font-mono">
                  {{ u.role }}
                </span>
              </div>
              <div class="text-slate-400">{{ u.email }} | {{ u.phone || 'No Phone' }}</div>
              <div v-if="u.seller_profile" class="text-[11px] text-emerald-400 font-mono">
                FSSAI: {{ u.seller_profile.fssai_license_no }} | Loc: {{ u.seller_profile.city }}
              </div>
              <div v-if="u.agent_profile" class="text-[11px] text-cyan-400 font-mono">
                Vehicle: {{ u.agent_profile.vehicle_no }}
              </div>
            </div>

            <div class="flex items-center gap-2 flex-shrink-0">
              <button 
                @click="$emit('update-user-status', u.id, 'approved')"
                class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition shadow"
              >
                Approve
              </button>
              <button 
                @click="$emit('update-user-status', u.id, 'rejected')"
                class="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg text-xs font-semibold border border-rose-500/30 transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Dynamic Rate Card & Pricing Controls -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-xs">
              💳
            </div>
            <div>
              <h2 class="text-sm font-bold text-white">Dynamic Pricing Engine (Rate Card)</h2>
              <p class="text-xs text-slate-400">Manage base rates and quality-based TPC incentives</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
            Active
          </span>
        </div>

        <form @submit.prevent="saveRateCard" class="space-y-4">
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Base Rate / L</label>
              <div class="relative">
                <input 
                  v-model.number="rateCardForm.base_rate" 
                  type="number" 
                  min="1" 
                  step="1" 
                  required 
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <span class="absolute right-2.5 top-2 text-[10px] text-slate-500">₹/L</span>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Low TPC Bonus</label>
              <div class="relative">
                <input 
                  v-model.number="rateCardForm.low_tpc_bonus" 
                  type="number" 
                  min="0" 
                  step="0.5" 
                  required 
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <span class="absolute right-2.5 top-2 text-[10px] text-emerald-400">+₹</span>
              </div>
              <span class="text-[10px] text-slate-500">TPC ≤ 22%</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">High TPC Penalty</label>
              <div class="relative">
                <input 
                  v-model.number="rateCardForm.high_tpc_penalty" 
                  type="number" 
                  min="0" 
                  step="0.5" 
                  required 
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <span class="absolute right-2.5 top-2 text-[10px] text-rose-400">-₹</span>
              </div>
              <span class="text-[10px] text-slate-500">TPC ≥ 30%</span>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="savingRate"
            class="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl shadow transition"
          >
            {{ savingRate ? 'Updating...' : 'Save & Publish Rate Card' }}
          </button>
        </form>

        <!-- Dynamic Ad-hoc Stop Injection -->
        <div class="pt-4 border-t border-slate-700/60 space-y-3">
          <h3 class="text-xs font-bold text-white flex items-center justify-between">
            <span>Inject Ad-Hoc Stop into Field Agent Route</span>
            <span class="text-[10px] text-slate-400">Dynamic Dispatch</span>
          </h3>
          <form @submit.prevent="handleInjectStop" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] font-semibold text-slate-400 mb-1">Select Field Executive</label>
              <select v-model="injectForm.agent_id" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none">
                <option value="" disabled>-- Select Agent --</option>
                <option v-for="a in activeAgents" :key="a.id" :value="a.id">
                  {{ a.name }} ({{ a.phone || 'No Phone' }})
                </option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-semibold text-slate-400 mb-1">Select Food Business (FBO)</label>
              <select v-model="injectForm.seller_id" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none">
                <option value="" disabled>-- Select Seller FBO --</option>
                <option v-for="s in approvedSellers" :key="s.id" :value="s.id">
                  {{ s.name }} ({{ s.phone || s.id }})
                </option>
              </select>
            </div>
            <button 
              type="submit" 
              :disabled="!injectForm.agent_id || !injectForm.seller_id"
              class="sm:col-span-2 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow"
            >
              Assign Seller to Executive for Pickup
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Live Fleet GPS Tracking -->
    <MapboxView 
      title="Live Fleet & Route Dispatch Tracking"
      subtitle="Real-time vehicle locations and active collection manifests"
      :agents="fleetAgents"
      :stops="manifestStops"
    />

    <!-- Downstream Biodiesel Compliance Engine -->
    <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-sm font-bold text-white">Downstream Biodiesel Compliance Batches</h2>
          <p class="text-xs text-slate-400">Bulk delivery records proving UCO conversion at certified refineries</p>
        </div>
        <button 
          @click="showBatchModal = true"
          class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition shadow"
        >
          + Aggregate Batch
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-700 text-slate-400 text-[11px] uppercase tracking-wider">
              <th class="py-3 px-3">Batch Code</th>
              <th class="py-3 px-3">Volume</th>
              <th class="py-3 px-3">Refinery Destination</th>
              <th class="py-3 px-3">Dispatch Date</th>
              <th class="py-3 px-3">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-700/60">
            <tr v-for="b in batches" :key="b.id" class="hover:bg-slate-700/30">
              <td class="py-3 px-3 font-mono font-bold text-white">{{ b.batch_code }}</td>
              <td class="py-3 px-3 font-semibold text-emerald-400">{{ b.total_volume }} Liters</td>
              <td class="py-3 px-3 text-slate-300">{{ b.refinery_destination }}</td>
              <td class="py-3 px-3 text-slate-400">{{ b.dispatch_date }}</td>
              <td class="py-3 px-3">
                <span class="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {{ b.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import MapboxView from './MapboxView.vue';

const props = defineProps({
  stats: Object,
  pendingUsers: Array,
  rateCard: Object,
  fleetAgents: Array,
  manifestStops: Array,
  batches: Array,
  approvedSellers: {
    type: Array,
    default: () => []
  },
  activeAgents: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update-user-status', 'update-rate-card', 'inject-stop', 'create-batch']);

const savingRate = ref(false);
const rateCardForm = ref({
  base_rate: 55,
  low_tpc_bonus: 5,
  high_tpc_penalty: 8,
});

const injectForm = ref({
  agent_id: '',
  seller_id: '',
});

const showBatchModal = ref(false);

watch(() => props.rateCard, (rc) => {
  if (rc) {
    rateCardForm.value = {
      base_rate: rc.base_rate || 55,
      low_tpc_bonus: rc.low_tpc_bonus || 5,
      high_tpc_penalty: rc.high_tpc_penalty || 8,
    };
  }
}, { immediate: true });

async function saveRateCard() {
  savingRate.value = true;
  try {
    await emit('update-rate-card', rateCardForm.value);
  } finally {
    savingRate.value = false;
  }
}

function handleInjectStop() {
  if (injectForm.value.agent_id && injectForm.value.seller_id) {
    emit('inject-stop', injectForm.value.agent_id, injectForm.value.seller_id);
    injectForm.value.agent_id = '';
    injectForm.value.seller_id = '';
  }
}
</script>
