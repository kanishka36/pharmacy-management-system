/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounceX: {
          "0%, 100%": {
            transform: "translateX(-25%)",
          },
          "50%": {
            transform: "translateY(0)",
          },
        },
      },
    },
    fontFamily: {
      poppins: ["poppins", "sans-serif"],
    },
  },
  plugins: [],
};
