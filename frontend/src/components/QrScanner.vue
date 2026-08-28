<template>
  <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-xl">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-white">{{ title || 'RUCO QR Scanner' }}</h3>
          <p class="text-xs text-slate-400">{{ subtitle || 'Point camera at Site or Receipt QR code' }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button 
          @click="toggleCamera"
          :class="isCameraActive ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-emerald-600 text-white'"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-transparent transition"
        >
          {{ isCameraActive ? 'Stop Camera' : 'Start Camera' }}
        </button>
      </div>
    </div>

    <!-- Scanner Video Region -->
    <div class="relative bg-slate-950 rounded-xl overflow-hidden min-h-[220px] flex flex-col items-center justify-center border border-slate-700">
      <div id="qr-reader-viewport" class="w-full max-w-sm"></div>
      
      <div v-if="!isCameraActive" class="p-6 text-center text-slate-400 space-y-2">
        <svg class="w-12 h-12 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <p class="text-xs">Camera is offline. Click "Start Camera" or select from fast presets below.</p>
      </div>
    </div>

    <!-- Quick Scan Simulation Picker for Field Testing -->
    <div class="mt-4 pt-4 border-t border-slate-700/60 space-y-2">
      <label class="text-xs font-medium text-slate-300 block">Instant QR Selector / Testing Preset:</label>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="preset in presets" 
          :key="preset.code"
          @click="onScanSuccess(preset.code)"
          class="px-2.5 py-1 text-xs rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600/50 transition flex items-center gap-1.5"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          {{ preset.label }}
        </button>
      </div>

      <!-- Manual Input fallback -->
      <form @submit.prevent="onManualSubmit" class="flex gap-2 mt-2">
        <input 
          v-model="manualCode" 
          type="text" 
          placeholder="Or paste QR payload (e.g. RUCO-SITE-GEO-9082)" 
          class="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <button 
          type="submit" 
          class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition"
        >
          Scan
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';

const props = defineProps({
  title: String,
  subtitle: String,
  presets: {
    type: Array,
    default: () => [
      { label: 'Royal Palace Site QR', code: 'RUCO-SITE-GEO-9082' },
      { label: 'Lotus Canteen Site QR', code: 'RUCO-SITE-SELL-1002' },
      { label: 'Active Receipt RCT-9083', code: 'RUCO-RCT-9083-LIVE' },
      { label: 'Settled Receipt RCT-9082', code: 'RUCO-RCT-9082-SAMPLE' },
    ]
  }
});

const emit = defineEmits(['scanned']);

const isCameraActive = ref(false);
const manualCode = ref('');
let html5QrCode = null;

async function toggleCamera() {
  if (isCameraActive.value) {
    stopCamera();
  } else {
    startCamera();
  }
}

async function startCamera() {
  try {
    html5QrCode = new Html5Qrcode("qr-reader-viewport");
    isCameraActive.value = true;
    
    await html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 220, height: 220 }
      },
      (decodedText) => {
        onScanSuccess(decodedText);
      },
      (errorMessage) => {
        // scan frame error ignored
      }
    );
  } catch (err) {
    console.error("Camera start failed:", err);
    isCameraActive.value = false;
  }
}

async function stopCamera() {
  if (html5QrCode && isCameraActive.value) {
    try {
      await html5QrCode.stop();
      html5QrCode.clear();
    } catch (e) {
      console.warn("Camera stop error", e);
    }
    isCameraActive.value = false;
  }
}

function onScanSuccess(decodedText) {
  emit('scanned', decodedText);
  if (isCameraActive.value) {
    stopCamera();
  }
}

function onManualSubmit() {
  if (manualCode.value.trim()) {
    onScanSuccess(manualCode.value.trim());
    manualCode.value = '';
  }
}

onBeforeUnmount(() => {
  stopCamera();
});
</script>
