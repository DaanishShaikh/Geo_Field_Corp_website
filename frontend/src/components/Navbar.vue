<template>
  <header class="h-16 bg-[#060A08]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-3 sm:px-4 lg:px-8 sticky top-0 z-40">
    <div class="flex items-center gap-2.5 sm:gap-4 min-w-0">
      <button 
        v-if="user"
        @click="$emit('toggle-sidebar')" 
        class="lg:hidden p-2 rounded-xl bg-white/[0.06] text-gray-300 hover:text-white hover:bg-white/[0.12] border border-white/10 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
        aria-label="Toggle Navigation"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <a href="/" class="flex items-center gap-2.5 sm:gap-3 group min-w-0 focus:outline-none">
        <img 
          src="/brand/geofield-full-logo.png" 
          alt="GeoField Corp" 
          class="h-7 sm:h-8 w-auto object-contain shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
        />
        <div class="min-w-0 hidden md:block">
          <span class="geo-badge-emerald text-[9px] uppercase tracking-[0.14em] font-mono px-2 py-0.5">
            {{ $t('nav.rucoNetwork') }}
          </span>
        </div>
      </a>
    </div>

    <!-- Right Header Controls -->
    <div class="flex items-center gap-2 sm:gap-3.5 shrink-0">
      <!-- Network Connectivity Indicator -->
      <div 
        :class="isOnline ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#4ADE80]' : 'bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#FBBF24]'"
        class="flex items-center gap-1.5 sm:gap-2 text-[11px] font-mono font-semibold px-2.5 sm:px-3 py-1.5 rounded-full border transition-all"
      >
        <span 
          :class="isOnline ? 'bg-[#22C55E] shadow-[0_0_8px_#22C55E]' : 'bg-[#F59E0B] shadow-[0_0_8px_#F59E0B] animate-pulse'"
          class="w-2 h-2 rounded-full shrink-0"
        ></span>
        <span class="hidden sm:inline">{{ isOnline ? $t('common.online') : `${offlineCount} ${$t('common.syncPending')}` }}</span>
      </div>

      <!-- Language Selector -->
      <LanguageSwitcher />

      <!-- Authenticated User Menu -->
      <div v-if="user" class="flex items-center gap-2 sm:gap-3">
        <div class="text-right hidden md:block">
          <div class="text-xs font-display font-bold text-white">{{ user.name }}</div>
          <div class="text-[10px] text-[#22C55E] uppercase tracking-wider font-mono">
            {{ userRoleLabel(user.role) }} &bull; {{ user.id }}
          </div>
        </div>
        <button 
          @click="$emit('logout')" 
          class="geo-btn-secondary px-3.5 py-1.5 text-xs font-semibold rounded-xl min-h-[40px] flex items-center justify-center cursor-pointer"
        >
          {{ $t('common.signOut') }}
        </button>
      </div>

      <!-- Public Sign In / Register Buttons -->
      <div v-else class="flex items-center gap-2">
        <button 
          @click="$emit('open-auth', 'login')" 
          class="geo-btn-secondary px-3.5 py-1.5 text-xs font-semibold rounded-xl min-h-[40px] flex items-center justify-center cursor-pointer"
        >
          {{ $t('common.signIn') }}
        </button>
        <button 
          @click="$emit('open-auth', 'register')" 
          class="btn-green-pill px-4 py-2 text-xs font-bold rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all min-h-[40px] flex items-center justify-center cursor-pointer whitespace-nowrap"
        >
          {{ $t('common.registerFBO') }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import LanguageSwitcher from './LanguageSwitcher.vue';
import { useI18n } from '../services/i18n';

const { t } = useI18n();

defineProps({
  user: Object,
  isOnline: Boolean,
  offlineCount: Number,
});
defineEmits(['toggle-sidebar', 'logout', 'open-auth']);

function userRoleLabel(role) {
  if (role === 'admin') return t('nav.superAdmin');
  if (role === 'agent') return t('nav.fieldExecutive');
  if (role === 'seller') return t('nav.foodBusinessOperator');
  return role;
}
</script>