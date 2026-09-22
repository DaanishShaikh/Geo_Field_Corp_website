"use client";

import React, { useState, useEffect } from "react";
import { Truck, QrCode, CheckCircle2, Play, RefreshCw, Radio, Lock, ShieldCheck } from "lucide-react";

interface StepLog {
  title: string;
  detail: string;
  timestamp: string;
  status: "pending" | "running" | "completed";
}

export default function DispatchSection() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [hashOutput, setHashOutput] = useState("");

  const stepsData = [
    {
      title: "FSSAI Site Identity Authenticated",
      detail: "FSSAI #10019022009842 · Geofence Match (12.9716° N, 77.5946° E)",
    },
    {
      title: "Ultrasonic Drum Volume Measured",
      detail: "Tare Weight Deducted · Net Volume: 185.4 Liters Standardized",
    },
    {
      title: "Digital TPC Quality Sensor Test",
      detail: "Dielectric Constant: 19.2% TPC · Base Grade ₹60.00/L Approved",
    },
    {
      title: "Cryptographic SHA-256 Ledger Block",
      detail: "Form-D Serialized · Immutable Biofuel Origin Stamped",
    },
  ];

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStepIndex(0);
    setHashOutput("");

    // Step 1: 500ms
    setTimeout(() => {
      setActiveStepIndex(1);
    }, 900);

    // Step 2: 1800ms
    setTimeout(() => {
      setActiveStepIndex(2);
    }, 1800);

    // Step 3: 2700ms
    setTimeout(() => {
      setActiveStepIndex(3);
      setHashOutput("0x7e8b9f42c10a3d9e87fa45b20618ce54d6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5");
      setIsRunning(false);
    }, 2800);
  };

  // Run automatically once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      runSimulation();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-28 bg-forest text-cream px-4 sm:px-6 lg:px-8 border-t border-b border-olive/30 overflow-hidden">
      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute top-10 right-10 w-[600px] h-[600px] bg-olive/15 rounded-full blur-[150px] -z-10"></div>
      <div className="pointer-events-none absolute bottom-10 left-10 w-[600px] h-[600px] bg-amber/10 rounded-full blur-[150px] -z-10"></div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-dark/80 text-olive-light border border-olive/40 text-xs font-bold font-mono uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-amber animate-pulse" />
            <span className="hud-label text-cream/90">
              LIVE DYNAMIC DISPATCH
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cream tracking-tight leading-[1.1]">
            Simulated Collection Route &amp; <br className="hidden sm:block" />
            <span className="text-amber">Dynamic Tracking.</span>
          </h2>

          <p className="text-cream/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every liter is mapped from commercial fryer to refinery. Watch our
            2km cluster fleet execute zero-friction micro-pickups with cryptographic
            chain-of-custody.
          </p>
        </div>

        {/* 1. Horizontal Animated Route Diagram */}
        <div className="bg-forest-dark/80 rounded-3xl p-6 sm:p-10 border border-olive/40 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-olive/30 pb-4 mb-8">
            <span className="hud-label text-cream/60 text-[10px]">
              CLUSTER DISPATCH RADAR · SECTOR 4B
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-amber">
              <span className="w-2 h-2 rounded-full bg-amber animate-ping"></span>
              <span>FLEET EV #18 EN ROUTE</span>
            </div>
          </div>

          {/* Route Map Container with Driving EV Truck Animation */}
          <div className="relative py-8 px-4 sm:px-12">
            {/* SVG Connecting Track */}
            <svg
              className="w-full h-24 overflow-visible"
              viewBox="0 0 800 80"
              fill="none"
            >
              {/* Background Dashed Path */}
              <line
                x1="80"
                y1="40"
                x2="720"
                y2="40"
                stroke="rgba(102, 138, 104, 0.4)"
                strokeWidth="4"
                strokeDasharray="8 8"
              />
              {/* Active Golden Flow Segment */}
              <line
                x1="80"
                y1="40"
                x2="720"
                y2="40"
                stroke="#D99A5B"
                strokeWidth="4"
                strokeDasharray="16 12"
                className="animate-[dash_12s_linear_infinite]"
              />
            </svg>

            {/* Continuous Driving Van (CSS Keyframe Moving along the route) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-10 sm:left-24 right-10 sm:right-24 pointer-events-none">
              <div className="animate-[truckRun_9s_easeInOut_infinite] flex items-center gap-2 -mt-4 w-fit">
                <div className="w-11 h-11 rounded-2xl bg-amber text-nearblack flex items-center justify-center shadow-lg shadow-amber/30 border border-cream/40">
                  <Truck className="w-6 h-6 text-nearblack animate-bounce" />
                </div>
                <div className="hidden sm:block bg-forest-dark/95 border border-olive/50 px-2.5 py-1 rounded-lg text-[10px] font-mono text-cream shadow-md whitespace-nowrap">
                  <span className="text-amber font-bold">EV-VAN #18</span> · SPEED 28 KM/H
                </div>
              </div>
            </div>

            {/* 3 Landmark Station Nodes */}
            <div className="relative -mt-16 flex items-center justify-between w-full">
              {/* Node 1: FBO Kitchen */}
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-16 h-16 rounded-2xl bg-forest border-2 border-olive flex items-center justify-center shadow-xl group-hover:border-cream transition-colors">
                  <span className="text-2xl">🍳</span>
                </div>
                <div>
                  <span className="hud-label text-cream font-bold block">
                    FBO KITCHEN
                  </span>
                  <span className="text-[11px] font-mono text-cream/60">
                    Pickup Source Node
                  </span>
                </div>
              </div>

              {/* Node 2: 2km Cluster Fleet Hub */}
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-16 h-16 rounded-2xl bg-amber text-nearblack border-2 border-cream flex items-center justify-center shadow-xl shadow-amber/20 group-hover:scale-105 transition-transform">
                  <Truck className="w-8 h-8 text-nearblack" />
                </div>
                <div>
                  <span className="hud-label text-amber font-bold block">
                    2KM CLUSTER FLEET
                  </span>
                  <span className="text-[11px] font-mono text-cream/60">
                    Micro-Route Sweeper
                  </span>
                </div>
              </div>

              {/* Node 3: Scan & Done */}
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-16 h-16 rounded-2xl bg-forest border-2 border-olive-light flex items-center justify-center shadow-xl group-hover:border-cream transition-colors">
                  <CheckCircle2 className="w-8 h-8 text-olive-light" />
                </div>
                <div>
                  <span className="hud-label text-olive-light font-bold block">
                    SCAN &amp; DONE
                  </span>
                  <span className="text-[11px] font-mono text-cream/60">
                    Instant Form-D Ledger
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Field Pickup Simulator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-forest-dark/90 rounded-3xl p-6 sm:p-10 border border-olive/40 shadow-2xl">
          {/* Left Column: QR Code Visual with Sweeping Laser Beam */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-forest rounded-2xl border border-olive/30 relative overflow-hidden">
            <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-olive/30 text-[10px] font-mono text-cream/60">
              <span>SCANNER INTERFACE V3.2</span>
              <span className="text-amber font-bold">LASER ACTIVE</span>
            </div>

            {/* QR Container with Laser Sweep */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-cream rounded-2xl p-4 flex items-center justify-center shadow-inner overflow-hidden">
              {/* QR Graphic */}
              <div className="w-full h-full border-4 border-nearblack p-2 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-10 h-10 border-4 border-nearblack flex items-center justify-center">
                    <div className="w-4 h-4 bg-nearblack"></div>
                  </div>
                  <div className="w-10 h-10 border-4 border-nearblack flex items-center justify-center">
                    <div className="w-4 h-4 bg-nearblack"></div>
                  </div>
                </div>
                <div className="flex items-center justify-center text-nearblack font-mono font-black text-xs">
                  GEOFIELD-RUCO-8942
                </div>
                <div className="flex justify-between">
                  <div className="w-10 h-10 border-4 border-nearblack flex items-center justify-center">
                    <div className="w-4 h-4 bg-nearblack"></div>
                  </div>
                  <div className="w-8 h-8 bg-nearblack/20 flex items-center justify-center text-[8px] font-mono">
                    VALID
                  </div>
                </div>
              </div>

              {/* Sweeping Animated Laser Beam */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber to-transparent shadow-[0_0_12px_#D99A5B] animate-[scanLaser_2.4s_easeInOut_infinite]"></div>
            </div>

            <div className="mt-4 text-center space-y-1">
              <span className="hud-label text-cream/80 text-xs">
                SERIALIZED PLACARD SCANNER
              </span>
              <p className="text-[11px] font-mono text-cream/50">
                Encrypted NFC &amp; Optical QR Recognition
              </p>
            </div>
          </div>

          {/* Right Column: Live Step-by-Step Execution Log */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-olive/30 pb-4">
              <div>
                <span className="hud-label text-cream/60 text-[10px] block">
                  FIELD TELEMETRY AUDIT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-cream">
                  Interactive Field Pickup Simulator
                </h3>
              </div>

              {/* Simulation Trigger Button */}
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber hover:bg-amber-hover text-nearblack font-bold text-xs font-mono transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>SIMULATING...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>RUN LIVE PICKUP DEMO</span>
                  </>
                )}
              </button>
            </div>

            {/* Step-by-Step Ticking Log */}
            <div className="space-y-3">
              {stepsData.map((step, idx) => {
                const isCompleted = activeStepIndex >= idx;
                const isCurrent = activeStepIndex === idx && isRunning;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all duration-400 flex items-start gap-4 ${
                      isCompleted
                        ? "bg-forest border-olive shadow-md"
                        : "bg-forest/40 border-olive/20 opacity-60"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-amber animate-scale-in" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-olive/50 flex items-center justify-center text-[10px] font-mono text-cream/50">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-cream font-mono">
                          {step.title}
                        </span>
                        {isCompleted && (
                          <span className="hud-label text-[9px] text-amber">
                            VERIFIED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-cream/70">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cryptographic SHA-256 Hash Output Banner */}
            {hashOutput && (
              <div className="p-4 rounded-2xl bg-forest-dark border border-amber/40 space-y-1.5 animate-fade-in">
                <div className="flex items-center gap-2 text-[10px] font-mono text-amber font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>IMMUTABLE LEDGER BLOCK HASH (SHA-256)</span>
                </div>
                <code className="text-[11px] font-mono text-cream/90 break-all block">
                  {hashOutput}
                </code>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
