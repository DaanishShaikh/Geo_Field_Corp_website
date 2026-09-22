"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, ShieldAlert, HeartPulse, Scale } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CrisisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Animated counter states
  const [plateCount, setPlateCount] = useState(0);
  const [tpcCount, setTpcCount] = useState(0);
  const [cardioCount, setCardioCount] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    const cardContainer = cardContainerRef.current;
    if (!section || !cardContainer) return;

    const cards = cardContainer.querySelectorAll(".crisis-card");

    // 1. Staggered card entrance reveal
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.22,
          scrollTrigger: {
            trigger: cardContainer,
            start: "top 80%",
            once: true,
          },
        }
      );

      // 2. Numbers tween trigger
      const counters = { plate: 0, tpc: 0, cardio: 1 };
      gsap.to(counters, {
        plate: 60,
        tpc: 25,
        cardio: 3,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardContainer,
          start: "top 75%",
          once: true,
        },
        onUpdate: () => {
          setPlateCount(Math.round(counters.plate));
          setTpcCount(Math.round(counters.tpc));
          setCardioCount(Math.round(counters.cardio));
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="the-crisis"
      ref={sectionRef}
      className="relative py-28 bg-cream border-t border-b border-olive/20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Accent Subtle Glow */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] bg-amber/5 rounded-full blur-[160px] -z-10"></div>
      <div className="pointer-events-none absolute -bottom-40 left-0 w-[600px] h-[600px] bg-forest/5 rounded-full blur-[160px] -z-10"></div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber/15 text-forest border border-amber/30 text-xs font-bold font-mono uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber" />
            <span className="hud-label text-nearblack/90">
              THE UNREGULATED DANGER
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-nearblack tracking-tight leading-[1.1]">
            The 60% Crisis in Your Kitchen.
          </h2>

          <p className="text-nearblack/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every liter of unmonitored used cooking oil represents severe health
            liabilities, legal penalties from food safety authorities, and lost
            restaurant revenue.
          </p>
        </div>

        {/* 3 Staggered Stat Cards */}
        <div
          ref={cardContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {/* Card 1: 60% Recirculated */}
          <div className="crisis-card group relative bg-cream-50 rounded-3xl p-8 border border-olive/30 shadow-lg hover:shadow-xl hover:border-amber transition-all duration-400 flex flex-col justify-between hover:-translate-y-1">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-amber/15 text-amber flex items-center justify-center font-mono font-bold">
                  <ShieldAlert className="w-5 h-5 text-amber" />
                </span>
                <span className="hud-label text-amber font-bold">
                  UNCHECKED HAZARD
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black font-mono text-amber tracking-tight">
                    {plateCount}%
                  </span>
                  <span className="hud-label text-nearblack/70">
                    RECIRCULATED
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-nearblack mt-2 group-hover:text-forest transition-colors">
                  The Return to the Plate
                </h3>
              </div>

              <p className="text-sm text-nearblack/75 leading-relaxed">
                Shockingly, nearly <strong className="text-nearblack font-semibold">60% of all Used Cooking Oil (UCO)</strong> generated
                in India finds its way back into the food stream via illegal
                black-market repackaging.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-olive/20 flex items-center justify-between text-[11px] font-mono text-nearblack/60">
              <span>Source: FSSAI Audit Reports</span>
              <span className="text-amber font-semibold">CRITICAL</span>
            </div>
          </div>

          {/* Card 2: 25% Max TPC Limit */}
          <div className="crisis-card group relative bg-cream-50 rounded-3xl p-8 border border-olive/30 shadow-lg hover:shadow-xl hover:border-forest transition-all duration-400 flex flex-col justify-between hover:-translate-y-1">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-forest/10 text-forest flex items-center justify-center font-mono font-bold">
                  <Scale className="w-5 h-5 text-forest" />
                </span>
                <span className="hud-label text-forest font-bold">
                  REGULATORY CEILING
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black font-mono text-forest tracking-tight">
                    {tpcCount}%
                  </span>
                  <span className="hud-label text-nearblack/70">
                    MAX TPC LIMIT
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-nearblack mt-2 group-hover:text-forest transition-colors">
                  The 25% Toxicity Limit
                </h3>
              </div>

              <p className="text-sm text-nearblack/75 leading-relaxed">
                Heating cooking oil beyond <strong className="text-nearblack font-semibold">25% Total Polar Compounds (TPC)</strong> causes
                hazardous polymer formation, toxic lipid peroxidation, and
                carcinogenic degradation products.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-olive/20 flex items-center justify-between text-[11px] font-mono text-nearblack/60">
              <span>Source: FSSAI Food Safety Standards</span>
              <span className="text-forest font-semibold">STATUTORY LIMIT</span>
            </div>
          </div>

          {/* Card 3: 3x Cardio Risk */}
          <div className="crisis-card group relative bg-cream-50 rounded-3xl p-8 border border-olive/30 shadow-lg hover:shadow-xl hover:border-amber transition-all duration-400 flex flex-col justify-between hover:-translate-y-1">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-amber/15 text-amber flex items-center justify-center font-mono font-bold">
                  <HeartPulse className="w-5 h-5 text-amber" />
                </span>
                <span className="hud-label text-amber font-bold">
                  PUBLIC HEALTH CRISIS
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black font-mono text-amber tracking-tight">
                    {cardioCount}x
                  </span>
                  <span className="hud-label text-nearblack/70">
                    CARDIO RISK
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-nearblack mt-2 group-hover:text-forest transition-colors">
                  The Health Hazard
                </h3>
              </div>

              <p className="text-sm text-nearblack/75 leading-relaxed">
                Consuming repeatedly heated oils accelerates atherosclerosis, creates
                severe oxidative stress, and <strong className="text-nearblack font-semibold">triples cardiovascular risk</strong> across
                vulnerable consumer demographics.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-olive/20 flex items-center justify-between text-[11px] font-mono text-nearblack/60">
              <span>Source: Clinical Toxicology Studies</span>
              <span className="text-amber font-semibold">ELEVATED DANGER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
