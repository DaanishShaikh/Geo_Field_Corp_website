/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Mukta', 'Noto Sans Devanagari', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Poppins', 'Noto Sans Devanagari', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        surface: {
          950: '#060A08',
          900: '#0B140F',
          850: '#0F1A14',
          800: '#14221A',
          700: '#1C2F24'
        },
        brand: {
          green: '#22C55E',
          lime: '#A3E635',
          gold: '#FFB800',
          cyan: '#38BDF8'
        },
        ruco: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          dark: '#0f172a',
          teal: '#0f766e',
          gold: '#f59e0b'
        }
      }
    },
  },
  plugins: [],
}
