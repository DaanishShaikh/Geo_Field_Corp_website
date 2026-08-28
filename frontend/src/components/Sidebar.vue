<template>
  <aside 
    :class="[
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      'fixed lg:static top-16 bottom-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-30 transition-transform duration-200 ease-in-out flex flex-col justify-between p-4'
    ]"
  >
    <div class="space-y-6">
      <!-- Active User Card -->
      <div v-if="user" class="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
            {{ roleBadge(user.role) }}
          </span>
          <span 
            :class="user.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'"
            class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border"
          >
            {{ user.status }}
          </span>
        </div>
        <div class="text-xs font-bold text-white truncate">{{ user.name }}</div>
        <div class="text-[10px] text-slate-400 truncate">{{ user.email }}</div>
        <div v-if="user.seller_profile" class="text-[10px] text-slate-400 font-mono pt-1">
          FSSAI: {{ user.seller_profile.fssai_license_no }}
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="space-y-1">
        <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
          Management
        </div>
        <nav class="space-y-1">
          <button 
            @click="navigate('dashboard')" 
            :class="currentView === 'dashboard' ? 'bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
            class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Dashboard
          </button>

          <button 
            @click="navigate('receipts')" 
            :class="currentView === 'receipts' ? 'bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
            class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Receipt Ledger & Certs
          </button>

          <button 
            v-if="user?.role === 'agent' || user?.role === 'admin'"
            @click="navigate('logistics')" 
            :class="currentView === 'logistics' ? 'bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
            class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
            </svg>
            {{ user?.role === 'admin' ? 'Fleet GPS & Dynamic Routing' : 'Daily Collection Manifest' }}
          </button>

          <button 
            v-if="user?.role === 'admin'"
            @click="navigate('audit')" 
            :class="currentView === 'audit' ? 'bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
            class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Append-Only Audit Trail
          </button>
        </nav>
      </div>

      <!-- Regulatory Notice & Compliance Standard -->
      <div class="p-3.5 bg-emerald-950/30 rounded-2xl border border-emerald-900/40 text-[11px] text-slate-300 space-y-1.5">
        <div class="font-bold text-emerald-400 flex items-center gap-1.5">
          <span>🛡️</span> FSSAI RUCO Compliant
        </div>
        <p class="text-[10px] text-slate-400 leading-relaxed">
          Every collection is logged with quality parameters (TPC %) and tamper-evident SHA-256 integrity verification.
        </p>
      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
      <span>GeoField Corp</span>
      <span class="font-mono text-emerald-400 font-bold">RUCO v2.0</span>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  user: Object,
  currentView: String,
  isOpen: Boolean,
});

const emit = defineEmits(['navigate']);

function navigate(view) {
  emit('navigate', view);
}

function roleBadge(role) {
  if (role === 'admin') return 'Super Admin';
  if (role === 'agent') return 'Field Agent';
  if (role === 'seller') return 'FBO Partner';
  return role;
}
</script>
