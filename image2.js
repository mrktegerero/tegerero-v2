import { createFilter, dataToEsm } from '@rollup/pluginutils';
import MagicString from 'magic-string';

import { createRequire } from 'module';
import { basename, extname, join } from 'path';
import sharp from 'sharp';
import { createHash } from 'crypto';

const require = createRequire(import.meta.url);

function generateImageID(url, config) {
	const baseURL = url.host
		? new URL(url.origin + url.pathname)
		: new URL(url.protocol + url.pathname);

	return createHash('sha1').update(baseURL.href).update(JSON.stringify(config)).digest('hex');
}

function parseURL(rawURL) {
	return new URL(rawURL.replace(/#/g, '%23'), 'file://');
}

const defaultOptions = {
	include: '**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*',
	exclude: 'public/**/*',
	silent: false,
	removeMetadata: true
};

function* getWidths(width) {
	yield Math.round(width * 0.125);
	yield Math.round(width * 0.25);
	yield Math.round(width * 0.375);
	yield Math.round(width * 0.5);
	yield Math.round(width * 0.625);
	yield Math.round(width * 0.75);
	yield Math.round(width * 0.875);
	yield Math.round(width);
	yield Math.round(width * 1.125);
	yield Math.round(width * 1.25);
	yield Math.round(width * 1.375);
	yield Math.round(width * 1.5);
}

export default function image2(userOptions = {}) {
	const pluginOptions = { ...defaultOptions, ...userOptions };

	const filter = createFilter(pluginOptions.include, pluginOptions.exclude);
	let viteConfig;

	const resolveConfig = require('tailwindcss/resolveConfig.js');
	const tailwindConfig = require('./tailwind.config.cjs');

	const { theme } = resolveConfig(tailwindConfig);

	/** @type {Map<string, import('sharp').Sharp} */
	const generatedImages = new Map();
	return {
		name: 'image2',
		enforce: 'pre',

		configResolved(cfg) {
			viteConfig = cfg;
		},
		async load(id) {
			if (!filter(id)) return null;

			const srcURL = parseURL(id);
			const isSingle = srcURL.searchParams.has('single');

			const img = sharp(decodeURIComponent(srcURL.pathname));
			const meta = await img.metadata();

			const buffer = await img.clone().resize(24).png().toBuffer();
			const str = buffer.toString('base64');
			let data;

			if (!isSingle) {
				const defaultWidth = srcURL.searchParams.get('default') ?? '100vw';

				const xs = srcURL.searchParams.get('xs') ?? defaultWidth;
				const sm = srcURL.searchParams.get('sm') ?? xs;
				const md = srcURL.searchParams.get('md') ?? sm;
				const lg = srcURL.searchParams.get('lg') ?? md;
				const xl = srcURL.searchParams.get('xl') ?? lg;

				const sizes = [
					`(min-width: ${theme.screens.xl}) ${xl}`,
					`(min-width: ${theme.screens.lg}) ${lg}`,
					`(min-width: ${theme.screens.md}) ${md}`,
					`(min-width: ${theme.screens.sm}) ${sm}`,
					`(min-width: ${theme.screens.xs}) ${xs}`,
					defaultWidth
				];

				const w = parseInt(srcURL.searchParams.get('w') ?? '32', 10);
				const quality = parseInt(srcURL.searchParams.get('q') ?? '80', 10);
				let lossless = srcURL.searchParams.has('lossless');
				let srcs = [];

				for (let width of getWidths(w)) {
					const id = generateImageID(srcURL, { width, quality, lossless });
					const webp = img
						.clone()
						.resize(width)
						.webp({ quality, nearLossless: lossless, smartSubsample: true });
					generatedImages.set(id, webp);

					if (!this.meta.watchMode) {
						const fileName = basename(srcURL.pathname, extname(srcURL.pathname)) + `.webp`;
						const fileHandle = this.emitFile({
							name: fileName,
							source: await webp.toBuffer(),
							type: 'asset'
						});
						srcs.push({ src: `__VITE_IMAGE_ASSET__${fileHandle}__`, width });
					} else {
						srcs.push({ src: join('/@image2', id), width });
					}
				}

				data = {
					sizes: sizes.join(', '),
					srcset: srcs.map(({ src, width }) => `${src} ${width}w`).join(', '),
					width: w,
					height: (meta.height / meta.width) * w,
					placeholder: `data:image/png;base64,${str}`
				};
			} else {
				let width = parseInt(srcURL.searchParams.get('w') ?? meta.width.toString(), 10);
				let quality = parseInt(srcURL.searchParams.get('q') ?? '80', 10);
				let lossless = srcURL.searchParams.has('lossless');
				let clone = img.clone();
				let src;
				clone = clone.resize(width);
				const webp = clone.webp({ quality, nearLossless: lossless, smartSubsample: true });
				const id = generateImageID(srcURL, { width, quality, lossless });

				generatedImages.set(id, webp);
				if (!this.meta.watchMode) {
					const fileName = basename(srcURL.pathname, extname(srcURL.pathname)) + `.webp`;
					const fileHandle = this.emitFile({
						name: fileName,
						source: await webp.toBuffer(),
						type: 'asset'
					});
					src = `__VITE_IMAGE_ASSET__${fileHandle}__`;
				} else {
					src = join('/@image2', id);
				}
				data = {
					src,
					width,
					height: (meta.height / meta.width) * width,
					placeholder: `data:image/png;base64,${str}`
				};
			}

			return dataToEsm(data, {
				namedExports: viteConfig.json?.namedExports ?? true,
				compact: !!viteConfig.build.minify ?? false,
				preferConst: true
			});
		},
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				if (req.url?.startsWith('/@image2/')) {
					const [, id] = req.url.split('/@image2/');

					const image = generatedImages.get(id);

					if (!image) {
						next();
						return;
					}

					res.setHeader('Content-Type', `image/webp`);
					res.setHeader('Cache-Control', 'max-age=360000');
					return image.clone().pipe(res);
				}
				next();
			});
		},
		renderChunk(code) {
			const assetUrlRE = /__VITE_IMAGE_ASSET__([a-z\d]{8})__(?:_(.*?)__)?/g;

			let match;
			let s;
			while ((match = assetUrlRE.exec(code))) {
				s = s || (s = new MagicString(code));
				const [full, hash, postfix = ''] = match;

				const file = this.getFileName(hash);

				let outputFilepath = viteConfig.base + file + postfix;
				if (outputFilepath.startsWith('.')) {
					outputFilepath = outputFilepath.substring(1);
				}

				s.overwrite(match.index, match.index + full.length, outputFilepath);
			}

			if (s) {
				return {
					code: s.toString(),
					map: viteConfig.build.sourcemap ? s.generateMap({ hires: true }) : null
				};
			} else {
				return null;
			}
		}
	};
}
