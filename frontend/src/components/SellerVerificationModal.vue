<template>
  <div 
    class="fixed inset-0 bg-black/85 backdrop-blur-md z-50 overflow-y-auto flex justify-center items-start p-2.5 sm:p-5"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-lg bg-[#0A130E] border border-[#22C55E]/30 rounded-2xl sm:rounded-3xl shadow-2xl text-[#F3F5F4] my-3 sm:my-6 overflow-hidden">
      
      <!-- Top Bar: Logo & Verification Status -->
      <div class="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#060A08]/90">
        <div class="flex items-center gap-2.5">
          <img src="/brand/geofield-full-logo.png" alt="GeoField Corp" class="h-6 sm:h-7 w-auto" />
          <div class="border-l border-white/15 pl-2.5">
            <span class="block font-mono text-[9px] uppercase tracking-wider text-bio font-bold">FSSAI RUCO</span>
            <span class="block text-[10px] text-gray-400 -mt-0.5">Verified FBO</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-bio/15 border border-bio/30 text-bio font-mono text-[10px] font-bold uppercase tracking-wider">
            <span class="w-1.5 h-1.5 rounded-full bg-bio animate-pulse"></span>
            Verified
          </span>
          <button 
            @click="$emit('close')"
            class="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white flex items-center justify-center transition cursor-pointer text-sm font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !seller.name" class="py-16 text-center space-y-3">
        <div class="w-8 h-8 border-2 border-bio/20 border-t-bio rounded-full animate-spin mx-auto"></div>
        <p class="font-mono text-[11px] text-gray-400 tracking-wider">RETRIEVING VERIFIED SELLER DOSSIER...</p>
      </div>

      <!-- Main Seller Dossier Content -->
      <div v-else class="p-4 sm:p-6 space-y-3.5">

        <!-- Company / Kitchen Main Hero -->
        <div class="bg-gradient-to-r from-[#0E1B14] to-[#0A130E] border border-white/10 rounded-xl sm:rounded-2xl p-4 relative overflow-hidden">
          <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-bio/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div class="relative z-10 space-y-1.5">
            <span class="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-400 block">
              Food Business Operator / Commercial Facility
            </span>
            <h1 class="text-lg sm:text-xl font-bold font-display text-white tracking-tight">
              {{ seller.name || 'Verified Kitchen Facility' }}
            </h1>
            
            <div class="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span class="font-mono text-bio bg-bio/10 border border-bio/20 px-2 py-0.5 rounded text-[10px] font-bold">
                {{ seller.site_id || 'RUCO-SITE-ID' }}
              </span>
              <span class="text-gray-500">•</span>
              <span class="text-amber-400 font-mono text-[10px] font-semibold">
                🛡️ RUCO Grade Certified
              </span>
            </div>
          </div>
        </div>

        <!-- 1. Key Contacts Card -->
        <div class="bg-[#060A08]/90 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 space-y-3">
          <div class="flex items-center gap-1.5 text-bio font-mono text-[10px] font-bold uppercase tracking-wider">
            <span>👤</span> Key Contacts
          </div>

          <!-- Primary Contact -->
          <div class="flex items-center justify-between gap-3 text-xs">
            <div>
              <span class="font-mono text-[9px] uppercase tracking-wider text-gray-400 block">Primary Contact</span>
              <span class="text-white font-medium block mt-0.5">
                {{ primaryRepresentativeName }}
              </span>
            </div>
            <a 
              v-if="seller.phone" 
              :href="'tel:' + seller.phone" 
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bio/15 hover:bg-bio/25 border border-bio/40 text-bio font-mono text-xs font-bold transition flex-shrink-0"
            >
              <span>📞</span> {{ seller.phone }}
            </a>
            <span v-else class="text-gray-500 font-mono text-xs">No phone</span>
          </div>

          <!-- Alternative Contact (if provided) -->
          <div v-if="hasAltContact" class="pt-2 border-t border-white/5 flex items-center justify-between gap-3 text-xs">
            <div>
              <span class="font-mono text-[9px] uppercase tracking-wider text-gray-400 block">Alternative Contact</span>
              <span class="text-gray-300 font-medium block mt-0.5">
                {{ altRepresentativeName }}
              </span>
            </div>
            <a 
              v-if="profile.alt_phone" 
              :href="'tel:' + profile.alt_phone" 
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition flex-shrink-0"
            >
              <span>📞</span> {{ profile.alt_phone }}
            </a>
          </div>

          <!-- Email -->
          <div class="pt-2 border-t border-white/5 flex items-center justify-between gap-3 text-xs">
            <span class="font-mono text-[9px] uppercase tracking-wider text-gray-400">Official Email</span>
            <a 
              v-if="seller.email" 
              :href="'mailto:' + seller.email" 
              class="text-gray-300 hover:text-bio font-mono text-xs truncate max-w-[200px]"
            >
              ✉️ {{ seller.email }}
            </a>
            <span v-else class="text-gray-500 text-xs">Not specified</span>
          </div>
        </div>

        <!-- 2. Facility Location Card -->
        <div class="bg-[#060A08]/90 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 text-bio font-mono text-[10px] font-bold uppercase tracking-wider">
              <span>📍</span> Facility Location
            </div>
            <a 
              v-if="profile.latitude && profile.longitude"
              :href="`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`" 
              target="_blank" 
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold transition"
            >
              <span>Directions</span> ↗
            </a>
          </div>

          <div>
            <p class="text-white text-xs leading-relaxed font-medium">
              {{ profile.address || 'Registered Facility Address' }}
            </p>
            <p class="text-[11px] text-gray-400 font-mono mt-0.5">
              {{ profile.city || 'Mumbai' }}{{ profile.pincode ? ' - ' + profile.pincode : '' }}
            </p>
          </div>

          <div class="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
            <span class="font-mono text-[9px] uppercase tracking-wider text-gray-400">Pickup Window</span>
            <span class="font-medium text-slate-200 text-xs">
              {{ profile.pickup_preference || 'Morning (9 AM - 12 PM)' }}
            </span>
          </div>
        </div>

        <!-- 3. Legal & Licences Card -->
        <div class="bg-[#060A08]/90 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 space-y-2 text-xs">
          <div class="flex items-center gap-1.5 text-bio font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
            <span>📋</span> Regulatory & Compliance Identifiers
          </div>

          <!-- FSSAI Licence -->
          <div class="flex items-center justify-between py-1 border-b border-white/5">
            <span class="font-mono text-[10px] text-gray-400">FSSAI Licence No:</span>
            <div class="flex items-center gap-2">
              <strong class="font-mono text-amber-400 text-xs tracking-wider">
                {{ profile.fssai_license_no || 'Verified RUCO' }}
              </strong>
              <button 
                v-if="profile.fssai_license_no" 
                @click="copy(profile.fssai_license_no)" 
                class="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded text-[10px] font-mono transition cursor-pointer"
                title="Copy FSSAI"
              >
                {{ copiedText === profile.fssai_license_no ? '✓ Copied' : 'Copy' }}
              </button>
            </div>
          </div>

          <!-- GSTIN -->
          <div class="flex items-center justify-between py-1 border-b border-white/5">
            <span class="font-mono text-[10px] text-gray-400">GSTIN / Tax ID:</span>
            <div class="flex items-center gap-2">
              <span class="font-mono text-slate-200 text-xs">
                {{ profile.gst_no || 'On File' }}
              </span>
              <button 
                v-if="profile.gst_no" 
                @click="copy(profile.gst_no)" 
                class="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded text-[10px] font-mono transition cursor-pointer"
              >
                {{ copiedText === profile.gst_no ? '✓ Copied' : 'Copy' }}
              </button>
            </div>
          </div>

          <!-- MSME / Udyam -->
          <div class="flex items-center justify-between py-1">
            <span class="font-mono text-[10px] text-gray-400">MSME / Udyam Reg:</span>
            <span class="font-mono text-slate-200 text-xs">
              {{ profile.msme_udyam_no || 'N/A' }}
            </span>
          </div>
        </div>

        <!-- 4. Settlement & ESG Summary Strip -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <!-- Settlement UPI -->
          <div class="bg-slate-900/40 border border-white/5 rounded-xl p-3">
            <span class="font-mono text-[9px] uppercase tracking-wider text-gray-400 block">Payout Mode</span>
            <strong class="font-mono text-cyan-400 text-xs block truncate mt-1">
              {{ profile.bank_upi_or_cheque || 'Escrow Verified' }}
            </strong>
          </div>

          <!-- ESG Volume -->
          <div class="bg-slate-900/40 border border-white/5 rounded-xl p-3">
            <span class="font-mono text-[9px] uppercase tracking-wider text-gray-400 block">RUCO Biofuel Diverted</span>
            <strong class="font-mono text-bio text-xs block mt-1">
              {{ stats.total_volume || 0 }} Liters
            </strong>
          </div>
        </div>

      </div>

      <!-- Bottom Sticky Action Bar -->
      <div class="px-4 sm:px-6 py-3.5 bg-slate-950 border-t border-white/10 flex items-center justify-between gap-2">
        <a 
          v-if="seller.phone" 
          :href="'tel:' + seller.phone"
          class="flex-1 py-2.5 px-4 bg-bio hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-lg shadow-emerald-500/20"
        >
          <span>📞</span> Call Kitchen
        </a>

        <a 
          v-if="profile.latitude && profile.longitude"
          :href="`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`" 
          target="_blank"
          class="py-2.5 px-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
        >
          <span>📍</span> Maps
        </a>

        <button 
          @click="copyVerificationUrl"
          class="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          title="Share Link"
        >
          <span>🔗</span> {{ copiedLink ? '✓' : 'Share' }}
        </button>

        <button 
          @click="$emit('close')"
          class="py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
        >
          Close
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../services/api';

const props = defineProps({
  sellerId: {
    type: String,
    required: true
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close']);

const loading = ref(true);
const seller = ref(props.initialData || {});
const copiedText = ref('');
const copiedLink = ref(false);

const profile = computed(() => seller.value?.seller_profile || {});
const stats = computed(() => seller.value?.stats || {});

// Smart representative name cleaning so phone number is never printed as the person's name
function cleanPersonName(name, phoneFallback, defaultLabel) {
  if (!name) return defaultLabel;
  const str = String(name).trim();
  const digitsOnly = str.replace(/\D/g, '');
  const phoneDigits = String(phoneFallback || '').replace(/\D/g, '');
  
  // If the name is basically digits (like a phone number) or identical to the phone
  if ((digitsOnly.length >= 7 && digitsOnly === phoneDigits) || /^\+?[0-9\s-]+$/.test(str)) {
    return defaultLabel;
  }
  return str;
}

const primaryRepresentativeName = computed(() => {
  return cleanPersonName(
    profile.value?.contact_name || seller.value?.name,
    seller.value?.phone,
    'Authorized Signatory'
  );
});

const altRepresentativeName = computed(() => {
  return cleanPersonName(
    profile.value?.alt_contact_name,
    profile.value?.alt_phone,
    'Alternate Contact'
  );
});

const hasAltContact = computed(() => {
  return Boolean(profile.value?.alt_phone || (profile.value?.alt_contact_name && !/^\+?[0-9\s-]+$/.test(profile.value.alt_contact_name)));
});

onMounted(async () => {
  if (props.initialData && Object.keys(props.initialData).length > 0) {
    seller.value = { ...props.initialData };
  }
  
  try {
    loading.value = true;
    const res = await api.getPublicSellerProfile(props.sellerId);
    if (res) {
      seller.value = {
        ...res,
        seller_profile: {
          ...(seller.value?.seller_profile || {}),
          ...(res.seller_profile || {})
        },
        stats: res.stats || seller.value?.stats || {}
      };
    }
  } catch (err) {
    console.warn("Could not load full seller profile, using fallback data:", err);
  } finally {
    loading.value = false;
  }
});

function copy(text) {
  if (!text) return;
  navigator.clipboard.writeText(text);
  copiedText.value = text;
  setTimeout(() => {
    copiedText.value = '';
  }, 2000);
}

function copyVerificationUrl() {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  copiedLink.value = true;
  setTimeout(() => {
    copiedLink.value = false;
  }, 2500);
}
</script>
