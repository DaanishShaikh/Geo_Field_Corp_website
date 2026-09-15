<template>
  <div class="fixed inset-0 bg-[#1E2820]/75 z-50 flex items-center justify-center p-4">
    <div class="bg-[#FAF8F5] border border-[#E2DCD2] rounded-lg w-full max-w-lg p-6 sm:p-8 shadow-xl space-y-6 relative max-h-[90vh] overflow-y-auto text-[#1E2820]">
      <!-- Close Button -->
      <button 
        @click="$emit('close')" 
        class="absolute right-5 top-5 text-[#5C645D] hover:text-[#1E2820] p-1.5 rounded-md hover:bg-[#EFEAE1] transition cursor-pointer"
        aria-label="Close"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Brand Header -->
      <div class="text-center space-y-1.5">
        <div class="w-10 h-10 rounded-md bg-[#233127] border border-[#344439] flex items-center justify-center font-bold text-[#FAF8F5] text-lg mx-auto shadow-xs">
          G
        </div>
        <h2 class="text-xl font-bold text-[#1E2820]">GeoField RUCO Trace</h2>
        <p class="text-xs text-[#5C645D]">National Used Cooking Oil Compliance & Traceability System</p>
      </div>

      <!-- Tab Switcher -->
      <div class="grid grid-cols-2 bg-[#EFEAE1] p-1 rounded-md border border-[#D8D0C3]">
        <button 
          @click="mode = 'login'" 
          :class="mode === 'login' ? 'bg-white text-[#233127] font-bold shadow-2xs' : 'text-[#5C645D] hover:text-[#1E2820] font-medium'"
          class="py-2 text-xs rounded transition cursor-pointer"
        >
          Sign In
        </button>
        <button 
          @click="mode = 'register'" 
          :class="mode === 'register' ? 'bg-white text-[#233127] font-bold shadow-2xs' : 'text-[#5C645D] hover:text-[#1E2820] font-medium'"
          class="py-2 text-xs rounded transition cursor-pointer"
        >
          New Onboarding
        </button>
      </div>

      <!-- Error banner if any -->
      <div v-if="errorMessage" class="p-3 bg-[#FBEBE6] border border-[#F2C5B5] rounded-md text-xs text-[#C85A32] flex items-center gap-2">
        <svg class="w-4 h-4 text-[#C85A32] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Sign In Form -->
      <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-[#4A524B] mb-1.5">Registered Email Address</label>
          <input 
            v-model="loginForm.email" 
            type="email" 
            required 
            placeholder="e.g. contact@restaurant.com" 
            class="w-full bg-white border border-[#D8D0C3] rounded-md px-4 py-2.5 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32] transition"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-[#4A524B] mb-1.5">Password</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            required 
            placeholder="••••••••" 
            class="w-full bg-white border border-[#D8D0C3] rounded-md px-4 py-2.5 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32] transition"
          />
        </div>

        <!-- Super Admin Quick Fill Helper -->
        <div class="p-2.5 bg-[#EFEAE1] border border-[#D8D0C3] rounded-md flex items-center justify-between gap-2">
          <div class="text-[11px] text-[#5C645D]">
            <span class="text-[#1E2820] font-semibold">Super Admin:</span> <code class="text-[#233127] font-mono">admin@geofield.com</code>
          </div>
          <button 
            type="button" 
            @click="fillAdminCredentials"
            class="px-2.5 py-1 bg-white hover:bg-[#FAF8F5] text-[#233127] rounded text-[10px] font-bold transition border border-[#D8D0C3] cursor-pointer shadow-2xs"
          >
            Fill Admin
          </button>
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-3 bg-[#C85A32] hover:bg-[#B34E29] text-white font-semibold text-xs rounded-md shadow-xs border border-[#B34E29] transition disabled:opacity-50 cursor-pointer"
        >
          {{ loading ? 'Authenticating...' : 'Sign In to Portal' }}
        </button>

        <p class="text-[11px] text-center text-[#5C645D] pt-2">
          New Food Business Operator or Field Officer? 
          <a @click.prevent="mode = 'register'" href="#" class="text-[#C85A32] font-semibold hover:underline">Apply for Onboarding</a>
        </p>
      </form>

      <!-- Onboarding Registration Form -->
      <form v-else @submit.prevent="handleRegister" class="space-y-4">
        <!-- Role Switcher -->
        <div>
          <label class="block text-xs font-semibold text-[#4A524B] mb-1">Entity / Role Type</label>
          <div class="grid grid-cols-2 gap-2">
            <label 
              :class="regForm.role === 'seller' ? 'bg-white border-[#233127] text-[#233127] font-bold shadow-2xs' : 'bg-[#EFEAE1] border-[#D8D0C3] text-[#5C645D]'"
              class="p-2.5 rounded-md border flex items-center justify-center text-xs cursor-pointer transition"
            >
              <input type="radio" v-model="regForm.role" value="seller" class="hidden" />
              <span>Food Business (FBO)</span>
            </label>
            <label 
              :class="regForm.role === 'agent' ? 'bg-white border-[#233127] text-[#233127] font-bold shadow-2xs' : 'bg-[#EFEAE1] border-[#D8D0C3] text-[#5C645D]'"
              class="p-2.5 rounded-md border flex items-center justify-center text-xs cursor-pointer transition"
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
          <div class="flex items-center justify-between text-xs font-semibold text-[#4A524B]">
            <span class="flex items-center gap-1.5 text-[#233127] font-mono">
              <span class="text-[#C85A32]">Step {{ currentStep }} of 3:</span>
              <span class="text-[#1E2820]">{{ stepTitles[currentStep - 1] }}</span>
            </span>
            <span class="text-[11px] font-mono text-[#767E77]">{{ Math.round((currentStep / 3) * 100) }}% Completed</span>
          </div>

          <!-- Progress Bar Track -->
          <div class="w-full h-1.5 bg-[#E2DCD2] rounded-full overflow-hidden">
            <div 
              class="h-full bg-[#C85A32] transition-all duration-300 ease-out"
              :style="{ width: `${(currentStep / 3) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- =================================================================== -->
        <!-- SELLER STEP 1: Identity & Credentials                               -->
        <!-- =================================================================== -->
        <div v-if="regForm.role === 'seller' && currentStep === 1" class="space-y-3 animate-fade-in">
          <div class="p-3 bg-[#EFEAE1] border border-[#D8D0C3] rounded-md text-[11px] text-[#233127] flex items-center gap-2">
            <span class="font-bold">Info:</span>
            <span>Provide your business trading name and authorized administrative contact.</span>
          </div>

          <div class="space-y-2.5">
            <div>
              <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                <span class="text-[#C85A32] font-mono font-bold mr-1">1.</span>
                Name of Kitchen or Restaurant <span class="text-[#C85A32]">*</span>
              </label>
              <input 
                v-model="regForm.name" 
                type="text" 
                required 
                placeholder="e.g. Green Leaf Cafe & Kitchen" 
                class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                  <span class="text-[#C85A32] font-mono font-bold mr-1">3.</span>
                  Official Email ID <span class="text-[#C85A32]">*</span>
                </label>
                <input 
                  v-model="regForm.email" 
                  type="email" 
                  required 
                  placeholder="accounts@restaurant.com" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                  Portal Password <span class="text-[#C85A32]">*</span>
                </label>
                <input 
                  v-model="regForm.password" 
                  type="password" 
                  required 
                  placeholder="Minimum 6 characters" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                  <span class="text-[#C85A32] font-mono font-bold mr-1">4.</span>
                  Primary Contact Person <span class="text-[#C85A32]">*</span>
                </label>
                <input 
                  v-model="regForm.contact_name" 
                  type="text" 
                  required 
                  placeholder="e.g. Suresh Sharma (Manager)" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                  <span class="text-[#C85A32] font-mono font-bold mr-1">5.</span>
                  Primary Contact Number <span class="text-[#C85A32]">*</span>
                </label>
                <input 
                  v-model="regForm.phone" 
                  type="text" 
                  required 
                  placeholder="e.g. +91 98200 12345" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>
          </div>

          <!-- Step 1 Actions -->
          <div class="pt-3 border-t border-[#E2DCD2] flex justify-end">
            <button 
              type="button" 
              @click="goToStep(2)"
              class="w-full sm:w-auto px-6 py-2.5 bg-[#C85A32] hover:bg-[#B34E29] text-white font-semibold text-xs rounded-md shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
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
          <div class="p-3 bg-[#EFEAE1] border border-[#D8D0C3] rounded-md text-[11px] text-[#233127] flex items-center gap-2">
            <span class="font-bold">Compliance:</span>
            <span>Government FSSAI statutory license, GST, and direct bank settlement coordinates.</span>
          </div>

          <div class="space-y-2.5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                  <span class="text-[#C85A32] font-mono font-bold mr-1">8.</span>
                  FSSAI 14-Digit License <span class="text-[#C85A32]">*</span>
                </label>
                <input 
                  v-model="regForm.fssai_license_no" 
                  type="text" 
                  required 
                  maxlength="14"
                  placeholder="e.g. 11521034000123" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] font-mono focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                  <span class="text-[#C85A32] font-mono font-bold mr-1">9.</span>
                  GST Number (GSTIN) <span class="text-[#C85A32]">*</span>
                </label>
                <input 
                  v-model="regForm.gst_no" 
                  type="text" 
                  required 
                  maxlength="15"
                  placeholder="e.g. 27AAAAA0000A1Z5" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] font-mono uppercase focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                  <span class="text-[#C85A32] font-mono font-bold mr-1">10.</span>
                  Cancel Cheque Ref or UPI ID <span class="text-[#C85A32]">*</span>
                </label>
                <input 
                  v-model="regForm.bank_upi_or_cheque" 
                  type="text" 
                  required 
                  placeholder="e.g. cafe@icici or A/C & IFSC" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                  <span class="text-[#C85A32] font-mono font-bold mr-1">12.</span>
                  MSME / UDYAM Number <span class="text-[#C85A32]">*</span>
                </label>
                <input 
                  v-model="regForm.msme_udyam_no" 
                  type="text" 
                  required 
                  placeholder="e.g. UDYAM-MH-01-0012345" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] font-mono uppercase focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                  <span class="text-[#C85A32] font-mono font-bold mr-1">6.</span>
                  Alternative Contact Name <span class="text-[#C85A32]">*</span>
                </label>
                <input 
                  v-model="regForm.alt_contact_name" 
                  type="text" 
                  required 
                  placeholder="e.g. Chef Amit (Head Chef)" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                  <span class="text-[#C85A32] font-mono font-bold mr-1">7.</span>
                  Alternative Contact Phone <span class="text-[#C85A32]">*</span>
                </label>
                <input 
                  v-model="regForm.alt_phone" 
                  type="text" 
                  required 
                  placeholder="e.g. +91 98200 67890" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>
          </div>

          <!-- Step 2 Actions -->
          <div class="pt-3 border-t border-[#E2DCD2] flex items-center justify-between gap-2">
            <button 
              type="button" 
              @click="currentStep = 1"
              class="px-4 py-2 bg-[#EFEAE1] hover:bg-[#E2DDD2] text-[#233127] text-xs font-semibold rounded-md border border-[#D8D0C3] transition cursor-pointer"
            >
              &larr; Back
            </button>
            <button 
              type="button" 
              @click="goToStep(3)"
              class="px-6 py-2.5 bg-[#C85A32] hover:bg-[#B34E29] text-white font-semibold text-xs rounded-md shadow-xs transition flex items-center gap-2 cursor-pointer"
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
          <div class="p-3 bg-[#EFEAE1] border border-[#D8D0C3] rounded-md text-[11px] text-[#233127] flex items-center gap-2">
            <span class="font-bold">Logistics:</span>
            <span>Specify pickup door location for the assigned 2km cluster collection vehicle.</span>
          </div>

          <!-- Street Address, City, Pincode -->
          <div class="space-y-2.5">
            <div>
              <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">
                <span class="text-[#C85A32] font-mono font-bold mr-1">2.</span>
                Physical Street Address <span class="text-[#C85A32]">*</span>
              </label>
              <input 
                v-model="regForm.address" 
                type="text" 
                required 
                placeholder="e.g. Shop 12, High Street, Near Station" 
                class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">City / Region <span class="text-[#C85A32]">*</span></label>
                <input 
                  v-model="regForm.city" 
                  type="text" 
                  required 
                  placeholder="e.g. Mumbai" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">Pincode <span class="text-[#C85A32]">*</span></label>
                <input 
                  v-model="regForm.pincode" 
                  type="text" 
                  required 
                  placeholder="e.g. 400052" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">Preferred Pickup Window</label>
              <select 
                v-model="regForm.pickup_preference" 
                class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
              >
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                <option value="Night (9 PM - 12 AM)">Night (9 PM - 12 AM)</option>
                <option value="On-Demand">On-Demand / Flexible</option>
              </select>
            </div>
          </div>

          <!-- Live GPS Detection Block -->
          <div class="p-3 bg-[#FAF8F5] border border-[#E2DCD2] rounded-md space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <span class="text-[11px] font-bold text-[#1E2820]">
                  <span class="text-[#C85A32] font-mono mr-1">11.</span>
                  Kitchen GPS Coordinates <span class="text-[#C85A32]">*</span>
                </span>
              </div>
              <button 
                type="button" 
                @click="detectLocation" 
                :disabled="detectingGps"
                class="px-2.5 py-1 bg-[#233127] hover:bg-[#1A241D] text-white rounded text-[10px] font-semibold transition flex items-center gap-1 cursor-pointer"
              >
                <span>{{ detectingGps ? 'Locking GPS...' : 'Detect Exact Spot' }}</span>
              </button>
            </div>

            <div v-if="gpsStatusMsg" class="text-[10px] font-mono px-2.5 py-1 rounded border" :class="gpsSuccess ? 'bg-[#EFEAE1] text-[#233127] border-[#D8D0C3]' : 'bg-[#FBEBE6] text-[#C85A32] border-[#F2C5B5]'">
              {{ gpsStatusMsg }}
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] font-semibold text-[#5C645D] mb-0.5">Latitude</label>
                <input 
                  v-model.number="regForm.latitude" 
                  type="number" 
                  step="any" 
                  placeholder="e.g. 19.0760" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-1.5 text-xs text-[#1E2820] font-mono focus:outline-none focus:border-[#C85A32]"
                />
              </div>
              <div>
                <label class="block text-[10px] font-semibold text-[#5C645D] mb-0.5">Longitude</label>
                <input 
                  v-model.number="regForm.longitude" 
                  type="number" 
                  step="any" 
                  placeholder="e.g. 72.8777" 
                  class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-1.5 text-xs text-[#1E2820] font-mono focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>
          </div>

          <div class="p-3 rounded-md bg-[#EFEAE1] border border-[#D8D0C3] text-[11px] text-[#5C645D] leading-relaxed">
            By submitting, your kitchen application is enrolled in the RUCO national cluster log. A weatherproof site QR placard will be dispatched upon administrative approval.
          </div>

          <!-- Step 3 Actions -->
          <div class="pt-3 border-t border-[#E2DCD2] flex items-center justify-between gap-2">
            <button 
              type="button" 
              @click="currentStep = 2"
              class="px-4 py-2 bg-[#EFEAE1] hover:bg-[#E2DDD2] text-[#233127] text-xs font-semibold rounded-md border border-[#D8D0C3] transition cursor-pointer"
            >
              &larr; Back
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="px-6 py-2.5 bg-[#C85A32] hover:bg-[#B34E29] text-white font-semibold text-xs rounded-md shadow-xs border border-[#B34E29] transition disabled:opacity-50 cursor-pointer"
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
              <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">Full Legal Name <span class="text-[#C85A32]">*</span></label>
              <input 
                v-model="regForm.name" 
                type="text" 
                required 
                placeholder="e.g. Rajesh Kumar" 
                class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">Official Email <span class="text-[#C85A32]">*</span></label>
              <input 
                v-model="regForm.email" 
                type="email" 
                required 
                placeholder="rajesh@geofield.com" 
                class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">Phone Number <span class="text-[#C85A32]">*</span></label>
              <input 
                v-model="regForm.phone" 
                type="text" 
                required 
                placeholder="+91 98000 12345" 
                class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">Portal Password <span class="text-[#C85A32]">*</span></label>
              <input 
                v-model="regForm.password" 
                type="password" 
                required 
                placeholder="Minimum 6 characters" 
                class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">Vehicle Registration No. <span class="text-[#C85A32]">*</span></label>
              <input 
                v-model="regForm.vehicle_no" 
                type="text" 
                required 
                placeholder="e.g. MH-02-EV-4412" 
                class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] font-mono focus:outline-none focus:border-[#C85A32]"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-[#4A524B] mb-1">Operating City / Base <span class="text-[#C85A32]">*</span></label>
              <input 
                v-model="regForm.city" 
                type="text" 
                required 
                placeholder="e.g. Mumbai Central" 
                class="w-full bg-white border border-[#D8D0C3] rounded-md px-3 py-2 text-xs text-[#1E2820] focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full py-3 bg-[#233127] hover:bg-[#1A241D] text-white font-semibold text-xs rounded-md shadow-xs border border-[#233127] transition disabled:opacity-50 cursor-pointer"
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
