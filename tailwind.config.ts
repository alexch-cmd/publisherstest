import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // BIOME onDark brand palette
        brand: {
          1: "#F3F3F3",
          2: "#131313",
          3: "#E0E0E0",
          4: "#B6B6B6",
          5: "#36E0F8",
          6: "#1F8290",
        },
        neutral: {
          500: "#292929",
          600: "#252525",
          700: "#202020",
          800: "#1C1C1C",
          900: "#131313",
          1000: "#0D0D0D",
        },
        accent: {
          1: "#F191FA",
          2: "#36E0F8",
          3: "#6FD6F2",
          4: "#61ADEB",
          5: "#99A8EA",
        },
        status: {
          success: "#ABF790",
          warning: "#FAFD7E",
          error: "#FF637F",
          info: "#36E0F8",
        },
      },
      fontFamily: {
        heading: ["var(--font-geist-sans)", "sans-serif"],
        body: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(105.76deg, #F191FA -46.96%, #83E3F0 99.99%)",
        "brand-gradient-light":
          "linear-gradient(90.68deg, #F191FA 0%, #83E3F0 99.82%)",
        "card-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      },
      boxShadow: {
        "card-inset": "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2)",
        "glow-teal": "0 0 24px rgba(54, 224, 248, 0.35), 0 0 48px rgba(54, 224, 248, 0.15)",
        "glow-pink": "0 0 24px rgba(241, 145, 250, 0.35), 0 0 48px rgba(241, 145, 250, 0.15)",
        "glow-green": "0 0 20px rgba(171, 247, 144, 0.4), 0 0 40px rgba(171, 247, 144, 0.2)",
        "glow-amber": "0 0 20px rgba(250, 253, 126, 0.4), 0 0 40px rgba(250, 253, 126, 0.2)",
        "glow-red": "0 0 20px rgba(255, 99, 127, 0.4), 0 0 40px rgba(255, 99, 127, 0.2)",
        "elevation-1": "0px 2px 6px 2px rgba(0,0,0,0.16), 0px 1px 2px rgba(0,0,0,0.32)",
        "elevation-2": "0px 4px 8px 4px rgba(0,0,0,0.16), 0px 1px 4px rgba(0,0,0,0.32)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "shimmer-border": "shimmerBorder 3s linear infinite",
        "ticker-in": "tickerIn 0.4s ease-out forwards",
        "fade-pulse": "fadePulse 3s ease-out forwards",
        "flow-dash": "flowDash 1.5s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.15)" },
        },
        shimmerBorder: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        tickerIn: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadePulse: {
          "0%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        flowDash: {
          "0%": { strokeDashoffset: "20" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
