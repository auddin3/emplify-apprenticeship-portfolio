/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#003366',
      },
      fontFamily: {
        customFont: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
