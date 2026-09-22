"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown, Sparkles, Activity, ShieldCheck } from "lucide-react";

// Dynamically import 3D WebGL Canvas to prevent SSR hydration mismatch
const BioDrumCanvas = dynamic(() => import("./BioDrumCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] sm:h-[420px] flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full border-2 border-amber border-t-transparent animate-spin"></div>
      <span className="hud-label text-cream/70 text-[10px]">
        INITIALIZING 3D BIO-REACTOR HUD...
      </span>
    </div>
  ),
});

interface HeroSectionProps {
  onOpenRegister?: () => void;
}

export default function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const [selectedTier, setSelectedTier] = useState<"A" | "B" | "SLUDGE">("A");

  const tierMetadata = {
    A: {
      tag: "BIOFUEL GRADE A (PREMIUM HVO)",
      hvoYield: "99.4%",
      tpc: "14.2%",
      tpcStatus: "OPTIMAL < 18%",
      payout: "₹60.00 / Liter",
      payoutNote: "MAX REVENUE TIER",
      color: "text-amber",
    },
    B: {
      tag: "BIOFUEL GRADE B (STANDARD)",
      hvoYield: "94.8%",
      tpc: "21.6%",
      tpcStatus: "COMPLIANT < 25%",
      payout: "₹55.00 / Liter",
      payoutNote: "BASE REVENUE TIER",
      color: "text-olive-light",
    },
    SLUDGE: {
      tag: "SLUDGE FEEDSTOCK (HIGH TPC)",
      hvoYield: "82.1%",
      tpc: "31.4%",
      tpcStatus: "HAZARDOUS > 25%",
      payout: "₹38.00 / Liter",
      payoutNote: "REMEDIATION TIER",
      color: "text-amber-glow",
    },
  };

  const currentData = tierMetadata[selectedTier];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Ambient Radial Vignette */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-olive/10 blur-[140px] -z-10 rounded-full"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center w-full">
        {/* Left Column: Manifesto Headline & Action Controls */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-forest/5 border border-olive/30 text-nearblack shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-olive"></span>
            </span>
            <span className="hud-label text-nearblack/90 tracking-widest">
              FSSAI RUCO VERIFIED NETWORK · 100% CLOSED-LOOP BIOFUEL
            </span>
          </div>

          {/* Manifesto Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.04] text-nearblack">
            Stop the Toxic Cycle. <br />
            <span className="text-forest underline decoration-amber/40 decoration-wavy underline-offset-8">
              Start the Green Revenue.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-nearblack/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Join India’s smartest RUCO aggregation network. We take the hassle out
            of FSSAI compliance with instant QR-based disposal, cluster-based
            pickups, and real-time environmental tracking.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            {/* Primary CTA (Amber with subtle magnetic glow) */}
            <button
              onClick={onOpenRegister}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-amber hover:bg-amber-hover text-nearblack font-extrabold text-sm sm:text-base shadow-xl shadow-amber/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-nearblack" />
              <span>Join the Clean Network</span>
              <ArrowRight className="w-4 h-4 text-nearblack/80 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Ghost Secondary CTA (Smooth Anchor Jump to Section 2) */}
            <a
              href="#the-crisis"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-cream-200/50 hover:bg-cream-200 text-nearblack font-bold text-sm sm:text-base border border-olive/30 hover:border-forest/40 transition-all duration-300 shadow-sm group"
            >
              <span>Explore The 60% Crisis</span>
              <ChevronDown className="w-4 h-4 text-olive group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Compliance & Revenue Metrics Footer */}
          <div className="pt-6 border-t border-olive/25 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs text-nearblack/80">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-olive/15 text-forest font-bold flex items-center justify-center text-[11px] font-mono">
                ₹
              </span>
              <span className="font-semibold">₹55 - ₹60/L Guaranteed Base</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-olive" />
              <span className="font-semibold">Digital Form-D Certificates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse"></span>
              <span className="font-semibold">Zero-Interruption Cluster Fleet</span>
            </div>
          </div>
        </div>

        {/* Right Column: Capsul'in-Caliber 3D Reactor HUD Panel */}
        <div className="lg:col-span-5 flex items-center justify-center w-full">
          <div className="relative w-full max-w-[500px] rounded-3xl hud-panel p-6 sm:p-7 text-cream backdrop-blur-2xl overflow-hidden shadow-2xl transition-all">
            {/* Ambient Interior Glows */}
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-amber/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-olive/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* HUD Top Bar: Instrument Identifier & Interactive Grade Switcher */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-olive/30 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber animate-pulse"></span>
                <span className="hud-label text-cream/90">
                  VESSEL #04 · TELEMETRY ACTIVE
                </span>
              </div>

              {/* Grade Tabs: A / B / SLUDGE */}
              <div className="flex items-center gap-1 bg-forest-dark/80 p-1 rounded-xl border border-olive/30">
                {(["A", "B", "SLUDGE"] as const).map((tierKey) => (
                  <button
                    key={tierKey}
                    onClick={() => setSelectedTier(tierKey)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      selectedTier === tierKey
                        ? "bg-amber text-nearblack shadow-sm"
                        : "text-cream/60 hover:text-cream"
                    }`}
                  >
                    {tierKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Live Telemetry Chip (Above 3D model) */}
            <div className="mt-3 flex justify-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-dark/70 border border-amber/30 text-amber text-xs font-mono shadow-md">
                <Activity className="w-3.5 h-3.5 animate-pulse text-amber" />
                <span className="hud-label text-[10px] tracking-wider text-cream/95">
                  HYDROTREATED BIOFUEL HVO:{" "}
                  <strong className="text-amber">{currentData.hvoYield}</strong>
                </span>
              </div>
            </div>

            {/* Centerpiece 3D WebGL Bio-Drum */}
            <div className="relative my-1">
              <BioDrumCanvas tier={selectedTier} />
            </div>

            {/* Bottom HUD Telemetry Readouts Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-olive/30 relative z-10">
              <div className="bg-forest-dark/85 p-3 rounded-2xl border border-olive/30">
                <span className="hud-label text-cream/60 text-[9px] block">
                  TOTAL POLAR COMPOUNDS
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-lg font-black font-mono text-cream">
                    {currentData.tpc}
                  </span>
                  <span className="text-[10px] font-mono text-olive-light font-bold">
                    {currentData.tpcStatus}
                  </span>
                </div>
              </div>

              <div className="bg-forest-dark/85 p-3 rounded-2xl border border-olive/30">
                <span className="hud-label text-cream/60 text-[9px] block">
                  PAYOUT STATUS
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg font-black font-mono text-amber">
                    {currentData.payout}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Instrumentation Feed Bar */}
            <div className="mt-3 pt-2 border-t border-olive/20 flex items-center justify-between text-[10px] font-mono text-cream/50">
              <span>SPECTROMETER CALIBRATED</span>
              <span className="text-amber/90">{currentData.payoutNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
