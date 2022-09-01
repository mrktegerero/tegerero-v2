const { text } = require('stream/consumers');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.svelte', './src/**/+page.svelte', './src/**/*.css'],
  theme: {
    fontWeight: {
			...defaultTheme.fontWeight
		},
    fontFamily: {
			//	satoshi: ['PlusJakartaSans', ...defaultTheme.fontFamily.sans],
			// sans: ['PlusJakartaSans', ...defaultTheme.fontFamily.sans],
			cali: ['Calibre', ...defaultTheme.fontFamily.sans],
      monts: ['Montserrat', ...defaultTheme.fontFamily.serif],
			mono: ['SFMono', ...defaultTheme.fontFamily.mono]
		},
    extend: {
      fontSize: {
				'4xs': '0.50rem',
				'3xs': '0.55rem',
				'2xs': '0.65rem',
				'1xs': '11px',
				'1sm': '13px',
				'1base': '15px',
				'3.5xl': '2.1rem'
			},

      colors: {
        primary: '#E3AE22',
        'primary-dark': '#D0A211',
        // secondary: ,
        // dark-text: ,
				'white-bg': '#EDEDED',
        'dark-bg': '#222629',
				'dark-text': '#0B0B0B',
        'muted-text': '#353539',
        'light-text': '#FEFEFE',

      },

      letterSpacing: {
				tightest: '-.075em',
				tighter: '-.05em',
				tight: '-.025em',
				normal: '.005em',
				wide: '.01em',
				wider: '.1em',
				widest: '.2em'
			},
    },
  },
  plugins: [],
}
