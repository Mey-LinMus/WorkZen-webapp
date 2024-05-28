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
        h1: ["3.5rem", "4rem", "4.5rem", "5rem"],
        h2: ["3rem", "3.5rem", "4rem", "4.5rem"],
        h3: ["2rem", "2.5rem", "3rem", "3.5rem"],
        bodyText: ["1.125rem", "1.25rem", "1.5rem", "1.75rem"],
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
