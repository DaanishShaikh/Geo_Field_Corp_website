<template>
<!-- ===================================================================== -->
  <!-- HEADER / NAVIGATION BAR WITH TOP SCROLL PROGRESS BAR                  -->
  <!-- ===================================================================== -->
  <header class="sticky top-0 z-40 glass-nav animate-nav-drop">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
      
      <!-- Left: GeoField Corp Logo (Crisp Anti-Aliased + Reloads Page on Click) -->
      <a href="#heroSection" id="brandLogoLink" title="Reload GeoField Corp Platform" class="flex items-center gap-3 focus:outline-none cursor-pointer select-none">
        <img src="/brand/geofield-full-logo.png" alt="GeoField Corp — Renew. Refine. Return." class="brand-logo-crisp h-10 sm:h-11 w-auto object-contain" />
      </a>

      <!-- Center: Clean Navigation Links -->
      <nav id="landingNavLinks" class="hidden xl:flex items-center gap-7 font-sans text-xs font-semibold tracking-[0.14em] uppercase text-gray-300">
        <a href="#threatSection" data-nav-sec="threatSection" data-i18n="nav_crisis" class="nav-scroll-link hover:text-[#22C55E] transition">THE CRISIS</a>
        <a href="#solutionSection" data-nav-sec="solutionSection" data-i18n="nav_process" class="nav-scroll-link hover:text-[#22C55E] transition">THE PROCESS</a>
        <a href="#impactSection" data-nav-sec="impactSection" data-i18n="nav_impact" class="nav-scroll-link hover:text-[#22C55E] transition">IMPACT</a>
        <a href="#contactSection" data-nav-sec="contactSection" data-i18n="nav_contact" class="nav-scroll-link hover:text-[#22C55E] transition">CONTACT</a>
      </nav>

      <!-- Right: Language Toggle (EN | हिंदी) + Role Previews + SIGN IN + JOIN NETWORK -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Bilingual Toggle Switch (English <-> हिंदी) -->
        <button
          id="langToggleBtn"
          type="button"
          role="switch"
          aria-checked="false"
          aria-label="Toggle language between English and Hindi"
          title="Switch Language: English / हिंदी"
          class="touch-reactive inline-flex items-center p-1 rounded-full bg-[#0A140E] border border-[#22C55E]/45 hover:border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.16)] transition-all shrink-0 cursor-pointer select-none"
        >
          <span id="langPillEn" class="px-2.5 py-1 rounded-full bg-[#22C55E] text-[#050A07] font-mono text-[10px] sm:text-[11px] font-extrabold tracking-wider transition-all duration-300">
            EN
          </span>
          <span id="langPillHi" class="px-2.5 py-1 rounded-full text-gray-300 hover:text-white font-sans text-[11px] sm:text-xs font-bold tracking-wide transition-all duration-300">
            हिंदी
          </span>
        </button>

        <!-- Dual Role Preview Switcher with Instant Visual Differentiation -->
        <div id="headerRoleSwitcher" class="hidden sm:inline-flex items-center gap-2 p-1 rounded-2xl bg-[#0B140F] border border-white/10 font-sans text-xs">
          <button id="navPreviewSellerBtn" type="button" class="touch-reactive px-3.5 py-2 rounded-xl bg-[#22C55E]/15 hover:bg-[#22C55E] text-[#4ADE80] hover:text-[#050A07] border border-[#22C55E]/40 font-display font-bold tracking-tight transition-all flex items-center gap-2 shadow-sm">
            <span class="w-5 h-5 rounded-md bg-[#22C55E]/20 flex items-center justify-center shrink-0">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V7l8-4v18m6 0V11l-6-4"/>
              </svg>
            </span>
            <span data-i18n="nav_seller_kitchen">Seller Kitchen</span>
            <span class="px-1.5 py-0.5 rounded bg-[#22C55E]/20 text-[10px] font-bold">₹40/L</span>
          </button>
          <button id="navPreviewCustomerBtn" type="button" class="touch-reactive px-3.5 py-2 rounded-xl bg-[#38BDF8]/15 hover:bg-[#38BDF8] text-[#38BDF8] hover:text-[#050A07] border border-[#38BDF8]/40 font-display font-bold tracking-tight transition-all flex items-center gap-2 shadow-sm">
            <span class="w-5 h-5 rounded-md bg-[#38BDF8]/20 flex items-center justify-center shrink-0">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </span>
            <span data-i18n="nav_buyer_refinery">Buyer Refinery</span>
            <span class="px-1.5 py-0.5 rounded bg-[#38BDF8]/20 text-[10px] font-bold">ISCC</span>
          </button>
        </div>

        <button id="modePortalBtn" data-i18n="nav_sign_in" class="hidden md:inline-block font-mono text-[11px] tracking-[0.18em] uppercase text-gray-300 hover:text-[#22C55E] transition">
          SIGN IN
        </button>
        <button id="modeLandingBtn" class="hidden font-mono text-[11px] tracking-[0.18em] uppercase text-[#22C55E] hover:text-white transition flex items-center gap-1.5">
          &larr; <span data-i18n="nav_landing">LANDING</span>
        </button>

        <button id="navRegisterBtn" class="btn-green-pill touch-reactive px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase flex items-center gap-1.5 shrink-0">
          <span data-i18n="nav_join">JOIN NETWORK</span>
          <span>&#8599;</span>
        </button>
      </div>

    </div>

    <!-- Mobile & Tablet Quick-Access Navigation + Graph Switcher Strip (Visible on < xl screens) -->
    <div class="xl:hidden border-t border-white/[0.07] bg-[#060B08]/95 px-3 py-2">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar">
        <button type="button" id="mobileQuickSellerBtn" class="touch-reactive shrink-0 px-3 py-1.5 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#4ADE80] font-display text-[11px] font-bold flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
          <span data-i18n="mob_seller_view">Seller Graph &amp; View</span>
        </button>
        <button type="button" id="mobileQuickBuyerBtn" class="touch-reactive shrink-0 px-3 py-1.5 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/40 text-[#38BDF8] font-display text-[11px] font-bold flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
          <span data-i18n="mob_buyer_view">Buyer Graph &amp; View</span>
        </button>
        <a href="#impactSection" data-i18n="mob_impact_graph" class="nav-scroll-link touch-reactive shrink-0 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-200 font-mono text-[10px] uppercase tracking-wider">
          Impact Graph
        </a>
        <a href="#threatSection" data-i18n="mob_crisis" class="nav-scroll-link touch-reactive shrink-0 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 font-mono text-[10px] uppercase tracking-wider">
          The Crisis
        </a>
        <a href="#solutionSection" data-i18n="mob_process" class="nav-scroll-link touch-reactive shrink-0 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 font-mono text-[10px] uppercase tracking-wider">
          Process
        </a>
      </div>
    </div>
  </header>

  <!-- ===================================================================== -->
  <!-- VIEW 1: FLAGSHIP LANDING PAGE                                         -->
  <!-- ===================================================================== -->
  <main id="landingView" class="relative z-10 block">

    <!-- =================================================================== -->
    <!-- HERO SECTION (LUXURY STUDIO HEADLINE + TILTED KITCHEN CARD)         -->
    <!-- =================================================================== -->
    <section id="heroSection" class="scroll-mt-20 bg-organic-dark relative min-h-[88vh] flex items-center py-14 lg:py-20 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Left Column: Pill Badge + Floating 3D-Lit Studio Headline + Ground Reflection Stage + Dual CTAs -->
          <div class="lg:col-span-7 space-y-7">
            <div style="--delay: 40ms" class="reveal reveal-up inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/15 font-mono text-[11px] tracking-[0.22em] uppercase text-[#4ADE80]">
              <span class="w-3.5 h-[1.5px] bg-[#22C55E]"></span>
              <span data-i18n="hero_eyebrow">RUCO AGGREGATION NETWORK &mdash; INDIA</span>
            </div>

            <!-- Razor-Sharp High-Clarity Headline (No Underline, No Shadow) -->
            <div id="heroSpatialChamber" class="hero-spatial-chamber">
              <h1 id="heroKineticHeadline" class="hero-kinetic-stage select-none font-display text-4xl sm:text-5xl lg:text-[4.55rem] font-extrabold tracking-[-0.025em] leading-[1.16]">
                <span style="--line-delay: 80ms" class="hero-pop-line is-popped"><span data-i18n="hero_h1_line1" class="hero-solid-white">Stop the</span></span>
                <span style="--line-delay: 260ms" class="hero-pop-line is-popped mt-0.5"><span data-i18n="hero_h1_line2" class="hero-toxic-highlight">Toxic Cycle.</span></span>
                <span style="--line-delay: 480ms" class="hero-pop-line is-popped mt-2 sm:mt-3"><span data-i18n="hero_h1_line3" class="hero-solid-white">Start the</span></span>
                <span style="--line-delay: 680ms" class="hero-pop-line is-popped mt-0.5"><span data-i18n="hero_h1_line4" class="hero-green-highlight">Green Revenue.</span></span>
              </h1>
            </div>

            <p data-i18n="hero_subtitle" style="--delay: 160ms" class="reveal reveal-up text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl font-normal">
              Join India’s smartest RUCO aggregation network. We take the hassle out of FSSAI compliance with instant QR-based disposal, cluster-based pickups, and real-time environmental tracking.
            </p>

            <!-- Hero Dual Role Preview Cards & Registration CTA (Visually Distinct Seller vs Customer Options) -->
            <div style="--delay: 240ms" class="reveal reveal-up space-y-4 pt-1">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl">
                <!-- Seller (FBO Kitchen) Distinct Emerald Card Button -->
                <button id="heroPreviewSellerBtn" type="button" class="touch-reactive group text-left p-4 rounded-2xl bg-gradient-to-br from-[#22C55E]/20 via-[#16A34A]/10 to-[#0B1510] hover:from-[#22C55E]/30 border-2 border-[#22C55E]/50 hover:border-[#22C55E] shadow-[0_14px_30px_-10px_rgba(34,197,94,0.35)] transition-all flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3.5">
                    <div class="w-11 h-11 rounded-xl bg-[#22C55E] text-[#050A07] flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V7l8-4v18m6 0V11l-6-4"/>
                      </svg>
                    </div>
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span data-i18n="hero_seller_tag" class="px-2 py-0.5 rounded-md bg-[#22C55E]/20 text-[#4ADE80] font-sans text-[10px] font-bold uppercase tracking-wider">For Kitchens</span>
                        <span data-i18n="hero_seller_rate" class="text-[#FDE68A] font-sans text-[11px] font-bold">₹40/L Avg</span>
                      </div>
                      <div data-i18n="hero_seller_title" class="font-display font-extrabold text-base text-white mt-0.5">Seller Dashboard</div>
                      <div data-i18n="hero_seller_sub" class="font-sans text-xs text-gray-300">Schedule QR Pickups &amp; NEFT</div>
                    </div>
                  </div>
                  <span class="w-7 h-7 rounded-full bg-[#22C55E]/20 text-[#4ADE80] flex items-center justify-center font-bold text-sm group-hover:translate-x-0.5 transition-transform shrink-0">&#8599;</span>
                </button>

                <!-- Customer (Biofuel Refinery) Distinct Cyan-Blue Card Button -->
                <button id="heroPreviewCustomerBtn" type="button" class="touch-reactive group text-left p-4 rounded-2xl bg-gradient-to-br from-[#38BDF8]/20 via-[#0284C7]/10 to-[#0A131A] hover:from-[#38BDF8]/30 border-2 border-[#38BDF8]/50 hover:border-[#38BDF8] shadow-[0_14px_30px_-10px_rgba(56,189,248,0.3)] transition-all flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3.5">
                    <div class="w-11 h-11 rounded-xl bg-[#38BDF8] text-[#050A07] flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span data-i18n="hero_buyer_tag" class="px-2 py-0.5 rounded-md bg-[#38BDF8]/20 text-[#7DD3FC] font-sans text-[10px] font-bold uppercase tracking-wider">For Refineries</span>
                        <span class="text-[#7DD3FC] font-sans text-[11px] font-bold">ISCC EU</span>
                      </div>
                      <div data-i18n="hero_buyer_title" class="font-display font-extrabold text-base text-white mt-0.5">Customer Dashboard</div>
                      <div data-i18n="hero_buyer_sub" class="font-sans text-xs text-gray-300">Procure Bulk UCO &amp; PoS</div>
                    </div>
                  </div>
                  <span class="w-7 h-7 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center font-bold text-sm group-hover:translate-x-0.5 transition-transform shrink-0">&#8599;</span>
                </button>
              </div>

              <div class="flex flex-wrap items-center gap-4 pt-1">
                <button id="heroRegisterBtn" type="button" class="btn-green-pill touch-reactive px-6 py-3 rounded-full font-display text-xs sm:text-sm font-bold tracking-wide flex items-center gap-2">
                  <span data-i18n="hero_register_cta">Register Your Kitchen in 60s</span>
                  <span>&#8599;</span>
                </button>
                <span class="font-sans text-xs text-gray-400 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                  <span data-i18n-html="hero_rate_note">Avg Rate <strong class="text-white">₹40/Liter</strong> &bull; Instant NEFT Settlement</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Right Column: Tilted 3D Commercial Kitchen Card + Popping Floating Glass Badges -->
          <div style="--delay: 140ms" class="lg:col-span-5 reveal reveal-pop">
            <div id="heroParallaxWrap" class="relative mx-auto max-w-[380px] sm:max-w-[400px] py-6">
              
              <!-- Vertical Left Side Micro-Label: ● WASTE -> ENERGY -->
              <div class="vertical-side-label hidden sm:flex items-center gap-2 absolute -left-7 top-16 font-mono text-[10px] tracking-[0.22em] uppercase text-[#22C55E]/70 select-none">
                <span class="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                <span data-i18n="hero_vertical_label">WASTE &rarr; ENERGY</span>
              </div>

              <!-- TOP-RIGHT FLOATING GLASS POP-UP CARD: SCAN VERIFIED / 42.6 L logged -->
              <div id="heroTopFloatingBadge" class="hero-floating-badge animate-float-slow touch-reactive cursor-pointer absolute -top-2 -right-3 sm:-right-6 z-30 rounded-2xl p-4 w-56 sm:w-64">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-[#22C55E]/20 border border-[#22C55E]/40 text-[#22C55E] flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 3h3m3 0h-3m0 0v-3m0 3v3"/>
                    </svg>
                  </div>
                  <div>
                    <div data-i18n="hero_scan_verified" class="font-mono text-[10px] tracking-[0.16em] uppercase text-gray-400">SCAN VERIFIED</div>
                    <div id="heroLoggedLitersText" class="tabular-nums font-display font-extrabold text-lg text-white leading-tight">
                      42.6 L logged
                    </div>
                  </div>
                </div>
                <div class="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] tracking-[0.14em]">
                  <span data-i18n="hero_fssai_receipt" class="text-gray-400">FSSAI RECEIPT</span>
                  <span id="heroReceiptCodeText" class="text-[#22C55E] font-semibold">#GF-0421</span>
                </div>
              </div>

              <!-- TILTED SOURCE KITCHEN PHOTO CARD (SMOOTH HARDWARE-ACCELERATED HOVER, ZERO TILT CONFLICT) -->
              <div id="heroParallaxCard" class="cursor-pointer relative rounded-[26px] overflow-hidden border border-white/15 bg-surface-900 shadow-[0_30px_70px_rgba(0,0,0,0.85)] transition-transform duration-500 rotate-[1.5deg] hover:rotate-0">
                <div class="relative h-[390px] sm:h-[430px] w-full bg-[#070D0A]">
                  <img
                    id="heroMainKitchenImg"
                    src="/images/kitchen.jpeg"
                    alt="Source commercial kitchen in India"
                    referrerpolicy="no-referrer"
                    decoding="async"
                    class="w-full h-full object-cover object-center transition-opacity duration-300"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#050A07] via-[#050A07]/30 to-transparent"></div>

                  <!-- Bottom Inside Overlay: SOURCE KITCHEN / Cluster 04 — Andheri West / Station Spec / LIVE ROUTE -->
                  <div class="absolute bottom-5 inset-x-5 z-20 flex items-end justify-between gap-3">
                    <div>
                      <div id="heroClusterSubTypeText" class="font-mono text-[10px] tracking-[0.18em] uppercase text-[#4ADE80]">
                        SOURCE KITCHEN &bull; HEAVY RANGE &amp; STOCKPOT LINE
                      </div>
                      <div id="heroClusterTitleText" class="font-display font-bold text-lg sm:text-xl text-white mt-0.5">
                        Cluster 04 &mdash; Andheri West
                      </div>
                    </div>
                    <span data-i18n="hero_live_route" class="px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 font-mono text-[10px] tracking-[0.14em] uppercase text-[#22C55E] shrink-0">
                      LIVE ROUTE
                    </span>
                  </div>
                </div>
              </div>

              <!-- BOTTOM-LEFT FLOATING GLASS POP-UP CARD: CO2 OFFSET / +31.1 T -->
              <div id="heroBottomFloatingBadge" class="hero-floating-badge animate-float-delayed touch-reactive cursor-pointer absolute -bottom-3 -left-3 sm:-left-8 z-30 rounded-2xl px-4 py-3.5 w-48 sm:w-52 flex items-center gap-3.5">
                <div class="w-9 h-9 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/35 text-[#A3E635] flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 21c.5-4.5 2.5-8 7-10 4.5-2 7-5.5 7-10-4.5 0-8 2.5-10 7-2 4.5-3.5 8.5-4 13z"/>
                  </svg>
                </div>
                <div>
                  <div data-i18n="hero_co2_offset" class="font-mono text-[10px] tracking-[0.16em] uppercase text-gray-400">CO₂ OFFSET</div>
                  <div id="heroCo2OffsetText" class="tabular-nums font-display font-extrabold text-lg text-[#A3E635] leading-tight">
                    +31.1 T
                  </div>
                </div>
              </div>

            </div>

            <!-- Interactive Indian Kitchen Cluster Switcher Panel (4 Cohesive Documentary Commercial Kitchen Feeds) -->
            <div class="mt-5 p-3.5 rounded-2xl bg-[#0B1510]/95 border border-[#22C55E]/25 shadow-[0_14px_34px_rgba(0,0,0,0.65)]">
              <div class="flex items-center justify-between mb-2.5 px-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                <span class="text-[#22C55E] font-semibold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                  <span data-i18n="hero_clusters_header">VERIFIED KITCHEN CLUSTERS</span>
                </span>
                <span data-i18n="hero_tap_cluster" class="text-gray-400">TAP CLUSTER FEED</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  data-img-key="kitchen"
                  data-cluster="Cluster 04 — Andheri West"
                  data-cluster-hi="क्लस्टर 04 — अंधेरी वेस्ट"
                  data-station="SOURCE KITCHEN • HEAVY RANGE & STOCKPOT LINE"
                  data-station-hi="स्रोत किचन • मुख्य भट्टी और फ्राइंग लाइन"
                  data-liters="42.6"
                  data-receipt="#GF-0421"
                  data-co2="31.1"
                  data-i18n="cluster_btn_1"
                  class="hero-cluster-pill touch-reactive flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#22C55E]/20 border border-[#22C55E]/55 font-mono text-[10px] text-[#4ADE80] font-semibold transition text-left"
                >
                  <img src="/images/kitchen.jpeg" alt="04 Andheri" class="w-6 h-6 rounded-md object-cover border border-[#22C55E]/40 shrink-0" />
                  <span class="truncate">04 Andheri</span>
                </button>
                <button
                  type="button"
                  data-img-key="burner"
                  data-cluster="Cluster 01 — Lower Parel"
                  data-cluster-hi="क्लस्टर 01 — लोअर परेल"
                  data-station="SOURCE KITCHEN • KADHAI & WOK FRYING LINE"
                  data-station-hi="स्रोत किचन • कड़ाही और वॉक फ्राइंग लाइन"
                  data-liters="68.4"
                  data-receipt="#GF-0819"
                  data-co2="48.2"
                  data-i18n="cluster_btn_2"
                  class="hero-cluster-pill touch-reactive flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition text-left"
                >
                  <img src="/images/burner.jpeg" alt="01 Lower Parel" class="w-6 h-6 rounded-md object-cover border border-white/20 shrink-0" />
                  <span class="truncate">01 Lower Parel</span>
                </button>
                <button
                  type="button"
                  data-img-key="drum"
                  data-cluster="Cluster 02 — Pune Kalyani Hub"
                  data-cluster-hi="क्लस्टर 02 — पुणे कल्याणी हब"
                  data-station="SOURCE KITCHEN • TWIN DEEP-FRYER STATION"
                  data-station-hi="स्रोत किचन • ट्विन डीप-फ्रायर स्टेशन"
                  data-liters="94.0"
                  data-receipt="#GF-1104"
                  data-co2="64.5"
                  data-i18n="cluster_btn_3"
                  class="hero-cluster-pill touch-reactive flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition text-left"
                >
                  <img src="/images/drum.jpeg" alt="02 Pune" class="w-6 h-6 rounded-md object-cover border border-white/20 shrink-0" />
                  <span class="truncate">02 Pune</span>
                </button>
                <button
                  type="button"
                  data-img-key="hub"
                  data-cluster="Cluster 03 — BKC Refinery Route"
                  data-cluster-hi="क्लस्टर 03 — BKC रिफाइनरी रूट"
                  data-station="SOURCE KITCHEN • RUCO FILTRATION & DRUM BAY"
                  data-station-hi="स्रोत किचन • RUCO फ़िल्ट्रेशन और ड्रम बे"
                  data-liters="118.5"
                  data-receipt="#GF-1592"
                  data-co2="81.0"
                  data-i18n="cluster_btn_4"
                  class="hero-cluster-pill touch-reactive flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition text-left"
                >
                  <img src="/images/hub.jpeg" alt="03 BKC Hub" class="w-6 h-6 rounded-md object-cover border border-white/20 shrink-0" />
                  <span class="truncate">03 BKC Hub</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- MARQUEE TICKER STRIP                                                -->
    <!-- =================================================================== -->
    <div class="bg-[#08100C] border-y border-[#22C55E]/15 py-4 overflow-hidden select-none">
      <div class="marquee-track flex items-center gap-10 font-mono text-[11px] tracking-[0.24em] uppercase text-gray-400">
        <span class="flex items-center gap-10">
          <span data-i18n="mq_1">ISCC CERTIFIED</span>
          <span class="text-[#22C55E]">&#127807;</span>
          <span data-i18n="mq_2">ZERO-HAZARD KITCHEN NETWORK</span>
          <span class="text-[#22C55E]">&#127807;</span>
          <span data-i18n="mq_3">ISCC CERTIFIED AGGREGATION</span>
          <span class="text-[#22C55E]">&#127807;</span>
          <span data-i18n="mq_4">FSSAI COMPLIANT</span>
          <span class="text-[#22C55E]">&#127807;</span>
          <span data-i18n="mq_5">INSTANT BANK PAYOUTS</span>
          <span class="text-[#22C55E]">&#127807;</span>
        </span>
        <span class="flex items-center gap-10">
          <span data-i18n="mq_1">ISCC CERTIFIED</span>
          <span class="text-[#22C55E]">&#127807;</span>
          <span data-i18n="mq_2">ZERO-HAZARD KITCHEN NETWORK</span>
          <span class="text-[#22C55E]">&#127807;</span>
          <span data-i18n="mq_3">ISCC CERTIFIED AGGREGATION</span>
          <span class="text-[#22C55E]">&#127807;</span>
          <span data-i18n="mq_4">FSSAI COMPLIANT</span>
          <span class="text-[#22C55E]">&#127807;</span>
          <span data-i18n="mq_5">INSTANT BANK PAYOUTS</span>
          <span class="text-[#22C55E]">&#127807;</span>
        </span>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- SECTION 01: THE THREAT ("The 60% Crisis in Your Kitchen.")          -->
    <!-- Exact Match to image_adb67c.jpg + Smooth 60fps Scroll Count-Up      -->
    <!-- =================================================================== -->
    <section id="threatSection" class="scroll-mt-20 bg-organic-dark relative py-24 lg:py-32 overflow-hidden">
      
      <!-- Giant Outlined Watermark "TOXIC" Sliding in from Left -->
      <div id="toxicBgWatermark" class="bg-slide-from-left stroke-watermark-toxic absolute top-6 left-[-1%] sm:left-[2%] font-display font-extrabold text-[6.5rem] sm:text-[10.5rem] lg:text-[13rem] leading-none tracking-tight">
        TOXIC
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          <!-- Left Column: Header + 60% & 25% Cards + TEST REHEAT TPC Card (Exact image_adb67c.jpg Layout) -->
          <div class="lg:col-span-6 flex flex-col justify-between gap-6">
            <div class="space-y-5">
              <div class="reveal reveal-left flex items-center gap-4 font-mono text-xs tracking-[0.22em] uppercase">
                <span class="text-[#22C55E] font-bold">01</span>
                <span class="w-12 h-[1px] bg-[#22C55E]/40"></span>
                <span data-i18n="threat_eyebrow" class="text-gray-400">THE THREAT</span>
              </div>

              <h2 data-i18n-html="threat_title_html" style="--delay: 50ms" class="reveal reveal-up font-display text-4xl sm:text-5xl lg:text-[3.65rem] font-extrabold text-white tracking-tight leading-[1.06]">
                The <span class="text-[#EF4444]">60%</span> Crisis<br />
                in Your Kitchen.
              </h2>

              <p data-i18n="threat_desc" style="--delay: 100ms" class="reveal reveal-up text-gray-400 text-base sm:text-[1.05rem] leading-relaxed max-w-xl">
                Shockingly, nearly 60% of all Used Cooking Oil generated in India finds its way back into the food stream &mdash; resold by informal vendors, reheated, and returned to the plate. Every reheat multiplies toxic Total Polar Compounds.
              </p>
            </div>

            <!-- 60% & 25% Callout Cards (Observed directly by #crisisStatsGrid for ultra-smooth scroll counting) -->
            <div id="crisisStatsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <!-- Left Card: 60% HIGH RISK (Exact match to image_adb67c.jpg) -->
              <div id="callout60Box" style="--stat-delay: 0ms" class="stat-pop-card crisis-card-60 touch-reactive cursor-pointer rounded-2xl p-6 sm:p-7 flex flex-col justify-between group">
                <div>
                  <div class="tabular-nums font-display font-extrabold text-5xl sm:text-6xl lg:text-[4.25rem] leading-none text-[#EF4444] tracking-tight transition-transform duration-300 group-hover:scale-[1.03] origin-left">
                    <span id="crisis60Counter">0</span><span>%</span>
                  </div>

                  <!-- Smooth rAF-Driven Two-Colour Left-to-Right Illumination Bar -->
                  <div class="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden my-4">
                    <div id="crisis60GaugeBar" class="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] shadow-[0_0_12px_rgba(239,68,68,0.45)]" style="width: 0%;"></div>
                  </div>

                  <div data-i18n="threat_60_label" class="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#EF4444] font-semibold mb-2">
                    HIGH RISK
                  </div>
                </div>

                <p data-i18n="threat_60_desc" class="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  of UCO in India returns to the food stream through illegal recirculation.
                </p>
              </div>

              <!-- Right Card: 25% FSSAI MANDATE (Exact match to image_adb67c.jpg) -->
              <div id="callout25Box" style="--stat-delay: 90ms" class="stat-pop-card crisis-card-25 touch-reactive cursor-pointer rounded-2xl p-6 sm:p-7 flex flex-col justify-between group">
                <div>
                  <div id="crisis25Wrapper" class="tabular-nums font-display font-extrabold text-5xl sm:text-6xl lg:text-[4.25rem] leading-none text-[#F59E0B] tracking-tight transition-transform duration-300 group-hover:scale-[1.03] origin-left">
                    <span id="crisis25Counter">0</span><span>%</span>
                  </div>

                  <!-- Smooth rAF-Driven Two-Colour Left-to-Right Illumination Bar (Matching 60% Card Style) -->
                  <div class="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden my-4">
                    <div id="crisis25GaugeBar" class="h-full rounded-full bg-gradient-to-r from-[#FDE047] to-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.45)]" style="width: 0%;"></div>
                  </div>

                  <div id="crisis25SubLabel" class="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#F59E0B] font-semibold mb-2">
                    FSSAI MANDATE
                  </div>
                </div>

                <p id="crisis25Desc" class="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  TPC limit &mdash; oil above this is strictly unsafe for human consumption.
                </p>
              </div>

            </div>

            <!-- Bottom Card: TEST REHEAT TPC (Exact match to image_adb67c.jpg) -->
            <div style="--delay: 140ms" class="reveal reveal-up rounded-2xl bg-[#0B120E]/95 border border-white/[0.08] p-5 shadow-xl">
              <div class="flex items-center justify-between gap-2 mb-3.5">
                <span data-i18n="reheat_title" class="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-gray-400">
                  TEST REHEAT TPC
                </span>
                <span id="reheatSimActiveBadge" class="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#F59E0B] font-semibold">
                  FSSAI MANDATE &bull; 25% TPC
                </span>
              </div>

              <!-- 3-Option Segmented Bar Matching image_adb67c.jpg -->
              <div class="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-[#060A08] border border-white/[0.05]">
                <div data-reheat-card="14" class="reheat-option-card rounded-lg">
                  <button
                    type="button"
                    data-tpc="14"
                    data-meter="34%"
                    data-color="#22C55E"
                    data-status="1ST REHEAT (SAFE)"
                    data-status-hi="पहली बार गर्म (सुरक्षित)"
                    data-desc="14% TPC — Fresh golden frying batch well below statutory FSSAI limit."
                    data-desc-hi="14% TPC — ताज़ा फ्राइंग बैच, जो FSSAI की 25% सुरक्षा सीमा के भीतर और सुरक्षित है।"
                    class="reheat-pill-btn w-full py-2.5 px-2 rounded-lg bg-transparent hover:bg-white/[0.04] border border-transparent font-mono text-[10px] sm:text-[11px] font-medium text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0"></span>
                    <span data-i18n="reheat_btn_14" class="truncate">1st Fry (14%)</span>
                  </button>
                </div>

                <div data-reheat-card="25" class="reheat-option-card active-reheat-option rounded-lg">
                  <button
                    type="button"
                    data-tpc="25"
                    data-meter="62%"
                    data-color="#F59E0B"
                    data-status="FSSAI MANDATE"
                    data-status-hi="FSSAI का सख़्त नियम"
                    data-desc="TPC limit — oil above this is strictly unsafe for human consumption."
                    data-desc-hi="अधिकतम TPC सीमा — इससे अधिक पोलर कंपाउंड वाला तेल सेहत के लिए पूरी तरह असुरक्षित और गैर-कानूनी है।"
                    class="reheat-pill-btn w-full py-2.5 px-2 rounded-lg bg-[#F59E0B]/[0.14] border border-[#F59E0B]/45 font-mono text-[10px] sm:text-[11px] font-semibold text-[#FDE68A] flex items-center justify-center gap-1.5 shadow-sm transition"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0"></span>
                    <span data-i18n="reheat_btn_25" class="truncate">3rd Fry (25% Limit)</span>
                  </button>
                </div>

                <div data-reheat-card="38" class="reheat-option-card rounded-lg">
                  <button
                    type="button"
                    data-tpc="38"
                    data-meter="96%"
                    data-color="#EF4444"
                    data-status="ILLEGAL RECIRCULATION"
                    data-status-hi="अवैध एवं ज़हरीला स्तर"
                    data-desc="38% TPC — Extreme polar compound toxicity & free-radical saturation."
                    data-desc-hi="38% TPC — अत्यधिक ज़हरीले पोलर कंपाउंड और फ्री-रैडिकल्स से भरा जानलेवा तेल।"
                    class="reheat-pill-btn w-full py-2.5 px-2 rounded-lg bg-transparent hover:bg-white/[0.04] border border-transparent font-mono text-[10px] sm:text-[11px] font-medium text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-[#EF4444] shrink-0"></span>
                    <span data-i18n="reheat_btn_38" class="truncate">6th Fry (38% Toxic)</span>
                  </button>
                </div>
              </div>

              <!-- Bottom Gradient Spectrum Bar Matching image_adb67c.jpg -->
              <div class="mt-3.5 h-1 w-full rounded-full bg-white/[0.08] overflow-hidden">
                <div id="reheatTpcSpectrumBar" class="h-full rounded-full bg-gradient-to-r from-[#22C55E] via-[#F59E0B] to-[#EF4444] transition-all duration-500" style="width: 62%;"></div>
              </div>
            </div>

          </div>

          <!-- Right Column: Balanced Header + 2x2 Architectural Health Impact Grid (Aligned to Left Column) -->
          <div class="lg:col-span-6 flex flex-col justify-end gap-5">
            
            <!-- Subtle Section Alignment Bar so the 2x2 grid sits in crisp symmetry with the 60%/25% + Test Reheat TPC stack -->
            <div class="reveal reveal-right flex items-center justify-between px-1 pb-1 border-b border-white/[0.07]">
              <div class="flex items-center gap-2.5">
                <span class="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                <span data-i18n="disease_grid_header" class="font-sans text-xs font-bold uppercase tracking-[0.16em] text-gray-300">Clinical Health Impact of Reheated Oil</span>
              </div>
              <span data-i18n="disease_grid_hint" class="font-sans text-xs text-gray-400">Select card for details</span>
            </div>

            <!-- 2x2 Symmetrical Architectural Health Cards (Zero Slide Bars, Clean & Balanced) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <!-- Card 1: Hypertension -->
              <div
                data-disease-id="hypertension"
                style="--delay: 120ms"
                class="disease-hazard-card reveal reveal-pop touch-reactive cursor-pointer rounded-2xl p-6 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div class="flex items-start justify-between gap-3">
                    <div class="w-11 h-11 rounded-xl bg-[#EF4444]/12 border border-[#EF4444]/30 text-[#EF4444] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </div>
                    <span data-i18n="dis_1_tag" class="px-2.5 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/25 font-sans text-[11px] font-semibold text-red-300">
                      Vascular Strain
                    </span>
                  </div>

                  <div class="mt-5">
                    <h3 data-i18n="dis_1_title" class="font-display font-bold text-lg sm:text-xl text-white group-hover:text-red-400 transition">
                      Hypertension
                    </h3>
                    <p data-i18n="dis_1_desc" class="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mt-1.5">
                      Cardiovascular strain from oxidised fats and depleted vascular nitric oxide.
                    </p>
                  </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-white/[0.07] flex items-center justify-between font-sans text-xs">
                  <span class="text-gray-400 font-medium flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
                    <span data-i18n="dis_1_sub">Endothelial Stiffness</span>
                  </span>
                  <span class="text-red-400 group-hover:text-white transition font-semibold inline-flex items-center gap-1.5">
                    <span data-i18n="dis_clinical_brief">Clinical Brief</span>
                    <span class="w-5 h-5 rounded-full bg-white/[0.06] group-hover:bg-[#EF4444] text-red-300 group-hover:text-white flex items-center justify-center transition-all text-[11px]">&rarr;</span>
                  </span>
                </div>
              </div>

              <!-- Card 2: Liver Disease -->
              <div
                data-disease-id="liver"
                style="--delay: 180ms"
                class="disease-hazard-card reveal reveal-pop touch-reactive cursor-pointer rounded-2xl p-6 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div class="flex items-start justify-between gap-3">
                    <div class="w-11 h-11 rounded-xl bg-[#EF4444]/12 border border-[#EF4444]/30 text-[#EF4444] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h4l3-8 4 16 3-8h4"/>
                      </svg>
                    </div>
                    <span data-i18n="dis_2_tag" class="px-2.5 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/25 font-sans text-[11px] font-semibold text-amber-300">
                      Hepatic Toxicity
                    </span>
                  </div>

                  <div class="mt-5">
                    <h3 data-i18n="dis_2_title" class="font-display font-bold text-lg sm:text-xl text-white group-hover:text-red-400 transition">
                      Liver Disease
                    </h3>
                    <p data-i18n="dis_2_desc" class="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mt-1.5">
                      Cellular toxicity and aldehyde compounds accumulate with every reheat.
                    </p>
                  </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-white/[0.07] flex items-center justify-between font-sans text-xs">
                  <span class="text-gray-400 font-medium flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                    <span data-i18n="dis_2_sub">4-HNE Lipid Stress</span>
                  </span>
                  <span class="text-red-400 group-hover:text-white transition font-semibold inline-flex items-center gap-1.5">
                    <span data-i18n="dis_clinical_brief">Clinical Brief</span>
                    <span class="w-5 h-5 rounded-full bg-white/[0.06] group-hover:bg-[#EF4444] text-red-300 group-hover:text-white flex items-center justify-center transition-all text-[11px]">&rarr;</span>
                  </span>
                </div>
              </div>

              <!-- Card 3: Atherosclerosis -->
              <div
                data-disease-id="atherosclerosis"
                style="--delay: 240ms"
                class="disease-hazard-card reveal reveal-pop touch-reactive cursor-pointer rounded-2xl p-6 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div class="flex items-start justify-between gap-3">
                    <div class="w-11 h-11 rounded-xl bg-[#EF4444]/12 border border-[#EF4444]/30 text-[#EF4444] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                    </div>
                    <span data-i18n="dis_3_tag" class="px-2.5 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/25 font-sans text-[11px] font-semibold text-red-300">
                      Arterial Plaque
                    </span>
                  </div>

                  <div class="mt-5">
                    <h3 data-i18n="dis_3_title" class="font-display font-bold text-lg sm:text-xl text-white group-hover:text-red-400 transition">
                      Atherosclerosis
                    </h3>
                    <p data-i18n="dis_3_desc" class="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mt-1.5">
                      Vascular plaque from polar compounds oxidises LDL and narrows arteries.
                    </p>
                  </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-white/[0.07] flex items-center justify-between font-sans text-xs">
                  <span class="text-gray-400 font-medium flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
                    <span data-i18n="dis_3_sub">Oxidised LDL Surge</span>
                  </span>
                  <span class="text-red-400 group-hover:text-white transition font-semibold inline-flex items-center gap-1.5">
                    <span data-i18n="dis_clinical_brief">Clinical Brief</span>
                    <span class="w-5 h-5 rounded-full bg-white/[0.06] group-hover:bg-[#EF4444] text-red-300 group-hover:text-white flex items-center justify-center transition-all text-[11px]">&rarr;</span>
                  </span>
                </div>
              </div>

              <!-- Card 4: Alzheimer's Link -->
              <div
                data-disease-id="alzheimers"
                style="--delay: 300ms"
                class="disease-hazard-card reveal reveal-pop touch-reactive cursor-pointer rounded-2xl p-6 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div class="flex items-start justify-between gap-3">
                    <div class="w-11 h-11 rounded-xl bg-[#EF4444]/12 border border-[#EF4444]/30 text-[#EF4444] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    </div>
                    <span data-i18n="dis_4_tag" class="px-2.5 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/25 font-sans text-[11px] font-semibold text-amber-300">
                      Neuro-Vascular
                    </span>
                  </div>

                  <div class="mt-5">
                    <h3 data-i18n="dis_4_title" class="font-display font-bold text-lg sm:text-xl text-white group-hover:text-red-400 transition">
                      Alzheimer’s Link
                    </h3>
                    <p data-i18n="dis_4_desc" class="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mt-1.5">
                      Neurodegenerative risk markers linked to peroxidised cooking oil intake.
                    </p>
                  </div>
                </div>

                <div class="mt-5 pt-3.5 border-t border-white/[0.07] flex items-center justify-between font-sans text-xs">
                  <span class="text-gray-400 font-medium flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                    <span data-i18n="dis_4_sub">Blood-Brain Barrier</span>
                  </span>
                  <span class="text-red-400 group-hover:text-white transition font-semibold inline-flex items-center gap-1.5">
                    <span data-i18n="dis_clinical_brief">Clinical Brief</span>
                    <span class="w-5 h-5 rounded-full bg-white/[0.06] group-hover:bg-[#EF4444] text-red-300 group-hover:text-white flex items-center justify-center transition-all text-[11px]">&rarr;</span>
                  </span>
                </div>
              </div>

            </div>

            <!-- Balanced Clinical Summary Bar aligning bottom edge with TEST REHEAT TPC -->
            <div style="--delay: 340ms" class="reveal reveal-up rounded-2xl bg-[#0B120E]/95 border border-white/[0.08] px-5 py-4 flex items-center justify-between gap-4 shadow-xl">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/35 text-[#4ADE80] flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </span>
                <div>
                  <div data-i18n="dis_protect_title" class="font-sans text-xs font-bold text-white">GeoField Closed-Loop Protection</div>
                  <div data-i18n="dis_protect_desc" class="font-sans text-[11px] text-gray-400">Diverts 100% of collected kitchen oil into certified clean biodiesel</div>
                </div>
              </div>
              <span data-i18n="dis_ruco_verified" class="hidden sm:inline-flex px-2.5 py-1 rounded-md bg-[#22C55E]/15 text-[#4ADE80] font-mono text-[10px] font-semibold uppercase tracking-wider shrink-0">
                RUCO Verified
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- SECTION 02: THE PROCESS ("Frictionless Disposal. Zero Interruptions.")-->
    <!-- =================================================================== -->
    <section id="solutionSection" class="scroll-mt-20 bg-process-ivory relative py-24 lg:py-32 overflow-hidden">

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Section Index & Split Header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div class="space-y-4 reveal reveal-left">
            <div class="flex items-center gap-4 font-mono text-xs tracking-[0.22em] uppercase">
              <span class="text-[#16A34A] font-bold">02</span>
              <span class="w-12 h-[1px] bg-[#16A34A]/40"></span>
              <span data-i18n="proc_eyebrow" class="text-gray-500">THE PROCESS</span>
            </div>

            <h2 data-i18n-html="proc_title_html" class="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.06] text-[#111814]">
              Frictionless Disposal.<br />
              <span class="text-[#16A34A]">Zero Interruptions.</span>
            </h2>
          </div>

          <p data-i18n="proc_desc" class="reveal reveal-right text-gray-600 text-sm sm:text-base leading-relaxed max-w-md lg:pb-2">
            Three steps between your kitchen and full FSSAI compliance. No calls, no paperwork, no waiting on informal collectors.
          </p>
        </div>

        <!-- Choreographed Horizontal Pipeline Track with Flowing Emerald Energy Beam & Gliding Fleet Node -->
        <div id="processPipelineContainer" class="mt-20 mb-14 relative hidden md:block reveal reveal-up">
          <!-- Recessed Pipeline Conduit Channel -->
          <div class="h-2.5 w-full rounded-full bg-[#111814]/[0.09] shadow-inner relative overflow-hidden">
            <div id="processTrackProgressFill" class="h-full rounded-full process-beam-animated" style="width: 52%;"></div>
          </div>

          <!-- 3 Interactive Waypoint Beacons at 16.66%, 50%, 83.33% -->
          <button type="button" data-step="1" class="process-node-dot group absolute top-1/2 left-[16.66%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#16A34A] shadow-md hover:scale-125 transition-all duration-300 z-10 flex items-center justify-center" aria-label="Step 1">
            <span class="font-mono text-[10px] font-bold text-[#16A34A]">01</span>
            <span data-i18n="proc_wp_1" class="absolute -bottom-7 whitespace-nowrap font-mono text-[10px] tracking-[0.16em] uppercase text-gray-500 group-hover:text-[#16A34A] transition">QR ASSIGNED</span>
          </button>

          <button type="button" data-step="2" class="process-node-dot group absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#16A34A] shadow-md hover:scale-125 transition-all duration-300 z-10 flex items-center justify-center" aria-label="Step 2">
            <span class="font-mono text-[10px] font-bold text-[#16A34A]">02</span>
            <span data-i18n="proc_wp_2" class="absolute -bottom-7 whitespace-nowrap font-mono text-[10px] tracking-[0.16em] uppercase text-[#16A34A] font-semibold transition">CLUSTER PICKUP</span>
          </button>

          <button type="button" data-step="3" class="process-node-dot group absolute top-1/2 left-[83.33%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#16A34A] shadow-md hover:scale-125 transition-all duration-300 z-10 flex items-center justify-center" aria-label="Step 3">
            <span class="font-mono text-[10px] font-bold text-[#16A34A]">03</span>
            <span data-i18n="proc_wp_3" class="absolute -bottom-7 whitespace-nowrap font-mono text-[10px] tracking-[0.16em] uppercase text-gray-500 group-hover:text-[#16A34A] transition">INSTANT RECEIPT</span>
          </button>

          <!-- Gliding 3D Glowing Fleet Puck + Live Telemetry Badge -->
          <div id="glidingProcessPuck" class="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" style="transition: left 0.75s cubic-bezier(0.22, 1, 0.36, 1);">
            <div id="processPuckTelemetryPill" class="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-[#111814] text-[#22C55E] font-mono text-[10px] font-bold tracking-[0.16em] uppercase shadow-lg border border-[#22C55E]/40">
              STEP 02 &bull; FLEET ROUTED
            </div>
            <span class="process-node-pulse absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-[#22C55E]/35"></span>
            <div class="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#4ADE80] to-[#16A34A] text-[#050A07] flex items-center justify-center shadow-[0_10px_28px_rgba(22,163,74,0.55),inset_0_2px_0_rgba(255,255,255,0.45)] border-2 border-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- 3 Crisp White Popping Process Cards (01, 02, 03) -->
        <div id="processCardsGrid" class="mt-10 md:mt-2 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- STEP 01 CARD -->
          <div style="--delay: 320ms" data-step-card="1" class="reveal reveal-pop process-white-card touch-reactive cursor-pointer rounded-3xl p-8 sm:p-9 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between mb-7">
                <div class="step-icon-box w-14 h-14 rounded-2xl bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center transition-all duration-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 3h3m3 0h-3m0 0v-3m0 3v3"/>
                  </svg>
                </div>
                <span class="step-num-watermark font-display font-extrabold text-5xl text-gray-200 select-none transition-colors duration-500">01</span>
              </div>

              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-3">
                <span data-i18n="proc_1_badge">&check; 60-SECOND ONBOARDING</span>
              </div>

              <h3 data-i18n="proc_1_title" class="font-display font-bold text-xl sm:text-2xl text-[#111814]">Register &amp; Get Your QR</h3>
              <p data-i18n="proc_1_desc" class="mt-3 text-sm text-gray-600 leading-relaxed">
                Sign up in 60 seconds and receive a unique, waterproof QR code assigned directly to your restaurant.
              </p>
            </div>

            <div class="mt-8 pt-2">
              <div class="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-gray-400 mb-2">
                <span data-i18n="proc_1_pipe">STEP 01 PIPELINE</span>
                <span data-i18n="proc_1_status" class="step-status-text text-[#16A34A] font-semibold">READY</span>
              </div>
              <div class="hidden"><div class="step-bottom-bar"></div></div>
            </div>
          </div>

          <!-- STEP 02 CARD -->
          <div style="--delay: 460ms" data-step-card="2" class="reveal reveal-pop process-white-card active-process-card touch-reactive cursor-pointer rounded-3xl p-8 sm:p-9 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between mb-7">
                <div class="step-icon-box w-14 h-14 rounded-2xl bg-[#22C55E] text-[#050A07] flex items-center justify-center shadow-lg shadow-[#22C55E]/30 transition-all duration-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1"/>
                  </svg>
                </div>
                <span class="step-num-watermark font-display font-extrabold text-5xl text-[#16A34A]/30 select-none transition-colors duration-500">02</span>
              </div>

              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16A34A]/15 text-[#16A34A] font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-3">
                <span data-i18n="proc_2_badge">&check; AI CLUSTER ROUTING</span>
              </div>

              <h3 data-i18n="proc_2_title" class="font-display font-bold text-xl sm:text-2xl text-[#111814]">Cluster-Based Pickups</h3>
              <p data-i18n="proc_2_desc" class="mt-3 text-sm text-gray-600 leading-relaxed">
                Our hyper-local fleet runs optimised cluster routes &mdash; oil is collected quickly, cleanly, and on schedule.
              </p>
            </div>

            <div class="mt-8 pt-2">
              <div class="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-gray-400 mb-2">
                <span data-i18n="proc_2_pipe">STEP 02 PIPELINE</span>
                <span data-i18n="proc_2_status" class="step-status-text text-[#16A34A] font-bold">ACTIVE STAGE</span>
              </div>
              <div class="hidden"><div class="step-bottom-bar"></div></div>
            </div>
          </div>

          <!-- STEP 03 CARD -->
          <div style="--delay: 600ms" data-step-card="3" class="reveal reveal-pop process-white-card touch-reactive cursor-pointer rounded-3xl p-8 sm:p-9 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between mb-7">
                <div class="step-icon-box w-14 h-14 rounded-2xl bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center transition-all duration-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2M8 12h8"/>
                  </svg>
                </div>
                <span class="step-num-watermark font-display font-extrabold text-5xl text-gray-200 select-none transition-colors duration-500">03</span>
              </div>

              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-3">
                <span data-i18n="proc_3_badge">&check; DIGITAL FSSAI RECEIPT</span>
              </div>

              <h3 data-i18n="proc_3_title" class="font-display font-bold text-xl sm:text-2xl text-[#111814]">Scan &amp; Done</h3>
              <p data-i18n="proc_3_desc" class="mt-3 text-sm text-gray-600 leading-relaxed">
                The agent scans your QR, weight is auto-logged, and a digital FSSAI-compliant receipt is issued instantly.
              </p>
            </div>

            <div class="mt-8 pt-2">
              <div class="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-gray-400 mb-2">
                <span data-i18n="proc_3_pipe">STEP 03 PIPELINE</span>
                <span data-i18n="proc_3_status" class="step-status-text text-[#16A34A] font-semibold">INSTANT SETTLE</span>
              </div>
              <div class="hidden"><div class="step-bottom-bar"></div></div>
            </div>
          </div>

        </div>

        <!-- Bottom Transition Prompt -->
        <div class="mt-16 pt-2 text-center reveal reveal-up">
          <a href="#impactSection" class="nav-scroll-link inline-flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-gray-500 hover:text-[#16A34A] transition">
            <span class="text-[#16A34A] font-bold">&darr;</span>
            <span data-i18n="proc_bottom_cta">THEN WATCH WHAT YOUR OIL BECOMES</span>
          </a>
        </div>

      </div>

      <!-- Giant Bottom Tonal Watermark "SCAN & DONE" (Slides in Deliberately from Right) -->
      <div class="pointer-events-none select-none overflow-hidden w-full mt-6 -mb-6 sm:-mb-10 text-center">
        <div id="scanDoneBgWatermark" class="bg-slide-from-right font-display font-extrabold text-[4.4rem] sm:text-[8.2rem] lg:text-[11.5rem] leading-[0.86] tracking-tight text-[#16A34A]/[0.085] uppercase whitespace-nowrap">
          SCAN &amp; DONE
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- SECTION 03: THE REWARD ("Track Your Green Footprint." + CONSOLE)    -->
    <!-- =================================================================== -->
    <section id="impactSection" class="scroll-mt-20 bg-organic-dark relative py-24 lg:py-32 overflow-hidden border-t border-white/5">
      
      <!-- Giant Outlined Watermark "GREEN" in Top-Left (Slides in from Left first, then Information Appears in Sequence) -->
      <div id="greenBgWatermark" class="bg-slide-from-left stroke-watermark-green absolute top-6 left-[-1%] font-display font-extrabold text-[6.5rem] sm:text-[10.5rem] lg:text-[13rem] leading-none tracking-tight">
        GREEN
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Column: 03 THE REWARD + Copy + Interactive Scaling Volume Control -->
          <div class="lg:col-span-5 space-y-7">
            <div class="reveal reveal-left flex items-center gap-4 font-mono text-xs tracking-[0.22em] uppercase">
              <span class="text-[#22C55E] font-bold">03</span>
              <span class="w-12 h-[1px] bg-[#22C55E]/40"></span>
              <span data-i18n="imp_eyebrow" class="text-gray-400">THE REWARD</span>
            </div>

            <h2 style="--delay: 220ms" class="reveal reveal-up font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.06]">
              <span data-i18n="imp_title_1" class="block text-white">Track Your</span>
              <span data-i18n="imp_title_2" class="block text-[#22C55E]">Green Footprint.</span>
            </h2>

            <p data-i18n="imp_desc" style="--delay: 340ms" class="reveal reveal-up text-gray-400 text-base sm:text-lg leading-relaxed">
              Every litre you hand over is weighed, certified, and traced to a refinery. Your dashboard turns compliance into a story worth telling &mdash; and a payout worth collecting.
            </p>

            <div style="--delay: 180ms" class="reveal reveal-up flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-gray-400 pt-1">
              <span class="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span data-i18n="imp_sample_badge">DASHBOARD PREVIEW &mdash; SAMPLE DATA</span>
            </div>

            <!-- Interactive Tier Selector (Clean Segmented Buttons, Zero Slider Bar Clutter) -->
            <div style="--delay: 220ms" class="reveal reveal-up p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5">
              <div class="flex items-center justify-between text-xs">
                <span data-i18n="imp_scale_label" class="font-mono text-[10px] tracking-[0.16em] uppercase text-gray-400">SELECT KITCHEN SCALE TIER</span>
                <span id="consoleSliderBadge" class="px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/35 font-mono text-xs font-bold text-[#22C55E]">12,450 L</span>
              </div>

              <input id="consoleVolumeSlider" type="range" min="1500" max="30000" step="150" value="12450" class="sr-only" aria-label="Scale recycled liters volume" />

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button type="button" data-vol="3200" data-i18n="imp_preset_1" class="console-preset-btn touch-reactive py-2.5 px-3 rounded-xl bg-surface-950 border border-white/10 font-mono text-[10px] text-gray-400 hover:text-white transition">
                  QSR Hub
                </button>
                <button type="button" data-vol="12450" data-i18n="imp_preset_2" class="console-preset-btn touch-reactive py-2.5 px-3 rounded-xl bg-[#22C55E]/20 border border-[#22C55E]/50 font-mono text-[10px] text-[#22C55E] font-semibold transition">
                  Sample
                </button>
                <button type="button" data-vol="18600" data-i18n="imp_preset_3" class="console-preset-btn touch-reactive py-2.5 px-3 rounded-xl bg-surface-950 border border-white/10 font-mono text-[10px] text-gray-400 hover:text-white transition">
                  Cloud 18k
                </button>
                <button type="button" data-vol="26000" data-i18n="imp_preset_4" class="console-preset-btn touch-reactive py-2.5 px-3 rounded-xl bg-surface-950 border border-white/10 font-mono text-[10px] text-gray-400 hover:text-white transition">
                  Hotel 26k
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column: GEOFIELD IMPACT CONSOLE -->
          <div style="--delay: 420ms" class="lg:col-span-7 reveal reveal-pop">
            <div id="impactConsoleShell" class="impact-console-shell rounded-[28px] p-6 sm:p-8 relative overflow-hidden">
              
              <!-- Console Top Window Bar -->
              <div class="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
                  </div>
                  <span data-i18n="imp_console_title" class="font-mono text-[11px] tracking-[0.22em] uppercase text-gray-400">
                    GEOFIELD IMPACT CONSOLE
                  </span>
                </div>

                <div class="flex items-center gap-3">
                  <button id="openSampleCertBtn" data-i18n="imp_receipt_pdf" class="hidden sm:inline-flex font-mono text-[10px] tracking-[0.14em] uppercase text-gray-400 hover:text-[#22C55E] transition">
                    [RECEIPT PDF]
                  </button>
                  <span class="px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 font-mono text-[10px] tracking-[0.18em] uppercase text-[#22C55E] flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping"></span>
                    <span data-i18n="imp_live">LIVE</span>
                  </span>
                </div>
              </div>

              <!-- 2x2 Grid of Popping & Scaling Metric Cards (Compact 2-Col on Mobile so Graph sits in immediate view) -->
              <div class="grid grid-cols-2 gap-3 sm:gap-4 my-5">
                
                <!-- Box 1: 12,450 L (LITERS RECYCLED) -->
                <div data-metric-box="liters" class="console-metric-box cursor-pointer rounded-2xl p-4 sm:p-6">
                  <div class="flex items-center justify-between mb-2.5 sm:mb-4">
                    <span class="text-[#22C55E]">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c-4.97 5.39-7 8.48-7 11.5a7 7 0 1014 0c0-3.02-2.03-6.11-7-11.5z"/>
                      </svg>
                    </span>
                    <span data-i18n="imp_mom_tag" class="font-mono text-[9px] sm:text-[10px] tracking-[0.1em] uppercase text-[#A3E635]">
                      &#8599; +18% MoM
                    </span>
                  </div>
                  <div id="consoleLitersValue" class="tabular-nums font-display font-extrabold text-xl sm:text-4xl text-white tracking-tight">
                    12,450 L
                  </div>
                  <div data-i18n="imp_metric_1" class="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-gray-400 mt-1.5">
                    LITERS RECYCLED
                  </div>
                </div>

                <!-- Box 2: 31.1 T CO2 (CARBON OFFSET) -->
                <div data-metric-box="co2" class="console-metric-box cursor-pointer rounded-2xl p-4 sm:p-6">
                  <div class="flex items-center justify-between mb-2.5 sm:mb-4">
                    <span class="text-[#22C55E]">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5a3 3 0 113 3H3m13 8a3 3 0 103-3H3m9-4H3"/>
                      </svg>
                    </span>
                    <span id="consoleTreesTag" class="font-mono text-[9px] sm:text-[10px] tracking-[0.08em] uppercase text-[#A3E635] truncate max-w-[115px] sm:max-w-none">
                      &#8599; &approx; 1,420 TREES
                    </span>
                  </div>
                  <div id="consoleCo2Value" class="tabular-nums font-display font-extrabold text-xl sm:text-4xl text-white tracking-tight">
                    31.1 T CO₂
                  </div>
                  <div data-i18n="imp_metric_2" class="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-gray-400 mt-1.5">
                    CARBON OFFSET
                  </div>
                </div>

                <!-- Box 3: 1,86,000 L (WATER SAVED) -->
                <div data-metric-box="water" class="console-metric-box cursor-pointer rounded-2xl p-4 sm:p-6">
                  <div class="flex items-center justify-between mb-2.5 sm:mb-4">
                    <span class="text-[#22C55E]">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 10c2.5-2 5.5-2 8 0s5.5 2 8 0M3 15c2.5-2 5.5-2 8 0s5.5 2 8 0"/>
                      </svg>
                    </span>
                    <span data-i18n="imp_protected_tag" class="font-mono text-[9px] sm:text-[10px] tracking-[0.1em] uppercase text-[#A3E635]">
                      &#8599; PROTECTED
                    </span>
                  </div>
                  <div id="consoleWaterValue" class="tabular-nums font-display font-extrabold text-xl sm:text-4xl text-white tracking-tight">
                    1,86,000 L
                  </div>
                  <div data-i18n="imp_metric_3" class="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-gray-400 mt-1.5">
                    WATER SAVED
                  </div>
                </div>

                <!-- Box 4: ₹ 4,98,000 (REVENUE GENERATED @ ₹40/L AVG RATE) -->
                <div data-metric-box="revenue" class="console-metric-box cursor-pointer rounded-2xl p-4 sm:p-6">
                  <div class="flex items-center justify-between mb-2.5 sm:mb-4">
                    <span class="text-[#22C55E] font-display font-bold text-sm sm:text-base">&#8377;</span>
                    <span data-i18n="imp_rate_tag" class="font-sans text-[10px] sm:text-[11px] font-semibold text-[#A3E635]">
                      &#8599; &#8377;40/L VERIFIED
                    </span>
                  </div>
                  <div id="consoleRevenueValue" class="tabular-nums font-display font-extrabold text-xl sm:text-4xl text-white tracking-tight">
                    &#8377; 4,98,000
                  </div>
                  <div data-i18n="imp_metric_4" class="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-gray-400 mt-1.5">
                    REVENUE GENERATED
                  </div>
                </div>

              </div>

              <!-- Bottom Graph Card: COLLECTION VELOCITY — 12 WEEKS (+214%) -->
              <div class="console-metric-box rounded-2xl p-4 sm:p-6 relative">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span data-i18n="imp_vel_title" class="font-mono text-[10px] tracking-[0.18em] uppercase text-gray-300 font-semibold">
                    COLLECTION VELOCITY &mdash; 12 WEEKS
                  </span>
                  <div class="flex items-center gap-2.5">
                    <span id="velocityHoverReadout" class="px-2.5 py-1 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/35 font-mono text-[10px] text-[#4ADE80] font-semibold">
                      Week 12: 1,484 L &bull; &#8377;59,360
                    </span>
                    <span id="velocityGrowthPct" class="tabular-nums font-mono text-xs font-bold text-[#22C55E]">
                      +214%
                    </span>
                  </div>
                </div>

                <!-- Interactive Left-to-Right Growing Spline SVG Chart (Full Mobile Touch & Drag Scrubbing) -->
                <div class="relative h-44 sm:h-48 w-full pt-1">
                  <svg id="velocitySplineSvg" viewBox="0 0 600 156" class="chart-touch-svg w-full h-full overflow-visible cursor-crosshair">
                    <defs>
                      <linearGradient id="velocityEmeraldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#22C55E" stop-opacity="0.42" />
                        <stop offset="75%" stop-color="#22C55E" stop-opacity="0.09" />
                        <stop offset="100%" stop-color="#22C55E" stop-opacity="0.0" />
                      </linearGradient>
                      <clipPath id="velocityLeftToRightClip">
                        <rect id="velocityClipRect" x="0" y="0" width="600" height="156" />
                      </clipPath>
                    </defs>

                    <g stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4 4">
                      <line x1="15" y1="32" x2="585" y2="32" />
                      <line x1="15" y1="68" x2="585" y2="68" />
                      <line x1="15" y1="104" x2="585" y2="104" />
                    </g>

                    <g clip-path="url(#velocityLeftToRightClip)">
                      <path id="velocityAreaPath" d="" fill="url(#velocityEmeraldGrad)" />
                      <path id="velocityGlowPath" d="" fill="none" stroke="#22C55E" stroke-opacity="0.24" stroke-width="9" stroke-linecap="round" />
                      <path id="velocityLinePath" d="" fill="none" stroke="#22C55E" stroke-width="3.4" stroke-linecap="round" />
                    </g>

                    <line id="velocityScrubLine" x1="585" y1="12" x2="585" y2="132" stroke="rgba(34,197,94,0.45)" stroke-width="1.4" stroke-dasharray="3 3" />
                    <circle id="velocityActivePulse" cx="585" cy="24" r="12" fill="rgba(34,197,94,0.24)" pointer-events="none" />
                    <circle id="velocityActiveDot" cx="585" cy="24" r="6" fill="#22C55E" stroke="#060A08" stroke-width="2.4" pointer-events="none" />

                    <g fill="rgba(209,213,219,0.8)" font-family="JetBrains Mono, monospace" font-size="11" text-anchor="middle">
                      <text x="15" y="149">W01</text>
                      <text x="160" y="149">W04</text>
                      <text x="315" y="149">W07</text>
                      <text x="470" y="149">W10</text>
                      <text x="585" y="149" fill="#4ADE80" font-weight="700">W12</text>
                    </g>
                  </svg>
                </div>

                <!-- Mobile-Friendly Quick-Tap Week Selector Bar -->
                <div class="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar">
                  <span data-i18n="imp_tap_week" class="font-mono text-[9px] uppercase tracking-wider text-gray-400 shrink-0">Tap Week:</span>
                  <div class="flex items-center gap-1.5">
                    <button type="button" data-vel-week="1" class="vel-week-pill px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition">W01</button>
                    <button type="button" data-vel-week="4" class="vel-week-pill px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition">W04</button>
                    <button type="button" data-vel-week="7" class="vel-week-pill px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition">W07</button>
                    <button type="button" data-vel-week="10" class="vel-week-pill px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition">W10</button>
                    <button type="button" data-vel-week="12" data-i18n="imp_w12_peak" class="vel-week-pill px-2.5 py-1 rounded-lg bg-[#22C55E]/20 border border-[#22C55E]/50 font-mono text-[10px] text-[#4ADE80] font-bold transition">W12 Peak</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- SECTION 04: JOIN THE NETWORK                                        -->
    <!-- =================================================================== -->
    <section id="joinSection" class="scroll-mt-20 relative py-28 lg:py-36 overflow-hidden border-t border-white/5 bg-[#060C08]">
      
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/images/wind-turbines.jpeg"
          alt="Wind turbines on misty green rolling hills"
          decoding="async"
          class="w-full h-full object-cover object-center opacity-80"
        />
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,rgba(34,197,94,0.16)_0%,rgba(6,12,9,0.55)_58%,rgba(5,8,6,0.94)_100%)]"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-[#060A08] via-transparent to-[#050806]"></div>
      </div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
        <div class="reveal reveal-up flex items-center justify-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-[#22C55E]">
          <span>04</span>
          <span>&mdash;</span>
          <span data-i18n="join_eyebrow">JOIN THE NETWORK</span>
        </div>

        <h2 style="--delay: 60ms" class="reveal reveal-pop font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.05]">
          <span data-i18n="join_title_1" class="block text-white">Ready to clean up</span>
          <span data-i18n="join_title_2" class="block text-white">your kitchen &mdash; and</span>
          <span data-i18n="join_title_3" class="block text-[#22C55E]">your conscience?</span>
        </h2>

        <p data-i18n="join_desc" style="--delay: 120ms" class="reveal reveal-up text-gray-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
          Registration takes 60 seconds. Our agents take care of the rest.
        </p>

        <div style="--delay: 180ms" class="reveal reveal-pop pt-3">
          <button id="footerRegisterBtn" class="btn-green-pill touch-reactive px-10 py-4 rounded-full font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase inline-flex items-center gap-3">
            <span data-i18n="join_cta">REGISTER NOW</span>
            <span>&#8599;</span>
          </button>
        </div>

        <div data-i18n="join_trust_bar" style="--delay: 240ms" class="reveal reveal-up pt-3 font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-gray-500">
          NO HARDWARE TO BUY &nbsp;&middot;&nbsp; NO CONTRACTS TO SIGN &nbsp;&middot;&nbsp; QR KIT SHIPS IN 48H
        </div>
      </div>
    </section>

  </main>

  <!-- ===================================================================== -->
  <!-- VIEW 2: SELLER (FBO) PORTAL VIEW (EQUALLY BALANCED EXECUTIVE UI)      -->
  <!-- ===================================================================== -->
  <section id="portalView" class="relative z-10 hidden min-h-screen py-10 lg:py-14 bg-organic-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
      
      <!-- Top Executive Command Header Card with Graphic Dual-Role Selector Cards -->
      <div id="portalCommandBanner" class="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0E1B14] via-[#0A130E] to-[#080E0B] border border-[#22C55E]/25 shadow-2xl space-y-6 transition-colors duration-300">
        
        <!-- Top Row: Distinct Visual Role Switcher Cards (Seller Kitchen vs Buyer Refinery) + Back Button -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full lg:max-w-2xl">
            <!-- Option 1: Seller (FBO Restaurant/Kitchen) Card -->
            <button id="portalRoleSellerBtn" type="button" class="touch-reactive text-left p-4 rounded-2xl bg-[#22C55E] text-[#050A07] border-2 border-[#4ADE80] shadow-[0_12px_28px_-6px_rgba(34,197,94,0.45)] transition-all flex items-center justify-between gap-3">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#050A07]/15 flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V7l8-4v18m6 0V11l-6-4"/>
                  </svg>
                </div>
                <div>
                  <div class="font-sans text-[11px] font-bold uppercase tracking-wider opacity-80">FBO Kitchen Partner</div>
                  <div class="font-display text-lg font-extrabold leading-tight">Seller Dashboard</div>
                  <div class="font-sans text-xs font-medium opacity-85 mt-0.5">Dispose UCO @ ₹40/L &bull; QR Receipts</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-[#050A07]/15 font-sans text-[11px] font-bold">ACTIVE</span>
            </button>

            <!-- Option 2: Customer (Biofuel Refinery Buyer) Card -->
            <button id="portalRoleCustomerBtn" type="button" class="touch-reactive text-left p-4 rounded-2xl bg-[#0B151C] hover:bg-[#10212B] text-white border-2 border-[#38BDF8]/35 hover:border-[#38BDF8] transition-all flex items-center justify-between gap-3">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-sans text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">Biofuel &amp; SAF Offtaker</div>
                  <div class="font-display text-lg font-extrabold leading-tight">Customer Dashboard</div>
                  <div class="font-sans text-xs text-gray-300 mt-0.5">Procure Bulk MT &bull; ISCC Certificates</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-[#38BDF8]/15 text-[#38BDF8] font-sans text-[11px] font-semibold">SWITCH</span>
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-3 shrink-0">
            <button id="sellerQuickLogBtn" type="button" class="btn-green-pill touch-reactive px-5 py-3 rounded-xl font-display text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg">
              <span data-i18n="portal_sim_qr">+ Simulate QR Pickup</span>
            </button>
            <button id="customerQuickOrderBtn" type="button" class="hidden touch-reactive px-5 py-3 rounded-xl bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#050A07] font-display text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition">
              <span data-i18n="portal_req_batch">+ Request Feedstock Batch</span>
            </button>
            <button id="backToLandingBtn" data-i18n="portal_back_home" type="button" class="touch-reactive px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-gray-200 font-sans text-xs font-semibold transition text-center">
              &larr; Back to Home
            </button>
          </div>
        </div>

        <!-- Bottom Row: Active Profile Identity & Live Status Pills -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2.5">
              <span id="portalRoleBadge" class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/35 font-sans text-xs font-semibold text-[#4ADE80]">
                <span class="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                <span id="portalRoleBadgeText">Seller Kitchen Console</span>
              </span>
              <span id="portalSubBadge1" class="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] font-sans text-xs text-gray-300 font-medium">
                ISCC &amp; FSSAI RUCO Verified
              </span>
              <span id="portalSubBadge2" class="px-3 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 font-sans text-xs font-semibold text-[#FDE68A]">
                Avg Rate: &#8377;40 / Liter
              </span>
            </div>

            <h1 id="sellerFboNameDisplay" class="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Cluster 04 &mdash; Andheri West
            </h1>
            <p id="portalConsoleSubtitle" class="text-xs sm:text-sm text-gray-300 font-sans">
              Auto-Settlement Bank: <strong class="text-white">HDFC Bank &bull;&bull;&bull;&bull; 4821 (Instant NEFT)</strong> &nbsp;&middot;&nbsp; Next Fleet Window: <strong class="text-[#4ADE80]">Tomorrow, 10:30 AM</strong>
            </p>
          </div>
        </div>

      </div>

      <!-- =================================================================== -->
      <!-- PANEL A: SELLER (FBO PARTNER) DASHBOARD                             -->
      <!-- =================================================================== -->
      <div id="sellerPortalPanel" class="space-y-7">
        
        <!-- 4 Symmetrical, Equally-Balanced KPI Metric Cards (2x2 on Mobile so Analytics Graph is immediately accessible) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-stretch">
          
          <div class="console-metric-box touch-reactive rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span data-i18n="imp_metric_1" class="font-mono text-[10px] tracking-[0.18em] uppercase text-gray-400">LITERS RECYCLED</span>
                <span class="w-8 h-8 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c-4.97 5.39-7 8.48-7 11.5a7 7 0 1014 0c0-3.02-2.03-6.11-7-11.5z"/>
                  </svg>
                </span>
              </div>
              <div id="sellerTotalVol" class="tabular-nums font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                412.0 L
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px]">
              <span data-i18n="sel_kpi1_sub" class="text-gray-400">4 DRUMS VERIFIED</span>
              <span class="text-[#22C55E] font-semibold">+18.4% MoM</span>
            </div>
          </div>

          <div class="console-metric-box touch-reactive rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span data-i18n="sel_kpi2_title" class="font-mono text-[10px] tracking-[0.18em] uppercase text-gray-400">GREEN REVENUE</span>
                <span class="w-8 h-8 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] font-mono font-bold text-xs flex items-center justify-center">
                  &#8377;
                </span>
              </div>
              <div id="sellerTotalEarned" class="tabular-nums font-display text-3xl sm:text-4xl font-extrabold text-[#22C55E] tracking-tight">
                &#8377;16,480
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px]">
              <span data-i18n="sel_kpi2_sub1" class="text-gray-400">SETTLEMENT</span>
              <span data-i18n="sel_kpi2_sub2" class="text-[#A3E635] font-semibold">100% PAID</span>
            </div>
          </div>

          <div class="console-metric-box touch-reactive rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span data-i18n="imp_metric_2" class="font-mono text-[10px] tracking-[0.18em] uppercase text-gray-400">CARBON OFFSET</span>
                <span class="w-8 h-8 rounded-xl bg-[#A3E635]/15 border border-[#A3E635]/30 text-[#A3E635] flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 21c.5-4.5 2.5-8 7-10 4.5-2 7-5.5 7-10-4.5 0-8 2.5-10 7-2 4.5-3.5 8.5-4 13z"/>
                  </svg>
                </span>
              </div>
              <div id="sellerTotalCo2" class="tabular-nums font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                1,030 kg
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px]">
              <span data-i18n="sel_kpi3_sub1" class="text-gray-400">BIODIESEL YIELD</span>
              <span class="text-[#A3E635] font-semibold">ISCC AUDITABLE</span>
            </div>
          </div>

          <div class="console-metric-box touch-reactive rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span data-i18n="imp_metric_3" class="font-mono text-[10px] tracking-[0.18em] uppercase text-gray-400">WATER PROTECTED</span>
                <span class="w-8 h-8 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 10c2.5-2 5.5-2 8 0s5.5 2 8 0M3 15c2.5-2 5.5-2 8 0s5.5 2 8 0"/>
                  </svg>
                </span>
              </div>
              <div id="sellerTotalWater" class="tabular-nums font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                412M L
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px]">
              <span data-i18n="sel_kpi4_sub1" class="text-gray-400">ZERO DRAINAGE</span>
              <span class="text-[#38BDF8] font-semibold">FSSAI FORM-IV</span>
            </div>
          </div>

        </div>

        <!-- Balanced 12-Column Main Workspace -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <div class="lg:col-span-8 flex flex-col justify-between gap-6">
            
            <div class="telemetry-chart-shell rounded-3xl p-6 sm:p-7 relative overflow-hidden">
              <!-- Top Header Row with Dual Legend & Timeframe Selector -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.07]">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    <span data-i18n="sel_chart_eyebrow" class="font-mono text-[10px] tracking-[0.2em] uppercase text-[#22C55E] font-semibold">REVENUE &amp; VOLUME TELEMETRY</span>
                  </div>
                  <h2 data-i18n="sel_chart_title" class="font-display text-lg sm:text-xl font-bold text-white mt-1">Collection Volume &amp; Instant NEFT Settlement Curve</h2>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                  <div class="flex items-center gap-3.5 font-sans text-xs bg-white/[0.03] border border-white/[0.07] px-3 py-1.5 rounded-xl">
                    <span class="flex items-center gap-1.5 text-gray-200 font-medium">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]"></span>
                      <span data-i18n="sel_leg_liters">Liters Logged</span>
                    </span>
                    <span class="flex items-center gap-1.5 text-gray-200 font-medium">
                      <span class="w-2.5 h-0.5 bg-[#F59E0B]"></span>
                      <span data-i18n="sel_leg_payout">NEFT Payout (&#8377;)</span>
                    </span>
                  </div>

                  <div class="inline-flex p-1 rounded-xl bg-surface-950 border border-white/10 font-mono text-[10px]">
                    <button type="button" data-seller-range="6M" class="seller-range-btn px-2.5 py-1 rounded-lg bg-[#22C55E]/20 text-[#22C55E] font-bold transition">6M</button>
                    <button type="button" data-seller-range="1Y" class="seller-range-btn px-2.5 py-1 rounded-lg text-gray-400 hover:text-white transition">1Y</button>
                    <button type="button" data-seller-range="ALL" class="seller-range-btn px-2.5 py-1 rounded-lg text-gray-400 hover:text-white transition">ALL</button>
                  </div>
                </div>
              </div>

              <!-- Live Telemetry Readout Strip (Mobile-Friendly Stack & Desktop 3-Column) -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 my-4 p-3.5 rounded-2xl bg-surface-950/90 border border-white/[0.08]">
                <div class="flex sm:block items-center justify-between">
                  <div class="font-mono text-[10px] uppercase tracking-wider text-gray-400">Active Period</div>
                  <div id="sellerChartPeriodLabel" class="font-display font-bold text-sm sm:text-base text-white sm:mt-0.5">Oct 2026 (Peak)</div>
                </div>
                <div class="flex sm:block items-center justify-between border-t sm:border-t-0 border-white/[0.05] pt-1.5 sm:pt-0">
                  <div class="font-mono text-[10px] uppercase tracking-wider text-gray-400">Verified Volume</div>
                  <div id="sellerChartVolReadout" class="tabular-nums font-display font-bold text-sm sm:text-base text-[#4ADE80] sm:mt-0.5">126.0 Liters</div>
                </div>
                <div class="flex sm:block items-center justify-between border-t sm:border-t-0 border-white/[0.05] pt-1.5 sm:pt-0">
                  <div class="font-mono text-[10px] uppercase tracking-wider text-gray-400">NEFT Disbursed</div>
                  <div id="sellerChartPayoutReadout" class="tabular-nums font-display font-bold text-sm sm:text-base text-[#FDE68A] sm:mt-0.5">&#8377;5,040 (@ &#8377;40/L)</div>
                </div>
              </div>

              <!-- Executive Dual-Curve SVG Spline Telemetry Chart (Touch-Scrubbable & High Mobile Legibility) -->
              <div class="relative h-56 sm:h-60 w-full pt-2 select-none">
                <svg id="sellerAnalyticsSvg" viewBox="0 0 640 190" class="chart-touch-svg w-full h-full overflow-visible cursor-crosshair">
                  <defs>
                    <linearGradient id="sellerAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#22C55E" stop-opacity="0.38" />
                      <stop offset="70%" stop-color="#22C55E" stop-opacity="0.08" />
                      <stop offset="100%" stop-color="#22C55E" stop-opacity="0.0" />
                    </linearGradient>
                    <linearGradient id="sellerLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="#16A34A" />
                      <stop offset="60%" stop-color="#22C55E" />
                      <stop offset="100%" stop-color="#A3E635" />
                    </linearGradient>
                  </defs>

                  <!-- Subtle Horizontal Reference Grid & Y-Axis Scale -->
                  <g stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4 4">
                    <line x1="46" y1="26" x2="616" y2="26" />
                    <line x1="46" y1="68" x2="616" y2="68" />
                    <line x1="46" y1="110" x2="616" y2="110" />
                    <line x1="46" y1="152" x2="616" y2="152" />
                  </g>
                  <g fill="rgba(209,213,219,0.75)" font-family="JetBrains Mono, monospace" font-size="11" text-anchor="end">
                    <text x="40" y="30">140L</text>
                    <text x="40" y="72">105L</text>
                    <text x="40" y="114">70L</text>
                    <text x="40" y="156">35L</text>
                  </g>

                  <!-- Area Fill & Secondary Amber Payout Curve + Primary Emerald Volume Spline -->
                  <path id="sellerAreaPath" d="" fill="url(#sellerAreaGrad)" />
                  <path id="sellerPayoutLinePath" d="" fill="none" stroke="#F59E0B" stroke-width="2.2" stroke-dasharray="5 4" stroke-linecap="round" opacity="0.88" />
                  <path id="sellerVolumeGlowPath" d="" fill="none" stroke="#22C55E" stroke-opacity="0.22" stroke-width="8" stroke-linecap="round" />
                  <path id="sellerVolumeLinePath" d="" fill="none" stroke="url(#sellerLineGrad)" stroke-width="3.5" stroke-linecap="round" />

                  <!-- Interactive Vertical Crosshair Scrub Line -->
                  <line id="sellerChartScrubLine" x1="600" y1="18" x2="600" y2="154" stroke="rgba(34,197,94,0.5)" stroke-width="1.4" stroke-dasharray="3 3" />

                  <!-- Data Point Nodes Group (With 24px Touch Targets) -->
                  <g id="sellerChartNodesGroup"></g>

                  <!-- Active Highlight Ring -->
                  <circle id="sellerChartActiveHalo" cx="600" cy="38" r="12" fill="rgba(34,197,94,0.25)" pointer-events="none" />
                  <circle id="sellerChartActiveDot" cx="600" cy="38" r="6" fill="#22C55E" stroke="#060A08" stroke-width="2.4" pointer-events="none" />

                  <!-- X-Axis Month Labels -->
                  <g id="sellerChartXAxisGroup" fill="rgba(209,213,219,0.85)" font-family="JetBrains Mono, monospace" font-size="11" text-anchor="middle"></g>
                </svg>
              </div>

              <!-- Mobile-Friendly Quick-Tap Month Pill Bar for Instant One-Thumb Inspection -->
              <div class="mt-3 pt-3 border-t border-white/[0.07] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
                <span class="font-mono text-[10px] uppercase tracking-wider text-gray-400 shrink-0">Tap Period:</span>
                <div id="sellerMobileNodePills" class="flex items-center gap-1.5"></div>
              </div>
            </div>

            <div class="console-metric-box rounded-3xl p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <h2 data-i18n="sel_ledger_title" class="font-display text-lg sm:text-xl font-bold text-white">Collection Ledger &amp; FSSAI Audit Receipts</h2>
                    <p data-i18n="sel_ledger_sub" class="text-xs text-gray-400 mt-0.5">Tamper-proof disposal certificates ready for municipal &amp; FSSAI inspection</p>
                  </div>
                  <span data-i18n="sel_ledger_badge" class="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-wider text-gray-300 self-start sm:self-auto">
                    AUTO-SYNCED LEDGER
                  </span>
                </div>

                <div class="overflow-x-auto no-scrollbar">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
                        <th class="py-3.5 px-3">Pickup Date</th>
                        <th class="py-3.5 px-3">Volume</th>
                        <th class="py-3.5 px-3">TPC Lab Test</th>
                        <th class="py-3.5 px-3">NEFT Payout</th>
                        <th class="py-3.5 px-3 text-right">Audit Receipt</th>
                      </tr>
                    </thead>
                    <tbody id="sellerLedgerBody" class="divide-y divide-white/[0.06] text-sm"></tbody>
                  </table>
                </div>
              </div>

              <div class="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-gray-400">
                <span>All weights logged via Bluetooth digital load-cell scale</span>
                <span class="text-[#22C55E]">100% Statutory Compliance</span>
              </div>
            </div>

          </div>

          <div class="lg:col-span-4 flex flex-col justify-between gap-6">
            
            <div class="console-metric-box rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between">
                  <span class="font-mono text-[11px] font-semibold text-[#22C55E] uppercase tracking-[0.18em]">SITE QR IDENTITY</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/35 text-[#22C55E] font-mono text-[10px] font-semibold">ACTIVE PASS</span>
                </div>
                <p class="text-xs text-gray-400 mt-2 leading-relaxed">
                  Mounted at kitchen dispatch bay. Field agent scans to auto-log drum weight and issue instant FSSAI receipt.
                </p>

                <div class="my-5 mx-auto w-40 h-40 rounded-2xl bg-white p-3.5 shadow-xl relative overflow-hidden flex items-center justify-center">
                  <svg viewBox="0 0 100 100" class="w-full h-full text-surface-950" fill="currentColor">
                    <path d="M5,5 h28 v28 h-28 z M10,10 v18 h18 v-18 z M14,14 h10 v10 h-10 z"/>
                    <path d="M67,5 h28 v28 h-28 z M72,10 v18 h18 v-18 z M76,14 h10 v10 h-10 z"/>
                    <path d="M5,67 h28 v28 h-28 z M10,72 v18 h18 v-18 z M14,76 h10 v10 h-10 z"/>
                    <rect x="38" y="8" width="8" height="8"/>
                    <rect x="52" y="8" width="8" height="8"/>
                    <rect x="8" y="38" width="8" height="8"/>
                    <rect x="22" y="38" width="8" height="8"/>
                    <rect x="38" y="38" width="24" height="24"/>
                    <rect x="42" y="42" width="16" height="16" fill="#22C55E"/>
                    <rect x="68" y="38" width="8" height="8"/>
                    <rect x="82" y="38" width="8" height="8"/>
                    <rect x="38" y="68" width="8" height="8"/>
                    <rect x="52" y="68" width="8" height="8"/>
                    <rect x="68" y="68" width="8" height="8"/>
                    <rect x="82" y="82" width="10" height="10"/>
                  </svg>
                </div>

                <div class="p-3 rounded-xl bg-surface-950 border border-white/10 flex items-center justify-between font-mono text-xs">
                  <span class="text-gray-400">Assigned Pass ID</span>
                  <span id="sellerQrIdDisplay" class="text-[#22C55E] font-bold">#GF-0421</span>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-white/[0.06] space-y-2 text-center">
                <button id="simulateQrScanBayBtn" type="button" class="touch-reactive w-full py-2.5 px-4 rounded-xl bg-[#22C55E]/15 hover:bg-[#22C55E]/25 border border-[#22C55E]/40 text-[#22C55E] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
                  </svg>
                  <span>Simulate QR Bay Scan</span>
                </button>
                <div class="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Tamper-Proof Static Kitchen NFC &bull; Bluetooth Load-Cell Synced</div>
              </div>
            </div>

            <div class="console-metric-box rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-[11px] font-semibold text-[#A3E635] uppercase tracking-[0.18em]">SCHEDULE FLEET PICKUP</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-[#A3E635]/15 border border-[#A3E635]/35 text-[#A3E635] font-mono text-[10px] font-semibold">SAME DAY</span>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                  Request specialized drum evacuation when your barrels reach 80% capacity.
                </p>

                <form id="sellerScheduleForm" class="space-y-3.5" onsubmit="return false;">
                  <!-- Quick Preset Tap Buttons -->
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <label class="font-sans text-xs font-medium text-gray-300">Drum Quantity (Avg Rate ₹40/L)</label>
                      <span id="sellerSchedulePayoutBadge" class="font-sans text-xs font-bold text-[#22C55E]">
                        Payout: &#8377;4,000 NEFT
                      </span>
                    </div>

                    <div class="grid grid-cols-4 gap-1.5 mb-2">
                      <button type="button" data-drum-preset="1" class="seller-drum-btn touch-reactive py-1.5 px-2 rounded-lg bg-surface-950 border border-white/10 text-gray-300 font-sans text-xs hover:border-[#22C55E] transition">
                        1 Drum (50L)
                      </button>
                      <button type="button" data-drum-preset="2" class="seller-drum-btn active-drum-preset touch-reactive py-1.5 px-2 rounded-lg bg-[#22C55E]/20 border border-[#22C55E]/60 text-[#22C55E] font-sans text-xs font-semibold transition">
                        2 Drums (100L)
                      </button>
                      <button type="button" data-drum-preset="4" class="seller-drum-btn touch-reactive py-1.5 px-2 rounded-lg bg-surface-950 border border-white/10 text-gray-300 font-sans text-xs hover:border-[#22C55E] transition">
                        4 Drums (200L)
                      </button>
                      <button type="button" data-drum-preset="8" class="seller-drum-btn touch-reactive py-1.5 px-2 rounded-lg bg-surface-950 border border-white/10 text-gray-300 font-sans text-xs hover:border-[#22C55E] transition">
                        8 Drums (400L)
                      </button>
                    </div>

                    <select id="scheduleDrumQty" class="w-full px-3.5 py-2.5 rounded-xl bg-surface-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#22C55E]">
                      <option value="1">1 Standard Drum (50 Liters &bull; &#8377;2,000)</option>
                      <option value="2" selected>2 Standard Drums (100 Liters &bull; &#8377;4,000)</option>
                      <option value="4">4 Standard Drums (200 Liters &bull; &#8377;8,000)</option>
                      <option value="8">8 Commercial Drums (400 Liters &bull; &#8377;16,000)</option>
                    </select>
                  </div>

                  <div>
                    <label class="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1">Fleet Dispatch Window</label>
                    <select id="schedulePickupSlot" class="w-full px-3.5 py-2.5 rounded-xl bg-surface-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#22C55E]">
                      <option value="Tomorrow Morning (10:30 AM Cluster Fleet)" selected>Tomorrow Morning &bull; 10:30 AM (Cluster Fleet)</option>
                      <option value="Tomorrow Evening (4:30 PM Route)">Tomorrow Evening &bull; 4:30 PM Route</option>
                      <option value="This Friday (11:00 AM Routine)">This Friday &bull; 11:00 AM Routine</option>
                      <option value="Immediate Express Pickup (<3 Hours)">Immediate Express Pickup (&lt;3 Hours)</option>
                    </select>
                  </div>

                  <div>
                    <label class="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1">Pickup Date</label>
                    <input id="schedulePickupDate" type="date" value="2026-10-24" class="w-full px-3.5 py-2.5 rounded-xl bg-surface-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#22C55E]" />
                  </div>

                  <div>
                    <label class="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1">Kitchen Dispatch Instructions</label>
                    <input id="scheduleNotes" type="text" placeholder="Kitchen back entrance bay 3 — barrel labeled GF" class="w-full px-3.5 py-2.5 rounded-xl bg-surface-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#22C55E]" />
                  </div>

                  <button id="submitScheduleBtn" type="button" class="btn-green-pill touch-reactive w-full py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider mt-2 flex items-center justify-center gap-2 shadow-lg">
                    <span>Confirm Fleet Dispatch</span>
                    <span>&rarr;</span>
                  </button>
                </form>
              </div>

              <div class="pt-4 mt-4 border-t border-white/[0.07] flex items-center justify-between">
                <div>
                  <div class="font-mono text-[10px] uppercase tracking-wider text-gray-400">AUDIT INSPECTOR PACK</div>
                  <div class="text-xs text-white font-medium mt-0.5">Form-IV Digital Logbook</div>
                </div>
                <button type="button" id="portalDownloadLatestCertBtn" class="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-[#22C55E] hover:text-black font-mono text-[10px] font-semibold text-[#22C55E] uppercase tracking-wider transition">
                  View PDF
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      <!-- =================================================================== -->
      <!-- PANEL B: CUSTOMER (BIOFUEL REFINERY / BUYER) DASHBOARD               -->
      <!-- =================================================================== -->
      <div id="customerPortalPanel" class="space-y-7 hidden">
        
        <!-- 4 Symmetrical, Equally-Balanced Customer Metric Cards (2x2 on Mobile so Analytics Graph is immediately accessible) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-stretch">
          
          <div class="console-metric-box touch-reactive rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="font-mono text-[10px] tracking-[0.18em] uppercase text-gray-400">FEEDSTOCK DELIVERED</span>
                <span class="w-8 h-8 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
                  </svg>
                </span>
              </div>
              <div id="customerTotalVol" class="tabular-nums font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                184.5 MT
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px]">
              <span class="text-gray-400">12 BULK TANKERS</span>
              <span class="text-[#38BDF8] font-semibold">+24.6% MoM</span>
            </div>
          </div>

          <div class="console-metric-box touch-reactive rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="font-mono text-[10px] tracking-[0.18em] uppercase text-gray-400">AVERAGE PURITY GRADE</span>
                <span class="w-8 h-8 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
              </div>
              <div id="customerQualitySpec" class="tabular-nums font-display text-3xl sm:text-4xl font-extrabold text-[#22C55E] tracking-tight">
                FFA 2.6%
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px]">
              <span class="text-gray-400">HVO &amp; SAF COMPLIANT</span>
              <span class="text-[#A3E635] font-semibold">MOISTURE &lt; 0.4%</span>
            </div>
          </div>

          <div class="console-metric-box touch-reactive rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="font-mono text-[10px] tracking-[0.18em] uppercase text-gray-400">AVOIDED GHG EMISSIONS</span>
                <span class="w-8 h-8 rounded-xl bg-[#A3E635]/15 border border-[#A3E635]/30 text-[#A3E635] flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
              </div>
              <div id="customerTotalGhg" class="tabular-nums font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                562.7 MT
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px]">
              <span class="text-gray-400">88.5% GHG REDUCTION</span>
              <span class="text-[#A3E635] font-semibold">RED II POS</span>
            </div>
          </div>

          <div class="console-metric-box touch-reactive rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="font-mono text-[10px] tracking-[0.18em] uppercase text-gray-400">TOTAL OFFTAKE PROCUREMENT</span>
                <span class="w-8 h-8 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] font-mono font-bold text-xs flex items-center justify-center">
                  &#8377;
                </span>
              </div>
              <div id="customerTotalProcure" class="tabular-nums font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                &#8377;1.18 Cr
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px]">
              <span class="text-gray-400">ESCROW SETTLED</span>
              <span class="text-[#F59E0B] font-semibold">CONTRACT ACTIVE</span>
            </div>
          </div>

        </div>

        <!-- 12-Column Refinery Customer Workspace -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <!-- Left 8 Columns: Supply Trend Chart + Certified Feedstock Batch Manifest -->
          <div class="lg:col-span-8 flex flex-col justify-between gap-6">
            
            <div class="telemetry-chart-shell-buyer rounded-3xl p-6 sm:p-7 relative overflow-hidden">
              <!-- Top Header Row with Dual Legend & Timeframe Selector -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.07]">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
                    <span data-i18n="buy_chart_eyebrow" class="font-mono text-[10px] tracking-[0.2em] uppercase text-[#38BDF8] font-semibold">REFINERY INFLOW TELEMETRY</span>
                  </div>
                  <h2 data-i18n="buy_chart_title" class="font-display text-lg sm:text-xl font-bold text-white mt-1">Certified UCO Feedstock Delivery (MT) &amp; GHG Abatement</h2>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                  <div class="flex items-center gap-3.5 font-sans text-xs bg-white/[0.03] border border-white/[0.07] px-3 py-1.5 rounded-xl">
                    <span class="flex items-center gap-1.5 text-gray-200 font-medium">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]"></span>
                      <span>Feedstock (MT)</span>
                    </span>
                    <span class="flex items-center gap-1.5 text-gray-200 font-medium">
                      <span class="w-2.5 h-0.5 bg-[#22C55E]"></span>
                      <span>GHG Saved (MT CO₂e)</span>
                    </span>
                  </div>

                  <div class="inline-flex p-1 rounded-xl bg-surface-950 border border-white/10 font-mono text-[10px]">
                    <button type="button" data-buyer-range="6M" class="buyer-range-btn px-2.5 py-1 rounded-lg bg-[#38BDF8]/20 text-[#38BDF8] font-bold transition">6M</button>
                    <button type="button" data-buyer-range="1Y" class="buyer-range-btn px-2.5 py-1 rounded-lg text-gray-400 hover:text-white transition">1Y</button>
                    <button type="button" data-buyer-range="ALL" class="buyer-range-btn px-2.5 py-1 rounded-lg text-gray-400 hover:text-white transition">ALL</button>
                  </div>
                </div>
              </div>

              <!-- Live Telemetry Readout Strip (Mobile-Friendly Stack & Desktop 3-Column) -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 my-4 p-3.5 rounded-2xl bg-surface-950/90 border border-white/[0.08]">
                <div class="flex sm:block items-center justify-between">
                  <div class="font-mono text-[10px] uppercase tracking-wider text-gray-400">Active Period</div>
                  <div id="buyerChartPeriodLabel" class="font-display font-bold text-sm sm:text-base text-white sm:mt-0.5">Oct 2026 (Dahej SEZ)</div>
                </div>
                <div class="flex sm:block items-center justify-between border-t sm:border-t-0 border-white/[0.05] pt-1.5 sm:pt-0">
                  <div class="font-mono text-[10px] uppercase tracking-wider text-gray-400">Certified Delivery</div>
                  <div id="buyerChartMtReadout" class="tabular-nums font-display font-bold text-sm sm:text-base text-[#38BDF8] sm:mt-0.5">52.0 MT (FFA 2.4%)</div>
                </div>
                <div class="flex sm:block items-center justify-between border-t sm:border-t-0 border-white/[0.05] pt-1.5 sm:pt-0">
                  <div class="font-mono text-[10px] uppercase tracking-wider text-gray-400">Verified GHG Abated</div>
                  <div id="buyerChartGhgReadout" class="tabular-nums font-display font-bold text-sm sm:text-base text-[#4ADE80] sm:mt-0.5">158.6 MT CO₂e</div>
                </div>
              </div>

              <!-- Executive Dual-Curve SVG Spline Telemetry Chart (Touch-Scrubbable & High Mobile Legibility) -->
              <div class="relative h-56 sm:h-60 w-full pt-2 select-none">
                <svg id="customerAnalyticsSvg" viewBox="0 0 640 190" class="chart-touch-svg w-full h-full overflow-visible cursor-crosshair">
                  <defs>
                    <linearGradient id="buyerAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.38" />
                      <stop offset="70%" stop-color="#38BDF8" stop-opacity="0.08" />
                      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.0" />
                    </linearGradient>
                    <linearGradient id="buyerLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="#0284C7" />
                      <stop offset="60%" stop-color="#38BDF8" />
                      <stop offset="100%" stop-color="#22C55E" />
                    </linearGradient>
                  </defs>

                  <!-- Subtle Horizontal Reference Grid & Y-Axis Scale -->
                  <g stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4 4">
                    <line x1="46" y1="26" x2="616" y2="26" />
                    <line x1="46" y1="68" x2="616" y2="68" />
                    <line x1="46" y1="110" x2="616" y2="110" />
                    <line x1="46" y1="152" x2="616" y2="152" />
                  </g>
                  <g fill="rgba(209,213,219,0.75)" font-family="JetBrains Mono, monospace" font-size="11" text-anchor="end">
                    <text x="40" y="30">60MT</text>
                    <text x="40" y="72">45MT</text>
                    <text x="40" y="114">30MT</text>
                    <text x="40" y="156">15MT</text>
                  </g>

                  <!-- Area Fill & Secondary Emerald GHG Curve + Primary Cyan Feedstock Spline -->
                  <path id="buyerAreaPath" d="" fill="url(#buyerAreaGrad)" />
                  <path id="buyerGhgLinePath" d="" fill="none" stroke="#22C55E" stroke-width="2.2" stroke-dasharray="5 4" stroke-linecap="round" opacity="0.88" />
                  <path id="buyerFeedstockGlowPath" d="" fill="none" stroke="#38BDF8" stroke-opacity="0.22" stroke-width="8" stroke-linecap="round" />
                  <path id="buyerFeedstockLinePath" d="" fill="none" stroke="url(#buyerLineGrad)" stroke-width="3.5" stroke-linecap="round" />

                  <!-- Interactive Vertical Crosshair Scrub Line -->
                  <line id="buyerChartScrubLine" x1="600" y1="18" x2="600" y2="154" stroke="rgba(56,189,248,0.5)" stroke-width="1.4" stroke-dasharray="3 3" />

                  <!-- Data Point Nodes Group (With 24px Touch Targets) -->
                  <g id="buyerChartNodesGroup"></g>

                  <!-- Active Highlight Ring -->
                  <circle id="buyerChartActiveHalo" cx="600" cy="36" r="12" fill="rgba(56,189,248,0.25)" pointer-events="none" />
                  <circle id="buyerChartActiveDot" cx="600" cy="36" r="6" fill="#38BDF8" stroke="#060A08" stroke-width="2.4" pointer-events="none" />

                  <!-- X-Axis Month Labels -->
                  <g id="buyerChartXAxisGroup" fill="rgba(209,213,219,0.85)" font-family="JetBrains Mono, monospace" font-size="11" text-anchor="middle"></g>
                </svg>
              </div>

              <!-- Mobile-Friendly Quick-Tap Month Pill Bar for Instant One-Thumb Inspection -->
              <div class="mt-3 pt-3 border-t border-white/[0.07] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
                <span class="font-mono text-[10px] uppercase tracking-wider text-gray-400 shrink-0">Tap Period:</span>
                <div id="buyerMobileNodePills" class="flex items-center gap-1.5"></div>
              </div>
            </div>

            <div class="console-metric-box rounded-3xl p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <h2 class="font-display text-lg sm:text-xl font-bold text-white">Certified Feedstock Batch Manifest &amp; ISCC PoS</h2>
                    <p class="text-xs text-gray-400 mt-0.5">Auditable chain-of-custody traceable to FBO kitchens with zero-leakage guarantee</p>
                  </div>
                  <span class="px-3 py-1 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30 font-mono text-[10px] uppercase tracking-wider text-[#38BDF8] self-start sm:self-auto">
                    ISCC EU AUDITED
                  </span>
                </div>

                <div class="overflow-x-auto no-scrollbar">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
                        <th class="py-3.5 px-3">Batch ID</th>
                        <th class="py-3.5 px-3">Origin Aggregate Hub</th>
                        <th class="py-3.5 px-3">Volume (MT)</th>
                        <th class="py-3.5 px-3">FFA / Moisture</th>
                        <th class="py-3.5 px-3">Delivery Status</th>
                        <th class="py-3.5 px-3 text-right">ISCC Certificate</th>
                      </tr>
                    </thead>
                    <tbody id="customerBatchLedgerBody" class="divide-y divide-white/[0.06] text-sm"></tbody>
                  </table>
                </div>
              </div>

              <div class="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-gray-400">
                <span>All deliveries verified by independent third-party inspection (SGS / Bureau Veritas)</span>
                <span class="text-[#38BDF8]">RED II Article 29 Compliant</span>
              </div>
            </div>

          </div>

          <!-- Right 4 Columns: Fleet Tanker Logistics + Request Allocation Simulator -->
          <div class="lg:col-span-4 flex flex-col justify-between gap-6">
            
            <div class="console-metric-box rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between">
                  <span class="font-mono text-[11px] font-semibold text-[#38BDF8] uppercase tracking-[0.18em]">TANKER LOGISTICS</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/35 text-[#38BDF8] font-mono text-[10px] font-semibold">GPS ACTIVE</span>
                </div>
                <p class="text-xs text-gray-400 mt-2 leading-relaxed">
                  Real-time GPS telemetry of bulk stainless steel tanker in transit to Dahej SEZ.
                </p>

                <!-- Live Corridor Telemetry SVG Vector Map -->
                <div class="mt-4 p-3.5 rounded-2xl bg-surface-950/90 border border-[#38BDF8]/20">
                  <div class="flex items-center justify-between font-mono text-[10px] text-gray-400 mb-2">
                    <span>CORRIDOR: NH-48 EXPRESSWAY</span>
                    <span class="text-[#38BDF8] font-semibold">74% TRANSIT COMPLETE</span>
                  </div>
                  <svg viewBox="0 0 320 46" class="w-full h-11 overflow-visible">
                    <line x1="24" y1="20" x2="296" y2="20" stroke="rgba(255,255,255,0.1)" stroke-width="2.5" stroke-linecap="round" />
                    <line x1="24" y1="20" x2="224" y2="20" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" />
                    <circle cx="24" cy="20" r="4.5" fill="#22C55E" />
                    <circle cx="135" cy="20" r="3.5" fill="#38BDF8" />
                    <circle cx="224" cy="20" r="7" fill="rgba(56,189,248,0.25)" />
                    <circle cx="224" cy="20" r="4.5" fill="#38BDF8" stroke="#060A08" stroke-width="1.5" />
                    <circle cx="296" cy="20" r="4.5" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5" />
                    <g font-family="JetBrains Mono, monospace" font-size="8.5" fill="rgba(156,163,175,0.8)">
                      <text x="24" y="39" text-anchor="middle">MUMBAI HUB</text>
                      <text x="135" y="39" text-anchor="middle">VAPI CHECK</text>
                      <text x="224" y="8" text-anchor="middle" fill="#38BDF8" font-weight="700">MH-04-GP-8912</text>
                      <text x="296" y="39" text-anchor="middle" fill="#F59E0B">DAHEJ SEZ</text>
                    </g>
                  </svg>
                </div>

                <div class="my-4 p-4 rounded-2xl bg-surface-950 border border-white/10 space-y-2.5 font-mono text-xs">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Vehicle #</span>
                    <span class="text-white font-bold">MH-04-GP-8912</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Route</span>
                    <span class="text-gray-300">Mumbai &rarr; Dahej SEZ</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Gross / Tare / Net</span>
                    <span class="text-[#38BDF8]">38.2T / 13.7T / 24.5T</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Digital NFC Seal</span>
                    <span class="text-[#22C55E]">#ISCC-99412 (Locked)</span>
                  </div>
                  <div class="pt-2 border-t border-white/[0.08] flex justify-between items-center">
                    <span class="text-gray-400">Refinery Gate ETA</span>
                    <span class="text-[#F59E0B] font-bold">Today, 2h 45m</span>
                  </div>
                </div>

                <div class="flex items-center gap-2 font-mono text-[10px] text-gray-400">
                  <span class="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
                  <span>Temperature: 32.4&deg;C &bull; Moisture: 0.32%</span>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-white/[0.06] text-center">
                <span class="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Digital Weighbridge Integration</span>
              </div>
            </div>

            <div class="console-metric-box rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-[11px] font-semibold text-[#22C55E] uppercase tracking-[0.18em]">REQUEST FEEDSTOCK BATCH</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/35 text-[#22C55E] font-mono text-[10px] font-semibold">DIRECT OFFTAKE</span>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">
                  Allocate standardized ISCC-certified UCO batches directly into your refinery schedule.
                </p>

                <form id="customerAllocationForm" class="space-y-3.5" onsubmit="return false;">
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <label class="font-mono text-[10px] uppercase tracking-wider text-gray-400">Batch Allocation Volume</label>
                      <span id="custAllocationGhgBadge" class="font-mono text-[10px] font-bold text-[#38BDF8]">
                        76.3 MT CO&#8322;e Abated
                      </span>
                    </div>

                    <div class="grid grid-cols-4 gap-1.5 mb-2">
                      <button type="button" data-alloc-preset="15" class="cust-alloc-btn touch-reactive py-1.5 px-2 rounded-lg bg-surface-950 border border-white/10 text-gray-300 font-mono text-[10px] hover:border-[#38BDF8] transition">
                        15 MT
                      </button>
                      <button type="button" data-alloc-preset="25" class="cust-alloc-btn active-alloc-preset touch-reactive py-1.5 px-2 rounded-lg bg-[#38BDF8]/20 border border-[#38BDF8]/60 text-[#38BDF8] font-mono text-[10px] font-semibold transition">
                        25 MT
                      </button>
                      <button type="button" data-alloc-preset="50" class="cust-alloc-btn touch-reactive py-1.5 px-2 rounded-lg bg-surface-950 border border-white/10 text-gray-300 font-mono text-[10px] hover:border-[#38BDF8] transition">
                        50 MT
                      </button>
                      <button type="button" data-alloc-preset="100" class="cust-alloc-btn touch-reactive py-1.5 px-2 rounded-lg bg-surface-950 border border-white/10 text-gray-300 font-mono text-[10px] hover:border-[#38BDF8] transition">
                        100 MT
                      </button>
                    </div>

                    <select id="allocationVolume" class="w-full px-3.5 py-2.5 rounded-xl bg-surface-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#38BDF8]">
                      <option value="15">15.0 Metric Tons (~16,500 L &bull; 1 Tanker)</option>
                      <option value="25" selected>25.0 Metric Tons (~27,500 L &bull; 1 Heavy Tanker)</option>
                      <option value="50">50.0 Metric Tons (~55,000 L &bull; 2 Heavy Tankers)</option>
                      <option value="100">100.0 Metric Tons (~110,000 L &bull; 4 Tankers Train)</option>
                    </select>
                  </div>

                  <div>
                    <label class="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1">Feedstock Grade Spec</label>
                    <select id="allocationGrade" class="w-full px-3.5 py-2.5 rounded-xl bg-surface-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#38BDF8]">
                      <option value="HVO" selected>Tier-1 HVO Grade (FFA &lt; 3.0%, TPC &lt; 24%)</option>
                      <option value="SAF">SAF Precursor Grade (FFA &lt; 2.2%, Moisture &lt; 0.28%)</option>
                      <option value="FAME">Standard Bio-Diesel EN 14214 Grade</option>
                    </select>
                  </div>

                  <div>
                    <label class="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1">Refinery Inbound Delivery Terminal</label>
                    <select id="allocationTerminal" class="w-full px-3.5 py-2.5 rounded-xl bg-surface-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#38BDF8]">
                      <option value="Dahej" selected>Dahej Petrochem SEZ (Terminal Bay 02)</option>
                      <option value="Hazira">Hazira Coastal Refining Terminal</option>
                      <option value="Mangalore">Mangalore Port Export Terminal</option>
                    </select>
                  </div>

                  <div class="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between font-mono text-[11px]">
                    <span class="text-gray-400">Escrow Value:</span>
                    <span id="custEscrowValue" class="text-[#38BDF8] font-bold">&#8377;16.50 Lakhs</span>
                  </div>

                  <button id="submitAllocationBtn" type="button" class="btn-green-pill touch-reactive w-full py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider mt-2 flex items-center justify-center gap-2 shadow-lg">
                    <span>Submit Allocation Order</span>
                    <span>&rarr;</span>
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>

  <!-- ===================================================================== -->
  <!-- FOOTER (CONTACT & NAVIGATE COLUMNS)                                   -->
  <!-- ===================================================================== -->
  <footer id="contactSection" class="scroll-mt-20 relative z-10 bg-[#050806] border-t border-white/[0.07] pt-16 pb-12 text-sm text-gray-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/[0.07]">
        
        <div class="md:col-span-5 space-y-4">
          <a href="#heroSection" id="footerBrandLogoLink" title="Reload GeoField Corp Platform" class="inline-block focus:outline-none cursor-pointer">
            <img src="/brand/geofield-full-logo.png" alt="GeoField Corp" class="brand-logo-crisp h-11 w-auto object-contain" />
          </a>
          <p data-i18n="footer_tagline" class="text-gray-400 text-sm leading-relaxed max-w-xs pt-1">
            Powering the clean-energy transition through traceable, compliant supply chains.
          </p>
        </div>

        <div class="md:col-span-4 space-y-3.5">
          <div data-i18n="footer_contact_hdr" class="font-mono text-[10px] tracking-[0.22em] uppercase text-gray-500 mb-4">
            CONTACT
          </div>

          <a href="tel:+917972737595" class="flex items-center gap-3 text-gray-300 hover:text-[#22C55E] transition text-sm">
            <svg class="w-4 h-4 text-[#22C55E] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>+91 79727 37595</span>
          </a>

          <a href="mailto:support@geofieldcorp.com" class="flex items-center gap-3 text-gray-300 hover:text-[#22C55E] transition text-sm">
            <svg class="w-4 h-4 text-[#22C55E] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>support@geofieldcorp.com</span>
            <span data-i18n="footer_support" class="font-mono text-[9px] tracking-[0.16em] uppercase text-gray-500">SUPPORT</span>
          </a>

          <a href="mailto:office@geofieldcorp.com" class="flex items-center gap-3 text-gray-300 hover:text-[#22C55E] transition text-sm">
            <svg class="w-4 h-4 text-[#22C55E] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>office@geofieldcorp.com</span>
            <span data-i18n="footer_office" class="font-mono text-[9px] tracking-[0.16em] uppercase text-gray-500">OFFICE</span>
          </a>

          <div class="flex items-center gap-3 text-gray-300 text-sm pt-0.5">
            <svg class="w-4 h-4 text-[#22C55E] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span data-i18n="footer_city">Mumbai, Maharashtra, India</span>
          </div>
        </div>

        <div class="md:col-span-3 space-y-3">
          <div data-i18n="footer_nav_hdr" class="font-mono text-[10px] tracking-[0.22em] uppercase text-gray-500 mb-4">
            NAVIGATE
          </div>
          <div><a href="#threatSection" data-i18n="footer_nav_1" class="nav-scroll-link text-gray-300 hover:text-[#22C55E] transition">The Crisis</a></div>
          <div><a href="#solutionSection" data-i18n="footer_nav_2" class="nav-scroll-link text-gray-300 hover:text-[#22C55E] transition">The Process</a></div>
          <div><a href="#impactSection" data-i18n="footer_nav_3" class="nav-scroll-link text-gray-300 hover:text-[#22C55E] transition">Impact</a></div>
          <div><button type="button" id="footerNavRegisterLink" data-i18n="footer_nav_4" class="text-gray-300 hover:text-[#22C55E] transition">Register</button></div>
        </div>

      </div>

      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-gray-500">
        <div>&copy; 2026 GEOFIELD CORP</div>
        <div data-i18n="footer_bottom_right">WASTE &rarr; ENERGY &nbsp;&middot;&nbsp; TRACEABLE &nbsp;&middot;&nbsp; COMPLIANT</div>
      </div>

    </div>
  </footer>

  <!-- ===================================================================== -->
  <!-- MODAL 1: 60-SECOND REGISTRATION GATEWAY                               -->
  <!-- ===================================================================== -->
  <div id="registrationModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-md p-4">
    <div class="impact-console-shell rounded-3xl max-w-md w-full p-7 sm:p-8 border border-[#22C55E]/30 shadow-2xl relative">
      <button id="closeRegModalBtn" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center">
        &times;
      </button>

      <div class="mb-6">
        <div class="flex items-center justify-between font-mono text-[11px] text-gray-400 mb-2">
          <span id="regStepIndicator">STEP 1 OF 3</span>
          <span id="regProgressPct" class="text-[#22C55E]">33%</span>
        </div>
        <div class="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div id="regProgressBar" class="h-full bg-[#22C55E] transition-all duration-300" style="width: 33%;"></div>
        </div>
      </div>

      <!-- Step 1 -->
      <div id="regStep1" class="space-y-4">
        <h3 data-i18n="reg_s1_title" class="font-display text-2xl font-bold text-white">Join the Clean Network</h3>
        <p data-i18n="reg_s1_desc" class="text-xs text-gray-400">Get your restaurant’s static QR code in 60 seconds.</p>
        <div>
          <label data-i18n="reg_s1_name" class="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1.5">Your Name</label>
          <input id="regOwnerName" type="text" value="Vikram Kulkarni" class="w-full px-4 py-3 rounded-xl bg-surface-950 border border-white/10 text-white text-sm focus:border-[#22C55E] focus:outline-none" />
        </div>
        <div>
          <label data-i18n="reg_s1_phone" class="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1.5">Mobile / WhatsApp Number</label>
          <input id="regPhone" type="tel" value="+91 98230 45120" class="w-full px-4 py-3 rounded-xl bg-surface-950 border border-white/10 text-white text-sm focus:border-[#22C55E] focus:outline-none" />
        </div>
        <div class="pt-2">
          <button id="regNextStep1Btn" data-i18n="reg_continue" class="btn-green-pill w-full py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
            Continue &rarr;
          </button>
        </div>
      </div>

      <!-- Step 2 -->
      <div id="regStep2" class="hidden space-y-4">
        <h3 data-i18n="reg_s2_title" class="font-display text-2xl font-bold text-white">Kitchen Details</h3>
        <p data-i18n="reg_s2_desc" class="text-xs text-gray-400">Assign your establishment to a local collection cluster.</p>
        <div>
          <label data-i18n="reg_s2_rest" class="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1.5">Restaurant / Kitchen Name</label>
          <input id="regRestaurantName" type="text" value="Cluster 04 — Spice Route Kitchen" class="w-full px-4 py-3 rounded-xl bg-surface-950 border border-white/10 text-white text-sm focus:border-[#22C55E] focus:outline-none" />
        </div>
        <div>
          <label data-i18n="reg_s2_vol" class="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1.5">Weekly Used Oil Volume</label>
          <select id="regTrackSelect" class="w-full px-4 py-3 rounded-xl bg-surface-950 border border-white/10 text-white text-sm focus:border-[#22C55E] focus:outline-none">
            <option value="Commercial Kitchen" data-i18n="reg_opt_1">50 – 250 Liters / week</option>
            <option value="Independent Eatery" data-i18n="reg_opt_2">Under 50 Liters / week</option>
            <option value="High-Volume Kitchen" data-i18n="reg_opt_3">250+ Liters / week</option>
          </select>
        </div>
        <div class="pt-2 flex gap-3">
          <button id="regBackStep2Btn" data-i18n="reg_back" class="px-5 py-3.5 rounded-full bg-white/5 text-gray-300 font-mono text-xs">
            Back
          </button>
          <button id="regNextStep2Btn" data-i18n="reg_continue" class="btn-green-pill flex-1 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
            Continue &rarr;
          </button>
        </div>
      </div>

      <!-- Step 3 -->
      <div id="regStep3" class="hidden space-y-4">
        <h3 data-i18n="reg_s3_title" class="font-display text-2xl font-bold text-white">Pickup Cluster</h3>
        <p data-i18n="reg_s3_desc" class="text-xs text-gray-400">Your waterproof QR kit ships within 48 hours.</p>
        <div>
          <label data-i18n="reg_s3_area" class="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1.5">Area / City</label>
          <input id="regLocation" type="text" value="Andheri West, Mumbai" class="w-full px-4 py-3 rounded-xl bg-surface-950 border border-white/10 text-white text-sm focus:border-[#22C55E] focus:outline-none" />
        </div>
        <div class="pt-2 flex gap-3">
          <button id="regBackStep3Btn" data-i18n="reg_back" class="px-5 py-3.5 rounded-full bg-white/5 text-gray-300 font-mono text-xs">
            Back
          </button>
          <button id="regCompleteBtn" data-i18n="reg_mint_qr" class="btn-green-pill flex-1 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
            Mint QR &amp; Complete &#8599;
          </button>
        </div>
      </div>

      <!-- Step 4 -->
      <div id="regStep4" class="hidden text-center space-y-4">
        <div class="w-12 h-12 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center mx-auto text-xl font-bold">
          &check;
        </div>
        <h3 id="regDoneTitle" data-i18n="reg_done_title" class="font-display text-2xl font-bold text-white">You’re In!</h3>
        <p class="text-xs text-gray-400"><span data-i18n="reg_done_prefix">Your location-specific QR receipt ID</span> <strong id="regGeneratedQrId" class="text-[#22C55E] font-mono">#GF-0421</strong> <span data-i18n="reg_done_suffix">is active.</span></p>
        <button id="regGoToDashboardBtn" data-i18n="reg_open_console" class="btn-green-pill w-full py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          Open Seller Console &rarr;
        </button>
      </div>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- MODAL 2: FSSAI RUCO COMPLIANCE RECEIPT                                -->
  <!-- ===================================================================== -->
  <div id="certificateModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-md p-4">
    <div class="impact-console-shell rounded-3xl max-w-lg w-full p-7 sm:p-8 border border-[#22C55E]/30 shadow-2xl relative">
      <button id="closeCertModalBtn" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center">
        &times;
      </button>

      <div class="flex items-center gap-3 pb-4 border-b border-white/10">
        <img src="/brand/geofield-full-logo.png" alt="GeoField Corp" class="h-8 w-auto object-contain" />
        <div>
          <div class="font-mono text-[10px] font-semibold text-[#22C55E] uppercase tracking-[0.18em]">ISCC &amp; FSSAI RUCO</div>
          <div data-i18n="cert_modal_title" class="font-display font-bold text-white text-base">Official Traceable Disposal Receipt</div>
        </div>
      </div>

      <div class="my-5 p-4 rounded-2xl bg-surface-950 border border-white/10 font-mono text-xs space-y-2.5">
        <div class="flex justify-between"><span data-i18n="cert_lbl_id" class="text-gray-400">RECEIPT ID</span><span id="certModalId" class="text-[#22C55E] font-semibold">#GF-0421</span></div>
        <div class="flex justify-between"><span data-i18n="cert_lbl_fbo" class="text-gray-400">SOURCE KITCHEN</span><span id="certModalFbo" class="text-white font-semibold">Cluster 04 — Andheri West</span></div>
        <div class="flex justify-between"><span data-i18n="cert_lbl_date" class="text-gray-400">COLLECTION DATE</span><span id="certModalDate" class="text-gray-300">18 Oct 2026</span></div>
        <div class="flex justify-between"><span data-i18n="cert_lbl_vol" class="text-gray-400">VERIFIED VOLUME</span><span id="certModalMetrics" class="text-[#22C55E] font-semibold">42.6 L logged (TPC 26.4%)</span></div>
        <div class="flex justify-between"><span data-i18n="cert_lbl_esg" class="text-gray-400">ESG OFFSET</span><span id="certModalEsg" class="text-[#A3E635] font-medium">+31.1 T CO₂ Network Pool</span></div>
      </div>

      <div class="flex justify-end">
        <button id="downloadCertActionBtn" data-i18n="cert_download_btn" class="btn-green-pill px-6 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          Download PDF Receipt
        </button>
      </div>
    </div>
  </div>

  <!-- SUBTLE POP-UP TOAST -->
  <div id="appToast" class="fixed bottom-6 right-6 z-50 hidden max-w-sm hero-floating-badge px-5 py-3.5 rounded-full text-xs text-white shadow-2xl flex items-center gap-2.5">
    <span class="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
    <span id="appToastText" class="font-mono text-[11px]">Action completed</span>
  </div>

  <!-- ===================================================================== -->
  <!-- MODAL: ISCC EU PROOF OF SUSTAINABILITY (CUSTOMER/BUYER VIEW)           -->
  <!-- ===================================================================== -->
    <!-- ===================================================================== -->
  <!-- MODAL: CLINICAL PATHOLOGY & BIO-ASSAY INSPECTOR                      -->
  <!-- ===================================================================== -->
  <div id="diseaseDetailModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/85 backdrop-blur-md p-4">
    <div class="impact-console-shell rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-red-500/40 shadow-2xl relative">
      <button id="closeDiseaseModalBtn" type="button" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition">
        &times;
      </button>

      <div class="flex items-center gap-3.5 pb-4 border-b border-white/10">
        <div id="modalDiseaseIconContainer" class="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span id="modalDiseaseCode" class="font-sans text-xs text-red-400 font-semibold">High Clinical Risk</span>
            <span class="w-1 h-1 rounded-full bg-red-400"></span>
            <span data-i18n="dis_modal_advisory" class="font-sans text-xs text-gray-400">FSSAI Food Safety Advisory</span>
          </div>
          <h2 id="modalDiseaseTitle" class="font-display text-2xl font-bold text-white mt-0.5">Hypertension</h2>
        </div>
      </div>

      <div class="py-5 space-y-4 text-xs sm:text-sm">
        <div class="p-4 rounded-xl bg-red-500/[0.08] border border-red-500/20">
          <div data-i18n="dis_modal_mech_lbl" class="font-mono text-[10px] uppercase tracking-wider text-red-400 font-bold mb-1">Physiological Attack Mechanism</div>
          <p id="modalDiseaseMechanism" class="text-gray-200 leading-relaxed"></p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="p-3.5 rounded-xl bg-surface-950 border border-white/10">
            <div data-i18n="dis_modal_bio_lbl" class="font-mono text-[9px] uppercase tracking-wider text-gray-400">Biomarker Impact</div>
            <div id="modalDiseaseBiomarker" class="font-mono text-xs font-bold text-red-400 mt-1"></div>
          </div>
          <div class="p-3.5 rounded-xl bg-surface-950 border border-white/10">
            <div data-i18n="dis_modal_tpc_lbl" class="font-mono text-[9px] uppercase tracking-wider text-gray-400">FSSAI TPC Limit Breached</div>
            <div id="modalDiseaseTpc" class="font-mono text-xs font-bold text-[#F59E0B] mt-1">> 25% Polar Compounds</div>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/25">
          <div data-i18n="dis_modal_prev_lbl" class="font-mono text-[10px] uppercase tracking-wider text-[#22C55E] font-bold mb-1">GeoField RUCO Interception Protocol</div>
          <p id="modalDiseasePrevention" class="text-gray-300 leading-relaxed"></p>
        </div>
      </div>

      <div class="pt-4 border-t border-white/10 flex items-center justify-between">
        <span data-i18n="dis_modal_act_lbl" class="font-mono text-[10px] text-gray-400">Section 2.1 Food Safety &amp; Standards Act</span>
        <button id="dismissDiseaseModalBtn" data-i18n="dis_modal_close_btn" type="button" class="btn-green-pill touch-reactive px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          Acknowledged &amp; Close &times;
        </button>
      </div>
    </div>
  </div>

  <div id="isccModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-md p-4">
    <div class="impact-console-shell rounded-3xl max-w-lg w-full p-7 sm:p-8 border border-[#38BDF8]/35 shadow-2xl relative">
      <button id="closeIsccModalBtn" type="button" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center">
        &times;
      </button>

      <div class="flex items-center gap-3 pb-4 border-b border-white/10">
        <img src="/brand/geofield-full-logo.png" alt="GeoField Corp" class="h-8 w-auto object-contain" />
        <div>
          <div class="font-mono text-[10px] font-semibold text-[#38BDF8] uppercase tracking-[0.18em]">ISCC EU &bull; RED II DIRECTIVE</div>
          <div class="font-display font-bold text-white text-base">Proof of Sustainability (PoS) Certificate</div>
        </div>
      </div>

      <div class="my-5 p-4 rounded-2xl bg-surface-950 border border-white/10 font-mono text-xs space-y-2.5">
        <div class="flex justify-between"><span class="text-gray-400">BATCH SERIAL</span><span id="isccModalBatchId" class="text-[#38BDF8] font-semibold">GF-ISCC-2024-091</span></div>
        <div class="flex justify-between"><span class="text-gray-400">BUYER OFFTAKER</span><span id="isccModalBuyer" class="text-white font-semibold">Bharat Renewable Fuels (Dahej SEZ)</span></div>
        <div class="flex justify-between"><span class="text-gray-400">ORIGIN HUB</span><span id="isccModalOrigin" class="text-gray-300">Mumbai Central Aggregation Hub</span></div>
        <div class="flex justify-between"><span class="text-gray-400">NET WEIGHT</span><span id="isccModalWeight" class="text-[#22C55E] font-semibold">28.5 Metric Tons</span></div>
        <div class="flex justify-between"><span class="text-gray-400">GHG ABATEMENT</span><span id="isccModalGhg" class="text-[#A3E635] font-semibold">88.5% Savings vs Fossil</span></div>
        <div class="flex justify-between"><span class="text-gray-400">LAB ANALYSIS</span><span id="isccModalLab" class="text-gray-300">FFA 2.4% &bull; Moisture 0.32% &bull; Sulfur &lt; 10ppm</span></div>
        <div class="flex justify-between"><span class="text-gray-400">CHAIN-OF-CUSTODY</span><span class="text-[#22C55E]">100% Traceable FSSAI Kitchens</span></div>
      </div>

      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center gap-2 font-mono text-[10px] text-gray-400">
          <span class="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
          <span>Cryptographically Sealed QR</span>
        </div>
        <button id="downloadIsccBtn" type="button" class="btn-green-pill px-5 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          Download PDF
        </button>
      </div>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- INTERACTIVE ANIMATION, SCROLL ENGINE & STATE CONTROLLER               -->
  <!-- ===================================================================== -->
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useI18n } from '../services/i18n';

const { t, currentLang, setLanguage } = useI18n();
const emit = defineEmits(['open-register', 'open-login']);

onMounted(() => {
const clusterImageBank = {
        kitchen: "/images/kitchen.jpeg",
        burner: "/images/burner.jpeg",
        drum: "/images/drum.jpeg",
        hub: "/images/hub.jpeg"
      };
      const clusterFallbackChains = {
        kitchen: [
          "https://commons.wikimedia.org/wiki/Special:FilePath/Restaurant_Kitchen.jpg?width=960",
          "https://upload.wikimedia.org/wikipedia/commons/6/6a/Restaurant_Kitchen.jpg",
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=960&q=80"
        ],
        burner: [
          "https://commons.wikimedia.org/wiki/Special:FilePath/Deep_Frying_Samosas.jpg?width=960",
          "https://upload.wikimedia.org/wikipedia/commons/d/df/Deep_Frying_Samosas.jpg",
          "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=960&q=80"
        ],
        drum: [
          "https://commons.wikimedia.org/wiki/Special:FilePath/Deep_fryer_and_chips_J1.jpg?width=960",
          "https://upload.wikimedia.org/wikipedia/commons/b/b4/Deep_fryer_and_chips_J1.jpg",
          "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=960&q=80"
        ],
        hub: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Waste_Restaurant_Cooking_Oil_Hookup_in_Hempsted_New_York.jpg/960px-Waste_Restaurant_Cooking_Oil_Hookup_in_Hempsted_New_York.jpg",
          "https://commons.wikimedia.org/wiki/Special:FilePath/Seattle_-_oil_collection_can_for_biodiesel.jpg?width=960",
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=960&q=80"
        ]
      };
      // Attach resilient online fallback handler to #heroMainKitchenImg
      const heroImgInit = document.getElementById("heroMainKitchenImg");
      if (heroImgInit) {
        heroImgInit.dataset.activeKey = "kitchen";
        heroImgInit.dataset.fallbackIdx = "0";
        heroImgInit.addEventListener("error", function() {
          const key = this.dataset.activeKey || "kitchen";
          const chain = clusterFallbackChains[key] || [];
          const idx = parseInt(this.dataset.fallbackIdx || "0", 10);
          if (idx < chain.length) {
            this.dataset.fallbackIdx = String(idx + 1);
            this.src = chain[idx];
          }
        });
      }
      // Preload all 4 real online kitchen cluster photographs so switching is smooth
      Object.values(clusterImageBank).forEach(src => {
        const pre = new Image();
        pre.referrerPolicy = "no-referrer";
        pre.decoding = "async";
        pre.src = src;
      });

      const state = {
        lang: 'en', // 'en' | 'hi'
        viewMode: 'landing',
        portalRole: 'seller', // 'seller' | 'customer'
        ratePerLiter: 40,
        consoleLiters: 12450,
        activeTpcTarget: 25,
        fboProfile: {
          name: 'Cluster 04 — Andheri West',
          qrId: '#GF-0421'
        },
        customerProfile: {
          name: 'Bharat Renewable Fuels & SAF Refinery — Dahej SEZ',
          contractId: '#BRF-2024-91',
          contactPerson: 'Dr. Rajiv Mehta (Feedstock Operations)'
        },
        customerBatches: [
          { id: 'GF-ISCC-2024-091', date: '21 Oct 2026', origin: 'Mumbai Central Aggregation Hub', volumeMt: 28.5, ffa: 2.4, moisture: 0.32, status: 'Verified & Delivered', ghgAvoided: 86.9, posId: 'ISCC-EU-POS-99412' },
          { id: 'GF-ISCC-2024-088', date: '16 Oct 2026', origin: 'Pune Industrial Aggregation SEZ', volumeMt: 34.0, ffa: 2.7, moisture: 0.38, status: 'Verified & Delivered', ghgAvoided: 103.7, posId: 'ISCC-EU-POS-99388' },
          { id: 'GF-ISCC-2024-084', date: '10 Oct 2026', origin: 'Nashik-Thane Bio-Transit Hub', volumeMt: 22.0, ffa: 2.9, moisture: 0.41, status: 'Verified & Delivered', ghgAvoided: 67.1, posId: 'ISCC-EU-POS-99351' },
          { id: 'GF-ISCC-2024-079', date: '03 Oct 2026', origin: 'South Gujarat Industrial Corridor', volumeMt: 42.0, ffa: 2.5, moisture: 0.34, status: 'Verified & Delivered', ghgAvoided: 128.1, posId: 'ISCC-EU-POS-99310' }
        ],
        transactions: [
          { id: '#GF-0421', date: '18 Oct 2026', liters: 42.6, tpc: 26.4, payout: 1704 },
          { id: '#GF-0398', date: '12 Oct 2026', liters: 84.0, tpc: 25.8, payout: 3360 },
          { id: '#GF-0351', date: '05 Oct 2026', liters: 125.4, tpc: 27.1, payout: 5016 },
          { id: '#GF-0310', date: '28 Sep 2026', liters: 160.0, tpc: 26.0, payout: 6400 }
        ]
      };

      // ===================================================================
      // 1. TOUCH & CLICK RIPPLE + ELASTIC POP REACTION
      // ===================================================================
      function attachTouchReactions() {
        document.querySelectorAll('button.touch-reactive, a.touch-reactive, .disease-hazard-card').forEach(el => {
          el.addEventListener('click', (e) => {
            const rect = el.getBoundingClientRect();
            const size = Math.min(180, Math.max(rect.width, rect.height) * 0.65);
            const ripple = document.createElement('span');
            ripple.className = 'touch-ripple-circle';
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            const cx = e.clientX || (rect.left + rect.width / 2);
            const cy = e.clientY || (rect.top + rect.height / 2);
            ripple.style.left = `${cx - rect.left - size / 2}px`;
            ripple.style.top = `${cy - rect.top - size / 2}px`;
            el.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
          });
        });
      }

      function triggerNumberPop(el) {
        if (!el) return;
        el.classList.remove('number-pop-active');
        void el.offsetWidth;
        el.classList.add('number-pop-active');
      }

      let toastTimer = null;
      function showToast(msg) {
        const toast = document.getElementById('appToast');
        const text = document.getElementById('appToastText');
        if (!toast || !text) return;
        text.textContent = msg;
        toast.classList.remove('hidden');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.add('hidden'), 3200);
      }

      // ===================================================================
      // 2. BRAND LOGO PAGE RELOAD, SMOOTH NAVIGATION LINKS & SCROLL-SPY
      // ===================================================================
      function reloadPlatformPage(e) {
        if (e) e.preventDefault();
        // Reset state, scroll to top, re-trigger animations, and reload page cleanly
        if (state.viewMode !== 'landing') {
          setViewMode('landing', null, false);
        }
        window.scrollTo({ top: 0, behavior: 'auto' });
        try {
          window.location.reload();
        } catch (err) {
          // Fallback in sandboxed iframe if reload is restricted
        }
      }

      document.getElementById('brandLogoLink')?.addEventListener('click', reloadPlatformPage);
      document.getElementById('footerBrandLogoLink')?.addEventListener('click', reloadPlatformPage);

      function initSmoothNavigationAndScrollSpy() {
        document.querySelectorAll('.nav-scroll-link').forEach(link => {
          link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const targetEl = document.querySelector(href);
            if (!targetEl) return;

            if (state.viewMode !== 'landing') {
              setViewMode('landing', null, false);
            }
            const headerOffset = 80;
            const rect = targetEl.getBoundingClientRect();
            const offsetTop = rect.top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: Math.max(0, offsetTop), behavior: 'smooth' });
          });
        });

        const navLinks = document.querySelectorAll('[data-nav-sec]');
        const trackedSections = ['threatSection', 'solutionSection', 'impactSection', 'contactSection']
          .map(id => document.getElementById(id))
          .filter(Boolean);

        if ('IntersectionObserver' in window && trackedSections.length) {
          const spyObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && state.viewMode === 'landing') {
                const currentId = entry.target.id;
                navLinks.forEach(a => {
                  const isMatch = a.getAttribute('data-nav-sec') === currentId;
                  a.classList.toggle('text-[#22C55E]', isMatch);
                  a.classList.toggle('font-semibold', isMatch);
                });
              }
            });
          }, { rootMargin: '-28% 0px -55% 0px', threshold: 0 });
          trackedSections.forEach(sec => spyObs.observe(sec));
        }
      }

      // ===================================================================
      // 3. ZERO-LOCK SCROLL REVEAL ENGINE (RELEASES TRANSFORM ON SETTLE)
      // ===================================================================
      function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const bgSlides = document.querySelectorAll('.bg-slide-from-right, .bg-slide-from-left');
        if ('IntersectionObserver' in window) {
          const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('is-visible');
                const delayStr = el.style.getPropertyValue('--delay') || '0ms';
                const delayMs = parseInt(delayStr, 10) || 0;
                setTimeout(() => {
                  el.classList.add('reveal-settled');
                  el.classList.remove('reveal-up', 'reveal-pop', 'reveal-left', 'reveal-right');
                }, delayMs + 1100);
                obs.unobserve(el);
              }
            });
          }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
          reveals.forEach(el => obs.observe(el));

          const bgObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-slid-in');
                bgObs.unobserve(entry.target);
              }
            });
          }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
          bgSlides.forEach(el => bgObs.observe(el));
        } else {
          reveals.forEach(el => el.classList.add('is-visible', 'reveal-settled'));
          bgSlides.forEach(el => el.classList.add('is-slid-in'));
        }
      }

      // ===================================================================
      // 4. HERO STUDIO LIGHT TRACKING, 3D CARD TILT & CLUSTER SWITCHER
      // ===================================================================


      let heroBadgeAnimId = null;
      function animateHeroBadges(litersTarget, co2Target, receiptCode, clusterTitle, imgSrc, stationType) {
        if (heroBadgeAnimId) {
          cancelAnimationFrame(heroBadgeAnimId);
          heroBadgeAnimId = null;
        }
        const litersEl = document.getElementById('heroLoggedLitersText');
        const co2El = document.getElementById('heroCo2OffsetText');
        const recEl = document.getElementById('heroReceiptCodeText');
        const titleEl = document.getElementById('heroClusterTitleText');
        const subTypeEl = document.getElementById('heroClusterSubTypeText');
        const imgEl = document.getElementById('heroMainKitchenImg');

        if (imgEl && imgSrc && imgEl.getAttribute('src') !== imgSrc) {
          imgEl.style.opacity = '0.35';
          imgEl.src = imgSrc;
          requestAnimationFrame(() => {
            imgEl.style.opacity = '1';
          });
        }
        if (titleEl && clusterTitle) titleEl.textContent = clusterTitle;
        if (subTypeEl && stationType) subTypeEl.textContent = stationType;
        if (recEl && receiptCode) recEl.textContent = receiptCode;
        if (clusterTitle) state.fboProfile.name = clusterTitle;
        if (receiptCode) state.fboProfile.qrId = receiptCode;

        state.activeHeroLiters = litersTarget;
        state.activeHeroCo2 = co2Target;
        const duration = 680;
        const start = performance.now();
        function step(now) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const loggedSuffix = state.lang === 'hi' ? 'लीटर दर्ज' : 'L logged';
          const tonSuffix = state.lang === 'hi' ? 'टन' : 'T';
          if (litersEl) litersEl.textContent = `${(litersTarget * eased).toFixed(1)} ${loggedSuffix}`;
          if (co2El) co2El.textContent = `+${(co2Target * eased).toFixed(1)} ${tonSuffix}`;
          if (p < 1) {
            heroBadgeAnimId = requestAnimationFrame(step);
          } else {
            heroBadgeAnimId = null;
            triggerNumberPop(litersEl);
            triggerNumberPop(co2El);
          }
        }
        heroBadgeAnimId = requestAnimationFrame(step);
      }

      document.querySelectorAll('.hero-cluster-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const imgKey = btn.getAttribute('data-img-key') || 'kitchen';
          const imgSrc = clusterImageBank[imgKey] || clusterImageBank.kitchen;
          const heroImgEl = document.getElementById('heroMainKitchenImg');
          if (heroImgEl) {
            heroImgEl.dataset.activeKey = imgKey;
            heroImgEl.dataset.fallbackIdx = '0';
          }
          const cluster = state.lang === 'hi' ? (btn.getAttribute('data-cluster-hi') || btn.getAttribute('data-cluster')) : btn.getAttribute('data-cluster');
          const station = state.lang === 'hi' ? (btn.getAttribute('data-station-hi') || btn.getAttribute('data-station')) : (btn.getAttribute('data-station') || 'SOURCE KITCHEN');
          const liters = parseFloat(btn.getAttribute('data-liters') || '42.6');
          const receipt = btn.getAttribute('data-receipt') || '#GF-0421';
          const co2 = parseFloat(btn.getAttribute('data-co2') || '31.1');
          state.activeClusterBtn = btn;

          animateHeroBadges(liters, co2, receipt, cluster, imgSrc, station);

          document.querySelectorAll('.hero-cluster-pill').forEach(b => {
            b.classList.remove('bg-[#22C55E]/20', 'border-[#22C55E]/55', 'text-[#4ADE80]', 'font-semibold');
            b.classList.add('bg-white/[0.04]', 'border-white/10', 'text-gray-300');
          });
          btn.classList.remove('bg-white/[0.04]', 'border-white/10', 'text-gray-300');
          btn.classList.add('bg-[#22C55E]/20', 'border-[#22C55E]/55', 'text-[#4ADE80]', 'font-semibold');
        });
      });

      document.getElementById('heroTopFloatingBadge')?.addEventListener('click', () => {
        const randomLiters = +(35 + Math.random() * 55).toFixed(1);
        const randomCo2 = +(24 + Math.random() * 40).toFixed(1);
        const randomCode = '#GF-0' + Math.floor(400 + Math.random() * 590);
        animateHeroBadges(randomLiters, randomCo2, randomCode);
        showToast(`Live QR Scan Verified: ${randomLiters} L logged (${randomCode})`);
      });

      document.getElementById('heroBottomFloatingBadge')?.addEventListener('click', () => {
        const co2El = document.getElementById('heroCo2OffsetText');
        triggerNumberPop(co2El);
        showToast('ISCC Certified Carbon Offset: +31.1 Tonnes CO₂ prevented');
      });

      // ===================================================================
      // 5. SECTION 01 ("THE THREAT"): ULTRA-SMOOTH 60FPS SCROLL COUNT-UP
      // ===================================================================
      const crisisAnimTimers = new WeakMap();

      function animateCrisisCounter(el, targetVal, gaugeBarEl = null, duration = 1600, delayMs = 0) {
        if (!el) return;
        const prevId = crisisAnimTimers.get(el);
        if (prevId) cancelAnimationFrame(prevId);

        el.textContent = '0';
        if (gaugeBarEl) gaugeBarEl.style.width = '0%';

        let lastShown = -1;
        const startTime = performance.now() + delayMs;
        // Gauge bar target fill proportion matching image_adb67c.jpg (60% -> 76% bar, 25% -> 38% bar)
        const targetBarWidth = Math.min(96, Math.round(targetVal * 1.32));

        function tick(now) {
          if (now < startTime) {
            crisisAnimTimers.set(el, requestAnimationFrame(tick));
            return;
          }
          const p = Math.min(1, (now - startTime) / duration);
          // Balanced cubic ease-out so every integer step from 0 to 60 and 0 to 25 is visibly counted
          const eased = 1 - Math.pow(1 - p, 2.75);
          const cur = Math.round(targetVal * eased);
          if (cur !== lastShown) {
            el.textContent = String(cur);
            lastShown = cur;
          }
          if (gaugeBarEl) {
            gaugeBarEl.style.width = `${(targetBarWidth * eased).toFixed(1)}%`;
          }
          if (p < 1) {
            crisisAnimTimers.set(el, requestAnimationFrame(tick));
          } else {
            crisisAnimTimers.delete(el);
            el.textContent = String(targetVal);
            if (gaugeBarEl) {
              gaugeBarEl.style.width = `${targetBarWidth}%`;
            }
            triggerNumberPop(el.parentElement);
          }
        }
        crisisAnimTimers.set(el, requestAnimationFrame(tick));
      }

      const box60El = document.getElementById('callout60Box');
      const box25El = document.getElementById('callout25Box');
      const crisisStatsGrid = document.getElementById('crisisStatsGrid');
      let threatInView = false;

      let threatAnimated = false;

      function runThreatCountUp() {
        if (threatAnimated) return;
        threatAnimated = true;
        box60El?.classList.add('is-popped-stat');
        box25El?.classList.add('is-popped-stat');
        const c60 = document.getElementById('crisis60Counter');
        const c25 = document.getElementById('crisis25Counter');
        const g60 = document.getElementById('crisis60GaugeBar');
        const g25 = document.getElementById('crisis25GaugeBar');
        animateCrisisCounter(c60, 60, g60, 1400, 40);
        animateCrisisCounter(c25, state.activeTpcTarget, g25, 1400, 100);
      }

      function resetThreatCountUp() {
        // Safe reset on explicit interaction only
      }

      if ('IntersectionObserver' in window && crisisStatsGrid) {
        const statObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !threatAnimated) {
              runThreatCountUp();
              statObs.unobserve(crisisStatsGrid);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
        statObs.observe(crisisStatsGrid);
      } else {
        runThreatCountUp();
      }

      box60El?.addEventListener('click', () => {
        animateCrisisCounter(document.getElementById('crisis60Counter'), 60, document.getElementById('crisis60GaugeBar'), 950, 0);
        showToast('60% of untreated UCO in India re-enters the street food chain.');
      });

      box25El?.addEventListener('click', () => {
        animateCrisisCounter(document.getElementById('crisis25Counter'), state.activeTpcTarget, document.getElementById('crisis25GaugeBar'), 950, 0);
        showToast('FSSAI statutory mandate requires disposal at 25% Total Polar Compounds.');
      });

      // Interactive Test Reheat TPC Segmented Control
      document.querySelectorAll('.reheat-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tpc = parseInt(btn.getAttribute('data-tpc') || '25', 10);
          state.activeTpcTarget = tpc;
          const meterWidth = btn.getAttribute('data-meter') || '62%';
          const color = btn.getAttribute('data-color') || '#F59E0B';
          const status = state.lang === 'hi' ? (btn.getAttribute('data-status-hi') || btn.getAttribute('data-status')) : (btn.getAttribute('data-status') || 'FSSAI MANDATE');
          const desc = state.lang === 'hi' ? (btn.getAttribute('data-desc-hi') || btn.getAttribute('data-desc')) : (btn.getAttribute('data-desc') || '');

          const c25 = document.getElementById('crisis25Counter');
          const g25 = document.getElementById('crisis25GaugeBar');
          const wrapper25 = document.getElementById('crisis25Wrapper');
          const sub = document.getElementById('crisis25SubLabel');
          const descEl = document.getElementById('crisis25Desc');
          const spectrumBar = document.getElementById('reheatTpcSpectrumBar');
          const activeBadge = document.getElementById('reheatSimActiveBadge');

          animateCrisisCounter(c25, tpc, g25, 900, 0);
          if (wrapper25) wrapper25.style.color = color;
          if (box25El) box25El.style.borderLeftColor = color;
          if (sub) {
            sub.textContent = status;
            sub.style.color = color;
          }
          if (descEl) descEl.textContent = desc;
          if (spectrumBar) spectrumBar.style.width = meterWidth;
          if (activeBadge) {
            activeBadge.textContent = `${status} • ${tpc}% TPC`;
            activeBadge.style.color = color;
          }


          document.querySelectorAll('[data-reheat-card]').forEach(card => {
            const ctpc = parseInt(card.getAttribute('data-reheat-card'), 10);
            const cbtn = card.querySelector('.reheat-pill-btn');
            if (ctpc === tpc) {
              card.className = 'reheat-option-card active-reheat-option rounded-lg';
              if (tpc === 14) {
                if (cbtn) cbtn.className = 'reheat-pill-btn w-full py-2.5 px-2 rounded-lg bg-[#22C55E]/[0.14] border border-[#22C55E]/45 font-mono text-[10px] sm:text-[11px] font-semibold text-[#86EFAC] flex items-center justify-center gap-1.5 shadow-sm transition';
              } else if (tpc === 25) {
                if (cbtn) cbtn.className = 'reheat-pill-btn w-full py-2.5 px-2 rounded-lg bg-[#F59E0B]/[0.14] border border-[#F59E0B]/45 font-mono text-[10px] sm:text-[11px] font-semibold text-[#FDE68A] flex items-center justify-center gap-1.5 shadow-sm transition';
              } else {
                if (cbtn) cbtn.className = 'reheat-pill-btn w-full py-2.5 px-2 rounded-lg bg-[#EF4444]/[0.14] border border-[#EF4444]/45 font-mono text-[10px] sm:text-[11px] font-semibold text-[#FCA5A5] flex items-center justify-center gap-1.5 shadow-sm transition';
              }
            } else {
              card.className = 'reheat-option-card rounded-lg';
              if (cbtn) cbtn.className = 'reheat-pill-btn w-full py-2.5 px-2 rounded-lg bg-transparent hover:bg-white/[0.04] border border-transparent font-mono text-[10px] sm:text-[11px] font-medium text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition';
            }
          });
        });
      });

      document.querySelectorAll('[data-reheat-card]').forEach(card => {
        card.addEventListener('click', (e) => {
          if (!e.target.closest('.reheat-pill-btn')) {
            card.querySelector('.reheat-pill-btn')?.click();
          }
        });
      });

      // ===================================================================
      // 6. SECTION 02 ("THE PROCESS"): CHOREOGRAPHED PIPELINE & STEP CARDS
      // ===================================================================
      const stepPositions = { 1: '16.66%', 2: '50%', 3: '83.33%' };
      const stepBeamWidths = { 1: '18%', 2: '52%', 3: '100%' };
      const stepTelemetryLabels = {
        1: 'STEP 01 • QR KIT ASSIGNED',
        2: 'STEP 02 • FLEET ROUTED',
        3: 'STEP 03 • FSSAI RECEIPT ISSUED'
      };
      const stepTelemetryLabelsHi = {
        1: 'चरण 01 • QR किट आवंटित',
        2: 'चरण 02 • पिकअप वैन रवाना',
        3: 'चरण 03 • FSSAI रसीद जारी'
      };

      function activateProcessStep(stepNum) {
        state.activeProcessStep = stepNum;
        const puck = document.getElementById('glidingProcessPuck');
        const beam = document.getElementById('processTrackProgressFill');
        const pill = document.getElementById('processPuckTelemetryPill');

        if (puck && stepPositions[stepNum]) puck.style.left = stepPositions[stepNum];
        if (beam && stepBeamWidths[stepNum]) beam.style.width = stepBeamWidths[stepNum];
        const labelsMap = state.lang === 'hi' ? stepTelemetryLabelsHi : stepTelemetryLabels;
        if (pill && labelsMap[stepNum]) pill.textContent = labelsMap[stepNum];

        document.querySelectorAll('.process-node-dot').forEach(dot => {
          const ds = parseInt(dot.getAttribute('data-step'), 10);
          dot.classList.toggle('scale-110', ds <= stepNum);
          dot.style.backgroundColor = ds <= stepNum ? '#DCFCE7' : '#FFFFFF';
        });

        document.querySelectorAll('[data-step-card]').forEach(card => {
          const s = parseInt(card.getAttribute('data-step-card'), 10);
          const isMatch = s === stepNum;
          card.classList.toggle('active-process-card', isMatch);

          const iconBox = card.querySelector('.step-icon-box');
          const bar = card.querySelector('.step-bottom-bar');
          const numMark = card.querySelector('.step-num-watermark');
          if (iconBox) {
            iconBox.className = isMatch
              ? 'step-icon-box w-14 h-14 rounded-2xl bg-[#22C55E] text-[#050A07] flex items-center justify-center shadow-lg shadow-[#22C55E]/35 scale-105 transition-all duration-500'
              : 'step-icon-box w-14 h-14 rounded-2xl bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center transition-all duration-500';
          }
          if (numMark) {
            numMark.className = isMatch
              ? 'step-num-watermark font-display font-extrabold text-5xl text-[#16A34A]/35 select-none transition-colors duration-500'
              : 'step-num-watermark font-display font-extrabold text-5xl text-gray-200 select-none transition-colors duration-500';
          }
          if (bar) {
            bar.style.width = isMatch ? '100%' : (s < stepNum ? '65%' : '24%');
          }
        });
      }

      let processWalkthroughTimers = [];
      let processAnimatedOnce = false;
      function cancelProcessWalkthrough() {
        processWalkthroughTimers.forEach(t => clearTimeout(t));
        processWalkthroughTimers = [];
      }

      const processCardsGrid = document.getElementById('processCardsGrid');
      if ('IntersectionObserver' in window && processCardsGrid) {
        const procObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !processAnimatedOnce) {
              processAnimatedOnce = true;
              cancelProcessWalkthrough();
              activateProcessStep(1);
              processWalkthroughTimers.push(setTimeout(() => activateProcessStep(2), 850));
              processWalkthroughTimers.push(setTimeout(() => activateProcessStep(3), 1700));
              processWalkthroughTimers.push(setTimeout(() => activateProcessStep(2), 2550));
              procObs.unobserve(processCardsGrid);
            }
          });
        }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
        procObs.observe(processCardsGrid);
      }

      document.querySelectorAll('[data-step-card]').forEach(card => {
        const s = parseInt(card.getAttribute('data-step-card'), 10);
        card.addEventListener('mouseenter', () => {
          cancelProcessWalkthrough();
          activateProcessStep(s);
        });
        card.addEventListener('click', () => {
          cancelProcessWalkthrough();
          activateProcessStep(s);
          const msgs = state.lang === 'hi' ? {
            1: 'चरण 01: 60 सेकंड में रजिस्ट्रेशन और आपके किचन के लिए वॉटरप्रूफ QR कोड जारी।',
            2: 'चरण 02: क्लस्टर पिकअप वैन निर्धारित समय पर सीधे आपके किचन रूट पर।',
            3: 'चरण 03: QR स्कैन होते ही तेल का वज़न दर्ज और तुरंत FSSAI रसीद व NEFT भुगतान!'
          } : {
            1: 'Step 01: Instant 60-second onboarding & waterproof restaurant QR assigned.',
            2: 'Step 02: Hyper-local cluster fleet routed automatically to your kitchen.',
            3: 'Step 03: QR scanned, weight auto-logged & instant FSSAI receipt issued!'
          };
          showToast(msgs[s]);
        });
      });

      document.querySelectorAll('.process-node-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          cancelProcessWalkthrough();
          activateProcessStep(parseInt(dot.getAttribute('data-step'), 10));
        });
      });

      // ===================================================================
      // 7. SECTION 03 ("GEOFIELD IMPACT CONSOLE"): LEFT-TO-RIGHT GRAPH & COUNTERS
      // ===================================================================
      const baseCurveY = [118, 114, 108, 96, 90, 82, 71, 64, 52, 42, 31, 24];

      function buildSmoothSplinePath(pts) {
        if (!pts.length) return '';
        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const p0 = pts[i];
          const p1 = pts[i + 1];
          const midX = (p0.x + p1.x) * 0.5;
          d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
        }
        return d;
      }

      function interpolateSplineYAtX(pts, xVal) {
        if (!pts || !pts.length) return 24;
        if (xVal <= pts[0].x) return pts[0].y;
        if (xVal >= pts[pts.length - 1].x) return pts[pts.length - 1].y;
        for (let i = 0; i < pts.length - 1; i++) {
          const p0 = pts[i];
          const p1 = pts[i + 1];
          if (xVal >= p0.x && xVal <= p1.x) {
            const t = (xVal - p0.x) / Math.max(1, p1.x - p0.x);
            const st = t * t * (3 - 2 * t);
            return +(p0.y + (p1.y - p0.y) * st).toFixed(1);
          }
        }
        return pts[pts.length - 1].y;
      }

      let consoleAnimFrameId = null;

      function computeTargetSplinePts(liters) {
        const ratio = liters / 12450;
        const scaleFactor = 0.55 + 0.45 * Math.min(1.35, Math.pow(ratio, 0.4));
        return baseCurveY.map((by, i) => {
          const x = Math.round(15 + i * (570 / 11));
          const distFromBase = 128 - by;
          const y = Math.max(14, Math.min(126, Math.round(128 - distFromBase * scaleFactor)));
          return { x, y, week: i + 1, weeklyLiters: Math.round((liters / 12) * (0.55 + i * 0.08)) };
        });
      }

      function renderConsoleAndGraph(liters, triggerPop = false) {
        if (consoleAnimFrameId) {
          cancelAnimationFrame(consoleAnimFrameId);
          consoleAnimFrameId = null;
        }
        state.consoleLiters = liters;
        const ratio = liters / 12450;
        const co2Tonnes = (31.1 * ratio).toFixed(1);
        const treesCount = Math.round(1420 * ratio);
        const waterSaved = Math.round(186000 * ratio);
        const revenueInr = Math.round(498000 * ratio);
        const growthPct = Math.round(140 + 74 * Math.pow(ratio, 0.35));

        const litersEl = document.getElementById('consoleLitersValue');
        const co2El = document.getElementById('consoleCo2Value');
        const treesEl = document.getElementById('consoleTreesTag');
        const waterEl = document.getElementById('consoleWaterValue');
        const revEl = document.getElementById('consoleRevenueValue');
        const badgeEl = document.getElementById('consoleSliderBadge');
        const pctEl = document.getElementById('velocityGrowthPct');
        const clipRect = document.getElementById('velocityClipRect');

        if (litersEl) litersEl.textContent = `${liters.toLocaleString('en-IN')} L`;
        if (co2El) co2El.textContent = `${co2Tonnes} T CO₂`;
        if (treesEl) treesEl.textContent = state.lang === 'hi' ? `↗ ≈ ${treesCount.toLocaleString('en-IN')} पेड़ों के बराबर` : `↗ ≈ ${treesCount.toLocaleString('en-IN')} TREES PLANTED`;
        if (waterEl) waterEl.textContent = `${waterSaved.toLocaleString('en-IN')} L`;
        if (revEl) revEl.textContent = `₹ ${revenueInr.toLocaleString('en-IN')}`;
        if (badgeEl) badgeEl.textContent = `${liters.toLocaleString('en-IN')} L`;
        if (pctEl) pctEl.textContent = `+${growthPct}%`;
        if (clipRect) clipRect.setAttribute('width', '600');

        if (triggerPop) {
          [litersEl, co2El, waterEl, revEl, pctEl].forEach(triggerNumberPop);
        }

        const pts = computeTargetSplinePts(liters);
        const lineD = buildSmoothSplinePath(pts);
        const areaD = `${lineD} L ${pts[pts.length - 1].x} 134 L ${pts[0].x} 134 Z`;

        document.getElementById('velocityLinePath')?.setAttribute('d', lineD);
        document.getElementById('velocityGlowPath')?.setAttribute('d', lineD);
        document.getElementById('velocityAreaPath')?.setAttribute('d', areaD);

        const lastPt = pts[pts.length - 1];
        const dot = document.getElementById('velocityActiveDot');
        const pulse = document.getElementById('velocityActivePulse');
        const scrub = document.getElementById('velocityScrubLine');
        if (dot) {
          dot.setAttribute('cx', String(lastPt.x));
          dot.setAttribute('cy', String(lastPt.y));
        }
        if (pulse) {
          pulse.setAttribute('cx', String(lastPt.x));
          pulse.setAttribute('cy', String(lastPt.y));
        }
        if (scrub) {
          scrub.setAttribute('x1', String(lastPt.x));
          scrub.setAttribute('x2', String(lastPt.x));
        }

        state.currentSplinePts = pts;
      }

      function animateConsoleCountUpAndGraphGrow(targetLiters = state.consoleLiters, duration = 1650) {
        if (consoleAnimFrameId) {
          cancelAnimationFrame(consoleAnimFrameId);
          consoleAnimFrameId = null;
        }
        state.consoleLiters = targetLiters;
        const ratio = targetLiters / 12450;
        const targetCo2 = 31.1 * ratio;
        const targetTrees = Math.round(1420 * ratio);
        const targetWater = Math.round(186000 * ratio);
        const targetRev = Math.round(498000 * ratio);
        const targetGrowth = Math.round(140 + 74 * Math.pow(ratio, 0.35));

        const litersEl = document.getElementById('consoleLitersValue');
        const co2El = document.getElementById('consoleCo2Value');
        const treesEl = document.getElementById('consoleTreesTag');
        const waterEl = document.getElementById('consoleWaterValue');
        const revEl = document.getElementById('consoleRevenueValue');
        const badgeEl = document.getElementById('consoleSliderBadge');
        const pctEl = document.getElementById('velocityGrowthPct');
        const lineEl = document.getElementById('velocityLinePath');
        const glowEl = document.getElementById('velocityGlowPath');
        const areaEl = document.getElementById('velocityAreaPath');
        const clipRect = document.getElementById('velocityClipRect');
        const dot = document.getElementById('velocityActiveDot');
        const pulse = document.getElementById('velocityActivePulse');
        const scrub = document.getElementById('velocityScrubLine');

        const targetPts = computeTargetSplinePts(targetLiters);
        state.currentSplinePts = targetPts;

        const lineD = buildSmoothSplinePath(targetPts);
        const areaD = `${lineD} L ${targetPts[targetPts.length - 1].x} 134 L ${targetPts[0].x} 134 Z`;
        lineEl?.setAttribute('d', lineD);
        glowEl?.setAttribute('d', lineD);
        areaEl?.setAttribute('d', areaD);

        const startTime = performance.now();

        function step(now) {
          const p = Math.min(1, (now - startTime) / duration);
          const eased = 1 - Math.pow(1 - p, 3);

          const curLiters = Math.round(targetLiters * eased);
          const curCo2 = (targetCo2 * eased).toFixed(1);
          const curTrees = Math.round(targetTrees * eased);
          const curWater = Math.round(targetWater * eased);
          const curRev = Math.round(targetRev * eased);
          const curGrowth = Math.round(targetGrowth * eased);

          if (litersEl) litersEl.textContent = `${curLiters.toLocaleString('en-IN')} L`;
          if (co2El) co2El.textContent = `${curCo2} T CO₂`;
          if (treesEl) treesEl.textContent = state.lang === 'hi' ? `↗ ≈ ${curTrees.toLocaleString('en-IN')} पेड़ों के बराबर` : `↗ ≈ ${curTrees.toLocaleString('en-IN')} TREES PLANTED`;
          if (waterEl) waterEl.textContent = `${curWater.toLocaleString('en-IN')} L`;
          if (revEl) revEl.textContent = `₹ ${curRev.toLocaleString('en-IN')}`;
          if (badgeEl) badgeEl.textContent = `${curLiters.toLocaleString('en-IN')} L`;
          if (pctEl) pctEl.textContent = `+${curGrowth}%`;

          const curX = +(15 + 570 * eased).toFixed(1);
          const curY = interpolateSplineYAtX(targetPts, curX);

          if (clipRect) clipRect.setAttribute('width', String(curX + 6));
          if (dot) {
            dot.setAttribute('cx', String(curX));
            dot.setAttribute('cy', String(curY));
          }
          if (pulse) {
            pulse.setAttribute('cx', String(curX));
            pulse.setAttribute('cy', String(curY));
          }
          if (scrub) {
            scrub.setAttribute('x1', String(curX));
            scrub.setAttribute('x2', String(curX));
          }

          if (p < 1) {
            consoleAnimFrameId = requestAnimationFrame(step);
          } else {
            consoleAnimFrameId = null;
            renderConsoleAndGraph(targetLiters, true);
          }
        }

        consoleAnimFrameId = requestAnimationFrame(step);
      }

      function selectVelocityWeekPoint(pt) {
        if (!pt) return;
        const dot = document.getElementById('velocityActiveDot');
        const pulse = document.getElementById('velocityActivePulse');
        const scrub = document.getElementById('velocityScrubLine');
        const readout = document.getElementById('velocityHoverReadout');
        if (dot) {
          dot.setAttribute('cx', String(pt.x));
          dot.setAttribute('cy', String(pt.y));
        }
        if (pulse) {
          pulse.setAttribute('cx', String(pt.x));
          pulse.setAttribute('cy', String(pt.y));
        }
        if (scrub) {
          scrub.setAttribute('x1', String(pt.x));
          scrub.setAttribute('x2', String(pt.x));
        }
        state.activeVelocityPt = pt;
        if (readout) {
          const wkPrefix = state.lang === 'hi' ? 'सप्ताह' : 'Week';
          readout.textContent = `${wkPrefix} ${pt.week}: ${pt.weeklyLiters.toLocaleString('en-IN')} L • ₹${(pt.weeklyLiters * 40).toLocaleString('en-IN')}`;
        }
        document.querySelectorAll('.vel-week-pill').forEach(btn => {
          const w = parseInt(btn.getAttribute('data-vel-week'), 10);
          if (w === pt.week) {
            btn.className = 'vel-week-pill px-2.5 py-1 rounded-lg bg-[#22C55E]/20 border border-[#22C55E]/50 font-mono text-[10px] text-[#4ADE80] font-bold transition';
          } else {
            btn.className = 'vel-week-pill px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition';
          }
        });
      }

      const svgEl = document.getElementById('velocitySplineSvg');
      if (svgEl) {
        let scrubRafId = null;
        function handleVelocityPointerOrTouch(clientX) {
          if (!state.currentSplinePts || scrubRafId) return;
          scrubRafId = requestAnimationFrame(() => {
            const rect = svgEl.getBoundingClientRect();
            const relX = ((clientX - rect.left) / Math.max(1, rect.width)) * 600;
            let closest = state.currentSplinePts[0];
            let minDiff = Infinity;
            state.currentSplinePts.forEach(pt => {
              const diff = Math.abs(pt.x - relX);
              if (diff < minDiff) {
                minDiff = diff;
                closest = pt;
              }
            });
            selectVelocityWeekPoint(closest);
            scrubRafId = null;
          });
        }
        svgEl.addEventListener('pointerdown', (e) => handleVelocityPointerOrTouch(e.clientX), { passive: true });
        svgEl.addEventListener('pointermove', (e) => handleVelocityPointerOrTouch(e.clientX), { passive: true });
        svgEl.addEventListener('touchstart', (e) => {
          if (e.touches && e.touches[0]) handleVelocityPointerOrTouch(e.touches[0].clientX);
        }, { passive: true });
        svgEl.addEventListener('touchmove', (e) => {
          if (e.touches && e.touches[0]) handleVelocityPointerOrTouch(e.touches[0].clientX);
        }, { passive: true });
      }

      document.querySelectorAll('.vel-week-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const w = parseInt(btn.getAttribute('data-vel-week') || '12', 10);
          if (!state.currentSplinePts) return;
          const found = state.currentSplinePts.find(pt => pt.week === w) || state.currentSplinePts[state.currentSplinePts.length - 1];
          selectVelocityWeekPoint(found);
        });
      });

      document.getElementById('consoleVolumeSlider')?.addEventListener('input', (e) => {
        renderConsoleAndGraph(parseInt(e.target.value, 10), false);
      });

      document.querySelectorAll('.console-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const vol = parseInt(btn.getAttribute('data-vol') || '12450', 10);
          const slider = document.getElementById('consoleVolumeSlider');
          if (slider) slider.value = String(vol);
          animateConsoleCountUpAndGraphGrow(vol, 1100);

          document.querySelectorAll('.console-preset-btn').forEach(b => {
            b.className = 'console-preset-btn touch-reactive py-1.5 px-2 rounded-lg bg-surface-950 border border-white/10 font-mono text-[10px] text-gray-400 hover:text-white transition';
          });
          btn.className = 'console-preset-btn touch-reactive py-1.5 px-2 rounded-lg bg-[#22C55E]/20 border border-[#22C55E]/50 font-mono text-[10px] text-[#22C55E] font-semibold transition';
        });
      });

      document.querySelectorAll('[data-metric-box]').forEach(box => {
        box.addEventListener('click', () => {
          document.querySelectorAll('[data-metric-box]').forEach(b => b.classList.remove('active-metric-box'));
          box.classList.add('active-metric-box');
          triggerNumberPop(box.querySelector('.tabular-nums'));
        });
      });

      // Observe #impactConsoleShell directly and run the initial count-up & graph animation ONLY ONCE per page session
      const impactConsoleShell = document.getElementById('impactConsoleShell');
      let impactAnimatedOnce = false;
      if ('IntersectionObserver' in window && impactConsoleShell) {
        const impactObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !impactAnimatedOnce) {
              impactAnimatedOnce = true;
              animateConsoleCountUpAndGraphGrow(state.consoleLiters, 1850);
              impactObs.unobserve(impactConsoleShell);
            }
          });
        }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
        impactObs.observe(impactConsoleShell);
      }

      // ===================================================================
      // 8. VIEW SWITCHER, SELLER PORTAL & SCROLL-SAFE MODALS
      // ===================================================================
      function setPortalRole(role) {
        state.portalRole = role;
        const sellerPanel = document.getElementById('sellerPortalPanel');
        const customerPanel = document.getElementById('customerPortalPanel');
        const sellerTabBtn = document.getElementById('portalRoleSellerBtn');
        const customerTabBtn = document.getElementById('portalRoleCustomerBtn');
        const sellerQuickBtn = document.getElementById('sellerQuickLogBtn');
        const customerQuickBtn = document.getElementById('customerQuickOrderBtn');
        const bannerEl = document.getElementById('portalCommandBanner');
        const roleBadge = document.getElementById('portalRoleBadge');
        const roleBadgeText = document.getElementById('portalRoleBadgeText');
        const subBadge1 = document.getElementById('portalSubBadge1');
        const subBadge2 = document.getElementById('portalSubBadge2');
        const titleEl = document.getElementById('sellerFboNameDisplay');
        const subtitleEl = document.getElementById('portalConsoleSubtitle');

        if (role === 'customer') {
          sellerPanel?.classList.add('hidden');
          customerPanel?.classList.remove('hidden');
          sellerQuickBtn?.classList.add('hidden');
          customerQuickBtn?.classList.remove('hidden');

          if (bannerEl) {
            bannerEl.className = 'rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0A1822] via-[#08121A] to-[#060C11] border border-[#38BDF8]/30 shadow-2xl space-y-6 transition-colors duration-300';
          }
          if (sellerTabBtn) {
            sellerTabBtn.className = 'touch-reactive text-left p-4 rounded-2xl bg-[#0B1510] hover:bg-[#112018] text-white border-2 border-[#22C55E]/35 hover:border-[#22C55E] transition-all flex items-center justify-between gap-3';
            sellerTabBtn.innerHTML = `
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#22C55E]/15 text-[#4ADE80] flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V7l8-4v18m6 0V11l-6-4"/>
                  </svg>
                </div>
                <div>
                  <div class="font-sans text-[11px] font-bold uppercase tracking-wider text-[#4ADE80]">FBO Kitchen Partner</div>
                  <div class="font-display text-lg font-extrabold leading-tight">Seller Dashboard</div>
                  <div class="font-sans text-xs text-gray-300 mt-0.5">Dispose UCO @ ₹40/L &bull; QR Receipts</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-[#22C55E]/15 text-[#4ADE80] font-sans text-[11px] font-semibold">SWITCH</span>
            `;
          }
          if (customerTabBtn) {
            customerTabBtn.className = 'touch-reactive text-left p-4 rounded-2xl bg-[#38BDF8] text-[#050A07] border-2 border-[#7DD3FC] shadow-[0_12px_28px_-6px_rgba(56,189,248,0.45)] transition-all flex items-center justify-between gap-3';
            customerTabBtn.innerHTML = `
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#050A07]/15 flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-sans text-[11px] font-bold uppercase tracking-wider opacity-80">Biofuel &amp; SAF Offtaker</div>
                  <div class="font-display text-lg font-extrabold leading-tight">Customer Dashboard</div>
                  <div class="font-sans text-xs font-medium opacity-85 mt-0.5">Procure Bulk MT &bull; ISCC Certificates</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-[#050A07]/15 font-sans text-[11px] font-bold">ACTIVE</span>
            `;
          }

          if (roleBadge) {
            roleBadge.className = 'inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/35 font-sans text-xs font-semibold text-[#38BDF8]';
          }
          if (roleBadgeText) roleBadgeText.textContent = 'Refinery Offtaker Console';
          if (subBadge1) subBadge1.textContent = 'ISCC EU & RED II Certified';
          if (subBadge2) {
            subBadge2.className = 'px-3 py-1 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30 font-sans text-xs font-semibold text-[#BAE6FD]';
            subBadge2.textContent = 'Spec: Tier-1 Low-FFA UCO';
          }
          if (titleEl) titleEl.textContent = state.customerProfile.name;
          if (subtitleEl) {
            subtitleEl.innerHTML = 'Offtake Contract: <strong class="text-white">#BRF-2024-91 (Escrow Verified)</strong> &nbsp;&middot;&nbsp; Next Inbound Tanker: <strong class="text-[#38BDF8]">Today, 2h 45m</strong>';
          }
          renderCustomerPortal();
          showToast('Switched to Customer Dashboard (Biofuel Refinery View)');
        } else {
          customerPanel?.classList.add('hidden');
          sellerPanel?.classList.remove('hidden');
          customerQuickBtn?.classList.add('hidden');
          sellerQuickBtn?.classList.remove('hidden');

          if (bannerEl) {
            bannerEl.className = 'rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0E1B14] via-[#0A130E] to-[#080E0B] border border-[#22C55E]/25 shadow-2xl space-y-6 transition-colors duration-300';
          }
          if (sellerTabBtn) {
            sellerTabBtn.className = 'touch-reactive text-left p-4 rounded-2xl bg-[#22C55E] text-[#050A07] border-2 border-[#4ADE80] shadow-[0_12px_28px_-6px_rgba(34,197,94,0.45)] transition-all flex items-center justify-between gap-3';
            sellerTabBtn.innerHTML = `
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#050A07]/15 flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V7l8-4v18m6 0V11l-6-4"/>
                  </svg>
                </div>
                <div>
                  <div class="font-sans text-[11px] font-bold uppercase tracking-wider opacity-80">FBO Kitchen Partner</div>
                  <div class="font-display text-lg font-extrabold leading-tight">Seller Dashboard</div>
                  <div class="font-sans text-xs font-medium opacity-85 mt-0.5">Dispose UCO @ ₹40/L &bull; QR Receipts</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-[#050A07]/15 font-sans text-[11px] font-bold">ACTIVE</span>
            `;
          }
          if (customerTabBtn) {
            customerTabBtn.className = 'touch-reactive text-left p-4 rounded-2xl bg-[#0B151C] hover:bg-[#10212B] text-white border-2 border-[#38BDF8]/35 hover:border-[#38BDF8] transition-all flex items-center justify-between gap-3';
            customerTabBtn.innerHTML = `
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-sans text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">Biofuel &amp; SAF Offtaker</div>
                  <div class="font-display text-lg font-extrabold leading-tight">Customer Dashboard</div>
                  <div class="font-sans text-xs text-gray-300 mt-0.5">Procure Bulk MT &bull; ISCC Certificates</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-[#38BDF8]/15 text-[#38BDF8] font-sans text-[11px] font-semibold">SWITCH</span>
            `;
          }

          if (roleBadge) {
            roleBadge.className = 'inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/35 font-sans text-xs font-semibold text-[#4ADE80]';
          }
          if (roleBadgeText) roleBadgeText.textContent = 'Seller Kitchen Console';
          if (subBadge1) subBadge1.textContent = 'ISCC & FSSAI RUCO Verified';
          if (subBadge2) {
            subBadge2.className = 'px-3 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 font-sans text-xs font-semibold text-[#FDE68A]';
            subBadge2.textContent = 'Avg Rate: ₹40 / Liter';
          }
          if (titleEl) titleEl.textContent = state.fboProfile.name;
          if (subtitleEl) {
            subtitleEl.innerHTML = 'Auto-Settlement Bank: <strong class="text-white">HDFC Bank •••• 4821 (Instant NEFT)</strong> &nbsp;&middot;&nbsp; Next Fleet Window: <strong class="text-[#4ADE80]">Tomorrow, 10:30 AM</strong>';
          }
          renderSellerPortal();
          showToast('Switched to Seller Dashboard (FBO Partner View)');
        }
      }

      function setViewMode(mode, role = null, scrollTop = true) {
        state.viewMode = mode;
        const landingView = document.getElementById('landingView');
        const portalView = document.getElementById('portalView');
        const landingNavLinks = document.getElementById('landingNavLinks');
        const headerRoleSwitcher = document.getElementById('headerRoleSwitcher');
        const modeLandingBtn = document.getElementById('modeLandingBtn');
        const modePortalBtn = document.getElementById('modePortalBtn');

        if (mode === 'portal') {
          landingView.classList.add('hidden');
          portalView.classList.remove('hidden');
          if (landingNavLinks) landingNavLinks.classList.add('md:hidden');
          headerRoleSwitcher?.classList.add('hidden');
          modePortalBtn?.classList.add('hidden');
          modeLandingBtn?.classList.remove('hidden');
          if (role === 'customer' || role === 'seller') {
            setPortalRole(role);
          } else {
            setPortalRole(state.portalRole || 'seller');
          }
          if (scrollTop) window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          portalView.classList.add('hidden');
          landingView.classList.remove('hidden');
          if (landingNavLinks) landingNavLinks.classList.remove('md:hidden');
          headerRoleSwitcher?.classList.remove('hidden');
          modeLandingBtn?.classList.add('hidden');
          modePortalBtn?.classList.remove('hidden');
          if (scrollTop) window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }

      function renderCustomerPortal() {
        let totalMt = 0;
        let totalGhg = 0;
        state.customerBatches.forEach(b => {
          totalMt += b.volumeMt;
          totalGhg += b.ghgAvoided;
        });

        const totalVolEl = document.getElementById('customerTotalVol');
        const totalGhgEl = document.getElementById('customerTotalGhg');
        const totalProcureEl = document.getElementById('customerTotalProcure');
        if (totalVolEl) totalVolEl.textContent = `${totalMt.toFixed(1)} MT`;
        if (totalGhgEl) totalGhgEl.textContent = `${totalGhg.toFixed(1)} MT`;
        if (totalProcureEl) {
          totalProcureEl.textContent = `₹${(totalMt * 0.0064).toFixed(2)} Cr`;
        }

        if (typeof renderBuyerAnalyticsChart === 'function') renderBuyerAnalyticsChart();
        const tbody = document.getElementById('customerBatchLedgerBody');
        if (tbody) {
          tbody.innerHTML = '';
          state.customerBatches.forEach(b => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-white/[0.02] transition font-mono';
            tr.innerHTML = `
              <td class="py-3 px-3 text-white font-semibold">${b.id}</td>
              <td class="py-3 px-3 text-gray-300 text-xs">${b.origin}</td>
              <td class="py-3 px-3 text-white font-bold">${b.volumeMt.toFixed(1)} MT</td>
              <td class="py-3 px-3 text-[#38BDF8] text-xs">FFA ${b.ffa}% &bull; ${b.moisture}%</td>
              <td class="py-3 px-3">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-[10px] font-medium">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                  ${b.status}
                </span>
              </td>
              <td class="py-3 px-3 text-right">
                <button type="button" data-iscc-id="${b.id}" class="view-iscc-btn px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-[#38BDF8] hover:text-black text-gray-300 hover:font-bold text-xs transition">
                  Proof of Sustainability &rarr;
                </button>
              </td>
            `;
            tbody.appendChild(tr);
          });

          tbody.querySelectorAll('.view-iscc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const bId = btn.getAttribute('data-iscc-id');
              const batch = state.customerBatches.find(x => x.id === bId) || state.customerBatches[0];
              openIsccModal(batch);
            });
          });
        }
      }

      function openIsccModal(batch) {
        const modal = document.getElementById('isccModal');
        if (!modal) return;
        document.getElementById('isccModalBatchId').textContent = batch.id;
        document.getElementById('isccModalOrigin').textContent = batch.origin;
        document.getElementById('isccModalWeight').textContent = `${batch.volumeMt.toFixed(1)} Metric Tons (~${Math.round(batch.volumeMt * 1100)} Liters)`;
        document.getElementById('isccModalGhg').textContent = `88.5% Savings (${batch.ghgAvoided.toFixed(1)} MT CO₂e avoided)`;
        document.getElementById('isccModalLab').textContent = `FFA ${batch.ffa}% • Moisture ${batch.moisture}% • Sulfur < 10ppm`;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        syncModalBodyScrollLock();
      }

      function closeIsccModal() {
        const modal = document.getElementById('isccModal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        syncModalBodyScrollLock();
      }

      function renderSellerPortal() {
        let totalVol = 0;
        let totalEarn = 0;
        state.transactions.forEach(t => {
          totalVol += t.liters;
          totalEarn += t.payout;
        });
        document.getElementById('sellerTotalVol').textContent = `${totalVol.toFixed(1)} L`;
        document.getElementById('sellerTotalEarned').textContent = `₹${totalEarn.toLocaleString('en-IN')}`;
        document.getElementById('sellerTotalCo2').textContent = `${Math.round(totalVol * 2.5).toLocaleString('en-IN')} kg`;
        document.getElementById('sellerTotalWater').textContent = `${Math.round(totalVol).toLocaleString('en-IN')}M L`;

        document.getElementById('sellerFboNameDisplay').textContent = state.fboProfile.name;
        document.getElementById('sellerQrIdDisplay').textContent = state.fboProfile.qrId;
        if (typeof renderSellerAnalyticsChart === 'function') renderSellerAnalyticsChart();

        const tbody = document.getElementById('sellerLedgerBody');
        if (!tbody) return;
        tbody.innerHTML = state.transactions.map(tx => `
          <tr class="hover:bg-white/[0.02] transition">
            <td class="py-4 px-3 font-medium text-white">${tx.date}</td>
            <td class="py-4 px-3 text-gray-300 font-mono">${tx.liters.toFixed(1)} L</td>
            <td class="py-4 px-3 text-gray-400 font-mono">${tx.tpc}% TPC</td>
            <td class="py-4 px-3 font-semibold text-[#22C55E] font-mono">₹${tx.payout.toLocaleString('en-IN')}</td>
            <td class="py-4 px-3 text-right">
              <button data-cert-tx="${tx.id}" class="view-tx-cert-btn px-3.5 py-1.5 rounded-full bg-[#22C55E]/15 hover:bg-[#22C55E] hover:text-black font-mono text-[11px] font-semibold text-[#22C55E] transition">
                ${tx.id}
              </button>
            </td>
          </tr>
        `).join('');

        tbody.querySelectorAll('.view-tx-cert-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const tx = state.transactions.find(t => t.id === btn.getAttribute('data-cert-tx')) || state.transactions[0];
            openCertificateModal(tx);
          });
        });
      }

      document.getElementById('sellerQuickLogBtn')?.addEventListener('click', () => {
        const liters = 42.6;
        const payout = Math.round(liters * state.ratePerLiter);
        const newId = '#GF-0' + Math.floor(430 + Math.random() * 500);
        state.transactions.unshift({
          id: newId,
          date: 'Today, Just Now',
          liters,
          tpc: 26.4,
          payout
        });
        renderSellerPortal();
        showToast(`QR Scan Verified: ${liters} L logged & ₹${payout.toLocaleString('en-IN')} settled (${newId})`);
      });

      const certModal = document.getElementById('certificateModal');
      const regModal = document.getElementById('registrationModal');

      function syncModalBodyScrollLock() {
        const cert = document.getElementById('certificateModal');
        const reg = document.getElementById('registrationModal');
        const iscc = document.getElementById('isccModal');
        const disease = document.getElementById('diseaseDetailModal');
        const isAnyOpen =
          (cert && !cert.classList.contains('hidden')) ||
          (reg && !reg.classList.contains('hidden')) ||
          (iscc && !iscc.classList.contains('hidden')) ||
          (disease && !disease.classList.contains('hidden'));
        document.body.style.overflow = isAnyOpen ? 'hidden' : '';
      }

      function openCertificateModal(tx) {
        if (!certModal) return;
        document.getElementById('certModalId').textContent = tx.id;
        document.getElementById('certModalFbo').textContent = state.fboProfile.name;
        document.getElementById('certModalDate').textContent = tx.date;
        document.getElementById('certModalMetrics').textContent = `${tx.liters.toFixed(1)} L logged (TPC ${tx.tpc}%)`;
        certModal.classList.remove('hidden');
        certModal.classList.add('flex');
        syncModalBodyScrollLock();
      }

      function closeCertificateModal() {
        if (!certModal) return;
        certModal.classList.add('hidden');
        certModal.classList.remove('flex');
        syncModalBodyScrollLock();
      }

      document.getElementById('openSampleCertBtn')?.addEventListener('click', () => openCertificateModal(state.transactions[0]));
      document.getElementById('portalDownloadLatestCertBtn')?.addEventListener('click', () => openCertificateModal(state.transactions[0]));
      document.getElementById('closeCertModalBtn')?.addEventListener('click', closeCertificateModal);
      certModal?.addEventListener('click', (e) => {
        if (e.target === certModal) closeCertificateModal();
      });
      document.getElementById('downloadCertActionBtn')?.addEventListener('click', () => {
        closeCertificateModal();
        showToast('Official FSSAI RUCO Receipt PDF downloaded.');
      });

      function showRegStep(step) {
        [1, 2, 3, 4].forEach(n => {
          document.getElementById('regStep' + n)?.classList.toggle('hidden', n !== step);
        });
        const map = {
          1: ['STEP 1 OF 3', '33%'],
          2: ['STEP 2 OF 3', '66%'],
          3: ['STEP 3 OF 3', '95%'],
          4: ['COMPLETE', '100%']
        };
        if (map[step]) {
          document.getElementById('regStepIndicator').textContent = map[step][0];
          document.getElementById('regProgressPct').textContent = map[step][1];
          document.getElementById('regProgressBar').style.width = map[step][1];
        }
      }

      function openRegModal() {
        emit('open-register');
      }

      function closeRegModal() {
        regModal.classList.add('hidden');
        regModal.classList.remove('flex');
        syncModalBodyScrollLock();
      }

      ['navRegisterBtn', 'heroRegisterBtn', 'footerRegisterBtn', 'footerNavRegisterLink'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', openRegModal);
      });
      document.getElementById('closeRegModalBtn')?.addEventListener('click', closeRegModal);
      regModal?.addEventListener('click', (e) => {
        if (e.target === regModal) closeRegModal();
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeRegModal();
          closeCertificateModal();
          closeIsccModal();
        }
      });

      document.getElementById('regNextStep1Btn')?.addEventListener('click', () => showRegStep(2));
      document.getElementById('regBackStep2Btn')?.addEventListener('click', () => showRegStep(1));
      document.getElementById('regNextStep2Btn')?.addEventListener('click', () => showRegStep(3));
      document.getElementById('regBackStep3Btn')?.addEventListener('click', () => showRegStep(2));

      document.getElementById('regCompleteBtn')?.addEventListener('click', () => {
        const restName = document.getElementById('regRestaurantName')?.value || 'Cluster 04 — Andheri West';
        const newQr = '#GF-0' + Math.floor(420 + Math.random() * 550);
        state.fboProfile.name = restName;
        state.fboProfile.qrId = newQr;
        document.getElementById('regDoneTitle').textContent = `Welcome, ${restName}!`;
        document.getElementById('regGeneratedQrId').textContent = newQr;
        renderSellerPortal();
        showRegStep(4);
      });

      document.getElementById('regGoToDashboardBtn')?.addEventListener('click', () => {
        closeRegModal();
        setViewMode('portal', 'seller', true);
      });

      // --- Navigation & Hero Preview Dashboard Triggers ---
      document.getElementById('navPreviewSellerBtn')?.addEventListener('click', () => {
        setViewMode('portal', 'seller', true);
      });
      document.getElementById('navPreviewCustomerBtn')?.addEventListener('click', () => {
        setViewMode('portal', 'customer', true);
      });
      document.getElementById('heroPreviewSellerBtn')?.addEventListener('click', () => {
        setViewMode('portal', 'seller', true);
      });
      document.getElementById('heroPreviewCustomerBtn')?.addEventListener('click', () => {
        setViewMode('portal', 'customer', true);
      });

      // --- In-Portal Role Switcher Buttons ---
      document.getElementById('portalRoleSellerBtn')?.addEventListener('click', () => {
        setPortalRole('seller');
      });
      document.getElementById('portalRoleCustomerBtn')?.addEventListener('click', () => {
        setPortalRole('customer');
      });

      // --- Disease Clinical Pathology Data & Interactive Modal ---
      const diseaseData = {
        hypertension: {
          code: 'Cardiovascular Impact',
          title: 'Hypertension (Vascular Strain)',
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
          mechanism: 'Repeated heating of cooking oil above 180°C generates lipid hydroperoxides and polar polymers. Regular ingestion depletes endothelial nitric oxide, causing persistent blood vessel constriction, arterial stiffening, and chronic high blood pressure.',
          biomarker: '+42% Arterial Stiffness & Endothelial Strain',
          tpc: 'Breaches 25% FSSAI Limit at 3rd Fry',
          prevention: 'GeoField collects degraded frying oil at 25% TPC via QR-tagged drums, stopping toxic recirculated oils from re-entering restaurants and street food stalls.'
        },
        liver: {
          code: 'Hepatic Impact',
          title: 'Liver Disease (Cellular Toxicity)',
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
          mechanism: 'Toxic aldehydes (such as 4-HNE) formed in reheated oils accumulate in liver cells, damaging cellular mitochondria, accelerating lipid peroxidation, and driving fatty liver inflammation and tissue scarring.',
          biomarker: 'Elevated Liver Enzymes & Oxidative Stress',
          tpc: 'Breaches 25% FSSAI Limit at 3rd Fry',
          prevention: '100% traceable aggregation redirects spent cooking oil from kitchens directly into certified biorefineries for clean biodiesel production.'
        },
        atherosclerosis: {
          code: 'Arterial Impact',
          title: 'Atherosclerosis (Arterial Plaque)',
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
          mechanism: 'Polymeric polar compounds rapidly oxidize LDL cholesterol in the bloodstream. Immune cells absorb oxidized LDL and lodge inside coronary artery walls, building dense plaque that restricts blood flow.',
          biomarker: '+280% Oxidized LDL & Plaque Accumulation',
          tpc: 'Breaches 25% FSSAI Limit at 3rd Fry',
          prevention: 'GeoField pays kitchens an average rate of ₹40/L via instant NEFT, removing any incentive for vendors to reuse or resell spent oil.'
        },
        alzheimers: {
          code: 'Neurological Impact',
          title: 'Alzheimer’s Link (Neurodegenerative Pathology)',
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
          mechanism: 'Peer-reviewed studies by the American Society for Biochemistry and Molecular Biology demonstrate that long-term consumption of reheated oils destabilizes the gut-brain vascular axis. Circulating lipid hydroperoxides compromise the blood-brain barrier, triggering neuro-inflammation and accelerating beta-amyloid and hyperphosphorylated tau plaque aggregation.',
          biomarker: 'Blood-Brain Barrier Breakdown & Tau Aggregation',
          tpc: 'Breaches 25% FSSAI Limit at 3rd Fry',
          prevention: 'Certified closed-loop collection prevents spent commercial oil from ever returning to human nutrition, protecting public neurovascular health.'
        }
      };

      const diseaseDataHi = {
        hypertension: {
          code: 'हृदय एवं रक्तचाप पर प्रभाव',
          title: 'हाइपरटेंशन (उच्च रक्तचाप और धमनियों पर दबाव)',
          mechanism: 'खाद्य तेल को 180°C से ऊपर बार-बार गर्म करने पर उसमें लिपिड हाइड्रोपेरॉक्साइड्स और ज़हरीले पोलर पॉलीमर बनते हैं। ऐसे तेल में बने भोजन के सेवन से रक्त वाहिकाओं में नाइट्रिक ऑक्साइड कम हो जाता है, जिससे धमनियां सख़्त हो जाती हैं और स्थायी रूप से उच्च रक्तचाप (High BP) का ख़तरा बढ़ता है।',
          biomarker: '+42% धमनियों में कड़ापन और रक्तचाप तनाव',
          tpc: 'तीसरी बार तलने पर 25% FSSAI सीमा का उल्लंघन',
          prevention: 'GeoField 25% TPC सीमा पर ही QR-टैग किए गए ड्रमों के ज़रिए खराब तेल को किचन से कलेक्ट कर लेता है, जिससे ज़हरीला तेल दोबारा भोजन में इस्तेमाल नहीं हो पाता।'
        },
        liver: {
          code: 'लिवर एवं पाचन तंत्र पर प्रभाव',
          title: 'गंभीर लिवर रोग (कोशिकीय विषाक्तता)',
          mechanism: 'बार-बार उबाले गए तेल में बनने वाले ज़हरीले एल्डिहाइड (जैसे 4-HNE) सीधे लिवर की कोशिकाओं में जमा होते हैं। ये कोशिकाओं के माइटोकॉन्ड्रिया को नुकसान पहुँचाते हैं और फैटी लिवर, सूजन व लिवर सिरोसिस का कारण बनते हैं।',
          biomarker: 'लिवर एंजाइम में वृद्धि और ऑक्सीडेटिव स्ट्रेस',
          tpc: 'तीसरी बार तलने पर 25% FSSAI सीमा का उल्लंघन',
          prevention: '100% पारदर्शी RUCO नेटवर्क के माध्यम से किचन के इस्तेमाल किए गए तेल को सीधे प्रमाणित बायो-रिफाइनरी में स्वच्छ बायोडीज़ल बनाने के लिए भेजा जाता है।'
        },
        atherosclerosis: {
          code: 'धमनियों में ब्लॉकेज का ख़तरा',
          title: 'एथेरोस्क्लेरोसिस (हृदय की धमनियों में प्लाक जमना)',
          mechanism: 'ज़हरीले पोलर कंपाउंड्स रक्त में मौजूद खराब कोलेस्ट्रॉल (LDL) को तेज़ी से ऑक्सीकृत करते हैं। यह ऑक्सीकृत कोलेस्ट्रॉल हृदय की धमनियों की दीवारों में जमकर उन्हें संकरा (Block) कर देता है, जिससे हार्ट अटैक और स्ट्रोक का जोखिम कई गुना बढ़ जाता है।',
          biomarker: '+280% ऑक्सीकृत LDL और प्लाक का जमाव',
          tpc: 'तीसरी बार तलने पर 25% FSSAI सीमा का उल्लंघन',
          prevention: 'GeoField रेस्तरां और किचन को ₹40/लीटर की औसत दर से तुरंत NEFT भुगतान करता है, जिससे खराब तेल को दोबारा चलाने या अवैध वेंडरों को बेचने की ज़रूरत ही समाप्त हो जाती है।'
        },
        alzheimers: {
          code: 'मस्तिष्क एवं तंत्रिका तंत्र पर प्रभाव',
          title: 'अल्ज़ाइमर और न्यूरो-डीजेनेरेटिव जोखिम',
          mechanism: 'अंतरराष्ट्रीय बायोकेमिस्ट्री शोध बताते हैं कि बार-बार गर्म किए गए तेल के लंबे समय तक सेवन से आंत और मस्तिष्क का तंत्रिका तंत्र प्रभावित होता है। लिपिड पेरॉक्साइड्स ब्लड-ब्रेन बैरियर को नुकसान पहुँचाते हैं, जिससे मस्तिष्क में सूजन और याददाश्त कमजोर होने (Alzheimer’s) का ख़तरा बढ़ता है।',
          biomarker: 'ब्लड-ब्रेन बैरियर क्षति और न्यूरो-इन्फ्लेमेशन',
          tpc: 'तीसरी बार तलने पर 25% FSSAI सीमा का उल्लंघन',
          prevention: 'हमारी प्रमाणित क्लोज़्ड-लूप प्रणाली यह सुनिश्चित करती है कि इस्तेमाल किया गया तेल कभी भी मानव आहार श्रृंखला में वापस न लौटे।'
        }
      };

      const diseaseModal = document.getElementById('diseaseDetailModal');
      function openDiseaseModal(diseaseId) {
        state.activeDiseaseId = diseaseId;
        const baseData = diseaseData[diseaseId];
        if (!baseData || !diseaseModal) return;
        const data = (state.lang === 'hi' && diseaseDataHi[diseaseId]) ? { ...baseData, ...diseaseDataHi[diseaseId] } : baseData;
        document.getElementById('modalDiseaseCode').textContent = data.code;
        document.getElementById('modalDiseaseTitle').textContent = data.title;
        document.getElementById('modalDiseaseIconContainer').innerHTML = baseData.icon;
        document.getElementById('modalDiseaseMechanism').textContent = data.mechanism;
        document.getElementById('modalDiseaseBiomarker').textContent = data.biomarker;
        document.getElementById('modalDiseaseTpc').textContent = data.tpc;
        document.getElementById('modalDiseasePrevention').textContent = data.prevention;
        diseaseModal.classList.remove('hidden');
        diseaseModal.classList.add('flex');
        syncModalBodyScrollLock();
      }

      function closeDiseaseModal() {
        if (!diseaseModal) return;
        diseaseModal.classList.add('hidden');
        diseaseModal.classList.remove('flex');
        syncModalBodyScrollLock();
      }

      document.querySelectorAll('.disease-hazard-card').forEach(card => {
        card.addEventListener('click', () => {
          const diseaseId = card.getAttribute('data-disease-id');
          if (diseaseId) openDiseaseModal(diseaseId);
        });
      });

      document.getElementById('closeDiseaseModalBtn')?.addEventListener('click', closeDiseaseModal);
      document.getElementById('dismissDiseaseModalBtn')?.addEventListener('click', closeDiseaseModal);
      diseaseModal?.addEventListener('click', (e) => {
        if (e.target === diseaseModal) closeDiseaseModal();
      });

      // --- Interactive Drum Preset Buttons (Seller Portal) ---
      document.querySelectorAll('[data-drum-preset]').forEach(btn => {
        btn.addEventListener('click', () => {
          const drums = parseInt(btn.getAttribute('data-drum-preset') || '2', 10);
          const sel = document.getElementById('scheduleDrumQty');
          if (sel) sel.value = String(drums);
          document.querySelectorAll('[data-drum-preset]').forEach(b => {
            b.classList.remove('bg-[#22C55E]/20', 'border-[#22C55E]/60', 'text-[#22C55E]', 'font-semibold');
            b.classList.add('bg-surface-950', 'border-white/10', 'text-gray-300');
          });
          btn.classList.add('bg-[#22C55E]/20', 'border-[#22C55E]/60', 'text-[#22C55E]', 'font-semibold');
          btn.classList.remove('bg-surface-950', 'border-white/10', 'text-gray-300');
          const liters = drums * 50;
          const payout = Math.round(liters * state.ratePerLiter);
          const badge = document.getElementById('sellerSchedulePayoutBadge');
          if (badge) badge.textContent = `Payout: ₹${payout.toLocaleString('en-IN')} NEFT`;
        });
      });

      document.getElementById('scheduleDrumQty')?.addEventListener('change', (e) => {
        const drums = parseInt(e.target.value || '2', 10);
        const liters = drums * 50;
        const payout = Math.round(liters * state.ratePerLiter);
        const badge = document.getElementById('sellerSchedulePayoutBadge');
        if (badge) badge.textContent = `Payout: ₹${payout.toLocaleString('en-IN')} NEFT`;
      });

      // --- Interactive Allocation Volume Presets (Customer Portal) ---
      document.querySelectorAll('[data-alloc-preset]').forEach(btn => {
        btn.addEventListener('click', () => {
          const vol = parseFloat(btn.getAttribute('data-alloc-preset') || '25');
          const sel = document.getElementById('allocationVolume');
          if (sel) sel.value = String(vol);
          document.querySelectorAll('[data-alloc-preset]').forEach(b => {
            b.classList.remove('bg-[#38BDF8]/20', 'border-[#38BDF8]/60', 'text-[#38BDF8]', 'font-semibold');
            b.classList.add('bg-surface-950', 'border-white/10', 'text-gray-300');
          });
          btn.classList.add('bg-[#38BDF8]/20', 'border-[#38BDF8]/60', 'text-[#38BDF8]', 'font-semibold');
          btn.classList.remove('bg-surface-950', 'border-white/10', 'text-gray-300');
          const ghg = (vol * 3.05).toFixed(1);
          const ghgBadge = document.getElementById('custAllocationGhgBadge');
          if (ghgBadge) ghgBadge.textContent = `${ghg} MT CO₂e Abated`;
          const escrowVal = document.getElementById('custEscrowValue');
          if (escrowVal) escrowVal.textContent = `₹${(vol * 0.66).toFixed(2)} Lakhs`;
        });
      });

      document.getElementById('allocationVolume')?.addEventListener('change', (e) => {
        const vol = parseFloat(e.target.value || '25');
        const ghg = (vol * 3.05).toFixed(1);
        const ghgBadge = document.getElementById('custAllocationGhgBadge');
        if (ghgBadge) ghgBadge.textContent = `${ghg} MT CO₂e Abated`;
        const escrowVal = document.getElementById('custEscrowValue');
        if (escrowVal) escrowVal.textContent = `₹${(vol * 0.66).toFixed(2)} Lakhs`;
      });

      // --- Simulate QR Bay Scan Button ---
      document.getElementById('simulateQrScanBayBtn')?.addEventListener('click', () => {
        const liters = 50.0;
        const payout = Math.round(liters * state.ratePerLiter);
        const newId = '#GF-0' + Math.floor(450 + Math.random() * 450);
        state.transactions.unshift({
          id: newId,
          date: 'Today, Bay Scanner',
          liters,
          tpc: 22.4,
          payout
        });
        renderSellerPortal();
        showToast(`QR Bay Scan Complete: ${liters}L logged via Bluetooth scale. Instant NEFT payout: ₹${payout} (${newId})`);
      });

      // --- View Mode Header & Navigation Controls ---
      document.getElementById('modeLandingBtn')?.addEventListener('click', () => setViewMode('landing', null, true));
      document.getElementById('modePortalBtn')?.addEventListener('click', () => emit('open-login'));
      document.getElementById('backToLandingBtn')?.addEventListener('click', () => setViewMode('landing', null, true));

      // --- Portal Interactive Forms & Quick Actions ---
      document.getElementById('customerQuickOrderBtn')?.addEventListener('click', () => {
        const allocForm = document.getElementById('customerAllocationForm');
        if (allocForm) allocForm.scrollIntoView({ behavior: 'smooth' });
      });

      document.getElementById('submitScheduleBtn')?.addEventListener('click', () => {
        const drums = parseInt(document.getElementById('scheduleDrumQty')?.value || '2', 10);
        const dateVal = document.getElementById('schedulePickupDate')?.value || 'Tomorrow';
        const liters = drums * 50;
        const payout = Math.round(liters * state.ratePerLiter);
        const newId = '#GF-0' + Math.floor(450 + Math.random() * 500);
        state.transactions.unshift({
          id: newId,
          date: dateVal,
          liters,
          tpc: 24.8,
          payout
        });
        renderSellerPortal();
        showToast(`Fleet Dispatch Scheduled: ${drums} drums (${liters} L) confirmed for ${dateVal}. Payout: ₹${payout.toLocaleString('en-IN')}`);
      });

      document.getElementById('submitAllocationBtn')?.addEventListener('click', () => {
        const grade = document.getElementById('allocationGrade')?.value || 'HVO';
        const vol = parseFloat(document.getElementById('allocationVolume')?.value || '25');
        const terminal = document.getElementById('allocationTerminal')?.value || 'Dahej';
        const newBatchId = 'GF-ISCC-2024-' + String(Math.floor(100 + Math.random() * 900));
        state.customerBatches.unshift({
          id: newBatchId,
          origin: `${terminal} Aggregate Terminal`,
          volumeMt: vol,
          ffa: grade === 'SAF' ? 2.1 : (grade === 'HVO' ? 2.6 : 3.4),
          moisture: grade === 'SAF' ? 0.28 : 0.35,
          status: 'In Transit',
          ghgAvoided: Math.round(vol * 3.05 * 10) / 10
        });
        renderCustomerPortal();
        showToast(`Batch Allocated: ${vol} MT (${grade} Grade) scheduled to ${terminal} Terminal (${newBatchId})`);
      });

      // --- ISCC PoS Modal Listeners ---
      document.getElementById('closeIsccModalBtn')?.addEventListener('click', closeIsccModal);
      document.getElementById('isccModal')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('isccModal')) closeIsccModal();
      });
      document.getElementById('downloadIsccBtn')?.addEventListener('click', () => {
        closeIsccModal();
        showToast('Official ISCC EU Proof of Sustainability PDF downloaded.');
      });

      // ===================================================================
      // 9. EXECUTIVE SVG SPLINE TELEMETRY CHARTS FOR SELLER & BUYER VIEWS
      // ===================================================================
      const sellerChartDatasets = {
        '6M': [
          { month: 'MAY', full: 'May 2026', liters: 62.0, payout: 2480 },
          { month: 'JUN', full: 'Jun 2026', liters: 78.0, payout: 3120 },
          { month: 'JUL', full: 'Jul 2026', liters: 86.0, payout: 3440 },
          { month: 'AUG', full: 'Aug 2026', liters: 94.0, payout: 3760 },
          { month: 'SEP', full: 'Sep 2026', liters: 112.0, payout: 4480 },
          { month: 'OCT', full: 'Oct 2026 (Current)', liters: 126.0, payout: 5040 }
        ],
        '1Y': [
          { month: 'NOV', full: 'Nov 2025', liters: 44.0, payout: 1760 },
          { month: 'JAN', full: 'Jan 2026', liters: 58.0, payout: 2320 },
          { month: 'MAR', full: 'Mar 2026', liters: 72.0, payout: 2880 },
          { month: 'MAY', full: 'May 2026', liters: 85.0, payout: 3400 },
          { month: 'JUL', full: 'Jul 2026', liters: 104.0, payout: 4160 },
          { month: 'OCT', full: 'Oct 2026 (Current)', liters: 126.0, payout: 5040 }
        ],
        'ALL': [
          { month: '2024 Q3', full: 'Q3 2024', liters: 38.0, payout: 1520 },
          { month: '2024 Q4', full: 'Q4 2024', liters: 54.0, payout: 2160 },
          { month: '2025 Q1', full: 'Q1 2025', liters: 76.0, payout: 3040 },
          { month: '2025 Q3', full: 'Q3 2025', liters: 96.0, payout: 3840 },
          { month: '2026 Q1', full: 'Q1 2026', liters: 114.0, payout: 4560 },
          { month: '2026 Q4', full: 'Q4 2026 (Live)', liters: 126.0, payout: 5040 }
        ]
      };

      const buyerChartDatasets = {
        '6M': [
          { month: 'MAY', full: 'May 2026 (Dahej SEZ)', mt: 18.0, ghg: 54.9, ffa: '2.7%' },
          { month: 'JUN', full: 'Jun 2026 (Dahej SEZ)', mt: 24.0, ghg: 73.2, ffa: '2.6%' },
          { month: 'JUL', full: 'Jul 2026 (Dahej SEZ)', mt: 30.0, ghg: 91.5, ffa: '2.6%' },
          { month: 'AUG', full: 'Aug 2026 (Dahej SEZ)', mt: 36.0, ghg: 109.8, ffa: '2.5%' },
          { month: 'SEP', full: 'Sep 2026 (Dahej SEZ)', mt: 44.0, ghg: 134.2, ffa: '2.5%' },
          { month: 'OCT', full: 'Oct 2026 (Dahej SEZ)', mt: 52.0, ghg: 158.6, ffa: '2.4%' }
        ],
        '1Y': [
          { month: 'NOV', full: 'Nov 2025', mt: 12.0, ghg: 36.6, ffa: '2.8%' },
          { month: 'JAN', full: 'Jan 2026', mt: 19.5, ghg: 59.5, ffa: '2.7%' },
          { month: 'MAR', full: 'Mar 2026', mt: 26.0, ghg: 79.3, ffa: '2.6%' },
          { month: 'MAY', full: 'May 2026', mt: 33.5, ghg: 102.2, ffa: '2.5%' },
          { month: 'JUL', full: 'Jul 2026', mt: 43.0, ghg: 131.2, ffa: '2.5%' },
          { month: 'OCT', full: 'Oct 2026 (Peak)', mt: 52.0, ghg: 158.6, ffa: '2.4%' }
        ],
        'ALL': [
          { month: '2024 Q3', full: 'Q3 2024', mt: 10.0, ghg: 30.5, ffa: '2.9%' },
          { month: '2024 Q4', full: 'Q4 2024', mt: 18.0, ghg: 54.9, ffa: '2.8%' },
          { month: '2025 Q1', full: 'Q1 2025', mt: 27.5, ghg: 83.9, ffa: '2.7%' },
          { month: '2025 Q3', full: 'Q3 2025', mt: 35.0, ghg: 106.8, ffa: '2.6%' },
          { month: '2026 Q1', full: 'Q1 2026', mt: 44.5, ghg: 135.7, ffa: '2.5%' },
          { month: '2026 Q4', full: 'Q4 2026 (Live)', mt: 52.0, ghg: 158.6, ffa: '2.4%' }
        ]
      };

      state.sellerChartRange = '6M';
      state.buyerChartRange = '6M';
      state.sellerComputedPts = [];
      state.buyerComputedPts = [];

      function selectSellerNode(pt) {
        if (!pt) return;
        const dot = document.getElementById('sellerChartActiveDot');
        const halo = document.getElementById('sellerChartActiveHalo');
        const scrub = document.getElementById('sellerChartScrubLine');
        const periodEl = document.getElementById('sellerChartPeriodLabel');
        const volEl = document.getElementById('sellerChartVolReadout');
        const payEl = document.getElementById('sellerChartPayoutReadout');
        if (dot) { dot.setAttribute('cx', String(pt.x)); dot.setAttribute('cy', String(pt.y)); }
        if (halo) { halo.setAttribute('cx', String(pt.x)); halo.setAttribute('cy', String(pt.y)); }
        if (scrub) { scrub.setAttribute('x1', String(pt.x)); scrub.setAttribute('x2', String(pt.x)); }
        if (periodEl) periodEl.textContent = pt.full;
        if (volEl) volEl.textContent = `${pt.liters.toFixed(1)} Liters`;
        if (payEl) payEl.textContent = `₹${pt.payout.toLocaleString('en-IN')} (@ ₹40/L)`;

        document.querySelectorAll('[data-seller-pill-idx]').forEach(btn => {
          const idx = parseInt(btn.getAttribute('data-seller-pill-idx'), 10);
          const isMatch = state.sellerComputedPts[idx] === pt;
          btn.className = isMatch
            ? 'px-2.5 py-1 rounded-lg bg-[#22C55E]/20 border border-[#22C55E]/55 font-mono text-[10px] text-[#4ADE80] font-bold transition shrink-0'
            : 'px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition shrink-0';
        });
      }

      function renderSellerAnalyticsChart() {
        const series = sellerChartDatasets[state.sellerChartRange] || sellerChartDatasets['6M'];
        let totalVol = 0;
        state.transactions.forEach(t => { totalVol += t.liters; });
        const extraLiters = Math.max(0, totalVol - 412.0);
        const maxVal = Math.max(145, ...series.map((d, idx) => idx === series.length - 1 ? d.liters + extraLiters : d.liters)) * 1.06;

        const pts = series.map((d, idx) => {
          const x = Math.round(64 + idx * (536 / (series.length - 1)));
          const val = idx === series.length - 1 ? +(d.liters + extraLiters).toFixed(1) : d.liters;
          const pay = Math.round(val * state.ratePerLiter);
          const y = Math.round(152 - ((val / maxVal) * 124));
          const payY = Math.round(152 - ((val / maxVal) * 108));
          return { x, y, payY, month: d.month, full: d.full, liters: val, payout: pay };
        });
        state.sellerComputedPts = pts;

        const lineD = buildSmoothSplinePath(pts);
        const areaD = `${lineD} L ${pts[pts.length - 1].x} 154 L ${pts[0].x} 154 Z`;
        const payD = buildSmoothSplinePath(pts.map(p => ({ x: p.x, y: p.payY })));

        document.getElementById('sellerVolumeLinePath')?.setAttribute('d', lineD);
        document.getElementById('sellerVolumeGlowPath')?.setAttribute('d', lineD);
        document.getElementById('sellerAreaPath')?.setAttribute('d', areaD);
        document.getElementById('sellerPayoutLinePath')?.setAttribute('d', payD);

        const nodesGroup = document.getElementById('sellerChartNodesGroup');
        const xAxisGroup = document.getElementById('sellerChartXAxisGroup');
        const pillsWrap = document.getElementById('sellerMobileNodePills');

        if (nodesGroup) {
          nodesGroup.innerHTML = pts.map((p, idx) => `
            <g class="cursor-pointer" data-seller-pt-idx="${idx}">
              <circle cx="${p.x}" cy="${p.y}" r="24" fill="transparent" />
              <circle cx="${p.x}" cy="${p.payY}" r="3.2" fill="#F59E0B" opacity="0.88" />
              <circle class="chart-data-node" cx="${p.x}" cy="${p.y}" r="5" fill="#060A08" stroke="#22C55E" stroke-width="2.6" />
              <text x="${p.x}" y="${p.y - 12}" text-anchor="middle" fill="${idx === pts.length - 1 ? '#4ADE80' : 'rgba(243,244,246,0.92)'}" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">${Math.round(p.liters)}L</text>
            </g>
          `).join('');
          nodesGroup.querySelectorAll('[data-seller-pt-idx]').forEach(g => {
            g.addEventListener('click', () => {
              const i = parseInt(g.getAttribute('data-seller-pt-idx'), 10);
              selectSellerNode(state.sellerComputedPts[i]);
            });
          });
        }
        if (xAxisGroup) {
          xAxisGroup.innerHTML = pts.map((p, idx) => `
            <text x="${p.x}" y="177" fill="${idx === pts.length - 1 ? '#4ADE80' : 'rgba(209,213,219,0.82)'}" font-weight="${idx === pts.length - 1 ? '700' : '500'}">${p.month}</text>
          `).join('');
        }
        if (pillsWrap) {
          pillsWrap.innerHTML = pts.map((p, idx) => `
            <button type="button" data-seller-pill-idx="${idx}" class="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition shrink-0">
              ${p.month}
            </button>
          `).join('');
          pillsWrap.querySelectorAll('[data-seller-pill-idx]').forEach(btn => {
            btn.addEventListener('click', () => {
              const i = parseInt(btn.getAttribute('data-seller-pill-idx'), 10);
              selectSellerNode(state.sellerComputedPts[i]);
            });
          });
        }
        selectSellerNode(pts[pts.length - 1]);
      }

      function selectBuyerNode(pt) {
        if (!pt) return;
        const dot = document.getElementById('buyerChartActiveDot');
        const halo = document.getElementById('buyerChartActiveHalo');
        const scrub = document.getElementById('buyerChartScrubLine');
        const periodEl = document.getElementById('buyerChartPeriodLabel');
        const mtEl = document.getElementById('buyerChartMtReadout');
        const ghgEl = document.getElementById('buyerChartGhgReadout');
        if (dot) { dot.setAttribute('cx', String(pt.x)); dot.setAttribute('cy', String(pt.y)); }
        if (halo) { halo.setAttribute('cx', String(pt.x)); halo.setAttribute('cy', String(pt.y)); }
        if (scrub) { scrub.setAttribute('x1', String(pt.x)); scrub.setAttribute('x2', String(pt.x)); }
        if (periodEl) periodEl.textContent = pt.full;
        if (mtEl) mtEl.textContent = `${pt.mt.toFixed(1)} MT (FFA ${pt.ffa})`;
        if (ghgEl) ghgEl.textContent = `${pt.ghg.toFixed(1)} MT CO₂e`;

        document.querySelectorAll('[data-buyer-pill-idx]').forEach(btn => {
          const idx = parseInt(btn.getAttribute('data-buyer-pill-idx'), 10);
          const isMatch = state.buyerComputedPts[idx] === pt;
          btn.className = isMatch
            ? 'px-2.5 py-1 rounded-lg bg-[#38BDF8]/20 border border-[#38BDF8]/55 font-mono text-[10px] text-[#7DD3FC] font-bold transition shrink-0'
            : 'px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition shrink-0';
        });
      }

      function renderBuyerAnalyticsChart() {
        const series = buyerChartDatasets[state.buyerChartRange] || buyerChartDatasets['6M'];
        let totalMt = 0;
        state.customerBatches.forEach(b => { totalMt += b.volumeMt; });
        const extraMt = Math.max(0, totalMt - 126.5);
        const maxVal = Math.max(60, ...series.map((d, idx) => idx === series.length - 1 ? d.mt + extraMt : d.mt)) * 1.08;

        const pts = series.map((d, idx) => {
          const x = Math.round(64 + idx * (536 / (series.length - 1)));
          const val = idx === series.length - 1 ? +(d.mt + extraMt).toFixed(1) : d.mt;
          const ghg = +(val * 3.05).toFixed(1);
          const y = Math.round(152 - ((val / maxVal) * 124));
          const ghgY = Math.round(152 - ((val / maxVal) * 108));
          return { x, y, ghgY, month: d.month, full: d.full, mt: val, ghg, ffa: d.ffa };
        });
        state.buyerComputedPts = pts;

        const lineD = buildSmoothSplinePath(pts);
        const areaD = `${lineD} L ${pts[pts.length - 1].x} 154 L ${pts[0].x} 154 Z`;
        const ghgD = buildSmoothSplinePath(pts.map(p => ({ x: p.x, y: p.ghgY })));

        document.getElementById('buyerFeedstockLinePath')?.setAttribute('d', lineD);
        document.getElementById('buyerFeedstockGlowPath')?.setAttribute('d', lineD);
        document.getElementById('buyerAreaPath')?.setAttribute('d', areaD);
        document.getElementById('buyerGhgLinePath')?.setAttribute('d', ghgD);

        const nodesGroup = document.getElementById('buyerChartNodesGroup');
        const xAxisGroup = document.getElementById('buyerChartXAxisGroup');
        const pillsWrap = document.getElementById('buyerMobileNodePills');

        if (nodesGroup) {
          nodesGroup.innerHTML = pts.map((p, idx) => `
            <g class="cursor-pointer" data-buyer-pt-idx="${idx}">
              <circle cx="${p.x}" cy="${p.y}" r="24" fill="transparent" />
              <circle cx="${p.x}" cy="${p.ghgY}" r="3.2" fill="#22C55E" opacity="0.88" />
              <circle class="chart-data-node" cx="${p.x}" cy="${p.y}" r="5" fill="#060A08" stroke="#38BDF8" stroke-width="2.6" />
              <text x="${p.x}" y="${p.y - 12}" text-anchor="middle" fill="${idx === pts.length - 1 ? '#7DD3FC' : 'rgba(243,244,246,0.92)'}" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">${Math.round(p.mt)}MT</text>
            </g>
          `).join('');
          nodesGroup.querySelectorAll('[data-buyer-pt-idx]').forEach(g => {
            g.addEventListener('click', () => {
              const i = parseInt(g.getAttribute('data-buyer-pt-idx'), 10);
              selectBuyerNode(state.buyerComputedPts[i]);
            });
          });
        }
        if (xAxisGroup) {
          xAxisGroup.innerHTML = pts.map((p, idx) => `
            <text x="${p.x}" y="177" fill="${idx === pts.length - 1 ? '#38BDF8' : 'rgba(209,213,219,0.82)'}" font-weight="${idx === pts.length - 1 ? '700' : '500'}">${p.month}</text>
          `).join('');
        }
        if (pillsWrap) {
          pillsWrap.innerHTML = pts.map((p, idx) => `
            <button type="button" data-buyer-pill-idx="${idx}" class="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[10px] text-gray-300 hover:text-white transition shrink-0">
              ${p.month}
            </button>
          `).join('');
          pillsWrap.querySelectorAll('[data-buyer-pill-idx]').forEach(btn => {
            btn.addEventListener('click', () => {
              const i = parseInt(btn.getAttribute('data-buyer-pill-idx'), 10);
              selectBuyerNode(state.buyerComputedPts[i]);
            });
          });
        }
        selectBuyerNode(pts[pts.length - 1]);
      }

      // Pointer & Touch scrub on Seller & Buyer SVG Charts
      const sellerSvgEl = document.getElementById('sellerAnalyticsSvg');
      if (sellerSvgEl) {
        let sellerRaf = null;
        function scrubSellerAtX(clientX) {
          if (!state.sellerComputedPts.length || sellerRaf) return;
          sellerRaf = requestAnimationFrame(() => {
            const rect = sellerSvgEl.getBoundingClientRect();
            const relX = ((clientX - rect.left) / Math.max(1, rect.width)) * 640;
            let closest = state.sellerComputedPts[0];
            let minDiff = Infinity;
            state.sellerComputedPts.forEach(p => {
              const d = Math.abs(p.x - relX);
              if (d < minDiff) { minDiff = d; closest = p; }
            });
            selectSellerNode(closest);
            sellerRaf = null;
          });
        }
        sellerSvgEl.addEventListener('pointerdown', (e) => scrubSellerAtX(e.clientX), { passive: true });
        sellerSvgEl.addEventListener('pointermove', (e) => scrubSellerAtX(e.clientX), { passive: true });
        sellerSvgEl.addEventListener('touchstart', (e) => {
          if (e.touches && e.touches[0]) scrubSellerAtX(e.touches[0].clientX);
        }, { passive: true });
        sellerSvgEl.addEventListener('touchmove', (e) => {
          if (e.touches && e.touches[0]) scrubSellerAtX(e.touches[0].clientX);
        }, { passive: true });
      }

      const buyerSvgEl = document.getElementById('customerAnalyticsSvg');
      if (buyerSvgEl) {
        let buyerRaf = null;
        function scrubBuyerAtX(clientX) {
          if (!state.buyerComputedPts.length || buyerRaf) return;
          buyerRaf = requestAnimationFrame(() => {
            const rect = buyerSvgEl.getBoundingClientRect();
            const relX = ((clientX - rect.left) / Math.max(1, rect.width)) * 640;
            let closest = state.buyerComputedPts[0];
            let minDiff = Infinity;
            state.buyerComputedPts.forEach(p => {
              const d = Math.abs(p.x - relX);
              if (d < minDiff) { minDiff = d; closest = p; }
            });
            selectBuyerNode(closest);
            buyerRaf = null;
          });
        }
        buyerSvgEl.addEventListener('pointerdown', (e) => scrubBuyerAtX(e.clientX), { passive: true });
        buyerSvgEl.addEventListener('pointermove', (e) => scrubBuyerAtX(e.clientX), { passive: true });
        buyerSvgEl.addEventListener('touchstart', (e) => {
          if (e.touches && e.touches[0]) scrubBuyerAtX(e.touches[0].clientX);
        }, { passive: true });
        buyerSvgEl.addEventListener('touchmove', (e) => {
          if (e.touches && e.touches[0]) scrubBuyerAtX(e.touches[0].clientX);
        }, { passive: true });
      }

      // Mobile Quick-Access Bar Listeners
      document.getElementById('mobileQuickSellerBtn')?.addEventListener('click', () => {
        setViewMode('portal', 'seller', true);
      });
      document.getElementById('mobileQuickBuyerBtn')?.addEventListener('click', () => {
        setViewMode('portal', 'customer', true);
      });

      document.querySelectorAll('.seller-range-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          state.sellerChartRange = btn.getAttribute('data-seller-range') || '6M';
          document.querySelectorAll('.seller-range-btn').forEach(b => {
            b.className = 'seller-range-btn px-2.5 py-1 rounded-lg text-gray-400 hover:text-white transition';
          });
          btn.className = 'seller-range-btn px-2.5 py-1 rounded-lg bg-[#22C55E]/20 text-[#22C55E] font-bold transition';
          renderSellerAnalyticsChart();
        });
      });

      document.querySelectorAll('.buyer-range-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          state.buyerChartRange = btn.getAttribute('data-buyer-range') || '6M';
          document.querySelectorAll('.buyer-range-btn').forEach(b => {
            b.className = 'buyer-range-btn px-2.5 py-1 rounded-lg text-gray-400 hover:text-white transition';
          });
          btn.className = 'buyer-range-btn px-2.5 py-1 rounded-lg bg-[#38BDF8]/20 text-[#38BDF8] font-bold transition';
          renderBuyerAnalyticsChart();
        });
      });

      // ===================================================================
      // 10. FLAWLESS ENGLISH <-> HINDI (हिंदी) TRANSCREATION ENGINE
      // ===================================================================
      const I18N = {
        en: {
          nav_crisis: 'THE CRISIS',
          nav_process: 'THE PROCESS',
          nav_impact: 'IMPACT',
          nav_contact: 'CONTACT',
          nav_seller_kitchen: 'Seller Kitchen',
          nav_buyer_refinery: 'Buyer Refinery',
          nav_sign_in: 'SIGN IN',
          nav_landing: 'LANDING',
          nav_join: 'JOIN NETWORK',
          mob_seller_view: 'Seller Graph & View',
          mob_buyer_view: 'Buyer Graph & View',
          mob_impact_graph: 'Impact Graph',
          mob_crisis: 'The Crisis',
          mob_process: 'Process',

          hero_eyebrow: 'RUCO AGGREGATION NETWORK — INDIA',
          hero_h1_line1: 'Stop the',
          hero_h1_line2: 'Toxic Cycle.',
          hero_h1_line3: 'Start the',
          hero_h1_line4: 'Green Revenue.',
          hero_subtitle: 'Join India’s smartest RUCO aggregation network. We take the hassle out of FSSAI compliance with instant QR-based disposal, cluster-based pickups, and real-time environmental tracking.',
          hero_seller_tag: 'For Kitchens',
          hero_seller_rate: '₹40/L Avg',
          hero_seller_title: 'Seller Dashboard',
          hero_seller_sub: 'Schedule QR Pickups & NEFT',
          hero_buyer_tag: 'For Refineries',
          hero_buyer_title: 'Customer Dashboard',
          hero_buyer_sub: 'Procure Bulk UCO & PoS',
          hero_register_cta: 'Register Your Kitchen in 60s',
          hero_rate_note: 'Avg Rate <strong class="text-white">₹40/Liter</strong> &bull; Instant NEFT Settlement',
          hero_vertical_label: 'WASTE → ENERGY',
          hero_scan_verified: 'SCAN VERIFIED',
          hero_fssai_receipt: 'FSSAI RECEIPT',
          hero_live_route: 'LIVE ROUTE',
          hero_co2_offset: 'CO₂ OFFSET',
          hero_clusters_header: 'VERIFIED KITCHEN CLUSTERS',
          hero_tap_cluster: 'TAP CLUSTER FEED',
          cluster_btn_1: '04 Andheri',
          cluster_btn_2: '01 Lower Parel',
          cluster_btn_3: '02 Pune',
          cluster_btn_4: '03 BKC Hub',

          mq_1: 'ISCC CERTIFIED',
          mq_2: 'ZERO-HAZARD KITCHEN NETWORK',
          mq_3: 'ISCC CERTIFIED AGGREGATION',
          mq_4: 'FSSAI COMPLIANT',
          mq_5: 'INSTANT BANK PAYOUTS',

          threat_eyebrow: 'THE THREAT',
          threat_title_html: 'The <span class="text-[#EF4444]">60%</span> Crisis<br />in Your Kitchen.',
          threat_desc: 'Shockingly, nearly 60% of all Used Cooking Oil generated in India finds its way back into the food stream — resold by informal vendors, reheated, and returned to the plate. Every reheat multiplies toxic Total Polar Compounds.',
          threat_60_label: 'HIGH RISK',
          threat_60_desc: 'of UCO in India returns to the food stream through illegal recirculation.',
          reheat_title: 'TEST REHEAT TPC',
          reheat_btn_14: '1st Fry (14%)',
          reheat_btn_25: '3rd Fry (25% Limit)',
          reheat_btn_38: '6th Fry (38% Toxic)',

          disease_grid_header: 'Clinical Health Impact of Reheated Oil',
          disease_grid_hint: 'Select card for details',
          dis_1_tag: 'Vascular Strain',
          dis_1_title: 'Hypertension',
          dis_1_desc: 'Cardiovascular strain from oxidised fats and depleted vascular nitric oxide.',
          dis_1_sub: 'Endothelial Stiffness',
          dis_2_tag: 'Hepatic Toxicity',
          dis_2_title: 'Liver Disease',
          dis_2_desc: 'Cellular toxicity and aldehyde compounds accumulate with every reheat.',
          dis_2_sub: '4-HNE Lipid Stress',
          dis_3_tag: 'Arterial Plaque',
          dis_3_title: 'Atherosclerosis',
          dis_3_desc: 'Vascular plaque from polar compounds oxidises LDL and narrows arteries.',
          dis_3_sub: 'Oxidised LDL Surge',
          dis_4_tag: 'Neuro-Vascular',
          dis_4_title: 'Alzheimer’s Link',
          dis_4_desc: 'Neurodegenerative risk markers linked to peroxidised cooking oil intake.',
          dis_4_sub: 'Blood-Brain Barrier',
          dis_clinical_brief: 'Clinical Brief',
          dis_protect_title: 'GeoField Closed-Loop Protection',
          dis_protect_desc: 'Diverts 100% of collected kitchen oil into certified clean biodiesel',
          dis_ruco_verified: 'RUCO Verified',

          dis_modal_advisory: 'FSSAI Food Safety Advisory',
          dis_modal_mech_lbl: 'Physiological Attack Mechanism',
          dis_modal_bio_lbl: 'Biomarker Impact',
          dis_modal_tpc_lbl: 'FSSAI TPC Limit Breached',
          dis_modal_prev_lbl: 'GeoField RUCO Interception Protocol',
          dis_modal_act_lbl: 'Section 2.1 Food Safety & Standards Act',
          dis_modal_close_btn: 'Acknowledged & Close ×',

          proc_eyebrow: 'THE PROCESS',
          proc_title_html: 'Frictionless Disposal.<br /><span class="text-[#16A34A]">Zero Interruptions.</span>',
          proc_desc: 'Three steps between your kitchen and full FSSAI compliance. No calls, no paperwork, no waiting on informal collectors.',
          proc_wp_1: 'QR ASSIGNED',
          proc_wp_2: 'CLUSTER PICKUP',
          proc_wp_3: 'INSTANT RECEIPT',
          proc_1_badge: '✓ 60-SECOND ONBOARDING',
          proc_1_title: 'Register & Get Your QR',
          proc_1_desc: 'Sign up in 60 seconds and receive a unique, waterproof QR code assigned directly to your restaurant.',
          proc_1_pipe: 'STEP 01 PIPELINE',
          proc_1_status: 'READY',
          proc_2_badge: '✓ AI CLUSTER ROUTING',
          proc_2_title: 'Cluster-Based Pickups',
          proc_2_desc: 'Our hyper-local fleet runs optimised cluster routes — oil is collected quickly, cleanly, and on schedule.',
          proc_2_pipe: 'STEP 02 PIPELINE',
          proc_2_status: 'ACTIVE STAGE',
          proc_3_badge: '✓ DIGITAL FSSAI RECEIPT',
          proc_3_title: 'Scan & Done',
          proc_3_desc: 'The agent scans your QR, weight is auto-logged, and a digital FSSAI-compliant receipt is issued instantly.',
          proc_3_pipe: 'STEP 03 PIPELINE',
          proc_3_status: 'INSTANT SETTLE',
          proc_bottom_cta: 'THEN WATCH WHAT YOUR OIL BECOMES',

          imp_eyebrow: 'THE REWARD',
          imp_title_1: 'Track Your',
          imp_title_2: 'Green Footprint.',
          imp_desc: 'Every litre you hand over is weighed, certified, and traced to a refinery. Your dashboard turns compliance into a story worth telling — and a payout worth collecting.',
          imp_sample_badge: 'DASHBOARD PREVIEW — SAMPLE DATA',
          imp_scale_label: 'SELECT KITCHEN SCALE TIER',
          imp_preset_1: 'QSR Hub',
          imp_preset_2: 'Sample',
          imp_preset_3: 'Cloud 18k',
          imp_preset_4: 'Hotel 26k',
          imp_console_title: 'GEOFIELD IMPACT CONSOLE',
          imp_receipt_pdf: '[RECEIPT PDF]',
          imp_live: 'LIVE',
          imp_mom_tag: '↗ +18% MoM',
          imp_metric_1: 'LITERS RECYCLED',
          imp_metric_2: 'CARBON OFFSET',
          imp_protected_tag: '↗ PROTECTED',
          imp_metric_3: 'WATER SAVED',
          imp_rate_tag: '↗ ₹40/L VERIFIED',
          imp_metric_4: 'REVENUE GENERATED',
          imp_vel_title: 'COLLECTION VELOCITY — 12 WEEKS',
          imp_tap_week: 'Tap Week:',
          imp_w12_peak: 'W12 Peak',

          join_eyebrow: 'JOIN THE NETWORK',
          join_title_1: 'Ready to clean up',
          join_title_2: 'your kitchen — and',
          join_title_3: 'your conscience?',
          join_desc: 'Registration takes 60 seconds. Our agents take care of the rest.',
          join_cta: 'REGISTER NOW',
          join_trust_bar: 'NO HARDWARE TO BUY  ·  NO CONTRACTS TO SIGN  ·  QR KIT SHIPS IN 48H',

          footer_tagline: 'Powering the clean-energy transition through traceable, compliant supply chains.',
          footer_contact_hdr: 'CONTACT',
          footer_support: 'SUPPORT',
          footer_office: 'OFFICE',
          footer_city: 'Mumbai, Maharashtra, India',
          footer_nav_hdr: 'NAVIGATE',
          footer_nav_1: 'The Crisis',
          footer_nav_2: 'The Process',
          footer_nav_3: 'Impact',
          footer_nav_4: 'Register',
          footer_bottom_right: 'WASTE → ENERGY  ·  TRACEABLE  ·  COMPLIANT',

          reg_s1_title: 'Join the Clean Network',
          reg_s1_desc: 'Get your restaurant’s static QR code in 60 seconds.',
          reg_s1_name: 'Your Name',
          reg_s1_phone: 'Mobile / WhatsApp Number',
          reg_continue: 'Continue →',
          reg_s2_title: 'Kitchen Details',
          reg_s2_desc: 'Assign your establishment to a local collection cluster.',
          reg_s2_rest: 'Restaurant / Kitchen Name',
          reg_s2_vol: 'Weekly Used Oil Volume',

          portal_sim_qr: '+ Simulate QR Pickup',
          portal_req_batch: '+ Request Feedstock Batch',
          portal_back_home: '← Back to Home',
          reg_opt_1: '50 – 250 Liters / week',
          reg_opt_2: 'Under 50 Liters / week',
          reg_opt_3: '250+ Liters / week',
          reg_back: 'Back',
          reg_s3_title: 'Pickup Cluster',
          reg_s3_desc: 'Your waterproof QR kit ships within 48 hours.',
          reg_s3_area: 'Area / City',
          reg_mint_qr: 'Mint QR & Complete ↗',
          reg_done_title: 'You’re In!',
          reg_done_prefix: 'Your location-specific QR receipt ID',
          reg_done_suffix: 'is active.',
          reg_open_console: 'Open Seller Console →',
          cert_modal_title: 'Official Traceable Disposal Receipt',
          cert_lbl_id: 'RECEIPT ID',
          cert_lbl_fbo: 'SOURCE KITCHEN',
          cert_lbl_date: 'COLLECTION DATE',
          cert_lbl_vol: 'VERIFIED VOLUME',
          cert_lbl_esg: 'ESG OFFSET',
          cert_download_btn: 'Download PDF Receipt',
          sel_kpi1_sub: '4 DRUMS VERIFIED',
          sel_kpi2_title: 'GREEN REVENUE',
          sel_kpi2_sub1: 'SETTLEMENT',
          sel_kpi2_sub2: '100% PAID',
          sel_kpi3_sub1: 'BIODIESEL YIELD',
          sel_kpi4_sub1: 'ZERO DRAINAGE',
          sel_chart_eyebrow: 'REVENUE & VOLUME TELEMETRY',
          sel_chart_title: 'Collection Volume & Instant NEFT Settlement Curve',
          sel_leg_liters: 'Liters Logged',
          sel_leg_payout: 'NEFT Payout (₹)',
          sel_ledger_title: 'Collection Ledger & FSSAI Audit Receipts',
          sel_ledger_sub: 'Tamper-proof disposal certificates ready for municipal & FSSAI inspection',
          sel_ledger_badge: 'AUTO-SYNCED LEDGER',
          buy_chart_eyebrow: 'REFINERY INFLOW TELEMETRY',
          buy_chart_title: 'Certified UCO Feedstock Delivery (MT) & GHG Abatement'
        },
        hi: {
          nav_crisis: 'गंभीर संकट',
          nav_process: 'कार्य-प्रणाली',
          nav_impact: 'प्रभाव व कमाई',
          nav_contact: 'संपर्क करें',
          nav_seller_kitchen: 'किचन सेलर',
          nav_buyer_refinery: 'रिफाइनरी बायर',
          nav_sign_in: 'साइन इन',
          nav_landing: 'होम पेज',
          nav_join: 'नेटवर्क से जुड़ें',
          mob_seller_view: 'सेलर ग्राफ़ व डैशबोर्ड',
          mob_buyer_view: 'बायर ग्राफ़ व डैशबोर्ड',
          mob_impact_graph: 'प्रभाव ग्राफ़',
          mob_crisis: 'गंभीर संकट',
          mob_process: 'प्रक्रिया',

          hero_eyebrow: 'RUCO एकत्रीकरण नेटवर्क — भारत',
          hero_h1_line1: 'रोकें यह',
          hero_h1_line2: 'ज़हरीला चक्र।',
          hero_h1_line3: 'शुरू करें नई',
          hero_h1_line4: 'हरित कमाई।',
          hero_subtitle: 'भारत के सबसे भरोसेमंद और स्मार्ट RUCO नेटवर्क से जुड़ें। इंस्टेंट QR-आधारित तेल निपटान, समयबद्ध क्लस्टर पिकअप और रियल-टाइम पर्यावरण ट्रैकिंग के साथ हम आपके किचन के FSSAI अनुपालन को बेहद आसान और लाभदायक बनाते हैं।',
          hero_seller_tag: 'रेस्तरां व किचन के लिए',
          hero_seller_rate: '₹40/L औसत',
          hero_seller_title: 'सेलर डैशबोर्ड (Seller)',
          hero_seller_sub: 'QR पिकअप और तुरंत NEFT भुगतान',
          hero_buyer_tag: 'रिफाइनरी के लिए',
          hero_buyer_title: 'कस्टमर डैशबोर्ड (Buyer)',
          hero_buyer_sub: 'थोक UCO खरीद और ISCC प्रमाण-पत्र',
          hero_register_cta: '60 सेकंड में अपना किचन रजिस्टर करें',
          hero_rate_note: 'औसत दर <strong class="text-white">₹40/लीटर</strong> &bull; सीधा बैंक में तुरंत NEFT भुगतान',
          hero_vertical_label: 'अपशिष्ट तेल → स्वच्छ ऊर्जा',
          hero_scan_verified: 'QR स्कैन सत्यापित',
          hero_fssai_receipt: 'FSSAI प्रमाण-रसीद',
          hero_live_route: 'लाइव रूट',
          hero_co2_offset: 'CO₂ की बचत',
          hero_clusters_header: 'सत्यापित किचन क्लस्टर',
          hero_tap_cluster: 'क्लस्टर चुनें',
          cluster_btn_1: '04 अंधेरी',
          cluster_btn_2: '01 लोअर परेल',
          cluster_btn_3: '02 पुणे',
          cluster_btn_4: '03 BKC हब',

          mq_1: 'ISCC प्रमाणित',
          mq_2: 'सुरक्षित ज़ीरो-हज़ार्ड किचन नेटवर्क',
          mq_3: 'ISCC प्रमाणित तेल एकत्रीकरण',
          mq_4: '100% FSSAI मानकों के अनुरूप',
          mq_5: 'तुरंत बैंक (NEFT) भुगतान',

          threat_eyebrow: 'गंभीर स्वास्थ्य संकट',
          threat_title_html: 'आपकी रसोई में छिपा<br /><span class="text-[#EF4444]">60%</span> का गंभीर संकट।',
          threat_desc: 'चौंकाने वाला सच यह है कि भारत में इस्तेमाल किए गए कुल खाद्य तेल (UCO) का लगभग 60% हिस्सा अनौपचारिक वेंडरों के ज़रिए दोबारा बाज़ार और खाने की थाली में लौट आता है। तेल को बार-बार गर्म करने से उसमें जानलेवा टोटल पोलर कंपाउंड्स (TPC) तेज़ी से बढ़ते हैं।',
          threat_60_label: 'अत्यधिक जोखिम (HIGH RISK)',
          threat_60_desc: 'भारत में इस्तेमाल किया गया खाद्य तेल अवैध री-सर्कुलेशन के ज़रिए दोबारा खाने-पीने के बाज़ार में वापस आ जाता है।',
          reheat_title: 'तेल की री-हीटिंग (TPC) जाँचें',
          reheat_btn_14: 'पहली बार (14%)',
          reheat_btn_25: 'तीसरी बार (25% सीमा)',
          reheat_btn_38: 'छठी बार (38% ज़हरीला)',

          disease_grid_header: 'बार-बार उबाले गए तेल के गंभीर स्वास्थ्य दुष्प्रभाव',
          disease_grid_hint: 'विस्तृत जानकारी के लिए कार्ड चुनें',
          dis_1_tag: 'रक्तचाप पर दबाव',
          dis_1_title: 'हाइपरटेंशन (High BP)',
          dis_1_desc: 'ऑक्सीकृत वसा और नाइट्रिक ऑक्साइड की कमी से धमनियों में कड़ापन आता है और हृदय पर सीधा दबाव पड़ता है।',
          dis_1_sub: 'धमनियों में कड़ापन',
          dis_2_tag: 'लिवर को नुकसान',
          dis_2_title: 'गंभीर लिवर रोग',
          dis_2_desc: 'तेल को हर बार दोबारा उबालने पर उसमें 4-HNE जैसे ज़हरीले तत्व बनते हैं, जो लिवर की कोशिकाओं को क्षतिग्रस्त करते हैं।',
          dis_2_sub: '4-HNE लिपिड विषाक्तता',
          dis_3_tag: 'धमनियों में ब्लॉकेज',
          dis_3_title: 'एथेरोस्क्लेरोसिस (हार्ट ब्लॉकेज)',
          dis_3_desc: 'पोलर कंपाउंड्स खून में खराब कोलेस्ट्रॉल (LDL) को ऑक्सीकृत कर धमनियों में प्लाक जमाते हैं और रक्त प्रवाह रोकते हैं।',
          dis_3_sub: 'ऑक्सीकृत LDL में वृद्धि',
          dis_4_tag: 'मस्तिष्क पर असर',
          dis_4_title: 'अल्ज़ाइमर का जोखिम',
          dis_4_desc: 'खराब और जले हुए तेल के लगातार सेवन से मस्तिष्क की नसों में सूजन और याददाश्त पर गंभीर असर पड़ता है।',
          dis_4_sub: 'ब्लड-ब्रेन बैरियर क्षति',
          dis_clinical_brief: 'मेडिकल रिपोर्ट देखें',
          dis_protect_title: 'GeoField का सुरक्षित क्लोज़्ड-लूप सुरक्षा चक्र',
          dis_protect_desc: 'किचन से एकत्र किए गए 100% खराब तेल को सीधे प्रमाणित स्वच्छ बायोडीज़ल (Biodiesel) में बदलता है',
          dis_ruco_verified: 'RUCO प्रमाणित',

          dis_modal_advisory: 'FSSAI खाद्य सुरक्षा परामर्श',
          dis_modal_mech_lbl: 'शरीर पर होने वाला प्रभाव',
          dis_modal_bio_lbl: 'बायोमार्कर प्रभाव',
          dis_modal_tpc_lbl: 'FSSAI TPC सुरक्षा सीमा का उल्लंघन',
          dis_modal_prev_lbl: 'GeoField RUCO सुरक्षा समाधान',
          dis_modal_act_lbl: 'खाद्य सुरक्षा और मानक अधिनियम — धारा 2.1',
          dis_modal_close_btn: 'समझ गया, बंद करें ×',

          proc_eyebrow: 'हमारी कार्य-प्रणाली',
          proc_title_html: 'बिना झंझट तेल निपटान।<br /><span class="text-[#16A34A]">काम में शून्य रुकावट।</span>',
          proc_desc: 'आपकी रसोई और पूर्ण FSSAI अनुपालन के बीच सिर्फ़ 3 आसान कदम। न बार-बार फ़ोन करने की ज़रूरत, न कागज़ी झंझट, और न ही असुरक्षित वेंडरों का इंतज़ार।',
          proc_wp_1: 'QR कोड आवंटित',
          proc_wp_2: 'क्लस्टर पिकअप',
          proc_wp_3: 'तुरंत FSSAI रसीद',
          proc_1_badge: '✓ मात्र 60 सेकंड में रजिस्ट्रेशन',
          proc_1_title: 'रजिस्टर करें और अपना QR कोड पाएं',
          proc_1_desc: 'सिर्फ़ 60 सेकंड में साइन-अप करें और अपने रेस्तरां या किचन के लिए एक विशेष वॉटरप्रूफ QR कोड प्राप्त करें।',
          proc_1_pipe: 'चरण 01 पाइपलाइन',
          proc_1_status: 'तैयार (READY)',
          proc_2_badge: '✓ स्मार्ट क्लस्टर रूटिंग',
          proc_2_title: 'क्लस्टर-आधारित तेज़ पिकअप',
          proc_2_desc: 'हमारी स्थानीय पिकअप वैन निर्धारित क्लस्टर रूट पर चलती है — जिससे आपका इस्तेमाल किया गया तेल समय पर और पूरी सफ़ाई से कलेक्ट होता है।',
          proc_2_pipe: 'चरण 02 पाइपलाइन',
          proc_2_status: 'सक्रिय चरण',
          proc_3_badge: '✓ डिजिटल FSSAI प्रमाण-पत्र',
          proc_3_title: 'QR स्कैन और काम पूरा (Scan & Done)',
          proc_3_desc: 'एजेंट आपके किचन का QR स्कैन करता है, डिजिटल कांटे से तेल का वज़न अपने-आप दर्ज होता है, और तुरंत आधिकारिक FSSAI रसीद व NEFT भुगतान मिल जाता है।',
          proc_3_pipe: 'चरण 03 पाइपलाइन',
          proc_3_status: 'तुरंत भुगतान',
          proc_bottom_cta: 'अब देखें कि आपका यह तेल आगे क्या कमाल करता है',

          imp_eyebrow: 'आपका लाभ और पर्यावरण योगदान',
          imp_title_1: 'ट्रैक करें अपना',
          imp_title_2: 'हरित योगदान और कमाई।',
          imp_desc: 'आपके द्वारा दिया गया हर एक लीटर तेल डिजिटल रूप से तौला जाता है, प्रमाणित होता है और सीधे रिफाइनरी तक ट्रैक किया जाता है। आपका डैशबोर्ड कानूनी अनुपालन को एक गर्व की उपलब्धि और सीधी आमदनी में बदल देता है।',
          imp_sample_badge: 'डैशबोर्ड प्रीव्यू — सैंपल डेटा',
          imp_scale_label: 'अपने किचन का स्तर (SCALE) चुनें',
          imp_preset_1: 'QSR आउटलेट',
          imp_preset_2: 'स्टैंडर्ड रेस्तरां',
          imp_preset_3: 'क्लाउड किचन 18k',
          imp_preset_4: 'होटल चेन 26k',
          imp_console_title: 'GEOFIELD इम्पैक्ट कंसोल',
          imp_receipt_pdf: '[रसीद PDF]',
          imp_live: 'लाइव',
          imp_mom_tag: '↗ +18% मासिक वृद्धि',
          imp_metric_1: 'रीसायकल किया गया तेल (लीटर)',
          imp_metric_2: 'कार्बन उत्सर्जन की बचत (CO₂)',
          imp_protected_tag: '↗ सुरक्षित जल',
          imp_metric_3: 'प्रदूषित होने से बचाया गया पानी',
          imp_rate_tag: '↗ ₹40/लीटर प्रमाणित दर',
          imp_metric_4: 'किचन की कुल हरित कमाई',
          imp_vel_title: 'तेल संग्रहण की रफ़्तार — 12 सप्ताह का ग्राफ़',
          imp_tap_week: 'सप्ताह चुनें:',
          imp_w12_peak: 'W12 शिखर',

          join_eyebrow: 'आज ही नेटवर्क से जुड़ें',
          join_title_1: 'क्या आप अपनी रसोई को सुरक्षित —',
          join_title_2: 'और अपनी ज़िम्मेदारी को',
          join_title_3: 'सार्थक बनाने के लिए तैयार हैं?',
          join_desc: 'रजिस्ट्रेशन में सिर्फ़ 60 सेकंड लगते हैं। इसके बाद की सारी ज़िम्मेदारी हमारी टीम संभालती है।',
          join_cta: 'अभी रजिस्टर करें',
          join_trust_bar: 'कोई मशीन खरीदने की ज़रूरत नहीं  ·  कोई जटिल अनुबंध नहीं  ·  48 घंटे में QR किट आपके किचन में',

          footer_tagline: 'पारदर्शी और पूर्णतः प्रमाणित सप्लाई चेन के ज़रिए इस्तेमाल किए गए तेल से स्वच्छ ऊर्जा क्रांति को गति देना।',
          footer_contact_hdr: 'संपर्क करें',
          footer_support: 'सहायता',
          footer_office: 'कार्यालय',
          footer_city: 'मुंबई, महाराष्ट्र, भारत',
          footer_nav_hdr: 'नेविगेशन',
          footer_nav_1: 'गंभीर संकट',
          footer_nav_2: 'कार्य-प्रणाली',
          footer_nav_3: 'प्रभाव व कमाई',
          footer_nav_4: 'रजिस्टर करें',
          footer_bottom_right: 'अपशिष्ट से ऊर्जा  ·  100% पारदर्शी  ·  FSSAI व ISCC प्रमाणित',

          reg_s1_title: 'स्वच्छ नेटवर्क से जुड़ें',
          reg_s1_desc: 'मात्र 60 सेकंड में अपने रेस्तरां का स्थायी QR कोड प्राप्त करें।',
          reg_s1_name: 'आपका नाम',
          reg_s1_phone: 'मोबाइल / WhatsApp नंबर',
          reg_continue: 'आगे बढ़ें →',
          reg_s2_title: 'किचन का विवरण',
          reg_s2_desc: 'अपने रेस्तरां को स्थानीय पिकअप क्लस्टर से जोड़ें।',
          reg_s2_rest: 'रेस्तरां / किचन का नाम',
          reg_s2_vol: 'साप्ताहिक इस्तेमाल किए गए तेल की मात्रा',

          portal_sim_qr: '+ QR पिकअप सिम्युलेट करें',
          portal_req_batch: '+ फीडस्टॉक बैच बुक करें',
          portal_back_home: '← वापस होम पेज पर',
          reg_opt_1: '50 – 250 लीटर / सप्ताह',
          reg_opt_2: '50 लीटर से कम / सप्ताह',
          reg_opt_3: '250+ लीटर / सप्ताह',
          reg_back: 'पीछे',
          reg_s3_title: 'पिकअप क्लस्टर',
          reg_s3_desc: 'आपकी वॉटरप्रूफ QR किट 48 घंटों में भेज दी जाएगी।',
          reg_s3_area: 'इलाका / शहर',
          reg_mint_qr: 'QR कोड जनरेट करें और पूरा करें ↗',
          reg_done_title: 'आपका स्वागत है!',
          reg_done_prefix: 'आपके किचन की विशेष QR रसीद आईडी',
          reg_done_suffix: 'अब सक्रिय है।',
          reg_open_console: 'सेलर डैशबोर्ड खोलें →',
          cert_modal_title: 'आधिकारिक प्रमाणित तेल निपटान रसीद',
          cert_lbl_id: 'रसीद आईडी (RECEIPT ID)',
          cert_lbl_fbo: 'स्रोत किचन',
          cert_lbl_date: 'पिकअप दिनांक',
          cert_lbl_vol: 'सत्यापित मात्रा',
          cert_lbl_esg: 'पर्यावरण (CO₂) बचत',
          cert_download_btn: 'PDF रसीद डाउनलोड करें',
          sel_kpi1_sub: '4 ड्रम सत्यापित',
          sel_kpi2_title: 'कुल हरित कमाई',
          sel_kpi2_sub1: 'भुगतान स्थिति',
          sel_kpi2_sub2: '100% भुगतान पूर्ण',
          sel_kpi3_sub1: 'बायोडीज़ल उत्पादन',
          sel_kpi4_sub1: 'शून्य जल प्रदूषण',
          sel_chart_eyebrow: 'कमाई और तेल संग्रहण टेलीमेट्री',
          sel_chart_title: 'मासिक तेल संग्रहण और तुरंत NEFT भुगतान ग्राफ़',
          sel_leg_liters: 'दर्ज तेल (लीटर)',
          sel_leg_payout: 'NEFT भुगतान (₹)',
          sel_ledger_title: 'पिकअप खाता और FSSAI ऑडिट रसीदें',
          sel_ledger_sub: 'नगर निगम और FSSAI निरीक्षण के लिए पूर्णतः प्रमाणित डिजिटल रसीदें',
          sel_ledger_badge: 'ऑटो-सिंक्ड लेजर',
          buy_chart_eyebrow: 'रिफाइनरी फीडस्टॉक टेलीमेट्री',
          buy_chart_title: 'प्रमाणित UCO फीडस्टॉक डिलीवरी (MT) और GHG बचत ग्राफ़'
        }
      };

      function applyLanguage(lang, notify = false) {
        state.lang = lang === 'hi' ? 'hi' : 'en';
        document.documentElement.lang = state.lang;
        try {
          localStorage.setItem('geofield_lang', state.lang);
        } catch (e) {}

        // Update Top Language Toggle Switch Visual State
        const btn = document.getElementById('langToggleBtn');
        const pillEn = document.getElementById('langPillEn');
        const pillHi = document.getElementById('langPillHi');
        if (btn) btn.setAttribute('aria-checked', state.lang === 'hi' ? 'true' : 'false');
        if (pillEn && pillHi) {
          if (state.lang === 'hi') {
            pillEn.className = 'px-2.5 py-1 rounded-full text-gray-400 hover:text-white font-mono text-[10px] sm:text-[11px] font-bold tracking-wider transition-all duration-300';
            pillHi.className = 'px-2.5 py-1 rounded-full bg-[#22C55E] text-[#050A07] shadow-[0_0_12px_rgba(34,197,94,0.45)] font-sans text-[11px] sm:text-xs font-extrabold tracking-wide transition-all duration-300';
          } else {
            pillEn.className = 'px-2.5 py-1 rounded-full bg-[#22C55E] text-[#050A07] shadow-[0_0_12px_rgba(34,197,94,0.45)] font-mono text-[10px] sm:text-[11px] font-extrabold tracking-wider transition-all duration-300';
            pillHi.className = 'px-2.5 py-1 rounded-full text-gray-300 hover:text-white font-sans text-[11px] sm:text-xs font-bold tracking-wide transition-all duration-300';
          }
        }

        // Apply all [data-i18n] and [data-i18n-html] strings
        const dict = I18N[state.lang] || I18N.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (key && dict[key] !== undefined) {
            el.textContent = dict[key];
          }
        });
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
          const key = el.getAttribute('data-i18n-html');
          if (key && dict[key] !== undefined) {
            el.innerHTML = dict[key];
          }
        });

        // Update Hero dynamic cluster & floating badges
        const activeClusterBtn = state.activeClusterBtn || document.querySelector('.hero-cluster-pill');
        if (activeClusterBtn) {
          const cTitle = state.lang === 'hi'
            ? (activeClusterBtn.getAttribute('data-cluster-hi') || activeClusterBtn.getAttribute('data-cluster'))
            : activeClusterBtn.getAttribute('data-cluster');
          const cStation = state.lang === 'hi'
            ? (activeClusterBtn.getAttribute('data-station-hi') || activeClusterBtn.getAttribute('data-station'))
            : activeClusterBtn.getAttribute('data-station');
          const titleEl = document.getElementById('heroClusterTitleText');
          const subTypeEl = document.getElementById('heroClusterSubTypeText');
          if (titleEl && cTitle) titleEl.textContent = cTitle;
          if (subTypeEl && cStation) subTypeEl.textContent = cStation;
        }
        const curHeroLiters = state.activeHeroLiters || 42.6;
        const curHeroCo2 = state.activeHeroCo2 || 31.1;
        const heroLitersEl = document.getElementById('heroLoggedLitersText');
        const heroCo2El = document.getElementById('heroCo2OffsetText');
        if (heroLitersEl) heroLitersEl.textContent = state.lang === 'hi' ? `${curHeroLiters.toFixed(1)} लीटर दर्ज` : `${curHeroLiters.toFixed(1)} L logged`;
        if (heroCo2El) heroCo2El.textContent = state.lang === 'hi' ? `+${curHeroCo2.toFixed(1)} टन` : `+${curHeroCo2.toFixed(1)} T`;

        // Update Section 01 active Reheat TPC card text
        const activeReheatCard = document.querySelector(`[data-reheat-card="${state.activeTpcTarget}"] .reheat-pill-btn`);
        if (activeReheatCard) {
          const status = state.lang === 'hi'
            ? (activeReheatCard.getAttribute('data-status-hi') || activeReheatCard.getAttribute('data-status'))
            : activeReheatCard.getAttribute('data-status');
          const desc = state.lang === 'hi'
            ? (activeReheatCard.getAttribute('data-desc-hi') || activeReheatCard.getAttribute('data-desc'))
            : activeReheatCard.getAttribute('data-desc');
          const subEl = document.getElementById('crisis25SubLabel');
          const descEl = document.getElementById('crisis25Desc');
          const badgeEl = document.getElementById('reheatSimActiveBadge');
          if (subEl && status) subEl.textContent = status;
          if (descEl && desc) descEl.textContent = desc;
          if (badgeEl && status) badgeEl.textContent = `${status} • ${state.activeTpcTarget}% TPC`;
        }

        // Update Section 02 Process active puck pill
        activateProcessStep(state.activeProcessStep || 2);

        // Update Section 03 Impact Console dynamic readout & trees tag
        renderConsoleAndGraph(state.consoleLiters, false);
        if (state.activeVelocityPt) {
          selectVelocityWeekPoint(state.activeVelocityPt);
        } else if (state.currentSplinePts && state.currentSplinePts.length) {
          selectVelocityWeekPoint(state.currentSplinePts[state.currentSplinePts.length - 1]);
        }

        if (notify) {
          showToast(state.lang === 'hi' ? 'भाषा बदली गई: हिंदी (Hindi Mode Active)' : 'Language switched to English');
        }
      }

      document.getElementById('langToggleBtn')?.addEventListener('click', () => {
        const nextLang = state.lang === 'en' ? 'hi' : 'en';
        applyLanguage(nextLang, true);
        if (typeof setLanguage === 'function') {
          setLanguage(nextLang);
        }
      });

      // Synchronize when external language change event is received
      window.addEventListener('geofield-lang-change', (e) => {
        const l = e.detail?.lang;
        if (l && l !== state.lang) {
          applyLanguage(l, false);
        }
      });

            // Initial Language resolution
      const savedLang = (typeof currentLang !== 'undefined' && currentLang.value) || localStorage.getItem('geofield_lang') || 'en';
      applyLanguage(savedLang, false);

      initScrollReveal();
      initSmoothNavigationAndScrollSpy();
      attachTouchReactions();
      renderConsoleAndGraph(12450, false);
      renderSellerPortal();
      renderCustomerPortal();
      renderSellerAnalyticsChart();
      renderBuyerAnalyticsChart();
      window.__openAppLogin = () => emit('open-login');
      window.__openAppRegister = () => emit('open-register');

});
</script>

