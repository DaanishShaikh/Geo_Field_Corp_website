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
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700/60 text-slate-300 border border-slate-600/50">
          {{ mapTypeLabel }}
        </span>
        <span class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          GPS Active
        </span>
      </div>
    </div>

    <!-- Map Container -->
    <div class="relative w-full h-[380px] bg-slate-950 rounded-xl overflow-hidden border border-slate-700">
      <div ref="mapContainerRef" class="w-full h-full min-h-[380px]"></div>

      <!-- Map Floating Overlay Legend -->
      <div class="absolute bottom-3 left-3 bg-slate-900/95 backdrop-blur border border-slate-700/80 rounded-xl p-3 text-xs space-y-1.5 shadow-lg max-w-xs z-[1000]">
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
          <div class="flex items-center justify-between gap-1">
            <div class="text-xs font-semibold text-white truncate">{{ stop.seller_name }}</div>
            <span 
              :class="stop.status === 'visited' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'"
              class="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded flex-shrink-0"
            >
              {{ stop.status }}
            </span>
          </div>
          <div class="text-[10px] text-slate-400 truncate">{{ stop.seller_address || 'Bengaluru' }}</div>
          <div class="mt-1.5 flex items-center justify-between gap-2 border-t border-slate-800/80 pt-1">
            <div class="text-[10px] font-mono text-emerald-400 truncate">
              {{ stop.seller_phone || '+91 99450 78120' }}
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0">
              <a 
                v-if="stop.seller_phone"
                :href="'tel:' + stop.seller_phone" 
                class="px-2 py-0.5 rounded bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[10px] font-bold transition flex items-center gap-1"
                title="Call Seller Kitchen"
              >
                <span>📞</span> Call
              </a>
              <a 
                v-if="stop.seller_email"
                :href="'mailto:' + stop.seller_email" 
                class="px-1.5 py-0.5 rounded bg-slate-700/60 hover:bg-slate-600 text-slate-300 hover:text-white text-[10px] transition"
                title="Email Seller"
              >
                ✉
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

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
const mapType = ref('google'); // 'google' or 'leaflet'
const mapTypeLabel = computed(() => mapType.value === 'google' ? 'Google Maps' : 'OpenStreetMap');

let googleMapInstance = null;
let googleMarkers = [];
let googlePolyline = null;

let leafletMapInstance = null;

onMounted(async () => {
  await nextTick();
  initMap();
});

onUnmounted(() => {
  destroyMaps();
});

watch(() => [props.stops, props.agents], () => {
  renderMarkers();
}, { deep: true });

function destroyMaps() {
  if (googleMarkers.length) {
    googleMarkers.forEach(m => m.setMap(null));
    googleMarkers = [];
  }
  if (googlePolyline) {
    googlePolyline.setMap(null);
    googlePolyline = null;
  }
  googleMapInstance = null;

  if (leafletMapInstance) {
    try {
      leafletMapInstance.remove();
    } catch (e) {}
    leafletMapInstance = null;
  }
}

function initMap() {
  if (!mapContainerRef.value) return;

  // Check if Google Maps is loaded
  if (window.google && window.google.maps) {
    initGoogleMap();
  } else if (window.L) {
    initLeafletMap();
  } else {
    // Retry in 200ms if scripts are still downloading
    setTimeout(initMap, 200);
  }
}

