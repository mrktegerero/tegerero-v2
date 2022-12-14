// import { sveltekit } from '@sveltejs/kit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { execSync } from 'node:child_process';
import image2 from './image2.js';
import tailwindConfig from './tailwindConfigPlugin.js';
import * as path from 'path';

const commitHash = execSync('git rev-parse HEAD').toString().trimEnd();

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [tailwindConfig(), image2(), sveltekit()],
	build: {
		rollupOptions: {
			output: {
				hoistTransitiveImports: false
			}
		}
	},
	server: {
		port: 3000,
		// watch: {
		// 	ignored: ['!**/node_modules/@porterspaints/queries/**']
		// }
	},
	define: {
		__COMMIT_HASH__: `"${commitHash}"`
	},
	resolve: {
		alias: {
			$images: path.resolve('./src/images'),
			$files: path.resolve('./src/files'),
			$video: path.resolve('./src/video'),
			$src: path.resolve('./src'),
			$components: path.resolve('./src/components')
		}
	}
};

export default config;
