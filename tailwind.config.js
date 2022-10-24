/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--ms-color-primary)',
        secondary: 'var(--ms-color-secondary)',
        tertiary: 'var(--ms-color-tertiary)',
      },
    },
  },
  plugins: [],
}
