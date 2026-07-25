/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          light: "#F7F8FA",
          dark: "#0F1720",
        },
        ink: {
          light: "#1A1F2B",
          dark: "#E5E7EB",
        },
        primary: {
          50: "#EEF0FD",
          100: "#DCE0FB",
          200: "#B9C1F7",
          300: "#96A3F3",
          400: "#7384EA",
          500: "#4F63D2",
          600: "#3E4FAD",
          700: "#2F3C86",
          800: "#212A5F",
          900: "#141A3D",
        },
        accent: {
          success: "#16A34A",
          warning: "#D97706",
          danger: "#DC2626",
        },
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(20, 26, 61, 0.06), 0 1px 3px 0 rgba(20, 26, 61, 0.08)",
        elevated: "0 8px 24px -4px rgba(20, 26, 61, 0.14)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
