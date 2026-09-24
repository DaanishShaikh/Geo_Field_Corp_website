<template>
  <div ref="containerRef" class="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center select-none">
    <!-- Three.js Canvas Container -->
    <canvas ref="canvasRef" class="w-full h-full cursor-grab active:cursor-grabbing"></canvas>

    <!-- Floating HUD Overlay Brackets & Leader Lines -->
    <div class="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-6 text-xs font-mono">
      <!-- Top Target Reticle -->
      <div class="flex items-center justify-between opacity-70">
        <span class="text-[10px] tracking-[0.2em] text-[#49C5B6] uppercase flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#49C5B6] animate-ping"></span>
          SCAN FREQ // 2.45 GHz
        </span>
        <span class="text-[10px] tracking-widest text-zinc-500">
          [ 3D TOMOGRAPHY ]
        </span>
      </div>

      <!-- Mid Callout Crosshair -->
      <div class="flex items-center justify-between">
        <div class="hidden sm:flex items-center gap-2 text-[10px] tracking-wider text-zinc-400 bg-black/60 px-2.5 py-1 rounded border border-white/10 backdrop-blur-md">
          <span class="text-[#49C5B6]">&bull;</span>
          <span>λ = 532nm OPTICAL LASER</span>
        </div>
        <div class="text-[10px] tracking-wider text-zinc-400 bg-black/60 px-2.5 py-1 rounded border border-white/10 backdrop-blur-md">
          <span class="text-[#49C5B6]">ROT:</span>
          <span>{{ Math.round(rotationAngle) }}°</span>
        </div>
      </div>

      <!-- Bottom Alignment Markers -->
      <div class="flex items-center justify-between text-[10px] text-zinc-500 tracking-widest border-t border-white/[0.08] pt-2">
        <span>VESSEL // 250L TITANIUM-BORO</span>
        <span class="text-[#49C5B6]">CLOSED-LOOP OK</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps({
  tierIndex: {
    type: Number,
    default: 0
  }
});

const containerRef = ref(null);
const canvasRef = ref(null);
const rotationAngle = ref(0);

// Three.js State
let scene, camera, renderer;
let reactorGroup;
let liquidMesh, liquidMaterial;
let coreMesh, coreMaterial;
let bubbles = [];
let scanRings = [];
let animationId = null;

// Target colors per tier:
// Grade A: Luminous Mint-Teal
// Grade B: Turquoise Emerald
// Sludge: Dense Charcoal/Carbon
const tierColorConfigs = [
  {
    liquid: new THREE.Color('#49C5B6'),
    liquidEmissive: new THREE.Color('#134842'),
    core: new THREE.Color('#49C5B6'),
    coreEmissive: new THREE.Color('#2C7A70'),
    liquidHeight: 2.4,
    opacity: 0.92
  },
  {
    liquid: new THREE.Color('#2A857A'),
    liquidEmissive: new THREE.Color('#0F322E'),
    core: new THREE.Color('#389F93'),
    coreEmissive: new THREE.Color('#15423D'),
    liquidHeight: 2.1,
    opacity: 0.90
  },
  {
    liquid: new THREE.Color('#282828'),
    liquidEmissive: new THREE.Color('#111111'),
    core: new THREE.Color('#444444'),
    coreEmissive: new THREE.Color('#181818'),
    liquidHeight: 1.7,
    opacity: 0.96
  }
];

let targetConfig = tierColorConfigs[props.tierIndex];

watch(() => props.tierIndex, (newIdx) => {
  if (tierColorConfigs[newIdx]) {
    targetConfig = tierColorConfigs[newIdx];
  }
});

// Interactive Mouse Drag / Tilt
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotationX = 0.1;
let targetRotationY = 0.3;
let currentRotationX = 0.1;
let currentRotationY = 0.3;

function onMouseDown(e) {
  isDragging = true;
  previousMousePosition = { x: e.clientX, y: e.clientY };
}

function onMouseMove(e) {
  if (isDragging) {
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    targetRotationY += deltaX * 0.008;
    targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX + deltaY * 0.008));
    previousMousePosition = { x: e.clientX, y: e.clientY };
  } else if (containerRef.value) {
    // Subtle auto-parallax when hovering
    const rect = containerRef.value.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    targetRotationY = nx * 0.7;
    targetRotationX = -ny * 0.5;
  }
}

