import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ habilita modo oscuro controlado por clase
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f6ff",
          100: "#e6edff",
          200: "#ccdbff",
          300: "#9bb8ff",
          400: "#6b93ff",
          500: "#3d6dff",
          600: "#274fe6",
          700: "#1f3fb8",
          800: "#1b3596",
          900: "#162c7a",
        },
        ink: "#0b1020",
      },
      boxShadow: {
        soft: "0 10px 35px rgba(0,0,0,.08)",
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
