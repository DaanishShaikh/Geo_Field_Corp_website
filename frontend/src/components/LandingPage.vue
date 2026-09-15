<template>
  <div class="landing-page relative bg-[#FAF8F5] text-[#1E2820] selection:bg-[#C85A32] selection:text-white font-sans antialiased">
    
    <!-- ========================================================================= -->
    <!-- SECTION 1: THE HERO (The Visceral Hook)                                   -->
    <!-- ========================================================================= -->
    <section 
      ref="heroSection"
      class="relative pt-12 pb-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full border-b border-[#E2DCD2]"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        <!-- Left Column: Copy & Architectural CTAs -->
        <div class="lg:col-span-7 space-y-8 text-left">
          
          <!-- Regulatory Eyebrow Tag -->
          <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-[#EFEAE1] border border-[#D8D0C3] text-xs font-semibold tracking-wider text-[#233127] uppercase">
            <span class="w-2 h-2 rounded-full bg-[#C85A32]"></span>
            <span>National RUCO Compliance Network</span>
            <span class="text-[#8C857B]">&bull;</span>
            <span class="font-mono text-[11px] text-[#4A524B]">FSSAI Reg. #RUCO-IND-2026</span>
          </div>

          <!-- Headline -->
          <div class="space-y-2">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E2820] leading-[1.12]">
              Stop the Toxic Cycle. <br />
              <span class="text-[#233127] underline decoration-[#C85A32] decoration-4 underline-offset-8">
                Start the Green Revenue.
              </span>
            </h1>
          </div>

          <!-- Sub-headline -->
          <p class="text-base sm:text-lg text-[#4A524B] max-w-2xl leading-relaxed font-normal">
            Join India’s smartest RUCO aggregation network. We take the hassle out of FSSAI compliance with instant QR-based disposal, cluster-based pickups, and real-time environmental tracking.
          </p>

          <!-- Primary & Secondary CTAs -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
            <button 
              @click="$emit('open-register')"
              class="px-7 py-3.5 bg-[#C85A32] hover:bg-[#B34E29] text-white font-semibold text-sm rounded-md border border-[#B34E29] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Join the Clean Network</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <a 
              href="#threat-section"
              class="px-6 py-3.5 bg-[#F5F2EB] hover:bg-[#ECE5D8] text-[#233127] font-semibold text-sm rounded-md border border-[#D8D0C3] transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore The 60% Crisis</span>
              <svg class="w-4 h-4 text-[#767E77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          <!-- Proof Metrics Bar -->
          <div class="pt-6 border-t border-[#E2DCD2] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div class="p-3 bg-[#F5F2EB] rounded-md border border-[#E2DCD2]">
              <div class="text-xs text-[#5C645D] uppercase tracking-wider font-semibold">Guaranteed Payout</div>
              <div class="text-lg font-bold text-[#1E2820] mt-0.5">₹55 – ₹60 <span class="text-xs font-normal text-[#5C645D]">/ Liter</span></div>
            </div>
            <div class="p-3 bg-[#F5F2EB] rounded-md border border-[#E2DCD2]">
              <div class="text-xs text-[#5C645D] uppercase tracking-wider font-semibold">Statutory Audit</div>
              <div class="text-lg font-bold text-[#1E2820] mt-0.5">Form-D <span class="text-xs font-normal text-[#5C645D]">Instant Certificate</span></div>
            </div>
            <div class="p-3 bg-[#F5F2EB] rounded-md border border-[#E2DCD2]">
              <div class="text-xs text-[#5C645D] uppercase tracking-wider font-semibold">Collection Fleet</div>
              <div class="text-lg font-bold text-[#1E2820] mt-0.5">2km Radius <span class="text-xs font-normal text-[#5C645D]">Cluster Routing</span></div>
            </div>
          </div>
        </div>

        <!-- Right Column: Tactile Closed-Loop Infrastructure Inspector -->
        <div class="lg:col-span-5">
          <div class="bg-white rounded-lg border border-[#E2DCD2] p-6 shadow-xs space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-[#E2DCD2]">
              <div>
                <span class="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#767E77]">Physical Architecture</span>
                <h3 class="text-base font-bold text-[#1E2820]">RUCO Closed-Loop Custody</h3>
              </div>
              <span class="px-2.5 py-1 rounded bg-[#EFEAE1] border border-[#D8D0C3] text-[10px] font-mono font-bold text-[#233127]">
                LIVE LOGISTICS
              </span>
            </div>

            <!-- 4 Stage Selector Tabs -->
            <div class="grid grid-cols-4 gap-1.5 p-1 bg-[#F5F2EB] rounded-md border border-[#E2DCD2]">
              <button 
                v-for="(stage, idx) in infrastructureStages"
                :key="idx"
                @click="activeStageIdx = idx"
                :class="activeStageIdx === idx 
                  ? 'bg-white text-[#233127] font-bold shadow-2xs border border-[#D8D0C3]' 
                  : 'text-[#5C645D] hover:text-[#1E2820] font-medium'"
                class="py-2 text-center text-xs rounded transition-all cursor-pointer"
              >
                {{ stage.shortLabel }}
              </button>
            </div>

            <!-- Stage Details Card -->
            <div class="p-5 bg-[#FAF8F5] rounded-md border border-[#E2DCD2] space-y-4">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[11px] font-mono text-[#C85A32] font-bold uppercase tracking-wider">
                    Stage {{ activeStage.step }}: {{ activeStage.name }}
                  </span>
                  <h4 class="text-sm font-bold text-[#1E2820] mt-0.5">{{ activeStage.title }}</h4>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold" :class="activeStage.statusClass">
                  {{ activeStage.status }}
                </span>
              </div>

              <p class="text-xs text-[#4A524B] leading-relaxed">
                {{ activeStage.description }}
              </p>

              <!-- Technical Telemetry Sheet -->
              <div class="pt-3 border-t border-[#E2DCD2] grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span class="text-[11px] text-[#767E77] block">Standard / Requirement</span>
                  <span class="font-semibold text-[#1E2820] font-mono text-[11px]">{{ activeStage.standard }}</span>
                </div>
                <div>
                  <span class="text-[11px] text-[#767E77] block">Verification Metric</span>
                  <span class="font-semibold text-[#1E2820] font-mono text-[11px]">{{ activeStage.metric }}</span>
                </div>
              </div>
            </div>

            <!-- Simulated Batch Manifest -->
            <div class="p-3.5 bg-[#F5F2EB] rounded-md border border-[#E2DCD2] flex items-center justify-between text-xs">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-[#233127]"></span>
                <div>
                  <div class="font-mono font-bold text-[#1E2820] text-[11px]">BATCH #IN-RUCO-8912</div>
                  <div class="text-[10px] text-[#5C645D]">Custody transferred &bull; 210L Bio-diesel yield</div>
                </div>
              </div>
              <span class="text-[11px] font-mono text-[#C85A32] font-semibold">VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 2: THE THREAT (The 60% Crisis in Your Kitchen)                    -->
    <!-- ========================================================================= -->
    <section 
      id="threat-section"
      ref="threatSection"
      class="py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full border-b border-[#E2DCD2]"
    >
      <div class="max-w-3xl mb-14 space-y-3">
        <div class="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
          Public Health & Regulatory Liability
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2820] tracking-tight">
          The 60% Crisis in Your Kitchen
        </h2>
        <p class="text-base text-[#4A524B] leading-relaxed">
          Used cooking oil does not vanish when it leaves commercial kitchens. In India's unregulated informal waste market, tens of thousands of metric tonnes are illicitly repurposed, endangering public health and exposing commercial food operators to license cancellation.
        </p>
      </div>

      <!-- 3 Hard Data Points Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <!-- Threat Point 1: 60% Return -->
        <div class="bg-white rounded-lg border border-[#E2DCD2] p-6 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-3xl sm:text-4xl font-black text-[#C85A32] font-mono">
              {{ countPlate }}%
            </span>
            <span class="text-xs font-mono px-2 py-1 bg-[#FBEBE6] text-[#C85A32] rounded border border-[#F2C5B5] font-semibold">
              UNOFFICIAL FLOW
            </span>
          </div>
          <h3 class="text-base font-bold text-[#1E2820]">
            Returns Directly to Indian Plates
          </h3>
          <p class="text-xs text-[#5C645D] leading-relaxed">
            Over 60% of commercial used cooking oil is siphoned off by uncertified intermediaries, chemically bleached with fuller's earth, and re-sold to roadside snack vendors and local fryers.
          </p>
        </div>

        <!-- Threat Point 2: 25% TPC Limit -->
        <div class="bg-white rounded-lg border border-[#E2DCD2] p-6 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-3xl sm:text-4xl font-black text-[#1E2820] font-mono">
              {{ countTpc }}%
            </span>
            <span class="text-xs font-mono px-2 py-1 bg-[#EFEAE1] text-[#233127] rounded border border-[#D8D0C3] font-semibold">
              FSSAI LIMIT
            </span>
          </div>
          <h3 class="text-base font-bold text-[#1E2820]">
            Statutory Toxicity Threshold
          </h3>
          <p class="text-xs text-[#5C645D] leading-relaxed">
            FSSAI Rule 2.1.2 mandates that cooking oil exceeding 25% Total Polar Compounds (TPC) must be seized and destroyed. Commercial establishments face immediate fines and license suspension for violations.
          </p>
        </div>

        <!-- Threat Point 3: Health Hazard -->
        <div class="bg-white rounded-lg border border-[#E2DCD2] p-6 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-3xl sm:text-4xl font-black text-[#233127] font-mono">
              3.4x
            </span>
            <span class="text-xs font-mono px-2 py-1 bg-[#EFEAE1] text-[#233127] rounded border border-[#D8D0C3] font-semibold">
              PATHOLOGY RISK
            </span>
          </div>
          <h3 class="text-base font-bold text-[#1E2820]">
            Severe Cellular Oxidation
          </h3>
          <p class="text-xs text-[#5C645D] leading-relaxed">
            Thermally degraded oil forms carcinogenic cyclic monomers, acrolein, and free radicals, drastically accelerating cardiovascular plaques, hypertension, and cellular inflammation in consumers.
          </p>
        </div>
      </div>

      <!-- Laboratory Comparison & Chain Inspection -->
      <div class="bg-white rounded-lg border border-[#E2DCD2] p-6 lg:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2DCD2]">
          <div>
            <h3 class="text-base font-bold text-[#1E2820]">Comparative Laboratory Specimen Analysis</h3>
            <p class="text-xs text-[#5C645D]">Evaluate physical degradation parameters across disposal methods</p>
          </div>

          <!-- Specimen Switcher -->
          <div class="flex items-center gap-2">
            <button 
              v-for="(spec, sIdx) in specimens"
              :key="sIdx"
              @click="activeSpecimen = sIdx"
              :class="activeSpecimen === sIdx 
                ? 'bg-[#233127] text-white border-[#233127]' 
                : 'bg-[#F5F2EB] text-[#4A524B] hover:text-[#1E2820] border-[#D8D0C3]'"
              class="px-3 py-1.5 text-xs font-semibold rounded border transition cursor-pointer"
            >
              {{ spec.name }}
            </button>
          </div>
        </div>

        <!-- Tabular Audit Sheet -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div class="md:col-span-7 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#767E77]">Specimen {{ activeSpecimen + 1 }} Profile</span>
              <span class="px-2.5 py-1 rounded text-xs font-mono font-bold" :class="activeSpecimenData.statusClass">
                {{ activeSpecimenData.statusText }}
              </span>
            </div>

            <p class="text-xs text-[#4A524B] leading-relaxed">
              {{ activeSpecimenData.description }}
            </p>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div class="p-3 bg-[#FAF8F5] rounded border border-[#E2DCD2]">
                <div class="text-[11px] text-[#767E77]">Total Polar Compounds</div>
                <div class="text-base font-bold font-mono mt-0.5" :class="activeSpecimenData.tpcColor">
                  {{ activeSpecimenData.tpc }}%
                </div>
              </div>
              <div class="p-3 bg-[#FAF8F5] rounded border border-[#E2DCD2]">
                <div class="text-[11px] text-[#767E77]">Free Fatty Acids (FFA)</div>
                <div class="text-base font-bold font-mono mt-0.5 text-[#1E2820]">
                  {{ activeSpecimenData.ffa }}
                </div>
              </div>
              <div class="p-3 bg-[#FAF8F5] rounded border border-[#E2DCD2]">
                <div class="text-[11px] text-[#767E77]">Statutory Ruling</div>
                <div class="text-base font-bold font-mono mt-0.5" :class="activeSpecimenData.legalColor">
                  {{ activeSpecimenData.legal }}
                </div>
              </div>
            </div>
          </div>

          <!-- Right: FSSAI Compliance Verdict Sheet -->
          <div class="md:col-span-5 p-5 bg-[#FAF8F5] rounded-md border border-[#E2DCD2] space-y-3">
            <div class="text-xs font-bold uppercase tracking-wider text-[#233127] font-mono">
              Audit Verdict & Liability
            </div>
            <div class="text-sm font-semibold text-[#1E2820]">
              {{ activeSpecimenData.verdict }}
            </div>
            <div class="space-y-2 text-xs text-[#5C645D]">
              <div class="flex items-center justify-between py-1 border-b border-[#E2DCD2]">
                <span>FSSAI Form-D Traceability</span>
                <span class="font-mono font-bold text-[#1E2820]">{{ activeSpecimen === 2 ? 'Active & Sealed' : 'None / Void' }}</span>
              </div>
              <div class="flex items-center justify-between py-1 border-b border-[#E2DCD2]">
                <span>Environmental Fate</span>
                <span class="font-mono font-bold text-[#1E2820]">{{ activeSpecimen === 2 ? 'ASTM Biodiesel' : 'Food Recirculation' }}</span>
              </div>
              <div class="flex items-center justify-between py-1">
                <span>FBO Payment Status</span>
                <span class="font-mono font-bold" :class="activeSpecimen === 2 ? 'text-[#233127]' : 'text-[#C85A32]'">
                  {{ activeSpecimen === 2 ? '₹55/L Bank Credit' : 'Unregulated Cash' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 3: THE SOLUTION (Frictionless Disposal. Zero Interruptions.)       -->
    <!-- ========================================================================= -->
    <section class="py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full border-b border-[#E2DCD2]">
      <div class="max-w-3xl mb-14 space-y-3">
        <div class="text-xs font-bold uppercase tracking-wider text-[#233127]">
          Standardized Operating Procedure
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2820] tracking-tight">
          Frictionless Disposal. Zero Interruptions.
        </h2>
        <p class="text-base text-[#4A524B] leading-relaxed">
          GeoField eliminates operational drag in commercial kitchens. No negotiating with grey-market middlemen, no manual logbooks, and no disruptions to your peak dining service.
        </p>
      </div>

      <!-- 3-Step Clean Architectural Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div 
          v-for="(step, idx) in processSteps" 
          :key="idx"
          class="bg-white rounded-lg border border-[#E2DCD2] p-6 space-y-4 hover:border-[#C85A32] transition-colors"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold px-2.5 py-1 bg-[#EFEAE1] text-[#233127] rounded border border-[#D8D0C3]">
              {{ step.badge }}
            </span>
            <span class="font-mono text-xs text-[#767E77]">0{{ idx + 1 }}</span>
          </div>
          <h3 class="text-lg font-bold text-[#1E2820]">{{ step.title }}</h3>
          <p class="text-xs text-[#5C645D] leading-relaxed">{{ step.description }}</p>
        </div>
      </div>

      <!-- Interactive Verification Demo Terminal -->
      <div class="bg-white rounded-lg border border-[#E2DCD2] p-6 sm:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2DCD2]">
          <div>
            <h3 class="text-base font-bold text-[#1E2820]">Field Collection & Form-D Settlement Simulator</h3>
            <p class="text-xs text-[#5C645D]">Experience the 30-second digital verification protocol executed at your kitchen door</p>
          </div>
          <button 
            @click="triggerQrLaserSweep"
            :disabled="isScanningLaser"
            class="px-5 py-2.5 bg-[#233127] hover:bg-[#1A241D] text-white font-semibold text-xs rounded-md border border-[#233127] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{{ isScanningLaser ? 'Executing Verification Protocol...' : 'Run Live Verification Demo' }}</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <!-- Physical Site QR Identifier -->
          <div class="md:col-span-4 flex items-center justify-center">
            <div class="w-56 p-5 bg-[#FAF8F5] rounded-md border border-[#D8D0C3] space-y-4 text-center">
              <div class="text-[10px] font-mono uppercase tracking-wider font-bold text-[#767E77]">
                Site Specimen QR
              </div>
              
              <!-- Clean Minimalist QR Grid -->
              <div class="w-32 h-32 mx-auto bg-white p-2 rounded border border-[#D8D0C3] flex flex-col justify-between">
                <div class="grid grid-cols-5 gap-1.5 w-full h-full p-1 bg-[#FAF8F5]">
                  <div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#EFEAE1]"></div><div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#1E2820] rounded-xs"></div>
                  <div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#EFEAE1]"></div><div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#EFEAE1]"></div><div class="bg-[#1E2820] rounded-xs"></div>
                  <div class="bg-[#EFEAE1]"></div><div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#C85A32] rounded-xs"></div><div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#EFEAE1]"></div>
                  <div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#EFEAE1]"></div><div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#EFEAE1]"></div><div class="bg-[#1E2820] rounded-xs"></div>
                  <div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#EFEAE1]"></div><div class="bg-[#1E2820] rounded-xs"></div><div class="bg-[#1E2820] rounded-xs"></div>
                </div>
              </div>

              <div class="font-mono text-[11px] font-bold text-[#1E2820]">
                GEO-FBO-MH-4019
              </div>
              <div class="text-[10px] text-[#5C645D]">
                Tamper-evident kitchen seal
              </div>
            </div>
          </div>

          <!-- Protocol Audit Log Stepper -->
          <div class="md:col-span-8 space-y-3">
            <div 
              v-for="(log, lIdx) in scanLogs" 
              :key="lIdx"
              class="p-3 rounded-md border flex items-center justify-between text-xs transition-colors"
              :class="scanProgress >= lIdx + 1 
                ? 'bg-[#F5F2EB] border-[#D8D0C3] text-[#233127]' 
                : 'bg-white border-[#E2DCD2] text-[#8C857B]'"
            >
              <div class="flex items-center gap-3">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold"
                  :class="scanProgress >= lIdx + 1 ? 'bg-[#233127] text-white' : 'bg-[#EFEAE1] text-[#8C857B]'"
                >
                  {{ scanProgress >= lIdx + 1 ? '✓' : (lIdx + 1) }}
                </span>
                <span class="font-medium">{{ log.label }}</span>
              </div>
              <span class="font-mono font-semibold text-[11px]">{{ log.val }}</span>
            </div>

            <!-- Certified Form-D Issuance Banner -->
            <div 
              v-if="scanProgress >= 4"
              class="p-4 bg-[#EFEAE1] rounded-md border border-[#D8D0C3] flex items-center justify-between text-xs transition-all"
            >
              <div>
                <div class="font-bold text-[#233127] flex items-center gap-2">
                  <span>Official Form-D Regulatory Certificate Generated</span>
                </div>
                <div class="text-[11px] text-[#5C645D] font-mono mt-0.5">
                  Ref: CERT-RUCO-2026-9042 &bull; Direct bank disbursement queued
                </div>
              </div>
              <span class="px-3 py-1 rounded bg-[#233127] text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                CERTIFIED
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 4: THE IMPACT & REWARD (Track Your Green Footprint)               -->
    <!-- ========================================================================= -->
    <section class="py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full border-b border-[#E2DCD2]">
      <div class="max-w-3xl mb-14 space-y-3">
        <div class="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
          Environmental Yield & Financial Valuation
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#1E2820] tracking-tight">
          Track Your Green Footprint
        </h2>
        <p class="text-base text-[#4A524B] leading-relaxed">
          Estimate your monthly financial yield and ESG compliance contribution. Every liter of used cooking oil diverted from sewage systems or illegal food fryers is transformed into certified clean biofuel.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <!-- Left: Live Volume Slider & Dynamic Cards -->
        <div class="lg:col-span-7 space-y-8">
          <!-- Slider Control Card -->
          <div class="bg-white rounded-lg border border-[#E2DCD2] p-6 space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs font-semibold text-[#767E77] uppercase tracking-wider">Monthly UCO Output</div>
                <div class="text-2xl sm:text-3xl font-bold font-mono text-[#1E2820] mt-1">
                  {{ formatNumber(monthlyLiters) }} <span class="text-sm font-sans font-normal text-[#5C645D]">Liters / Month</span>
                </div>
              </div>
              <div class="text-right">
                <span class="text-xs font-mono font-semibold px-2.5 py-1 bg-[#EFEAE1] text-[#233127] rounded border border-[#D8D0C3]">
                  Rate: ₹55.00/L
                </span>
              </div>
            </div>

            <!-- Tactile Range Slider -->
            <div class="space-y-2">
              <input 
                v-model.number="monthlyLiters"
                type="range" 
                min="50" 
                max="5000" 
                step="25"
                class="w-full h-2 bg-[#E2DCD2] rounded-lg appearance-none cursor-pointer accent-[#C85A32]"
              />
              <div class="flex justify-between text-[11px] font-mono text-[#767E77]">
                <span>50 L (Small Bistro)</span>
                <span>1,000 L (QSR Chain)</span>
                <span>5,000 L (Industrial Kitchen)</span>
              </div>
            </div>
          </div>

          <!-- 4 Impact Metric Blocks -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Metric 1: Annual Revenue -->
            <div class="bg-white rounded-lg border border-[#E2DCD2] p-5 space-y-2">
              <span class="text-xs text-[#5C645D] font-semibold uppercase tracking-wider">Estimated Annual Payout</span>
              <div class="text-2xl font-bold font-mono text-[#C85A32]">
                ₹{{ formatNumber(monthlyLiters * 55 * 12) }}
              </div>
              <p class="text-[11px] text-[#767E77] leading-relaxed">
                Direct monthly NEFT/RTGS settlement into your registered commercial bank account.
              </p>
            </div>

            <!-- Metric 2: CO2 Displaced -->
            <div class="bg-white rounded-lg border border-[#E2DCD2] p-5 space-y-2">
              <span class="text-xs text-[#5C645D] font-semibold uppercase tracking-wider">GHG Emissions Prevented</span>
              <div class="text-2xl font-bold font-mono text-[#233127]">
                {{ formatNumber(Math.round(monthlyLiters * 12 * 3.0)) }} <span class="text-xs font-sans text-[#5C645D]">kg CO₂e</span>
              </div>
              <p class="text-[11px] text-[#767E77] leading-relaxed">
                Lifecycle emissions displaced by replacing petroleum diesel with ASTM D6751 fuel.
              </p>
            </div>

            <!-- Metric 3: Water Saved -->
            <div class="bg-white rounded-lg border border-[#E2DCD2] p-5 space-y-2">
              <span class="text-xs text-[#5C645D] font-semibold uppercase tracking-wider">Freshwater Protected</span>
              <div class="text-2xl font-bold font-mono text-[#1E2820]">
                {{ formatNumber(monthlyLiters * 12) }} <span class="text-xs font-sans text-[#5C645D]">M Liters</span>
              </div>
              <p class="text-[11px] text-[#767E77] leading-relaxed">
                Preventing dense hydrocarbon films from suffocating municipal water infrastructure.
              </p>
            </div>

            <!-- Metric 4: Biofuel Yield -->
            <div class="bg-white rounded-lg border border-[#E2DCD2] p-5 space-y-2">
              <span class="text-xs text-[#5C645D] font-semibold uppercase tracking-wider">Biofuel Produced</span>
              <div class="text-2xl font-bold font-mono text-[#233127]">
                {{ formatNumber(Math.round(monthlyLiters * 12 * 0.92)) }} <span class="text-xs font-sans text-[#5C645D]">Liters</span>
              </div>
              <p class="text-[11px] text-[#767E77] leading-relaxed">
                High-cetane, low-sulfur renewable diesel fuel supplied to certified off-takers.
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Paper-like Official ESG Certificate Preview -->
        <div class="lg:col-span-5">
          <div class="bg-[#FAF8F5] rounded-lg border-2 border-[#D8D0C3] p-7 space-y-6 shadow-xs relative">
            <div class="text-center space-y-2 pb-6 border-b border-[#E2DCD2]">
              <div class="text-[10px] font-mono tracking-widest uppercase font-bold text-[#767E77]">
                Environmental, Social & Governance Audit
              </div>
              <h3 class="text-lg font-serif font-bold text-[#1E2820]">
                Certificate of Sustainable Disposal
              </h3>
              <p class="text-[11px] text-[#5C645D]">Issued pursuant to FSSAI RUCO Directive (Section 16)</p>
            </div>

            <div class="space-y-3 text-xs">
              <div class="flex justify-between py-1.5 border-b border-[#E2DCD2]">
                <span class="text-[#767E77]">Audited Facility</span>
                <span class="font-bold text-[#1E2820]">Commercial Kitchen Partner</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-[#E2DCD2]">
                <span class="text-[#767E77]">Annual Sequestration</span>
                <span class="font-mono font-bold text-[#1E2820]">{{ formatNumber(monthlyLiters * 12) }} Liters UCO</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-[#E2DCD2]">
                <span class="text-[#767E77]">Net Carbon Offset</span>
                <span class="font-mono font-bold text-[#233127]">{{ formatNumber(Math.round(monthlyLiters * 12 * 3.0)) }} kg CO₂e</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-[#E2DCD2]">
                <span class="text-[#767E77]">Disposal Verification Code</span>
                <span class="font-mono text-[#767E77]">RUCO-ESG-2026-VAL</span>
              </div>
            </div>

            <div class="pt-4 flex items-center justify-between">
              <div class="flex items-center gap-2 text-[11px] text-[#233127] font-semibold">
                <span class="w-2.5 h-2.5 rounded-full bg-[#233127]"></span>
                <span>Government Audited Trace</span>
              </div>
              <button 
                @click="$emit('open-register')"
                class="px-3.5 py-1.5 bg-[#EFEAE1] hover:bg-[#E5DFD4] text-[#233127] rounded text-xs font-semibold border border-[#D8D0C3] transition cursor-pointer"
              >
                Claim Site Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 5: FINAL CALL TO ACTION (The Decisive Decision)                    -->
    <!-- ========================================================================= -->
    <section class="py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full">
      <div class="bg-[#233127] text-[#FAF8F5] rounded-lg border border-[#344439] p-8 sm:p-12 lg:p-16 space-y-8 text-center sm:text-left">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2D3B32] border border-[#3D4C42] text-[11px] font-mono uppercase tracking-wider text-[#FAF8F5]">
              Zero Upfront Cost &bull; Instant Kitchen QR
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to Clean Up Your Kitchen and Your Conscience?
            </h2>
            <p class="text-base text-[#D4CDC3] max-w-2xl leading-relaxed">
              Join hundreds of compliant hotels, restaurants, caterers, and food processing facilities turning hazardous cooking oil into dependable green revenue.
            </p>
          </div>

          <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
            <button 
              @click="$emit('open-register')"
              class="w-full px-7 py-4 bg-[#C85A32] hover:bg-[#B34E29] text-white font-semibold text-sm rounded-md border border-[#B34E29] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register Your Kitchen Now</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button 
              @click="$emit('open-login')"
              class="w-full px-7 py-4 bg-[#2D3B32] hover:bg-[#37473D] text-[#FAF8F5] font-semibold text-sm rounded-md border border-[#3D4C42] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Access FBO Portal</span>
            </button>
          </div>
        </div>

        <!-- Footnote Badges -->
        <div class="pt-8 border-t border-[#344439] flex flex-wrap items-center justify-center sm:justify-start gap-6 text-xs text-[#D4CDC3]">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C85A32]"></span>
            <span>100% Traceable Biofuel Conversion</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C85A32]"></span>
            <span>Immediate Digital Form-D Issuance</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C85A32]"></span>
            <span>Zero Minimum Volume Penalty</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Sticky Mobile Conversion Bar (Bottom) -->
    <div class="lg:hidden fixed bottom-0 inset-x-0 bg-[#FAF8F5] border-t border-[#E2DCD2] p-3 z-30 flex items-center justify-between gap-3 shadow-md">
      <div>
        <div class="text-xs font-bold text-[#1E2820]">GeoField RUCO</div>
        <div class="text-[10px] text-[#5C645D]">Guaranteed ₹55/L Base</div>
      </div>
      <button 
        @click="$emit('open-register')"
        class="px-4 py-2 bg-[#C85A32] hover:bg-[#B34E29] text-white font-semibold text-xs rounded-md border border-[#B34E29] transition cursor-pointer"
      >
        Register Kitchen
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

defineEmits(['open-register', 'open-login']);

// ============================================================================
// 1. SECTION 1: INFRASTRUCTURE CLOSED-LOOP STAGES
// ============================================================================
const activeStageIdx = ref(0);

const infrastructureStages = [
  {
    step: '01',
    shortLabel: 'Kitchen',
    name: 'FBO Segregation',
    title: 'Source Kitchen Storage & TPC Safeguard',
    status: 'ACTIVE CUSTODY',
    statusClass: 'bg-[#EFEAE1] text-[#233127] border border-[#D8D0C3]',
    description: 'Commercial kitchens store drained frying oil into dedicated, food-grade GeoField collection drums fitted with unique tamper-evident QR identifiers.',
    standard: 'FSSAI Section 16 & Rule 2.1.2',
    metric: 'TPC < 25.0% threshold check'
  },
  {
    step: '02',
    shortLabel: 'Cluster Depot',
    name: 'Regional Depot',
    title: 'Cluster Depot Batch Consolidation',
    status: 'BATCH CONSOLIDATED',
    statusClass: 'bg-[#EFEAE1] text-[#233127] border border-[#D8D0C3]',
    description: 'Electric collection vans deliver consolidated drums to regional aggregation hubs. Mass-balance verification ensures 100% volume accountability.',
    standard: 'Calibrated Flow Metrology (Class 0.5)',
    metric: '±0.1% volumetric tolerance'
  },
  {
    step: '03',
    shortLabel: 'Refinery',
    name: 'Transesterification',
    title: 'Catalytic Biodiesel Transesterification',
    status: 'BIO-CONVERSION',
    statusClass: 'bg-[#EFEAE1] text-[#233127] border border-[#D8D0C3]',
    description: 'Pre-treated UCO undergoes transesterification with methanol and catalyst, separating raw glycerine and refining pure methyl esters (FAME).',
    standard: 'IS 15607 / ASTM D6751',
    metric: '92.4% conversion yield efficiency'
  },
  {
    step: '04',
    shortLabel: 'Off-Take',
    name: 'Clean Off-Take',
    title: 'Industrial & Transport Fuel Blending',
    status: 'DISPLACING FOSSIL DIESEL',
    statusClass: 'bg-[#FBEBE6] text-[#C85A32] border border-[#F2C5B5]',
    description: 'Certified biodiesel is delivered directly to public transport fleets and heavy industrial off-takers, cutting lifecycle carbon emissions by over 85%.',
    standard: 'National Policy on Biofuels 2018',
    metric: '3.0 kg CO₂e offset per liter'
  }
];

const activeStage = computed(() => infrastructureStages[activeStageIdx.value]);

// ============================================================================
// 2. SECTION 2: THE THREAT & LABORATORY SPECIMENS
// ============================================================================
const threatSection = ref(null);
const countPlate = ref(0);
const countTpc = ref(0);
let hasAnimatedCounters = false;

function startCounterAnimation() {
  if (hasAnimatedCounters) return;
  hasAnimatedCounters = true;

  const duration = 1200;
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

// Laboratory Specimens
const activeSpecimen = ref(0);
const specimens = [
  {
    name: 'Street Fryer Vat',
    statusText: 'Severe Hazard',
    statusClass: 'bg-[#FBEBE6] text-[#C85A32] border border-[#F2C5B5]',
    tpc: 34.8,
    tpcColor: 'text-[#C85A32]',
    ffa: '8.4%',
    legal: 'BANNED OIL',
    legalColor: 'text-[#C85A32]',
    verdict: 'Non-compliant: Carcinogenic polymer formation exceeds statutory limit.',
    description: 'Repeatedly reheated commercial frying oil. Exhibits advanced thermal polymerisation, synthetic trans-isomer formation, and high toxicity markers.'
  },
  {
    name: 'Informal Canister',
    statusText: 'Seizure Notice',
    statusClass: 'bg-[#FBEBE6] text-[#C85A32] border border-[#F2C5B5]',
    tpc: 28.2,
    tpcColor: 'text-[#C85A32]',
    ffa: '5.2%',
    legal: 'CONFISCATION',
    legalColor: 'text-[#C85A32]',
    verdict: 'Seizure: Black-market repacked oil diverted without FSSAI disposal records.',
    description: 'Illegally aggregated used oil intended for bleaching and re-entry into consumer snacks. Missing mandatory Form-D batch custody documents.'
  },
  {
    name: 'GeoField Sealed Drum',
    statusText: 'Certified Compliant',
    statusClass: 'bg-[#EFEAE1] text-[#233127] border border-[#D8D0C3]',
    tpc: 17.4,
    tpcColor: 'text-[#233127]',
    ffa: '1.8%',
    legal: 'APPROVED',
    legalColor: 'text-[#233127]',
    verdict: 'Compliant: Meets all RUCO quality standards. Cleared for direct payout.',
    description: 'Properly segregated used cooking oil collected in sealed GeoField containers. Digital sensor verified and routed for clean bio-refining.'
  }
];

const activeSpecimenData = computed(() => specimens[activeSpecimen.value]);

// ============================================================================
// 3. SECTION 3: THREE-STAGE WORKFLOW & QR SCAN DEMO
// ============================================================================
const processSteps = [
  {
    badge: 'Stage 01',
    title: 'Register & QR Deployment',
    description: 'Complete our 3-step onboarding to receive a durable, waterproof QR site placard matched directly to your FSSAI license for kitchen mounting.'
  },
  {
    badge: 'Stage 02',
    title: 'Cluster-Based Route Pickups',
    description: 'Our electric fleet operates in optimized 2km cluster radiuses. Pickups are scheduled at your convenience during non-peak kitchen preparation hours.'
  },
  {
    badge: 'Stage 03',
    title: 'Scan, Form-D & Instant Settlement',
    description: 'Our certified agent scans your QR, records verified drum weight, issues an immutable digital Form-D compliance certificate, and triggers your payout.'
  }
];

const isScanningLaser = ref(false);
const scanProgress = ref(0);
const scanLogs = ref([
  { label: 'Site Placard Identity Validated', val: 'GEO-FBO-MH-4019' },
  { label: 'Ultrasonic Flow Scale Measurement', val: '185.4 Liters' },
  { label: 'Digital Polar Sensor Reading', val: '19.2% TPC (Grade A)' },
  { label: 'Immutable Form-D Cryptographic Seal', val: 'CERT-2026-9042' }
]);

function triggerQrLaserSweep() {
  if (isScanningLaser.value) return;
  isScanningLaser.value = true;
  scanProgress.value = 0;

  let step = 0;
  const interval = setInterval(() => {
    step++;
    scanProgress.value = step;
    if (step >= 4) {
      clearInterval(interval);
      setTimeout(() => {
        isScanningLaser.value = false;
      }, 400);
    }
  }, 350);
}

// ============================================================================
// 4. SECTION 4: ESTIMATOR & CALCULATIONS
// ============================================================================
const monthlyLiters = ref(450);

function formatNumber(num) {
  return Number(num || 0).toLocaleString('en-IN');
}

// ============================================================================
// LIFECYCLE
// ============================================================================
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
    startCounterAnimation();
  }
});
</script>
