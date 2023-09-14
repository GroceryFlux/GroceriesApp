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
          //"base-100": "#FEF9E9", //Base-100 is used for main background
          "base-100": "#F1F4F2", //Base-100 is used for main background
          //"primary": "#627fd0", //Primary is used for blue icons
          "primary": "#AA8055", //Primary is used for blue icons
          //"neutral": "#fef3c7", //Neutral is used for secondary backgrounds
          "neutral": "#F4EEEE", //Neutral is used for secondary backgrounds
          //"info": "#605D5C", //Info is used for text
          "info": "#31415C", //Info is used for text
          "info-content": "#9E9E9E", //Info-content is used for placeholders or secondary text
          //"accent": "#fcd34d", //Accent is used for borders
          "accent": "#745E65", //Accent is used for borders
          "secondary": "#F3BF18", //Secondary is used for icon with numbers on cart
        },
        dark: {
          "base-100": "#0f1729", //Base-100 is used for main background
          "primary": "#627fd0", //Primary is used for blue icons
          "neutral": "#1d283a", //Neutral is used for secondary backgrounds
          "info": "#C3C1C1", //Info is used for text          
          "info-content": "#A3A8A8", //Info-content is used for placeholders or secondary text
          "accent": "#475569", //Accent is used for borders
          "secondary": "#004D40", //Secondary is used for icon with numbers on cart
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
