<template>
  <div class="space-y-6">
    <!-- Super Admin Command Bar -->
    <div class="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-800/90 to-slate-900/90 p-4 rounded-2xl border border-slate-700/80 shadow-xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-lg shadow-inner">
          🏢
        </div>
        <div>
          <div class="text-sm font-bold text-white flex items-center gap-2">
            <span>GeoField Super Admin Command Center</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">System Live</span>
          </div>
          <div class="text-xs text-slate-400">Total System Oversight: <span class="text-slate-200 font-semibold">{{ approvedSellers.length }} Registered Kitchens</span> &bull; <span class="text-slate-200 font-semibold">{{ activeAgents.length }} Active Fleet Agents</span></div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Fleet Dispatch Ready
        </span>
      </div>
    </div>

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

    <!-- FBO Pickup Location & Route Preferences Management -->
    <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center text-sm font-bold">
            📍
          </div>
          <div>
            <h2 class="text-sm font-bold text-white">FBO Pickup Location Controls & Preferences</h2>
            <p class="text-xs text-slate-400">Enable/disable collection sites, configure time slots, and update coordinates</p>
          </div>
        </div>
        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 w-fit">
          {{ approvedSellers.length }} Registered Sites
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-700 text-slate-400 text-[11px] uppercase tracking-wider">
              <th class="py-3 px-3">FBO / Kitchen</th>
              <th class="py-3 px-3">Address & Pin</th>
              <th class="py-3 px-3">Pickup Preference Window</th>
              <th class="py-3 px-3">Pickup Status</th>
              <th class="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-700/60">
            <tr v-if="!approvedSellers.length">
              <td colspan="5" class="py-6 text-center text-slate-500">No approved sellers registered yet.</td>
            </tr>
            <tr v-for="seller in approvedSellers" :key="seller.id" class="hover:bg-slate-700/30 transition">
              <td class="py-3 px-3">
                <div class="font-bold text-white">{{ seller.name }}</div>
                <div class="text-[10px] text-slate-400 font-mono">ID: {{ seller.id }} &bull; {{ seller.phone || 'No phone' }}</div>
              </td>
              <td class="py-3 px-3 text-slate-300 max-w-xs">
                <div class="truncate">{{ seller.seller_profile?.address || 'Bengaluru, Karnataka' }}</div>
                <div class="text-[10px] font-mono text-cyan-400">
                  {{ (seller.seller_profile?.latitude || 12.9716).toFixed(4) }}, {{ (seller.seller_profile?.longitude || 77.5946).toFixed(4) }}
                </div>
              </td>
              <td class="py-3 px-3">
                <select 
                  :value="seller.seller_profile?.pickup_preference || 'Morning (9 AM - 12 PM)'"
                  @change="handleUpdatePreference(seller.id, $event.target.value)"
                  class="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Morning (9 AM - 12 PM)">⏰ Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (1 PM - 4 PM)">⏰ Afternoon (1 PM - 4 PM)</option>
                  <option value="Evening (5 PM - 8 PM)">⏰ Evening (5 PM - 8 PM)</option>
                  <option value="Custom / Night (9 PM - 12 AM)">🌙 Custom / Night (9 PM - 12 AM)</option>
                  <option value="On-Demand Collection">⚡ On-Demand Collection</option>
                </select>
              </td>
              <td class="py-3 px-3">
                <button 
                  @click="handleTogglePickup(seller)"
                  :class="seller.seller_profile?.pickup_enabled !== false ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'"
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border transition flex items-center gap-1.5"
                >
                  <span 
                    :class="seller.seller_profile?.pickup_enabled !== false ? 'bg-emerald-400' : 'bg-rose-400'"
                    class="w-1.5 h-1.5 rounded-full"
                  ></span>
                  {{ seller.seller_profile?.pickup_enabled !== false ? 'Pickup Enabled' : 'Pickup Disabled' }}
                </button>
              </td>
              <td class="py-3 px-3 text-right">
                <button 
                  @click="openEditLocationModal(seller)"
                  class="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold transition"
                >
                  Edit Coordinates
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Location Modal -->
    <div v-if="editingSeller" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
        <div class="flex justify-between items-center">
          <h3 class="text-sm font-bold text-white">Edit Location: {{ editingSeller.name }}</h3>
          <button @click="editingSeller = null" class="text-slate-400 hover:text-white">&times;</button>
        </div>
        <form @submit.prevent="saveLocationEdit" class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-400 mb-1">Physical Address</label>
            <input v-model="editLocationForm.address" type="text" required class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-400 mb-1">Latitude</label>
              <input v-model.number="editLocationForm.latitude" type="number" step="0.0001" required class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
            </div>
            <div>
              <label class="block text-slate-400 mb-1">Longitude</label>
              <input v-model.number="editLocationForm.longitude" type="number" step="0.0001" required class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
            </div>
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Special Instructions / Gate Landmark</label>
            <input v-model="editLocationForm.special_instructions" type="text" placeholder="e.g. Backdoor loading bay, near Gate 2" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
          </div>
          <div class="flex gap-2 pt-2">
            <button type="button" @click="editingSeller = null" class="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold">Cancel</button>
            <button type="submit" class="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Active Fleet Agents Directory -->
    <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center text-sm font-bold">
            🚚
          </div>
          <div>
            <h2 class="text-sm font-bold text-white">Active Field Collection Fleet & Agents Directory</h2>
            <p class="text-xs text-slate-400">Deployed collection officers, assigned EV vehicles, and direct phone contacts</p>
          </div>
        </div>
        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 w-fit">
          {{ activeAgents.length }} Active Agents
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-700 text-slate-400 text-[11px] uppercase tracking-wider">
              <th class="py-3 px-3">Agent Officer</th>
              <th class="py-3 px-3">Vehicle Assigned</th>
              <th class="py-3 px-3">Contact Details</th>
              <th class="py-3 px-3">Operational Status</th>
              <th class="py-3 px-3 text-right">Direct Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-700/60">
            <tr v-if="!activeAgents.length">
              <td colspan="5" class="py-6 text-center text-slate-500">No active field agents registered. Approve pending agents in the queue above.</td>
            </tr>
            <tr v-for="agent in activeAgents" :key="agent.id" class="hover:bg-slate-700/30 transition">
              <td class="py-3 px-3">
                <div class="font-bold text-white text-sm">{{ agent.name }}</div>
                <div class="text-[10px] text-teal-400 font-mono">ID: {{ agent.id }}</div>
              </td>
              <td class="py-3 px-3">
                <div class="font-mono font-bold text-cyan-300">{{ agent.agent_profile?.vehicle_no || 'KA-02-EV-4412' }}</div>
                <div class="text-[10px] text-slate-400">GeoField Electric Bio-Logistics</div>
              </td>
              <td class="py-3 px-3">
                <div class="text-white font-medium">{{ agent.phone || '+91 94480 33221' }}</div>
                <div class="text-[10px] text-slate-400">{{ agent.email }}</div>
              </td>
              <td class="py-3 px-3">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 w-fit">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active &bull; On Route
                </span>
              </td>
              <td class="py-3 px-3 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <a 
                    v-if="agent.phone"
                    :href="'tel:' + agent.phone"
                    class="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white font-bold text-[10px] transition flex items-center gap-1"
                  >
                    <span>📞</span> Call
                  </a>
                  <a 
                    v-if="agent.email"
                    :href="'mailto:' + agent.email"
                    class="px-2 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-[10px] transition"
                  >
                    ✉ Email
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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

const emit = defineEmits(['update-user-status', 'update-rate-card', 'inject-stop', 'update-seller-location', 'create-batch']);



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

// Location editing state
const editingSeller = ref(null);
const editLocationForm = ref({
  address: '',
  latitude: 12.9716,
  longitude: 77.5946,
  special_instructions: '',
});

function handleTogglePickup(seller) {
  const currentStatus = seller.seller_profile?.pickup_enabled !== false;
  emit('update-seller-location', seller.id, {
    pickup_enabled: !currentStatus
  });
}

function handleUpdatePreference(sellerId, preference) {
  emit('update-seller-location', sellerId, {
    pickup_preference: preference
  });
}

function openEditLocationModal(seller) {
  editingSeller.value = seller;
  editLocationForm.value = {
    address: seller.seller_profile?.address || '',
    latitude: seller.seller_profile?.latitude || 12.9716,
    longitude: seller.seller_profile?.longitude || 77.5946,
    special_instructions: seller.seller_profile?.special_instructions || '',
  };
}

async function saveLocationEdit() {
  if (!editingSeller.value) return;
  await emit('update-seller-location', editingSeller.value.id, editLocationForm.value);
  editingSeller.value = null;
}

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
