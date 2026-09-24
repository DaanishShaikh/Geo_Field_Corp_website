<template>
  <header 
    :class="user 
      ? 'bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100' 
      : 'bg-[#F4F1E6]/95 backdrop-blur-md border-b border-[#668A68]/30 text-[#243027]'"
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
        <div class="w-9 h-9 rounded-xl bg-[#31543B] flex items-center justify-center font-black text-[#F4F1E6] text-base shadow-md transition-transform group-hover:scale-105">
          G
        </div>
        <div>
          <div class="text-sm font-bold tracking-tight text-[#243027] flex items-center gap-2">
            GeoField Bio-Logistics
            <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#668A68]/15 text-[#31543B] border border-[#668A68]/30 tracking-wider">
              🌿 RUCO Certified
            </span>
          </div>
          <p class="text-[11px] text-[#668A68]">
            National UCO Traceability & Clean Bio-Energy Network
          </p>
        </div>
      </a>
    </div>

    <!-- Right Header Controls -->
    <div class="flex items-center gap-3 sm:gap-4">
      <!-- Network Connectivity Indicator -->
      <div 
        :class="isOnline ? 'bg-[#668A68]/10 border-[#668A68]/30 text-[#31543B]' : 'bg-[#D29A5A]/15 border-[#D29A5A]/40 text-[#243027]'"
        class="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-all"
      >
        <span 
          :class="isOnline ? 'bg-[#31543B]' : 'bg-[#D29A5A] animate-pulse'"
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
          class="px-3.5 py-1.5 text-xs font-semibold text-[#31543B] hover:text-[#243027] bg-[#F4F1E6] hover:bg-[#EAE6D8] rounded-xl border border-[#668A68]/40 transition shadow-xs cursor-pointer"
        >
          Sign In
        </button>
        <button 
          @click="$emit('open-auth', 'register')" 
          class="px-4 py-1.5 text-xs font-bold text-[#F4F1E6] bg-[#31543B] hover:bg-[#243027] rounded-xl shadow-lg transition cursor-pointer"
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
