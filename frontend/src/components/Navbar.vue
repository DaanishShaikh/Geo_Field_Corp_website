<template>
  <header 
    :class="user 
      ? 'bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100' 
      : 'bg-[#FAFAFA]/90 backdrop-blur-md border-b border-black/[0.06] text-[#0A0A0A]'"
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

      <a href="/" class="flex items-center gap-3.5 group">
        <div class="w-9 h-9 rounded-lg bg-[#0A0A0A] flex items-center justify-center font-black text-[#49C5B6] text-base shadow-sm transition-transform duration-200 group-hover:scale-105">
          G
        </div>
        <div>
          <div class="text-sm font-extrabold tracking-tight text-[#0A0A0A] flex items-center gap-2">
            GeoField Bio-Logistics
            <span class="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-[#49C5B6]/15 text-[#0A0A0A] border border-[#49C5B6]/30 tracking-wider flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-[#49C5B6]"></span>
              RUCO Certified
            </span>
          </div>
          <p class="text-[11px] text-zinc-500 font-mono tracking-tight">
            National UCO Traceability & Clean Bio-Energy Network
          </p>
        </div>
      </a>
    </div>

    <!-- Right Header Controls -->
    <div class="flex items-center gap-3 sm:gap-4">
      <!-- Network Connectivity Indicator -->
      <div 
        :class="isOnline ? 'bg-black/[0.04] border-black/10 text-[#0A0A0A]' : 'bg-[#49C5B6]/10 border-[#49C5B6]/30 text-[#0A0A0A]'"
        class="flex items-center gap-2 text-xs font-mono font-medium px-3 py-1.5 rounded-full border transition-all"
      >
        <span 
          :class="isOnline ? 'bg-[#49C5B6]' : 'bg-[#49C5B6] animate-pulse'"
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
          class="px-4 py-2 text-xs font-bold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FAFAFA] rounded-lg border border-black/15 transition-all duration-200 cursor-pointer"
        >
          Sign In
        </button>
        <button 
          @click="$emit('open-auth', 'register')" 
          class="px-4 py-2 text-xs font-bold text-[#0A0A0A] bg-[#49C5B6] hover:bg-[#3db0a2] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
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
