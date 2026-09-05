<template>
  <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
      <!-- Close Button -->
      <button 
        @click="$emit('close')" 
        class="absolute right-5 top-5 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition"
        aria-label="Close"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Brand Header -->
      <div class="text-center space-y-1">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-white text-lg mx-auto shadow-lg shadow-emerald-950/50">
          G
        </div>
        <h2 class="text-xl font-extrabold text-white">GeoField RUCO Trace</h2>
        <p class="text-xs text-slate-400">National Used Cooking Oil Compliance & Traceability System</p>
      </div>

      <!-- Tab Switcher -->
      <div class="grid grid-cols-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
        <button 
          @click="mode = 'login'" 
          :class="mode === 'login' ? 'bg-slate-800 text-white font-bold shadow' : 'text-slate-400 hover:text-slate-200 font-medium'"
          class="py-2 text-xs rounded-xl transition"
        >
          Sign In
        </button>
        <button 
          @click="mode = 'register'" 
          :class="mode === 'register' ? 'bg-slate-800 text-white font-bold shadow' : 'text-slate-400 hover:text-slate-200 font-medium'"
          class="py-2 text-xs rounded-xl transition"
        >
          New Onboarding
        </button>
      </div>

      <!-- Error banner if any -->
      <div v-if="errorMessage" class="p-3 bg-rose-950/50 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
        <svg class="w-4 h-4 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Sign In Form -->
      <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">Registered Email Address</label>
          <input 
            v-model="loginForm.email" 
            type="email" 
            required 
            placeholder="e.g. contact@restaurant.com" 
            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            required 
            placeholder="••••••••" 
            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
          />
        </div>

        <!-- Super Admin Quick Fill Helper -->
        <div class="p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
          <div class="text-[11px] text-slate-400">
            <span class="text-white font-semibold">Super Admin:</span> <code class="text-teal-400">admin@geofield.com</code>
          </div>
          <button 
            type="button" 
            @click="fillAdminCredentials"
            class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white rounded-lg text-[10px] font-bold transition border border-slate-700/80"
          >
            Fill Admin
          </button>
        </div>


        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-emerald-900/40 transition disabled:opacity-50"
        >
          {{ loading ? 'Authenticating...' : 'Sign In to Portal' }}
        </button>

        <p class="text-[11px] text-center text-slate-400 pt-2">
          New Food Business Operator or Field Officer? 
          <a @click.prevent="mode = 'register'" href="#" class="text-emerald-400 font-semibold hover:underline">Apply for Onboarding</a>
        </p>
      </form>

      <!-- Onboarding Registration Form -->
      <form v-else @submit.prevent="handleRegister" class="space-y-3.5">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Entity / Role Type</label>
          <div class="grid grid-cols-2 gap-2">
            <label 
              :class="regForm.role === 'seller' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-950 border-slate-700 text-slate-400'"
              class="p-2.5 rounded-xl border flex items-center justify-center text-xs cursor-pointer transition"
            >
              <input type="radio" v-model="regForm.role" value="seller" class="hidden" />
              <span>Food Business (FBO)</span>
            </label>
            <label 
              :class="regForm.role === 'agent' ? 'bg-teal-950/40 border-teal-500 text-teal-300 font-bold' : 'bg-slate-950 border-slate-700 text-slate-400'"
              class="p-2.5 rounded-xl border flex items-center justify-center text-xs cursor-pointer transition"
            >
              <input type="radio" v-model="regForm.role" value="agent" class="hidden" />
              <span>Field Collection Executive</span>
            </label>
          </div>
        </div>

        <!-- 12-Point Compliance Banner for Sellers -->
        <div v-if="regForm.role === 'seller'" class="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-1">
          <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <span>🛡️</span>
            <span>12-Point Seller Compliance & KYC Requirement</span>
          </div>
          <p class="text-[10px] text-slate-400 leading-relaxed">
            Per RUCO / FSSAI standards, all 12 operational and regulatory credentials are required to be verified by Super Admin prior to account activation.
          </p>
        </div>

        <!-- Section A: Entity & Primary Contact -->
        <div class="space-y-2.5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                <span class="text-emerald-400 font-mono font-bold mr-1">1.</span>
                {{ regForm.role === 'seller' ? 'Name of Kitchen or Restaurant' : 'Full Legal Name' }} <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.name" 
                type="text" 
                required 
                :placeholder="regForm.role === 'seller' ? 'e.g. Green Leaf Cafe & Kitchen' : 'e.g. Rajesh Kumar'" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                <span class="text-emerald-400 font-mono font-bold mr-1">3.</span>
                Official Email ID <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.email" 
                type="email" 
                required 
                placeholder="accounts@restaurant.com" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div v-if="regForm.role === 'seller'" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                <span class="text-emerald-400 font-mono font-bold mr-1">4.</span>
                Primary Contact Person Name <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.contact_name" 
                type="text" 
                required 
                placeholder="e.g. Suresh Sharma (Manager)" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                <span class="text-emerald-400 font-mono font-bold mr-1">5.</span>
                Primary Contact Number <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.phone" 
                type="text" 
                required 
                placeholder="e.g. +91 98200 12345" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div v-if="regForm.role === 'seller'" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                <span class="text-emerald-400 font-mono font-bold mr-1">6.</span>
                Alternative Contact Name <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.alt_contact_name" 
                type="text" 
                required 
                placeholder="e.g. Chef Amit (Kitchen In-Charge)" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                <span class="text-emerald-400 font-mono font-bold mr-1">7.</span>
                Alternative Number <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.alt_phone" 
                type="text" 
                required 
                placeholder="e.g. +91 98200 67890" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-if="regForm.role !== 'seller'">
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">Contact Phone</label>
              <input 
                v-model="regForm.phone" 
                type="text" 
                required
                placeholder="+91 98000 12345" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div :class="regForm.role === 'seller' ? 'sm:col-span-2' : ''">
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">Portal Account Password <span class="text-rose-400">*</span></label>
              <input 
                v-model="regForm.password" 
                type="password" 
                required 
                placeholder="Minimum 6 characters" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <!-- Section B: Seller Regulatory & Banking Documents -->
        <div v-if="regForm.role === 'seller'" class="space-y-2.5 pt-2 border-t border-slate-800">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                <span class="text-emerald-400 font-mono font-bold mr-1">8.</span>
                FSSAI 14-Digit License Number <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.fssai_license_no" 
                type="text" 
                required 
                maxlength="14"
                placeholder="e.g. 11521034000123" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                <span class="text-emerald-400 font-mono font-bold mr-1">9.</span>
                GST Number (GSTIN) <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.gst_no" 
                type="text" 
                required 
                maxlength="15"
                placeholder="e.g. 27AAAAA0000A1Z5" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                <span class="text-emerald-400 font-mono font-bold mr-1">10.</span>
                Cancel Cheque Ref or UPI ID <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.bank_upi_or_cheque" 
                type="text" 
                required 
                placeholder="e.g. cafe@icici or A/C 9876543210 IFSC HDFC0001" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                <span class="text-emerald-400 font-mono font-bold mr-1">12.</span>
                MSME / UDYAM Number <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.msme_udyam_no" 
                type="text" 
                required 
                placeholder="e.g. UDYAM-MH-01-0012345" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <!-- Section C: Address & Location on Map -->
          <div class="pt-2 border-t border-slate-800 space-y-2">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div class="sm:col-span-2">
                <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                  <span class="text-emerald-400 font-mono font-bold mr-1">2.</span>
                  Kitchen / Site Street Address <span class="text-rose-400">*</span>
                </label>
                <input 
                  v-model="regForm.address" 
                  type="text" 
                  required
                  placeholder="e.g. Shop 12, High Street, Near Station" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-300 mb-1">City / Region <span class="text-rose-400">*</span></label>
                <input 
                  v-model="regForm.city" 
                  type="text" 
                  required
                  placeholder="e.g. Mumbai" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[11px] font-semibold text-slate-300 mb-1">Pincode <span class="text-rose-400">*</span></label>
                <input 
                  v-model="regForm.pincode" 
                  type="text" 
                  required
                  placeholder="e.g. 400052" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-300 mb-1">Preferred Pickup Window</label>
                <select 
                  v-model="regForm.pickup_preference" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                  <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                  <option value="Night (9 PM - 12 AM)">Night (9 PM - 12 AM)</option>
                  <option value="On-Demand">On-Demand / Any Time</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Field Executive Vehicle & Operating Base -->
        <div v-if="regForm.role === 'agent'" class="space-y-2.5 pt-1">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">
                Vehicle Registration No. <span class="text-rose-400">*</span>
              </label>
              <input 
                v-model="regForm.vehicle_no" 
                type="text" 
                required 
                placeholder="e.g. MH-02-EV-4412" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">Operating City / Base</label>
              <input 
                v-model="regForm.city" 
                type="text" 
                required 
                placeholder="e.g. Mumbai Central" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <!-- Live GPS Location Detection (For Both Sellers and Agents) -->
        <div class="p-3 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="text-emerald-400 font-bold text-xs">📍</span>
              <span class="text-[11px] font-bold text-white">
                {{ regForm.role === 'seller' ? 'Kitchen GPS Coordinates (Pickup Spot)' : 'Current Device / Vehicle GPS Location' }}
              </span>
            </div>
            <button 
              type="button" 
              @click="detectLocation" 
              :disabled="detectingGps"
              class="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1 border border-emerald-500/30 active:scale-95"
            >
              <span>{{ detectingGps ? '📡' : '🎯' }}</span>
              <span>{{ detectingGps ? 'Locking GPS...' : 'Detect My Exact Location' }}</span>
            </button>
          </div>

          <div v-if="gpsStatusMsg" class="text-[10px] font-mono px-2.5 py-1 rounded-lg border" :class="gpsSuccess ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40' : 'bg-amber-950/40 text-amber-300 border-amber-500/40'">
            {{ gpsStatusMsg }}
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] font-semibold text-slate-400 mb-0.5">Latitude</label>
              <input 
                v-model.number="regForm.latitude" 
                type="number" 
                step="any" 
                placeholder="e.g. 19.0760" 
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-[10px] font-semibold text-slate-400 mb-0.5">Longitude</label>
              <input 
                v-model.number="regForm.longitude" 
                type="number" 
                step="any" 
                placeholder="e.g. 72.8777" 
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <p class="text-[10px] text-slate-500">
            Tip: Click <strong>Detect My Exact Location</strong> above to automatically lock your actual device coordinates instead of any default.
          </p>
        </div>

        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          🔒 In compliance with FSSAI regulations, accounts remain inactive until Super Admin audits KYC credentials. A permanent static site QR is issued upon approval.
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-emerald-900/40 transition disabled:opacity-50"
        >
          {{ loading ? 'Submitting Application...' : 'Submit Official Onboarding Application' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialMode: {
    type: String,
    default: 'login'
  }
});

