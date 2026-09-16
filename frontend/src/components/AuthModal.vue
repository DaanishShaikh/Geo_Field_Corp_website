<template>
  <div class="fixed inset-0 bg-[#243027]/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
    <div class="bg-[#F4F1E6] border border-[#668A68]/40 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-[#243027]">
      <!-- Close Button -->
      <button 
        @click="$emit('close')" 
        class="absolute right-5 top-5 text-[#243027]/70 hover:text-[#243027] p-1.5 rounded-xl hover:bg-[#668A68]/20 transition cursor-pointer"
        aria-label="Close"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Brand Header -->
      <div class="text-center space-y-1.5">
        <div class="w-10 h-10 rounded-2xl bg-[#31543B] flex items-center justify-center font-black text-[#F4F1E6] text-lg mx-auto shadow-md">
          G
        </div>
        <h2 class="text-xl font-black text-[#243027]">GeoField RUCO Trace</h2>
        <p class="text-xs text-[#668A68]">National Used Cooking Oil Compliance & Traceability System</p>
      </div>

      <!-- Tab Switcher -->
      <div class="grid grid-cols-2 bg-[#EAE6D8] p-1 rounded-2xl border border-[#668A68]/30">
        <button 
          @click="mode = 'login'" 
          :class="mode === 'login' ? 'bg-[#31543B] text-[#F4F1E6] font-bold shadow' : 'text-[#668A68] hover:text-[#243027] font-medium'"
          class="py-2 text-xs rounded-xl transition cursor-pointer"
        >
          Sign In
        </button>
        <button 
          @click="mode = 'register'" 
          :class="mode === 'register' ? 'bg-[#31543B] text-[#F4F1E6] font-bold shadow' : 'text-[#668A68] hover:text-[#243027] font-medium'"
          class="py-2 text-xs rounded-xl transition cursor-pointer"
        >
          New Onboarding
        </button>
      </div>

      <!-- Error banner if any -->
      <div v-if="errorMessage" class="p-3 bg-rose-950/10 border border-rose-800/30 rounded-xl text-xs text-rose-700 flex items-center gap-2">
        <svg class="w-4 h-4 text-rose-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Sign In Form -->
      <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-[#243027]/80 mb-1.5">Registered Email Address</label>
          <input 
            v-model="loginForm.email" 
            type="email" 
            required 
            placeholder="e.g. contact@restaurant.com" 
            class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-4 py-2.5 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] transition placeholder:text-[#243027]/40"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-[#243027]/80 mb-1.5">Password</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            required 
            placeholder="••••••••" 
            class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-4 py-2.5 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] transition placeholder:text-[#243027]/40"
          />
        </div>

        <!-- Super Admin Quick Fill Helper -->
        <div class="p-2.5 bg-[#EAE6D8] border border-[#668A68]/30 rounded-xl flex items-center justify-between gap-2">
          <div class="text-[11px] text-[#668A68]">
            <span class="text-[#243027] font-semibold">Super Admin:</span> <code class="text-[#31543B] font-mono">admin@geofield.com</code>
          </div>
          <button 
            type="button" 
            @click="fillAdminCredentials"
            class="px-2.5 py-1 bg-[#31543B] hover:bg-[#243027] text-[#F4F1E6] rounded-lg text-[10px] font-bold transition cursor-pointer"
          >
            Fill Admin
          </button>
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-3 bg-[#31543B] hover:bg-[#243027] text-[#F4F1E6] font-bold text-xs rounded-xl shadow-lg transition disabled:opacity-50 cursor-pointer"
        >
          {{ loading ? 'Authenticating...' : 'Sign In to Portal' }}
        </button>

        <p class="text-[11px] text-center text-[#668A68] pt-2">
          New Food Business Operator or Field Officer? 
          <a @click.prevent="mode = 'register'" href="#" class="text-[#31543B] font-semibold hover:underline">Apply for Onboarding</a>
        </p>
      </form>

      <!-- Onboarding Registration Form -->
      <form v-else @submit.prevent="handleRegister" class="space-y-4">
        <!-- Role Switcher -->
        <div>
          <label class="block text-xs font-semibold text-[#243027]/80 mb-1">Entity / Role Type</label>
          <div class="grid grid-cols-2 gap-2">
            <label 
              :class="regForm.role === 'seller' ? 'bg-[#31543B] border-[#31543B] text-[#F4F1E6] font-bold' : 'bg-[#FAF8F3] border-[#668A68]/40 text-[#668A68]'"
              class="p-2.5 rounded-xl border flex items-center justify-center text-xs cursor-pointer transition"
            >
              <input type="radio" v-model="regForm.role" value="seller" class="hidden" />
              <span>Food Business (FBO)</span>
            </label>
            <label 
              :class="regForm.role === 'agent' ? 'bg-[#31543B] border-[#31543B] text-[#F4F1E6] font-bold' : 'bg-[#FAF8F3] border-[#668A68]/40 text-[#668A68]'"
              class="p-2.5 rounded-xl border flex items-center justify-center text-xs cursor-pointer transition"
            >
              <input type="radio" v-model="regForm.role" value="agent" class="hidden" />
              <span>Field Executive</span>
            </label>
          </div>
        </div>

        <!-- =================================================================== -->
        <!-- SELLER MULTI-STEP PROGRESS BAR                                      -->
        <!-- =================================================================== -->
        <div v-if="regForm.role === 'seller'" class="space-y-2">
          <!-- Step Progress Indicator -->
          <div class="flex items-center justify-between text-xs font-semibold text-[#243027]/80">
            <span class="flex items-center gap-1.5 text-[#31543B] font-mono">
              <span class="text-[#668A68]">Step {{ currentStep }} of 3:</span>
              <span class="text-[#243027]">{{ stepTitles[currentStep - 1] }}</span>
            </span>
            <span class="text-[11px] font-mono text-[#668A68]">{{ Math.round((currentStep / 3) * 100) }}% Completed</span>
          </div>

          <!-- Progress Bar Track -->
          <div class="w-full h-2 bg-[#EAE6D8] rounded-full overflow-hidden border border-[#668A68]/30">
            <div 
              class="h-full bg-[#D29A5A] transition-all duration-300 ease-out"
              :style="{ width: `${(currentStep / 3) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- =================================================================== -->
        <!-- SELLER STEP 1: Identity & Credentials                               -->
        <!-- =================================================================== -->
        <div v-if="regForm.role === 'seller' && currentStep === 1" class="space-y-3 animate-fade-in">
          <div class="p-3 bg-[#31543B]/10 border border-[#668A68]/30 rounded-xl text-[11px] text-[#31543B] flex items-center gap-2">
            <span>🛡️</span>
            <span>Let's start with your restaurant name and primary contact person.</span>
          </div>

          <div class="space-y-2.5">
            <div>
              <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                <span class="text-[#31543B] font-mono font-bold mr-1">1.</span>
                Name of Kitchen or Restaurant <span class="text-rose-500">*</span>
              </label>
              <input 
                v-model="regForm.name" 
                type="text" 
                required 
                placeholder="e.g. Green Leaf Cafe & Kitchen" 
                class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                  <span class="text-[#31543B] font-mono font-bold mr-1">3.</span>
                  Official Email ID <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="regForm.email" 
                  type="email" 
                  required 
                  placeholder="accounts@restaurant.com" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                  Portal Password <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="regForm.password" 
                  type="password" 
                  required 
                  placeholder="Minimum 6 characters" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                  <span class="text-[#31543B] font-mono font-bold mr-1">4.</span>
                  Primary Contact Person <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="regForm.contact_name" 
                  type="text" 
                  required 
                  placeholder="e.g. Suresh Sharma (Manager)" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                  <span class="text-[#31543B] font-mono font-bold mr-1">5.</span>
                  Primary Contact Number <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="regForm.phone" 
                  type="text" 
                  required 
                  placeholder="e.g. +91 98200 12345" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>
            </div>
          </div>

          <!-- Step 1 Actions -->
          <div class="pt-3 border-t border-[#668A68]/30 flex justify-end">
            <button 
              type="button" 
              @click="goToStep(2)"
              class="w-full sm:w-auto px-6 py-2.5 bg-[#31543B] hover:bg-[#243027] text-[#F4F1E6] font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next: Legal & Regulatory</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        <!-- =================================================================== -->
        <!-- SELLER STEP 2: Regulatory & Banking Compliance                      -->
        <!-- =================================================================== -->
        <div v-if="regForm.role === 'seller' && currentStep === 2" class="space-y-3 animate-fade-in">
          <div class="p-3 bg-[#31543B]/10 border border-[#668A68]/30 rounded-xl text-[11px] text-[#31543B] flex items-center gap-2">
            <span>📜</span>
            <span>Government FSSAI, Tax & Banking verification documents.</span>
          </div>

          <div class="space-y-2.5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                  <span class="text-[#31543B] font-mono font-bold mr-1">8.</span>
                  FSSAI 14-Digit License <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="regForm.fssai_license_no" 
                  type="text" 
                  required 
                  maxlength="14"
                  placeholder="e.g. 11521034000123" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] font-mono focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                  <span class="text-[#31543B] font-mono font-bold mr-1">9.</span>
                  GST Number (GSTIN) <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="regForm.gst_no" 
                  type="text" 
                  required 
                  maxlength="15"
                  placeholder="e.g. 27AAAAA0000A1Z5" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] font-mono uppercase focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                  <span class="text-[#31543B] font-mono font-bold mr-1">10.</span>
                  Cancel Cheque Ref or UPI ID <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="regForm.bank_upi_or_cheque" 
                  type="text" 
                  required 
                  placeholder="e.g. cafe@icici or A/C & IFSC" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                  <span class="text-[#31543B] font-mono font-bold mr-1">12.</span>
                  MSME / UDYAM Number <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="regForm.msme_udyam_no" 
                  type="text" 
                  required 
                  placeholder="e.g. UDYAM-MH-01-0012345" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] font-mono uppercase focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                  <span class="text-[#31543B] font-mono font-bold mr-1">6.</span>
                  Alternative Contact Name <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="regForm.alt_contact_name" 
                  type="text" 
                  required 
                  placeholder="e.g. Chef Amit (Head Chef)" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                  <span class="text-[#31543B] font-mono font-bold mr-1">7.</span>
                  Alternative Contact Phone <span class="text-rose-500">*</span>
                </label>
                <input 
                  v-model="regForm.alt_phone" 
                  type="text" 
                  required 
                  placeholder="e.g. +91 98200 67890" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>
            </div>
          </div>

          <!-- Step 2 Actions -->
          <div class="pt-3 border-t border-[#668A68]/30 flex items-center justify-between gap-2">
            <button 
              type="button" 
              @click="currentStep = 1"
              class="px-4 py-2 bg-[#EAE6D8] hover:bg-[#DCD8CA] text-[#243027] text-xs font-semibold rounded-xl border border-[#668A68]/40 transition cursor-pointer"
            >
              &larr; Back
            </button>
            <button 
              type="button" 
              @click="goToStep(3)"
              class="px-6 py-2.5 bg-[#31543B] hover:bg-[#243027] text-[#F4F1E6] font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <span>Next: Location & GPS</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        <!-- =================================================================== -->
        <!-- SELLER STEP 3: Location & Logistics Setup                           -->
        <!-- =================================================================== -->
        <div v-if="regForm.role === 'seller' && currentStep === 3" class="space-y-3 animate-fade-in">
          <div class="p-3 bg-[#31543B]/10 border border-[#668A68]/30 rounded-xl text-[11px] text-[#31543B] flex items-center gap-2">
            <span>📍</span>
            <span>Where should our electric collection vehicles pick up your oil containers?</span>
          </div>

          <!-- Street Address, City, Pincode -->
          <div class="space-y-2.5">
            <div>
              <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">
                <span class="text-[#31543B] font-mono font-bold mr-1">2.</span>
                Physical Street Address <span class="text-rose-500">*</span>
              </label>
              <input 
                v-model="regForm.address" 
                type="text" 
                required 
                placeholder="e.g. Shop 12, High Street, Near Station" 
                class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">City / Region <span class="text-rose-500">*</span></label>
                <input 
                  v-model="regForm.city" 
                  type="text" 
                  required 
                  placeholder="e.g. Mumbai" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">Pincode <span class="text-rose-500">*</span></label>
                <input 
                  v-model="regForm.pincode" 
                  type="text" 
                  required 
                  placeholder="e.g. 400052" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">Preferred Pickup Window</label>
              <select 
                v-model="regForm.pickup_preference" 
                class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B]"
              >
                <option value="Morning (9 AM - 12 PM)">⏰ Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (1 PM - 4 PM)">⏰ Afternoon (1 PM - 4 PM)</option>
                <option value="Evening (5 PM - 8 PM)">⏰ Evening (5 PM - 8 PM)</option>
                <option value="Night (9 PM - 12 AM)">🌙 Night (9 PM - 12 AM)</option>
                <option value="On-Demand">⚡ On-Demand / Flexible</option>
              </select>
            </div>
          </div>

          <!-- Live GPS Detection Block -->
          <div class="p-3 bg-[#EAE6D8] border border-[#668A68]/30 rounded-2xl space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <span class="text-[#31543B] font-bold text-xs">📍</span>
                <span class="text-[11px] font-bold text-[#243027]">
                  <span class="text-[#31543B] font-mono mr-1">11.</span>
                  Kitchen GPS Spot Coordinates <span class="text-rose-500">*</span>
                </span>
              </div>
              <button 
                type="button" 
                @click="detectLocation" 
                :disabled="detectingGps"
                class="px-2.5 py-1 bg-[#31543B] hover:bg-[#243027] text-[#F4F1E6] rounded-lg text-[10px] font-bold transition flex items-center gap-1 border border-[#31543B] cursor-pointer active:scale-95"
              >
                <span>{{ detectingGps ? '📡' : '🎯' }}</span>
                <span>{{ detectingGps ? 'Locking GPS...' : 'Detect Exact Spot' }}</span>
              </button>
            </div>

            <div v-if="gpsStatusMsg" class="text-[10px] font-mono px-2.5 py-1 rounded-lg border" :class="gpsSuccess ? 'bg-[#31543B]/15 text-[#31543B] border-[#668A68]/40' : 'bg-[#D29A5A]/15 text-[#D29A5A] border-[#D29A5A]/40'">
              {{ gpsStatusMsg }}
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] font-semibold text-[#668A68] mb-0.5">Latitude</label>
                <input 
                  v-model.number="regForm.latitude" 
                  type="number" 
                  step="any" 
                  placeholder="e.g. 19.0760" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-1.5 text-xs text-[#243027] font-mono focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>
              <div>
                <label class="block text-[10px] font-semibold text-[#668A68] mb-0.5">Longitude</label>
                <input 
                  v-model.number="regForm.longitude" 
                  type="number" 
                  step="any" 
                  placeholder="e.g. 72.8777" 
                  class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-1.5 text-xs text-[#243027] font-mono focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
                />
              </div>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-[#EAE6D8] border border-[#668A68]/30 text-[11px] text-[#243027]/80 leading-relaxed">
            🔒 By submitting, your FBO application is logged into our KYC verification queue. A waterproof physical site QR sticker will be assigned upon approval.
          </div>

          <!-- Step 3 Actions -->
          <div class="pt-3 border-t border-[#668A68]/30 flex items-center justify-between gap-2">
            <button 
              type="button" 
              @click="currentStep = 2"
              class="px-4 py-2 bg-[#EAE6D8] hover:bg-[#DCD8CA] text-[#243027] text-xs font-semibold rounded-xl border border-[#668A68]/40 transition cursor-pointer"
            >
              &larr; Back
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="px-6 py-2.5 bg-[#31543B] hover:bg-[#243027] text-[#F4F1E6] font-bold text-xs rounded-xl shadow-lg transition disabled:opacity-50 cursor-pointer"
            >
              {{ loading ? 'Submitting Application...' : 'Complete & Submit Application' }}
            </button>
          </div>
        </div>

        <!-- =================================================================== -->
        <!-- AGENT FORM (For Field Collection Executives)                        -->
        <!-- =================================================================== -->
        <div v-if="regForm.role === 'agent'" class="space-y-3 animate-fade-in">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">Full Legal Name <span class="text-rose-500">*</span></label>
              <input 
                v-model="regForm.name" 
                type="text" 
                required 
                placeholder="e.g. Rajesh Kumar" 
                class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">Official Email <span class="text-rose-500">*</span></label>
              <input 
                v-model="regForm.email" 
                type="email" 
                required 
                placeholder="rajesh@geofield.com" 
                class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">Phone Number <span class="text-rose-500">*</span></label>
              <input 
                v-model="regForm.phone" 
                type="text" 
                required 
                placeholder="+91 98000 12345" 
                class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">Portal Password <span class="text-rose-500">*</span></label>
              <input 
                v-model="regForm.password" 
                type="password" 
                required 
                placeholder="Minimum 6 characters" 
                class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">Vehicle Registration No. <span class="text-rose-500">*</span></label>
              <input 
                v-model="regForm.vehicle_no" 
                type="text" 
                required 
                placeholder="e.g. MH-02-EV-4412" 
                class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] font-mono focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-[#243027]/80 mb-1">Operating City / Base <span class="text-rose-500">*</span></label>
              <input 
                v-model="regForm.city" 
                type="text" 
                required 
                placeholder="e.g. Mumbai Central" 
                class="w-full bg-[#FAF8F3] border border-[#668A68]/40 rounded-xl px-3 py-2 text-xs text-[#243027] focus:outline-none focus:border-[#31543B] placeholder:text-[#243027]/40"
              />
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full py-3 bg-[#31543B] hover:bg-[#243027] text-[#F4F1E6] font-bold text-xs rounded-xl shadow-lg transition disabled:opacity-50 cursor-pointer"
          >
            {{ loading ? 'Submitting Application...' : 'Register Field Officer Account' }}
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialMode: {
    type: String,
    default: 'login'
  }
});

const emit = defineEmits(['close', 'login', 'register']);

const mode = ref(props.initialMode || 'login');
const loading = ref(false);
const errorMessage = ref('');

// Multi-Step Wizard State for FBO Registration
const currentStep = ref(1);
const stepTitles = [
  'Identity & Credentials',
  'Regulatory & Banking Compliance',
  'Pickup Location & GPS Setup'
];

function goToStep(step) {
  errorMessage.value = '';
  const f = regForm.value;

  if (step === 2) {
    // Validate Step 1 fields
    if (!f.name?.trim()) { errorMessage.value = 'Required: Name of Kitchen or Restaurant'; return; }
    if (!f.email?.trim()) { errorMessage.value = 'Required: Official Email ID'; return; }
    if (!f.password || f.password.length < 6) { errorMessage.value = 'Required: Password (minimum 6 characters)'; return; }
    if (!f.contact_name?.trim()) { errorMessage.value = 'Required: Primary Contact Person Name'; return; }
    if (!f.phone?.trim()) { errorMessage.value = 'Required: Primary Contact Phone Number'; return; }
  } else if (step === 3) {
    // Validate Step 2 fields
    if (!f.fssai_license_no?.trim()) { errorMessage.value = 'Required: FSSAI 14-Digit License Number'; return; }
    if (!f.gst_no?.trim()) { errorMessage.value = 'Required: GST Identification Number (GSTIN)'; return; }
    if (!f.bank_upi_or_cheque?.trim()) { errorMessage.value = 'Required: Cancel Cheque Reference or UPI ID'; return; }
    if (!f.msme_udyam_no?.trim()) { errorMessage.value = 'Required: MSME / UDYAM Number'; return; }
    if (!f.alt_contact_name?.trim()) { errorMessage.value = 'Required: Alternative Contact Person Name'; return; }
    if (!f.alt_phone?.trim()) { errorMessage.value = 'Required: Alternative Contact Phone'; return; }
  }

  currentStep.value = step;
}

const loginForm = ref({
  email: '',
  password: '',
});

function fillAdminCredentials() {
  loginForm.value.email = 'admin@geofield.com';
  loginForm.value.password = 'admin123';
  errorMessage.value = '';
}


const detectingGps = ref(false);
const gpsStatusMsg = ref('');
const gpsSuccess = ref(false);

const regForm = ref({
  role: 'seller',
  name: '',               // 1. Name of Kitchen or Restaurant
  address: '',            // 2. Physical Address
  city: '',               // 2. City
  pincode: '',            // 2. Pincode
  email: '',              // 3. Email ID
  contact_name: '',       // 4. Primary Contact Person Name
  phone: '',              // 5. Primary Contact Number
  alt_contact_name: '',   // 6. Alternative Contact Person Name
  alt_phone: '',          // 7. Alternative Phone Number
  fssai_license_no: '',   // 8. FSSAI License Number
  gst_no: '',             // 9. GST Number
  bank_upi_or_cheque: '', // 10. Cancel Cheque or UPI ID
  latitude: null,         // 11. Location on map (lat)
  longitude: null,        // 11. Location on map (lng)
  msme_udyam_no: '',      // 12. MSME / UDYAM Number
  password: '',
  pickup_preference: 'Morning (9 AM - 12 PM)',
  vehicle_no: '',
});

function detectLocation() {
  if (!navigator.geolocation) {
    gpsStatusMsg.value = 'Geolocation is not supported by your browser. Please enter coordinates manually.';
    gpsSuccess.value = false;
    return;
  }
  detectingGps.value = true;
  gpsStatusMsg.value = 'Requesting device GPS coordinates...';
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      detectingGps.value = false;
      const lat = parseFloat(position.coords.latitude.toFixed(6));
      const lng = parseFloat(position.coords.longitude.toFixed(6));
      regForm.value.latitude = lat;
      regForm.value.longitude = lng;
      gpsSuccess.value = true;
      gpsStatusMsg.value = `✓ GPS Locked (${lat}°, ${lng}°). Resolving street address...`;
      
      // Auto-detect street address, city & postcode via reverse geocode
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.address) {
            const a = data.address;
            const building = a.amenity || a.building || a.shop || a.office || '';
            const roadPart = [a.house_number, a.road || a.street || a.pedestrian || a.footway].filter(Boolean).join(' ');
            const locality = a.suburb || a.neighbourhood || a.residential || a.subdistrict || '';

            let street = [building, roadPart, locality].filter(Boolean).join(', ');
            if (!street && data.display_name) {
              street = data.display_name.split(',').slice(0, 3).map(s => s.trim()).join(', ');
            }
            if (street) {
              regForm.value.address = street;
            }

            const detectedCity = a.city || a.town || a.city_district || a.municipality || a.suburb || a.state_district || a.county || a.state;
            if (detectedCity) {
              regForm.value.city = detectedCity;
            }

            if (a.postcode) {
              regForm.value.pincode = a.postcode;
            }

            gpsStatusMsg.value = `✓ Address Auto-Filled: ${detectedCity || 'City'}${a.postcode ? ' (' + a.postcode + ')' : ''}`;
          }
        })
        .catch(() => {
          gpsStatusMsg.value = `✓ GPS Locked: ${lat}° N, ${lng}° E (Accuracy: ~${acc}m)`;
        });
    },
    (error) => {
      detectingGps.value = false;
      gpsSuccess.value = false;
      if (error.code === error.PERMISSION_DENIED) {
        gpsStatusMsg.value = 'GPS permission denied. Please allow location access in your browser or type coordinates manually.';
      } else {
        gpsStatusMsg.value = `GPS Notice: ${error.message}. You can enter coordinates manually.`;
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}


async function handleLogin() {
  loading.value = true;
  errorMessage.value = '';
  try {
    await emit('login', loginForm.value.email, loginForm.value.password, (err) => {
      if (err) errorMessage.value = err;
    });
  } catch (err) {
    errorMessage.value = err.message || 'Login failed. Check your credentials.';
  } finally {
    loading.value = false;
  }
}

async function handleRegister() {
  errorMessage.value = '';

  if (regForm.value.role === 'seller') {
    const f = regForm.value;
    if (!f.name?.trim()) { errorMessage.value = 'Item #1 Required: Name of Kitchen or Restaurant'; return; }
    if (!f.email?.trim()) { errorMessage.value = 'Item #3 Required: Official Email ID'; return; }
    if (!f.contact_name?.trim()) { errorMessage.value = 'Item #4 Required: Primary Contact Person Name'; return; }
    if (!f.phone?.trim()) { errorMessage.value = 'Item #5 Required: Primary Contact Number'; return; }
    if (!f.alt_contact_name?.trim()) { errorMessage.value = 'Item #6 Required: Alternative Contact Name'; return; }
    if (!f.alt_phone?.trim()) { errorMessage.value = 'Item #7 Required: Alternative Phone Number'; return; }
    if (!f.fssai_license_no?.trim()) { errorMessage.value = 'Item #8 Required: FSSAI 14-Digit License Number'; return; }
    if (!f.gst_no?.trim()) { errorMessage.value = 'Item #9 Required: GST Identification Number (GSTIN)'; return; }
    if (!f.bank_upi_or_cheque?.trim()) { errorMessage.value = 'Item #10 Required: Cancel Cheque Reference or UPI ID'; return; }
    if (f.latitude === null || f.longitude === null) {
      errorMessage.value = 'Item #11 Required: Exact Location on Map. Please click "Detect My Exact Location" or enter coordinates.';
      return;
    }
    if (!f.address?.trim() || !f.city?.trim() || !f.pincode?.trim()) {
      errorMessage.value = 'Item #2 Required: Full Address (Street Address, City, and Pincode)';
      return;
    }
    if (!f.msme_udyam_no?.trim()) { errorMessage.value = 'Item #12 Required: MSME / UDYAM Registration Number'; return; }
  }

  loading.value = true;
  try {
    await emit('register', { ...regForm.value }, (err) => {
      if (err) errorMessage.value = err;
    });
  } catch (err) {
    errorMessage.value = err.message || 'Registration failed.';
  } finally {
    loading.value = false;
  }
}
</script>
