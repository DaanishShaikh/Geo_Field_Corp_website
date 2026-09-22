"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Gauge, AlertOctagon, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

interface SpecimenData {
  id: string;
  name: string;
  badge: string;
  tpc: number; // 0 to 40%
  tpcLabel: string;
  ffa: string;
  legalStanding: string;
  legalStatus: "VIOLATION" | "CRITICAL" | "CERTIFIED COMPLIANT";
  hazardColor: string;
  description: string;
  spectralPeak: string;
  peroxideValue: string;
}

const SPECIMENS: SpecimenData[] = [
  {
    id: "street",
    name: "Street Fryer Vat #1",
    badge: "UNREGULATED COMMERCIAL",
    tpc: 34.8,
    tpcLabel: "CARCINOGENIC OXIDATION",
    ffa: "8.4% (Severely Degraded)",
    legalStanding: "Seizure & Penal Offense under FSSAI Section 31",
    legalStatus: "VIOLATION",
    hazardColor: "text-amber",
    description:
      "Severely thermalized cooking medium undergoing rapid lipid peroxidation and secondary oxidation. Acrylamide, polar cyclic monomers, and volatile carbonyl concentrations exceed statutory human safety ceilings by 139%.",
    spectralPeak: "460nm (Hyper-Oxidized)",
    peroxideValue: "28.4 meq/kg",
  },
  {
    id: "repack",
    name: "Unlabeled Repackaging Canister",
    badge: "BLACK MARKET RECIRCULATION",
    tpc: 27.2,
    tpcLabel: "HAZARDOUS CONTAMINATED",
    ffa: "5.1% (High Acid)",
    legalStanding: "Illegal Food Stream Adulteration (Non-Bailable)",
    legalStatus: "CRITICAL",
    hazardColor: "text-amber-glow",
    description:
      "Partially bleached discarded oil blended with virgin palmolein to mask rancidity and odor. Fails standard dielectric constant thresholds; contains high concentrations of hazardous free fatty acids and polymerization products.",
    spectralPeak: "420nm (Chemical Bleached)",
    peroxideValue: "19.8 meq/kg",
  },
  {
    id: "geofield",
    name: "GeoField Sealed Bio-Drum",
    badge: "100% CLOSED-LOOP HVO FEEDSTOCK",
    tpc: 13.5,
    tpcLabel: "CLEAN CONVERSION GRADE",
    ffa: "1.2% (Pristine Feedstock)",
    legalStanding: "Certified Compliant · Instant Form-D Issuance",
    legalStatus: "CERTIFIED COMPLIANT",
    hazardColor: "text-olive-light",
    description:
      "Collected at peak recovery efficiency from accredited commercial food operators. Hermetically sealed with cryptographic QR batch serialization, ready for industrial transesterification into ASTM D6751 standard biodiesel.",
    spectralPeak: "380nm (Pure Hydrocarbon Precursor)",
    peroxideValue: "4.1 meq/kg",
  },
];

