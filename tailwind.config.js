/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#050505",
        gold: "#d4af37",
        danger: "#dc143c",
        crimson: "#8b0000",
        white: "#ffffff",
        "system-green": "#28a745",
      },
      fontFamily: {
        heading: ["Cinzel", "serif"],
        name: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
