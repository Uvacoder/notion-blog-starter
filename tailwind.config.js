module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}
