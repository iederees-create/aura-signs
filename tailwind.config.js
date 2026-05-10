/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        aura: {
          black: '#080806',
          ivory: '#F2EDE6',
          bone: '#E8DFD0',
          gold: '#C9A96E',
          terra: '#C9603A',
          sage: '#7A8C6E',
        }
      }
    },
  },
  plugins: [],
}
