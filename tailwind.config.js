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
        sans: ["Segoe UI", "sans-serif"],
        urbane: ["urbane-rounded", "sans - serif"],
      },
      fontSize: {
        h1: "3.5rem",
        h2: "3rem",
        h3: "2rem",
        body: "1.125rem",
      },
    },
  },
  plugins: [],
};
