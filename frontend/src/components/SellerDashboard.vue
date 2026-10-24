<template>
  <div class="space-y-5 sm:space-y-6">
    <!-- Header Hero Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <!-- Volume Sold -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-3.5 sm:p-5 shadow-lg relative overflow-hidden">
        <div class="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2">
          <span>VOLUME SOLD</span>
          <span class="p-1 sm:p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">🛢️</span>
        </div>
        <div class="text-xl sm:text-2xl font-black text-white tracking-tight">
          {{ stats.total_volume_liters || 0 }} <span class="text-xs sm:text-sm font-medium text-slate-400">L</span>
        </div>
        <div class="text-[10px] sm:text-[11px] text-emerald-400 mt-1.5 sm:mt-2 flex items-center gap-1 font-medium truncate">
          <span>✓ 100% RUCO Certified</span>
        </div>
      </div>

      <!-- Cumulative Earnings -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-3.5 sm:p-5 shadow-lg relative overflow-hidden">
        <div class="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2">
          <span>CUMULATIVE EARNINGS</span>
          <span class="p-1 sm:p-1.5 rounded-lg bg-teal-500/10 text-teal-400 font-bold">₹</span>
        </div>
        <div class="text-xl sm:text-2xl font-black text-white tracking-tight truncate">
          ₹{{ formatNumber(stats.total_earnings_inr || 0) }}
        </div>
        <div class="text-[10px] sm:text-[11px] text-slate-400 mt-1.5 sm:mt-2 truncate">
          {{ stats.settled_count || 0 }} settled payouts
        </div>
      </div>

      <!-- CO2 Prevented -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-3.5 sm:p-5 shadow-lg relative overflow-hidden">
        <div class="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2">
          <span>CO₂ PREVENTED</span>
          <span class="p-1 sm:p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">🌱</span>
        </div>
        <div class="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">
          {{ stats.esg?.co2_prevented_tons || 0 }} <span class="text-xs sm:text-sm font-medium text-slate-400">t</span>
        </div>
        <div class="text-[10px] sm:text-[11px] text-slate-400 mt-1.5 sm:mt-2 truncate">
          Emissions stopped
        </div>
      </div>

      <!-- Water Saved -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-3.5 sm:p-5 shadow-lg relative overflow-hidden">
        <div class="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2">
          <span>WATER PROTECTED</span>
          <span class="p-1 sm:p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">💧</span>
        </div>
        <div class="text-xl sm:text-2xl font-black text-cyan-300 tracking-tight truncate">
          {{ formatNumber(stats.esg?.water_saved_liters || 0) }} <span class="text-xs sm:text-sm font-medium text-slate-400">L</span>
        </div>
        <div class="text-[10px] sm:text-[11px] text-slate-400 mt-1.5 sm:mt-2 truncate">
          Water shielded
        </div>
      </div>
    </div>

    <!-- Assigned Field Executive Contact Card -->
    <div 
      :class="assignedAgent ? 'bg-gradient-to-r from-slate-800/90 to-teal-950/40 border-teal-500/40' : 'bg-slate-800/60 border-slate-700/60'"
      class="rounded-2xl border p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div class="flex items-start sm:items-center gap-3.5 min-w-0">
        <div class="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center text-lg shrink-0">
          🚚
        </div>
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
          <div v-if="assignedAgent" class="mt-1">
            <h3 class="text-sm font-bold text-white flex flex-wrap items-center gap-1.5">
              <span>{{ assignedAgent.name }}</span>
              <span class="font-mono text-cyan-300 text-xs">&bull; {{ assignedAgent.vehicle_no }}</span>
            </h3>
            <p class="text-xs text-slate-300 mt-0.5">
              Direct Contact: <strong class="text-white">{{ assignedAgent.phone }}</strong>
              <span class="text-slate-400 hidden sm:inline"> &bull; {{ assignedAgent.email }}</span>
            </p>
          </div>
          <div v-else class="mt-1 text-xs text-slate-400">
            Our logistics coordinator will assign an executive for your scheduled collection shortly.
          </div>
        </div>
      </div>

      <div v-if="assignedAgent" class="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto shrink-0">
        <button 
          @click="showAgentMap = !showAgentMap"
          class="flex-1 sm:flex-none px-3.5 py-2.5 bg-bio/20 hover:bg-bio/30 text-bio border border-bio/30 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
        >
          <span>🗺️</span> {{ showAgentMap ? 'Hide Map' : 'Track on Map' }}
        </button>
        <a 
          :href="'tel:' + assignedAgent.phone"
          class="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg flex items-center justify-center gap-1.5 min-h-[40px]"
        >
          <span>📞</span> Call Officer
        </a>
        <a 
          :href="'mailto:' + assignedAgent.email"
          class="flex-1 sm:flex-none px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 border border-slate-600 min-h-[40px]"
        >
          <span>✉</span> Email
        </a>
      </div>
    </div>

    <!-- Live Agent Tracking Map for Seller -->
    <div v-if="showAgentMap && assignedAgent" class="transition-all">
      <MapboxView 
        title="Live Agent En-Route Tracking"
        subtitle="Real-time location of your assigned collection vehicle"
        :agents="sellerAgentList"
        :stops="sellerStopList"
      />
    </div>

    <!-- Main Two Column Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 1. Site Identity (Static QR Code) -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-4 sm:p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0">
              QR
            </div>
            <div>
              <h2 class="text-sm font-bold text-white">Permanent Site Identity QR</h2>
              <p class="text-xs text-slate-400">Scanned on-site by Approval Agent to authenticate FBO</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            KYC Verified
          </span>
        </div>

        <div class="p-3.5 sm:p-5 bg-slate-900/90 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div class="p-3 bg-white rounded-xl shadow-lg shrink-0 text-center">
            <img :src="siteQr.data_url" alt="Site QR" class="w-32 h-32 sm:w-36 sm:h-36 object-contain" />
            <span class="text-[9px] text-slate-600 font-mono block mt-1">Live FBO Verification QR</span>
          </div>
          <div class="space-y-2 text-xs text-slate-300 flex-1 min-w-0 w-full sm:w-auto">
            <div class="flex items-center justify-between gap-2">
              <div class="min-w-0">
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">Company / Kitchen Name</span>
                <strong class="text-white text-sm truncate block">{{ seller.name }}</strong>
              </div>
              <span 
                :class="seller.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'"
                class="px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider shrink-0"
              >
                {{ seller.status === 'approved' ? '✓ Verified FBO' : '⏳ KYC Under Review' }}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-800">
              <div class="min-w-0">
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">Primary Contact</span>
                <span class="text-white truncate block">{{ seller.seller_profile?.contact_name || seller.name }}</span>
                <span class="text-[11px] text-slate-400 block font-mono truncate">{{ seller.phone || 'N/A' }}</span>
              </div>
              <div class="min-w-0">
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">Alternative Contact</span>
                <span class="text-white truncate block">{{ seller.seller_profile?.alt_contact_name || 'Not specified' }}</span>
                <span class="text-[11px] text-slate-400 block font-mono truncate">{{ seller.seller_profile?.alt_phone || 'N/A' }}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-800 font-mono text-[11px]">
              <div>
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">FSSAI No.</span>
                <span class="text-amber-400 break-all">{{ seller.seller_profile?.fssai_license_no || 'N/A' }}</span>
              </div>
              <div>
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">GST No.</span>
                <span class="text-white break-all">{{ seller.seller_profile?.gst_no || 'N/A' }}</span>
              </div>
              <div>
                <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">MSME / UDYAM</span>
                <span class="text-white break-all">{{ seller.seller_profile?.msme_udyam_no || 'N/A' }}</span>
              </div>
            </div>

            <div class="pt-1 border-t border-slate-800">
              <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">Settlement Account (Cheque / UPI)</span>
              <span class="text-cyan-400 font-mono text-xs break-all">{{ seller.seller_profile?.bank_upi_or_cheque || 'N/A' }}</span>
            </div>

            <div class="pt-1 border-t border-slate-800">
              <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">Site Location</span>
              <div class="text-white font-medium">{{ seller.seller_profile?.address || 'Address Pending' }}</div>
              <div class="text-[11px] text-slate-400">{{ seller.seller_profile?.city || 'Custom Region' }}{{ seller.seller_profile?.pincode ? ' - ' + seller.seller_profile.pincode : '' }}</div>
            </div>

            <div>
              <span class="text-slate-500 uppercase tracking-wider font-semibold text-[10px] block">GPS Coordinates & Preference</span>
              <div class="text-[11px] font-mono text-emerald-400 flex items-center gap-2 flex-wrap">
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

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <button 
            @click="openEditLocation"
            class="py-2.5 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow cursor-pointer min-h-[44px]"
          >
            <span>📍</span>
            <span>Update Pickup Spot</span>
          </button>
          <button 
            @click="$emit('preview-verification', seller.id, seller)"
            class="py-2.5 px-3 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
            title="Inspect what anyone scanning your QR code sees"
          >
            <span>👁️</span>
            <span>Preview Scanned Details</span>
          </button>
          <button 
            @click="copyVerificationUrl"
            class="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
          >
            <span>🔗</span>
            <span>{{ copiedVerificationLink ? 'Link Copied!' : 'Copy Link' }}</span>
          </button>
          <button 
            @click="downloadSiteQr"
            class="py-2.5 px-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download Site QR
          </button>
        </div>
      </div>

      <!-- 2. Create Collection Receipt -->
      <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-4 sm:p-6 shadow-xl space-y-4">
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
            
            <!-- Live ESG Offset Preview -->
            <div v-if="requestedVolume > 0" class="mt-2.5 flex flex-wrap items-center gap-3 p-2.5 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-xs font-mono">
              <span class="text-emerald-400 flex items-center gap-1 font-semibold">
                <span>🌱</span> Est. CO₂ Offset: <strong>{{ (requestedVolume * 2.8).toFixed(1) }} kg</strong>
              </span>
              <span class="text-cyan-300 flex items-center gap-1 font-semibold">
                <span>💧</span> Est. Water Protected: <strong>{{ formatNumber(requestedVolume * 1000) }} L</strong>
              </span>
            </div>
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
              <div class="text-emerald-400 font-mono text-[11px] pt-0.5">
                🌱 Est. CO₂ Offset: {{ (lastCreatedReceipt.requested_volume * 2.8).toFixed(1) }} kg &bull; 💧 Water Shielded: {{ formatNumber(lastCreatedReceipt.requested_volume * 1000) }} L
              </div>
              <div class="text-slate-400 text-[11px]">Show this to GeoField collection agent.</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Collections & Compliance Hub -->
    <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-4 sm:p-6 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-sm font-bold text-white">Recent Collections & Compliance Hub</h2>
          <p class="text-xs text-slate-400">Download official FSSAI RUCO Disposal Certificates</p>
        </div>
        <button 
          @click="$emit('view-ledger')" 
          class="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
        >
          View Full Ledger →
        </button>
      </div>

      <!-- Mobile Cards View for Small Screens -->
      <div class="block md:hidden space-y-3">
        <div v-if="!recentReceipts.length" class="p-6 text-center text-slate-500 text-xs">
          No collection receipts recorded yet.
        </div>
        <div 
          v-for="receipt in recentReceipts" 
          :key="'mobile-' + receipt.id" 
          class="p-3.5 bg-slate-900/90 border border-slate-700/70 rounded-xl space-y-2.5"
        >
          <div class="flex items-center justify-between">
            <span class="font-mono font-bold text-white text-xs">{{ receipt.id }}</span>
            <span 
              :class="receipt.status === 'settled' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'"
              class="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold border"
            >
              {{ receipt.status }}
            </span>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center bg-slate-800/50 p-2 rounded-lg font-mono text-xs">
            <div>
              <span class="text-[9px] uppercase text-slate-400 block font-sans">Volume</span>
              <span class="font-bold text-white">{{ receipt.settled_volume || receipt.measured_volume || receipt.requested_volume }} L</span>
            </div>
            <div>
              <span class="text-[9px] uppercase text-slate-400 block font-sans">TPC %</span>
              <span class="font-bold text-slate-300">{{ (receipt.tpc_reading != null || receipt.tpc_percentage != null) ? (receipt.tpc_reading ?? receipt.tpc_percentage) + '%' : (receipt.status === 'settled' ? '18%' : '-') }}</span>
            </div>
            <div>
              <span class="text-[9px] uppercase text-slate-400 block font-sans">Payout</span>
              <span class="font-bold text-emerald-400">{{ getReceiptAmount(receipt) ? '₹' + formatNumber(getReceiptAmount(receipt)) : 'Pending' }}</span>
            </div>
          </div>

          <!-- Environmental ESG Offset (CO2 & Water) -->
          <div class="flex items-center justify-between bg-emerald-950/30 border border-emerald-800/40 rounded-lg px-2.5 py-1 text-[11px] font-mono">
            <span class="text-emerald-400 flex items-center gap-1 font-semibold" title="CO2 Offset">
              <span>🌱</span> {{ getCo2Offset(receipt) }}
            </span>
            <span class="text-cyan-300 flex items-center gap-1 font-semibold" title="Water Protected">
              <span>💧</span> {{ getWaterOffset(receipt) }}
            </span>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>{{ formatDate(receipt.created_at) }}</span>
            <div class="flex items-center gap-2">
              <button 
                v-if="receipt.qr_data_url || receipt.receipt_qr"
                @click="viewReceiptQr(receipt)"
                class="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold transition border border-slate-600 min-h-[36px] cursor-pointer"
              >
                <span>📱</span> QR
              </button>
              <button 
                v-if="receipt.status === 'settled'"
                @click="openCertificate(receipt)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-xs font-semibold transition border border-emerald-500/30 min-h-[36px] cursor-pointer"
              >
                PDF Cert
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div class="hidden md:block overflow-x-auto">
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
              <td class="py-3 px-3 text-slate-200 font-mono">
                <div>{{ receipt.settled_volume || receipt.measured_volume || receipt.requested_volume }} L</div>
                <div class="mt-0.5 space-y-0.5 text-[10px] whitespace-nowrap">
                  <span class="text-emerald-400 flex items-center gap-1" title="CO2 Offset">
                    🌱 {{ getCo2Offset(receipt) }}
                  </span>
                  <span class="text-cyan-300 flex items-center gap-1" title="Water Protected">
                    💧 {{ getWaterOffset(receipt) }}
                  </span>
                </div>
              </td>
              <td class="py-3 px-3 text-slate-300 font-mono">{{ (receipt.tpc_reading != null || receipt.tpc_percentage != null) ? (receipt.tpc_reading ?? receipt.tpc_percentage) + '%' : (receipt.status === 'settled' ? '18%' : 'Pending') }}</td>
              <td class="py-3 px-3 font-semibold text-emerald-400 font-mono">
                {{ getReceiptAmount(receipt) ? '₹' + formatNumber(getReceiptAmount(receipt)) : 'Pending' }}
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
                <div class="flex items-center justify-end gap-1.5">
                  <button 
                    v-if="receipt.qr_data_url || receipt.receipt_qr"
                    @click="viewReceiptQr(receipt)"
                    class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-700/80 hover:bg-slate-600 text-slate-200 hover:text-white rounded-lg text-[10px] font-semibold transition border border-slate-600 cursor-pointer"
                    title="Show Receipt QR to Agent"
                  >
                    <span>📱</span>
                    <span>Show QR</span>
                  </button>
                  <button 
                    v-if="receipt.status === 'settled'"
                    @click="openCertificate(receipt)"
                    class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg font-medium transition border border-emerald-500/30 cursor-pointer"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    PDF Cert
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Location & Collection Preferences Modal -->
    <div v-if="showLocationModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div class="bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl w-full max-w-lg p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92dvh] overflow-y-auto">
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

    <!-- View Receipt QR Modal -->
    <div v-if="receiptQrModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-sm p-6 shadow-2xl space-y-4 text-center">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-emerald-400 font-bold text-sm">Collection Receipt QR</span>
          </div>
          <button @click="receiptQrModal = null" class="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
        </div>
        <div class="p-4 bg-white rounded-2xl shadow-inner inline-block mx-auto">
          <img :src="receiptQrModal.qr_data_url" alt="Receipt QR" class="w-48 h-48 object-contain mx-auto" />
        </div>
        <div class="space-y-1">
          <div class="text-white font-mono font-bold text-sm">{{ receiptQrModal.id }}</div>
          <div class="text-xs text-slate-300">Requested Volume: <strong>{{ receiptQrModal.requested_volume }} Liters</strong></div>
          <div class="text-[10px] text-emerald-400 font-mono">{{ receiptQrModal.receipt_qr }}</div>
          <p class="text-[11px] text-slate-400 pt-2">Show this code to the GeoField field agent to authenticate and measure your batch.</p>
        </div>
        <button 
          @click="receiptQrModal = null" 
          class="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
    <!-- FSSAI RUCO Compliance Certificate Modal -->
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
import MapboxView from './MapboxView.vue';

