/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#FF4747',
        'brand-orange': '#FF8C32',
        'brand-dark': '#0E0E0E',
        'surface-dark': '#1C1C1C',
        'text-light': '#E6E6E6',
        'text-muted': '#A8A8A8',
        'brand-yellow': '#FFD34D',
      }
    },
  },
  plugins: [],
}