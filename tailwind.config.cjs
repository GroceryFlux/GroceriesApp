/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightTextColor: "#323159"
      }
    },
  },
  daisyui: {
    themes: [
      {
        day: {
          "base-100": "#FEF9E9", //Base-100 is used for main background
          "base-200": "#E3E1D7", //Base-200 is used for secondary background
          "primary": "#627fd0", //Primary is used for blue icons
          "neutral": "#FFFDF2", //Neutral is used for borders
          "info": "#605D5C", //Info is used for text
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
          "base-200": "#1B090E",
          "primary": "#627fd0",
          "info": "#C3C1C1",
        } 
      },
      //     "coffee",
      //     "winter"
    ],
  },
  plugins: [require('daisyui')],
};
