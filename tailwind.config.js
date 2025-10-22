/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // These are your new, simple color names
        'primary': '#000000',
        'surface': '#3D0000',
        'accent': '#950101',
        'highlight': '#FF0000',
        'text': '#EAEAEA',
        'muted': '#B3B3B3',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 12px #FF0000',
        'glow-md': '0 0 16px #FF0000',
      }
    },
  },
  plugins: [],
}