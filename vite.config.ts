import { sveltekit } from '@sveltejs/kit/vite';
import { execSync } from 'node:child_process';
import type { UserConfig } from 'vite';
import * as path from 'path';

const commitHash = execSync('git rev-parse HEAD').toString().trimEnd();

/** @type {import('vite').UserConfig} */
const config: UserConfig = {
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				hoistTransitiveImports: false
			}
		}
	},
	define: {
		__COMMIT_HASH__: `"${commitHash}"`
	},
	resolve: {
		alias: {
			$images: path.resolve('./src/images'),
			$video: path.resolve('./src/video'),
			$src: path.resolve('./src'),
			$components: path.resolve('./src/components')
		}
	}
};

export default config;