function onMouseUp() {
  isDragging = false;
}

function onTouchStart(e) {
  if (e.touches.length === 1) {
    isDragging = true;
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
}

function onTouchMove(e) {
  if (isDragging && e.touches.length === 1) {
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;
    targetRotationY += deltaX * 0.01;
    targetRotationX = Math.max(-0.5, Math.min(0.5, targetRotationX + deltaY * 0.01));
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
}

function onTouchEnd() {
  isDragging = false;
}

function initThree() {
  const container = containerRef.value;
  const canvas = canvasRef.value;
  if (!container || !canvas) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 0, 8.5);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting (Paris Studio Rim-Lighting Setup)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambientLight);

  // Key Rim Light in Mint-Teal
  const keyLight = new THREE.DirectionalLight('#49C5B6', 2.8);
  keyLight.position.set(5, 6, 4);
  scene.add(keyLight);

  // Fill Light from Opposite Side
  const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
  fillLight.position.set(-6, -2, -3);
  scene.add(fillLight);

  // Subtle Teal Backlight for Rim Shimmer
  const rimLight = new THREE.PointLight('#49C5B6', 3.5, 12);
  rimLight.position.set(0, 0, -4);
  scene.add(rimLight);

  // Master Reactor Group
  reactorGroup = new THREE.Group();
  scene.add(reactorGroup);

  // 1. Borosilicate Glass Outer Cylinder
  const glassGeo = new THREE.CylinderGeometry(1.3, 1.3, 3.4, 48, 1, true);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.94,
    transparent: true,
    opacity: 0.45,
    ior: 1.52,
    reflectivity: 0.6,
    side: THREE.DoubleSide
  });
  const glassCylinder = new THREE.Mesh(glassGeo, glassMat);
  reactorGroup.add(glassCylinder);

  // 2. Liquid Core Mesh
  const liquidGeo = new THREE.CylinderGeometry(1.22, 1.22, 2.4, 36);
  liquidMaterial = new THREE.MeshStandardMaterial({
    color: targetConfig.liquid.clone(),
    emissive: targetConfig.liquidEmissive.clone(),
    roughness: 0.25,
    metalness: 0.35,
    transparent: true,
    opacity: targetConfig.opacity
  });
  liquidMesh = new THREE.Mesh(liquidGeo, liquidMaterial);
  liquidMesh.position.y = -0.3;
  reactorGroup.add(liquidMesh);

  // 3. Central Catalytic Catalyst Core (Pulsing Sphere)
  const coreGeo = new THREE.SphereGeometry(0.38, 32, 32);
  coreMaterial = new THREE.MeshStandardMaterial({
    color: targetConfig.core.clone(),
    emissive: targetConfig.coreEmissive.clone(),
    roughness: 0.15,
    metalness: 0.7
  });
  coreMesh = new THREE.Mesh(coreGeo, coreMaterial);
  coreMesh.position.y = -0.3;
  reactorGroup.add(coreMesh);

  // 4. Titanium Top & Bottom Machined Flanges / Caps
  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0x161616,
    metalness: 0.9,
    roughness: 0.25
  });

  // Top Cap
  const topCapGeo = new THREE.CylinderGeometry(1.45, 1.45, 0.4, 40);
  const topCap = new THREE.Mesh(topCapGeo, capMaterial);
  topCap.position.y = 1.9;
  reactorGroup.add(topCap);

  // Top Nozzle / Injector
  const nozzleGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.5, 24);
  const nozzle = new THREE.Mesh(nozzleGeo, capMaterial);
  nozzle.position.y = 2.35;
  reactorGroup.add(nozzle);

  // Bottom Cap
  const bottomCapGeo = new THREE.CylinderGeometry(1.55, 1.65, 0.45, 40);
  const bottomCap = new THREE.Mesh(bottomCapGeo, capMaterial);
  bottomCap.position.y = -1.9;
  reactorGroup.add(bottomCap);

  // Bottom Grounding Ring in Mint-Teal
  const ringGeo = new THREE.TorusGeometry(1.68, 0.04, 16, 64);
  const ringMat = new THREE.MeshStandardMaterial({
    color: '#49C5B6',
    emissive: '#49C5B6',
    emissiveIntensity: 0.8,
    metalness: 0.5,
    roughness: 0.2
  });
  const groundingRing = new THREE.Mesh(ringGeo, ringMat);
  groundingRing.rotation.x = Math.PI / 2;
  groundingRing.position.y = -2.1;
  reactorGroup.add(groundingRing);

  // 5. Dynamic Micro-Bubbles inside liquid
  const bubbleGeo = new THREE.SphereGeometry(0.045, 12, 12);
  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: '#49C5B6',
    emissiveIntensity: 0.6,
    roughness: 0.1,
    transparent: true,
    opacity: 0.75
  });

  for (let i = 0; i < 28; i++) {
    const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
    bubble.position.set(
      (Math.random() - 0.5) * 1.8,
      -1.4 + Math.random() * 2.2,
      (Math.random() - 0.5) * 1.8
    );
    bubble.userData = {
      speedY: 0.008 + Math.random() * 0.014,
      initialX: bubble.position.x,
      frequency: 2 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2
    };
    bubbles.push(bubble);
    reactorGroup.add(bubble);
  }

  // 6. Concentric Laser Orbital Scan Rings (Dual Axis)
  const ring1Geo = new THREE.RingGeometry(2.3, 2.32, 64);
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: '#49C5B6',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.65
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 2.3;
  scene.add(ring1);
  scanRings.push({ mesh: ring1, speedX: 0.004, speedZ: 0.006 });

  const ring2Geo = new THREE.RingGeometry(2.65, 2.665, 64);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = -Math.PI / 2.8;
  scene.add(ring2);
  scanRings.push({ mesh: ring2, speedX: -0.005, speedZ: 0.003 });

  // Attach event listeners for mouse drag & move
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd);
  window.addEventListener('resize', onResize);

  // Start Animation Loop
  animate();
}

