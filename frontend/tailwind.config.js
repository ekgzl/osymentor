import { mtConfig } from "@material-tailwind/react";

/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"

  ],

  theme: {

    extend: {
      screens: {
        'bt': '1240px', // Custom breakpoint
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        mono: ['Noto Sans Mono', 'sans-serif'],
      },
    },  

  },

  plugins: [mtConfig],
  

}
