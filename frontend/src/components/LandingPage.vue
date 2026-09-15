<template>
  <div class="landing-page relative text-slate-100 overflow-hidden selection:bg-emerald-500 selection:text-white">
    <!-- Ambient Background Glows -->
    <div class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl -z-10"></div>
    <div class="pointer-events-none absolute top-[1400px] left-[-200px] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] -z-10"></div>
    <div class="pointer-events-none absolute top-[2600px] right-[-150px] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[130px] -z-10"></div>

    <!-- ========================================================================= -->
    <!-- SECTION 1: THE HERO (The Visceral Hook)                                   -->
    <!-- ========================================================================= -->
    <section 
      ref="heroSection"
      @mousemove="handleHeroMouseMove"
      @mouseleave="handleHeroMouseLeave"
      class="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        <!-- Left Column: Copy & CTAs -->
        <div class="lg:col-span-7 space-y-7 text-center lg:text-left">
          <!-- Compliance Badge -->
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-emerald-950/40 animate-fade-in">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>🌿 FSSAI RUCO Verified Network</span>
            <span class="text-slate-500">&bull;</span>
            <span class="text-teal-300 font-mono">100% Closed-Loop</span>
          </div>

          <!-- Headline -->
          <h1 class="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-white">
            Stop the Toxic Cycle. <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-sm">
              Start the Green Revenue.
            </span>
          </h1>

          <!-- Sub-headline -->
          <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Join India’s smartest RUCO aggregation network. We take the hassle out of FSSAI compliance with instant QR-based disposal, cluster-based pickups, and real-time environmental tracking.
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button 
              @click="$emit('open-register')"
              class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-900/40 hover:shadow-emerald-700/60 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Join the Clean Network</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <a 
              href="#threat-section"
              class="w-full sm:w-auto px-6 py-4 bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 hover:text-white font-semibold text-sm rounded-2xl border border-slate-700/80 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Explore The 60% Threat</span>
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          <!-- Trust Badges Under Hero -->
          <div class="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black">✓</span>
              <span>₹55 - ₹60/L Guaranteed Base</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-[10px] font-black">✓</span>
              <span>Digital FSSAI Form-D Receipts</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-black">✓</span>
              <span>Zero-Interruption Cluster Fleet</span>
            </div>
          </div>
        </div>

        <!-- Right Column: 3D Isometric Transformation Graphic (Parallax Tilt) -->
        <div class="lg:col-span-5 flex items-center justify-center relative">
          <div 
            class="transform-container w-full max-w-[460px] aspect-square transition-transform duration-200 ease-out select-none"
            :style="heroParallaxStyle"
          >
            <!-- Glowing Card Base -->
            <div class="relative w-full h-full rounded-3xl bg-gradient-to-b from-slate-800/90 via-slate-900/90 to-slate-950/95 border border-slate-700/80 shadow-2xl p-6 flex flex-col justify-between backdrop-blur-xl overflow-hidden group">
              <!-- Internal ambient lighting -->
              <div class="absolute -top-24 -right-24 w-52 h-52 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-colors"></div>
              <div class="absolute -bottom-24 -left-24 w-52 h-52 bg-amber-500/15 rounded-full blur-3xl"></div>

              <!-- Top Status Indicator -->
              <div class="flex items-center justify-between z-10">
                <div class="flex items-center gap-2 bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-xl">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-wider">Metamorphosis: Live</span>
                </div>
                <button 
                  @click="toggleTransformMode" 
                  class="text-[10px] font-mono text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition cursor-pointer"
                  title="Toggle visualization state"
                >
                  {{ isTransformClean ? 'View Raw Waste' : 'View Clean Energy' }}
                </button>
              </div>

              <!-- Interactive 3D Transformation Stage -->
              <div class="relative my-auto flex items-center justify-center py-4">
                <!-- SVG Metamorphosis Asset -->
                <svg viewBox="0 0 320 280" class="w-full h-auto max-h-[260px] drop-shadow-[0_20px_40px_rgba(16,185,129,0.25)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Ground Reflection Ring -->
                  <ellipse cx="160" cy="245" rx="110" ry="24" :fill="isTransformClean ? 'url(#greenGlow)' : 'url(#darkGlow)'" opacity="0.6" />

                  <!-- Isometric Transform Canvas -->
                  <g class="transition-all duration-700 ease-in-out">
                    <!-- Left: Raw Used Oil Drum (Morphing or Fading) -->
                    <g :class="isTransformClean ? 'opacity-20 scale-95' : 'opacity-100 scale-100'" class="transition-all duration-700 origin-bottom">
                      <!-- Dirty Drum Body -->
                      <path d="M100 130 C100 115 220 115 220 130 L220 210 C220 225 100 225 100 210 Z" fill="#1e293b" stroke="#334155" stroke-width="3"/>
                      <!-- Drum Ribs -->
                      <path d="M100 155 C100 165 220 165 220 155" stroke="#475569" stroke-width="2.5" />
                      <path d="M100 185 C100 195 220 195 220 185" stroke="#475569" stroke-width="2.5" />
                      <!-- Top Rim -->
                      <ellipse cx="160" cy="130" rx="60" ry="16" fill="#0f172a" stroke="#475569" stroke-width="3" />
                      <ellipse cx="160" cy="130" rx="46" ry="11" fill="#090d16" />
                      <!-- Toxic Sludge Spill / Drip -->
                      <path d="M135 130 C135 150 142 165 142 178 C142 184 138 188 135 188 C132 188 128 184 128 178 C128 165 135 150 135 130 Z" fill="#d97706" opacity="0.85" />
                      <circle cx="135" cy="192" r="3.5" fill="#f59e0b" />
                      <!-- Warning Symbol -->
                      <polygon points="160,160 172,180 148,180" fill="#f59e0b" opacity="0.8"/>
                      <circle cx="160" cy="174" r="1.5" fill="#0f172a" />
                      <rect x="159" y="166" width="2" height="5" rx="1" fill="#0f172a" />
                    </g>

                    <!-- Center Transformation Particles Stream -->
                    <g class="transition-opacity duration-500">
                      <circle cx="160" cy="100" r="3" fill="#10b981" class="animate-bounce" />
                      <circle cx="180" cy="85" r="2" fill="#34d399" class="animate-pulse" />
                      <circle cx="140" cy="80" r="2.5" fill="#6ee7b7" class="animate-ping" />
                      <!-- Transmutation Waves -->
                      <path d="M120 90 Q 160 60 200 90" stroke="#10b981" stroke-width="2" stroke-dasharray="4 4" fill="none" opacity="0.7"/>
                      <path d="M130 110 Q 160 85 190 110" stroke="#2dd4bf" stroke-width="1.5" stroke-dasharray="3 3" fill="none" opacity="0.6"/>
                    </g>

                    <!-- Right/Transforming: Luminous Biofuel Clean Cell & Digital Leaf -->
                    <g :class="isTransformClean ? 'opacity-100 scale-100 translate-y-0' : 'opacity-30 scale-90 translate-y-3'" class="transition-all duration-700 origin-center">
                      <!-- Luminous Bio Battery Glass Hull -->
                      <rect x="115" y="90" width="90" height="135" rx="20" fill="url(#batteryGlass)" stroke="#10b981" stroke-width="2.5" />
                      <!-- Top Cathode Cap -->
                      <rect x="145" y="78" width="30" height="12" rx="4" fill="#34d399" stroke="#059669" stroke-width="1.5" />
                      <!-- Biofuel Level (Liquid Wave) -->
                      <path d="M116 145 Q 138 140 160 145 T 204 145 L204 205 C204 216 195 224 185 224 L135 224 C124 224 116 216 116 205 Z" fill="url(#biofuelLiquid)" />
                      <!-- Digital Circuit Bio-Leaf Inside -->
                      <path d="M160 115 C178 128 178 165 160 178 C142 165 142 128 160 115 Z" fill="#10b981" opacity="0.9" />
                      <path d="M160 120 L160 172" stroke="#ecfdf5" stroke-width="2" stroke-linecap="round" />
                      <path d="M160 135 L170 128" stroke="#ecfdf5" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M160 148 L150 141" stroke="#ecfdf5" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M160 160 L169 154" stroke="#ecfdf5" stroke-width="1.5" stroke-linecap="round" />
                      <!-- Battery Energy Level Indicators -->
                      <circle cx="160" cy="200" r="4" fill="#ecfdf5" class="animate-pulse" />
                    </g>
                  </g>

                  <!-- Gradients -->
                  <defs>
                    <radialGradient id="greenGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#10b981" stop-opacity="0.8"/>
                      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="darkGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.4"/>
                      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                    </radialGradient>
                    <linearGradient id="batteryGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.8"/>
                      <stop offset="100%" stop-color="#022c22" stop-opacity="0.9"/>
                    </linearGradient>
                    <linearGradient id="biofuelLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#34d399" stop-opacity="0.9"/>
                      <stop offset="100%" stop-color="#059669" stop-opacity="0.95"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <!-- Bottom Floating Telemetry -->
              <div class="grid grid-cols-2 gap-3 z-10 pt-2 border-t border-slate-800">
                <div class="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                  <div class="text-[10px] text-slate-400 font-mono uppercase">Raw Input State</div>
                  <div class="text-xs font-bold text-amber-400 flex items-center gap-1.5 mt-0.5">
                    <span>🛢️</span> Toxic Carcinogen
                  </div>
                </div>
                <div class="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                  <div class="text-[10px] text-slate-400 font-mono uppercase">Output Conversion</div>
                  <div class="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <span>⚡</span> 100% Green Biofuel
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================================================= -->
    <!-- SECTION 2: THE THREAT (The 60% Crisis in Your Kitchen)                     -->
    <!-- ========================================================================= -->
    <section 
      id="threat-section"
      ref="threatSection"
      class="relative py-24 bg-gradient-to-b from-slate-950 via-neutral-950 to-slate-950 border-y border-neutral-800/80 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-7xl mx-auto space-y-16">
        <!-- Section Header -->
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold font-mono uppercase tracking-wider">
            <span>⚠️</span> The Unregulated Danger
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The 60% Crisis in Your Kitchen.
          </h2>
          <p class="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every liter of unmonitored used cooking oil represents severe health liabilities, legal penalties from food safety authorities, and lost restaurant revenue.
          </p>
        </div>

        <!-- 3 Pillars of The Threat with Animated Scroll Counters -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Pillar 1: 60% Return to the Plate -->
          <div class="relative bg-neutral-900/90 rounded-3xl p-8 border border-neutral-800 shadow-2xl hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div class="space-y-4">
              <div class="flex items-baseline gap-2">
                <span class="text-5xl sm:text-6xl font-black font-mono text-rose-500 tracking-tight">
                  {{ countPlate }}%
                </span>
                <span class="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">Recirculated</span>
              </div>
              <h3 class="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                The Return to the Plate
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Shockingly, nearly <strong class="text-slate-200">60% of all Used Cooking Oil (UCO)</strong> generated in India finds its way back into the food stream via illegal black-market repackaging.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Source: FSSAI Audit Reports</span>
              <span class="text-rose-400 font-bold">Unchecked Hazard</span>
            </div>
          </div>

          <!-- Pillar 2: 25% Toxicity Limit -->
          <div class="relative bg-neutral-900/90 rounded-3xl p-8 border border-neutral-800 shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div class="space-y-4">
              <div class="flex items-baseline gap-2">
                <span class="text-5xl sm:text-6xl font-black font-mono text-amber-400 tracking-tight">
                  {{ countTpc }}%
                </span>
                <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">Max TPC Limit</span>
              </div>
              <h3 class="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                The 25% Toxicity Limit
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Every time oil is reheated, toxic <strong class="text-slate-200">Total Polar Compounds (TPC)</strong> multiply. The FSSAI mandates oil with a TPC above 25% is strictly unsafe for human consumption.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Regulation: FSSAI Gazette 2018</span>
              <span class="text-amber-400 font-bold">Mandatory Testing</span>
            </div>
          </div>

          <!-- Pillar 3: The Health Hazard -->
          <div class="relative bg-neutral-900/90 rounded-3xl p-8 border border-neutral-800 shadow-2xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div class="space-y-4">
              <div class="flex items-baseline gap-2">
                <span class="text-5xl sm:text-6xl font-black font-mono text-cyan-400 tracking-tight">
                  3×
                </span>
                <span class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Cardio Risk</span>
              </div>
              <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                The Health Hazard
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Reusing degraded oil is directly linked to <strong class="text-slate-200">hypertension, liver diseases, atherosclerosis, and Alzheimer's</strong> through carcinogenic oxidation products.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Clinical Impact: Medical Consensus</span>
              <span class="text-cyan-400 font-bold">Permanent Organ Stress</span>
            </div>
          </div>
        </div>

        <!-- Interactive TPC Degradation Scale -->
        <div class="bg-neutral-900/80 rounded-3xl p-6 sm:p-8 border border-neutral-800 space-y-4 max-w-4xl mx-auto">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 class="text-sm font-bold text-white flex items-center gap-2">
              <span>🧪</span> Real-Time Cooking Oil Degradation Spectrum (TPC %)
            </h4>
            <span class="text-xs font-mono text-slate-400">Move slider to simulate kitchen reheating</span>
          </div>

          <div class="space-y-2">
            <input 
              type="range" 
              v-model.number="simulatedTpc" 
              min="8" 
              max="40" 
              step="1"
              class="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600"
            />
            <div class="flex justify-between text-[11px] font-mono text-slate-400">
              <span>8% Fresh Oil</span>
              <span class="text-amber-400 font-bold">25% Legal Threshold</span>
              <span class="text-rose-500 font-bold">40% Severe Carcinogen</span>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between text-xs">
            <div>
              <span class="text-slate-400">Current Simulated TPC: </span>
              <span class="font-mono font-black text-sm" :class="simulatedTpc <= 22 ? 'text-emerald-400' : (simulatedTpc <= 25 ? 'text-amber-400' : 'text-rose-500')">
                {{ simulatedTpc }}%
              </span>
            </div>
            <div class="font-bold font-mono text-[11px]" :class="simulatedTpc <= 25 ? 'text-emerald-400' : 'text-rose-400'">
              {{ simulatedTpc <= 22 ? '✓ Clean & Eligible for ₹5/L Quality Bonus' : (simulatedTpc <= 25 ? '⚠️ Near Safety Threshold (Standard Rate)' : '⛔ ILLEGAL REUSE - Mandatory Disposal Required') }}
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================================================= -->
    <!-- SECTION 3: THE "SCAN & DONE" SOLUTION (Frictionless Disposal)             -->
    <!-- ========================================================================= -->
    <section class="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono uppercase tracking-wider">
          <span>⚡</span> The "Scan & Done" Solution
        </div>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Frictionless Disposal. Zero Interruptions.
        </h2>
        <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
          Transition from hazardous kitchen waste to guaranteed revenue in seconds. No paperwork, no disputes, no downtime during dinner service.
        </p>
      </div>

      <!-- Animated Van & Route Line Pipeline -->
      <div class="relative max-w-5xl mx-auto">
        <!-- Interactive Step Selector Tabs -->
        <div class="flex items-center justify-center gap-2 sm:gap-4 mb-8">
          <button 
            v-for="(step, idx) in processSteps" 
            :key="idx"
            @click="activeProcessStep = idx"
            :class="activeProcessStep === idx ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30' : 'bg-slate-800/80 text-slate-400 hover:text-white'"
            class="px-3.5 sm:px-5 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-2 border border-slate-700/60"
          >
            <span>Step {{ idx + 1 }}</span>
            <span class="hidden sm:inline">&bull; {{ step.badge }}</span>
          </button>
        </div>

        <!-- Visual Animated Pipeline Canvas -->
        <div class="relative bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <!-- Ambient Glow inside pipeline -->
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 pointer-events-none"></div>

          <!-- The Route Line SVG with moving Van -->
          <div class="relative py-6">
            <svg viewBox="0 0 800 120" class="w-full h-auto overflow-visible select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Background Route Track -->
              <path d="M 60 60 L 740 60" stroke="#1e293b" stroke-width="8" stroke-linecap="round"/>
              
              <!-- Illuminated Active Route Progress Line -->
              <path 
                d="M 60 60 L 740 60" 
                stroke="url(#routeGradient)" 
                stroke-width="8" 
                stroke-linecap="round"
                :stroke-dasharray="680"
                :stroke-dashoffset="680 - (activeProcessStep * 340)"
                class="transition-all duration-700 ease-out"
              />

              <!-- Waypoint 1: Register & QR -->
              <g class="cursor-pointer" @click="activeProcessStep = 0">
                <circle cx="60" cy="60" r="22" :fill="activeProcessStep >= 0 ? '#10b981' : '#334155'" class="transition-colors duration-500" />
                <circle cx="60" cy="60" r="14" fill="#0f172a" />
                <text x="60" y="64" text-anchor="middle" fill="#ecfdf5" font-family="monospace" font-size="12" font-weight="bold">1</text>
                <text x="60" y="105" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Register & QR</text>
              </g>

              <!-- Waypoint 2: Cluster Pickups -->
              <g class="cursor-pointer" @click="activeProcessStep = 1">
                <circle cx="400" cy="60" r="22" :fill="activeProcessStep >= 1 ? '#10b981' : '#334155'" class="transition-colors duration-500" />
                <circle cx="400" cy="60" r="14" fill="#0f172a" />
                <text x="400" y="64" text-anchor="middle" fill="#ecfdf5" font-family="monospace" font-size="12" font-weight="bold">2</text>
                <text x="400" y="105" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Cluster Pickups</text>
              </g>

              <!-- Waypoint 3: Scan & Done (Glowing Target QR) -->
              <g class="cursor-pointer" @click="activeProcessStep = 2">
                <circle cx="740" cy="60" r="24" :fill="activeProcessStep === 2 ? '#10b981' : '#334155'" class="transition-colors duration-500" />
                <circle cx="740" cy="60" r="28" stroke="#10b981" stroke-width="2" stroke-dasharray="4 4" class="animate-spin origin-center" v-if="activeProcessStep === 2" />
                <circle cx="740" cy="60" r="15" fill="#022c22" />
                <!-- QR Icon inside circle -->
                <rect x="734" y="54" width="4" height="4" fill="#34d399"/>
                <rect x="742" y="54" width="4" height="4" fill="#34d399"/>
                <rect x="734" y="62" width="4" height="4" fill="#34d399"/>
                <rect x="742" y="62" width="4" height="4" fill="#34d399"/>
                <text x="740" y="105" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">Scan & Done</text>
              </g>

              <!-- Animated EV Collection Van along the route line -->
              <g 
                :transform="`translate(${vanPositions[activeProcessStep]}, 25)`" 
                class="transition-transform duration-700 ease-in-out cursor-pointer"
              >
                <!-- Shadow below van -->
                <ellipse cx="28" cy="48" rx="26" ry="6" fill="#000" opacity="0.4" />
                
                <!-- Electric Van Body -->
                <rect x="4" y="12" width="48" height="26" rx="6" fill="#059669" stroke="#34d399" stroke-width="1.5" />
                <!-- Van Cabin Windshield -->
                <path d="M 38 15 L 50 24 L 50 34 L 38 34 Z" fill="#064e3b" />
                <!-- Eco Leaf Decal on Van -->
                <circle cx="22" cy="24" r="6" fill="#ecfdf5" />
                <path d="M22 20 C25 22 25 26 22 28 C19 26 19 22 22 20 Z" fill="#10b981" />
                <!-- Wheels -->
                <circle cx="16" cy="38" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
                <circle cx="42" cy="38" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
                <!-- Headlight Beam -->
                <polygon points="52,26 70,20 70,36 52,32" fill="#34d399" opacity="0.35"/>
              </g>

              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#10b981"/>
                  <stop offset="50%" stop-color="#2dd4bf"/>
                  <stop offset="100%" stop-color="#38bdf8"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <!-- Active Step Detail Card -->
          <div class="mt-10 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-700/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div class="md:col-span-8 space-y-2">
              <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold font-mono text-xs flex items-center justify-center border border-emerald-500/30">
                  0{{ activeProcessStep + 1 }}
                </span>
                <h3 class="text-lg sm:text-xl font-bold text-white">
                  {{ processSteps[activeProcessStep].title }}
                </h3>
              </div>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {{ processSteps[activeProcessStep].description }}
              </p>
            </div>

            <div class="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
              <span class="text-3xl">{{ processSteps[activeProcessStep].icon }}</span>
              <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                {{ processSteps[activeProcessStep].sub }}
              </span>
              <button 
                @click="advanceProcessStep" 
                class="text-[11px] font-semibold text-slate-400 hover:text-white flex items-center gap-1 mt-1 transition cursor-pointer"
              >
                <span>Next Stage</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================================================= -->
    <!-- SECTION 4: THE IMPACT & THE REWARD (Track Your Green Footprint)           -->
    <!-- ========================================================================= -->
    <section class="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto space-y-16">
        <!-- Section Header -->
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold font-mono uppercase tracking-wider">
            <span>📊</span> The Impact & The Reward
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Track Your Green Footprint.
          </h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every registered food business gains access to an automated, tamper-proof ESG dashboard. Simulate your kitchen’s monthly volume below.
          </p>
        </div>

        <!-- Interactive Volume Slider Controller -->
        <div class="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="text-xs font-mono uppercase text-slate-400 font-semibold">Simulate Monthly UCO Volume</span>
              <div class="text-2xl font-black text-white font-mono mt-0.5">{{ monthlyLiters }} Liters / Month</div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-400">Quality:</span>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                ₹58 / L (Net Payout Tier)
              </span>
            </div>
          </div>

          <input 
            type="range" 
            v-model.number="monthlyLiters" 
            min="50" 
            max="2500" 
            step="25"
            class="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div class="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Small Cafe (50L)</span>
            <span>Standard Restaurant (500L)</span>
            <span>Cloud Kitchen / Hotel (2500L)</span>
          </div>
        </div>

        <!-- Glassmorphism "Impact Preview" Dashboard Card -->
        <div class="max-w-5xl mx-auto relative group">
          <!-- Glass Card Outer Glow -->
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

          <!-- Frosted Glass Interface Snippet -->
          <div class="relative rounded-3xl bg-slate-900/70 border border-slate-700/80 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8">
            <!-- Simulated Dashboard Top Bar -->
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-black text-white text-base shadow-md">
                  🍽️
                </div>
                <div>
                  <div class="text-sm font-bold text-white flex items-center gap-2">
                    <span>Royal Palm Kitchen & Bistro</span>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      RUCO Certified
                    </span>
                  </div>
                  <div class="text-xs text-slate-400 font-mono">FSSAI ID: 11521034000123 &bull; Node: Maharashtra Central</div>
                </div>
              </div>

              <!-- Instant Certificate Action -->
              <div class="flex items-center gap-2">
                <button 
                  @click="$emit('open-register')"
                  class="px-3.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-semibold border border-emerald-500/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>📜</span>
                  <span>View Official PDF Cert</span>
                </button>
              </div>
            </div>

            <!-- The 4 Core Metrics Required by Blueprint -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <!-- Metric 1: Liters Recycled -->
              <div class="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-emerald-500/40 transition">
                <div class="flex items-center justify-between text-xs text-slate-400">
                  <span>Liters Recycled</span>
                  <span class="text-emerald-400">🛢️</span>
                </div>
                <div class="text-3xl font-black text-white font-mono tracking-tight">
                  {{ formatNumber(monthlyLiters) }} <span class="text-sm font-normal text-slate-400">L</span>
                </div>
                <div class="text-[11px] text-emerald-400 font-medium">
                  100% Diverted to Biodiesel
                </div>
              </div>

              <!-- Metric 2: Revenue Generated (INR) -->
              <div class="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-emerald-500/40 transition">
                <div class="flex items-center justify-between text-xs text-slate-400">
                  <span>Revenue Generated</span>
                  <span class="text-emerald-400">₹</span>
                </div>
                <div class="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                  ₹{{ formatNumber(monthlyLiters * 58) }}
                </div>
                <div class="text-[11px] text-slate-400 font-medium">
                  Direct Bank / UPI Transfer
                </div>
              </div>

              <!-- Metric 3: Carbon Offset (Kg CO2) -->
              <div class="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-teal-500/40 transition">
                <div class="flex items-center justify-between text-xs text-slate-400">
                  <span>Carbon Offset</span>
                  <span class="text-teal-400">🌱</span>
                </div>
                <div class="text-3xl font-black text-teal-300 font-mono tracking-tight">
                  {{ formatNumber(Math.round(monthlyLiters * 2.85)) }} <span class="text-sm font-normal text-slate-400">Kg</span>
                </div>
                <div class="text-[11px] text-teal-400 font-medium">
                  Equivalent to {{ (monthlyLiters * 0.12).toFixed(0) }} Trees Planted
                </div>
              </div>

              <!-- Metric 4: Water Saved -->
              <div class="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-cyan-500/40 transition">
                <div class="flex items-center justify-between text-xs text-slate-400">
                  <span>Clean Water Saved</span>
                  <span class="text-cyan-400">💧</span>
                </div>
                <div class="text-3xl font-black text-cyan-300 font-mono tracking-tight">
                  {{ formatNumber(monthlyLiters * 24000) }} <span class="text-sm font-normal text-slate-400">L</span>
                </div>
                <div class="text-[11px] text-cyan-400 font-medium">
                  Shielded from Municipal Drains
                </div>
              </div>
            </div>

            <!-- Simulated Recent Immutable Ledger Rows -->
            <div class="space-y-3 pt-2">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span>Recent Live Collections (Automated QR Ledger)</span>
                <span class="text-emerald-400">● Real-Time Active</span>
              </div>
              <div class="divide-y divide-slate-800/80 bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden text-xs">
                <div class="p-3.5 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="font-mono text-teal-400 font-bold">#RCT-8921</span>
                    <span class="text-white">Morning Kitchen Run</span>
                    <span class="text-[11px] text-slate-400 font-mono">TPC: 19.4% (Bonus)</span>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="font-mono font-bold text-white">120 Liters</span>
                    <span class="text-emerald-400 font-mono font-bold">₹7,200</span>
                    <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold">Settled</span>
                  </div>
                </div>
                <div class="p-3.5 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="font-mono text-teal-400 font-bold">#RCT-8840</span>
                    <span class="text-white">Mid-Week Deep Fry Flush</span>
                    <span class="text-[11px] text-slate-400 font-mono">TPC: 21.0% (Standard)</span>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="font-mono font-bold text-white">200 Liters</span>
                    <span class="text-emerald-400 font-mono font-bold">₹11,600</span>
                    <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold">Settled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================================================= -->
    <!-- SECTION 5: FINAL CTA (Closing the Loop)                                   -->
    <!-- ========================================================================= -->
    <section class="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center space-y-8">
      <div class="max-w-4xl mx-auto space-y-6">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono uppercase tracking-wider">
          <span>🚀</span> Ready to Onboard?
        </div>

        <h2 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Ready to Clean Up Your Kitchen and Your Conscience?
        </h2>

        <p class="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Registration takes 60 seconds. Our agents take care of the rest.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            @click="$emit('open-register')"
            class="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-base rounded-2xl shadow-2xl shadow-emerald-900/60 transition transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-3"
          >
            <span>Start Frictionless Onboarding</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button 
            @click="$emit('open-login')"
            class="w-full sm:w-auto px-8 py-5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-base rounded-2xl border border-slate-700 transition cursor-pointer"
          >
            Already Registered? Sign In
          </button>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- STICKY BOTTOM MOBILE ACTION BAR (Directive from Section 5)                -->
    <!-- ========================================================================= -->
    <div class="sm:hidden fixed bottom-4 inset-x-4 z-40">
      <button 
        @click="$emit('open-register')"
        class="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm rounded-2xl shadow-2xl shadow-emerald-950 flex items-center justify-between border border-emerald-400/40 cursor-pointer"
      >
        <span class="flex items-center gap-2">
          <span>🌿</span>
          <span>Register Now &bull; Free Site QR</span>
        </span>
        <span class="text-xs bg-black/30 px-2 py-1 rounded-lg font-mono">60s Setup &rarr;</span>
      </button>
    </div>

    <!-- Footer -->
    <footer class="border-t border-slate-800 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-3">
      <div class="flex items-center justify-center gap-2 text-slate-300 font-bold">
        <span>GeoField Bio-Logistics Network</span>
        <span>&bull;</span>
        <span class="text-emerald-400">FSSAI RUCO Compliant</span>
      </div>
      <p class="max-w-2xl mx-auto leading-relaxed">
        Enforcing national Used Cooking Oil compliance, preventing toxic recirculation, and powering downstream biodiesel conversion.
      </p>
      <p class="text-[11px] text-slate-600 font-mono">
        Tamper-Evident SHA-256 Ledger &bull; Offline-First PWA &bull; Sub-1.5s Fast Path Engine
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const emit = defineEmits(['open-register', 'open-login']);

