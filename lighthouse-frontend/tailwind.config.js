/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'changa': ['Changa', 'sans-serif'], // Add this line
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

