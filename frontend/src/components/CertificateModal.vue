<template>
  <div 
    class="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-[#22C55E]/40 text-slate-900 my-4 sm:my-8 max-h-[92dvh] overflow-y-auto">
      <!-- Modal Top Title Bar -->
      <div class="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 gap-2">
        <div class="flex items-center gap-3">
          <img src="/brand/geofield-full-logo.png" alt="GeoField Corp" class="h-6 sm:h-7 w-auto" />
        </div>
        <div class="text-right">
          <div class="flex items-center justify-end gap-2">
            <h2 class="text-sm sm:text-base font-bold text-slate-800">FSSAI RUCO Certificate</h2>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
              Verified
            </span>
          </div>
          <p class="text-[11px] sm:text-xs text-gray-400 mt-0.5">Repurpose Used Cooking Oil (RUCO) Initiative</p>
        </div>
      </div>

      <!-- Printable Certificate Container -->
      <div id="print-area" class="printable-certificate mt-4 sm:mt-5 border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-7 bg-white shadow-xs space-y-4 sm:space-y-6">
        <!-- Certificate Header Row -->
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <img src="/brand/logo-icon.svg" alt="" class="w-6 h-6 shrink-0" />
              <span class="font-display font-extrabold text-slate-900 text-base">GeoField Corp</span>
            </div>
            <p class="text-[11px] text-gray-500 mt-0.5">Authorized UCO Bio-Aggregator Partner</p>
          </div>

          <div class="text-right">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold uppercase tracking-wide">
              <span>🏅</span>
              <span>RUCO Compliant</span>
            </div>
            <p class="font-mono text-[11px] text-gray-500 mt-1">Ref: {{ certificateRef }}</p>
          </div>
        </div>

        <!-- Certificate Title & Statement -->
        <div class="text-center pt-2 pb-1">
          <h3 class="font-display font-extrabold text-emerald-800 text-lg sm:text-xl uppercase tracking-wider">
            Certificate of Responsible Disposal
          </h3>
          <p class="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-1 leading-relaxed">
            This document certifies that Used Cooking Oil was legally collected for Biofuel conversion in compliance with FSSAI regulations.
          </p>
        </div>

        <!-- FBO & License Section Box -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Food Business Operator (FBO)
            </span>
            <div class="flex items-center gap-2">
              <span class="text-base shrink-0">🏢</span>
              <h4 class="font-bold text-slate-900 text-sm sm:text-base">
                {{ receipt.seller_name || 'Royal Palace Kitchen & Bistro' }}
              </h4>
            </div>
            <p class="text-xs font-mono text-emerald-700 mt-1">
              Unique Partner ID: {{ partnerId }}
            </p>
          </div>

          <div class="sm:text-right">
            <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              FSSAI License No.
            </span>
            <div class="font-mono font-bold text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg inline-block text-xs sm:text-sm shadow-xs">
              {{ receipt.seller_fssai || '10020011003456' }}
            </div>
          </div>
        </div>

        <!-- 3 Metrics Boxes Row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <!-- Volume Handled -->
          <div class="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
            <div class="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <span class="text-amber-500">💧</span>
              <span>Volume Handled</span>
            </div>
            <div class="text-base sm:text-lg font-black text-slate-900">
              {{ volume }} Liters
            </div>
          </div>

          <!-- Pickup Date -->
          <div class="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
            <div class="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <span class="text-blue-500">📅</span>
              <span>Pickup Date</span>
            </div>
            <div class="text-base sm:text-lg font-black text-slate-900">
              {{ formattedDate }}
            </div>
          </div>

          <!-- Payout Settled -->
          <div class="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
            <div class="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <span class="text-emerald-500">✨</span>
              <span>Payout Settled</span>
            </div>
            <div class="text-base sm:text-lg font-black text-emerald-600">
              ₹{{ formattedPayout }}
            </div>
          </div>
        </div>

        <!-- Environmental Impact & ESG Offset Section -->
        <div class="rounded-xl border border-emerald-300 bg-gradient-to-r from-emerald-50/90 to-teal-50/90 p-3.5 sm:p-4 space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <span>🌱</span> Environmental ESG Offset & Sustainability
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-600/10 text-emerald-800 font-bold border border-emerald-300">
              Verified Green Offset
            </span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div class="bg-white/90 rounded-xl p-3 border border-emerald-200/90 shadow-2xs flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-base shrink-0 font-bold">
                🌱
              </div>
              <div class="min-w-0">
                <span class="text-[10px] uppercase font-bold text-gray-500 block">Carbon Dioxide (CO₂) Offset</span>
                <span class="text-base sm:text-lg font-black text-emerald-700 font-mono block leading-tight">{{ co2OffsetFormatted }}</span>
                <span class="text-[10px] text-gray-500 block truncate">Displaced vs fossil petroleum diesel</span>
              </div>
            </div>
            <div class="bg-white/90 rounded-xl p-3 border border-cyan-200/90 shadow-2xs flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center text-base shrink-0 font-bold">
                💧
              </div>
              <div class="min-w-0">
                <span class="text-[10px] uppercase font-bold text-gray-500 block">Clean Water Shielded</span>
                <span class="text-base sm:text-lg font-black text-cyan-700 font-mono block leading-tight">{{ waterOffsetFormatted }} Liters</span>
                <span class="text-[10px] text-gray-500 block truncate">Protected from toxic oil drainage</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Collector Row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-700 py-2.5 border-y border-slate-100 gap-2">
          <div>
            <span>Collector: </span>
            <strong class="text-slate-900">{{ receipt.agent_name || 'Rajesh Kumar' }} (GeoField Bio-Logistics)</strong>
          </div>
          <div class="font-mono text-[11px] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200 w-fit">
            {{ receipt.vehicle_no || receipt.vehicle || 'MH-02-EV-4412' }}
          </div>
        </div>

        <!-- Signatory & Verification Footer -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div class="space-y-0.5">
            <div class="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <span class="text-emerald-600">🛡️</span>
              <span>Government RUCO Traceable</span>
            </div>
            <p class="text-[11px] text-gray-500">Chain of custody verified by GeoField Corp</p>
            <p class="text-[11px] font-mono text-gray-400">support@geofieldcorp.com</p>
          </div>

          <div class="sm:text-right space-y-0.5">
            <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Authorized Signatory</p>
            <p class="font-serif font-bold text-slate-900 text-sm tracking-wide">GeoField Compliance Dept.</p>
            <p class="text-[11px] font-mono text-gray-400">office@geofieldcorp.com</p>
          </div>
        </div>
      </div>

      <!-- Modal Footer Buttons (Hidden on Print) -->
      <div class="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-100 no-print">
        <button
          @click="$emit('close')"
          class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition cursor-pointer min-h-[44px] text-center"
        >
          Close
        </button>
        <button
          @click="handlePrint"
          class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
        >
          <span>🖨️</span>
          <span>Download & Print Certificate</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  receipt: {
    type: Object,
    required: true,
  },
});

