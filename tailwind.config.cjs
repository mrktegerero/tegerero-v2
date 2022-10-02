const { text } = require('stream/consumers');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.html', './src/**/*.svelte', './src/**/+page.svelte', './src/**/*.css'],
	theme: {
		animationDelay: {
			100: '100ms',
			200: '200ms',
			300: '300ms',
			400: '400ms',
			500: '500ms',
			600: '600ms',
			700: '700ms',
			800: '800ms',
			900: '900ms',
			1000: '1000ms',
			1100: '1100ms',
			1200: '1200ms',
			1400: '1400ms',
			1600: '1600ms',
			1700: '1700ms',
			1800: '1800ms',
			2200: '2200ms',
			2400: '2400ms'
		},
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
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-10deg)' },
					'50%': { transform: 'rotate(10deg)' }
				},
				show: {
					'0%': { top: '-42px', opacity: '0' },
					'20%': { top: '-42px', opacity: '0' },
					'100%': { top: '0', opacity: '1' }
				},
				opacity: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				left: {
					'0%': {
						opacity: '0',
						transform: 'scale(.1)'
					},

					'85%': {
						opacity: '1',
						transform: 'scale(1.05)'
					},
					'100%': {
						transform: 'scale(1)'
					}
				}
			},

			fontSize: {
				'4xs': '0.50rem',
				'3xs': '0.55rem',
				'2xs': '0.65rem',
				'1xs': '11px',
				'1sm': '13px',
				'1base': '15px',
				'3.5xl': '2.1rem',
				'4xl': 'calc(3.1rem + 1.2vw)',
				'5xl': 'calc(5.35rem + 1.2vw)'
			},

			colors: {
				primary: '#64F4AC',
				'primary-dark': '#D0A211',
				secondary: '#25554F',
				// dark-text: ,
				'white-bg': '#EDEDED',
				'mute-bg': '#4D4E52',
				'dark-bg': '#2D2E32',
				'darker-bg': '#25262A',
				'muted-dark-bg': '#333438',
				'dark-text': '#0B0B0B',
				'mute-text': '#656565',
				'muted-text': '#8B8C90',
				'light-text': '#FFFFFF'
			},

			letterSpacing: {
				tightest: '-.075em',
				tighter: '-.05em',
				tight: '-.025em',
				normal: '.005em',
				wide: '.01em',
				wider: '.1em',
				widest: '.2em'
			}
		},
		screens: {
			xxs: '360px',
			xs: '480px',
			...defaultTheme.screens,
			'3xl': '1850px'
		}
	},
	variants: {
		animationDelay: ['responsive', 'hover'],
		animationFillMode: ['responsive']
	},
	plugins: [require('tailwindcss-animation-delay'), require('tailwindcss-animation')]
};
