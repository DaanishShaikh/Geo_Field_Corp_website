"use client";

import React, { useState } from "react";
import { Leaf, ArrowRight, ShieldCheck, Menu, X } from "lucide-react";

interface NavbarProps {
  onSignIn?: () => void;
  onRegister?: () => void;
}

export default function Navbar({ onSignIn, onRegister }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md border-b border-olive/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Group */}
        <div className="flex items-center gap-4">
          {/* Logo Mark: Green square with clean geometric G */}
          <div className="w-10 h-10 rounded-lg bg-forest flex items-center justify-center shadow-md shadow-forest/20 text-cream font-black text-xl tracking-tighter transition-transform hover:scale-105 select-none">
            G
          </div>

          {/* Brand Name + Tagline Stacked */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-nearblack">
                GeoField
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-olive font-bold px-1.5 py-0.5 rounded bg-olive/10 border border-olive/20">
                Bio-Logistics
              </span>
            </div>
            <span className="text-[11px] text-nearblack/60 tracking-tight font-medium hidden sm:block">
              National UCO Traceability &amp; Clean Bio-Energy Network
            </span>
          </div>
        </div>

        {/* Center / Secondary Trust & Live Status */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Trust Badge: RUCO CERTIFIED */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-olive/10 border border-olive/30 text-olive text-xs font-semibold">
            <Leaf className="w-3.5 h-3.5 text-olive" />
            <span className="hud-label tracking-wider">RUCO CERTIFIED</span>
          </div>

          {/* Live Status Pill: Network Online */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-nearblack text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-olive"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-nearblack/80">
              Network Online · 284 FBOs Live
            </span>
          </div>
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-3">
          {/* Ghost Sign In Button */}
          <button
            onClick={onSignIn}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-bold text-nearblack hover:text-forest transition-colors rounded-xl hover:bg-forest/5 border border-transparent hover:border-forest/20"
          >
            Sign In
          </button>

          {/* Solid CTA: Register FBO */}
          <button
            onClick={onRegister}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest text-cream font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:shadow-forest/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShieldCheck className="w-4 h-4 text-amber" />
            <span>Register FBO</span>
            <ArrowRight className="w-3.5 h-3.5 text-cream/70 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-nearblack hover:text-forest focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 bg-cream border-b border-olive/20 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-olive/10 text-xs">
            <span className="inline-flex items-center gap-1.5 text-olive font-semibold">
              <Leaf className="w-3.5 h-3.5" /> RUCO CERTIFIED
            </span>
            <span className="font-mono text-nearblack/70 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-olive animate-pulse"></span>
              Network Online
            </span>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onSignIn?.();
            }}
            className="w-full py-2.5 text-xs font-bold text-center text-nearblack bg-cream-200/60 rounded-xl"
          >
            Sign In to Portal
          </button>
        </div>
      )}
    </header>
  );
}