// Hero 3D Parallax Tilt State
const heroSection = ref(null);
const heroMouseX = ref(0);
const heroMouseY = ref(0);
const isTransformClean = ref(true);

function handleHeroMouseMove(e) {
  if (!heroSection.value) return;
  const rect = heroSection.value.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  heroMouseX.value = (x / (rect.width / 2)) * 12; // max 12 deg
  heroMouseY.value = -(y / (rect.height / 2)) * 12;
}

function handleHeroMouseLeave() {
  heroMouseX.value = 0;
  heroMouseY.value = 0;
}

const heroParallaxStyle = computed(() => {
  return {
    transform: `perspective(1000px) rotateX(${heroMouseY.value}deg) rotateY(${heroMouseX.value}deg)`,
  };
});

function toggleTransformMode() {
  isTransformClean.value = !isTransformClean.value;
}

// Section 2 Scroll-Triggered Animated Counters
const threatSection = ref(null);
const countPlate = ref(0);
const countTpc = ref(0);
const simulatedTpc = ref(20);
let hasAnimatedCounters = false;

function startCounterAnimation() {
  if (hasAnimatedCounters) return;
  hasAnimatedCounters = true;

  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out quad
    const ease = 1 - (1 - progress) * (1 - progress);

    countPlate.value = Math.round(ease * 60);
    countTpc.value = Math.round(ease * 25);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Section 3: Animated Van & Pipeline Steps
const activeProcessStep = ref(0);
const vanPositions = [60, 400, 740]; // Van coordinate mapping

const processSteps = [
  {
    title: 'Register & Get Your QR',
    badge: 'Step 1',
    icon: '🏷️',
    sub: 'Physical & Digital Sticker',
    description: 'Sign up and receive a unique, waterproof physical/digital QR code assigned directly to your restaurant site for immediate kitchen placement.'
  },
  {
    title: 'Cluster-Based Pickups',
    badge: 'Step 2',
    icon: '🚛',
    sub: 'Hyper-Local Fleet',
    description: 'Our hyper-local, region-based fleet operates on optimized cluster routes, ensuring your UCO is picked up quickly, cleanly, and consistently without interrupting dinner service.'
  },
  {
    title: 'Scan & Done',
    badge: 'Step 3',
    icon: '⚡',
    sub: 'Instant FSSAI Receipt',
    description: 'When our agent arrives, simply let them scan your restaurant\'s QR code. The app automatically logs the weight, generates your digital FSSAI-compliant receipt, and the agent handles the rest.'
  }
];

function advanceProcessStep() {
  activeProcessStep.value = (activeProcessStep.value + 1) % processSteps.length;
}

// Section 4: Interactive Dashboard Impact Preview
const monthlyLiters = ref(450);

function formatNumber(num) {
  return Number(num || 0).toLocaleString('en-IN');
}

// Set up IntersectionObserver for Section 2 scroll counting
onMounted(() => {
  if ('IntersectionObserver' in window && threatSection.value) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounterAnimation();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(threatSection.value);
  } else {
    // Fallback if observer not supported
    startCounterAnimation();
  }
});
</script>
