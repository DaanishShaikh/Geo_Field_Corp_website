<template>
  <div class="landing-page relative text-slate-100 overflow-hidden selection:bg-emerald-500 selection:text-white">
    <!-- Interactive Background Particle Canvas -->
    <canvas ref="particleCanvas" class="pointer-events-none absolute inset-0 -z-10 w-full h-full opacity-60"></canvas>

    <!-- Ambient Glowing Nebulae -->
    <div class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent blur-[120px] -z-10 animate-pulse-slow"></div>
    <div class="pointer-events-none absolute top-[1300px] left-[-220px] w-[700px] h-[700px] bg-rose-600/10 rounded-full blur-[150px] -z-10"></div>
    <div class="pointer-events-none absolute top-[2500px] right-[-180px] w-[650px] h-[650px] bg-teal-500/15 rounded-full blur-[140px] -z-10"></div>

    <!-- ========================================================================= -->
    <!-- SECTION 1: THE HERO (The Visceral Hook)                                   -->
    <!-- ========================================================================= -->
    <section 
      ref="heroSection"
      @mousemove="handleHeroMouseMove"
      @mouseleave="handleHeroMouseLeave"
      class="relative min-h-[94vh] flex items-center justify-center pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        <!-- Left Column: Copy & Interactive CTAs -->
        <div class="lg:col-span-7 space-y-7 text-center lg:text-left">
          <!-- Compliance Live Pulse Badge -->
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-xl shadow-emerald-950/50 hover:border-emerald-400 transition-colors">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span>🌿 FSSAI RUCO Verified Network</span>
            <span class="text-slate-600">&bull;</span>
            <span class="text-teal-300 font-mono">100% Closed-Loop</span>
          </div>

          <!-- Headline -->
          <h1 class="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-white">
            Stop the Toxic Cycle. <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_4px_24px_rgba(52,211,153,0.3)]">
              Start the Green Revenue.
            </span>
          </h1>

          <!-- Sub-headline -->
          <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Join India’s smartest RUCO aggregation network. We take the hassle out of FSSAI compliance with instant QR-based disposal, cluster-based pickups, and real-time environmental tracking.
          </p>

          <!-- Magnetic Shimmering Action CTAs -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <!-- Primary Magnetic Shimmer Button -->
            <button 
              @click="$emit('open-register')"
              class="relative group w-full sm:w-auto p-[2px] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/60 transition-transform duration-300 hover:scale-105 active:scale-98 cursor-pointer"
            >
              <!-- Spinning Conic Gradient Neon Border -->
              <span class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#059669_0%,#34d399_50%,#38bdf8_100%)]"></span>
              <span class="relative flex items-center justify-center gap-3 px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm rounded-2xl backdrop-blur-xl transition-colors">
                <span class="text-emerald-400 text-base">⚡</span>
                <span>Join the Clean Network</span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            <!-- Secondary Cinematic Explore Link -->
            <a 
              href="#threat-section"
              class="w-full sm:w-auto px-6 py-4 bg-slate-900/80 hover:bg-slate-800/90 text-slate-300 hover:text-white font-semibold text-sm rounded-2xl border border-slate-700/80 hover:border-slate-500 transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-md"
            >
              <span class="text-rose-400 group-hover:scale-125 transition-transform">⚠️</span>
              <span>Explore The 60% Crisis</span>
              <svg class="w-4 h-4 text-slate-400 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          <!-- Live Compliance Mini-Badges -->
          <div class="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
            <div class="flex items-center gap-2 hover:text-slate-200 transition-colors cursor-default">
              <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black border border-emerald-500/30">₹</span>
              <span>₹55 - ₹60/L Guaranteed Base</span>
            </div>
            <div class="flex items-center gap-2 hover:text-slate-200 transition-colors cursor-default">
              <span class="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-[10px] font-black border border-teal-500/30">📜</span>
              <span>Digital Form-D Certificates</span>
            </div>
            <div class="flex items-center gap-2 hover:text-slate-200 transition-colors cursor-default">
              <span class="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-black border border-cyan-500/30">⚡</span>
              <span>Zero-Interruption Cluster Fleet</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Interactive 3D Biofuel Transmutation Reactor -->
        <div class="lg:col-span-5 flex items-center justify-center relative">
          <div 
            class="w-full max-w-[480px] aspect-square transition-transform duration-200 ease-out select-none"
            :style="heroParallaxStyle"
          >
            <!-- Glowing Reactor Glass Card -->
            <div class="relative w-full h-full rounded-3xl bg-slate-900/85 border border-slate-700/80 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] p-6 flex flex-col justify-between backdrop-blur-2xl overflow-hidden group">
              <!-- Animated Edge Flare -->
              <div class="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/40 transition-colors duration-700"></div>
              <div class="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Reactor Top Controls -->
              <div class="flex items-center justify-between z-10">
                <div class="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl shadow-inner">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span class="text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                    {{ activeReactorTier.label }}
                  </span>
                </div>
                <!-- Interactive Tier Switcher -->
                <div class="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                  <button 
                    v-for="(tier, idx) in reactorTiers" 
                    :key="idx"
                    @click="selectedReactorTier = idx"
                    :class="selectedReactorTier === idx ? 'bg-emerald-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'"
                    class="px-2 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer"
                    :title="tier.tooltip"
                  >
                    {{ tier.code }}
                  </button>
                </div>
              </div>

              <!-- Animated 3D Isometric SVG Reactor Core -->
              <div class="relative my-auto flex items-center justify-center py-2">
                <svg viewBox="0 0 340 300" class="w-full h-auto max-h-[280px] drop-shadow-[0_25px_50px_rgba(16,185,129,0.25)] overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Reactor Base Platform -->
                  <ellipse cx="170" cy="260" rx="120" ry="26" fill="url(#platformGlow)" opacity="0.7" />
                  <ellipse cx="170" cy="256" rx="90" ry="18" fill="#0f172a" stroke="#334155" stroke-width="2" />

                  <!-- Reactor Outer Glass Cylinder -->
                  <rect x="110" y="80" width="120" height="165" rx="24" fill="url(#reactorGlass)" stroke="#334155" stroke-width="2.5" />
                  
                  <!-- Fluid Level with Animated Sine Wave -->
                  <g class="transition-all duration-700">
                    <path 
                      :d="reactorFluidPath" 
                      :fill="activeReactorTier.liquidGradient"
                      class="transition-colors duration-700"
                    />
                  </g>

                  <!-- Animated Rising Micro-Bubbles -->
                  <circle cx="140" cy="180" r="3.5" :fill="activeReactorTier.bubbleColor" class="animate-bounce" opacity="0.8" />
                  <circle cx="180" cy="195" r="2.5" :fill="activeReactorTier.bubbleColor" class="animate-pulse" opacity="0.9" />
                  <circle cx="160" cy="150" r="4.5" :fill="activeReactorTier.bubbleColor" class="animate-ping" opacity="0.7" />
                  <circle cx="200" cy="165" r="2" :fill="activeReactorTier.bubbleColor" opacity="0.75" />

                  <!-- Central Bio-Circuit Leaf / Chemical Ring -->
                  <g class="transition-all duration-500">
                    <path d="M170 120 C190 135 190 175 170 190 C150 175 150 135 170 120 Z" :fill="activeReactorTier.coreColor" opacity="0.9" />
                    <path d="M170 125 L170 185" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.8" />
                    <path d="M170 142 L182 134" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
                    <path d="M170 158 L158 150" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
                    <path d="M170 172 L180 166" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
                  </g>

                  <!-- Reactor Magnetic Containment Rings -->
                  <ellipse cx="170" cy="80" rx="60" ry="14" fill="#1e293b" stroke="#475569" stroke-width="3" />
                  <ellipse cx="170" cy="80" rx="42" ry="9" fill="#090d16" />
                  <rect x="155" y="65" width="30" height="16" rx="4" fill="#047857" stroke="#10b981" stroke-width="1.5" />

                  <!-- Rotating Energy Sparks (SVG dashes) -->
                  <circle cx="170" cy="162" r="54" stroke="#34d399" stroke-width="1.5" stroke-dasharray="6 8" class="animate-[spin_8s_linear_infinite] origin-center" opacity="0.45" />

                  <!-- Gradients -->
                  <defs>
                    <radialGradient id="platformGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#10b981" stop-opacity="0.8"/>
                      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
                    </radialGradient>
                    <linearGradient id="reactorGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.7"/>
                      <stop offset="100%" stop-color="#022c22" stop-opacity="0.8"/>
                    </linearGradient>
                    <linearGradient id="biofuelClean" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#34d399" stop-opacity="0.95"/>
                      <stop offset="100%" stop-color="#059669" stop-opacity="0.98"/>
                    </linearGradient>
                    <linearGradient id="biofuelStandard" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.95"/>
                      <stop offset="100%" stop-color="#d97706" stop-opacity="0.98"/>
                    </linearGradient>
                    <linearGradient id="biofuelSludge" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.95"/>
                      <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0.98"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <!-- Interactive Telemetry Footer -->
              <div class="grid grid-cols-2 gap-3 z-10 pt-2 border-t border-slate-800">
                <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <div class="text-[10px] text-slate-400 font-mono uppercase">Total Polar Compounds</div>
                  <div class="text-xs font-black font-mono mt-0.5" :class="activeReactorTier.tpcColor">
                    {{ activeReactorTier.tpcValue }}
                  </div>
                </div>
                <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <div class="text-[10px] text-slate-400 font-mono uppercase">Payout Status</div>
                  <div class="text-xs font-black font-mono mt-0.5 text-emerald-400">
                    {{ activeReactorTier.payoutTier }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================================================= -->
    <!-- SECTION 2: THE THREAT - WITH PLAYABLE BIOHAZARD HUD SCANNER              -->
    <!-- ========================================================================= -->
    <section 
      id="threat-section"
      ref="threatSection"
      class="relative py-24 bg-gradient-to-b from-slate-950 via-neutral-950 to-slate-950 border-y border-neutral-800/80 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-7xl mx-auto space-y-16">
        <!-- Section Header -->
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold font-mono uppercase tracking-wider animate-pulse">
            <span>⚠️</span> The Unregulated Danger
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The 60% Crisis in Your Kitchen.
          </h2>
          <p class="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every liter of unmonitored used cooking oil represents severe health liabilities, legal penalties from food safety authorities, and lost restaurant revenue.
          </p>
        </div>

        <!-- 3 Pillars of The Threat with Animated Scroll Counting -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Pillar 1: 60% Return to the Plate -->
          <div class="relative bg-neutral-900/90 rounded-3xl p-8 border border-neutral-800 shadow-2xl hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div class="space-y-4">
              <div class="flex items-baseline gap-2">
                <span class="text-5xl sm:text-6xl font-black font-mono text-rose-500 tracking-tight drop-shadow-[0_4px_16px_rgba(244,63,94,0.4)]">
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
          <div class="relative bg-neutral-900/90 rounded-3xl p-8 border border-neutral-800 shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div class="space-y-4">
              <div class="flex items-baseline gap-2">
                <span class="text-5xl sm:text-6xl font-black font-mono text-amber-400 tracking-tight drop-shadow-[0_4px_16px_rgba(245,158,11,0.4)]">
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
          <div class="relative bg-neutral-900/90 rounded-3xl p-8 border border-neutral-800 shadow-2xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div class="space-y-4">
              <div class="flex items-baseline gap-2">
                <span class="text-5xl sm:text-6xl font-black font-mono text-cyan-400 tracking-tight drop-shadow-[0_4px_16px_rgba(34,211,238,0.4)]">
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

        <!-- PLAYABLE BIOHAZARD HUD SCANNER (Interactive Tool) -->
        <div class="bg-neutral-900/90 rounded-3xl p-6 sm:p-8 border border-neutral-800 space-y-6 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
                <h4 class="text-base font-bold text-white">Live Kitchen Toxicity & Degradation Scanner</h4>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Click any specimen to inspect its microscopic chemical profile</p>
            </div>
            <span class="text-xs font-mono text-teal-400 px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
              HUD Sensor Mode: Active
            </span>
          </div>

          <!-- Specimen Selector Tabs -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button 
              v-for="(specimen, idx) in specimens" 
              :key="idx"
              @click="activeSpecimen = idx"
              :class="activeSpecimen === idx ? 'bg-neutral-950 border-rose-500/80 shadow-lg' : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'"
              class="p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between"
            >
              <div>
                <div class="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{{ specimen.icon }}</span>
                  <span>{{ specimen.name }}</span>
                </div>
                <div class="text-[10px] text-slate-400 mt-1 font-mono">TPC: {{ specimen.tpc }}%</div>
              </div>
              <span 
                class="text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase font-bold"
                :class="specimen.statusClass"
              >
                {{ specimen.statusText }}
              </span>
            </button>
          </div>

          <!-- Active Specimen HUD Viewfinder -->
          <div class="bg-slate-950 rounded-2xl border border-neutral-800 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative overflow-hidden">
            <!-- Left: Speedometer Gauge -->
            <div class="md:col-span-5 flex flex-col items-center justify-center p-4">
              <div class="relative w-44 h-28">
                <!-- SVG Semi-Circle Gauge -->
                <svg viewBox="0 0 160 90" class="w-full h-full overflow-visible">
                  <!-- Gauge Track -->
                  <path d="M 20 80 A 60 60 0 0 1 140 80" fill="none" stroke="#1e293b" stroke-width="12" stroke-linecap="round"/>
                  <!-- Green Safe Zone -->
                  <path d="M 20 80 A 60 60 0 0 1 76 24" fill="none" stroke="#10b981" stroke-width="12" stroke-linecap="round" opacity="0.85"/>
                  <!-- Amber Warning Zone -->
                  <path d="M 76 24 A 60 60 0 0 1 100 24" fill="none" stroke="#fbbf24" stroke-width="12" opacity="0.85"/>
                  <!-- Red Hazard Zone -->
                  <path d="M 100 24 A 60 60 0 0 1 140 80" fill="none" stroke="#f43f5e" stroke-width="12" stroke-linecap="round" opacity="0.85"/>
                  <!-- Needle -->
                  <line 
                    x1="80" y1="80" 
                    :x2="gaugeNeedleX" :y2="gaugeNeedleY"
                    stroke="#ffffff" stroke-width="3" stroke-linecap="round"
                    class="transition-all duration-700 ease-out"
                  />
                  <circle cx="80" cy="80" r="6" fill="#ecfdf5" />
                </svg>
                <div class="text-center mt-[-8px]">
                  <span class="text-2xl font-black font-mono" :class="activeSpecimenData.tpcColor">
                    {{ activeSpecimenData.tpc }}%
                  </span>
                  <span class="text-[10px] text-slate-400 block font-mono">TPC POLAR MASS</span>
                </div>
              </div>
            </div>

            <!-- Right: Microscopic & Legal Verdict -->
            <div class="md:col-span-7 space-y-3">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  Target: {{ activeSpecimenData.name }}
                </span>
                <span class="text-xs font-bold font-mono" :class="activeSpecimenData.verdictColor">
                  {{ activeSpecimenData.verdict }}
                </span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                {{ activeSpecimenData.description }}
              </p>
              <div class="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800 text-[11px] font-mono">
                <div>
                  <span class="text-slate-500">Free Fatty Acids: </span>
                  <span class="text-slate-200 font-bold">{{ activeSpecimenData.ffa }}</span>
                </div>
                <div>
                  <span class="text-slate-500">Legal Recirculation: </span>
                  <span :class="activeSpecimenData.legalColor" class="font-bold">{{ activeSpecimenData.legal }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================================================= -->
    <!-- SECTION 3: THE "SCAN & DONE" SOLUTION (With Interactive QR Scanner Simulator) -->
    <!-- ========================================================================= -->
    <section class="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono uppercase tracking-wider">
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
        <div class="relative bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
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
                <ellipse cx="28" cy="48" rx="26" ry="6" fill="#000" opacity="0.4" />
                <rect x="4" y="12" width="48" height="26" rx="6" fill="#059669" stroke="#34d399" stroke-width="1.5" />
                <path d="M 38 15 L 50 24 L 50 34 L 38 34 Z" fill="#064e3b" />
                <circle cx="22" cy="24" r="6" fill="#ecfdf5" />
                <path d="M22 20 C25 22 25 26 22 28 C19 26 19 22 22 20 Z" fill="#10b981" />
                <circle cx="16" cy="38" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
                <circle cx="42" cy="38" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
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

          <!-- PLAYABLE INTERACTIVE QR SCAN SIMULATOR -->
          <div class="mt-8 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <span>📱</span> Interactive Field Pickup Simulator
                </h3>
                <p class="text-xs text-slate-400">Experience how an EV field executive settles oil in under 30 seconds</p>
              </div>
              <button 
                @click="triggerQrLaserSweep"
                :disabled="isScanningLaser"
                class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{{ isScanningLaser ? '⚡ Scanning QR...' : '▶ Run Live Pickup Demo' }}</span>
              </button>
            </div>

            <!-- The Simulator Viewport -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <!-- Left: Viewfinder with Laser Sweep -->
              <div class="md:col-span-5 flex items-center justify-center">
                <div class="relative w-48 h-48 rounded-2xl bg-slate-950 border-2 border-slate-700 p-3 flex flex-col items-center justify-center overflow-hidden shadow-inner">
                  <!-- Viewfinder Corner Marks -->
                  <div class="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                  <div class="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                  <div class="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                  <div class="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

                  <!-- Simulated Restaurant Site QR Sticker -->
                  <div class="w-32 h-32 bg-white rounded-xl p-2.5 flex flex-col items-center justify-between shadow-lg">
                    <div class="w-full text-center text-[8px] font-black font-mono text-slate-900 tracking-wider">RUCO-FBO-SELL-104</div>
                    <!-- QR matrix representation -->
                    <div class="grid grid-cols-5 gap-1 w-20 h-20 bg-slate-100 p-1 rounded">
                      <div class="bg-black rounded-xs"></div><div class="bg-black rounded-xs"></div><div class="bg-slate-200"></div><div class="bg-black rounded-xs"></div><div class="bg-black rounded-xs"></div>
                      <div class="bg-black rounded-xs"></div><div class="bg-slate-200"></div><div class="bg-black rounded-xs"></div><div class="bg-slate-200"></div><div class="bg-black rounded-xs"></div>
                      <div class="bg-slate-200"></div><div class="bg-black rounded-xs"></div><div class="bg-emerald-600 rounded-xs"></div><div class="bg-black rounded-xs"></div><div class="bg-slate-200"></div>
                      <div class="bg-black rounded-xs"></div><div class="bg-slate-200"></div><div class="bg-black rounded-xs"></div><div class="bg-slate-200"></div><div class="bg-black rounded-xs"></div>
                      <div class="bg-black rounded-xs"></div><div class="bg-black rounded-xs"></div><div class="bg-slate-200"></div><div class="bg-black rounded-xs"></div><div class="bg-black rounded-xs"></div>
                    </div>
                    <div class="w-full text-center text-[7px] font-bold text-emerald-700 uppercase">FSSAI Compliant</div>
                  </div>

                  <!-- Moving Neon Laser Bar -->
                  <div 
                    v-if="isScanningLaser"
                    class="absolute inset-x-0 h-1 bg-emerald-400 shadow-[0_0_15px_#10b981] animate-laser-sweep pointer-events-none"
                  ></div>
                </div>
              </div>

              <!-- Right: Verification Stepper & Certificate Stamp -->
              <div class="md:col-span-7 space-y-2.5">
                <div 
                  v-for="(log, lIdx) in scanLogs" 
                  :key="lIdx"
                  class="p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all duration-300"
                  :class="scanProgress >= lIdx + 1 ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-slate-950/60 border-slate-800 text-slate-500'"
                >
                  <span class="flex items-center gap-2">
                    <span class="font-mono font-bold">{{ scanProgress >= lIdx + 1 ? '✓' : '○' }}</span>
                    <span>{{ log.label }}</span>
                  </span>
                  <span class="font-mono text-[11px] font-bold">{{ log.val }}</span>
                </div>

                <!-- Verified Certificate Stamp Preview -->
                <div 
                  v-if="scanProgress >= 4"
                  class="p-3 bg-emerald-900/30 border border-emerald-500/50 rounded-xl flex items-center justify-between text-xs animate-fade-in shadow-lg shadow-emerald-950/40"
                >
                  <div class="flex items-center gap-2 text-emerald-300 font-bold">
                    <span>📜</span>
                    <span>Form-D Disposal Certificate Issued: #CERT-2026-9042</span>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black font-mono text-[10px] uppercase">
                    Locked
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ========================================================================= -->
    <!-- SECTION 4: THE IMPACT & THE REWARD (Interactive Cockpit + Dynamic Charts) -->
    <!-- ========================================================================= -->
    <section class="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto space-y-16">
        <!-- Section Header -->
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold font-mono uppercase tracking-wider">
            <span>📊</span> The Impact & The Reward
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Track Your Green Footprint.
          </h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every registered food business gains access to an automated, tamper-proof ESG dashboard. Simulate your kitchen’s monthly volume below.
          </p>
        </div>

        <!-- Interactive Volume Controller Card -->
        <div class="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl backdrop-blur-xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">Simulate Monthly UCO Volume</span>
              <div class="text-3xl font-black text-white font-mono mt-0.5 flex items-baseline gap-2">
                <span>{{ formatNumber(monthlyLiters) }}</span>
                <span class="text-sm font-normal text-slate-400">Liters / Month</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20 shadow-inner">
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
          <div class="flex justify-between text-[11px] font-mono text-slate-500">
            <span>Small Cafe (50L)</span>
            <span class="text-emerald-400 font-semibold">Standard Restaurant (500L)</span>
            <span>Hotel / Cloud Kitchen (2500L)</span>
          </div>
        </div>

        <!-- Frosted Glass "Impact Preview" Dashboard Card -->
        <div class="max-w-5xl mx-auto relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

          <div class="relative rounded-3xl bg-slate-900/75 border border-slate-700/80 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8">
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
              <button 
                @click="$emit('open-register')"
                class="px-3.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-semibold border border-emerald-500/30 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>📜</span>
                <span>View Official PDF Cert</span>
              </button>
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
                  {{ (monthlyLiters * 0.12).toFixed(0) }} Trees Equivalent
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
                  Shielded from Drains
                </div>
              </div>
            </div>

            <!-- Dynamic SVG Growth Chart & Forest Meter -->
            <div class="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Dynamic Biofuel Output Trend (6-Month Projection)</span>
                <span class="text-teal-400 font-bold">● High Conversion Ratio</span>
              </div>
              
              <!-- Reactive Bar Chart -->
              <div class="h-28 flex items-end justify-between gap-3 pt-4 px-2 select-none">
                <div 
                  v-for="(bar, bIdx) in projectionBars" 
                  :key="bIdx"
                  class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                >
                  <div 
                    class="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-teal-400 transition-all duration-500 relative group/bar shadow-md shadow-emerald-950/50"
                    :style="{ height: `${Math.min(Math.max((monthlyLiters / 2500) * bar.factor * 100, 15), 100)}%` }"
                  >
                    <span class="opacity-0 group-hover/bar:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-slate-800 px-1 rounded text-white whitespace-nowrap">
                      {{ Math.round(monthlyLiters * (bar.factor / 100) * 1.2) }}L
                    </span>
                  </div>
                  <span class="text-[10px] font-mono text-slate-500">{{ bar.month }}</span>
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
import { ref, onMounted, onUnmounted, computed } from 'vue';

const emit = defineEmits(['open-register', 'open-login']);

// ============================================================================
// 1. INTERACTIVE CANVAS PARTICLE FIELD
// ============================================================================
const particleCanvas = ref(null);
let animationFrameId = null;

function initParticleField() {
  const canvas = particleCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 28), 50);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(52, 211, 153, 0.4)' : 'rgba(45, 212, 191, 0.3)'
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect nearby particles with subtle light threads
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();
}

