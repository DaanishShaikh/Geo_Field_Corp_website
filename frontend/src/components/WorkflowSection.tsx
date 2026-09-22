"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QrCode, Truck, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardsContainer = cardsRef.current;
    if (!cardsContainer) return;

    const cards = cardsContainer.querySelectorAll(".workflow-card");
    const centerCard = cardsContainer.querySelector(".center-elevated-card");

    const ctx = gsap.context(() => {
      // Staggered entrance for all 3 cards
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Elevated center card pulse/scale animation on scroll into center
      if (centerCard) {
        gsap.fromTo(
          centerCard,
          { scale: 0.96, boxShadow: "0 10px 25px -5px rgba(31, 61, 43, 0.2)" },
          {
            scale: 1.03,
            boxShadow: "0 25px 50px -12px rgba(31, 61, 43, 0.45)",
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: centerCard,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, cardsContainer);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-cream px-4 sm:px-6 lg:px-8 border-b border-olive/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/5 text-forest border border-olive/30 text-xs font-bold font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-olive" />
            <span className="hud-label text-nearblack/90">
              AUTOMATED THREE-STEP WORKFLOW
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-nearblack tracking-tight leading-[1.1]">
            Frictionless Disposal. <br className="hidden sm:block" />
            <span className="text-forest">Zero Interruptions.</span>
          </h2>

          <p className="text-nearblack/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Eliminate grease collection chaos. A fully compliant three-step loop
            built specifically for high-tempo commercial kitchens.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto"
        >
          {/* Step 1: Light Card */}
          <div className="workflow-card bg-cream-50 rounded-3xl p-8 border border-olive/30 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full min-h-[380px] group hover:-translate-y-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black font-mono text-nearblack/30 group-hover:text-forest transition-colors">
                  01
                </span>
                <span className="w-12 h-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-forest" />
                </span>
              </div>

              <div>
                <span className="hud-label text-olive block text-[10px] mb-1">
                  60-SECOND ONBOARDING
                </span>
                <h3 className="text-2xl font-extrabold text-nearblack group-hover:text-forest transition-colors">
                  Register &amp; Get Your QR
                </h3>
              </div>

              <p className="text-sm text-nearblack/75 leading-relaxed">
                Enroll your commercial kitchen in 60 seconds. Receive your serialized
                GeoField smart placard and cryptographic QR identity for immediate
                FSSAI RUCO compliance.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-olive/20 flex items-center justify-between text-xs font-bold text-forest">
              <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore details</span>
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="font-mono text-[10px] text-nearblack/50">STEP 01</span>
            </div>
          </div>

          {/* Step 2: Elevated Highlighted Dark Green Card */}
          <div className="workflow-card center-elevated-card bg-forest text-cream rounded-3xl p-8 sm:p-9 border-2 border-amber/60 shadow-2xl relative flex flex-col justify-between h-full min-h-[420px] group transition-all duration-400">
            {/* Top Elevated Tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber text-nearblack text-[10px] font-mono font-black tracking-wider uppercase shadow-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-nearblack animate-pulse"></span>
              CORE LOGISTICS ENGINE
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-5xl font-black font-mono text-amber">
                  02
                </span>
                <span className="w-14 h-14 rounded-2xl bg-forest-light text-cream flex items-center justify-center shadow-inner border border-olive/40">
                  <Truck className="w-7 h-7 text-amber" />
                </span>
              </div>

              <div>
                <span className="hud-label text-amber block text-[10px] mb-1">
                  2KM FLEET CLUSTER NETWORK
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-cream">
                  Cluster-Based Pickups
                </h3>
              </div>

              <p className="text-sm text-cream/80 leading-relaxed font-normal">
                Our dedicated electric collection fleet sweeps commercial restaurant
                clusters along optimized micro-routes, ensuring zero disruption to
                your kitchen prep hours.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-olive/40 flex items-center justify-between text-xs font-bold text-amber">
              <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore cluster routes</span>
                <ArrowRight className="w-4 h-4 text-amber" />
              </span>
              <span className="font-mono text-[10px] text-cream/60">STEP 02</span>
            </div>
          </div>

          {/* Step 3: Light Card */}
          <div className="workflow-card bg-cream-50 rounded-3xl p-8 border border-olive/30 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full min-h-[380px] group hover:-translate-y-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black font-mono text-nearblack/30 group-hover:text-forest transition-colors">
                  03
                </span>
                <span className="w-12 h-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-forest" />
                </span>
              </div>

              <div>
                <span className="hud-label text-olive block text-[10px] mb-1">
                  INSTANT SETTLEMENT &amp; FORM-D
                </span>
                <h3 className="text-2xl font-extrabold text-nearblack group-hover:text-forest transition-colors">
                  Scan &amp; Done
                </h3>
              </div>

              <p className="text-sm text-nearblack/75 leading-relaxed">
                Agents authenticate your drum with a scan, test TPC digitally, record
                volume ultrasonically, and disburse guaranteed ₹55–₹60/L payouts
                directly with digital Form-D.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-olive/20 flex items-center justify-between text-xs font-bold text-forest">
              <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore payout logic</span>
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="font-mono text-[10px] text-nearblack/50">STEP 03</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