const emit = defineEmits(['close', 'login', 'register']);

const mode = ref(props.initialMode || 'login');
const loading = ref(false);
const errorMessage = ref('');

const loginForm = ref({
  email: '',
  password: '',
});

function fillAdminCredentials() {
  loginForm.value.email = 'admin@geofield.com';
  loginForm.value.password = 'admin123';
  errorMessage.value = '';
}


const detectingGps = ref(false);
const gpsStatusMsg = ref('');
const gpsSuccess = ref(false);

const regForm = ref({
  role: 'seller',
  name: '',               // 1. Name of Kitchen or Restaurant
  address: '',            // 2. Physical Address
  city: '',               // 2. City
  pincode: '',            // 2. Pincode
  email: '',              // 3. Email ID
  contact_name: '',       // 4. Primary Contact Person Name
  phone: '',              // 5. Primary Contact Number
  alt_contact_name: '',   // 6. Alternative Contact Person Name
  alt_phone: '',          // 7. Alternative Phone Number
  fssai_license_no: '',   // 8. FSSAI License Number
  gst_no: '',             // 9. GST Number
  bank_upi_or_cheque: '', // 10. Cancel Cheque or UPI ID
  latitude: null,         // 11. Location on map (lat)
  longitude: null,        // 11. Location on map (lng)
  msme_udyam_no: '',      // 12. MSME / UDYAM Number
  password: '',
  pickup_preference: 'Morning (9 AM - 12 PM)',
  vehicle_no: '',
});