// ============================================================================
// 2. HERO 3D PARALLAX & BIOFUEL REACTOR STATE
// ============================================================================
const heroSection = ref(null);
const heroMouseX = ref(0);
const heroMouseY = ref(0);

function handleHeroMouseMove(e) {
  if (!heroSection.value) return;
  const rect = heroSection.value.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  heroMouseX.value = (x / (rect.width / 2)) * 10;
  heroMouseY.value = -(y / (rect.height / 2)) * 10;
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

// Reactor Multi-Tier State
const selectedReactorTier = ref(0);
const reactorTiers = [
  {
    code: 'Grade A',
    label: 'Biofuel Conversion: 100%',
    tooltip: 'Premium clean UCO (TPC ≤ 22%) with +₹5/L Bonus',
    liquidGradient: 'url(#biofuelClean)',
    bubbleColor: '#ecfdf5',
    coreColor: '#10b981',
    tpcValue: '18.4% (Bonus Tier)',
    tpcColor: 'text-emerald-400',
    payoutTier: '₹60.00 / Liter'
  },
  {
    code: 'Grade B',
    label: 'Standard Conversion: 92%',
    tooltip: 'Standard commercial oil (TPC ≤ 25%)',
    liquidGradient: 'url(#biofuelStandard)',
    bubbleColor: '#fef3c7',
    coreColor: '#f59e0b',
    tpcValue: '23.8% (Standard Tier)',
    tpcColor: 'text-amber-400',
    payoutTier: '₹55.00 / Liter'
  },
  {
    code: 'Reject',
    label: 'Toxic Sludge Hazard',
    tooltip: 'Severely burnt illegal oil (TPC > 25%) with penalty',
    liquidGradient: 'url(#biofuelSludge)',
    bubbleColor: '#fecdd3',
    coreColor: '#f43f5e',
    tpcValue: '35.2% (Illegal Reuse)',
    tpcColor: 'text-rose-500',
    payoutTier: 'Penalty / Mandatory Destruction'
  }
];

const activeReactorTier = computed(() => reactorTiers[selectedReactorTier.value]);

const reactorFluidPath = computed(() => {
  if (selectedReactorTier.value === 0) {
    return 'M112 135 Q 140 128 170 135 T 228 135 L228 220 C228 232 218 242 206 242 L134 242 C122 242 112 232 112 220 Z';
  } else if (selectedReactorTier.value === 1) {
    return 'M112 150 Q 140 144 170 150 T 228 150 L228 220 C228 232 218 242 206 242 L134 242 C122 242 112 232 112 220 Z';
  } else {
    return 'M112 170 Q 140 165 170 170 T 228 170 L228 220 C228 232 218 242 206 242 L134 242 C122 242 112 232 112 220 Z';
  }
});

// ============================================================================
// 3. SECTION 2: THE THREAT & PLAYABLE BIOHAZARD HUD SCANNER
// ============================================================================
const threatSection = ref(null);
const countPlate = ref(0);
const countTpc = ref(0);
let hasAnimatedCounters = false;

function startCounterAnimation() {
  if (hasAnimatedCounters) return;
  hasAnimatedCounters = true;

  const duration = 1400;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - (1 - progress) * (1 - progress);

    countPlate.value = Math.round(ease * 60);
    countTpc.value = Math.round(ease * 25);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Interactive Biohazard Specimens
const activeSpecimen = ref(0);
const specimens = [
  {
    name: 'Street Fryer Vat #1',
    icon: '🥘',
    tpc: 34.8,
    statusText: 'Severe Hazard',
    statusClass: 'bg-rose-950/60 text-rose-400 border-rose-500/40',
    verdict: 'Carcinogenic Oxidation',
    verdictColor: 'text-rose-400',
    tpcColor: 'text-rose-500',
    ffa: '8.4% (Critical)',
    legal: 'STRICTLY BANNED',
    legalColor: 'text-rose-400',
    description: 'Repeatedly reheated cooking oil tested at 34.8% TPC. Highly toxic polar polymers directly increase risks of vascular plaques, arterial inflammation, and Alzheimer\'s.'
  },
  {
    name: 'Unlabeled Repackaging Canister',
    icon: '🛢️',
    tpc: 28.2,
    statusText: 'Black Market',
    statusClass: 'bg-amber-950/60 text-amber-400 border-amber-500/40',
    verdict: 'Illegal Recirculation',
    verdictColor: 'text-amber-400',
    tpcColor: 'text-amber-400',
    ffa: '5.2% (Degraded)',
    legal: 'SEIZURE WARRANT',
    legalColor: 'text-amber-400',
    description: 'Black-market repackaged oil sold back into local snack manufacturing. Bypasses mandatory FSSAI traceability and contaminates consumer food streams.'
  },
  {
    name: 'GeoField Sealed Bio-Drum',
    icon: '🌿',
    tpc: 17.6,
    statusText: '100% Certified',
    statusClass: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40',
    verdict: 'Clean Biofuel Grade',
    verdictColor: 'text-emerald-400',
    tpcColor: 'text-emerald-400',
    ffa: '1.8% (Optimal)',
    legal: 'APPROVED FOR PAYOUT',
    legalColor: 'text-emerald-400',
    description: 'Legally audited cooking oil sealed in GeoField tamper-proof containers. Tested with digital probes and cleared for clean biodiesel conversion with bonus revenue.'
  }
];

const activeSpecimenData = computed(() => specimens[activeSpecimen.value]);

// Speedometer needle geometry
const gaugeNeedleX = computed(() => {
  const tpc = activeSpecimenData.value.tpc;
  const clamped = Math.min(Math.max(tpc, 5), 40);
  const angle = Math.PI - ((clamped - 5) / 35) * Math.PI;
  return 80 + Math.cos(angle) * 48;
});

const gaugeNeedleY = computed(() => {
  const tpc = activeSpecimenData.value.tpc;
  const clamped = Math.min(Math.max(tpc, 5), 40);
  const angle = Math.PI - ((clamped - 5) / 35) * Math.PI;
  return 80 - Math.sin(angle) * 48;
});

// ============================================================================
// 4. SECTION 3: ANIMATED ROUTE & PLAYABLE QR LASER SCANNER
// ============================================================================
const activeProcessStep = ref(0);
const vanPositions = [60, 400, 740];

const processSteps = [
  {
    title: 'Register & Get Your QR',
    badge: 'Step 1',
    description: 'Sign up and receive a unique, waterproof physical/digital QR code assigned directly to your restaurant site for immediate kitchen placement.'
  },
  {
    title: 'Cluster-Based Pickups',
    badge: 'Step 2',
    description: 'Our hyper-local, region-based fleet operates on optimized cluster routes, ensuring your UCO is picked up quickly, cleanly, and consistently.'
  },
  {
    title: 'Scan & Done',
    badge: 'Step 3',
    description: 'When our agent arrives, simply let them scan your restaurant\'s QR code. The app automatically logs the weight, generates your digital FSSAI receipt, and the agent handles the rest.'
  }
];

// Interactive QR Scanner Simulator
const isScanningLaser = ref(false);
const scanProgress = ref(0);
const scanLogs = ref([
  { label: '1. FSSAI Site Identity Authenticated', val: '✓ Verified' },
  { label: '2. Ultrasonic Drum Volume Measured', val: '185.4 Liters' },
  { label: '3. Digital TPC Quality Sensor Test', val: '19.2% (Grade A Bonus)' },
  { label: '4. Cryptographic SHA-256 Ledger Block', val: '0x7f2a...88e1' },
]);

function triggerQrLaserSweep() {
  if (isScanningLaser.value) return;
  isScanningLaser.value = true;
  scanProgress.value = 0;
  activeProcessStep.value = 2; // Jump van to destination step

  let step = 0;
  const interval = setInterval(() => {
    step++;
    scanProgress.value = step;
    if (step >= 4) {
      clearInterval(interval);
      setTimeout(() => {
        isScanningLaser.value = false;
      }, 500);
    }
  }, 400);
}

// ============================================================================
// 5. SECTION 4: DYNAMIC COCKPIT & PROJECTION BARS
// ============================================================================
const monthlyLiters = ref(450);

const projectionBars = [
  { month: 'M1', factor: 50 },
  { month: 'M2', factor: 65 },
  { month: 'M3', factor: 78 },
  { month: 'M4', factor: 90 },
  { month: 'M5', factor: 95 },
  { month: 'M6', factor: 100 },
];

function formatNumber(num) {
  return Number(num || 0).toLocaleString('en-IN');
}

// ============================================================================
// LIFECYCLE
// ============================================================================
onMounted(() => {
  initParticleField();

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
    startCounterAnimation();
  }
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
@keyframes laserSweep {
  0% {
    top: 5%;
    opacity: 0.8;
  }
  50% {
    top: 90%;
    opacity: 1;
  }
  100% {
    top: 5%;
    opacity: 0.8;
  }
}

.animate-laser-sweep {
  animation: laserSweep 1.2s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 0.85;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.04);
  }
}

.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}
</style>

