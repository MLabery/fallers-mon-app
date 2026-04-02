/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fallas-orange': '#f97316',
        'fallas-red': '#ef4444',
        'fallas-yellow': '#eab308',
        'fallas-blue': '#0ea5e9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