defineEmits(['close']);

const certificateRef = computed(() => {
  const r = props.receipt;
  if (r.certificate_id && r.certificate_id.startsWith('RUCO-')) {
    return r.certificate_id;
  }
  const cleanId = String(r.id || '0891').replace(/^RCP-/, '');
  return `RUCO-GEO-2025-${cleanId}`;
});

const partnerId = computed(() => {
  const r = props.receipt;
  if (r.seller_id) {
    const s = String(r.seller_id).replace(/[^a-zA-Z0-9]/g, '');
    return `GEO-${s.slice(-4).toUpperCase()}`;
  }
  return 'GEO-9082';
});

const formattedDate = computed(() => {
  const dateStr = props.receipt.settled_at || props.receipt.created_at;
  if (!dateStr) return '12 May 2025';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return '12 May 2025';
  }
});

const volume = computed(() => {
  const r = props.receipt;
  return Number(r.settled_volume || r.measured_volume || r.requested_volume || 320);
});

const co2OffsetKg = computed(() => {
  if (props.receipt.co2_offset_kg != null) return Number(props.receipt.co2_offset_kg);
  return Number((volume.value * 2.8).toFixed(1));
});

const co2OffsetFormatted = computed(() => {
  const kg = co2OffsetKg.value;
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(2)} Tons CO₂`;
  }
  return `${kg.toLocaleString('en-IN')} kg CO₂`;
});

const waterOffsetLiters = computed(() => {
  if (props.receipt.water_offset_liters != null) return Number(props.receipt.water_offset_liters);
  return Math.round(volume.value * 1000);
});

const waterOffsetFormatted = computed(() => {
  return waterOffsetLiters.value.toLocaleString('en-IN');
});

const formattedPayout = computed(() => {
  const r = props.receipt;
  const amount = Number(r.total_amount || (volume.value * 55));
  return amount.toLocaleString('en-IN');
});

function handlePrint() {
  const printContent = document.getElementById('print-area');
  if (!printContent) {
    window.print();
    return;
  }

  const printWindow = window.open('', '_blank', 'width=800,height=900');
  if (!printWindow) {
    window.print();
    return;
  }

  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>GeoField Corp | UCO Bio-Recycling & RUCO Aggregator</title>
        <meta charset="utf-8" />
        <base href="${window.location.origin}/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
        <style>
          @page { size: A4 portrait; margin: 20mm; }
          * { box-sizing: border-box; }
          body {
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 30px;
            background: #ffffff;
            color: #0f172a;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .certificate-wrapper {
            max-width: 680px;
            margin: 0 auto;
            border: 1px solid #cbd5e1;
            border-radius: 20px;
            padding: 32px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          .top-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
          .logo-group { display: flex; align-items: center; gap: 8px; }
          .logo-text { font-size: 18px; font-weight: 800; color: #0f172a; }
          .subtext { font-size: 11px; color: #64748b; margin-top: 2px; }
          .badge-compliant {
            display: inline-block;
            background: #fffbeb;
            border: 1px solid #fde68a;
            color: #b45309;
            padding: 4px 14px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .ref-text { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #64748b; margin-top: 4px; text-align: right; }
          .title-area { text-align: center; margin: 20px 0 24px 0; }
          .cert-title { font-size: 19px; font-weight: 800; color: #065f46; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; }
          .cert-desc { font-size: 12px; color: #475569; max-width: 500px; margin: 6px auto 0 auto; line-height: 1.5; }
          .fbo-box {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 16px;
          }
          .field-label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 4px; }
          .fbo-name { font-size: 15px; font-weight: 800; color: #0f172a; margin: 0; }
          .partner-id { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #047857; margin-top: 4px; }
          .license-badge {
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            font-weight: 700;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            padding: 4px 10px;
            border-radius: 8px;
            display: inline-block;
          }
          .metrics-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 12px;
            margin-bottom: 16px;
          }
          .metric-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 12px 14px;
          }
          .metric-label { font-size: 11px; color: #64748b; margin-bottom: 4px; }
          .metric-value { font-size: 16px; font-weight: 800; color: #0f172a; }
          .metric-payout { color: #059669; }
          .collector-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-top: 1px solid #f1f5f9;
            border-bottom: 1px solid #f1f5f9;
            font-size: 12px;
            margin-bottom: 16px;
          }
          .vehicle-tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; background: #f1f5f9; border: 1px solid #e2e8f0; padding: 2px 8px; border-radius: 6px; }
          .esg-box {
            background: #ecfdf5;
            border: 1px solid #a7f3d0;
            border-radius: 12px;
            padding: 12px 14px;
            margin-bottom: 16px;
          }
          .esg-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10px;
            font-weight: 700;
            color: #065f46;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .esg-badge {
            background: #d1fae5;
            border: 1px solid #6ee7b7;
            color: #047857;
            padding: 2px 8px;
            border-radius: 9999px;
            font-size: 9px;
            font-weight: 700;
          }
          .esg-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .esg-card {
            background: #ffffff;
            border: 1px solid #d1fae5;
            border-radius: 8px;
            padding: 8px 12px;
          }
          .esg-label { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 2px; }
          .esg-val { font-size: 14px; font-weight: 800; font-family: 'JetBrains Mono', monospace; }
          .esg-val.green { color: #047857; }
          .esg-val.blue { color: #0284c7; }
          .esg-sub { font-size: 9px; color: #64748b; margin-top: 2px; }
          .footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            padding-top: 8px;
          }
          .gov-text { font-size: 12px; font-weight: 700; color: #0f172a; }
          .foot-sub { font-size: 10px; color: #64748b; margin-top: 2px; }
          .foot-email { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #94a3b8; }
          .sign-area { text-align: right; }
          .sign-title { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; }
          .sign-dept { font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 2px; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="certificate-wrapper">
          <div class="top-row">
            <div>
              <div class="logo-group">
                <img src="/brand/logo-icon.svg" alt="GeoField Corp" style="width: 24px; height: 24px; object-fit: contain;" />
                <span class="logo-text">GeoField Corp</span>
              </div>
              <div class="subtext">Authorized UCO Bio-Aggregator Partner</div>
            </div>
            <div>
              <div class="badge-compliant">🎖️ RUCO Compliant</div>
              <div class="ref-text">Ref: ${certificateRef.value}</div>
            </div>
          </div>

          <div class="title-area">
            <h1 class="cert-title">Certificate of Responsible Disposal</h1>
            <p class="cert-desc">This document certifies that Used Cooking Oil was legally collected for Biofuel conversion in compliance with FSSAI regulations.</p>
          </div>

          <div class="fbo-box">
            <div>
              <div class="field-label">Food Business Operator (FBO)</div>
              <div class="fbo-name">🏢 ${props.receipt.seller_name || 'Royal Palace Kitchen & Bistro'}</div>
              <div class="partner-id">Unique Partner ID: ${partnerId.value}</div>
            </div>
            <div style="text-align: right;">
              <div class="field-label">FSSAI License No.</div>
              <div class="license-badge">${props.receipt.seller_fssai || '10020011003456'}</div>
            </div>
          </div>

          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-label">💧 Volume Handled</div>
              <div class="metric-value">${props.receipt.settled_volume || props.receipt.requested_volume || 320} Liters</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">📅 Pickup Date</div>
              <div class="metric-value">${formattedDate.value}</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">✨ Payout Settled</div>
              <div class="metric-value metric-payout">₹${formattedPayout.value}</div>
            </div>
          </div>

          <div class="esg-box">
            <div class="esg-header">
              <span>🌱 ENVIRONMENTAL ESG IMPACT & OFFSET</span>
              <span class="esg-badge">VERIFIED GREEN OFFSET</span>
            </div>
            <div class="esg-grid">
              <div class="esg-card">
                <div class="esg-label">Carbon Dioxide (CO₂) Offset</div>
                <div class="esg-val green">${co2OffsetFormatted.value}</div>
                <div class="esg-sub">Emissions displaced vs fossil petroleum diesel</div>
              </div>
              <div class="esg-card">
                <div class="esg-label">Clean Water Shielded</div>
                <div class="esg-val blue">${waterOffsetFormatted.value} Liters</div>
                <div class="esg-sub">Protected from toxic oil drainage & contamination</div>
              </div>
            </div>
          </div>

          <div class="collector-row">
            <div>Collector: <b>${props.receipt.agent_name || 'Rajesh Kumar'} (GeoField Bio-Logistics)</b></div>
            <div class="vehicle-tag">${props.receipt.vehicle_no || props.receipt.vehicle || 'MH-02-EV-4412'}</div>
          </div>

          <div class="footer-grid">
            <div>
              <div class="gov-text">🛡️ Government RUCO Traceable</div>
              <div class="foot-sub">Chain of custody verified by GeoField Corp</div>
              <div class="foot-email">support@geofieldcorp.com</div>
            </div>
            <div class="sign-area">
              <div class="sign-title">Authorized Signatory</div>
              <div class="sign-dept">GeoField Compliance Dept.</div>
              <div class="foot-email">office@geofieldcorp.com</div>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        <\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
