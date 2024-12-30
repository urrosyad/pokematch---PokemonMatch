/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pokemon': "url('./assets/pokemon-bg.jpg')",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        pokemon: ['PokemonFont', 'sans-serif']
      },
    },
  },
  plugins: [],
}


