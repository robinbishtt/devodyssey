/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      animation: {
        slide: "slide 30s linear infinite",
        fadIn: "fadeIn 0.8s ease-in"
      },
      keyframes: {
        slide: {
          "0%": {
            transform: "translateX(0)"
          },
          "100%": {
            transform: "translateX(-50%)"
          },
        },
        fadeIn: {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          },
        },
      },
    },
  },
  plugins: [],
};

