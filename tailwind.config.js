/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        bounce: "bounce 2s infinite",
      },
      colors: {
        primaryColor: "#0A1128",
        secondaryColor: "#08405A",
        neutralColor: "#FFFAFA",
      },
      fontFamily: {
        segoe: ["Segoe UI", "sans-serif"],
        urbane: ["urbane-rounded", "sans-serif"],
      },
      fontSize: {
        h1: ["3.5rem"],
        h2: ["3rem"],
        h3: ["2rem"],
        bodyText: ["1.125rem"],
      },
  
      size: {
        128: "25rem",
      },
      gradientColorStops: {
        "custom-gradient-start": "rgba(21,80,108,1)",
        "custom-gradient-middle": "rgba(6,40,59,1)",
        "custom-gradient-end": "rgba(10,17,40,1)",
      },
    },
  },
  plugins: [],
};
