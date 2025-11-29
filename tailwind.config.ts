import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#13eca4",
        "background-light": "#f6f8f7",
        "background-dark": "#10221c",
        "light-blue": "#4A90E2",
        "mint-green": "#50E3C2",
        "very-light-grey": "#F8F9FA",
        "dark-grey": "#333333",
        "medium-grey": "#ADB5BD",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [forms],
};

export default config;

