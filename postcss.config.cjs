const path = require('node:path');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = {
	plugins: {
		'postcss-import': {},
		'tailwindcss/nesting': {},
		tailwindcss: {
			config: path.resolve(__dirname, 'tailwind.config.cjs')
		},
		autoprefixer: {}
	}
};

if (!dev) {
	config.plugins.cssnano = { preset: 'default' };
}

module.exports = config;
