/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Playfair Display', 'sans-serif'],
      'serif': ['Inter', 'serif'],
    },
  },
  plugins: [],
}