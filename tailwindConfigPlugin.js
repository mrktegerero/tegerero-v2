import { dataToEsm } from '@rollup/pluginutils';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default function tailwindConfig() {
	let viteConfig;
	return {
		name: 'tailwindConfig',
		enforce: 'pre',

		configResolved(cfg) {
			viteConfig = cfg;
		},
		resolveId(id) {
			if (id === '$tailwind') {
				return '$tailwind';
			}
		},
		async load(id) {
			if (id === '$tailwind') {
				const resolveConfig = require('tailwindcss/resolveConfig.js');
				const config = require('./tailwind.config.cjs');
				const fullConfig = resolveConfig(config);

				const data = {
					screens: fullConfig.theme.screens,
					colors: fullConfig.theme.colors
				};

				return dataToEsm(data, {
					namedExports: viteConfig.json?.namedExports ?? true,
					compact: !!viteConfig.build.minify ?? false,
					preferConst: true
				});
			}
			return null;
		}
	};
}