function onResize() {
  if (!containerRef.value || !renderer || !camera) return;
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

let clock = new THREE.Clock();

function animate() {
  animationId = requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Smooth rotation damping
  currentRotationX += (targetRotationX - currentRotationX) * 0.06;
  currentRotationY += (targetRotationY - currentRotationY) * 0.06;

  if (reactorGroup) {
    reactorGroup.rotation.x = currentRotationX;
    reactorGroup.rotation.y = currentRotationY + elapsedTime * 0.15;
    rotationAngle.value = ((reactorGroup.rotation.y * 180) / Math.PI) % 360;
  }

  // Orbiting Radar Scan Rings
  scanRings.forEach((item) => {
    item.mesh.rotation.z += item.speedZ;
    item.mesh.rotation.y += item.speedX;
  });

  // Animate rising bubbles
  bubbles.forEach((b) => {
    b.position.y += b.userData.speedY;
    b.position.x = b.userData.initialX + Math.sin(elapsedTime * b.userData.frequency + b.userData.phase) * 0.08;
    if (b.position.y > 0.85) {
      b.position.y = -1.4;
    }
  });

  // Catalytic Core Pulse
  if (coreMesh) {
    const pulseScale = 1 + Math.sin(elapsedTime * 3.5) * 0.08;
    coreMesh.scale.set(pulseScale, pulseScale, pulseScale);
  }

  // Smooth Color & Height Tweening on Tier Change
  if (liquidMaterial && coreMaterial && liquidMesh) {
    liquidMaterial.color.lerp(targetConfig.liquid, 0.08);
    liquidMaterial.emissive.lerp(targetConfig.liquidEmissive, 0.08);
    liquidMaterial.opacity += (targetConfig.opacity - liquidMaterial.opacity) * 0.08;

    coreMaterial.color.lerp(targetConfig.core, 0.08);
    coreMaterial.emissive.lerp(targetConfig.coreEmissive, 0.08);

    const targetScaleY = targetConfig.liquidHeight / 2.4;
    liquidMesh.scale.y += (targetScaleY - liquidMesh.scale.y) * 0.08;
  }

  renderer.render(scene, camera);
}

onMounted(() => {
  initThree();
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('mousedown', onMouseDown);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchmove', onTouchMove);
  window.removeEventListener('touchend', onTouchEnd);
  window.removeEventListener('resize', onResize);

  if (renderer) {
    renderer.dispose();
  }
});
</script>
