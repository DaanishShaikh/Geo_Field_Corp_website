<template>
  <aside 
    :class="[
      isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0',
      'fixed lg:static top-16 bottom-0 left-0 w-64 bg-[#060A08] border-r border-white/10 z-30 transition-transform duration-200 ease-in-out flex flex-col justify-between p-4 overflow-y-auto'
    ]"
  >
    <div class="space-y-5">
      <!-- Mobile Close Row -->
      <div class="flex items-center justify-between lg:hidden pb-1 border-b border-white/10">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">{{ $t('nav.navigationMenu') }}</span>
        <button 
          @click="$emit('close')"
          class="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.06] min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Close navigation"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Active User Card -->
      <div v-if="user" class="p-3.5 rounded-2xl bg-gradient-to-br from-[#0E1B14] via-[#0A100D] to-[#060A08] border border-white/10 space-y-1.5 shadow-md">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold uppercase tracking-wider text-[#22C55E] font-mono">
            {{ roleBadge(user.role) }}
          </span>
          <span 
            :class="user.status === 'approved' ? 'bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/30' : 'bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30'"
            class="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border"
          >
            {{ user.status }}
          </span>
        </div>
        <div class="text-xs font-display font-bold text-white truncate">{{ user.name }}</div>
        <div class="text-[10px] text-gray-400 truncate">{{ user.email }}</div>
        <div v-if="user.seller_profile" class="text-[10px] text-gray-400 font-mono pt-1 truncate">
          FSSAI: {{ user.seller_profile.fssai_license_no }}
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="space-y-1">
        <div class="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] font-mono px-3 mb-2">
          {{ $t('nav.management') }}
        </div>
        <nav class="space-y-1">
          <button 
            @click="navigate('dashboard')" 
            :class="currentView === 'dashboard' ? 'bg-[#22C55E]/15 text-[#4ADE80] border border-[#22C55E]/30 shadow-sm font-bold' : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent font-medium'"
            class="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs text-left transition min-h-[44px] cursor-pointer"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            {{ $t('nav.dashboard') }}
          </button>

          <button 
            @click="navigate('receipts')" 
            :class="currentView === 'receipts' ? 'bg-[#22C55E]/15 text-[#4ADE80] border border-[#22C55E]/30 shadow-sm font-bold' : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent font-medium'"
            class="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs text-left transition min-h-[44px] cursor-pointer"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            {{ $t('nav.receiptLedgerCerts') }}
          </button>

          <button 
            v-if="user?.role === 'agent' || user?.role === 'admin'"
            @click="navigate('logistics')" 
            :class="currentView === 'logistics' ? 'bg-[#22C55E]/15 text-[#4ADE80] border border-[#22C55E]/30 shadow-sm font-bold' : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent font-medium'"
            class="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs text-left transition min-h-[44px] cursor-pointer"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
            </svg>
            {{ user?.role === 'admin' ? $t('nav.fleetGpsDynamicRouting') : $t('nav.dailyCollectionManifest') }}
          </button>

          <button 
            v-if="user?.role === 'admin'"
            @click="navigate('audit')" 
            :class="currentView === 'audit' ? 'bg-[#22C55E]/15 text-[#4ADE80] border border-[#22C55E]/30 shadow-sm font-bold' : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent font-medium'"
            class="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs text-left transition min-h-[44px] cursor-pointer"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ $t('nav.appendOnlyAuditTrail') }}
          </button>
        </nav>
      </div>

      <!-- Regulatory Notice & Compliance Standard -->
      <div class="p-3.5 rounded-2xl bg-[#0E1B14]/80 border border-[#22C55E]/20 text-[11px] text-gray-300 space-y-1.5">
        <div class="font-bold text-[#22C55E] flex items-center gap-1.5 font-display">
          <span>🛡️</span> {{ $t('nav.fssaiRucoCompliant') }}
        </div>
        <p class="text-[10px] text-gray-400 leading-relaxed font-sans">
          {{ $t('nav.rucoComplianceNotice') }}
        </p>
      </div>

      <!-- Language Switcher in Sidebar (Visible on mobile / small devices) -->
      <div class="lg:hidden p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
        <span class="text-xs text-gray-400 font-medium">Language / भाषा</span>
        <LanguageSwitcher />
      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="pt-4 border-t border-white/10 text-[11px] text-gray-500 flex items-center justify-between font-mono">
      <span>GeoField Corp</span>
      <span class="text-[#22C55E] font-bold">RUCO v2.0</span>
    </div>
  </aside>
</template>

<script setup>
import LanguageSwitcher from './LanguageSwitcher.vue';
import { useI18n } from '../services/i18n';

const { t } = useI18n();

defineProps({
  user: Object,
  currentView: String,
  isOpen: Boolean,
});

const emit = defineEmits(['navigate', 'close']);

function navigate(view) {
  emit('navigate', view);
}

function roleBadge(role) {
  if (role === 'admin') return t('nav.superAdmin');
  if (role === 'agent') return t('nav.fieldExecutive');
  if (role === 'seller') return t('nav.foodBusinessOperator');
  return role;
}
</script>