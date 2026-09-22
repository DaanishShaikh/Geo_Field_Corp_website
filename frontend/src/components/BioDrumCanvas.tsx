"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface BioDrumCanvasProps {
  tier: "A" | "B" | "SLUDGE";
}

export default function BioDrumCanvas({ tier }: BioDrumCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    liquidMesh: THREE.Mesh;
    rings: THREE.Group;
    bubbles: THREE.Points;
    lights: THREE.PointLight[];
    animId: number;
    targetRotation: { x: number; y: number };
  } | null>(null);

  // Color mapping based on tier
  const tierColors = {
    A: {
      liquid: 0xd99a5b, // Warm Amber / High-Grade HVO
      core: 0xf5cf9b,
      light: 0xd99a5b,
      roughness: 0.15,
      metalness: 0.1,
      speed: 1.2,
    },
    B: {
      liquid: 0x4a6b46, // Standard Olive Biofuel
      core: 0x7da878,
      light: 0x668a68,
      roughness: 0.25,
      metalness: 0.15,
      speed: 1.0,
    },
    SLUDGE: {
      liquid: 0x5a2d1d, // Oxidized UCO Sludge
      core: 0x8a452d,
      light: 0x8c4a32,
      roughness: 0.5,
      metalness: 0.3,
      speed: 0.6,
    },
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7e6, 2.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x668a68, 1.5);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    const internalPointLight = new THREE.PointLight(tierColors[tier].light, 3, 4);
    internalPointLight.position.set(0, 0, 0);
    scene.add(internalPointLight);

    // 3. Central Bio-Drum Group
    const drumGroup = new THREE.Group();
    scene.add(drumGroup);

    // Outer Glass Reactor Tube
    const glassGeo = new THREE.CylinderGeometry(0.85, 0.85, 2.1, 32, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.08,
      metalness: 0.05,
      transmission: 0.85,
      ior: 1.45,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    drumGroup.add(glassMesh);

    // Top Metallic Flange / Collar
    const capGeo = new THREE.CylinderGeometry(0.92, 0.88, 0.18, 32);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1f3d2b,
      metalness: 0.85,
      roughness: 0.25,
    });
    const topCap = new THREE.Mesh(capGeo, metalMat);
    topCap.position.y = 1.1;
    drumGroup.add(topCap);

    // Bottom Metallic Base Collar
    const botCap = new THREE.Mesh(capGeo, metalMat);
    botCap.position.y = -1.1;
    drumGroup.add(botCap);

    // Pressure Relief Valve on Top
    const valveGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.22, 16);
    const valveMat = new THREE.MeshStandardMaterial({
      color: 0xd99a5b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const valve = new THREE.Mesh(valveGeo, valveMat);
    valve.position.y = 1.25;
    drumGroup.add(valve);

    // Center Catalytic Core Pillar
    const corePillarGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.0, 16);
    const corePillarMat = new THREE.MeshStandardMaterial({
      color: 0x243027,
      metalness: 0.95,
      roughness: 0.1,
    });
    const corePillar = new THREE.Mesh(corePillarGeo, corePillarMat);
    drumGroup.add(corePillar);

    // Internal Fluid Column Mesh
    const liquidGeo = new THREE.CylinderGeometry(0.78, 0.78, 1.85, 32, 24);
    // Save original vertex positions for dynamic wave oscillation
    const posAttr = liquidGeo.attributes.position;
    const originalPositions = new Float32Array(posAttr.array);

    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: tierColors[tier].liquid,
      emissive: tierColors[tier].liquid,
      emissiveIntensity: 0.25,
      roughness: tierColors[tier].roughness,
      metalness: tierColors[tier].metalness,
      transparent: true,
      opacity: 0.88,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    drumGroup.add(liquidMesh);

    // Micro Nanobubbles rising through fluid
    const bubbleCount = 45;
    const bubblePositions = new Float32Array(bubbleCount * 3);
    for (let i = 0; i < bubbleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.65;
      bubblePositions[i * 3] = Math.cos(angle) * radius;
      bubblePositions[i * 3 + 1] = (Math.random() - 0.5) * 1.7;
      bubblePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const bubbleGeo = new THREE.BufferGeometry();
    bubbleGeo.setAttribute("position", new THREE.BufferAttribute(bubblePositions, 3));
    const bubbleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
    });
    const bubbles = new THREE.Points(bubbleGeo, bubbleMat);
    drumGroup.add(bubbles);

    // 4. Orbital Dashed Radar Scan Rings
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    // Ring 1 (Tilted horizontal scan orbit)
    const ring1Geo = new THREE.BufferGeometry();
    const ring1Radius = 1.45;
    const ring1Points: THREE.Vector3[] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      ring1Points.push(
        new THREE.Vector3(Math.cos(theta) * ring1Radius, 0, Math.sin(theta) * ring1Radius)
      );
    }
    ring1Geo.setFromPoints(ring1Points);
    const ring1Mat = new THREE.LineDashedMaterial({
      color: 0x668a68,
      dashSize: 0.18,
      gapSize: 0.12,
      opacity: 0.6,
      transparent: true,
    });
    const ring1 = new THREE.LineLoop(ring1Geo, ring1Mat);
    ring1.computeLineDistances();
    ring1.rotation.x = Math.PI * 0.22;
    ring1.rotation.z = Math.PI * 0.08;
    ringsGroup.add(ring1);

    // Ring 2 (Outer inclined radar orbit)
    const ring2Geo = new THREE.BufferGeometry();
    const ring2Radius = 1.75;
    const ring2Points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      ring2Points.push(
        new THREE.Vector3(Math.cos(theta) * ring2Radius, 0, Math.sin(theta) * ring2Radius)
      );
    }
    ring2Geo.setFromPoints(ring2Points);
    const ring2Mat = new THREE.LineDashedMaterial({
      color: 0xd99a5b,
      dashSize: 0.25,
      gapSize: 0.15,
      opacity: 0.5,
      transparent: true,
    });
    const ring2 = new THREE.LineLoop(ring2Geo, ring2Mat);
    ring2.computeLineDistances();
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.y = Math.PI * 0.15;
    ringsGroup.add(ring2);

    // Radar Sensor Satellite Orb
    const satGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xd99a5b });
    const satellite = new THREE.Mesh(satGeo, satMat);
    ringsGroup.add(satellite);

    // 5. Parallax Mouse Tracker
    const targetRotation = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotation.y = x * 0.45;
      targetRotation.x = -y * 0.3;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 6. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Fluid Wave Shimmer (displacing vertices along Y sinusoidal wave)
      const positions = liquidGeo.attributes.position;
      const waveSpeed = tierColors[tier].speed * 2.2;
      for (let i = 0; i < positions.count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        // Only oscillate top and middle sections
        if (oy > -0.6) {
          const wave = Math.sin(ox * 4 + oz * 4 + elapsedTime * waveSpeed) * 0.022;
          positions.setXYZ(i, ox + wave * 0.3, oy + wave, oz + wave * 0.3);
        }
      }
      positions.needsUpdate = true;

      // Nanobubble ascent
      const bPos = bubbleGeo.attributes.position;
      for (let i = 0; i < bubbleCount; i++) {
        let y = bPos.getY(i) + 0.005 * tierColors[tier].speed;
        if (y > 0.85) y = -0.85;
        bPos.setY(i, y);
      }
      bPos.needsUpdate = true;

      // Orbital scan rotations
      ring1.rotation.y = elapsedTime * 0.35;
      ring2.rotation.y = -elapsedTime * 0.25;

      // Satellite position on ring 1
      const satAngle = elapsedTime * 0.8;
      satellite.position.set(
        Math.cos(satAngle) * ring1Radius,
        Math.sin(satAngle) * 0.2,
        Math.sin(satAngle) * ring1Radius
      );
      satellite.position.applyEuler(ring1.rotation);

      // Drum smooth cursor parallax & slow baseline rotation
      drumGroup.rotation.y += (targetRotation.y + elapsedTime * 0.15 - drumGroup.rotation.y) * 0.05;
      drumGroup.rotation.x += (targetRotation.x - drumGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
      sceneRef.current!.animId = requestAnimationFrame(animate);
    };

    sceneRef.current = {
      renderer,
      scene,
      camera,
      liquidMesh,
      rings: ringsGroup,
      bubbles,
      lights: [internalPointLight],
      animId: 0,
      targetRotation,
    };

    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animId);
      }
      renderer.dispose();
      glassGeo.dispose();
      liquidGeo.dispose();
      capGeo.dispose();
      valveGeo.dispose();
      corePillarGeo.dispose();
      bubbleGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      satGeo.dispose();
    };
  }, [tier]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    />
  );
}
