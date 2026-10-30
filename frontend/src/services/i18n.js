import { ref, computed } from 'vue';
import { en } from '../locales/en.js';
import { hi } from '../locales/hi.js';

const dictionaries = { en, hi };

// Initialize persisted language with fallback to 'en'
const initialLang = (typeof window !== 'undefined' && localStorage.getItem('geofield_lang')) || 'en';
export const currentLang = ref((initialLang === 'hi' || initialLang === 'mr') ? initialLang : 'en');

if (typeof document !== 'undefined') {
  document.documentElement.lang = currentLang.value;
}

export const availableLanguages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' }
];

export function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'hi' && lang !== 'mr') lang = 'en';
  currentLang.value = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('geofield_lang', lang);
    document.documentElement.lang = lang;
    window.dispatchEvent(new CustomEvent('geofield-lang-change', { detail: { lang } }));
  }
}

export function t(key, params = {}) {
  if (!key) return '';
  const lang = currentLang.value;
  const dict = dictionaries[lang] || dictionaries.hi || dictionaries.en;
  
  // Resolve dot path in active dictionary
  const keys = key.split('.');
  let val = keys.reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), dict);
  
  // Fallback to Hindi or English if key missing in current language
  if (val === undefined && lang !== 'en') {
    val = keys.reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), dictionaries.en);
  }

  // Graceful fallback and dev warning
  if (val === undefined) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(`[i18n] Missing translation for key: "${key}" (lang: ${lang})`);
    }
    // Return humanized string instead of raw dotted key
    const lastPart = keys[keys.length - 1];
    return lastPart
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  if (typeof val !== 'string') return val;
  
  // Replace parameters like {step}, {name}, {count}
  if (params && Object.keys(params).length > 0) {
    Object.keys(params).forEach(p => {
      val = val.replace(new RegExp(`\\{\\s*${p}\\s*\\}`, 'g'), String(params[p]));
    });
  }
  
  return val;
}

export function useI18n() {
  return {
    currentLang,
    isHindi: computed(() => currentLang.value === 'hi' || currentLang.value === 'mr'),
    availableLanguages,
    setLanguage,
    t
  };
}

export const i18nPlugin = {
  install(app) {
    app.config.globalProperties.$t = t;
    app.config.globalProperties.$i18n = {
      currentLang,
      setLanguage,
      availableLanguages,
      t
    };
    app.provide('i18n', {
      currentLang,
      setLanguage,
      availableLanguages,
      t
    });
  }
};
