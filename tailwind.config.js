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
        studioBg: '#0C0C0C',
        primaryText: '#F3F4EF',
        mutedText: '#A5A8A1',
        secondaryText: '#D7E2EA',
        limeAccent: '#E30613', // Updated to CircleDot Vibrant Brand Red
        brandRed: '#E30613',
        surfaceDark: '#141414',
        borderDark: '#222222',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
