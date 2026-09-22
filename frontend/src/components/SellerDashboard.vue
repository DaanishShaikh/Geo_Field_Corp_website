<template>
  <div class="space-y-6">
    <!-- Header Hero Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Volume Sold -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg relative overflow-hidden">
        <div class="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
          <span>VOLUME SOLD</span>
          <span class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">🛢️</span>
        </div>
        <div class="text-2xl font-black text-white tracking-tight">
          {{ stats.total_volume_liters || 0 }} <span class="text-sm font-medium text-slate-400">Liters</span>
        </div>
        <div class="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-medium">
          <span>✓ 100% RUCO Certified</span>
        </div>
      </div>

      <!-- Cumulative Earnings -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg relative overflow-hidden">
        <div class="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
          <span>CUMULATIVE EARNINGS</span>
          <span class="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">₹</span>
        </div>
        <div class="text-2xl font-black text-white tracking-tight">
          ₹{{ formatNumber(stats.total_earnings_inr || 0) }}
        </div>
        <div class="text-[11px] text-slate-400 mt-2">
          {{ stats.settled_count || 0 }} settled payouts
        </div>
      </div>

      <!-- CO2 Prevented -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg relative overflow-hidden">
        <div class="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
          <span>CO₂ PREVENTED</span>
          <span class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">🌱</span>
        </div>
        <div class="text-2xl font-black text-emerald-400 tracking-tight">
          {{ stats.esg?.co2_prevented_tons || 0 }} <span class="text-sm font-medium text-slate-400">t</span>
        </div>
        <div class="text-[11px] text-slate-400 mt-2">
          Emissions stopped from landfill/drain
        </div>
      </div>

      <!-- Water Saved -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-lg relative overflow-hidden">
        <div class="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
          <span>WATER PROTECTED</span>
          <span class="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">💧</span>
        </div>
        <div class="text-2xl font-black text-cyan-300 tracking-tight">
          {{ formatNumber(stats.esg?.water_saved_liters || 0) }} <span class="text-sm font-medium text-slate-400">L</span>
        </div>
        <div class="text-[11px] text-slate-400 mt-2">
          Clean drinking water shielded
        </div>
      </div>
    </div>

    <!-- Assigned Field Executive Contact Card -->
    <div 
      :class="assignedAgent ? 'bg-gradient-to-r from-slate-800/90 to-teal-950/40 border-teal-500/40' : 'bg-slate-800/60 border-slate-700/60'"
      class="rounded-2xl border p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div class="flex items-start sm:items-center gap-3.5">
        <div class="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center text-lg flex-shrink-0">
          🚚
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Assigned Collection Officer</span>
            <span 
              v-if="assignedAgent" 
              class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase"
            >
              {{ assignedAgent.status || 'En Route' }} (Stop #{{ assignedAgent.stop_order || 1 }})
            </span>
            <span v-else class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 uppercase">
              Pending Dispatch
            </span>
          </div>
          <div v-if="assignedAgent" class="mt-0.5">
            <h3 class="text-sm font-bold text-white">{{ assignedAgent.name }} &bull; <span class="font-mono text-cyan-300 text-xs">{{ assignedAgent.vehicle_no }}</span></h3>
            <p class="text-xs text-slate-300">Direct Contact: <strong class="text-white">{{ assignedAgent.phone }}</strong> &bull; <span class="text-slate-400">{{ assignedAgent.email }}</span></p>
          </div>
          <div v-else class="mt-0.5 text-xs text-slate-400">
            Our logistics coordinator will assign an executive for your scheduled collection shortly.
          </div>
        </div>
      </div>

      <div v-if="assignedAgent" class="flex items-center gap-2 flex-shrink-0">
        <a 
          :href="'tel:' + assignedAgent.phone"
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg flex items-center gap-1.5"
        >
          <span>📞</span> Call Officer
        </a>
        <a 
          :href="'mailto:' + assignedAgent.email"
          class="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-600"
        >
          <span>✉</span> Email
        </a>
      </div>
    </div>

    <!-- Main Two Column Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 1. Site Identity (Static QR Code) -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">
              QR
            </div>
            <div>
              <h2 class="text-sm font-bold text-white">Permanent Site Identity QR</h2>
              <p class="text-xs text-slate-400">Scanned on-site by Approval Agent to authenticate FBO</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            KYC Verified
          </span>
        </div>

        <div class="p-5 bg-slate-900/90 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center gap-6">
          <div class="p-3 bg-white rounded-xl shadow-lg flex-shrink-0">
            <img :src="siteQr.data_url" alt="Site QR" class="w-36 h-36 object-contain" />
          </div>
          <div class="space-y-2 text-xs text-slate-300 flex-1">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">Company / Kitchen Name</span>
                <strong class="text-white text-sm">{{ seller.name }}</strong>
              </div>
              <span 
                :class="seller.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'"
                class="px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider"
              >
                {{ seller.status === 'approved' ? '✓ Verified FBO' : '⏳ KYC Under Review' }}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-800">
              <div>
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">Primary Contact</span>
                <span class="text-white">{{ seller.seller_profile?.contact_name || seller.name }}</span>
                <span class="text-[11px] text-slate-400 block font-mono">{{ seller.phone || 'N/A' }}</span>
              </div>
              <div>
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">Alternative Contact</span>
                <span class="text-white">{{ seller.seller_profile?.alt_contact_name || 'Not specified' }}</span>
                <span class="text-[11px] text-slate-400 block font-mono">{{ seller.seller_profile?.alt_phone || 'N/A' }}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-800 font-mono text-[11px]">
              <div>
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">FSSAI No.</span>
                <span class="text-amber-400">{{ seller.seller_profile?.fssai_license_no || 'N/A' }}</span>
              </div>
              <div>
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">GST No.</span>
                <span class="text-white">{{ seller.seller_profile?.gst_no || 'N/A' }}</span>
              </div>
              <div>
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">MSME / UDYAM</span>
                <span class="text-white">{{ seller.seller_profile?.msme_udyam_no || 'N/A' }}</span>
              </div>
            </div>

            <div class="pt-1 border-t border-slate-800">
              <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">Settlement Account (Cheque / UPI)</span>
              <span class="text-cyan-400 font-mono text-xs">{{ seller.seller_profile?.bank_upi_or_cheque || 'N/A' }}</span>
            </div>

            <div class="pt-1 border-t border-slate-800">
              <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">Site Location</span>
              <div class="text-white font-medium">{{ seller.seller_profile?.address || 'Address Pending' }}</div>
              <div class="text-[11px] text-slate-400">{{ seller.seller_profile?.city || 'Custom Region' }}{{ seller.seller_profile?.pincode ? ' - ' + seller.seller_profile.pincode : '' }}</div>
            </div>

            <div>
              <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">GPS Coordinates & Preference</span>
              <div class="text-[11px] font-mono text-emerald-400 flex items-center gap-2">
                <span v-if="seller.seller_profile?.latitude && seller.seller_profile?.longitude">📍 {{ seller.seller_profile.latitude }}, {{ seller.seller_profile.longitude }}</span>
                <span v-else class="text-amber-400">📍 GPS Location Pending</span>
                <a 
                  v-if="seller.seller_profile?.latitude && seller.seller_profile?.longitude"
                  :href="`https://www.google.com/maps?q=${seller.seller_profile.latitude},${seller.seller_profile.longitude}`"
                  target="_blank"
                  class="text-teal-300 hover:underline text-[10px]"
                >
                  Map ↗
                </a>
              </div>
              <div class="text-[10px] text-slate-400 mt-0.5">
                Preferred Slot: <strong class="text-white">{{ seller.seller_profile?.pickup_preference || 'Morning (9 AM - 12 PM)' }}</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2">
          <button 
            @click="openEditLocation"
            class="py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow"
          >
            <span>📍</span>
            <span>Update Pickup Spot & GPS</span>
          </button>
          <button 
            @click="downloadSiteQr"
            class="flex-1 py-2 px-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download Site QR Sticker
          </button>
        </div>
      </div>


      <!-- 2. Create Collection Receipt -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-xs">
              +
            </div>
            <div>
              <h2 class="text-sm font-bold text-white">Create Collection Receipt</h2>
              <p class="text-xs text-slate-400">Generate fresh receipt QR for field agent inspection</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
            Step 1
          </span>
        </div>

        <form @submit.prevent="handleCreateReceipt" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">
              Estimated UCO Volume for Collection (Liters)
            </label>
            <div class="relative">
              <input 
                v-model.number="requestedVolume" 
                type="number" 
                min="1" 
                step="1" 
                placeholder="e.g. 120" 
                required 
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
              <span class="absolute right-4 top-3 text-xs font-semibold text-slate-500">Liters</span>
            </div>
            <p class="text-[11px] text-slate-400 mt-1">Field agent will measure exact volume & TPC % on collection.</p>
          </div>

          <button 
            type="submit" 
            :disabled="creatingReceipt || !requestedVolume"
            class="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span v-if="creatingReceipt">Generating Dynamic Receipt QR...</span>
            <span v-else>Generate Collection Receipt QR</span>
          </button>
        </form>

        <!-- Newly Generated Receipt QR Display Box -->
        <div v-if="lastCreatedReceipt" class="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-300">Generated: {{ lastCreatedReceipt.id }}</span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase font-semibold">Ready for Agent</span>
          </div>
          <div class="flex items-center gap-4">
            <img :src="lastCreatedReceipt.qr_data_url" alt="Receipt QR" class="w-24 h-24 bg-white p-2 rounded-lg" />
            <div class="text-xs text-slate-300 space-y-1">
              <div>Requested: <strong>{{ lastCreatedReceipt.requested_volume }} L</strong></div>
              <div>QR Code: <code class="text-[10px] text-emerald-400 font-mono">{{ lastCreatedReceipt.receipt_qr }}</code></div>
              <div class="text-slate-400 text-[11px]">Show this to GeoField collection agent.</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Collections & Compliance Hub -->
    <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-sm font-bold text-white">Recent Collections & Compliance Hub</h2>
          <p class="text-xs text-slate-400">Download official FSSAI RUCO Disposal Certificates</p>
        </div>
        <button 
          @click="$emit('view-ledger')" 
          class="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
        >
          View Full Ledger →
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-700 text-slate-400 text-[11px] uppercase tracking-wider">
              <th class="py-3 px-3">Receipt ID</th>
              <th class="py-3 px-3">Date</th>
              <th class="py-3 px-3">Volume</th>
              <th class="py-3 px-3">TPC %</th>
              <th class="py-3 px-3">Payout</th>
              <th class="py-3 px-3">Status</th>
              <th class="py-3 px-3 text-right">Disposal Certificate</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-700/60">
            <tr v-for="receipt in recentReceipts" :key="receipt.id" class="hover:bg-slate-700/30 transition">
              <td class="py-3 px-3 font-mono font-bold text-white">{{ receipt.id }}</td>
              <td class="py-3 px-3 text-slate-300">{{ formatDate(receipt.created_at) }}</td>
              <td class="py-3 px-3 text-slate-200">{{ receipt.measured_volume || receipt.requested_volume }} L</td>
              <td class="py-3 px-3 text-slate-300">{{ receipt.tpc_percentage ? receipt.tpc_percentage + '%' : 'Pending' }}</td>
              <td class="py-3 px-3 font-semibold text-emerald-400">
                {{ receipt.amount ? '₹' + formatNumber(receipt.amount) : 'Pending' }}
              </td>
              <td class="py-3 px-3">
                <span 
                  :class="receipt.status === 'settled' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'"
                  class="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold border"
                >
                  {{ receipt.status }}
                </span>
              </td>
              <td class="py-3 px-3 text-right">
                <a 
                  v-if="receipt.status === 'settled'"
                  :href="'/api/certificates/' + receipt.id + '/download'"
                  target="_blank"
                  class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg font-medium transition border border-emerald-500/30"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  PDF Cert
                </a>
                <span v-else class="text-slate-500 text-[11px]">Awaiting Agent</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Location & Collection Preferences Modal -->
    <div v-if="showLocationModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-emerald-400 text-lg">📍</span>
            <h3 class="text-sm font-bold text-white">Update Kitchen Pickup Location & GPS</h3>
          </div>
          <button @click="showLocationModal = false" class="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
        </div>

        <form @submit.prevent="handleSaveLocation" class="space-y-3 text-xs">
          <!-- GPS Coordinates with Detect & Auto-Fill Button -->
          <div class="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-semibold text-slate-200 block text-xs">Device GPS & Address Lookup</span>
                <span class="text-[10px] text-slate-400">Locks GPS and automatically fills street address, city, & pincode</span>
              </div>
              <button 
                type="button" 
                @click="detectDeviceLocation" 
                :disabled="detectingGps"
                class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <span>{{ detectingGps ? '📡' : '🎯' }}</span>
                <span>{{ detectingGps ? 'Resolving...' : 'Detect & Auto-Fill' }}</span>
              </button>
            </div>

            <div v-if="gpsMsg" class="text-[10px] font-mono px-2.5 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-emerald-500/30">
              {{ gpsMsg }}
            </div>

            <div class="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label class="block text-[10px] text-slate-400 mb-0.5">Latitude</label>
                <input 
                  v-model.number="locationForm.latitude" 
                  type="number" 
                  step="any" 
                  required
                  placeholder="e.g. 19.0760"
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label class="block text-[10px] text-slate-400 mb-0.5">Longitude</label>
                <input 
                  v-model.number="locationForm.longitude" 
                  type="number" 
                  step="any" 
                  required
                  placeholder="e.g. 72.8777"
                  class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-slate-300 font-semibold mb-1">Street Address / Landmark</label>
            <input 
              v-model="locationForm.address" 
              type="text" 
              required
              placeholder="e.g. Shop 4, Linking Road, Near Station"
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-300 font-semibold mb-1">City / Region</label>
              <input 
                v-model="locationForm.city" 
                type="text" 
                required
                placeholder="e.g. Mumbai"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-slate-300 font-semibold mb-1">Pincode</label>
              <input 
                v-model="locationForm.pincode" 
                type="text" 
                placeholder="e.g. 400052"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-slate-300 font-semibold mb-1">Collection Window Preference</label>
            <select 
              v-model="locationForm.pickup_preference" 
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
              <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
              <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
              <option value="Night (9 PM - 12 AM)">Night (9 PM - 12 AM)</option>
              <option value="On-Demand">On-Demand / Any Time</option>
            </select>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button 
              type="button" 
              @click="showLocationModal = false"
              class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              :disabled="savingLocation"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition shadow disabled:opacity-50"
            >
              {{ savingLocation ? 'Saving Location...' : 'Save Pickup Location' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  seller: Object,
  assignedAgent: Object,
  stats: Object,
  siteQr: Object,
  recentReceipts: Array,
});

const emit = defineEmits(['create-receipt', 'view-ledger', 'update-location']);

const requestedVolume = ref(100);
const creatingReceipt = ref(false);
const lastCreatedReceipt = ref(null);

const showLocationModal = ref(false);
const savingLocation = ref(false);
const detectingGps = ref(false);
const gpsMsg = ref('');

const locationForm = ref({
  address: '',
  city: '',
  pincode: '',
  latitude: null,
  longitude: null,
  pickup_preference: 'Morning (9 AM - 12 PM)',
});

function openEditLocation() {
  const prof = props.seller?.seller_profile || {};
  locationForm.value = {
    address: prof.address || '',
    city: prof.city || '',
    pincode: prof.pincode || '',
    latitude: prof.latitude ?? null,
    longitude: prof.longitude ?? null,
    pickup_preference: prof.pickup_preference || 'Morning (9 AM - 12 PM)',
  };
  gpsMsg.value = '';
  showLocationModal.value = true;
}

function detectDeviceLocation() {
  if (!navigator.geolocation) {
    gpsMsg.value = 'Geolocation is not supported by your browser.';
    return;
  }
  detectingGps.value = true;
  gpsMsg.value = 'Requesting device GPS coordinates...';
  navigator.geolocation.getCurrentPosition(
    (position) => {
      detectingGps.value = false;
      const lat = parseFloat(position.coords.latitude.toFixed(6));
      const lng = parseFloat(position.coords.longitude.toFixed(6));
      locationForm.value.latitude = lat;
      locationForm.value.longitude = lng;
      gpsMsg.value = `✓ GPS Locked (${lat}°, ${lng}°). Resolving street address...`;

      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.address) {
            const a = data.address;
            // 1. Street Address / Landmark
            const building = a.amenity || a.building || a.shop || a.office || '';
            const roadPart = [a.house_number, a.road || a.street || a.pedestrian || a.footway].filter(Boolean).join(' ');
            const locality = a.suburb || a.neighbourhood || a.residential || a.subdistrict || '';

            let street = [building, roadPart, locality].filter(Boolean).join(', ');
            if (!street && data.display_name) {
              street = data.display_name.split(',').slice(0, 3).map(s => s.trim()).join(', ');
            }
            if (street) {
              locationForm.value.address = street;
            }

            // 2. City / Town / District
            const detectedCity = a.city || a.town || a.city_district || a.municipality || a.suburb || a.state_district || a.county || a.state;
            if (detectedCity) {
              locationForm.value.city = detectedCity;
            }

            // 3. Pincode
            if (a.postcode) {
              locationForm.value.pincode = a.postcode;
            }

            gpsMsg.value = `✓ Address Auto-Filled: ${detectedCity || 'City'}${a.postcode ? ' (' + a.postcode + ')' : ''}`;
          } else {
            gpsMsg.value = `✓ GPS Locked: ${lat}° N, ${lng}° E`;
          }
        })
        .catch(() => {
          gpsMsg.value = `✓ GPS Locked: ${lat}° N, ${lng}° E (Reverse lookup offline)`;
        })
        .finally(() => {
          detectingGps.value = false;
        });
    },
    (error) => {
      detectingGps.value = false;
      gpsMsg.value = `GPS Error: ${error.message}`;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

async function handleSaveLocation() {
  savingLocation.value = true;
  try {
    emit('update-location', { ...locationForm.value });
    showLocationModal.value = false;
  } finally {
    savingLocation.value = false;
  }
}


async function handleCreateReceipt() {
  if (!requestedVolume.value || requestedVolume.value <= 0) return;
  creatingReceipt.value = true;
  try {
    const res = await emit('create-receipt', requestedVolume.value, (created) => {
      lastCreatedReceipt.value = created;
      requestedVolume.value = 100;
    });
  } finally {
    creatingReceipt.value = false;
  }
}

function downloadSiteQr() {
  if (!props.siteQr?.data_url) return;
  const a = document.createElement('a');
  a.href = props.siteQr.data_url;
  a.download = `RUCO_Site_QR_${props.seller.id}.png`;
  a.click();
}

function formatNumber(val) {
  return Number(val || 0).toLocaleString('en-IN');
}

function formatDate(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
</script>
