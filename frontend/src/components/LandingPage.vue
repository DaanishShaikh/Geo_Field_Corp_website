<template>
  <div class="landing-page relative bg-[#FAFAFA] text-[#0A0A0A] selection:bg-[#49C5B6] selection:text-[#0A0A0A] font-sans antialiased overflow-hidden">
    <!-- Interactive Background Particle Canvas (Flowing Bio-Spores) -->
    <canvas ref="particleCanvas" class="pointer-events-none absolute inset-0 -z-10 w-full h-full opacity-40"></canvas>

    <!-- Ambient Glowing Soft Studio Lights -->
    <div class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[#49C5B6]/8 blur-[160px] -z-10 animate-pulse-slow"></div>
    <div class="pointer-events-none absolute top-[1300px] left-[-220px] w-[700px] h-[700px] bg-black/[0.03] rounded-full blur-[160px] -z-10"></div>
    <div class="pointer-events-none absolute top-[2500px] right-[-180px] w-[650px] h-[650px] bg-[#49C5B6]/6 rounded-full blur-[150px] -z-10"></div>

    <!-- ========================================================================= -->
    <!-- SECTION 1: THE HERO (The Visceral Hook & 3D Interactive Reactor)          -->
    <!-- ========================================================================= -->
    <section 
      ref="heroSection"
      @mousemove="handleHeroMouseMove"
      @mouseleave="handleHeroMouseLeave"
      class="relative min-h-[96vh] flex items-center justify-center pt-14 pb-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center w-full">
        <!-- Left Column: Copy & Interactive CTAs -->
        <div class="lg:col-span-7 space-y-9 text-center lg:text-left">
          <!-- Compliance Live Pulse Badge -->
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/[0.04] text-[#0A0A0A] border border-[#49C5B6]/40 text-[11px] font-mono font-bold uppercase tracking-widest backdrop-blur-xl shadow-xs hover:border-[#49C5B6] transition-colors">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#49C5B6] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#49C5B6]"></span>
            </span>
            <span>FSSAI RUCO Verified Network</span>
            <span class="text-zinc-400">&bull;</span>
            <span class="text-[#0A0A0A] font-mono">100% Closed-Loop Biofuel</span>
          </div>

          <!-- Headline (Capsul'in Poster Headline Typography) -->
          <h1 class="text-5xl sm:text-7xl xl:text-[84px] font-black tracking-[-0.04em] leading-[0.98] text-[#0A0A0A]">
            Stop the Toxic Cycle. <br />
            <span class="text-[#0A0A0A]">
              Start the Green Revenue.
            </span>
          </h1>

          <!-- Sub-headline -->
          <p class="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Join India’s smartest RUCO aggregation network. We take the hassle out of FSSAI compliance with instant QR-based disposal, cluster-based pickups, and real-time environmental tracking.
          </p>

          <!-- Magnetic Shimmering Action CTAs -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <!-- Primary Solid Mint-Teal CTA Button -->
            <button 
              @click="$emit('open-register')"
              class="relative group w-full sm:w-auto px-8 py-4 bg-[#49C5B6] hover:bg-[#3db0a2] text-[#0A0A0A] font-extrabold text-sm rounded-xl shadow-lg shadow-[#49C5B6]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Join the Clean Network</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <!-- Secondary Ghost Button -->
            <a 
              href="#threat-section"
              class="w-full sm:w-auto px-7 py-4 bg-transparent hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-[#FAFAFA] font-bold text-sm rounded-xl border border-black/20 hover:border-[#0A0A0A] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore The 60% Crisis</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          <!-- Live Compliance Mini-Badges -->
          <div class="pt-8 border-t border-black/[0.08] flex flex-wrap items-center justify-center lg:justify-start gap-8 text-xs font-mono text-zinc-500">
            <div class="flex items-center gap-2 hover:text-[#0A0A0A] transition-colors cursor-default">
              <span class="w-1.5 h-1.5 rounded-full bg-[#49C5B6]"></span>
              <span>₹55 - ₹60/L Guaranteed Base</span>
            </div>
            <div class="flex items-center gap-2 hover:text-[#0A0A0A] transition-colors cursor-default">
              <span class="w-1.5 h-1.5 rounded-full bg-[#49C5B6]"></span>
              <span>Digital Form-D Certificates</span>
            </div>
            <div class="flex items-center gap-2 hover:text-[#0A0A0A] transition-colors cursor-default">
              <span class="w-1.5 h-1.5 rounded-full bg-[#49C5B6]"></span>
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
            <!-- Glowing Reactor Glass Card in Studio Black -->
            <div class="relative w-full h-full rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl p-7 flex flex-col justify-between overflow-hidden group text-white">
              <!-- Animated Edge Flare - Studio Lighting -->
              <div class="absolute -top-32 -right-32 w-72 h-72 bg-[#49C5B6]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#49C5B6]/30 transition-colors duration-700"></div>
              <div class="absolute -bottom-32 -left-32 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Reactor Top Controls -->
              <div class="flex items-center justify-between z-10">
                <div class="flex items-center gap-2 bg-[#141414] border border-white/10 px-3 py-1.5 rounded-lg shadow-inner">
                  <span class="w-2 h-2 rounded-full bg-[#49C5B6] animate-ping"></span>
                  <span class="text-[11px] font-mono text-[#FAFAFA] font-bold uppercase tracking-wider">
                    {{ activeReactorTier.label }}
                  </span>
                </div>
                <!-- Interactive Tier Switcher -->
                <div class="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-white/10">
                  <button 
                    v-for="(tier, idx) in reactorTiers" 
                    :key="idx"
                    @click="selectedReactorTier = idx"
                    :class="selectedReactorTier === idx ? 'bg-[#49C5B6] text-[#0A0A0A] font-black shadow-md' : 'text-zinc-400 hover:text-white'"
                    class="px-2.5 py-1 text-[10px] rounded font-mono uppercase transition cursor-pointer"
                  >
                    {{ tier.code }}
                  </button>
                </div>
              </div>

              <!-- Center Interactive Visual: Transmutation Reactor Chamber -->
              <div class="relative flex-1 flex items-center justify-center my-2">
                <svg viewBox="0 0 340 340" class="w-full h-full max-h-[270px]">
                  <!-- Outer Magnetic Confinement Rings -->
                  <circle cx="170" cy="170" r="140" fill="none" stroke="#49C5B6" stroke-width="1.5" stroke-dasharray="8 6" class="animate-spin-very-slow origin-center opacity-70" />
                  <circle cx="170" cy="170" r="122" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="14 10" class="animate-spin-reverse origin-center opacity-40" />
                  
                  <!-- Platform Base -->
                  <ellipse cx="170" cy="275" rx="90" ry="18" fill="url(#platformGlow)" />
                  <ellipse cx="170" cy="270" rx="75" ry="12" fill="#141414" stroke="#49C5B6" stroke-width="1.5" />

                  <!-- Central Catalytic Reactor Chamber -->
                  <rect x="100" y="65" width="140" height="175" rx="24" fill="url(#reactorGlass)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" opacity="0.95" />

                  <!-- Fluid Wave Fill in Chamber -->
                  <path 
                    :d="reactorFluidPath" 
                    :fill="activeReactorTier.liquidGradient"
                    class="transition-all duration-700 ease-out opacity-90"
                  />

                  <!-- Rising Active Carbon Bubbles -->
                  <g class="animate-float-bubbles">
                    <circle cx="130" cy="190" r="3.5" :fill="activeReactorTier.bubbleColor" opacity="0.8" />
                    <circle cx="160" cy="170" r="5" :fill="activeReactorTier.bubbleColor" opacity="0.6" />
                    <circle cx="195" cy="180" r="4" :fill="activeReactorTier.bubbleColor" opacity="0.75" />
                    <circle cx="145" cy="140" r="3" :fill="activeReactorTier.bubbleColor" opacity="0.9" />
                    <circle cx="180" cy="130" r="4.5" :fill="activeReactorTier.bubbleColor" opacity="0.85" />
                  </g>

                  <!-- Internal Catalytic Catalyst Core -->
                  <circle cx="170" cy="155" r="18" :fill="activeReactorTier.coreColor" class="animate-pulse" opacity="0.85" />
                  <circle cx="170" cy="155" r="8" fill="#FFFFFF" />

                  <!-- Molecular Output Overlay Lines -->
                  <line x1="170" y1="55" x2="170" y2="25" stroke="#49C5B6" stroke-width="2" stroke-dasharray="3 3"/>
                  <circle cx="170" cy="25" r="4" fill="#49C5B6" class="animate-ping" />

                  <!-- Gradients -->
                  <defs>
                    <radialGradient id="platformGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#49C5B6" stop-opacity="0.6"/>
                      <stop offset="100%" stop-color="#49C5B6" stop-opacity="0"/>
                    </radialGradient>
                    <linearGradient id="reactorGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#1A1A1A" stop-opacity="0.85"/>
                      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0.95"/>
                    </linearGradient>
                    <linearGradient id="biofuelClean" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#49C5B6" stop-opacity="0.95"/>
                      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0.98"/>
                    </linearGradient>
                    <linearGradient id="biofuelStandard" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#368E83" stop-opacity="0.95"/>
                      <stop offset="100%" stop-color="#141414" stop-opacity="0.98"/>
                    </linearGradient>
                    <linearGradient id="biofuelSludge" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#3A3A3A" stop-opacity="0.95"/>
                      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0.98"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <!-- Interactive Telemetry Footer -->
              <div class="grid grid-cols-2 gap-3 z-10 pt-3 border-t border-white/10">
                <div class="bg-[#141414] p-3 rounded-xl border border-white/10">
                  <div class="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Total Polar Compounds</div>
                  <div class="text-xs font-bold font-mono mt-1" :class="activeReactorTier.tpcColor">
                    {{ activeReactorTier.tpcValue }}
                  </div>
                </div>
                <div class="bg-[#141414] p-3 rounded-xl border border-white/10">
                  <div class="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Payout Status</div>
                  <div class="text-xs font-bold font-mono mt-1 text-[#49C5B6]">
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
    <!-- SECTION 2: THE THREAT - THE CRISIS (Editorial Chapter Layout)            -->
    <!-- ========================================================================= -->
    <section 
      id="threat-section"
      ref="threatSection"
      class="relative py-32 bg-[#FAFAFA] border-t border-black/[0.06] px-4 sm:px-8 lg:px-12"
    >
      <div class="max-w-7xl mx-auto space-y-20">
        <!-- Section Header -->
        <div class="max-w-3xl mx-auto text-center space-y-5">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] text-[#0A0A0A] border border-[#49C5B6]/30 text-[11px] font-mono font-bold uppercase tracking-widest">
            <span class="w-1.5 h-1.5 rounded-full bg-[#49C5B6] animate-pulse"></span> The Unregulated Danger
          </div>
          <h2 class="text-4xl sm:text-6xl font-black text-[#0A0A0A] tracking-[-0.03em] leading-tight">
            The 60% Crisis in Your Kitchen.
          </h2>
          <p class="text-zinc-600 text-base sm:text-lg leading-relaxed font-normal">
            Every liter of unmonitored used cooking oil represents severe health liabilities, legal penalties from food safety authorities, and lost restaurant revenue.
          </p>
        </div>

        <!-- 3 Pillars of The Threat with Animated Scroll Counting -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Pillar 1: 60% Return to the Plate -->
          <div class="relative bg-white rounded-2xl p-8 sm:p-10 border border-black/[0.06] shadow-sm hover:shadow-xl hover:border-[#49C5B6]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div class="space-y-4">
              <div class="flex items-baseline gap-3">
                <span class="text-6xl sm:text-7xl font-black font-mono text-[#49C5B6] tracking-tighter leading-none">
                  {{ countPlate }}%
                </span>
                <span class="text-[10px] font-mono uppercase tracking-widest text-[#0A0A0A] font-extrabold px-2 py-0.5 bg-black/[0.04] rounded">Recirculated</span>
              </div>
              <h3 class="text-xl font-bold text-[#0A0A0A] tracking-tight group-hover:text-[#49C5B6] transition-colors">
                The Return to the Plate
              </h3>
              <p class="text-sm text-zinc-600 leading-relaxed font-normal">
                Shockingly, nearly <strong class="text-[#0A0A0A] font-semibold">60% of all Used Cooking Oil (UCO)</strong> generated in India finds its way back into the food stream via illegal black-market repackaging.
              </p>
            </div>
            <div class="mt-8 pt-5 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono uppercase tracking-wider">
              <span>Source: FSSAI Audit Reports</span>
              <span class="text-[#0A0A0A] font-bold px-2 py-0.5 bg-[#49C5B6]/15 rounded text-[10px]">Unchecked Hazard</span>
            </div>
          </div>

          <!-- Pillar 2: 25% Toxicity Limit -->
          <div class="relative bg-white rounded-2xl p-8 sm:p-10 border border-black/[0.06] shadow-sm hover:shadow-xl hover:border-[#49C5B6]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div class="space-y-4">
              <div class="flex items-baseline gap-3">
                <span class="text-6xl sm:text-7xl font-black font-mono text-[#0A0A0A] tracking-tighter leading-none">
                  {{ countTpc }}%
                </span>
                <span class="text-[10px] font-mono uppercase tracking-widest text-[#0A0A0A] font-extrabold px-2 py-0.5 bg-black/[0.04] rounded">Max TPC Limit</span>
              </div>
              <h3 class="text-xl font-bold text-[#0A0A0A] tracking-tight group-hover:text-[#49C5B6] transition-colors">
                The 25% Toxicity Limit
              </h3>
              <p class="text-sm text-zinc-600 leading-relaxed font-normal">
                Every time oil is reheated, toxic <strong class="text-[#0A0A0A] font-semibold">Total Polar Compounds (TPC)</strong> multiply. The FSSAI mandates oil with a TPC above 25% is strictly unsafe for human consumption.
              </p>
            </div>
            <div class="mt-8 pt-5 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono uppercase tracking-wider">
              <span>Regulation: FSSAI Gazette 2018</span>
              <span class="text-[#0A0A0A] font-bold px-2 py-0.5 bg-[#49C5B6]/15 rounded text-[10px]">Mandatory Testing</span>
            </div>
          </div>

          <!-- Pillar 3: The Health Hazard -->
          <div class="relative bg-white rounded-2xl p-8 sm:p-10 border border-black/[0.06] shadow-sm hover:shadow-xl hover:border-[#49C5B6]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div class="space-y-4">
              <div class="flex items-baseline gap-3">
                <span class="text-6xl sm:text-7xl font-black font-mono text-[#49C5B6] tracking-tighter leading-none">
                  3×
                </span>
                <span class="text-[10px] font-mono uppercase tracking-widest text-[#0A0A0A] font-extrabold px-2 py-0.5 bg-black/[0.04] rounded">Cardio Risk</span>
              </div>
              <h3 class="text-xl font-bold text-[#0A0A0A] tracking-tight group-hover:text-[#49C5B6] transition-colors">
                The Health Hazard
              </h3>
              <p class="text-sm text-zinc-600 leading-relaxed font-normal">
                Degraded cooking oil is a major contributor to atherosclerosis, hypertension, and cellular oxidation. Proper disposal isn't just compliance—it’s public health stewardship.
              </p>
            </div>
            <div class="mt-8 pt-5 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono uppercase tracking-wider">
              <span>Clinical Study: AIIMS Toxicity</span>
              <span class="text-[#0A0A0A] font-bold px-2 py-0.5 bg-[#49C5B6]/15 rounded text-[10px]">High Pathology</span>
            </div>
          </div>
        </div>

        <!-- Interactive Specimen Spectrometer HUD -->
        <div class="bg-[#31543B] border border-[#668A68]/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-[#F4F1E6]">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#668A68]/30">
            <div>
              <span class="text-xs font-mono text-[#D29A5A] uppercase font-bold tracking-widest">Interactive Laboratory HUD</span>
              <h3 class="text-xl sm:text-2xl font-black text-[#F4F1E6] mt-1">Live Oil Degradation Spectrometer</h3>
            </div>
            <!-- Specimen Select Buttons -->
            <div class="flex flex-wrap items-center gap-2">
              <button 
                v-for="(specimen, idx) in specimens"
                :key="idx"
                @click="activeSpecimen = idx"
                :class="activeSpecimen === idx ? 'bg-[#D29A5A] text-[#243027] border-[#D29A5A] shadow-md' : 'bg-[#243027] text-[#F4F1E6]/80 border-[#668A68]/40 hover:border-[#668A68]'"
                class="px-3.5 py-2 text-xs font-bold rounded-xl border transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>{{ specimen.icon }}</span>
                <span>{{ specimen.name }}</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <!-- Left: Speedometer Gauge -->
            <div class="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#243027] rounded-2xl border border-[#668A68]/40">
              <div class="relative w-56 h-36 flex items-center justify-center">
                <svg viewBox="0 0 160 90" class="w-full h-full">
                  <path d="M 20 80 A 60 60 0 0 1 140 80" fill="none" stroke="#31543B" stroke-width="12" stroke-linecap="round"/>
                  <path d="M 20 80 A 60 60 0 0 1 65 30" fill="none" stroke="#668A68" stroke-width="12" stroke-linecap="round"/>
                  <path d="M 65 30 A 60 60 0 0 1 105 30" fill="none" stroke="#D29A5A" stroke-width="12"/>
                  <path d="M 105 30 A 60 60 0 0 1 140 80" fill="none" stroke="#8C4A32" stroke-width="12" stroke-linecap="round"/>
                  
                  <!-- Needle Line -->
                  <line 
                    x1="80" 
                    y1="80" 
                    :x2="gaugeNeedleX" 
                    :y2="gaugeNeedleY" 
                    stroke="#F4F1E6" 
                    stroke-width="3.5" 
                    stroke-linecap="round"
                    class="transition-all duration-500 ease-out"
                  />
                  <circle cx="80" cy="80" r="7" fill="#D29A5A" stroke="#F4F1E6" stroke-width="2"/>
                </svg>
              </div>
              <div class="text-center mt-2">
                <div class="text-3xl font-black font-mono tracking-tight" :class="activeSpecimenData.tpcColor">
                  {{ activeSpecimenData.tpc }}% TPC
                </div>
                <div class="text-[11px] font-mono uppercase tracking-widest text-[#D29A5A] mt-1 font-bold">
                  {{ activeSpecimenData.verdict }}
                </div>
              </div>
            </div>

            <!-- Right: Forensics Data Card -->
            <div class="lg:col-span-7 space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono text-[#D29A5A] font-bold uppercase">Sample Analysis:</span>
                <span class="px-3 py-1 rounded-full text-xs font-bold font-mono border" :class="activeSpecimenData.statusClass">
                  {{ activeSpecimenData.statusText }}
                </span>
              </div>
              <p class="text-xs sm:text-sm text-[#F4F1E6]/90 leading-relaxed">
                {{ activeSpecimenData.description }}
              </p>
              <div class="grid grid-cols-2 gap-3 pt-2">
                <div class="p-3 bg-[#243027] rounded-xl border border-[#668A68]/40">
                  <div class="text-[10px] font-mono text-[#F4F1E6]/70 uppercase">Free Fatty Acids (FFA)</div>
                  <div class="text-sm font-bold font-mono text-[#F4F1E6] mt-0.5">{{ activeSpecimenData.ffa }}</div>
                </div>
                <div class="p-3 bg-[#243027] rounded-xl border border-[#668A68]/40">
                  <div class="text-[10px] font-mono text-[#F4F1E6]/70 uppercase">Legal Standing</div>
                  <div class="text-sm font-bold font-mono mt-0.5" :class="activeSpecimenData.legalColor">{{ activeSpecimenData.legal }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 3: THE SOLUTION - 3-STEP WORKFLOW & QR SIMULATOR                  -->
    <!-- ========================================================================= -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-[#F4F1E6]">
      <div class="space-y-16">
        <!-- Section Header -->
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#31543B]/10 text-[#31543B] border border-[#668A68]/40 text-xs font-bold font-mono uppercase tracking-wider">
            <span>⚡</span> Automated Three-Step Workflow
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-[#243027] tracking-tight">
            Frictionless Disposal. Zero Interruptions.
          </h2>
          <p class="text-[#243027]/80 text-sm sm:text-base leading-relaxed">
            Eliminate messy haggling with shady aggregators. Transform your waste stream with three transparent digital steps.
          </p>
        </div>

        <!-- 3-Step Interactive Process Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(step, idx) in processSteps" 
            :key="idx"
            @mouseenter="activeProcessStep = idx"
            class="relative rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            :class="activeProcessStep === idx 
              ? 'bg-[#31543B] text-[#F4F1E6] border-[#31543B] shadow-xl -translate-y-2' 
              : 'bg-[#F4F1E6] text-[#243027] border-[#668A68]/40 hover:border-[#31543B]'"
          >
            <div class="space-y-5">
              <div class="flex items-center justify-between">
                <span 
                  class="px-3 py-1 rounded-xl text-xs font-mono font-bold border transition-colors"
                  :class="activeProcessStep === idx ? 'bg-[#D29A5A] text-[#243027] border-[#D29A5A]' : 'bg-[#668A68]/15 text-[#31543B] border-[#668A68]/40'"
                >
                  {{ step.badge }}
                </span>
                <span 
                  class="text-xl font-black font-mono transition-opacity"
                  :class="activeProcessStep === idx ? 'text-[#D29A5A]' : 'text-[#668A68]/50 group-hover:text-[#31543B]'"
                >
                  0{{ idx + 1 }}
                </span>
              </div>
              <h3 
                class="text-xl font-bold transition-colors"
                :class="activeProcessStep === idx ? 'text-[#F4F1E6]' : 'text-[#243027] group-hover:text-[#31543B]'"
              >
                {{ step.title }}
              </h3>
              <p 
                class="text-xs sm:text-sm leading-relaxed"
                :class="activeProcessStep === idx ? 'text-[#F4F1E6]/85' : 'text-[#243027]/75'"
              >
                {{ step.description }}
              </p>
            </div>
            <div 
              class="mt-6 pt-4 border-t flex items-center gap-2 text-xs font-bold"
              :class="activeProcessStep === idx ? 'border-[#668A68]/40 text-[#D29A5A]' : 'border-[#668A68]/30 text-[#31543B]'"
            >
              <span>Explore details</span>
              <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
            </div>
          </div>
        </div>

        <!-- Interactive Animated Route Map Vector -->
        <div class="bg-[#31543B] border border-[#668A68]/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden text-[#F4F1E6]">
          <div class="text-center sm:text-left mb-6">
            <span class="text-xs font-mono text-[#D29A5A] font-bold uppercase tracking-widest">Live Dynamic Dispatch</span>
            <h3 class="text-xl font-bold text-[#F4F1E6] mt-1">Simulated Collection Route & Dynamic Tracking</h3>
          </div>

          <div class="relative w-full h-40 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 120" class="w-full min-w-[650px] h-full">
              <!-- Route Path Line -->
              <path d="M 60 60 Q 220 15 400 60 T 740 60" fill="none" stroke="url(#routeGradient)" stroke-width="4" stroke-linecap="round" />
              <path d="M 60 60 Q 220 15 400 60 T 740 60" fill="none" stroke="#D29A5A" stroke-width="2" stroke-dasharray="6 8" class="animate-dash" opacity="0.6"/>

              <!-- Waypoint 1: Register (Kitchen) -->
              <g class="cursor-pointer" @click="activeProcessStep = 0">
                <circle cx="60" cy="60" r="24" :fill="activeProcessStep === 0 ? '#D29A5A' : '#243027'" class="transition-colors duration-500" />
                <circle cx="60" cy="60" r="28" stroke="#D29A5A" stroke-width="2" stroke-dasharray="4 4" class="animate-spin origin-center" v-if="activeProcessStep === 0" />
                <circle cx="60" cy="60" r="15" fill="#31543B" />
                <text x="60" y="65" text-anchor="middle" fill="#F4F1E6" font-size="12">🍳</text>
                <text x="60" y="105" text-anchor="middle" fill="#D29A5A" font-size="11" font-weight="bold">FBO Kitchen</text>
              </g>

              <!-- Waypoint 2: Cluster Pickups -->
              <g class="cursor-pointer" @click="activeProcessStep = 1">
                <circle cx="400" cy="60" r="24" :fill="activeProcessStep === 1 ? '#D29A5A' : '#243027'" class="transition-colors duration-500" />
                <circle cx="400" cy="60" r="28" stroke="#D29A5A" stroke-width="2" stroke-dasharray="4 4" class="animate-spin origin-center" v-if="activeProcessStep === 1" />
                <circle cx="400" cy="60" r="15" fill="#31543B" />
                <text x="400" y="65" text-anchor="middle" fill="#F4F1E6" font-size="12">⚡</text>
                <text x="400" y="105" text-anchor="middle" fill="#D29A5A" font-size="11" font-weight="bold">2km Cluster Fleet</text>
              </g>

              <!-- Waypoint 3: Scan & Done -->
              <g class="cursor-pointer" @click="activeProcessStep = 2">
                <circle cx="740" cy="60" r="24" :fill="activeProcessStep === 2 ? '#D29A5A' : '#243027'" class="transition-colors duration-500" />
                <circle cx="740" cy="60" r="28" stroke="#D29A5A" stroke-width="2" stroke-dasharray="4 4" class="animate-spin origin-center" v-if="activeProcessStep === 2" />
                <circle cx="740" cy="60" r="15" fill="#31543B" />
                <rect x="734" y="54" width="4" height="4" fill="#D29A5A"/>
                <rect x="742" y="54" width="4" height="4" fill="#D29A5A"/>
                <rect x="734" y="62" width="4" height="4" fill="#D29A5A"/>
                <rect x="742" y="62" width="4" height="4" fill="#D29A5A"/>
                <text x="740" y="105" text-anchor="middle" fill="#D29A5A" font-size="11" font-weight="bold">Scan & Done</text>
              </g>

              <!-- Animated EV Collection Van along the route line -->
              <g 
                :transform="`translate(${vanPositions[activeProcessStep]}, 25)`" 
                class="transition-transform duration-700 ease-in-out cursor-pointer"
              >
                <ellipse cx="28" cy="48" rx="26" ry="6" fill="#000" opacity="0.3" />
                <rect x="4" y="12" width="48" height="26" rx="6" fill="#668A68" stroke="#D29A5A" stroke-width="1.5" />
                <path d="M 38 15 L 50 24 L 50 34 L 38 34 Z" fill="#243027" />
                <circle cx="22" cy="24" r="6" fill="#F4F1E6" />
                <path d="M22 20 C25 22 25 26 22 28 C19 26 19 22 22 20 Z" fill="#D29A5A" />
                <circle cx="16" cy="38" r="6" fill="#243027" stroke="#668A68" stroke-width="2"/>
                <circle cx="42" cy="38" r="6" fill="#243027" stroke="#668A68" stroke-width="2"/>
                <polygon points="52,26 70,20 70,36 52,32" fill="#D29A5A" opacity="0.4"/>
              </g>

              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#668A68"/>
                  <stop offset="50%" stop-color="#D29A5A"/>
                  <stop offset="100%" stop-color="#F4F1E6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <!-- PLAYABLE INTERACTIVE QR SCAN SIMULATOR -->
          <div class="mt-8 p-6 sm:p-8 rounded-2xl bg-[#243027] border border-[#668A68]/40 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 class="text-base font-bold text-[#F4F1E6] flex items-center gap-2">
                  <span>📱</span> Interactive Field Pickup Simulator
                </h3>
                <p class="text-xs text-[#F4F1E6]/70">Experience how an EV field executive settles oil in under 30 seconds</p>
              </div>
              <button 
                @click="triggerQrLaserSweep"
                :disabled="isScanningLaser"
                class="px-5 py-2.5 bg-[#D29A5A] hover:bg-[#C08949] text-[#243027] font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{{ isScanningLaser ? '⚡ Scanning QR...' : '▶ Run Live Pickup Demo' }}</span>
              </button>
            </div>

            <!-- The Simulator Viewport -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <!-- Left: Viewfinder with Laser Sweep -->
              <div class="md:col-span-5 flex items-center justify-center">
                <div class="relative w-48 h-48 rounded-2xl bg-[#31543B] border-2 border-[#668A68]/60 p-3 flex flex-col items-center justify-center overflow-hidden shadow-inner">
                  <!-- Viewfinder Corner Marks -->
                  <div class="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D29A5A]"></div>
                  <div class="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D29A5A]"></div>
                  <div class="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D29A5A]"></div>
                  <div class="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D29A5A]"></div>

                  <!-- Simulated Restaurant Site QR Sticker -->
                  <div class="w-32 h-32 bg-white rounded-xl p-2.5 flex flex-col items-center justify-between shadow-lg">
                    <div class="w-full text-center text-[8px] font-black font-mono text-[#243027] tracking-wider">RUCO-FBO-SELL-104</div>
                    <!-- QR matrix representation -->
                    <div class="grid grid-cols-5 gap-1 w-20 h-20 bg-stone-100 p-1 rounded">
                      <div class="bg-[#243027] rounded-xs"></div><div class="bg-[#243027] rounded-xs"></div><div class="bg-stone-200"></div><div class="bg-[#243027] rounded-xs"></div><div class="bg-[#243027] rounded-xs"></div>
                      <div class="bg-[#243027] rounded-xs"></div><div class="bg-stone-200"></div><div class="bg-[#243027] rounded-xs"></div><div class="bg-stone-200"></div><div class="bg-[#243027] rounded-xs"></div>
                      <div class="bg-stone-200"></div><div class="bg-[#243027] rounded-xs"></div><div class="bg-[#31543B] rounded-xs"></div><div class="bg-[#243027] rounded-xs"></div><div class="bg-stone-200"></div>
                      <div class="bg-[#243027] rounded-xs"></div><div class="bg-stone-200"></div><div class="bg-[#243027] rounded-xs"></div><div class="bg-stone-200"></div><div class="bg-[#243027] rounded-xs"></div>
                      <div class="bg-[#243027] rounded-xs"></div><div class="bg-[#243027] rounded-xs"></div><div class="bg-stone-200"></div><div class="bg-[#243027] rounded-xs"></div><div class="bg-[#243027] rounded-xs"></div>
                    </div>
                    <div class="w-full text-center text-[7px] font-bold text-[#31543B] uppercase">FSSAI Compliant</div>
                  </div>

                  <!-- Moving Neon Laser Bar -->
                  <div 
                    v-if="isScanningLaser"
                    class="absolute inset-x-0 h-1 bg-[#D29A5A] shadow-[0_0_15px_#D29A5A] animate-laser-sweep pointer-events-none"
                  ></div>
                </div>
              </div>

              <!-- Right: Verification Stepper & Certificate Stamp -->
              <div class="md:col-span-7 space-y-2.5">
                <div 
                  v-for="(log, lIdx) in scanLogs" 
                  :key="lIdx"
                  class="p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all duration-300"
                  :class="scanProgress >= lIdx + 1 ? 'bg-[#31543B] border-[#668A68]/60 text-[#F4F1E6]' : 'bg-[#243027] border-[#668A68]/20 text-[#F4F1E6]/50'"
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
                  class="p-3 bg-[#31543B] border border-[#D29A5A]/60 rounded-xl flex items-center justify-between text-xs animate-fade-in shadow-lg"
                >
                  <div class="flex items-center gap-2 text-[#F4F1E6] font-bold">
                    <span>📜</span>
                    <span>Form-D Disposal Certificate Issued: #CERT-2026-9042</span>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-[#D29A5A] text-[#243027] font-black font-mono text-[10px] uppercase">
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
    <!-- SECTION 4: THE IMPACT & REWARD - ESG COCKPIT & LIVE SLIDER                -->
    <!-- ========================================================================= -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#668A68]/30 bg-[#F4F1E6]">
      <div class="space-y-16">
        <!-- Section Header -->
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#31543B]/10 text-[#31543B] border border-[#668A68]/40 text-xs font-bold font-mono uppercase tracking-wider">
            <span>🌱</span> Environmental Yield & Financial Valuation
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-[#243027] tracking-tight">
            Track Your Green Footprint.
          </h2>
          <p class="text-[#243027]/80 text-sm sm:text-base leading-relaxed">
            Every liter of used cooking oil diverted from water systems and black markets translates into direct monthly revenue and verified ESG carbon offsets.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <!-- Left: Live Interactive Volume Slider & Projections -->
          <div class="lg:col-span-7 space-y-8">
            <!-- Dynamic Volume Slider Card -->
            <div class="bg-[#31543B] border border-[#668A68]/40 rounded-3xl p-8 shadow-2xl space-y-6 text-[#F4F1E6]">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-xs font-mono uppercase text-[#D29A5A] font-bold tracking-widest">Select Monthly Volume</span>
                  <div class="text-3xl sm:text-4xl font-black font-mono text-[#F4F1E6] mt-1">
                    {{ formatNumber(monthlyLiters) }} <span class="text-lg font-normal text-[#F4F1E6]/80">Liters / Month</span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="px-3 py-1.5 rounded-xl bg-[#243027] text-[#D29A5A] border border-[#668A68]/40 text-xs font-mono font-bold">
                    ₹55.00 / Liter Base
                  </span>
                </div>
              </div>

              <!-- High-Energy Green Slider Track -->
              <div class="space-y-3">
                <input 
                  v-model.number="monthlyLiters"
                  type="range" 
                  min="50" 
                  max="5000" 
                  step="25"
                  class="w-full h-3 bg-[#243027] rounded-lg appearance-none cursor-pointer accent-[#D29A5A]"
                />
                <div class="flex justify-between text-xs font-mono text-[#F4F1E6]/70">
                  <span>50 L (Bistro)</span>
                  <span>1,000 L (QSR Hub)</span>
                  <span>5,000 L (Industrial Kitchen)</span>
                </div>
              </div>

              <!-- Animated Monthly Yield Chart Projection -->
              <div class="pt-4 border-t border-[#668A68]/30 space-y-2">
                <div class="flex justify-between text-xs font-mono text-[#F4F1E6]/80">
                  <span>6-Month Revenue Projection Curve</span>
                  <span class="text-[#D29A5A] font-bold">Compounding Compliance Tier</span>
                </div>
                <div class="h-20 flex items-end justify-between gap-3 pt-2">
                  <div 
                    v-for="(bar, bIdx) in projectionBars" 
                    :key="bIdx"
                    class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group"
                  >
                    <div 
                      class="w-full bg-[#D29A5A] rounded-lg transition-all duration-300 group-hover:brightness-110 shadow-sm"
                      :style="{ height: `${Math.min(100, Math.max(15, (bar.factor * (monthlyLiters / 5000)) * 100))}%` }"
                    ></div>
                    <span class="text-[10px] font-mono text-[#F4F1E6]/80">{{ bar.month }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 4 Live Calculation Metric Blocks -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Block 1: Annual Revenue -->
              <div class="bg-[#F4F1E6] border border-[#668A68]/40 rounded-2xl p-6 space-y-2 shadow-lg">
                <div class="text-xs font-mono uppercase text-[#668A68] font-bold">Estimated Annual Revenue</div>
                <div class="text-3xl font-black font-mono text-[#31543B]">
                  ₹{{ formatNumber(monthlyLiters * 55 * 12) }}
                </div>
                <p class="text-xs text-[#243027]/80">Direct weekly or monthly NEFT disbursement to your restaurant business bank account.</p>
              </div>

              <!-- Block 2: CO2 Displaced -->
              <div class="bg-[#F4F1E6] border border-[#668A68]/40 rounded-2xl p-6 space-y-2 shadow-lg">
                <div class="text-xs font-mono uppercase text-[#668A68] font-bold">CO₂ Emissions Displaced</div>
                <div class="text-3xl font-black font-mono text-[#31543B]">
                  {{ formatNumber(Math.round(monthlyLiters * 12 * 3.0)) }} <span class="text-sm font-sans text-[#668A68]">kg CO₂e</span>
                </div>
                <p class="text-xs text-[#243027]/80">Lifecycle fossil diesel emissions abated by converting your waste oil into clean biofuel.</p>
              </div>

              <!-- Block 3: Freshwater Protected -->
              <div class="bg-[#F4F1E6] border border-[#668A68]/40 rounded-2xl p-6 space-y-2 shadow-lg">
                <div class="text-xs font-mono uppercase text-[#668A68] font-bold">Freshwater Protected</div>
                <div class="text-3xl font-black font-mono text-[#31543B]">
                  {{ formatNumber(monthlyLiters * 12) }} <span class="text-sm font-sans text-[#668A68]">Million L</span>
                </div>
                <p class="text-xs text-[#243027]/80">Preventing toxic hydrocarbon films from coating and suffocating municipal drainage basins.</p>
              </div>

              <!-- Block 4: Biofuel Produced -->
              <div class="bg-[#F4F1E6] border border-[#668A68]/40 rounded-2xl p-6 space-y-2 shadow-lg">
                <div class="text-xs font-mono uppercase text-[#668A68] font-bold">ASTM D6751 Biofuel Yield</div>
                <div class="text-3xl font-black font-mono text-[#31543B]">
                  {{ formatNumber(Math.round(monthlyLiters * 12 * 0.92)) }} <span class="text-sm font-sans text-[#668A68]">Liters</span>
                </div>
                <p class="text-xs text-[#243027]/80">High-cetane, zero-sulfur renewable diesel fuel produced and supplied to state transport fleets.</p>
              </div>
            </div>
          </div>

          <!-- Right: Interactive FSSAI ESG Audit Certificate Preview -->
          <div class="lg:col-span-5">
            <div class="relative bg-[#31543B] rounded-3xl border-2 border-[#668A68]/40 p-8 shadow-2xl space-y-6 text-[#F4F1E6]">
              <div class="text-center space-y-2 pb-6 border-b border-[#668A68]/30">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#243027] text-[#D29A5A] text-[10px] font-mono uppercase font-bold tracking-widest border border-[#668A68]/40">
                  Official Statutory Certificate
                </div>
                <h3 class="text-2xl font-black text-[#F4F1E6] font-serif tracking-tight">
                  Certificate of RUCO Compliance
                </h3>
                <p class="text-xs text-[#F4F1E6]/80">Pursuant to FSSAI Order File No. 1-2/Enf/RUCO/FSSAI/2018</p>
              </div>

              <div class="space-y-4 text-xs">
                <div class="flex justify-between py-2 border-b border-[#668A68]/30">
                  <span class="text-[#F4F1E6]/70">Certified FBO Facility:</span>
                  <span class="font-bold text-[#F4F1E6] font-mono">Your Commercial Kitchen</span>
                </div>
                <div class="flex justify-between py-2 border-b border-[#668A68]/30">
                  <span class="text-[#F4F1E6]/70">Annual Sequestration:</span>
                  <span class="font-mono font-bold text-[#D29A5A]">{{ formatNumber(monthlyLiters * 12) }} Liters UCO</span>
                </div>
                <div class="flex justify-between py-2 border-b border-[#668A68]/30">
                  <span class="text-[#F4F1E6]/70">Net Carbon Offset:</span>
                  <span class="font-mono font-bold text-[#D29A5A]">{{ formatNumber(Math.round(monthlyLiters * 12 * 3.0)) }} kg CO₂e</span>
                </div>
                <div class="flex justify-between py-2 border-b border-[#668A68]/30">
                  <span class="text-[#F4F1E6]/70">Regulatory Ledger ID:</span>
                  <span class="font-mono text-[#F4F1E6]">{{ 'RUCO-2026-VAL-9821' }}</span>
                </div>
              </div>

              <!-- Certificate Footer Seal -->
              <div class="pt-4 flex items-center justify-between">
                <div class="flex items-center gap-2 text-xs text-[#F4F1E6] font-bold">
                  <span class="w-3 h-3 rounded-full bg-[#D29A5A] animate-pulse"></span>
                  <span>100% Audit Proof</span>
                </div>
                <button 
                  @click="$emit('open-register')"
                  class="px-4 py-2 bg-[#D29A5A] hover:bg-[#C08949] text-[#243027] font-bold text-xs rounded-xl shadow-lg transition cursor-pointer"
                >
                  Claim Site Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 5: FINAL CALL TO ACTION (The Decisive Decision)                    -->
    <!-- ========================================================================= -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div class="relative bg-[#31543B] rounded-3xl border-2 border-[#668A68]/40 p-8 sm:p-14 lg:p-20 shadow-2xl text-center sm:text-left overflow-hidden text-[#F4F1E6]">
        <!-- Ambient Glowing Core -->
        <div class="absolute -right-20 -top-20 w-80 h-80 bg-[#D29A5A]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#243027] text-[#D29A5A] border border-[#668A68]/40 text-xs font-mono uppercase font-bold tracking-wider">
              Zero Upfront Investment &bull; Instant Kitchen QR Placard
            </div>
            <h2 class="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F4F1E6] tracking-tight leading-[1.1]">
              Ready to Clean Up Your Kitchen and Your Conscience?
            </h2>
            <p class="text-base sm:text-lg text-[#F4F1E6]/85 max-w-2xl leading-relaxed">
              Join hundreds of compliant hotels, restaurants, caterers, and food processing facilities turning hazardous cooking oil into dependable green revenue.
            </p>
          </div>

          <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
            <!-- Shimmering Conversion Button -->
            <button 
              @click="$emit('open-register')"
              class="relative group w-full p-[2px] rounded-2xl overflow-hidden shadow-2xl shadow-[#243027]/50 transition-transform duration-300 hover:scale-105 active:scale-98 cursor-pointer"
            >
              <span class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#D29A5A_0%,#F4F1E6_50%,#D29A5A_100%)]"></span>
              <span class="relative flex items-center justify-center gap-3 px-8 py-4 bg-[#D29A5A] hover:bg-[#C08949] text-[#243027] font-black text-sm rounded-2xl backdrop-blur-xl transition-colors">
                <span>Register Your Kitchen Now</span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            <!-- Secondary Sign-In Button -->
            <button 
              @click="$emit('open-login')"
              class="w-full px-6 py-4 bg-[#243027] hover:bg-[#1a231c] text-[#F4F1E6] font-bold text-sm rounded-2xl border border-[#668A68]/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Access FBO Portal</span>
            </button>
          </div>
        </div>

        <!-- Footnote Badges -->
        <div class="mt-12 pt-8 border-t border-[#668A68]/30 flex flex-wrap items-center justify-center sm:justify-start gap-8 text-xs text-[#F4F1E6]/80">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#D29A5A]"></span>
            <span>100% Traceable Biofuel Conversion</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#D29A5A]"></span>
            <span>Immediate Digital Form-D Issuance</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#D29A5A]"></span>
            <span>Zero Minimum Volume Penalty</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Sticky Mobile Conversion Bar (Bottom) -->
    <div class="lg:hidden fixed bottom-0 inset-x-0 bg-[#F4F1E6]/95 backdrop-blur-md border-t border-[#668A68]/40 p-3.5 z-30 flex items-center justify-between gap-3 shadow-2xl text-[#243027]">
      <div>
        <div class="text-xs font-bold text-[#243027] flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[#31543B]"></span>
          GeoField RUCO
        </div>
        <div class="text-[10px] text-[#668A68]">Guaranteed ₹55/L Base</div>
      </div>
      <button 
        @click="$emit('open-register')"
        class="px-5 py-2.5 bg-[#31543B] hover:bg-[#243027] text-[#F4F1E6] font-bold text-xs rounded-xl shadow-lg transition cursor-pointer"
      >
        Register Kitchen
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

defineEmits(['open-register', 'open-login']);

// ============================================================================
// 1. INTERACTIVE PARTICLE CANVAS BACKGROUND (Organic Bio-Spore Simulation)
// ============================================================================
const particleCanvas = ref(null);
let animationFrameId = null;

function initParticleField() {
  const canvas = particleCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.65 + 0.25,
      color: Math.random() > 0.4 ? '#49C5B6' : '#A1A1AA',
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting botanical hairline webs between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.strokeStyle = `rgba(73, 197, 182, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    animationFrameId = requestAnimationFrame(render);
  }

  render();

  window.addEventListener('resize', () => {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

// ============================================================================
// 2. SECTION 1: 3D HERO MOUSE PARALLAX & BIOFUEL REACTOR SIMULATOR
// ============================================================================
const heroSection = ref(null);
const heroTiltX = ref(0);
const heroTiltY = ref(0);

function handleHeroMouseMove(e) {
  if (!heroSection.value) return;
  const rect = heroSection.value.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  // Clamped 3D tilt
  heroTiltX.value = Math.min(Math.max(-y / 24, -12), 12);
  heroTiltY.value = Math.min(Math.max(x / 24, -12), 12);
}

function handleHeroMouseLeave() {
  heroTiltX.value = 0;
  heroTiltY.value = 0;
}

const heroParallaxStyle = computed(() => {
  return {
    transform: `perspective(1000px) rotateX(${heroTiltX.value}deg) rotateY(${heroTiltY.value}deg)`,
  };
});

// Interactive Biofuel Reactor Chamber Tiers
const selectedReactorTier = ref(0);

const reactorTiers = [
  {
    code: 'Grade A',
    label: 'Hydrotreated Biofuel HVO: 99.4%',
    tooltip: 'Premium low-TPC virgin collection (TPC ≤ 18%)',
    liquidGradient: 'url(#biofuelClean)',
    bubbleColor: '#49C5B6',
    coreColor: '#49C5B6',
    tpcValue: '14.2% (Optimal Grade)',
    tpcColor: 'text-[#49C5B6]',
    payoutTier: '₹60.00 / Liter'
  },
  {
    code: 'Grade B',
    label: 'Standard B100 Biodiesel: 92%',
    tooltip: 'Standard commercial kitchen oil (TPC ≤ 25%)',
    liquidGradient: 'url(#biofuelStandard)',
    bubbleColor: '#FFFFFF',
    coreColor: '#368E83',
    tpcValue: '23.8% (Standard Tier)',
    tpcColor: 'text-[#49C5B6]',
    payoutTier: '₹55.00 / Liter'
  },
  {
    code: 'Sludge',
    label: 'Toxic Recirculation Sludge',
    tooltip: 'Severely degraded illegal oil (TPC > 25%)',
    liquidGradient: 'url(#biofuelSludge)',
    bubbleColor: '#71717A',
    coreColor: '#3A3A3A',
    tpcValue: '35.2% (Illegal Reuse)',
    tpcColor: 'text-zinc-400',
    payoutTier: 'Mandatory Destruction'
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
    statusClass: 'bg-[#8C4A32]/20 text-[#8C4A32] border-[#8C4A32]/40',
    verdict: 'Carcinogenic Oxidation',
    verdictColor: 'text-[#8C4A32]',
    tpcColor: 'text-[#8C4A32]',
    ffa: '8.4% (Critical)',
    legal: 'STRICTLY BANNED',
    legalColor: 'text-[#8C4A32]',
    description: 'Repeatedly reheated cooking oil tested at 34.8% TPC. Highly toxic polar polymers directly increase risks of vascular plaques, arterial inflammation, and cellular degeneration.'
  },
  {
    name: 'Unlabeled Repackaging Canister',
    icon: '🛢️',
    tpc: 28.2,
    statusText: 'Black Market',
    statusClass: 'bg-[#D29A5A]/20 text-[#D29A5A] border-[#D29A5A]/40',
    verdict: 'Illegal Recirculation',
    verdictColor: 'text-[#D29A5A]',
    tpcColor: 'text-[#D29A5A]',
    ffa: '5.2% (Degraded)',
    legal: 'SEIZURE WARRANT',
    legalColor: 'text-[#D29A5A]',
    description: 'Black-market repackaged oil sold back into local snack manufacturing. Bypasses mandatory FSSAI traceability and contaminates consumer food streams.'
  },
  {
    name: 'GeoField Sealed Bio-Drum',
    icon: '🌿',
    tpc: 17.6,
    statusText: '100% Certified',
    statusClass: 'bg-[#668A68]/20 text-[#D29A5A] border-[#668A68]/40',
    verdict: 'Clean Biofuel Grade',
    verdictColor: 'text-[#D29A5A]',
    tpcColor: 'text-[#D29A5A]',
    ffa: '1.8% (Optimal)',
    legal: 'APPROVED FOR PAYOUT',
    legalColor: 'text-[#D29A5A]',
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
  activeProcessStep.value = 2; // Move van to destination step

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

@keyframes spinVerySlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-very-slow {
  animation: spinVerySlow 28s linear infinite;
}

@keyframes spinReverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-spin-reverse {
  animation: spinReverse 20s linear infinite;
}

@keyframes floatBubbles {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-16px);
  }
}

.animate-float-bubbles {
  animation: floatBubbles 3.5s ease-in-out infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -100;
  }
}

.animate-dash {
  animation: dash 5s linear infinite;
}
</style>
