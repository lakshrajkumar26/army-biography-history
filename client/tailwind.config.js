/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'museum-bg': '#f5f3ef',
        'museum-sidebar': '#eceae6',
        'museum-hover': '#e2dfdb',
        'museum-dark': '#2f3135',
        'museum-burgundy': '#4b1f22',
        'museum-border': '#7b3a3f',
        'museum-text': '#555',
        'museum-light-text': '#c9b6b6',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'baskerville': ['Libre Baskerville', 'serif'],
      },
    },
  },
  plugins: [],
}