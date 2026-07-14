import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EDEFF3",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#14171F",
          soft: "#565B66",
          faint: "#9096A2",
        },
        indigo: {
          DEFAULT: "#3D5AFE",
          soft: "#E8EAFF",
        },
        amber: {
          DEFAULT: "#FF7A45",
          soft: "#FFEBE0",
        },
        line: "#DADDE3",
        okgreen: "#1F9D55",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        blinkCaret: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blinkCaret 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
