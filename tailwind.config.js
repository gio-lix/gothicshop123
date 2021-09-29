module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gradientColorStops: theme => ({
      ...theme('colors'),
      'header': '#411568',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'popup': '#430874',
      'input': '#411568',
      'buttonColor': '#2F1A4F',
      'buttonDisable': '#1f182a',
      'buttonHover': '#57348D',
      'childrenColor': '#161417',
      'payButton': '#707070'
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