export default function LabHudSection() {
  const [activeSpecimenIndex, setActiveSpecimenIndex] = useState(0);
  const activeSpecimen = SPECIMENS[activeSpecimenIndex];

  // Animated TPC and Needle Angle states
  const [displayTpc, setDisplayTpc] = useState(SPECIMENS[0].tpc);
  const needleRef = useRef<SVGGElement>(null);
  const animatedValues = useRef({ tpc: SPECIMENS[0].tpc });

  useEffect(() => {
    // Semicircular angle: 0% TPC -> -90 deg (left), 40% TPC -> +90 deg (right)
    // Formula: angle = -90 + (tpc / 40) * 180
    const targetAngle = -90 + (activeSpecimen.tpc / 40) * 180;

    gsap.to(animatedValues.current, {
      tpc: activeSpecimen.tpc,
      duration: 1.2,
      ease: "elastic.out(1, 0.65)",
      onUpdate: () => {
        setDisplayTpc(Number(animatedValues.current.tpc.toFixed(1)));
      },
    });

    if (needleRef.current) {
      gsap.to(needleRef.current, {
        rotation: targetAngle,
        transformOrigin: "center bottom",
        duration: 1.4,
        ease: "elastic.out(1.1, 0.6)",
      });
    }
  }, [activeSpecimenIndex, activeSpecimen.tpc]);

  return (
    <section className="relative py-28 bg-forest text-cream px-4 sm:px-6 lg:px-8 border-t border-b border-olive/30 overflow-hidden">
      {/* Ambient Laboratory Glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[700px] h-[500px] bg-olive/15 rounded-full blur-[160px] -z-10"></div>
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-amber/10 rounded-full blur-[160px] -z-10"></div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-dark/80 text-olive-light border border-olive/40 text-xs font-bold font-mono uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5 text-amber" />
            <span className="hud-label text-cream/90">
              INTERACTIVE LABORATORY HUD
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cream tracking-tight leading-[1.1]">
            Live Oil Degradation Spectrometer.
          </h2>

          <p className="text-cream/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Toggle between unmonitored commercial grease samples and GeoField-certified
            feedstock to observe instant dielectric polarity, toxic breakdown, and legal compliance.
          </p>
        </div>

        {/* Tab Selector: 3 Specimen Samples */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {SPECIMENS.map((specimen, idx) => {
            const isActive = activeSpecimenIndex === idx;
            return (
              <button
                key={specimen.id}
                onClick={() => setActiveSpecimenIndex(idx)}
                className={`relative px-5 py-3 rounded-2xl text-xs sm:text-sm font-mono font-bold transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-amber text-nearblack border-amber shadow-lg shadow-amber/20 scale-102"
                    : "bg-forest-dark/70 hover:bg-forest-dark text-cream/70 hover:text-cream border-olive/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-nearblack animate-pulse" : "bg-olive"
                    }`}
                  ></span>
                  <span>{specimen.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* HUD Instrument Grid: Left Dial Gauge + Right Sample Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: Spring-Eased Semicircular Dial Gauge */}
          <div className="lg:col-span-6 bg-forest-dark/90 rounded-3xl p-6 sm:p-10 border border-olive/40 shadow-2xl relative overflow-hidden flex flex-col items-center justify-between min-h-[440px]">
            {/* Top Telemetry Tag */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono border-b border-olive/30 pb-4">
              <span className="text-cream/60">DIELECTRIC DIE SENSOR #09</span>
              <span className="text-amber font-bold">CALIBRATED ASTM D6751</span>
            </div>

            {/* Semicircular SVG Dial Gauge */}
            <div className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center my-4">
              <svg viewBox="0 0 320 220" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#4A6B46" />
                    <stop offset="45%" stop-color="#D99A5B" />
                    <stop offset="62.5%" stop-color="#D99A5B" />
                    <stop offset="100%" stop-color="#8C4A32" />
                  </linearGradient>
                </defs>

                {/* Semicircle Gauge Track */}
                <path
                  d="M 40 180 A 120 120 0 0 1 280 180"
                  fill="none"
                  stroke="rgba(102, 138, 104, 0.2)"
                  strokeWidth="22"
                  strokeLinecap="round"
                />

                {/* Colored Measurement Arc */}
                <path
                  d="M 40 180 A 120 120 0 0 1 280 180"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  opacity="0.95"
                />

                {/* 25% FSSAI Statutory Ceiling Marker at 152.5 degrees (62.5% of 180) */}
                <line
                  x1="220"
                  y1="75"
                  x2="236"
                  y2="60"
                  stroke="#D99A5B"
                  strokeWidth="2.5"
                  strokeDasharray="2 2"
                />
                <text
                  x="240"
                  y="55"
                  fill="#D99A5B"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  25% CEILING
                </text>

                {/* Tick Labels */}
                <text x="35" y="202" fill="rgba(244, 241, 228, 0.6)" fontSize="10" fontFamily="monospace">
                  0%
                </text>
                <text x="145" y="45" fill="rgba(244, 241, 228, 0.6)" fontSize="10" fontFamily="monospace">
                  20%
                </text>
                <text x="270" y="202" fill="rgba(244, 241, 228, 0.6)" fontSize="10" fontFamily="monospace">
                  40%
                </text>

                {/* Center Spring Needle (Pivot at 160, 180) */}
                <g ref={needleRef} transform="rotate(-90 160 180)">
                  <polygon points="157,180 160,50 163,180" fill="#F4F1E4" />
                  <circle cx="160" cy="50" r="4" fill="#D99A5B" />
                  <circle cx="160" cy="180" r="14" fill="#111813" stroke="#D99A5B" strokeWidth="3" />
                </g>
              </svg>
            </div>

            {/* Needle Center Numeric Readout */}
            <div className="w-full text-center space-y-1 pt-2 border-t border-olive/30">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-cream">
                  {displayTpc}%
                </span>
                <span className="hud-label text-cream/70 text-xs">TPC READING</span>
              </div>
              <p className={`hud-label font-bold text-xs ${activeSpecimen.hazardColor}`}>
                {activeSpecimen.tpcLabel}
              </p>
            </div>
          </div>

          {/* Right Column: Sample Analysis & Legal Standing */}
          <div className="lg:col-span-6 bg-forest-dark/70 rounded-3xl p-6 sm:p-10 border border-olive/30 shadow-2xl space-y-6">
            {/* Header: Sample Identification & Hazard Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-olive/30 pb-4">
              <div>
                <span className="hud-label text-cream/60 block text-[10px]">
                  SAMPLE ANALYSIS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-cream">
                  {activeSpecimen.name}
                </h3>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${
                  activeSpecimen.legalStatus === "CERTIFIED COMPLIANT"
                    ? "bg-olive/20 text-olive-light border-olive"
                    : "bg-amber/20 text-amber border-amber"
                }`}
              >
                {activeSpecimen.legalStatus === "CERTIFIED COMPLIANT" ? (
                  <CheckCircle2 className="w-4 h-4 text-olive-light" />
                ) : (
                  <AlertOctagon className="w-4 h-4 text-amber" />
                )}
                <span>{activeSpecimen.badge}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-cream/80 leading-relaxed font-normal">
              {activeSpecimen.description}
            </p>

            {/* Diagnostic Metrics Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-forest-dark/90 p-4 rounded-2xl border border-olive/30 space-y-1">
                <span className="hud-label text-cream/50 text-[10px] block">
                  FREE FATTY ACIDS (FFA)
                </span>
                <span className="text-base font-black font-mono text-cream block">
                  {activeSpecimen.ffa}
                </span>
                <span className="text-[11px] font-mono text-cream/60">
                  Peroxide: {activeSpecimen.peroxideValue}
                </span>
              </div>

              <div className="bg-forest-dark/90 p-4 rounded-2xl border border-olive/30 space-y-1">
                <span className="hud-label text-cream/50 text-[10px] block">
                  SPECTROPHOTOMETRIC PEAK
                </span>
                <span className="text-base font-black font-mono text-amber block">
                  {activeSpecimen.spectralPeak}
                </span>
                <span className="text-[11px] font-mono text-cream/60">
                  Dual Photodiode Array
                </span>
              </div>
            </div>

            {/* Legal Standing Banner */}
            <div className="p-4 rounded-2xl bg-forest-dark border border-olive/40 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="hud-label text-cream/60 text-[10px] block">
                  STATUTORY REGULATORY STANDING
                </span>
                <p className="text-xs sm:text-sm font-semibold text-cream">
                  {activeSpecimen.legalStanding}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
