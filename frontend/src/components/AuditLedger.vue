<template>
  <div class="rounded-2xl border border-white/10 bg-[#0A130E] p-4 sm:p-6 shadow-xl space-y-4">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div>
        <h2 class="text-base font-display font-bold text-white">Append-Only Compliance Audit Trail</h2>
        <p class="text-xs text-gray-400">Tamper-proof, timestamped, immutable system events</p>
      </div>
      <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
        {{ auditLogs.length }} Events Recorded
      </span>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs min-w-[640px]">
        <thead>
          <tr class="border-b border-white/10 text-gray-400 text-[11px] uppercase tracking-wider">
            <th class="py-3 px-3">Timestamp</th>
            <th class="py-3 px-3">Actor ID</th>
            <th class="py-3 px-3">Role</th>
            <th class="py-3 px-3">Action</th>
            <th class="py-3 px-3">Target Entity</th>
            <th class="py-3 px-3">Details / Hash</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-700/60 font-mono text-[11px]">
          <tr v-for="log in auditLogs" :key="log.id" class="hover:bg-white/[0.04] transition-colors">
            <td class="py-2.5 px-3 text-gray-400">{{ formatTime(log.timestamp) }}</td>
            <td class="py-2.5 px-3 font-display font-bold text-white">{{ log.actor_id }}</td>
            <td class="py-2.5 px-3">
              <span class="px-1.5 py-0.5 rounded bg-slate-700 text-gray-300 text-[10px] uppercase">
                {{ log.actor_role }}
              </span>
            </td>
            <td class="py-2.5 px-3 font-semibold text-emerald-400">{{ log.action }}</td>
            <td class="py-2.5 px-3 text-gray-300">{{ log.entity_type }} ({{ log.entity_id }})</td>
            <td class="py-2.5 px-3 text-gray-400 truncate max-w-xs">{{ log.details || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  auditLogs: {
    type: Array,
    default: () => []
  }
});

function formatTime(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'medium' });
}
</script>
