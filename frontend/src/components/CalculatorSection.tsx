"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Calculator, Award, Droplets, Leaf, IndianRupee, ShieldCheck, ArrowRight } from "lucide-react";

export default function CalculatorSection() {
  const [volume, setVolume] = useState(750); // Liters per month
  const ratePerLiter = 55;

  // Animated values
  const [animatedRevenue, setAnimatedRevenue] = useState(750 * 55 * 12);
  const [animatedCo2, setAnimatedCo2] = useState(Math.round(750 * 12 * 2.85));
  const [animatedWater, setAnimatedWater] = useState(750 * 12 * 1000);
  const [animatedYield, setAnimatedYield] = useState(Math.round(750 * 12 * 0.94));

  const animRef = useRef({
    revenue: 750 * 55 * 12,
    co2: Math.round(750 * 12 * 2.85),
    water: 750 * 12 * 1000,
    bioYield: Math.round(750 * 12 * 0.94),
  });

  useEffect(() => {
    const targetRev = volume * ratePerLiter * 12;
    const targetCo2 = Math.round(volume * 12 * 2.85);
    const targetWater = volume * 12 * 1000;
    const targetYield = Math.round(volume * 12 * 0.94);

    gsap.to(animRef.current, {
      revenue: targetRev,
      co2: targetCo2,
      water: targetWater,
      bioYield: targetYield,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        setAnimatedRevenue(Math.round(animRef.current.revenue));
        setAnimatedCo2(Math.round(animRef.current.co2));
        setAnimatedWater(Math.round(animRef.current.water));
        setAnimatedYield(Math.round(animRef.current.bioYield));
      },
    });
  }, [volume]);

  // 6-month projected heights (normalized percentage)
  const monthlyFactors = [1.0, 1.05, 1.1, 1.15, 1.2, 1.25];
  const maxMonthlyVal = 5000 * ratePerLiter * 1.25;

  return (
    <section className="relative py-28 bg-cream px-4 sm:px-6 lg:px-8 border-b border-olive/20 overflow-hidden">
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute top-10 left-10 w-[600px] h-[600px] bg-olive/10 rounded-full blur-[140px] -z-10"></div>
      <div className="pointer-events-none absolute bottom-10 right-10 w-[600px] h-[600px] bg-amber/10 rounded-full blur-[140px] -z-10"></div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/5 text-forest border border-olive/30 text-xs font-bold font-mono uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-amber" />
            <span className="hud-label text-nearblack/90">
              ENVIRONMENTAL YIELD &amp; FINANCIAL VALUATION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-nearblack tracking-tight leading-[1.1]">
            Track Your Green Footprint.
          </h2>

          <p className="text-nearblack/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Quantify your monthly waste-to-wealth conversion. Move the slider to calculate
            guaranteed restaurant payouts and certified carbon offsets.
          </p>
        </div>

        {/* Two Main Cards: Left Slider & Projection Chart + Right Certificate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Card: Volume Slider & 6-Month Chart */}
          <div className="lg:col-span-7 bg-cream-50 rounded-3xl p-6 sm:p-9 border border-olive/30 shadow-xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-olive/20 pb-4">
                <span className="hud-label text-olive text-xs">
                  INTERACTIVE VALUATION ENGINE
                </span>
                <span className="font-mono text-xs font-bold text-forest bg-forest/10 px-2.5 py-1 rounded-lg">
                  ₹{ratePerLiter}.00 / Liter Base
                </span>
              </div>

              {/* Slider Controller */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <label className="text-sm font-extrabold text-nearblack">
                    Select Monthly UCO Volume
                  </label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-forest">
                      {volume.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono font-bold text-nearblack/60">
                      Liters / mo
                    </span>
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="25"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-3 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-forest transition-all"
                />

                <div className="flex justify-between text-[11px] font-mono text-nearblack/60">
                  <span>50L (Café / Bistro)</span>
                  <span>1,500L (Hotel)</span>
                  <span>5,000L (Industrial)</span>
                </div>
              </div>

              {/* 6-Month Revenue Projection Bar Chart */}
              <div className="space-y-3 pt-4 border-t border-olive/20">
                <div className="flex items-center justify-between">
                  <span className="hud-label text-nearblack/70 text-[10px]">
                    6-MONTH CUMULATIVE FORECAST (M1–M6)
                  </span>
                  <span className="font-mono text-[11px] font-bold text-forest">
                    Est. M6: ₹{Math.round(volume * ratePerLiter * 1.25).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-2 sm:gap-3 items-end h-32 pt-2">
                  {monthlyFactors.map((factor, idx) => {
                    const monthVal = volume * ratePerLiter * factor;
                    const heightPercent = Math.max(15, Math.min(100, (monthVal / maxMonthlyVal) * 100));

                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <span className="text-[9px] font-mono text-nearblack/60 opacity-0 group-hover:opacity-100 transition-opacity">
                          ₹{(monthVal / 1000).toFixed(0)}k
                        </span>
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-xl transition-all duration-300 ${
                            idx === 5
                              ? "bg-amber shadow-md shadow-amber/30"
                              : "bg-forest/80 group-hover:bg-forest"
                          }`}
                        ></div>
                        <span className="text-[10px] font-mono text-nearblack/70 font-bold">
                          M{idx + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-olive/20 flex items-center justify-between text-[11px] font-mono text-nearblack/60">
              <span>Automatic Direct Bank Transfer</span>
              <span className="text-forest font-bold">Zero Collection Fees</span>
            </div>
          </div>

          {/* Right Card: Official Document Certificate of RUCO Compliance */}
          <div className="lg:col-span-5 bg-forest text-cream rounded-3xl p-6 sm:p-9 border-2 border-olive/50 shadow-2xl relative flex flex-col justify-between space-y-6">
            {/* Stamp Badge */}
            <div className="flex items-center justify-between border-b border-olive/40 pb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber" />
                <span className="hud-label text-cream text-[10px]">
                  FSSAI RUCO STATUTORY RECORD
                </span>
              </div>
              <span className="font-mono text-[10px] text-amber font-bold bg-forest-dark px-2.5 py-1 rounded-lg border border-olive/40">
                LEDGER #RUCO-2026-IND
              </span>
            </div>

            {/* Certificate Header Content */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="hud-label text-olive-light text-[9px] block">
                  OFFICIAL INSTRUMENT
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-cream">
                  Certificate of RUCO Compliance
                </h3>
                <p className="text-xs font-mono text-cream/70">
                  Ref: FSSAI Notification File No. Stds/SP/Misc-2018
                </p>
              </div>

              {/* Certificate Field Rows */}
              <div className="space-y-3 bg-forest-dark/85 p-4 rounded-2xl border border-olive/40 text-xs font-mono">
                <div className="flex justify-between border-b border-olive/20 pb-2">
                  <span className="text-cream/60">Certified Facility:</span>
                  <span className="text-cream font-bold">Grand Heritage Kitchen</span>
                </div>
                <div className="flex justify-between border-b border-olive/20 pb-2">
                  <span className="text-cream/60">Annual Sequestration:</span>
                  <span className="text-amber font-bold">{animatedCo2.toLocaleString()} kg CO₂e</span>
                </div>
                <div className="flex justify-between border-b border-olive/20 pb-2">
                  <span className="text-cream/60">Net Water Safeguard:</span>
                  <span className="text-olive-light font-bold">
                    {(animatedWater / 1000000).toFixed(1)}M Liters
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Cryptographic Hash:</span>
                  <span className="text-cream/80 truncate max-w-[140px]">
                    0xa8f49...2bc7
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => alert("Digital Certificate Claim initialized! Available upon kitchen onboarding.")}
              className="w-full py-4 px-6 rounded-2xl bg-amber hover:bg-amber-hover text-nearblack font-extrabold text-xs sm:text-sm shadow-lg shadow-amber/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
            >
              <ShieldCheck className="w-4 h-4 text-nearblack" />
              <span>Claim Site Certificate</span>
              <ArrowRight className="w-4 h-4 text-nearblack/70" />
            </button>
          </div>
        </div>

        {/* 4 Result Tiles Calculating Live */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Tile 1: Estimated Annual Revenue */}
          <div className="bg-cream-50 rounded-3xl p-6 border border-olive/30 shadow-md space-y-3 hover:border-amber transition-colors">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-amber/15 text-amber flex items-center justify-center font-bold">
                <IndianRupee className="w-5 h-5 text-amber" />
              </span>
              <span className="hud-label text-amber text-[9px]">ANNUAL EARNINGS</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-mono text-nearblack">
                ₹{animatedRevenue.toLocaleString()}
              </span>
              <p className="text-xs font-semibold text-nearblack/70 mt-1">
                Estimated Annual Revenue
              </p>
            </div>
          </div>

          {/* Tile 2: CO2 Displaced */}
          <div className="bg-cream-50 rounded-3xl p-6 border border-olive/30 shadow-md space-y-3 hover:border-forest transition-colors">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-forest/10 text-forest flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5 text-forest" />
              </span>
              <span className="hud-label text-forest text-[9px]">CLIMATE OFFSET</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-mono text-forest">
                {animatedCo2.toLocaleString()}
                <span className="text-lg font-sans font-normal text-nearblack/60 ml-1">kg</span>
              </span>
              <p className="text-xs font-semibold text-nearblack/70 mt-1">
                CO₂ Emissions Displaced
              </p>
            </div>
          </div>

          {/* Tile 3: Freshwater Protected */}
          <div className="bg-cream-50 rounded-3xl p-6 border border-olive/30 shadow-md space-y-3 hover:border-olive transition-colors">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-olive/15 text-olive flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5 text-olive" />
              </span>
              <span className="hud-label text-olive text-[9px]">AQUIFER SHIELD</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-mono text-olive">
                {(animatedWater / 1000).toLocaleString()}
                <span className="text-lg font-sans font-normal text-nearblack/60 ml-1">kL</span>
              </span>
              <p className="text-xs font-semibold text-nearblack/70 mt-1">
                Freshwater Protected
              </p>
            </div>
          </div>

          {/* Tile 4: Biofuel Yield */}
          <div className="bg-cream-50 rounded-3xl p-6 border border-olive/30 shadow-md space-y-3 hover:border-amber transition-colors">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-amber/15 text-amber flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-amber" />
              </span>
              <span className="hud-label text-amber text-[9px]">ASTM D6751</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-mono text-nearblack">
                {animatedYield.toLocaleString()}
                <span className="text-lg font-sans font-normal text-nearblack/60 ml-1">L</span>
              </span>
              <p className="text-xs font-semibold text-nearblack/70 mt-1">
                Refined Biofuel Yield
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
