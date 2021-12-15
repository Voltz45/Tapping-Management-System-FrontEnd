module.exports = {
  mode: 'jit',
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  purge: {
    enabled: true,
  },
  content: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'Poppins': ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji'],
    },
    screens: {
      'sm': {'max': '550px'}
    },
    extend: {
      width: {
        '68px': '68px'
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height'
      },
      gridTemplateColumns: {
        'template-columns': ' repeat(4, 25%)',
        '550px-columns': '1fr'
      },
      gridTemplateRows: {
        'template-rows': '0.2fr 1.5fr 1.2fr 0.8fr',
        '550px-rows': 'repeat(2, 0.4fr) 2.2fr repeat(3, 1.2fr) 1fr'
      }
    },
  },
  variants: {
    extend: {},
    width: ['responsive', 'hover', 'focus']
  },
  plugins: [],
}
