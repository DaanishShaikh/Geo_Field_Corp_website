import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F4F1E4",
          50: "#FAF9F5",
          100: "#F4F1E4",
          200: "#E8E3D0",
          300: "#DCD4BC",
        },
        forest: {
          DEFAULT: "#1F3D2B",
          light: "#2A523A",
          dark: "#14291D",
          deep: "#0F1F16",
        },
        nearblack: {
          DEFAULT: "#111813",
          soft: "#1A241D",
        },
        amber: {
          DEFAULT: "#D99A5B",
          hover: "#C8894A",
          glow: "#E8AE73",
          soft: "rgba(217, 154, 91, 0.15)",
        },
        olive: {
          DEFAULT: "#4A6B46",
          light: "#5C8257",
          dark: "#385235",
          soft: "rgba(74, 107, 70, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse": "spin-rev 25s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "spin-rev": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "truckRun": {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(480%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "scanLaser": {
          "0%": { top: "0%" },
          "50%": { top: "96%" },
          "100%": { top: "0%" },
        },
        "dash": {
          "to": { "strokeDashoffset": "-1000" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