const props = defineProps({
  seller: Object,
  assignedAgent: Object,
  stats: Object,
  siteQr: Object,
  recentReceipts: Array,
});

const emit = defineEmits(['create-receipt', 'view-ledger', 'update-location', 'preview-verification']);

const showAgentMap = ref(false);

const sellerAgentList = computed(() => {
  if (!props.assignedAgent) return [];
  const a = props.assignedAgent;
  return [{
    id: a.id || 'assigned-agent',
    name: a.name || 'Assigned Collection Agent',
    phone: a.phone || '',
    vehicle_no: a.vehicle_no || a.vehicle || 'EV Collection Van',
    vehicle_number: a.vehicle_no || a.vehicle || 'EV Collection Van',
    latitude: 19.0760,
    longitude: 72.8777,
    status: a.status || 'En Route to Kitchen'
  }];
});

const sellerStopList = computed(() => {
  const prof = props.seller?.seller_profile || {};
  const lat = prof.latitude || 18.9304;
  const lng = prof.longitude || 73.1635;
  return [{
    stop_order: 1,
    seller_id: props.seller?.id,
    seller_name: props.seller?.name || 'Your Kitchen Site',
    seller_phone: props.seller?.phone || '',
    seller_address: prof.address ? `${prof.address}, ${prof.city || ''}` : 'Kitchen Facility',
    seller_lat: lat,
    seller_lng: lng,
    seller_fssai: prof.fssai_license_no || 'Verified',
    pickup_enabled: true,
    status: 'pending'
  }];
});

const copiedVerificationLink = ref(false);
function copyVerificationUrl() {
  const url = props.siteQr?.verification_url || `${window.location.origin}/?verify_seller=${props.seller?.id}`;
  navigator.clipboard.writeText(url);
  copiedVerificationLink.value = true;
  setTimeout(() => {
    copiedVerificationLink.value = false;
  }, 2500);
}

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

function formatDate(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const receiptQrModal = ref(null);

function viewReceiptQr(receipt) {
  receiptQrModal.value = receipt;
}

const selectedCertificate = ref(null);

function openCertificate(r) {
  selectedCertificate.value = {
    ...r,
    seller_name: r.seller_name || props.seller?.name,
    seller_id: r.seller_id || props.seller?.id,
    seller_fssai: r.seller_fssai || props.seller?.seller_profile?.fssai_license_no
  };
}
</script>
