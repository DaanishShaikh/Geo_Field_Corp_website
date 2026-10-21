<template>
  <div 
    class="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-2xl bg-[#0C120F] border border-bio/30 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(34,197,94,0.15)] text-slate-100 my-8 space-y-6">
      
      <!-- Top Bar: Logo & Verification Status -->
      <div class="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div class="flex items-center gap-3">
          <img src="/brand/logo.svg" alt="GeoField Corp" class="h-8 w-auto" />
          <div class="hidden sm:block border-l border-white/15 pl-3">
            <span class="block font-mono text-[10px] uppercase tracking-widest text-bio font-bold">FSSAI RUCO Verified</span>
            <span class="block text-xs text-slate-400">Traceable Supply Chain Network</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bio/15 border border-bio/40 text-bio font-mono text-xs font-bold uppercase tracking-wider">
            <span class="w-2 h-2 rounded-full bg-bio animate-pulse"></span>
            ✓ Verified FBO
          </span>
          <button 
            @click="$emit('close')"
            class="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer text-lg font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !seller.name" class="py-16 text-center space-y-4">
        <div class="w-10 h-10 border-2 border-bio/20 border-t-bio rounded-full animate-spin mx-auto"></div>
        <p class="font-mono text-xs text-slate-400 tracking-wider">RETRIEVING VERIFIED SELLER DOSSIER...</p>
      </div>

      <!-- Main Seller Dossier -->
      <div v-else class="space-y-6">

        <!-- Company / Kitchen Main Hero -->
        <div class="bg-gradient-to-r from-slate-900/90 to-[#121c17] border border-white/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
          <div class="absolute -right-8 -bottom-8 w-36 h-36 bg-bio/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <span class="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 block mb-1">
                Commercial Kitchen / Food Business Operator
              </span>
              <h1 class="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                {{ seller.name || 'Verified Kitchen Facility' }}
              </h1>
              <p class="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span class="font-mono text-bio">{{ seller.site_id || 'RUCO-SITE-ID' }}</span>
                <span>•</span>
                <span>Registered Site</span>
              </p>
            </div>

            <!-- Verification Stamp -->
            <div class="flex-shrink-0 text-center sm:text-right bg-black/40 sm:bg-transparent p-3 rounded-xl sm:p-0 border sm:border-0 border-white/5">
              <span class="font-mono text-[10px] uppercase tracking-wider text-slate-400 block">Compliance Seal</span>
              <span class="inline-block mt-0.5 text-xs font-mono font-bold text-amber-400">
                🛡️ RUCO Grade Certified
              </span>
            </div>
          </div>
        </div>

        <!-- 3-Column Info Grid: Legal, Contact, Address -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <!-- Col 1: Legal & Registration -->
          <div class="bg-slate-900/70 border border-white/10 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2 text-bio font-mono text-[11px] font-bold uppercase tracking-wider">
              <span>📋</span> Legal & Licences
            </div>

            <div>
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">FSSAI Licence No.</span>
              <div class="flex items-center justify-between mt-0.5">
                <strong class="font-mono text-amber-400 text-xs tracking-wider">
                  {{ profile.fssai_license_no || 'FSSAI Verified' }}
                </strong>
                <button 
                  v-if="profile.fssai_license_no" 
                  @click="copy(profile.fssai_license_no)" 
                  class="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 bg-slate-800 rounded font-mono"
                  title="Copy FSSAI"
                >
                  {{ copiedText === profile.fssai_license_no ? '✓' : 'Copy' }}
                </button>
              </div>
            </div>

            <div class="pt-2 border-t border-white/5">
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">GSTIN / Tax ID</span>
              <div class="flex items-center justify-between mt-0.5">
                <span class="font-mono text-slate-200 text-xs">{{ profile.gst_no || 'Registered on File' }}</span>
                <button 
                  v-if="profile.gst_no" 
                  @click="copy(profile.gst_no)" 
                  class="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 bg-slate-800 rounded font-mono"
                >
                  {{ copiedText === profile.gst_no ? '✓' : 'Copy' }}
                </button>
              </div>
            </div>

            <div class="pt-2 border-t border-white/5">
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">MSME / Udyam Reg.</span>
              <span class="font-mono text-slate-200 text-xs block mt-0.5">{{ profile.msme_udyam_no || 'N/A' }}</span>
            </div>
          </div>

          <!-- Col 2: Direct Contact -->
          <div class="bg-slate-900/70 border border-white/10 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2 text-bio font-mono text-[11px] font-bold uppercase tracking-wider">
              <span>👤</span> Key Contacts
            </div>

            <div>
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">Primary Representative</span>
              <div class="text-white text-xs font-semibold mt-0.5">{{ profile.contact_name || seller.name }}</div>
              <a 
                v-if="seller.phone" 
                :href="'tel:' + seller.phone" 
                class="inline-flex items-center gap-1.5 text-bio hover:underline font-mono text-xs font-bold mt-1"
              >
                📞 {{ seller.phone }}
              </a>
              <span v-else class="text-slate-500 text-xs font-mono">No phone</span>
            </div>

            <div class="pt-2 border-t border-white/5">
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">Alternative Contact</span>
              <div class="text-slate-200 text-xs mt-0.5">{{ profile.alt_contact_name || 'Not provided' }}</div>
              <a 
                v-if="profile.alt_phone" 
                :href="'tel:' + profile.alt_phone" 
                class="inline-flex items-center gap-1.5 text-bio/90 hover:underline font-mono text-[11px] mt-0.5"
              >
                📞 {{ profile.alt_phone }}
              </a>
            </div>

            <div class="pt-2 border-t border-white/5">
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">Official Email</span>
              <a 
                v-if="seller.email" 
                :href="'mailto:' + seller.email" 
                class="text-slate-300 hover:text-bio text-xs block truncate mt-0.5"
              >
                ✉️ {{ seller.email }}
              </a>
              <span v-else class="text-slate-500 text-xs">N/A</span>
            </div>
          </div>

          <!-- Col 3: Facility Location & Map -->
          <div class="bg-slate-900/70 border border-white/10 rounded-2xl p-4 space-y-3">
            <div class="flex items-center gap-2 text-bio font-mono text-[11px] font-bold uppercase tracking-wider">
              <span>📍</span> Facility Location
            </div>

            <div>
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">Registered Physical Address</span>
              <p class="text-white text-xs leading-relaxed mt-0.5">
                {{ profile.address || 'Address registered with compliance' }}
              </p>
              <p class="text-[11px] text-slate-400 font-mono mt-0.5">
                {{ profile.city || 'Mumbai' }}{{ profile.pincode ? ' - ' + profile.pincode : '' }}
              </p>
            </div>

            <div class="pt-2 border-t border-white/5">
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">GPS Coordinates</span>
              <div v-if="profile.latitude && profile.longitude" class="mt-0.5 flex items-center justify-between">
                <span class="font-mono text-[11px] text-emerald-400">
                  {{ profile.latitude.toFixed(4) }}, {{ profile.longitude.toFixed(4) }}
                </span>
                <a 
                  :href="`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`" 
                  target="_blank" 
                  class="px-2 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-semibold hover:bg-emerald-500/25 transition"
                >
                  Maps ↗
                </a>
              </div>
              <span v-else class="text-slate-500 text-[11px] font-mono block mt-0.5">Coordinates on file</span>
            </div>

            <div class="pt-2 border-t border-white/5">
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">Pickup Window</span>
              <span class="text-xs text-white block mt-0.5">
                {{ profile.pickup_preference || 'Morning (9 AM - 12 PM)' }}
              </span>
            </div>
          </div>

        </div>

        <!-- Additional Row: Financial / ESG Impact -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Settlement Info -->
          <div class="bg-slate-900/50 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">Payout Mode / UPI VPA</span>
              <strong class="font-mono text-cyan-400 text-xs block mt-0.5">
                {{ profile.bank_upi_or_cheque || 'Direct Settlement via GeoField Escrow' }}
              </strong>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px]">
              Active Payout
            </span>
          </div>

          <!-- Environmental Traceability Impact -->
          <div class="bg-slate-900/50 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span class="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">RUCO Clean Fuel Diverted</span>
              <div class="flex items-center gap-3 mt-0.5">
                <span class="font-mono text-xs font-bold text-bio">
                  {{ stats.total_volume || 0 }} Liters
                </span>
                <span class="text-slate-500">•</span>
                <span class="font-mono text-xs text-emerald-400">
                  {{ stats.co2_prevented_kg || 0 }} kg CO₂ Saved
                </span>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-bio/10 border border-bio/30 text-bio font-mono text-[10px]">
              ESG Certified
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div class="flex flex-wrap items-center gap-2">
            <a 
              v-if="seller.phone" 
              :href="'tel:' + seller.phone"
              class="px-4 py-2 bg-bio hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              <span>📞</span> Call Kitchen
            </a>

            <a 
              v-if="profile.latitude && profile.longitude"
              :href="`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`" 
              target="_blank"
              class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition"
            >
              <span>📍</span> Google Maps
            </a>

            <button 
              @click="copyVerificationUrl"
              class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <span>🔗</span> {{ copiedLink ? 'Link Copied!' : 'Copy Verification Link' }}
            </button>
          </div>

          <button 
            @click="$emit('close')"
            class="px-5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>

        <!-- Bottom Certification Disclaimer -->
        <div class="text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest pt-2">
          GeoField Corp Digital Chain-of-Custody · Repurpose Used Cooking Oil (RUCO)
        </div>

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