function detectLocation() {
  if (!navigator.geolocation) {
    gpsStatusMsg.value = 'Geolocation is not supported by your browser. Please enter coordinates manually.';
    gpsSuccess.value = false;
    return;
  }
  detectingGps.value = true;
  gpsStatusMsg.value = 'Requesting device GPS coordinates...';
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      detectingGps.value = false;
      const lat = parseFloat(position.coords.latitude.toFixed(6));
      const lng = parseFloat(position.coords.longitude.toFixed(6));
      regForm.value.latitude = lat;
      regForm.value.longitude = lng;
      gpsSuccess.value = true;
      gpsStatusMsg.value = `✓ GPS Locked (${lat}°, ${lng}°). Resolving street address...`;
      
      // Auto-detect street address, city & postcode via reverse geocode
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.address) {
            const a = data.address;
            const building = a.amenity || a.building || a.shop || a.office || '';
            const roadPart = [a.house_number, a.road || a.street || a.pedestrian || a.footway].filter(Boolean).join(' ');
            const locality = a.suburb || a.neighbourhood || a.residential || a.subdistrict || '';

            let street = [building, roadPart, locality].filter(Boolean).join(', ');
            if (!street && data.display_name) {
              street = data.display_name.split(',').slice(0, 3).map(s => s.trim()).join(', ');
            }
            if (street) {
              regForm.value.address = street;
            }

            const detectedCity = a.city || a.town || a.city_district || a.municipality || a.suburb || a.state_district || a.county || a.state;
            if (detectedCity) {
              regForm.value.city = detectedCity;
            }

            if (a.postcode) {
              regForm.value.pincode = a.postcode;
            }

            gpsStatusMsg.value = `✓ Address Auto-Filled: ${detectedCity || 'City'}${a.postcode ? ' (' + a.postcode + ')' : ''}`;
          }
        })
        .catch(() => {
          gpsStatusMsg.value = `✓ GPS Locked: ${lat}° N, ${lng}° E (Accuracy: ~${acc}m)`;
        });
    },
    (error) => {
      detectingGps.value = false;
      gpsSuccess.value = false;
      if (error.code === error.PERMISSION_DENIED) {
        gpsStatusMsg.value = 'GPS permission denied. Please allow location access in your browser or type coordinates manually.';
      } else {
        gpsStatusMsg.value = `GPS Notice: ${error.message}. You can enter coordinates manually.`;
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}


async function handleLogin() {
  loading.value = true;
  errorMessage.value = '';
  try {
    await emit('login', loginForm.value.email, loginForm.value.password, (err) => {
      if (err) errorMessage.value = err;
    });
  } catch (err) {
    errorMessage.value = err.message || 'Login failed. Check your credentials.';
  } finally {
    loading.value = false;
  }
}

async function handleRegister() {
  errorMessage.value = '';

  if (regForm.value.role === 'seller') {
    const f = regForm.value;
    if (!f.name?.trim()) { errorMessage.value = 'Item #1 Required: Name of Kitchen or Restaurant'; return; }
    if (!f.email?.trim()) { errorMessage.value = 'Item #3 Required: Official Email ID'; return; }
    if (!f.contact_name?.trim()) { errorMessage.value = 'Item #4 Required: Primary Contact Person Name'; return; }
    if (!f.phone?.trim()) { errorMessage.value = 'Item #5 Required: Primary Contact Number'; return; }
    if (!f.alt_contact_name?.trim()) { errorMessage.value = 'Item #6 Required: Alternative Contact Name'; return; }
    if (!f.alt_phone?.trim()) { errorMessage.value = 'Item #7 Required: Alternative Phone Number'; return; }
    if (!f.fssai_license_no?.trim()) { errorMessage.value = 'Item #8 Required: FSSAI 14-Digit License Number'; return; }
    if (!f.gst_no?.trim()) { errorMessage.value = 'Item #9 Required: GST Identification Number (GSTIN)'; return; }
    if (!f.bank_upi_or_cheque?.trim()) { errorMessage.value = 'Item #10 Required: Cancel Cheque Reference or UPI ID'; return; }
    if (f.latitude === null || f.longitude === null) {
      errorMessage.value = 'Item #11 Required: Exact Location on Map. Please click "Detect My Exact Location" or enter coordinates.';
      return;
    }
    if (!f.address?.trim() || !f.city?.trim() || !f.pincode?.trim()) {
      errorMessage.value = 'Item #2 Required: Full Address (Street Address, City, and Pincode)';
      return;
    }
    if (!f.msme_udyam_no?.trim()) { errorMessage.value = 'Item #12 Required: MSME / UDYAM Registration Number'; return; }
  }

  loading.value = true;
  try {
    await emit('register', { ...regForm.value }, (err) => {
      if (err) errorMessage.value = err;
    });
  } catch (err) {
    errorMessage.value = err.message || 'Registration failed.';
  } finally {
    loading.value = false;
  }
}
</script>
