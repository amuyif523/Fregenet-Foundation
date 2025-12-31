import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        "ink-muted": "#334155",
        accent: "#c47d30",
        sand: "#f9f3ea"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Source Sans 3", "sans-serif"],
        serif: ["var(--font-serif)", "Merriweather", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
