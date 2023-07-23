/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "Dark-purple": "#081A51",
        "light-white": "rgb(255,255,255,0,18)"
      }
    },
  },
  plugins: [],
}

