/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...fontFamily.sans],
        cursive: ['Rouge Script', 'cursive'],
      },
      colors: {
        primary: 'var(--ms-color-primary)',
        secondary: 'var(--ms-color-secondary)',
        tertiary: 'var(--ms-color-tertiary)',
      },
    },
  },
  plugins: [],
}
