"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CrisisSection from "@/components/CrisisSection";
import LabHudSection from "@/components/LabHudSection";
import WorkflowSection from "@/components/WorkflowSection";
import DispatchSection from "@/components/DispatchSection";
import CalculatorSection from "@/components/CalculatorSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import { X, ShieldCheck, ArrowRight } from "lucide-react";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"register" | "login">("register");

  const openAuth = (mode: "register" | "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-cream text-nearblack flex flex-col selection:bg-amber selection:text-cream">
      {/* 1. Elevated Sticky Navigation */}
      <Navbar
        onSignIn={() => openAuth("login")}
        onRegister={() => openAuth("register")}
      />

      {/* 2. SECTION 1: HERO (3D Bio-Drum WebGL & Live Telemetry HUD) */}
      <HeroSection onOpenRegister={() => openAuth("register")} />

      {/* 3. SECTION 2: THE CRISIS (Staggered Stat Cards & Animated Counters) */}
      <CrisisSection />

      {/* 4. SECTION 3: INTERACTIVE LABORATORY HUD (Spectrometer & Spring Dial Gauge) */}
      <LabHudSection />

      {/* 5. SECTION 4: HOW IT WORKS (Automated Three-Step Workflow with Center Elevation) */}
      <WorkflowSection />

      {/* 6. SECTION 5: LIVE DISPATCH VISUALIZATION (Route Map & 4-Step Pickup Simulator) */}
      <DispatchSection />

      {/* 7. SECTION 6: GREEN FOOTPRINT / REVENUE CALCULATOR (Volume Slider & Certificate) */}
      <CalculatorSection />

      {/* 8. SECTION 7: FINAL CTA (Full-Width Dark Green Action Panel & Sub-Footer) */}
      <FinalCtaSection
        onRegister={() => openAuth("register")}
        onLogin={() => openAuth("login")}
      />

      {/* Interactive Registration & Sign-In Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nearblack/70 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-md bg-cream-50 rounded-3xl p-8 border border-olive/30 shadow-2xl space-y-6">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-nearblack/60 hover:text-nearblack hover:bg-cream-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="hud-label text-olive block">
                {authMode === "register" ? "FBO ONBOARDING" : "PORTAL ACCESS"}
              </span>
              <h3 className="text-2xl font-extrabold text-nearblack">
                {authMode === "register"
                  ? "Register Your Food Business"
                  : "Sign In to GeoField"}
              </h3>
              <p className="text-xs text-nearblack/70">
                {authMode === "register"
                  ? "Instant FSSAI RUCO compliance verification and pickup scheduling."
                  : "Access your real-time UCO collection ledger and certificates."}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  `${
                    authMode === "register" ? "Registration" : "Sign In"
                  } verified! Welcome to GeoField Bio-Logistics.`
                );
                setAuthModalOpen(false);
              }}
              className="space-y-4 text-xs font-semibold"
            >
              {authMode === "register" && (
                <div>
                  <label className="hud-label text-nearblack/80 block mb-1.5">
                    Commercial Establishment Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Orchid Grand Kitchen"
                    className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/30 focus:border-forest outline-none text-nearblack font-sans text-sm"
                  />
                </div>
              )}

              <div>
                <label className="hud-label text-nearblack/80 block mb-1.5">
                  FSSAI License / Phone Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210 or 14-digit FSSAI"
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/30 focus:border-forest outline-none text-nearblack font-sans text-sm"
                />
              </div>

              <div>
                <label className="hud-label text-nearblack/80 block mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/30 focus:border-forest outline-none text-nearblack font-sans text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-forest hover:bg-forest-light text-cream font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
              >
                <ShieldCheck className="w-4 h-4 text-amber" />
                <span>
                  {authMode === "register"
                    ? "Generate Digital QR Placard"
                    : "Access Portal"}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-cream/70" />
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-nearblack/60">
              {authMode === "register" ? (
                <span>
                  Already registered?{" "}
                  <button
                    onClick={() => setAuthMode("login")}
                    className="text-forest font-bold underline"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Need an FBO account?{" "}
                  <button
                    onClick={() => setAuthMode("register")}
                    className="text-forest font-bold underline"
                  >
                    Register FBO
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
