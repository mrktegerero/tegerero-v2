import preprocess from 'svelte-preprocess';
import * as path from 'node:path';

import { fileURLToPath } from 'url';
import adapter from '@sveltejs/adapter-cloudflare-workers'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log(path.resolve(__dirname));
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			typescript: true,
			postcss: {
				configFilePath: path.resolve(__dirname, './postcss.config.cjs')
			}
		})
	],
	vitePlugin: {
		experimental: {
			inspector: true
		}
	},
	kit: {
		version: {
			pollInterval: 60000
		},
		prerender: {
			enabled: false
		},
		//inlineStyleThreshold: 1024,
		/**
		 * {
			external: ['crypto']
		}
		 */
		adapter: adapter()
	}
};

export default config;