"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Lock } from "lucide-react";

interface FinalCtaSectionProps {
  onRegister?: () => void;
  onLogin?: () => void;
}

export default function FinalCtaSection({ onRegister, onLogin }: FinalCtaSectionProps) {
  return (
    <footer className="relative bg-forest text-cream overflow-hidden border-t border-olive/30">
      {/* Ambient glowing auroras */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-olive/15 rounded-full blur-[160px] -z-10"></div>
      <div className="pointer-events-none absolute -bottom-40 right-10 w-[600px] h-[500px] bg-amber/10 rounded-full blur-[160px] -z-10"></div>

      {/* Main CTA Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-dark border border-olive/40 text-xs font-mono font-bold text-amber shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber" />
            <span className="hud-label text-cream/90 tracking-wider">
              ZERO UPFRONT INVESTMENT · INSTANT KITCHEN QR PLACARD
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl font-black text-cream tracking-tight leading-[1.05]">
            Ready to Clean Up Your Kitchen <br className="hidden sm:block" />
            <span className="text-amber">and Your Conscience?</span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-cream/75 max-w-2xl mx-auto leading-relaxed">
            Join over 280+ compliant commercial hotels, restaurants, and catering
            hubs across India. Transform hazardous grease into verified clean biofuel
            revenue today.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Primary Amber CTA */}
            <button
              onClick={onRegister}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl bg-amber hover:bg-amber-hover text-nearblack font-extrabold text-sm sm:text-base shadow-xl shadow-amber/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-nearblack" />
              <span>Register Your Kitchen Now</span>
              <ArrowRight className="w-4 h-4 text-nearblack/70 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Ghost Dark CTA */}
            <button
              onClick={onLogin}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-forest-dark/80 hover:bg-forest-dark text-cream font-bold text-sm sm:text-base border border-olive/40 hover:border-cream/40 transition-all duration-300 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-olive-light" />
              <span>Access FBO Portal</span>
            </button>
          </div>

          {/* Trust Row */}
          <div className="pt-10 border-t border-olive/30 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-cream/70">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-olive-light" />
              <span>100% Traceable Biofuel Conversion</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-olive-light" />
              <span>Immediate Digital Form-D Issuance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-olive-light" />
              <span>Zero Minimum Volume Penalty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer: Brand & Compliance Accreditation */}
      <div className="border-t border-olive/20 bg-forest-deep px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cream/50">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-forest border border-olive/40 flex items-center justify-center text-cream font-bold text-xs">
              G
            </div>
            <span className="text-cream/80 font-bold">
              GeoField Bio-Logistics India Private Limited
            </span>
          </div>
          <div>
            FSSAI RUCO Registered Aggregation Partner · National Biofuel Policy
          </div>
        </div>
      </div>
    </footer>
  );
}
