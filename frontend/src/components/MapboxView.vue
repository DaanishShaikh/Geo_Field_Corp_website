<template>
  <div class="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 shadow-xl space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-white">{{ title || 'Live Logistics & Fleet Map' }}</h3>
          <p class="text-xs text-slate-400">{{ subtitle || 'Real-time GPS tracking & optimized collection route' }}</p>
        </div>
      </div>
      <span class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        GPS Active
      </span>
    </div>

    <!-- Map Container -->
    <div class="relative w-full h-[380px] bg-slate-950 rounded-xl overflow-hidden border border-slate-700">
      <div ref="mapContainerRef" class="w-full h-full min-h-[380px]"></div>

      <!-- Map Floating Overlay Legend -->
      <div class="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur border border-slate-700/80 rounded-xl p-3 text-xs space-y-1.5 shadow-lg max-w-xs z-[1000]">
        <div class="font-bold text-white text-[11px] uppercase tracking-wider mb-1">Route Legend</div>
        <div class="flex items-center gap-2 text-slate-300">
          <span class="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
          <span>Verified FBO Seller Stop</span>
        </div>
        <div class="flex items-center gap-2 text-slate-300">
          <span class="w-3 h-3 rounded-full bg-cyan-400 border border-white"></span>
          <span>Active Agent Vehicle (EV)</span>
        </div>
        <div class="flex items-center gap-2 text-slate-300">
          <span class="w-3 h-3 rounded-full bg-amber-500 border border-white"></span>
          <span>Biodiesel Conversion Refinery</span>
        </div>
      </div>
    </div>

    <!-- Stop Manifest List -->
    <div v-if="stops && stops.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
      <div 
        v-for="stop in stops" 
        :key="stop.id || stop.seller_id"
        :class="stop.status === 'visited' ? 'bg-emerald-950/30 border-emerald-800/40' : 'bg-slate-900/60 border-slate-700/60'"
        class="p-3 rounded-xl border flex items-start gap-3 transition"
      >
        <div 
          :class="stop.status === 'visited' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'"
          class="w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0"
        >
          {{ stop.stop_order }}
        </div>
        <div class="min-w-0 flex-1">
          <div class="text-xs font-semibold text-white truncate">{{ stop.seller_name }}</div>
          <div class="text-[10px] text-slate-400 truncate">{{ stop.seller_address || 'Bengaluru' }}</div>
          <div class="mt-1 flex items-center justify-between">
            <span class="text-[9px] font-mono text-slate-400">{{ stop.seller_fssai }}</span>
            <span 
              :class="stop.status === 'visited' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'"
              class="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded"
            >
              {{ stop.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps({
  title: String,
  subtitle: String,
  stops: {
    type: Array,
    default: () => []
  },
  agents: {
    type: Array,
    default: () => []
  }
});

const mapContainerRef = ref(null);
let mapInstance = null;

onMounted(async () => {
  await nextTick();
  initMap();
});

onUnmounted(() => {
  destroyMap();
});

watch(() => [props.stops, props.agents], () => {
  renderMarkers();
}, { deep: true });

function destroyMap() {
  if (mapInstance) {
    try {
      mapInstance.remove();
    } catch (e) {
      // ignore teardown errors
    }
    mapInstance = null;
  }
}

function initMap() {
  if (!mapContainerRef.value) return;
  
  const L = window.L;
  if (!L) {
    // Retry after 200ms if script is still loading
    setTimeout(initMap, 200);
    return;
  }

  destroyMap();

  try {
    mapInstance = L.map(mapContainerRef.value).setView([12.9716, 77.5946], 12);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 19
    }).addTo(mapInstance);

    renderMarkers();
  } catch (e) {
    console.warn('Map initialization notice:', e);
  }
}

function renderMarkers() {
  if (!mapInstance || !window.L) return;
  const L = window.L;

  try {
    // Clear existing markers
    mapInstance.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapInstance.removeLayer(layer);
      }
    });

    const bounds = [];

    // 1. Plot Stops
    if (props.stops && props.stops.length) {
      props.stops.forEach((stop, i) => {
        const lat = stop.seller_lat || (12.9352 + (i * 0.02));
        const lng = stop.seller_lng || (77.6245 - (i * 0.015));
        bounds.push([lat, lng]);

        const markerColor = stop.status === 'visited' ? '#10b981' : '#f59e0b';
        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color:${markerColor};width:24px;height:24px;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:11px;box-shadow:0 2px 5px rgba(0,0,0,0.4);">${stop.stop_order || i + 1}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        L.marker([lat, lng], { icon: customIcon })
          .addTo(mapInstance)
          .bindPopup(`
            <div style="font-family:sans-serif;font-size:12px;color:#0f172a;line-height:1.4;">
              <strong>Stop #${stop.stop_order}: ${stop.seller_name || 'FBO Kitchen'}</strong><br>
              <span style="color:#64748b;font-size:10px;">FSSAI: ${stop.seller_fssai || 'Verified'}</span><br>
              <span style="display:inline-block;margin-top:4px;padding:2px 6px;border-radius:4px;background:#e2e8f0;font-size:10px;font-weight:bold;">Status: ${stop.status}</span>
            </div>
          `);
      });
    }

    // 2. Plot Agents
    if (props.agents && props.agents.length) {
      props.agents.forEach((agent) => {
        const lat = agent.lat || agent.current_lat || 12.9716;
        const lng = agent.lng || agent.current_lng || 77.5946;
        bounds.push([lat, lng]);

        const agentIcon = L.divIcon({
          className: 'agent-div-icon',
          html: `<div style="background-color:#0284c7;width:28px;height:28px;border-radius:8px;border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;box-shadow:0 3px 8px rgba(0,0,0,0.5);">🚚</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        L.marker([lat, lng], { icon: agentIcon })
          .addTo(mapInstance)
          .bindPopup(`
            <div style="font-family:sans-serif;font-size:12px;color:#0f172a;">
              <strong>Agent: ${agent.name}</strong><br>
              <span>Vehicle: ${agent.vehicle_no || 'KA-02-EV-4412'}</span><br>
              <span style="color:#0284c7;font-weight:bold;">Zone: ${agent.zone || 'Bengaluru Central'}</span>
            </div>
          `);
      });
    }

    // 3. Plot Biodiesel Refinery Destination
    const refineryLat = 12.9856;
    const refineryLng = 77.7289;
    bounds.push([refineryLat, refineryLng]);

    const refineryIcon = L.divIcon({
      className: 'refinery-div-icon',
      html: `<div style="background-color:#16a34a;width:28px;height:28px;border-radius:8px;border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;box-shadow:0 3px 8px rgba(0,0,0,0.5);">🏭</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    L.marker([refineryLat, refineryLng], { icon: refineryIcon })
      .addTo(mapInstance)
      .bindPopup(`
        <div style="font-family:sans-serif;font-size:12px;color:#0f172a;">
          <strong>Biodiesel Processing Partner</strong><br>
          <span>Refinery Delivery Hub</span>
        </div>
      `);

    if (bounds.length > 1) {
      L.polyline(bounds, { color: '#0f766e', weight: 3, opacity: 0.8, dashArray: '6, 8' }).addTo(mapInstance);
      mapInstance.fitBounds(bounds, { padding: [40, 40] });
    }
  } catch (err) {
    console.warn('Marker render notice:', err);
  }
}
</script>
