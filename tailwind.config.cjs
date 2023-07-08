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
        light: {
          "base-100": "#FEF9E9", //Base-100 is used for main background
          "primary": "#627fd0", //Primary is used for blue icons
          "neutral": "#fef3c7", //Neutral is used for secondary backgrounds
          "info": "#605D5C", //Info is used for text
          "accent": "#fcd34d", //Accent is used for borders
        },
        dark: {
          "base-100": "#0f1729", //Base-100 is used for main background
          "primary": "#627fd0", //Primary is used for blue icons
          "neutral": "#1d283a", //Neutral is used for secondary backgrounds
          "info": "#C3C1C1", //Info is used for text
          "accent": "#475569", //Accent is used for borders
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
