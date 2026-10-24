<template>
  <div class="landing-page relative bg-obsidian text-slate-100 min-h-screen selection:bg-bio selection:text-emerald-950 font-sans">
    <!-- Grain Noise Overlay -->
    <div class="grain-overlay" aria-hidden="true"></div>

    <!-- Reading Scroll Progress Bar -->
    <div class="fixed top-0 inset-x-0 h-[3px] z-50 pointer-events-none bg-transparent overflow-hidden">
      <div 
        class="h-full w-full bg-gradient-to-r from-bio via-limeglow to-biodark shadow-[0_0_12px_rgba(34,197,94,0.9)] origin-left will-change-transform"
        :style="{ transform: `scaleX(${scrollProgress})` }"
      ></div>
    </div>

    <!-- ========================================================================= -->
    <!-- 1. NAVIGATION BAR                                                         -->
    <!-- ========================================================================= -->
    <header
      data-testid="navbar"
      class="fixed inset-x-0 top-0 z-40 transition-all duration-500"
      :class="isScrolled ? 'border-b border-bio/10 bg-obsidian/85 backdrop-blur-xl py-3.5 shadow-2xl' : 'bg-transparent py-5'"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" data-testid="nav-logo" class="group flex items-center">
          <img
            src="/brand/logo.svg"
            alt="GeoField Corp — Renew. Refine. Return."
            class="h-9 sm:h-10 w-auto transition-transform duration-700 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
          />
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden items-center gap-8 lg:flex" data-testid="nav-links">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            :data-testid="`nav-link-${link.id}`"
            class="group relative font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400 transition-colors duration-300 hover:text-slate-100"
          >
            {{ link.label }}
            <span class="absolute -bottom-1 left-0 h-px w-0 bg-bio transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <!-- Right Action Buttons -->
        <div class="flex items-center gap-3">
          <button
            @click="$emit('open-login')"
            class="hidden sm:inline-flex px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          
          <button
            data-testid="nav-register-btn"
            @click="$emit('open-register')"
            class="group hidden sm:flex items-center gap-2 rounded-full bg-bio px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-950 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Join Network
            <ArrowUpRight
              :size="14"
              :stroke-width="2.5"
              class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button
            data-testid="nav-menu-btn"
            @click="mobileMenuOpen = true"
            class="grid h-10 w-10 place-items-center rounded-full border border-bio/20 text-slate-200 lg:hidden hover:border-bio/50 transition-colors"
            aria-label="Open menu"
          >
            <Menu :size="18" />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Slide-out Menu Drawer -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-10px]"
    >
      <div
        v-if="mobileMenuOpen"
        data-testid="nav-mobile-menu"
        class="fixed inset-0 z-[90] flex flex-col bg-obsidian/95 backdrop-blur-2xl lg:hidden p-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] overflow-y-auto"
      >
        <div class="flex items-center justify-between py-2 shrink-0">
          <img src="/brand/logo.svg" alt="GeoField Corp" class="h-8 w-auto" />
          <button
            data-testid="nav-menu-close-btn"
            @click="mobileMenuOpen = false"
            class="grid h-11 w-11 place-items-center rounded-full border border-bio/20 text-slate-300 hover:text-white hover:border-bio/50 active:scale-95 transition"
            aria-label="Close menu"
          >
            <X :size="20" />
          </button>
        </div>

        <nav class="flex flex-1 flex-col justify-center gap-1 sm:gap-2 px-3 sm:px-6 my-auto py-6">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            :data-testid="`nav-mobile-link-${link.id}`"
            @click="mobileMenuOpen = false"
            class="border-b border-bio/10 py-3.5 sm:py-5 font-display text-2xl sm:text-3xl font-bold text-slate-100 transition-colors hover:text-bio min-h-[44px] flex items-center"
          >
            {{ link.label }}
          </a>

          <button
            @click="mobileMenuOpen = false; $emit('open-login')"
            class="py-3.5 sm:py-4 text-left font-display text-xl sm:text-2xl font-bold text-slate-400 border-b border-bio/10 hover:text-white min-h-[44px] flex items-center cursor-pointer transition-colors"
          >
            Sign In to Portal
          </button>

          <button
            data-testid="nav-mobile-register-btn"
            @click="mobileMenuOpen = false; $emit('open-register')"
            class="mt-6 sm:mt-8 flex items-center justify-center gap-2 rounded-full bg-bio py-3.5 sm:py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-emerald-950 shadow-[0_0_30px_rgba(34,197,94,0.4)] min-h-[48px] active:scale-95 transition cursor-pointer"
          >
            Join the Clean Network <ArrowUpRight :size="15" :stroke-width="2.5" />
          </button>
        </nav>
      </div>
    </transition>

    <!-- ========================================================================= -->
    <!-- 2. HERO SECTION                                                           -->
    <!-- ========================================================================= -->
    <section
      id="top"
      ref="heroRef"
      data-testid="hero-section"
      @mousemove="handleHeroMouseMove"
      @mouseleave="handleHeroMouseLeave"
      class="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 lg:pt-24"
    >
      <!-- Atmospheric Ambient Glows -->
      <div
        class="pointer-events-none absolute inset-0"
        style="background: radial-gradient(ellipse 70% 55% at 72% 42%, rgba(34,197,94,0.13) 0%, transparent 65%), radial-gradient(ellipse 45% 40% at 12% 88%, rgba(245,158,11,0.07) 0%, transparent 70%);"
      ></div>
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.35]"
        style="background-image: linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 75%);"
      ></div>

      <div class="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-6">
        <!-- Hero Left Copy Column -->
        <div class="lg:col-span-7 will-change-transform" :style="heroCopyStyle">
          <!-- Eyebrow Badge -->
          <div
            data-testid="hero-eyebrow"
            class="mb-8 inline-flex items-center gap-3 rounded-full border border-bio/25 bg-bio/5 px-4 py-2"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-bio animate-pulse-dot"></span>
            <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-bio sm:text-[11px]">
              RUCO Aggregation Network — India
            </span>
          </div>

          <!-- Staggered Headline Lines -->
          <h1
            data-testid="hero-headline"
            class="font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-50 xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl sm:leading-[1.04]"
          >
            <span class="block overflow-hidden pb-1">
              <span class="block">Stop the</span>
            </span>
            <span class="block overflow-hidden pb-1">
              <span class="block text-toxic">Toxic Cycle.</span>
            </span>
            <span class="block overflow-hidden pb-1">
              <span class="block">Start the</span>
            </span>
            <span class="block overflow-hidden pb-1">
              <span class="block bg-gradient-to-r from-bio via-limeglow to-bio bg-clip-text text-transparent">
                Green Revenue.
              </span>
            </span>
          </h1>

          <!-- Subheadline -->
          <p
            data-testid="hero-subheadline"
            class="mt-6 sm:mt-7 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-lg"
          >
            Join India's smartest RUCO aggregation network. We take the hassle out of
            FSSAI compliance with instant QR-based disposal, cluster-based pickups, and
            real-time environmental tracking.
          </p>

          <!-- CTAs -->
          <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <button
              data-testid="hero-register-btn"
              @click="$emit('open-register')"
              class="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-bio px-6 py-3.5 sm:px-8 sm:py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-emerald-950 transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] active:scale-[0.97] cursor-pointer min-h-[48px] w-full sm:w-auto"
            >
              <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
              Join the Clean Network
              <ArrowUpRight :size="16" :stroke-width="2.5" class="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <a
              data-testid="hero-process-link"
              href="#process"
              class="group flex items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3.5 sm:px-7 sm:py-4 font-mono text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-slate-300 transition-all duration-500 hover:-translate-y-0.5 hover:border-bio/50 hover:text-bio min-h-[48px] w-full sm:w-auto"
            >
              See how it works
              <span class="transition-transform duration-500 group-hover:translate-y-1">↓</span>
            </a>
          </div>

          <!-- Proof Strip -->
          <div
            data-testid="hero-proof-strip"
            class="mt-10 sm:mt-12 flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-slate-500"
          >
            <span>60-Sec Registration</span>
            <span class="text-bio/60">/</span>
            <span>FSSAI Compliant</span>
            <span class="text-bio/60">/</span>
            <span>Zero Interruptions</span>
          </div>
        </div>

        <!-- Hero Right 3D Visual Card -->
        <div
          data-testid="hero-visual"
          class="relative h-[400px] xs:h-[440px] sm:h-[520px] lg:col-span-5 lg:h-[580px]"
        >
          <!-- Dynamic Radial Glow Behind Card -->
          <div
            class="absolute inset-4 sm:inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_45%,rgba(34,197,94,0.28),transparent_68%)] blur-2xl pointer-events-none will-change-transform"
            :style="heroGlowStyle"
          ></div>

          <!-- Main Tilted Kitchen Image Card -->
          <div
            class="absolute inset-x-4 sm:inset-x-14 top-4 sm:top-6 bottom-14 sm:bottom-16 overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-bio/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] will-change-transform"
            :style="heroImgStyle"
          >
            <img
              src="https://images.unsplash.com/photo-1771360963016-1408c2de12c4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
              alt="Commercial kitchen where used cooking oil is generated"
              class="h-full w-full object-cover"
              loading="eager"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent"></div>
            <div class="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 flex items-end justify-between">
              <div>
                <p class="font-mono text-[9px] uppercase tracking-[0.3em] text-bio">Source Kitchen</p>
                <p class="mt-0.5 sm:mt-1 font-display text-base sm:text-lg font-bold text-slate-100">Cluster 04 — Andheri West</p>
              </div>
              <span class="rounded-full border border-bio/30 bg-obsidian/60 px-2.5 sm:px-3 py-1 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-bio backdrop-blur">
                Live Route
              </span>
            </div>
          </div>

          <!-- Floating Glass Card (Scan Verified) -->
          <div
            data-testid="hero-scan-card"
            class="glass-panel absolute right-0 top-1 sm:top-2 w-44 sm:w-56 rounded-2xl p-3 sm:p-4 sm:right-2 shadow-2xl will-change-transform"
            :style="heroCardStyle"
          >
            <div class="flex items-center gap-2.5 sm:gap-3">
              <span class="grid h-9 w-9 sm:h-11 sm:w-11 place-items-center rounded-xl bg-bio/15 text-bio shrink-0">
                <QrCode :size="18" class="sm:hidden" />
                <QrCode :size="22" class="hidden sm:block" />
              </span>
              <div>
                <p class="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-slate-400">Scan Verified</p>
                <p class="font-display text-sm sm:text-base font-bold text-slate-100">42.6 L logged</p>
              </div>
            </div>
            <div class="mt-2.5 sm:mt-3 flex items-center justify-between border-t border-bio/10 pt-2 sm:pt-3 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em]">
              <span class="text-slate-500">FSSAI Receipt</span>
              <span class="text-bio">#GF-0421</span>
            </div>
          </div>

          <!-- Floating Glass Badge (CO₂ Offset) -->
          <div
            data-testid="hero-offset-badge"
            class="glass-panel absolute bottom-1 sm:bottom-2 left-0 flex items-center gap-2.5 sm:gap-3 rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 sm:left-4 shadow-2xl will-change-transform"
            :style="heroBadgeStyle"
          >
            <span class="relative grid h-8 w-8 sm:h-10 sm:w-10 place-items-center shrink-0">
              <svg viewBox="0 0 40 40" class="absolute inset-0 animate-spin-slow">
                <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(34,197,94,0.25)" stroke-width="1.5" stroke-dasharray="4 5" />
              </svg>
              <Leaf :size="15" class="text-limeglow sm:hidden" />
              <Leaf :size="18" class="text-limeglow hidden sm:block" />
            </span>
            <div>
              <p class="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-slate-400">CO₂ Offset</p>
              <p class="font-display text-sm sm:text-base font-bold text-limeglow">+31.1 T</p>
            </div>
          </div>

          <!-- Vertical Label Indicator -->
          <div class="absolute -left-2 top-24 hidden -rotate-90 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-slate-600 lg:flex">
            <ScanLine :size="12" class="text-bio/60" /> Waste → Energy
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 3. MARQUEE TRUST BANNER                                                   -->
    <!-- ========================================================================= -->
    <div data-testid="marquee" class="relative overflow-hidden border-y border-bio/10 bg-[#0C120F] py-5">
      <div class="animate-marquee flex w-max items-center">
        <div v-for="half in [0, 1]" :key="half" class="flex items-center" :aria-hidden="half === 1">
          <span v-for="(item, i) in marqueeItems" :key="`${half}-${i}`" class="flex items-center">
            <span class="whitespace-nowrap px-8 font-mono text-xs uppercase tracking-[0.35em] text-slate-400">
              {{ item }}
            </span>
            <Leaf :size="13" class="shrink-0 text-bio/60" />
          </span>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 4. THREAT / THE CRISIS SECTION (#crisis)                                  -->
    <!-- ========================================================================= -->
    <section
      id="crisis"
      ref="crisisSectionRef"
      data-testid="threat-section"
      class="relative scroll-mt-20 overflow-hidden py-16 sm:py-32 lg:py-36"
    >
      <div
        class="pointer-events-none absolute inset-0"
        style="background: radial-gradient(ellipse 55% 45% at 85% 20%, rgba(245,158,11,0.08) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 8% 75%, rgba(239,68,68,0.06) 0%, transparent 70%);"
      ></div>
      <span
        aria-hidden="true"
        class="text-outline-amber pointer-events-none absolute -top-6 right-0 select-none font-display text-[22vw] font-extrabold leading-none tracking-tighter opacity-60 lg:text-[16rem] will-change-transform"
        :style="toxicWatermarkStyle"
      >
        TOXIC
      </span>

      <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <!-- Chapter Tag -->
        <div class="mb-6 flex items-center gap-4 scroll-reveal" data-testid="chapter-01">
          <span class="font-mono text-xs font-bold tracking-[0.3em] text-bio">01</span>
          <span class="h-px w-12 bg-bio/40"></span>
          <span class="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">The Threat</span>
        </div>

        <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <!-- Left Column -->
          <div class="lg:col-span-7">
            <h2
              data-testid="threat-headline"
              class="font-display text-2xl font-bold leading-tight tracking-tight text-slate-50 xs:text-3xl sm:text-4xl lg:text-5xl scroll-reveal delay-100"
            >
              The <span class="text-hazard">60%</span> Crisis
              <br />
              in Your Kitchen.
            </h2>

            <p class="mt-5 sm:mt-6 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base scroll-reveal delay-150">
              Shockingly, nearly 60% of all Used Cooking Oil generated in India finds
              its way back into the food stream — resold by informal vendors, reheated,
              and returned to the plate. Every reheat multiplies toxic Total Polar
              Compounds.
            </p>

            <div class="mt-8 sm:mt-14 grid gap-6 sm:gap-10 sm:grid-cols-2">
              <div data-testid="stat-uco-return" class="border-l-2 border-hazard/60 pl-5 sm:pl-6 scroll-reveal delay-200">
                <div class="font-display text-5xl font-extrabold tracking-tight text-hazard sm:text-7xl">
                  {{ animatedUcoReturn }}%
                </div>
                <p class="mt-2.5 sm:mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-hazard/80">
                  High Risk
                </p>
                <p class="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">
                  of UCO in India returns to the food stream through illegal
                  recirculation.
                </p>
              </div>

              <div data-testid="stat-tpc-limit" class="border-l-2 border-toxic/60 pl-5 sm:pl-6 scroll-reveal delay-300">
                <div class="font-display text-5xl font-extrabold tracking-tight text-toxic sm:text-7xl">
                  {{ animatedTpcLimit }}%
                </div>
                <p class="mt-2.5 sm:mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-toxic/80">
                  FSSAI Mandate
                </p>
                <p class="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">
                  TPC limit — oil above this is strictly unsafe for human consumption.
                </p>
              </div>
            </div>

            <!-- Toxicity Per Reheat Bar Card -->
            <div 
              data-testid="toxicity-per-reheat-bar"
              class="mt-8 sm:mt-10 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 sm:p-5 scroll-reveal delay-300 backdrop-blur-sm"
            >
              <div class="flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3">
                <span class="text-slate-400 font-semibold">Toxicity Per Reheat</span>
                <span class="text-hazard font-bold tracking-wider sm:tracking-widest flex items-center gap-1.5">
                  <span class="inline-block h-1.5 w-1.5 rounded-full bg-hazard animate-pulse"></span>
                  TPC Danger Zone
                </span>
              </div>
              
              <!-- Gradient Bar with 25% Mark -->
              <div class="relative h-3.5 w-full rounded-full overflow-hidden bg-slate-950/80 p-0.5 shadow-inner">
                <div 
                  class="h-full w-full rounded-full relative"
                  style="background: linear-gradient(90deg, #22c55e 0%, #22c55e 12%, #eab308 25%, #f97316 45%, #ef4444 75%, #dc2626 100%);"
                >
                  <!-- 25% FSSAI Limit Divider Mark -->
                  <div 
                    class="absolute top-0 bottom-0 left-[25%] w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)] z-10"
                    title="25% FSSAI Limit"
                  ></div>
                </div>
              </div>
              
              <!-- Bottom Markers -->
              <div class="relative mt-2.5 font-mono text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-wider flex justify-between items-center text-slate-300">
                <span class="text-bio font-bold">0% Fresh</span>
                <span class="absolute left-[25%] -translate-x-1/2 whitespace-nowrap text-toxic font-bold">
                  25% FSSAI Limit
                </span>
                <span class="text-hazard font-bold">100% Reused</span>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="lg:col-span-5">
            <div 
              class="relative overflow-hidden rounded-[2rem] border border-toxic/20 scroll-reveal-scale delay-200 will-change-transform"
              :style="crisisBurnerStyle"
            >
              <img
                src="https://images.unsplash.com/photo-1777823703795-050c8384cdae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
                alt="Burner flame reheating cooking oil"
                class="h-64 w-full object-cover sm:h-80"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent"></div>
              <div class="absolute bottom-5 left-5 flex items-center gap-3">
                <span class="grid h-10 w-10 place-items-center rounded-xl bg-toxic/15 text-toxic">
                  <Flame :size="20" />
                </span>
                <div>
                  <p class="font-mono text-[9px] uppercase tracking-[0.25em] text-toxic">Every Reheat</p>
                  <p class="font-display text-sm font-bold text-slate-100">TPC Multiplies</p>
                </div>
              </div>
            </div>

            <!-- Hazard Grid -->
            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              <div
                v-for="(h, i) in hazards"
                :key="h.title"
                :data-testid="`hazard-${i}`"
                :class="`group h-full rounded-2xl border border-slate-800 bg-moss/60 p-5 transition-all duration-300 hover:border-hazard/40 hover:-translate-y-1.5 scroll-reveal delay-${(i + 1) * 100}`"
              >
                <component
                  :is="h.icon"
                  :size="20"
                  class="text-hazard/80 transition-transform duration-300 group-hover:scale-110"
                />
                <p class="mt-3 font-display text-sm font-bold text-slate-100">{{ h.title }}</p>
                <p class="mt-1 text-xs leading-relaxed text-slate-500">{{ h.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 5. SOLUTION / THE PROCESS SECTION (#process)                              -->
    <!-- ========================================================================= -->
    <section
      id="process"
      ref="processSectionRef"
      data-testid="solution-section"
      class="relative scroll-mt-16 overflow-hidden rounded-t-[2.5rem] bg-paper py-16 sm:py-32 lg:py-36 text-ink sm:rounded-t-[3.5rem]"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none absolute -bottom-10 left-0 select-none font-display text-[20vw] font-extrabold leading-none tracking-tighter text-ink/[0.04] lg:text-[15rem] will-change-transform"
        :style="processWatermarkStyle"
      >
        SCAN &amp; DONE
      </span>

      <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <!-- Chapter Tag -->
        <div class="mb-6 flex items-center gap-4 scroll-reveal" data-testid="chapter-02">
          <span class="font-mono text-xs font-bold tracking-[0.3em] text-biodark">02</span>
          <span class="h-px w-12 bg-ink/30"></span>
          <span class="font-mono text-xs uppercase tracking-[0.3em] text-ink/60">The Fix</span>
        </div>

        <div class="flex flex-wrap items-end justify-between gap-6 sm:gap-8">
          <div>
            <h2
              data-testid="solution-headline"
              class="max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl scroll-reveal delay-100"
            >
              Frictionless Disposal.
              <br />
              <span class="text-biodark">Zero Interruptions.</span>
            </h2>
          </div>
          <div>
            <p class="max-w-sm text-xs sm:text-sm leading-relaxed text-ink/60 scroll-reveal delay-150">
              Three steps between your kitchen and full FSSAI compliance. No calls, no
              paperwork, no waiting on informal collectors.
            </p>
          </div>
        </div>

        <!-- Animated Process Track with Delivery Truck -->
        <div class="mt-12 sm:mt-20">
          <div class="relative mb-14 hidden h-16 items-center lg:flex" data-testid="process-track">
            <!-- Background Rail line from Node 1 (8%) to Node 3 (92%) -->
            <div class="absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-ink/15"></div>
            <!-- Dynamic Filled Pipeline that connects exactly to the active station and truck -->
            <div 
              class="absolute left-[8%] top-1/2 h-[3px] -translate-y-1/2 origin-left bg-gradient-to-r from-biodark via-bio to-limeglow transition-all duration-700 ease-out"
              :style="{ width: activeProcessStep === 0 ? '0%' : activeProcessStep === 1 ? '42%' : '84%' }"
            ></div>
            
            <span
              v-for="(pos, idx) in ['8%', '50%', '92%']"
              :key="pos"
              class="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-700"
              :class="activeProcessStep >= idx ? 'border-biodark bg-biodark scale-125 shadow-[0_0_14px_rgba(16,185,129,0.8)]' : 'border-ink/20 bg-paper'"
              :style="{ left: pos }"
            ></span>

            <div
              data-testid="process-van"
              class="absolute top-1/2 z-10 -translate-y-1/2 transition-all duration-700 ease-out will-change-transform"
              :style="{ left: processTruckLeft }"
            >
              <span class="grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-bio text-emerald-950 shadow-[0_0_35px_rgba(34,197,94,0.6)] ring-4 ring-bio/20">
                <Truck :size="24" class="transition-transform duration-300 hover:scale-110" />
              </span>
            </div>
          </div>

          <!-- 3 Process Steps Cards (Always 100% visible, dynamic active highlight) -->
          <div class="grid gap-4 sm:gap-6 lg:grid-cols-3">
            <div
              v-for="(s, i) in steps"
              :key="s.num"
              :data-testid="`process-step-${i + 1}`"
              @mouseenter="manualHoverStep = i"
              @mouseleave="manualHoverStep = null"
              :class="[
                'group relative h-full overflow-hidden rounded-2xl sm:rounded-[1.75rem] border p-5 sm:p-8 transition-all duration-500 hover:-translate-y-2 cursor-pointer',
                activeProcessStep === i 
                  ? 'border-biodark bg-white shadow-[0_30px_60px_-20px_rgba(16,185,129,0.35)] scale-[1.01] sm:scale-[1.02]' 
                  : 'border-ink/10 bg-white/70 hover:border-biodark/40 hover:bg-white hover:shadow-xl'
              ]"
            >
              <div class="flex items-start justify-between">
                <span 
                  :class="[
                    'grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl transition-all duration-500 shrink-0',
                    activeProcessStep === i ? 'bg-bio text-emerald-950 scale-105 sm:scale-110 shadow-lg' : 'bg-biodark/10 text-biodark group-hover:bg-bio group-hover:text-emerald-950'
                  ]"
                >
                  <component :is="s.icon" :size="22" class="sm:hidden" />
                  <component :is="s.icon" :size="26" class="hidden sm:block" />
                </span>
                <span 
                  :class="[
                    'font-mono text-4xl sm:text-5xl font-bold transition-colors duration-500',
                    activeProcessStep === i ? 'text-biodark/40' : 'text-ink/10 group-hover:text-biodark/25'
                  ]"
                >
                  {{ s.num }}
                </span>
              </div>
              <h3 class="mt-6 sm:mt-8 font-display text-lg sm:text-2xl font-bold tracking-tight">
                {{ s.title }}
              </h3>
              <p class="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-ink/60">{{ s.desc }}</p>
              <span 
                :class="[
                  'mt-5 sm:mt-6 block h-1 rounded-full transition-all duration-500',
                  activeProcessStep === i ? 'w-full bg-bio' : 'w-10 bg-biodark/30 group-hover:w-full group-hover:bg-bio'
                ]"
              ></span>
            </div>
          </div>

          <div class="mt-10 sm:mt-12 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 scroll-reveal delay-300">
            <ArrowDown :size="13" class="text-biodark" />
            Then watch what your oil becomes
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 6. IMPACT / THE REWARD SECTION (#impact)                                  -->
    <!-- ========================================================================= -->
    <section
      id="impact"
      ref="impactSectionRef"
      data-testid="impact-section"
      class="relative scroll-mt-20 overflow-hidden py-16 sm:py-32 lg:py-36"
    >
      <div
        class="pointer-events-none absolute inset-0"
        style="background: radial-gradient(ellipse 60% 50% at 50% 60%, rgba(34,197,94,0.1) 0%, transparent 70%);"
      ></div>
      <span
        aria-hidden="true"
        class="text-outline pointer-events-none absolute -top-8 left-0 select-none font-display text-[22vw] font-extrabold leading-none tracking-tighter lg:text-[16rem] will-change-transform"
        :style="impactWatermarkStyle"
      >
        GREEN
      </span>

      <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <!-- Chapter Tag -->
        <div class="mb-6 flex items-center gap-4 scroll-reveal" data-testid="chapter-03">
          <span class="font-mono text-xs font-bold tracking-[0.3em] text-bio">03</span>
          <span class="h-px w-12 bg-bio/40"></span>
          <span class="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">The Reward</span>
        </div>

        <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <!-- Left Column -->
          <div class="lg:col-span-5 scroll-reveal-left delay-100">
            <h2
              data-testid="impact-headline"
              class="font-display text-2xl font-bold leading-tight tracking-tight text-slate-50 xs:text-3xl sm:text-4xl lg:text-5xl"
            >
              Track Your
              <br />
              <span class="bg-gradient-to-r from-bio to-limeglow bg-clip-text text-transparent">
                Green Footprint.
              </span>
            </h2>

            <p class="mt-5 sm:mt-6 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
              Every litre you hand over is weighed, certified, and traced to a refinery.
              Your dashboard turns compliance into a story worth telling — and a payout
              worth collecting.
            </p>

            <div class="mt-6 sm:mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
              <span class="h-1.5 w-1.5 rounded-full bg-bio animate-pulse-dot"></span>
              Dashboard preview — sample data
            </div>
          </div>

          <!-- Right Column: Interactive Impact Console -->
          <div class="lg:col-span-7 scroll-reveal-right delay-200">
            <div
              data-testid="impact-dashboard"
              class="glass-panel relative overflow-hidden rounded-2xl sm:rounded-[2rem] p-4 sm:p-9 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-2 will-change-transform"
              :style="impactConsoleStyle"
            >
              <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-bio/15 blur-3xl"></div>

              <!-- Console Header -->
              <div class="flex items-center justify-between border-b border-bio/10 pb-4 sm:pb-5">
                <div class="flex items-center gap-2.5 sm:gap-3">
                  <span class="flex gap-1.5">
                    <span class="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-hazard/70"></span>
                    <span class="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-toxic/70"></span>
                    <span class="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-bio/80"></span>
                  </span>
                  <span class="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-400">
                    GeoField Impact Console
                  </span>
                </div>
                <span class="flex items-center gap-1.5 sm:gap-2 rounded-full border border-bio/25 bg-bio/10 px-2.5 sm:px-3 py-1 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-bio">
                  <span class="h-1 w-1 rounded-full bg-bio animate-pulse-dot"></span>
                  Live
                </span>
              </div>

              <!-- 4 Metrics Grid -->
              <div class="mt-5 sm:mt-7 grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                <div
                  v-for="(m, i) in impactMetrics"
                  :key="m.label"
                  :data-testid="m.testId"
                  :class="`rounded-xl sm:rounded-2xl border border-bio/10 bg-obsidian/50 p-4 sm:p-5 hover:border-bio/30 transition-all duration-300 hover:-translate-y-1 scroll-reveal delay-${(i + 1) * 100}`"
                >
                  <div class="flex items-center justify-between">
                    <component :is="m.icon" :size="18" class="text-bio" />
                    <span class="flex items-center gap-1 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-limeglow">
                      <TrendingUp :size="11" />
                      {{ m.trend }}
                    </span>
                  </div>
                  <p class="mt-3 sm:mt-4 font-display text-xl sm:text-3xl font-extrabold tracking-tight text-slate-50">
                    {{ m.value }}
                  </p>
                  <p class="mt-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-slate-500">
                    {{ m.label }}
                  </p>
                </div>
              </div>

              <!-- Velocity Chart (Animated Up & Stop) -->
              <div 
                ref="impactChartRef"
                class="mt-5 sm:mt-7 rounded-xl sm:rounded-2xl border border-bio/10 bg-obsidian/50 p-4 sm:p-5 scroll-reveal delay-300 transition-all duration-300 cursor-pointer group" 
                data-testid="impact-chart"
                title="Click to replay velocity chart animation"
                @click="replayVelocityChartAnimation"
              >
                <div class="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
                  <span class="flex items-center gap-1.5">
                    <span 
                      class="h-1.5 w-1.5 rounded-full transition-colors duration-500"
                      :class="velocityChartProgress > 0 ? 'bg-bio animate-pulse' : 'bg-slate-600'"
                    ></span>
                    Collection Velocity — 12 Wks
                  </span>
                  <span class="text-bio font-bold text-[10px] sm:text-[11px] tracking-wider transition-all duration-300">
                    +{{ animatedVelocityPercent }}%
                  </span>
                </div>
                <svg viewBox="0 0 480 110" class="h-20 sm:h-24 w-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#22C55E" stop-opacity="0.32" />
                      <stop offset="70%" stop-color="#22C55E" stop-opacity="0.08" />
                      <stop offset="100%" stop-color="#22C55E" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Area Fill (Interpolated path rising up from bottom baseline) -->
                  <path
                    :d="currentChartAreaPath"
                    fill="url(#areaFill)"
                    class="transition-opacity duration-300"
                    :style="{ opacity: velocityChartProgress > 0.05 ? 1 : 0 }"
                  />
                  
                  <!-- Rising Stroke Line (Interpolated path rising up to peak) -->
                  <path
                    :d="currentChartLinePath"
                    fill="none"
                    stroke="#22C55E"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                  />

                  <!-- Traveling / Pulsing Peak Node -->
                  <g v-if="velocityChartProgress > 0.08">
                    <!-- Halo pulse when reaching the top -->
                    <circle 
                      v-if="velocityChartProgress >= 0.95"
                      cx="476" 
                      :cy="peakMarkerY" 
                      r="9" 
                      fill="#22C55E" 
                      fill-opacity="0.25"
                      class="animate-ping origin-center" 
                    />
                    <!-- Core beacon circle that rides the line up -->
                    <circle 
                      cx="476" 
                      :cy="peakMarkerY" 
                      r="4" 
                      fill="#22C55E" 
                      stroke="#0A0F0D" 
                      stroke-width="1.5"
                      class="drop-shadow-[0_0_6px_rgba(34,197,94,0.9)]"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 7. FINAL CTA / REGISTER SECTION (#register)                               -->
    <!-- ========================================================================= -->
    <section
      id="register"
      ref="ctaSectionRef"
      data-testid="final-cta-section"
      class="relative scroll-mt-20 overflow-hidden py-20 sm:py-36 lg:py-44"
    >
      <div class="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1749983055056-dddeb9dad995?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
          alt="Wind turbine generating green power"
          aria-hidden="true"
          class="h-full w-full object-cover opacity-25 will-change-transform"
          :style="ctaBgStyle"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/80 to-obsidian"></div>
        <div
          class="absolute inset-0"
          style="background: radial-gradient(ellipse 50% 45% at 50% 55%, rgba(34,197,94,0.14) 0%, transparent 70%);"
        ></div>
      </div>

      <div class="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p class="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-bio scroll-reveal" data-testid="final-cta-eyebrow">
          04 — Join the Network
        </p>

        <h2
          data-testid="final-cta-headline"
          class="mt-6 sm:mt-8 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl scroll-reveal delay-150"
        >
          <span class="block">Ready to clean up</span>
          <span class="block">your kitchen — and</span>
          <span class="block bg-gradient-to-r from-bio via-limeglow to-bio bg-clip-text text-transparent">
            your conscience?
          </span>
        </h2>

        <p class="mx-auto mt-5 sm:mt-7 max-w-lg text-sm sm:text-lg leading-relaxed text-slate-400 scroll-reveal delay-200">
          Registration takes 60 seconds. Our agents take care of the rest.
        </p>

        <button
          data-testid="final-cta-register-btn"
          @click="$emit('open-register')"
          class="group relative mx-auto mt-8 sm:mt-12 flex items-center justify-center gap-3 overflow-hidden rounded-full bg-bio px-8 py-4 sm:px-10 sm:py-5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-emerald-950 shadow-[0_0_60px_rgba(34,197,94,0.4)] transition-all duration-300 hover:shadow-[0_0_90px_rgba(34,197,94,0.6)] hover:scale-105 active:scale-95 cursor-pointer scroll-reveal delay-300 w-full sm:w-auto max-w-xs min-h-[48px]"
        >
          <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
          Register Now
          <ArrowUpRight :size="18" :stroke-width="2.5" class="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>

        <p class="mt-6 sm:mt-8 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-slate-500 scroll-reveal delay-400">
          No hardware to buy · No contracts to sign · QR kit ships in 48h
        </p>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 8. FOOTER (#contact)                                                      -->
    <!-- ========================================================================= -->
    <footer
      id="contact"
      data-testid="footer"
      class="border-t border-bio/10 bg-[#080C0A] py-12 sm:py-16"
    >
      <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="grid gap-8 sm:gap-12 md:grid-cols-3">
          <!-- Col 1: Brand Info -->
          <div>
            <div class="flex items-center">
              <img
                src="/brand/logo.svg"
                alt="GeoField Corp — Renew. Refine. Return."
                class="h-10 sm:h-12 w-auto"
              />
            </div>
            <p class="mt-4 sm:mt-5 max-w-xs text-xs sm:text-sm leading-relaxed text-slate-500">
              Powering the clean-energy transition through traceable, compliant
              supply chains.
            </p>
          </div>

          <!-- Col 2: Contact Info -->
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
              Contact
            </p>
            <ul class="mt-4 sm:mt-5 space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <a
                  href="tel:+917972737595"
                  data-testid="footer-phone"
                  class="flex items-center gap-3 transition-colors hover:text-bio min-h-[36px]"
                >
                  <Phone :size="15" class="text-bio/70 shrink-0" />
                  <span>+91 7972737595</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@geofieldcorp.com"
                  data-testid="footer-email"
                  class="flex items-center gap-3 transition-colors hover:text-bio min-h-[36px]"
                >
                  <Mail :size="15" class="text-bio/70 shrink-0" />
                  <span class="flex flex-wrap items-center gap-1.5">
                    <span class="break-all">support@geofieldcorp.com</span>
                    <span class="rounded bg-bio/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-bio">Support</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:office@geofieldcorp.com"
                  data-testid="footer-email-office"
                  class="flex items-center gap-3 transition-colors hover:text-bio min-h-[36px]"
                >
                  <Mail :size="15" class="text-bio/70 shrink-0" />
                  <span class="flex flex-wrap items-center gap-1.5">
                    <span class="break-all">office@geofieldcorp.com</span>
                    <span class="rounded bg-bio/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-bio">Office</span>
                  </span>
                </a>
              </li>
              <li class="flex items-center gap-3 min-h-[36px]" data-testid="footer-location">
                <MapPin :size="15" class="text-bio/70 shrink-0" /> Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>

          <!-- Col 3: Navigation -->
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
              Navigate
            </p>
            <ul class="mt-4 sm:mt-5 space-y-3 text-xs sm:text-sm text-slate-400">
              <li><a href="#crisis" data-testid="footer-link-crisis" class="inline-block py-1 transition-colors hover:text-bio min-h-[32px]">The Crisis</a></li>
              <li><a href="#process" data-testid="footer-link-process" class="inline-block py-1 transition-colors hover:text-bio min-h-[32px]">The Process</a></li>
              <li><a href="#impact" data-testid="footer-link-impact" class="inline-block py-1 transition-colors hover:text-bio min-h-[32px]">Impact</a></li>
              <li><a href="#register" data-testid="footer-link-register" class="inline-block py-1 transition-colors hover:text-bio min-h-[32px]">Register</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-10 sm:mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-bio/10 pt-6 sm:pt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
          <span>© 2026 GeoField Corp</span>
          <span>Waste → Energy · Traceable · Compliant</span>
        </div>
      </div>
    </footer>

    <!-- ========================================================================= -->
    <!-- 9. STICKY MOBILE FLOATING BUTTON                                          -->
    <!-- ========================================================================= -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-6"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-6"
    >
      <button
        v-if="showStickyRegister"
        data-testid="sticky-register-btn"
        @click="$emit('open-register')"
        class="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-bio px-6 py-3 sm:px-7 sm:py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-emerald-950 shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-transform duration-300 hover:scale-[1.07] active:scale-95 lg:hidden whitespace-nowrap min-h-[44px] cursor-pointer"
      >
        Register Now <ArrowUpRight :size="15" :stroke-width="2.5" />
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { 
  ArrowUpRight, 
  ArrowDown, 
  Menu, 
  X, 
  QrCode, 
  Leaf, 
  ScanLine, 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Brain, 
  Flame, 
  Truck, 
  Droplets, 
  Wind, 
  Waves, 
  IndianRupee, 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-vue-next';

defineEmits(['open-register', 'open-login']);

// Navigation definitions
const navLinks = [
  { label: 'The Crisis', href: '#crisis', id: 'crisis' },
  { label: 'The Process', href: '#process', id: 'process' },
  { label: 'Impact', href: '#impact', id: 'impact' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const marqueeItems = [
  'FSSAI Compliant',
  'Instant Bank Payouts',
  '100% Traceable Supply Chain',
  'Biofuel Feedstock Certified',
  'Zero-Hazard Kitchen Network',
  'ISCC Certified Aggregation',
];

const hazards = [
  { icon: HeartPulse, title: 'Hypertension', desc: 'Cardiovascular strain from oxidised fats' },
  { icon: Activity, title: 'Liver Disease', desc: 'Cellular toxicity accumulates per reheat' },
  { icon: ShieldAlert, title: 'Atherosclerosis', desc: 'Vascular plaque from polar compounds' },
  { icon: Brain, title: "Alzheimer's Link", desc: 'Neurodegenerative risk markers identified' },
];

const steps = [
  {
    num: '01',
    icon: QrCode,
    title: 'Register & Get Your QR',
    desc: 'Sign up in 60 seconds and receive a unique, waterproof QR code assigned directly to your restaurant.',
  },
  {
    num: '02',
    icon: Truck,
    title: 'Cluster-Based Pickups',
    desc: 'Our hyper-local fleet runs optimised cluster routes — oil is collected quickly, cleanly, and on schedule.',
  },
  {
    num: '03',
    icon: ScanLine,
    title: 'Scan & Done',
    desc: 'The agent scans your QR, weight is auto-logged, and a digital FSSAI-compliant receipt is issued instantly.',
  },
];

const impactMetrics = [
  {
    icon: Droplets,
    label: 'Liters Recycled',
    value: '12,450 L',
    trend: '+18% this month',
    testId: 'metric-liters',
  },
  {
    icon: Wind,
    label: 'Carbon Offset',
    value: '31.1 T CO₂',
    trend: '≈ 1,420 trees planted',
    testId: 'metric-carbon',
  },
  {
    icon: Waves,
    label: 'Water Saved',
    value: '186,000 L',
    trend: 'Water table protected',
    testId: 'metric-water',
  },
  {
    icon: IndianRupee,
    label: 'Revenue Generated',
    value: '₹ 6,22,500',
    trend: 'Instant payout verified',
    testId: 'metric-revenue',
  },
];

// Interactive state
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);
const showStickyRegister = ref(false);
const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

const scrollY = ref(0);
const scrollProgress = ref(0);

const heroRef = ref(null);
const crisisSectionRef = ref(null);
const processSectionRef = ref(null);
const impactSectionRef = ref(null);
const impactChartRef = ref(null);
const ctaSectionRef = ref(null);

// Section scroll progress values (0.0 to 1.0)
const crisisProgress = ref(0);
const processProgress = ref(0);
const impactProgress = ref(0);
const ctaProgress = ref(0);

// Mouse interactive 3D parallax on Hero visual
const mouseX = ref(0);
const mouseY = ref(0);

let heroRectCache = null;
let mouseMoveTicking = false;
let pendingMouseX = 0;
let pendingMouseY = 0;

function handleHeroMouseMove(e) {
  if (!heroRectCache) {
    if (heroRef.value) heroRectCache = heroRef.value.getBoundingClientRect();
    else return;
  }
  pendingMouseX = (e.clientX - heroRectCache.left) / heroRectCache.width - 0.5;
  pendingMouseY = (e.clientY - heroRectCache.top) / heroRectCache.height - 0.5;

  if (!mouseMoveTicking) {
    mouseMoveTicking = true;
    window.requestAnimationFrame(() => {
      mouseX.value = pendingMouseX;
      mouseY.value = pendingMouseY;
      mouseMoveTicking = false;
    });
  }
}

function handleHeroMouseLeave() {
  pendingMouseX = 0;
  pendingMouseY = 0;
  mouseX.value = 0;
  mouseY.value = 0;
}

// 1. Hero Left Copy parallax (GPU accelerated translate3d)
const heroCopyStyle = computed(() => {
  if (isMobile.value) {
    return {
      transform: 'none',
      opacity: 1,
    };
  }
  const y = scrollY.value;
  return {
    transform: `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0)`,
    opacity: Math.max(0, 1 - y / 700).toFixed(2),
  };
});

// 2. Hero 3D visual card parallax (combines mouse parallax with scroll parallax, GPU accelerated)
const heroGlowStyle = computed(() => {
  if (isMobile.value) {
    return { transform: 'none' };
  }
  return {
    transform: `translate3d(${(mouseX.value * 22).toFixed(1)}px, ${(mouseY.value * 22 + scrollY.value * 0.22).toFixed(1)}px, 0)`,
  };
});

const heroImgStyle = computed(() => {
  if (isMobile.value) {
    return { transform: 'none' };
  }
  return {
    transform: `translate3d(${(mouseX.value * -16).toFixed(1)}px, ${(mouseY.value * -12 + scrollY.value * 0.12).toFixed(1)}px, 0) rotate(${(2 + mouseX.value * 2.5).toFixed(2)}deg)`,
  };
});

const heroCardStyle = computed(() => {
  if (isMobile.value) {
    return { transform: 'none' };
  }
  return {
    transform: `translate3d(${(mouseX.value * 34).toFixed(1)}px, ${(mouseY.value * 26 + scrollY.value * -0.22).toFixed(1)}px, 0)`,
  };
});

const heroBadgeStyle = computed(() => {
  if (isMobile.value) {
    return { transform: 'none' };
  }
  return {
    transform: `translate3d(${(mouseX.value * -30).toFixed(1)}px, ${(mouseY.value * -22 + scrollY.value * 0.18).toFixed(1)}px, 0)`,
  };
});

// 3. Watermark text drift on scroll (smooth 60 FPS translate3d)
const toxicWatermarkStyle = computed(() => ({
  transform: `translate3d(${((crisisProgress.value - 0.45) * -180).toFixed(1)}px, 0, 0)`,
}));

const processWatermarkStyle = computed(() => ({
  transform: `translate3d(${((processProgress.value - 0.5) * 200).toFixed(1)}px, 0, 0)`,
}));

const impactWatermarkStyle = computed(() => ({
  transform: `translate3d(${((impactProgress.value - 0.5) * -160).toFixed(1)}px, 0, 0)`,
}));

// 4. Crisis right burner image parallax
const crisisBurnerStyle = computed(() => ({
  transform: `translate3d(0, ${((crisisProgress.value - 0.5) * -45).toFixed(1)}px, 0)`,
}));

// 5. Impact console parallax
const impactConsoleStyle = computed(() => ({
  transform: `translate3d(0, ${((1 - impactProgress.value) * 35).toFixed(1)}px, 0)`,
}));

// 6. CTA section background image parallax
const ctaBgStyle = computed(() => ({
  transform: `scale(${(1 + ctaProgress.value * 0.12).toFixed(3)}) translate3d(0, ${((ctaProgress.value - 0.5) * 30).toFixed(1)}px, 0)`,
}));

// 7. Animated counters on scroll for Crisis section
const animatedUcoReturn = ref(0);
const animatedTpcLimit = ref(0);
let countStarted = false;

function triggerCounters() {
  if (countStarted) return;
  countStarted = true;
  
  const duration = 2200;
  const startTime = performance.now();
  
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    animatedUcoReturn.value = Math.round(60 * easeOut);
    animatedTpcLimit.value = Math.round(25 * easeOut);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// 8. Process track dynamic truck position & active step
const manualHoverStep = ref(null);

const activeProcessStep = computed(() => {
  if (manualHoverStep.value !== null) return manualHoverStep.value;
  // Based on section scroll progress:
  // Step 0: entering the process section
  // Step 1: middle of the process section
  // Step 2: scrolled through process section
  if (processProgress.value < 0.40) return 0;
  if (processProgress.value < 0.70) return 1;
  return 2;
});

const processTruckLeft = computed(() => {
  const step = activeProcessStep.value;
  if (step === 0) return '8%';
  if (step === 1) return '50%';
  return '92%';
});

// 9. Interactive Velocity Chart Animation ("Go up and stop")
const velocityChartProgress = ref(0);
const animatedVelocityPercent = ref(0);
let velocityChartStarted = false;
let chartObserver = null;

function triggerVelocityChartAnimation() {
  if (velocityChartStarted) return;
  velocityChartStarted = true;

  const duration = 2000;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const p = Math.min(elapsed / duration, 1);
    // Smooth ease-out cubic curve: rapidly climbs then decelerates gracefully to stop at the peak
    const easeOut = 1 - Math.pow(1 - p, 3);

    velocityChartProgress.value = easeOut;
    animatedVelocityPercent.value = Math.round(214 * easeOut);

    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      velocityChartProgress.value = 1;
      animatedVelocityPercent.value = 214;
    }
  }

  requestAnimationFrame(step);
}

function replayVelocityChartAnimation() {
  velocityChartStarted = false;
  velocityChartProgress.value = 0;
  animatedVelocityPercent.value = 0;
  triggerVelocityChartAnimation();
}

const currentChartLinePath = computed(() => {
  const k = velocityChartProgress.value;
  const base = 105;
  const getY = (targetY) => (base - (base - targetY) * k).toFixed(1);

  const y0 = getY(95);
  const y1 = getY(88);
  const y2 = getY(92);
  const y3 = getY(74);
  const y4 = getY(66);
  const y5 = getY(52);
  const y6 = getY(44);
  const y7 = getY(26);
  const y8 = getY(18);
  const y9 = getY(10);

  return `M0 ${y0} C 50 ${y1}, 80 ${y2}, 120 ${y3} S 200 ${y4}, 240 ${y5} S 330 ${y6}, 370 ${y7} S 440 ${y8}, 480 ${y9}`;
});

const currentChartAreaPath = computed(() => {
  return `${currentChartLinePath.value} L 480 110 L 0 110 Z`;
});

const peakMarkerY = computed(() => {
  const base = 105;
  const target = 10;
  return Number((base - (base - target) * velocityChartProgress.value).toFixed(1));
});

// Cached layout metrics to prevent forced synchronous layout thrashing during scroll
let cachedLayout = null;
let resizeTicking = false;

function updateLayoutCache() {
  if (typeof window === 'undefined') return;
  const windowHeight = window.innerHeight || 800;
  const docHeight = Math.max(1, (document.documentElement.scrollHeight || 5000) - windowHeight);

  function getMetrics(el) {
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const top = rect.top + (window.scrollY || window.pageYOffset || 0);
    return {
      top,
      height: rect.height,
      total: rect.height + windowHeight,
    };
  }

  cachedLayout = {
    windowHeight,
    docHeight,
    crisis: getMetrics(crisisSectionRef.value),
    process: getMetrics(processSectionRef.value),
    impact: getMetrics(impactSectionRef.value),
    cta: getMetrics(ctaSectionRef.value),
  };

  if (heroRef.value) {
    heroRectCache = heroRef.value.getBoundingClientRect();
  }
}

function onWindowResize() {
  if (!resizeTicking) {
    resizeTicking = true;
    window.requestAnimationFrame(() => {
      isMobile.value = window.innerWidth < 1024;
      updateLayoutCache();
      handleScroll();
      resizeTicking = false;
    });
  }
}

// Pure math section progress calculation using cached metrics (0ms DOM cost during scroll)
function calcSectionProgress(metrics, y, windowHeight) {
  if (!metrics || metrics.total <= 0) return 0;
  const current = windowHeight - (metrics.top - y);
  return Math.min(Math.max(current / metrics.total, 0), 1);
}

// Scroll handlers with requestAnimationFrame
let scrollTicking = false;

function onScroll() {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}

function handleScroll() {
  const y = window.scrollY || window.pageYOffset || 0;
  scrollY.value = y;
  isScrolled.value = y > 40;
  
  if (!cachedLayout) {
    updateLayoutCache();
  }

  const wh = cachedLayout ? cachedLayout.windowHeight : (window.innerHeight || 800);
  const dh = cachedLayout ? cachedLayout.docHeight : 4000;
  
  showStickyRegister.value = y > wh * 0.7;
  scrollProgress.value = dh > 0 ? Math.min(Math.max(y / dh, 0), 1) : 0;

  // Update progress for all animated sections using pure math (no getBoundingClientRect reflows)
  if (cachedLayout) {
    if (cachedLayout.crisis) {
      crisisProgress.value = calcSectionProgress(cachedLayout.crisis, y, wh);
      if (!countStarted && crisisProgress.value > 0.25) {
        triggerCounters();
      }
    }

    if (cachedLayout.process) {
      processProgress.value = calcSectionProgress(cachedLayout.process, y, wh);
    }

    if (cachedLayout.impact) {
      impactProgress.value = calcSectionProgress(cachedLayout.impact, y, wh);
      if (!velocityChartStarted && impactProgress.value > 0.15) {
        triggerVelocityChartAnimation();
      }
    }

    if (cachedLayout.cta) {
      ctaProgress.value = calcSectionProgress(cachedLayout.cta, y, wh);
    }
  }
}

// Intersection Observer for scroll-reveal elements
let revealObserver = null;

function setupRevealObserver() {
  const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('in-view'));
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '60px 0px 60px 0px'
  });

  elements.forEach(el => revealObserver.observe(el));
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onWindowResize, { passive: true });
  
  // Initialize layout cache after initial paint
  updateLayoutCache();
  handleScroll();

  setTimeout(() => {
    updateLayoutCache();
    setupRevealObserver();
  }, 100);

  // Setup diagnostic 60 FPS telemetry helper on window
  if (typeof window !== 'undefined') {
    let frameCount = 0;
    let lastTime = performance.now();
    let droppedFrames = 0;
    let totalFrameTime = 0;
    let maxFrameTime = 0;

    function trackFps(now) {
      const delta = now - lastTime;
      lastTime = now;
      if (delta > 0 && delta < 1000) {
        frameCount++;
        totalFrameTime += delta;
        if (delta > maxFrameTime) maxFrameTime = delta;
        if (delta > 18.0) droppedFrames++;
      }
      requestAnimationFrame(trackFps);
    }
    requestAnimationFrame(trackFps);

    window.__getFpsReport = () => {
      const avgDelta = frameCount > 0 ? totalFrameTime / frameCount : 0;
      const fps = avgDelta > 0 ? (1000 / avgDelta).toFixed(1) : '0';
      return {
        fps: Number(fps),
        avgFrameTimeMs: Number(avgDelta.toFixed(2)),
        maxFrameTimeMs: Number(maxFrameTime.toFixed(2)),
        droppedFrames,
        totalFrames: frameCount,
        droppedPercent: frameCount > 0 ? ((droppedFrames / frameCount) * 100).toFixed(1) + '%' : '0%'
      };
    };
  }

  if (impactChartRef.value && 'IntersectionObserver' in window) {
    chartObserver = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting) {
        triggerVelocityChartAnimation();
      }
    }, { threshold: 0.15 });
    chartObserver.observe(impactChartRef.value);
  } else {
    setTimeout(() => {
      if (!velocityChartStarted) triggerVelocityChartAnimation();
    }, 1000);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onWindowResize);
  if (revealObserver) {
    revealObserver.disconnect();
  }
  if (chartObserver) {
    chartObserver.disconnect();
    chartObserver = null;
  }
});
</script>

<style scoped>
/* Scoped adjustments */
</style>