// 1. GOOGLE MAPS IMPLEMENTATION
function initGoogleMap() {
  mapType.value = 'google';
  destroyMaps();

  const darkStyles = [
    { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#cbd5e1' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#38bdf8' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#0f3a3a' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1e293b' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#cbd5e1' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#0f766e' }] },
    { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#091e3a' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#38bdf8' }] }
  ];

  try {
    googleMapInstance = new window.google.maps.Map(mapContainerRef.value, {
      center: { lat: 12.9716, lng: 77.5946 },
      zoom: 12,
      styles: darkStyles,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    });

    renderGoogleMarkers();
  } catch (err) {
    console.warn('Google Maps initialization fallback to Leaflet:', err);
    initLeafletMap();
  }
}

function renderGoogleMarkers() {
  if (!googleMapInstance || !window.google) return;
  const maps = window.google.maps;

  // Clear existing markers & lines
  googleMarkers.forEach(m => m.setMap(null));
  googleMarkers = [];
  if (googlePolyline) {
    googlePolyline.setMap(null);
    googlePolyline = null;
  }

  const bounds = new maps.LatLngBounds();
  const routeCoords = [];

  // 1. Stops
  if (props.stops && props.stops.length) {
    props.stops.forEach((stop, i) => {
      const lat = stop.seller_lat || (12.9352 + (i * 0.02));
      const lng = stop.seller_lng || (77.6245 - (i * 0.015));
      const pos = { lat, lng };
      bounds.extend(pos);
      routeCoords.push(pos);

      const isEnabled = stop.pickup_enabled !== false;
      const markerColor = !isEnabled ? '#64748b' : (stop.status === 'visited' ? '#10b981' : '#f59e0b');
      const marker = new maps.Marker({
        position: pos,
        map: googleMapInstance,
        title: stop.seller_name,
        label: {
          text: String(stop.stop_order || i + 1),
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '11px'
        },
        icon: {
          path: maps.SymbolPath.CIRCLE,
          scale: 13,
          fillColor: markerColor,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }
      });

      const phoneHtml = stop.seller_phone ? `<div style="margin-top:4px;"><a href="tel:${stop.seller_phone}" style="display:inline-block;padding:3px 8px;background:#059669;color:white;text-decoration:none;border-radius:4px;font-weight:bold;font-size:11px;">📞 Call: ${stop.seller_phone}</a></div>` : '';
      const prefHtml = `<div style="color:#0f766e;font-weight:bold;font-size:11px;margin-top:3px;">⏰ Pref: ${stop.pickup_preference || 'Morning (9 AM - 12 PM)'}</div>`;
      const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

      const infoWindow = new maps.InfoWindow({
        content: `
          <div style="font-family:sans-serif;font-size:12px;color:#0f172a;line-height:1.4;padding:6px;max-width:240px;">
            <strong style="font-size:13px;color:#0f172a;">Stop #${stop.stop_order}: ${stop.seller_name || 'FBO Kitchen'}</strong><br>
            <span style="color:#64748b;font-size:10px;">${stop.seller_address || 'Bengaluru'}</span><br>
            <span style="color:#64748b;font-size:10px;">FSSAI: ${stop.seller_fssai || 'Verified'}</span>
            ${prefHtml}
            <div style="margin-top:4px;display:flex;align-items:center;gap:6px;">
              <span style="display:inline-block;padding:2px 6px;border-radius:4px;background:${stop.status === 'visited' ? '#dcfce7' : '#fef3c7'};color:${stop.status === 'visited' ? '#166534' : '#92400e'};font-size:10px;font-weight:bold;">
                ${stop.status.toUpperCase()}
              </span>
              ${!isEnabled ? '<span style="display:inline-block;padding:2px 6px;border-radius:4px;background:#fee2e2;color:#991b1b;font-size:10px;font-weight:bold;">DISABLED</span>' : ''}
            </div>
            ${phoneHtml}
            <div style="margin-top:6px;">
              <a href="${navUrl}" target="_blank" style="display:block;text-align:center;padding:4px 8px;background:#0284c7;color:white;text-decoration:none;border-radius:4px;font-weight:bold;font-size:11px;">
                🧭 Navigate in Google Maps &rarr;
              </a>
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapInstance, marker);
      });

      googleMarkers.push(marker);
    });
  }

  // 2. Agents
  if (props.agents && props.agents.length) {
    props.agents.forEach((agent) => {
      const lat = agent.lat || agent.current_lat || 12.9716;
      const lng = agent.lng || agent.current_lng || 77.5946;
      const pos = { lat, lng };
      bounds.extend(pos);

      const marker = new maps.Marker({
        position: pos,
        map: googleMapInstance,
        title: `Agent: ${agent.name}`,
        label: {
          text: '🚚',
          fontSize: '14px'
        },
        icon: {
          path: maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 6,
          fillColor: '#0284c7',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }
      });

      const infoWindow = new maps.InfoWindow({
        content: `
          <div style="font-family:sans-serif;font-size:12px;color:#0f172a;padding:4px;">
            <strong>Agent: ${agent.name}</strong><br>
            <span>Vehicle: ${agent.vehicle_no || 'KA-02-EV-4412'}</span><br>
            <span style="color:#0284c7;font-weight:bold;">Zone: ${agent.zone || 'Bengaluru Central'}</span>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapInstance, marker);
      });

      googleMarkers.push(marker);
    });
  }

  // 3. Biodiesel Refinery
  const refineryPos = { lat: 12.9856, lng: 77.7289 };
  bounds.extend(refineryPos);

  const refineryMarker = new maps.Marker({
    position: refineryPos,
    map: googleMapInstance,
    title: 'Biodiesel Refinery Hub',
    label: {
      text: '🏭',
      fontSize: '14px'
    },
    icon: {
      path: maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 6,
      fillColor: '#16a34a',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 2,
    }
  });

  const refineryInfoWindow = new maps.InfoWindow({
    content: `
      <div style="font-family:sans-serif;font-size:12px;color:#0f172a;padding:4px;">
        <strong>Biodiesel Processing Partner</strong><br>
        <span>Refinery Delivery Hub</span>
      </div>
    `
  });
  refineryMarker.addListener('click', () => refineryInfoWindow.open(googleMapInstance, refineryMarker));
  googleMarkers.push(refineryMarker);

  // Route Polyline
  if (routeCoords.length > 1) {
    googlePolyline = new maps.Polyline({
      path: routeCoords,
      geodesic: true,
      strokeColor: '#0f766e',
      strokeOpacity: 0.9,
      strokeWeight: 4
    });
    googlePolyline.setMap(googleMapInstance);
  }

  if (!bounds.isEmpty()) {
    googleMapInstance.fitBounds(bounds, { top: 40, bottom: 40, left: 40, right: 40 });
  }
}

// 2. LEAFLET FALLBACK IMPLEMENTATION
function initLeafletMap() {
  mapType.value = 'leaflet';
  destroyMaps();

  const L = window.L;
  if (!L || !mapContainerRef.value) return;

  try {
    leafletMapInstance = L.map(mapContainerRef.value).setView([12.9716, 77.5946], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 19
    }).addTo(leafletMapInstance);

    renderLeafletMarkers();
  } catch (e) {
    console.warn('Leaflet fallback notice:', e);
  }
}

function renderLeafletMarkers() {
  if (!leafletMapInstance || !window.L) return;
  const L = window.L;

  leafletMapInstance.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.Polyline) {
      leafletMapInstance.removeLayer(layer);
    }
  });

  const bounds = [];

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
        .addTo(leafletMapInstance)
        .bindPopup(`<strong>Stop #${stop.stop_order}: ${stop.seller_name}</strong>`);
    });
  }

  if (bounds.length > 1) {
    L.polyline(bounds, { color: '#0f766e', weight: 3, opacity: 0.8, dashArray: '6, 8' }).addTo(leafletMapInstance);
    leafletMapInstance.fitBounds(bounds, { padding: [40, 40] });
  }
}

function renderMarkers() {
  if (mapType.value === 'google') {
    renderGoogleMarkers();
  } else {
    renderLeafletMarkers();
  }
}
</script>
