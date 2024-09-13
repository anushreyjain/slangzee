/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./atoms/*.js",
    "./atoms/**/*.js",
    "./atoms/**/**/*.js",
    "./molecules/*.js",
    "./molecules/**/*.js",
    "./molecules/**/**/*.js",
    "./organisms/*.js",
    "./organisms/**/*.js",
    "./organisms/**/**/*.js",
    "./templates/*.js",
    "./templates/**/*.js",
    "./templates/**/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colors,
      black: "#181818",
      white: {
        900: "#E9E9E9",
        800: "#D6D6D6",
      },
      secondary: {
        900: '#f79d65'
      },
      customGray: {
        900: "#262626",
        800: "#404040",
        700: "#767676",
      },
      customRed: {
        900: '#b33939'
      }
    },
    extend: {
      fontFamily: (theme) => ({
        sans: ["Montserrat", "sans-serif"],
      }),
    },
  },
  plugins: [],
};
