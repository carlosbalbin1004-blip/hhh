
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'ink': '#060606',
        'navy': '#0b3b66',
        'ivory': '#FAF6F0',
        'gold-soft': '#C9A36B',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        ui: ['Montserrat', 'Inter', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
}
