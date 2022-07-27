module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      padding: {
        quarter: '25%',
        half: '50%',
        'third-quarter': '75%',
        full: '100%'
      },
      paddingBottom: {
        quarter: '25%',
        half: '50%',
        'third-quarter': '75%',
        full: '100%'
      }
    }
  },
  variants: {
    extend: { fontSize: ['hover', 'focus'] }
  },
  plugins: []
};
