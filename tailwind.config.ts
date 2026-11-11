import type { Config } from "tailwindcss";

// Mismo sistema que PumpWatch (tokens como canales RGB para que /alpha funcione), pero con los
// azules del CV en PDF: tinta marino, acento #2B4A73 y la marca brillante para los detalles.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: v("ink"), 2: v("ink-2"), 3: v("ink-3") },
        brand: { DEFAULT: v("brand"), hover: v("brand-hover"), soft: v("brand-soft") },
        spark: v("spark"),
        warn: v("warn"),
        sky: v("sky"),
        surface: {
          DEFAULT: v("paper"),
          panel: v("panel"),
          raised: v("raised"),
          sunken: v("sunken"),
          border: v("line"),
          strong: v("line-strong"),
        },
        success: v("success"),
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Sora"', '"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      transitionTimingFunction: { crisp: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        bob: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        ticker: { from: { transform: "translate3d(0,0,0)" }, to: { transform: "translate3d(-50%,0,0)" } },
        "pulse-dot": { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
      },
      animation: {
        bob: "bob 3.6s ease-in-out infinite",
        ticker: "ticker 40s linear infinite",
        "pulse-dot": "pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
} satisfies Config;
