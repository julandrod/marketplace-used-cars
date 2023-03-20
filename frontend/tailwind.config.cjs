/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "primary-dark": "#17181C",
        "primary-light": "#E3E3E5"
      }
    },
  },
  plugins: [],
};
