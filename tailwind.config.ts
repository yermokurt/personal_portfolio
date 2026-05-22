import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0a0a0f",
          secondary: "#0d0d18",
        },
        surface: {
          DEFAULT: "#111120",
          elevated: "#161628",
          card: "#13131f",
        },
        accent: {
          DEFAULT: "#f97316",
          light: "#fb923c",
          dark: "#ea6c06",
          glow: "rgba(249, 115, 22, 0.15)",
        },
        navy: {
          DEFAULT: "#0a0f1e",
          light: "#111827",
          deep: "#060912",
        },
        muted: {
          DEFAULT: "#6b7280",
          light: "#9ca3af",
          dark: "#4b5563",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.06)",
          hover: "rgba(249, 115, 22, 0.3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem,8vw,6.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem,6vw,4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem,4vw,3.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem,3vw,2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.25rem,2.5vw,1.75rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      },
      spacing: {
        section: "clamp(5rem, 10vw, 9rem)",
        container: "clamp(1rem, 5vw, 2rem)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "accent-glow": "radial-gradient(ellipse at center, rgba(249,115,22,0.15) 0%, transparent 70%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
      boxShadow: {
        "accent-glow": "0 0 40px rgba(249, 115, 22, 0.2)",
        "accent-sm": "0 0 20px rgba(249, 115, 22, 0.15)",
        "card": "0 4px 30px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 8px 50px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.22, 1, 0.36, 1)",
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
