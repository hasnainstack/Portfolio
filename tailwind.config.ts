import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        "ink-soft": "#8B98AF",
        paper: "#ECE7DD",
        line: "#23324A",
        signal: "#FF6A3D",
        confidence: "#3DDC97",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, #23324A 1px, transparent 1px), linear-gradient(to bottom, #23324A 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
