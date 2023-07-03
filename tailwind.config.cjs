/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
      }
    },
  },
  daisyui: {
    themes: [
      {
        day: {
          "base-100": "#FEF9E9",
          "primary": "#627fd0",
          "neutral": "#FFFDF2",
        },
      },
      //     "light",
      //     "dark",
      //     "cupcake",
      //     "bumblebee",
      //     "emerald",
      //     "corporate",
      //     "synthwave",
      "retro",
      //     "cyberpunk",
      //     "valentine",
      //     "halloween",
      //     "garden",
      //     "forest",
      //     "aqua",
      //     "lofi",
      //     "pastel",
      //     "fantasy",
      //     "wireframe",
      //     "black",
      //     "luxury",
      //     "dracula",
      //     "cmyk",
      //     "autumn",
      //     "business",
      //     "acid",
      //     "lemonade",
      { 
        night: {
          ...require("daisyui/src/theming/themes")["[data-theme=night]"],
          "primary": "#627fd0"
        } 
      },
      //     "coffee",
      //     "winter"
    ],
  },
  plugins: [require('daisyui')],
};
