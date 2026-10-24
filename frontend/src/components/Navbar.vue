<template>
  <header class="h-16 bg-slate-900/95 backdrop-blur border-b border-slate-800 flex items-center justify-between px-3 sm:px-4 lg:px-8 sticky top-0 z-40">
    <div class="flex items-center gap-2.5 sm:gap-4 min-w-0">
      <button 
        v-if="user"
        @click="$emit('toggle-sidebar')" 
        class="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 cursor-pointer"
        aria-label="Toggle Navigation"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <a href="/" class="flex items-center gap-2 sm:gap-3 group min-w-0">
        <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center font-black text-white shadow-md shadow-emerald-950/50 group-hover:scale-105 transition-transform shrink-0">
          G
        </div>
        <div class="min-w-0">
          <div class="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-1.5 sm:gap-2 truncate">
            <span class="truncate">GeoField Bio-Logistics</span>
            <span class="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
              RUCO Certified
            </span>
          </div>
          <p class="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block truncate">National UCO Traceability & Compliance Network</p>
        </div>
      </a>
    </div>

    <!-- Right Header Controls -->
    <div class="flex items-center gap-2 sm:gap-4 shrink-0">
      <!-- Network Connectivity Indicator -->
      <div 
        :class="isOnline ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300' : 'bg-amber-950/50 border-amber-800/60 text-amber-300'"
        class="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full border transition-all"
      >
        <span 
          :class="isOnline ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'"
          class="w-2 h-2 rounded-full shrink-0"
        ></span>
        <span class="hidden sm:inline">{{ isOnline ? 'Network Online' : `${offlineCount} Pending Sync` }}</span>
      </div>

      <!-- Authenticated User Menu -->
      <div v-if="user" class="flex items-center gap-2 sm:gap-3">
        <div class="text-right hidden md:block">
          <div class="text-xs font-bold text-white">{{ user.name }}</div>
          <div class="text-[10px] text-emerald-400 uppercase tracking-wider font-mono">
            {{ userRoleLabel(user.role) }} &bull; {{ user.id }}
          </div>
        </div>
        <button 
          @click="$emit('logout')" 
          class="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-slate-600 transition shadow min-h-[40px] flex items-center justify-center cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      <!-- Public Sign In / Register Buttons -->
      <div v-else class="flex items-center gap-2">
        <button 
          @click="$emit('open-auth', 'login')" 
          class="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition min-h-[40px] flex items-center justify-center cursor-pointer"
        >
          Sign In
        </button>
        <button 
          @click="$emit('open-auth', 'register')" 
          class="px-3.5 sm:px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition min-h-[40px] flex items-center justify-center cursor-pointer whitespace-nowrap"
        >
          Register FBO
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  user: Object,
  isOnline: Boolean,
  offlineCount: Number,
});
defineEmits(['toggle-sidebar', 'logout', 'open-auth']);

function userRoleLabel(role) {
  if (role === 'admin') return 'Super Admin';
  if (role === 'agent') return 'Field Executive';
  if (role === 'seller') return 'Food Business Operator';
  return role;
}
</script>
