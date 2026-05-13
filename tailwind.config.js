/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sienna: '#A0522D',
        'sienna-dark': '#8B4513',
        'sienna-light': '#C4693A',
        oak: '#C8A97E',
        cashmere: '#E8DCC8',
        bush: '#1B3A2D',
        'bush-dark': '#122B21',
        charcoal: '#1A1A1A',
        ivory: '#FAF6EE',
        gold: '#C4A55A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['"Libre Baskerville"', 'serif'],
      },
    },
  },
  plugins: [],
}
