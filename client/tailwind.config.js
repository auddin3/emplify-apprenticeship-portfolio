/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          kpmgBlue: '#00338D',
          mediumBlue: '#005EB8',
          lightBlue: '#0071b6',
        },
        purple: {
          violet: '#483698',
          purple: '#470A68',
          lightPurple: '#6D2077',
        },
        green: {
          turquoise: '#007E7D',
          forestGreen: '#009A44',
          lightGreen: '#43B02A',
        },
        pink: '#C6007E',
        black: { custom1: '#333D49' },
        gray: { paleGray: '#F8F9FD' },
        orange: '#F68D2E',
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
        sansBold: ['Source Sans Pro Bold', 'sans-serif'],
        sansSemibold: ['Source Sans Pro Semibold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
