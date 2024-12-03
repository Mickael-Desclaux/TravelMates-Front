/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'green': '#185C22',
      'white': '#FCFFFC',
      'black': '#041010',
      'light-white': '#FFFFFF'
    },
    fontFamily: {
      sans: ['"Oxygen"', 'sans-serif'],
      title: ['"Quicksand"', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
})

