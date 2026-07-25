/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#89A6FB',
          100: '#4C6FAF',
          200: '#3E5C94',
          300: '#2E4A7D',
          400: '#243B53',
          500: '#1C3D5A',
          600: '#102A43',
          700: '#0A1A2F',
          800: '#0A1A2F',
          900: '#0A1A2F',
          950: '#0A1A2F',
        },
      },
    },
  },
  plugins: [],
}
