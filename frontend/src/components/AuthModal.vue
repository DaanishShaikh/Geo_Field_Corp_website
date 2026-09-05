<template>
  <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
      <!-- Close Button -->
      <button 
        @click="$emit('close')" 
        class="absolute right-5 top-5 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition"
        aria-label="Close"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Brand Header -->
      <div class="text-center space-y-1">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-white text-lg mx-auto shadow-lg shadow-emerald-950/50">
          G
        </div>
        <h2 class="text-xl font-extrabold text-white">GeoField RUCO Trace</h2>
        <p class="text-xs text-slate-400">National Used Cooking Oil Compliance & Traceability System</p>
      </div>

      <!-- Tab Switcher -->
      <div class="grid grid-cols-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
        <button 
          @click="mode = 'login'" 
          :class="mode === 'login' ? 'bg-slate-800 text-white font-bold shadow' : 'text-slate-400 hover:text-slate-200 font-medium'"
          class="py-2 text-xs rounded-xl transition"
        >
          Sign In
        </button>
        <button 
          @click="mode = 'register'" 
          :class="mode === 'register' ? 'bg-slate-800 text-white font-bold shadow' : 'text-slate-400 hover:text-slate-200 font-medium'"
          class="py-2 text-xs rounded-xl transition"
        >
          New Onboarding
        </button>
      </div>

      <!-- Error banner if any -->
      <div v-if="errorMessage" class="p-3 bg-rose-950/50 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
        <svg class="w-4 h-4 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Sign In Form -->
      <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">Registered Email Address</label>
          <input 
            v-model="loginForm.email" 
            type="email" 
            required 
            placeholder="e.g. contact@restaurant.com" 
            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            required 
            placeholder="••••••••" 
            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
          />
        </div>

        <!-- Super Admin Quick Fill Helper -->
        <div class="p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
          <div class="text-[11px] text-slate-400">
            <span class="text-white font-semibold">Super Admin:</span> <code class="text-teal-400">admin@geofield.com</code>
          </div>
          <button 
            type="button" 
            @click="fillAdminCredentials"
            class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white rounded-lg text-[10px] font-bold transition border border-slate-700/80"
          >
            Fill Admin
          </button>
        </div>


        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-emerald-900/40 transition disabled:opacity-50"
        >
          {{ loading ? 'Authenticating...' : 'Sign In to Portal' }}
        </button>

        <p class="text-[11px] text-center text-slate-400 pt-2">
          New Food Business Operator or Field Officer? 
          <a @click.prevent="mode = 'register'" href="#" class="text-emerald-400 font-semibold hover:underline">Apply for Onboarding</a>
        </p>
      </form>

      <!-- Onboarding Registration Form -->
      <form v-else @submit.prevent="handleRegister" class="space-y-3.5">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Entity / Role Type</label>
          <div class="grid grid-cols-2 gap-2">
            <label 
              :class="regForm.role === 'seller' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-950 border-slate-700 text-slate-400'"
              class="p-2.5 rounded-xl border flex items-center justify-center text-xs cursor-pointer transition"
            >
              <input type="radio" v-model="regForm.role" value="seller" class="hidden" />
              <span>Food Business (FBO)</span>
            </label>
            <label 
              :class="regForm.role === 'agent' ? 'bg-teal-950/40 border-teal-500 text-teal-300 font-bold' : 'bg-slate-950 border-slate-700 text-slate-400'"
              class="p-2.5 rounded-xl border flex items-center justify-center text-xs cursor-pointer transition"
            >
              <input type="radio" v-model="regForm.role" value="agent" class="hidden" />
              <span>Field Collection Executive</span>
            </label>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-300 mb-1">
              {{ regForm.role === 'seller' ? 'Commercial Name / Brand' : 'Full Legal Name' }}
            </label>
            <input 
              v-model="regForm.name" 
              type="text" 
              required 
              :placeholder="regForm.role === 'seller' ? 'e.g. Royal Palace Bistro' : 'e.g. Rajesh Kumar'" 
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-300 mb-1">Official Email</label>
            <input 
              v-model="regForm.email" 
              type="email" 
              required 
              placeholder="contact@entity.com" 
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-300 mb-1">Contact Phone</label>
            <input 
              v-model="regForm.phone" 
              type="text" 
              required
              placeholder="+91 98000 12345" 
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-300 mb-1">Password</label>
            <input 
              v-model="regForm.password" 
              type="password" 
              required 
              placeholder="Minimum 6 characters" 
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <!-- FBO Specific Fields -->
        <div v-if="regForm.role === 'seller'" class="space-y-2.5 pt-1">
          <div>
            <label class="block text-[11px] font-semibold text-slate-300 mb-1">
              FSSAI 14-Digit License Number <span class="text-rose-400">*</span>
            </label>
            <input 
              v-model="regForm.fssai_license_no" 
              type="text" 
              required 
              maxlength="14"
              placeholder="e.g. 10020011003456" 
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">Kitchen / Site Address</label>
              <input 
                v-model="regForm.address" 
                type="text" 
                required
                placeholder="Plot 42, 80ft Road, Koramangala" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-300 mb-1">City / Region</label>
              <input 
                v-model="regForm.city" 
                type="text" 
                required
                placeholder="Bengaluru" 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <!-- Field Executive Vehicle -->
        <div v-if="regForm.role === 'agent'" class="pt-1">
          <label class="block text-[11px] font-semibold text-slate-300 mb-1">
            Collection Vehicle Registration No. <span class="text-rose-400">*</span>
          </label>
          <input 
            v-model="regForm.vehicle_no" 
            type="text" 
            required 
            placeholder="KA-02-EV-4412" 
            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          🔒 In compliance with FSSAI regulations, accounts remain inactive until Super Admin audits KYC & FSSAI credentials. A permanent static site QR is automatically issued upon approval.
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-emerald-900/40 transition disabled:opacity-50"
        >
          {{ loading ? 'Submitting Application...' : 'Submit Official Onboarding Application' }}
        </button>
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

const loginForm = ref({
  email: '',
  password: '',
});

function fillAdminCredentials() {
  loginForm.value.email = 'admin@geofield.com';
  loginForm.value.password = 'admin123';
  errorMessage.value = '';
}


const regForm = ref({
  role: 'seller',
  name: '',
  email: '',
  phone: '',
  password: '',
  fssai_license_no: '',
  address: '',
  city: 'Bengaluru',
  vehicle_no: '',
});

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
  loading.value = true;
  errorMessage.value = '';
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