<style scoped>
:root {
      --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    html {
      scroll-padding-top: 5rem;
    }

    body {
      background-color: #060A08;
      color: #F3F5F4;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* Ultra-Clean Silky Atmospheric Dark Surface (Zero Grain / Zero Grid Clutter) */
    .bg-organic-dark {
      background-color: #060A08;
      background-image:
        radial-gradient(circle at 78% 24%, rgba(34, 197, 94, 0.09) 0%, transparent 48%),
        radial-gradient(circle at 16% 78%, rgba(34, 197, 94, 0.05) 0%, transparent 46%);
      background-repeat: no-repeat;
    }

    /* Warm Ivory Smooth Satin Process Section */
    .bg-process-ivory {
      background-color: #F4F3EC;
      color: #111814;
      background-image:
        radial-gradient(circle at 82% 18%, rgba(34, 197, 94, 0.055) 0%, transparent 52%);
      background-repeat: no-repeat;
    }

    /* Premium Indian Typography & Unbroken Shirorekha System when Hindi (हिंदी) is Active */
    #langPillHi {
      font-family: 'Poppins', 'Mukta', 'Noto Sans Devanagari', sans-serif;
      letter-spacing: 0em !important;
    }
    html[lang="hi"] body,
    html[lang="hi"] .font-sans,
    html[lang="hi"] .font-mono {
      font-family: 'Mukta', 'Noto Sans Devanagari', 'Inter', sans-serif !important;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    html[lang="hi"] h1,
    html[lang="hi"] h2,
    html[lang="hi"] h3,
    html[lang="hi"] .font-display {
      font-family: 'Poppins', 'Noto Sans Devanagari', 'Plus Jakarta Sans', sans-serif !important;
      letter-spacing: 0em !important;
    }
    /* Keep the Devanagari Shirorekha (top horizontal connecting bar) 100% continuous */
    html[lang="hi"] * {
      letter-spacing: 0em !important;
      font-feature-settings: "kern" 1, "liga" 1, "clig" 1;
    }
    html[lang="hi"] .hero-kinetic-stage {
      line-height: 1.28 !important;
      letter-spacing: 0em !important;
    }
    html[lang="hi"] .hero-solid-white,
    html[lang="hi"] .hero-toxic-highlight,
    html[lang="hi"] .hero-green-highlight {
      padding-top: 0.12em;
      padding-bottom: 0.24em;
      margin-top: -0.06em;
      margin-bottom: -0.12em;
      line-height: 1.26;
    }
    html[lang="hi"] h2,
    html[lang="hi"] h3 {
      line-height: 1.35 !important;
    }
    html[lang="hi"] p {
      line-height: 1.72 !important;
      font-weight: 400;
    }
    html[lang="hi"] .text-\[9px\],
    html[lang="hi"] .text-\[10px\],
    html[lang="hi"] .text-\[11px\] {
      font-size: 0.8rem !important;
      line-height: 1.45 !important;
      font-weight: 600;
    }

    @media (min-width: 1280px) {
      .max-w-7xl {
        max-width: 1340px;
      }
    }
    img {
      image-rendering: -webkit-optimize-contrast;
    }
    svg {
      shape-rendering: geometricPrecision;
    }

    /* ===================================================================== */
    /* ULTRA-SHARP HIGH-CLARITY HERO HEADLINE (ZERO RUNTIME FILTER JITTER)   */
    /* "Stop the Toxic Cycle. Start the Green Revenue."                      */
    /* ===================================================================== */
    /* Razor-Sharp Ultra-Clarity Hero Headline - Zero Blur / Zero Filter Jitter */
    .hero-spatial-chamber,
    .hero-kinetic-stage,
    .hero-pop-line,
    .hero-solid-white,
    .hero-toxic-highlight,
    .hero-green-highlight {
      filter: none !important;
      -webkit-filter: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    .hero-spatial-chamber {
      position: relative;
      padding: 0.25rem 0 0.5rem 0;
    }
    .hero-kinetic-stage {
      position: relative;
      z-index: 10;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: geometricPrecision;
    }

    .hero-pop-line {
      display: block;
      overflow: visible;
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
      -webkit-filter: none !important;
    }
    .hero-pop-line.is-popped {
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
      -webkit-filter: none !important;
      animation: none !important;
    }

    @keyframes heroChromaticSweep {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Razor-Sharp Ultra-High-Contrast Pure White Words (No Underline, No Shadow, Full Descender Clearance) */
    .hero-solid-white {
      display: inline-block;
      color: #FFFFFF;
      text-shadow: none;
      padding-top: 0.06em;
      padding-bottom: 0.18em;
      margin-top: -0.04em;
      margin-bottom: -0.12em;
      line-height: 1.18;
    }

    /* High-Contrast Richly Saturated Amber-Orange Phrase ("Toxic Cycle." — Full Descender Box so "y" Never Clips) */
    .hero-toxic-highlight {
      display: inline-block;
      position: relative;
      color: #FFB800;
      background: linear-gradient(100deg, #FFF34D 0%, #FFB800 30%, #FF6200 68%, #FFD60A 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: none;
      padding-top: 0.08em;
      padding-bottom: 0.24em;
      margin-top: -0.06em;
      margin-bottom: -0.15em;
      line-height: 1.18;
      animation: heroChromaticSweep 7s ease-in-out infinite;
    }

    /* High-Contrast Richly Saturated Emerald-Lime Phrase ("Green Revenue." — Full Descender Box) */
    .hero-green-highlight {
      display: inline-block;
      position: relative;
      color: #00E676;
      background: linear-gradient(100deg, #BEF264 0%, #22C55E 30%, #00E676 68%, #4ADE80 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: none;
      padding-top: 0.08em;
      padding-bottom: 0.24em;
      margin-top: -0.06em;
      margin-bottom: -0.15em;
      line-height: 1.18;
      animation: heroChromaticSweep 7s ease-in-out infinite 0.9s;
    }

    /* Crisp Anti-Jitter Brand Logo */
    .brand-logo-crisp {
      image-rendering: -webkit-optimize-contrast;
      transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    /* Dedicated Disease Touch & Balanced Architectural Card Styling */
    .disease-hazard-card {
      position: relative;
      background: linear-gradient(165deg, rgba(16, 24, 19, 0.96) 0%, rgba(9, 14, 11, 0.99) 100%);
      border: 1px solid rgba(255, 255, 255, 0.085);
      box-shadow:
        0 18px 38px -14px rgba(0, 0, 0, 0.85),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.06);
      transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.28s ease, box-shadow 0.28s ease;
    }
    .disease-hazard-card:hover {
      transform: translate3d(0, -4px, 0);
      border-color: rgba(239, 68, 68, 0.45);
      box-shadow:
        0 24px 48px -12px rgba(0, 0, 0, 0.92),
        0 0 28px -8px rgba(239, 68, 68, 0.28),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
    }
    .disease-hazard-card:active {
      transform: scale(0.98);
      box-shadow: 0 0 24px rgba(239, 68, 68, 0.42);
    }

    /* Tablet Portrait & Mobile Orientation Optimizations */
    @media (min-width: 768px) and (max-width: 1024px) {
      .hero-spatial-chamber {
        padding: 0.5rem 0 1.25rem 0;
      }
      .hero-kinetic-stage {
        font-size: 3.45rem !important;
        line-height: 1.16 !important;
      }
      .disease-hazard-card {
        min-height: 190px !important;
      }
      .console-metric-box {
        padding: 1.25rem !important;
      }
    }

    @media (max-width: 640px) {
      .hero-kinetic-stage {
        font-size: 2.35rem !important;
        line-height: 1.16 !important;
      }
      .hero-pedestal-platform {
        padding: 1rem !important;
        margin-top: 1.25rem !important;
      }
      .disease-hazard-card {
        min-height: auto !important;
        padding: 1.25rem !important;
      }
    }

    .tabular-nums {
      font-variant-numeric: tabular-nums;
    }

    /* ===================================================================== */
    /* SECTION 01 CRISIS STAT CARDS (EXACT MATCH TO image_adb67c.jpg)        */
    /* ===================================================================== */
    .crisis-card-60 {
      position: relative;
      background: linear-gradient(165deg, rgba(16, 24, 19, 0.95) 0%, rgba(9, 14, 11, 0.99) 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-left: 3.5px solid #EF4444;
      box-shadow:
        0 20px 42px -14px rgba(0, 0, 0, 0.85),
        -6px 0 24px -10px rgba(239, 68, 68, 0.35),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.06);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.28s ease, box-shadow 0.3s ease;
    }
    .crisis-card-60:hover {
      transform: translate3d(0, -4px, 0);
      border-color: rgba(239, 68, 68, 0.45);
      border-left-color: #EF4444;
      box-shadow:
        0 26px 50px -12px rgba(0, 0, 0, 0.92),
        -8px 0 30px -8px rgba(239, 68, 68, 0.48);
    }

    .crisis-card-25 {
      position: relative;
      background: linear-gradient(165deg, rgba(16, 24, 19, 0.95) 0%, rgba(9, 14, 11, 0.99) 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-left: 3.5px solid #F59E0B;
      box-shadow:
        0 20px 42px -14px rgba(0, 0, 0, 0.85),
        -6px 0 24px -10px rgba(245, 158, 11, 0.35),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.06);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.28s ease, box-shadow 0.3s ease;
    }
    .crisis-card-25:hover {
      transform: translate3d(0, -4px, 0);
      border-color: rgba(245, 158, 11, 0.45);
      border-left-color: #F59E0B;
      box-shadow:
        0 26px 50px -12px rgba(0, 0, 0, 0.92),
        -8px 0 30px -8px rgba(245, 158, 11, 0.48);
    }

    /* Dedicated Spring Pop-Up Animation for the 60% and 25% Crisis Callout Cards */
    @keyframes statCardSpringPop {
      0% {
        opacity: 0;
        transform: translate3d(0, 26px, 0) scale(0.92);
      }
      70% {
        opacity: 1;
        transform: translate3d(0, -3px, 0) scale(1.015);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
      }
    }
    .stat-pop-card {
      opacity: 0;
      transform: translate3d(0, 26px, 0) scale(0.92);
      will-change: transform, opacity;
    }
    .stat-pop-card.is-popped-stat {
      animation: statCardSpringPop 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      animation-delay: var(--stat-delay, 0ms);
    }

    /* Premium Section 02 Process Pipeline Shimmer & 3D Step Cards */
    @keyframes pipelineBeamFlow {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    .process-beam-animated {
      background: linear-gradient(90deg, #16A34A 0%, #22C55E 35%, #86EFAC 50%, #22C55E 65%, #16A34A 100%);
      background-size: 200% 100%;
      animation: pipelineBeamFlow 3.2s linear infinite;
      box-shadow: 0 0 16px rgba(34, 197, 94, 0.45);
      transition: width 0.65s cubic-bezier(0.22, 1, 0.36, 1);
    }
    @keyframes nodeRadarPulse {
      0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.65; }
      100% { transform: translate(-50%, -50%) scale(1.95); opacity: 0; }
    }
    .process-node-pulse {
      animation: nodeRadarPulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
    }

    /* Giant Outlined Stroke Watermark Text ("TOXIC", "SCAN & DONE", & "GREEN") */
    .stroke-watermark-toxic {
      -webkit-text-stroke: 1.8px rgba(239, 68, 68, 0.16);
      color: transparent;
      user-select: none;
      pointer-events: none;
    }

    .stroke-watermark-green {
      -webkit-text-stroke: 1.8px rgba(34, 197, 94, 0.17);
      color: transparent;
      user-select: none;
      pointer-events: none;
    }

    /* Deliberate, Noticeable Directional Slide-In for Background Watermarks (1.9s Cinematic Glide) */
    .bg-slide-from-right {
      opacity: 0;
      transform: translate3d(220px, 0, 0);
      transition:
        opacity 1.65s cubic-bezier(0.22, 1, 0.36, 1),
        transform 1.95s cubic-bezier(0.22, 1, 0.36, 1);
      will-change: transform, opacity;
    }
    .bg-slide-from-right.is-slid-in {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    .bg-slide-from-left {
      opacity: 0;
      transform: translate3d(-220px, 0, 0);
      transition:
        opacity 1.65s cubic-bezier(0.22, 1, 0.36, 1),
        transform 1.95s cubic-bezier(0.22, 1, 0.36, 1);
      will-change: transform, opacity;
    }
    .bg-slide-from-left.is-slid-in {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    /* Vertical Side Text ("WASTE -> ENERGY") */
    .vertical-side-label {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
    }

    /* ===================================================================== */
    /* HARDWARE-ACCELERATED ZERO-LAG REVEAL & POP ENGINE                     */
    /* ===================================================================== */
    @keyframes navDrop {
      0% { opacity: 0; transform: translate3d(0, -16px, 0); }
      100% { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .animate-nav-drop {
      animation: navDrop 0.55s var(--ease-out-expo) forwards;
    }

    .reveal {
      opacity: 0;
      will-change: transform, opacity;
      transition:
        opacity 0.92s cubic-bezier(0.22, 1, 0.36, 1),
        transform 1.05s cubic-bezier(0.22, 1, 0.36, 1);
      transition-delay: var(--delay, 0ms);
    }

    .reveal-up { transform: translate3d(0, 28px, 0); }
    .reveal-pop { transform: translate3d(0, 24px, 0) scale(0.96); }
    .reveal-left { transform: translate3d(-36px, 0, 0); }
    .reveal-right { transform: translate3d(36px, 0, 0); }

    .reveal.is-visible {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }
    /* Once reveal animation completes, release transform & delay so card hover/active states work with zero lag */
    .reveal.reveal-settled {
      opacity: 1;
      transition-delay: 0ms !important;
      will-change: auto;
    }

    /* Elastic Number Scaling Pop Effect */
    @keyframes numberScalePop {
      0% { transform: scale(1); }
      45% { transform: scale(1.08); }
      100% { transform: scale(1); }
    }
    .number-pop-active {
      display: inline-block;
      animation: numberScalePop 0.38s var(--ease-spring);
    }

    /* Snappy Touch & Click Response (Zero Mid-Scroll Layout Jitter on Mobile) */
    .touch-reactive {
      position: relative;
      overflow: hidden;
      transition:
        transform 0.24s cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 0.24s ease,
        border-color 0.24s ease;
    }
    button.touch-reactive:active,
    a.touch-reactive:active,
    .disease-hazard-card:active {
      transform: scale(0.975);
    }
    .touch-ripple-circle {
      position: absolute;
      border-radius: 9999px;
      transform: scale(0);
      background: radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, rgba(34, 197, 94, 0) 70%);
      pointer-events: none;
      animation: touchRippleExpand 0.5s var(--ease-out-expo) forwards;
      z-index: 20;
    }
    @keyframes touchRippleExpand {
      to {
        transform: scale(2.8);
        opacity: 0;
      }
    }

    /* Floating Glass Badges on Hero Photo Card */
    .hero-floating-badge {
      background: rgba(11, 19, 14, 0.92);
      border: 1px solid rgba(34, 197, 94, 0.28);
      box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.85), inset 0 1px 0 0 rgba(255, 255, 255, 0.12);
      transition: transform 0.35s var(--ease-spring), border-color 0.25s ease;
    }
    .hero-floating-badge:hover {
      transform: translate3d(0, -4px, 0) scale(1.03);
      border-color: rgba(34, 197, 94, 0.6);
    }

    @keyframes floatSlow {
      0%, 100% { transform: translate3d(0, 0, 0); }
      50% { transform: translate3d(0, -6px, 0); }
    }
    .animate-float-slow {
      animation: floatSlow 5.5s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: floatSlow 6s ease-in-out 1.4s infinite;
    }

    /* Infinite Marquee Strip */
    @keyframes marqueeSlide {
      0% { transform: translate3d(0%, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }
    .marquee-track {
      display: flex;
      width: max-content;
      will-change: transform;
      animation: marqueeSlide 34s linear infinite;
    }
    .marquee-track:hover {
      animation-play-state: paused;
    }

    /* Dark Glass & Spotlight Cards */
    .glass-nav {
      background: rgba(6, 10, 8, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    }

    .dark-threat-card {
      background: linear-gradient(165deg, rgba(16, 23, 18, 0.94) 0%, rgba(9, 14, 11, 0.98) 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 16px 34px -12px rgba(0, 0, 0, 0.78), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.28s ease, box-shadow 0.3s ease;
    }
    .dark-threat-card:hover {
      transform: translate3d(0, -4px, 0);
      border-color: rgba(239, 68, 68, 0.42);
      box-shadow: 0 22px 42px -12px rgba(0, 0, 0, 0.88), 0 0 24px -8px rgba(239, 68, 68, 0.2);
    }

    /* Section 02 Ivory Process White Step Cards with Smooth Elevation */
    .process-white-card {
      background: linear-gradient(180deg, #FFFFFF 0%, #FAF9F5 100%);
      border: 1.5px solid rgba(17, 24, 20, 0.08);
      box-shadow: 0 20px 44px -14px rgba(17, 24, 20, 0.08), 0 4px 12px rgba(17, 24, 20, 0.03);
      transition:
        transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
        border-color 0.35s ease,
        box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .process-white-card:hover,
    .process-white-card.active-process-card {
      transform: translate3d(0, -10px, 0) scale(1.015);
      border-color: rgba(22, 163, 74, 0.65);
      box-shadow:
        0 30px 60px -14px rgba(22, 163, 74, 0.22),
        0 12px 24px -8px rgba(17, 24, 20, 0.08),
        0 0 0 3px rgba(34, 197, 94, 0.12);
    }

    /* Section 03 GeoField Impact Console */
    .impact-console-shell {
      background: linear-gradient(155deg, rgba(16, 30, 22, 0.94) 0%, rgba(8, 15, 11, 0.98) 100%);
      border: 1px solid rgba(34, 197, 94, 0.24);
      box-shadow:
        0 40px 80px -20px rgba(0, 0, 0, 0.9),
        0 0 70px -15px rgba(34, 197, 94, 0.2),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.12);
      transition: transform 0.5s var(--ease-spring), border-color 0.4s ease, box-shadow 0.5s ease;
    }
    .impact-console-shell:hover {
      border-color: rgba(34, 197, 94, 0.42);
      box-shadow:
        0 48px 95px -20px rgba(0, 0, 0, 0.95),
        0 0 85px -10px rgba(34, 197, 94, 0.28),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.18);
    }

    .console-metric-box {
      background: rgba(7, 13, 10, 0.78);
      border: 1px solid rgba(34, 197, 94, 0.14);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      transition: transform 0.35s var(--ease-spring), border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.35s ease;
    }
    .console-metric-box:hover,
    .console-metric-box.active-metric-box {
      transform: translateY(-4px) scale(1.018);
      background: rgba(14, 26, 19, 0.92);
      border-color: rgba(34, 197, 94, 0.5);
      box-shadow: 0 20px 38px -12px rgba(0, 0, 0, 0.8), 0 0 28px -6px rgba(34, 197, 94, 0.25);
    }

    /* Green CTA Button Glow & Shimmer */
    .btn-green-pill {
      position: relative;
      overflow: hidden;
      background-color: #22C55E;
      color: #050B07;
      box-shadow: 0 0 32px rgba(34, 197, 94, 0.35);
      transition: transform 0.35s var(--ease-spring), background-color 0.25s ease, box-shadow 0.35s ease;
    }
    .btn-green-pill:hover {
      background-color: #4ADE80;
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 0 46px rgba(34, 197, 94, 0.55);
    }
    .btn-green-pill:active {
      transform: scale(0.97);
    }

    /* Range Slider Styling */
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 999px;
      background: linear-gradient(90deg, #22C55E 0%, #A3E635 100%);
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 3px solid #22C55E;
      box-shadow: 0 0 14px rgba(34, 197, 94, 0.8);
      margin-top: -7px;
      transition: transform 0.2s var(--ease-spring);
    }
    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.22);
    }

    @keyframes qrScan {
      0%, 100% { top: 8%; opacity: 0.85; }
      50% { top: 88%; opacity: 1; }
    }
    .qr-scan-beam {
      position: absolute;
      left: 6%;
      right: 6%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #22C55E, #A3E635, #22C55E, transparent);
      box-shadow: 0 0 12px #22C55E;
      animation: qrScan 2.4s ease-in-out infinite;
    }

    ::-webkit-scrollbar { width: 6px; height: 0px; }
    ::-webkit-scrollbar-track { background: #060A08; }
    ::-webkit-scrollbar-thumb { background: #182820; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #22C55E; }
    .no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* Executive Telemetry Chart Cards & Interactive Nodes (Clean Smooth Finish) */
    .telemetry-chart-shell {
      background: linear-gradient(165deg, rgba(12, 22, 16, 0.96) 0%, rgba(6, 11, 8, 0.99) 100%);
      border: 1px solid rgba(34, 197, 94, 0.22);
      box-shadow:
        0 24px 52px -16px rgba(0, 0, 0, 0.88),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
    }
    .telemetry-chart-shell-buyer {
      background: linear-gradient(165deg, rgba(10, 20, 28, 0.96) 0%, rgba(6, 11, 15, 0.99) 100%);
      border: 1px solid rgba(56, 189, 248, 0.24);
      box-shadow:
        0 24px 52px -16px rgba(0, 0, 0, 0.88),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
    }
    .chart-data-node {
      transition: r 0.18s cubic-bezier(0.22, 1, 0.36, 1), stroke-width 0.18s ease;
    }
    .chart-data-node:hover {
      r: 7px;
    }
    .chart-touch-svg {
      touch-action: pan-y;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
</style>
