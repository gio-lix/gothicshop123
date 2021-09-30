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
    extend: {
      width: {
        '1/29': '1.813rem',
        '1/540': '33.75rem',
        '1/11': '65.75rem'
      },
      fontSize: {
        "ss": '0.813rem'
      },
      height: {
        sm: '0.188rem',
        ss: '1.063rem',
        fh: '28.125rem',
        lh: '18.75rem',
        ic: '34.125rem',
        ib: '38.125rem',
        ih: '48.125rem'
      },
      padding: {
        st: '18px',
        tt: '66px',
      },
      zIndex: {
        '175': 175,
      },
      minHeight: {
        '1/96': '18rem',
        '1/99': '26rem',
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
