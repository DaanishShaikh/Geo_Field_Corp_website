<template>
  <header 
    :class="user 
      ? 'bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100' 
      : 'bg-[#FAF8F5] border-b border-[#E2DCD2] text-[#1E2820]'"
    class="h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 transition-colors duration-200"
  >
    <div class="flex items-center gap-4">
      <button 
        v-if="user"
        @click="$emit('toggle-sidebar')" 
        class="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none"
        aria-label="Toggle Navigation"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <a href="/" class="flex items-center gap-3 group">
        <div 
          :class="user 
            ? 'bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 text-white rounded-xl shadow-md shadow-emerald-950/50' 
            : 'bg-[#233127] text-[#FAF8F5] rounded-md border border-[#344439] shadow-xs'"
          class="w-9 h-9 flex items-center justify-center font-serif font-black text-lg tracking-wider transition-transform group-hover:scale-105"
        >
          G
        </div>
        <div>
          <div 
            :class="user ? 'text-white' : 'text-[#1E2820]'"
            class="text-sm font-bold tracking-tight flex items-center gap-2"
          >
            GeoField Bio-Logistics
            <span 
              :class="user 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-[#EFEAE1] text-[#2D3B32] border-[#D8D0C3]'"
              class="text-[10px] uppercase font-bold px-2 py-0.5 rounded border tracking-wider"
            >
              RUCO Certified
            </span>
          </div>
          <p :class="user ? 'text-slate-400' : 'text-[#5C645D]'" class="text-[11px]">
            National UCO Traceability & Compliance Network
          </p>
        </div>
      </a>
    </div>

    <!-- Right Header Controls -->
    <div class="flex items-center gap-3 sm:gap-4">
      <!-- Network Connectivity Indicator -->
      <div 
        :class="user
          ? (isOnline ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300' : 'bg-amber-950/50 border-amber-800/60 text-amber-300')
          : (isOnline ? 'bg-[#EFEAE1] border-[#D8D0C3] text-[#2D3B32]' : 'bg-[#FBEBE6] border-[#F2C5B5] text-[#C85A32]')"
        class="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded border transition-all"
      >
        <span 
          :class="user
            ? (isOnline ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse')
            : (isOnline ? 'bg-[#233127]' : 'bg-[#C85A32] animate-pulse')"
          class="w-2 h-2 rounded-full"
        ></span>
        <span class="hidden sm:inline">{{ isOnline ? 'Network Online' : `${offlineCount} Pending Sync` }}</span>
      </div>

      <!-- Authenticated User Menu -->
      <div v-if="user" class="flex items-center gap-3">
        <div class="text-right hidden md:block">
          <div class="text-xs font-bold text-white">{{ user.name }}</div>
          <div class="text-[10px] text-emerald-400 uppercase tracking-wider font-mono">
            {{ userRoleLabel(user.role) }} &bull; {{ user.id }}
          </div>
        </div>
        <button 
          @click="$emit('logout')" 
          class="px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-slate-600 transition shadow"
        >
          Sign Out
        </button>
      </div>

      <!-- Public Sign In / Register Buttons -->
      <div v-else class="flex items-center gap-2.5">
        <button 
          @click="$emit('open-auth', 'login')" 
          class="px-3.5 py-1.5 text-xs font-semibold text-[#2D3B32] hover:text-[#1E2820] bg-white hover:bg-[#F5F2EB] rounded-md border border-[#D8D0C3] transition shadow-2xs cursor-pointer"
        >
          Sign In
        </button>
        <button 
          @click="$emit('open-auth', 'register')" 
          class="px-4 py-1.5 text-xs font-semibold text-white bg-[#C85A32] hover:bg-[#B34E29] rounded-md border border-[#B34E29] transition shadow-xs cursor-pointer"
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
