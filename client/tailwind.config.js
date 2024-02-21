/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        blue: {
          kpmgBlue: '#00338D',
        },
        black: {
          custom1: '#333D49',
        },
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
