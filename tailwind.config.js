/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
        h1: "3.5rem",
        h2: "3rem",
        h3: "2rem",
        bodyText: "1.125rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      size: {
        128: "25rem",
      },
    },
  },
  plugins: [],
};
