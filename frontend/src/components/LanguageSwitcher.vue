<template>
  <div 
    class="inline-flex items-center p-1 rounded-xl bg-[#060A08]/90 border border-white/10 shadow-inner select-none"
    role="group"
    aria-label="Select language / भाषा चुनें"
  >
    <button
      type="button"
      @click="setLanguage('en')"
      :class="currentLang === 'en' ? 'bg-[#22C55E]/20 text-[#4ADE80] border-[#22C55E]/40 font-bold shadow-sm' : 'text-gray-400 hover:text-white border-transparent'"
      class="px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono tracking-wide border transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#22C55E]/40"
      :aria-pressed="currentLang === 'en'"
      title="Switch to English"
    >
      <span class="w-1.5 h-1.5 rounded-full" :class="currentLang === 'en' ? 'bg-[#22C55E]' : 'bg-transparent'"></span>
      <span>EN</span>
    </button>

    <button
      type="button"
      @click="setLanguage('hi')"
      :class="currentLang === 'hi' ? 'bg-[#22C55E]/20 text-[#4ADE80] border-[#22C55E]/40 font-bold shadow-sm' : 'text-gray-400 hover:text-white border-transparent'"
      class="px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-sans tracking-wide border transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#22C55E]/40"
      :aria-pressed="currentLang === 'hi'"
      title="हिन्दी में बदलें (Switch to Hindi)"
    >
      <span class="w-1.5 h-1.5 rounded-full" :class="currentLang === 'hi' ? 'bg-[#22C55E]' : 'bg-transparent'"></span>
      <span>हिन्दी</span>
    </button>
  </div>
</template>

<script setup>
import { useI18n } from '../services/i18n';

const { currentLang, setLanguage } = useI18n();
</script>
