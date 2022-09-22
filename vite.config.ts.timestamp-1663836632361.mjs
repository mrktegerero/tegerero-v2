// vite.config.ts
import { sveltekit } from "@sveltejs/kit/vite";
import { execSync } from "node:child_process";

// image2.js
import { createFilter, dataToEsm } from "@rollup/pluginutils";
import MagicString from "magic-string";
import { createRequire } from "module";
import { basename, extname, join } from "path";
import sharp from "sharp";
import { createHash } from "crypto";
var __vite_injected_original_import_meta_url = "file:///C:/Users/KurtTegerero/Desktop/tegerero-v2/tegerero-v2/image2.js";
var require2 = createRequire(__vite_injected_original_import_meta_url);
function generateImageID(url, config2) {
  const baseURL = url.host ? new URL(url.origin + url.pathname) : new URL(url.protocol + url.pathname);
  return createHash("sha1").update(baseURL.href).update(JSON.stringify(config2)).digest("hex");
}
function parseURL(rawURL) {
  return new URL(rawURL.replace(/#/g, "%23"), "file://");
}
var defaultOptions = {
  include: "**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*",
  exclude: "public/**/*",
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
function image2(userOptions = {}) {
  const pluginOptions = { ...defaultOptions, ...userOptions };
  const filter = createFilter(pluginOptions.include, pluginOptions.exclude);
  let viteConfig;
  const resolveConfig = require2("tailwindcss/resolveConfig.js");
  const tailwindConfig2 = require2("./tailwind.config.cjs");
  const { theme } = resolveConfig(tailwindConfig2);
  const generatedImages = /* @__PURE__ */ new Map();
  return {
    name: "image2",
    enforce: "pre",
    configResolved(cfg) {
      viteConfig = cfg;
    },
    async load(id) {
      var _a;
      if (!filter(id))
        return null;
      const srcURL = parseURL(id);
      const isSingle = srcURL.searchParams.has("single");
      const img = sharp(decodeURIComponent(srcURL.pathname));
      const meta = await img.metadata();
      const buffer = await img.clone().resize(24).png().toBuffer();
      const str = buffer.toString("base64");
      let data;
      if (!isSingle) {
        const defaultWidth = srcURL.searchParams.get("default") ?? "100vw";
        const xs = srcURL.searchParams.get("xs") ?? defaultWidth;
        const sm = srcURL.searchParams.get("sm") ?? xs;
        const md = srcURL.searchParams.get("md") ?? sm;
        const lg = srcURL.searchParams.get("lg") ?? md;
        const xl = srcURL.searchParams.get("xl") ?? lg;
        const sizes = [
          `(min-width: ${theme.screens.xl}) ${xl}`,
          `(min-width: ${theme.screens.lg}) ${lg}`,
          `(min-width: ${theme.screens.md}) ${md}`,
          `(min-width: ${theme.screens.sm}) ${sm}`,
          `(min-width: ${theme.screens.xs}) ${xs}`,
          defaultWidth
        ];
        const w = parseInt(srcURL.searchParams.get("w") ?? "32", 10);
        const quality = parseInt(srcURL.searchParams.get("q") ?? "80", 10);
        let lossless = srcURL.searchParams.has("lossless");
        let srcs = [];
        for (let width of getWidths(w)) {
          const id2 = generateImageID(srcURL, { width, quality, lossless });
          const webp = img.clone().resize(width).webp({ quality, nearLossless: lossless, smartSubsample: true });
          generatedImages.set(id2, webp);
          if (!this.meta.watchMode) {
            const fileName = basename(srcURL.pathname, extname(srcURL.pathname)) + `.webp`;
            const fileHandle = this.emitFile({
              name: fileName,
              source: await webp.toBuffer(),
              type: "asset"
            });
            srcs.push({ src: `__VITE_IMAGE_ASSET__${fileHandle}__`, width });
          } else {
            srcs.push({ src: join("/@image2", id2), width });
          }
        }
        data = {
          sizes: sizes.join(", "),
          srcset: srcs.map(({ src, width }) => `${src} ${width}w`).join(", "),
          width: w,
          height: meta.height / meta.width * w,
          placeholder: `data:image/png;base64,${str}`
        };
      } else {
        let width = parseInt(srcURL.searchParams.get("w") ?? meta.width.toString(), 10);
        let quality = parseInt(srcURL.searchParams.get("q") ?? "80", 10);
        let lossless = srcURL.searchParams.has("lossless");
        let clone = img.clone();
        let src;
        clone = clone.resize(width);
        const webp = clone.webp({ quality, nearLossless: lossless, smartSubsample: true });
        const id2 = generateImageID(srcURL, { width, quality, lossless });
        generatedImages.set(id2, webp);
        if (!this.meta.watchMode) {
          const fileName = basename(srcURL.pathname, extname(srcURL.pathname)) + `.webp`;
          const fileHandle = this.emitFile({
            name: fileName,
            source: await webp.toBuffer(),
            type: "asset"
          });
          src = `__VITE_IMAGE_ASSET__${fileHandle}__`;
        } else {
          src = join("/@image2", id2);
        }
        data = {
          src,
          width,
          height: meta.height / meta.width * width,
          placeholder: `data:image/png;base64,${str}`
        };
      }
      return dataToEsm(data, {
        namedExports: ((_a = viteConfig.json) == null ? void 0 : _a.namedExports) ?? true,
        compact: !!viteConfig.build.minify,
        preferConst: true
      });
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        var _a;
        if ((_a = req.url) == null ? void 0 : _a.startsWith("/@image2/")) {
          const [, id] = req.url.split("/@image2/");
          const image = generatedImages.get(id);
          if (!image) {
            next();
            return;
          }
          res.setHeader("Content-Type", `image/webp`);
          res.setHeader("Cache-Control", "max-age=360000");
          return image.clone().pipe(res);
        }
        next();
      });
    },
    renderChunk(code) {
      const assetUrlRE = /__VITE_IMAGE_ASSET__([a-z\d]{8})__(?:_(.*?)__)?/g;
      let match;
      let s;
      while (match = assetUrlRE.exec(code)) {
        s = s || (s = new MagicString(code));
        const [full, hash, postfix = ""] = match;
        const file = this.getFileName(hash);
        let outputFilepath = viteConfig.base + file + postfix;
        if (outputFilepath.startsWith(".")) {
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

// tailwindConfigPlugin.js
import { dataToEsm as dataToEsm2 } from "@rollup/pluginutils";
import { createRequire as createRequire2 } from "module";
var __vite_injected_original_import_meta_url2 = "file:///C:/Users/KurtTegerero/Desktop/tegerero-v2/tegerero-v2/tailwindConfigPlugin.js";
var require3 = createRequire2(__vite_injected_original_import_meta_url2);
function tailwindConfig() {
  let viteConfig;
  return {
    name: "tailwindConfig",
    enforce: "pre",
    configResolved(cfg) {
      viteConfig = cfg;
    },
    resolveId(id) {
      if (id === "$tailwind") {
        return "$tailwind";
      }
    },
    async load(id) {
      var _a;
      if (id === "$tailwind") {
        const resolveConfig = require3("tailwindcss/resolveConfig.js");
        const config2 = require3("./tailwind.config.cjs");
        const fullConfig = resolveConfig(config2);
        const data = {
          screens: fullConfig.theme.screens,
          colors: fullConfig.theme.colors
        };
        return dataToEsm2(data, {
          namedExports: ((_a = viteConfig.json) == null ? void 0 : _a.namedExports) ?? true,
          compact: !!viteConfig.build.minify,
          preferConst: true
        });
      }
      return null;
    }
  };
}

// vite.config.ts
import * as path from "path";
var commitHash = execSync("git rev-parse HEAD").toString().trimEnd();
var config = {
  plugins: [tailwindConfig(), image2(), sveltekit()],
  build: {
    rollupOptions: {
      output: {
        hoistTransitiveImports: false
      }
    }
  },
  server: {
    port: 3e3
  },
  define: {
    __COMMIT_HASH__: `"${commitHash}"`
  },
  resolve: {
    alias: {
      $images: path.resolve("./src/images"),
      $files: path.resolve("./src/files"),
      $video: path.resolve("./src/video"),
      $src: path.resolve("./src"),
      $components: path.resolve("./src/components")
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiaW1hZ2UyLmpzIiwgInRhaWx3aW5kQ29uZmlnUGx1Z2luLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcS3VydFRlZ2VyZXJvXFxcXERlc2t0b3BcXFxcdGVnZXJlcm8tdjJcXFxcdGVnZXJlcm8tdjJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEt1cnRUZWdlcmVyb1xcXFxEZXNrdG9wXFxcXHRlZ2VyZXJvLXYyXFxcXHRlZ2VyZXJvLXYyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9LdXJ0VGVnZXJlcm8vRGVza3RvcC90ZWdlcmVyby12Mi90ZWdlcmVyby12Mi92aXRlLmNvbmZpZy50c1wiOy8vIGltcG9ydCB7IHN2ZWx0ZWtpdCB9IGZyb20gJ0BzdmVsdGVqcy9raXQvdml0ZSc7XG5pbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGltYWdlMiBmcm9tICcuL2ltYWdlMi5qcyc7XG5pbXBvcnQgdGFpbHdpbmRDb25maWcgZnJvbSAnLi90YWlsd2luZENvbmZpZ1BsdWdpbi5qcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBjb21taXRIYXNoID0gZXhlY1N5bmMoJ2dpdCByZXYtcGFyc2UgSEVBRCcpLnRvU3RyaW5nKCkudHJpbUVuZCgpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9ICovXG5jb25zdCBjb25maWcgPSB7XG5cdHBsdWdpbnM6IFt0YWlsd2luZENvbmZpZygpLCBpbWFnZTIoKSwgc3ZlbHRla2l0KCldLFxuXHRidWlsZDoge1xuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdG91dHB1dDoge1xuXHRcdFx0XHRob2lzdFRyYW5zaXRpdmVJbXBvcnRzOiBmYWxzZVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0c2VydmVyOiB7XG5cdFx0cG9ydDogMzAwMCxcblx0XHQvLyB3YXRjaDoge1xuXHRcdC8vIFx0aWdub3JlZDogWychKiovbm9kZV9tb2R1bGVzL0Bwb3J0ZXJzcGFpbnRzL3F1ZXJpZXMvKionXVxuXHRcdC8vIH1cblx0fSxcblx0ZGVmaW5lOiB7XG5cdFx0X19DT01NSVRfSEFTSF9fOiBgXCIke2NvbW1pdEhhc2h9XCJgXG5cdH0sXG5cdHJlc29sdmU6IHtcblx0XHRhbGlhczoge1xuXHRcdFx0JGltYWdlczogcGF0aC5yZXNvbHZlKCcuL3NyYy9pbWFnZXMnKSxcblx0XHRcdCRmaWxlczogcGF0aC5yZXNvbHZlKCcuL3NyYy9maWxlcycpLFxuXHRcdFx0JHZpZGVvOiBwYXRoLnJlc29sdmUoJy4vc3JjL3ZpZGVvJyksXG5cdFx0XHQkc3JjOiBwYXRoLnJlc29sdmUoJy4vc3JjJyksXG5cdFx0XHQkY29tcG9uZW50czogcGF0aC5yZXNvbHZlKCcuL3NyYy9jb21wb25lbnRzJylcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcS3VydFRlZ2VyZXJvXFxcXERlc2t0b3BcXFxcdGVnZXJlcm8tdjJcXFxcdGVnZXJlcm8tdjJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEt1cnRUZWdlcmVyb1xcXFxEZXNrdG9wXFxcXHRlZ2VyZXJvLXYyXFxcXHRlZ2VyZXJvLXYyXFxcXGltYWdlMi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvS3VydFRlZ2VyZXJvL0Rlc2t0b3AvdGVnZXJlcm8tdjIvdGVnZXJlcm8tdjIvaW1hZ2UyLmpzXCI7aW1wb3J0IHsgY3JlYXRlRmlsdGVyLCBkYXRhVG9Fc20gfSBmcm9tICdAcm9sbHVwL3BsdWdpbnV0aWxzJztcclxuaW1wb3J0IE1hZ2ljU3RyaW5nIGZyb20gJ21hZ2ljLXN0cmluZyc7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVSZXF1aXJlIH0gZnJvbSAnbW9kdWxlJztcclxuaW1wb3J0IHsgYmFzZW5hbWUsIGV4dG5hbWUsIGpvaW4gfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHNoYXJwIGZyb20gJ3NoYXJwJztcclxuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gJ2NyeXB0byc7XHJcblxyXG5jb25zdCByZXF1aXJlID0gY3JlYXRlUmVxdWlyZShpbXBvcnQubWV0YS51cmwpO1xyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVJbWFnZUlEKHVybCwgY29uZmlnKSB7XHJcblx0Y29uc3QgYmFzZVVSTCA9IHVybC5ob3N0XHJcblx0XHQ/IG5ldyBVUkwodXJsLm9yaWdpbiArIHVybC5wYXRobmFtZSlcclxuXHRcdDogbmV3IFVSTCh1cmwucHJvdG9jb2wgKyB1cmwucGF0aG5hbWUpO1xyXG5cclxuXHRyZXR1cm4gY3JlYXRlSGFzaCgnc2hhMScpLnVwZGF0ZShiYXNlVVJMLmhyZWYpLnVwZGF0ZShKU09OLnN0cmluZ2lmeShjb25maWcpKS5kaWdlc3QoJ2hleCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVVSTChyYXdVUkwpIHtcclxuXHRyZXR1cm4gbmV3IFVSTChyYXdVUkwucmVwbGFjZSgvIy9nLCAnJTIzJyksICdmaWxlOi8vJyk7XHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG5cdGluY2x1ZGU6ICcqKi8qLntoZWljLGhlaWYsYXZpZixqcGVnLGpwZyxwbmcsdGlmZix3ZWJwLGdpZn0/KicsXHJcblx0ZXhjbHVkZTogJ3B1YmxpYy8qKi8qJyxcclxuXHRzaWxlbnQ6IGZhbHNlLFxyXG5cdHJlbW92ZU1ldGFkYXRhOiB0cnVlXHJcbn07XHJcblxyXG5mdW5jdGlvbiogZ2V0V2lkdGhzKHdpZHRoKSB7XHJcblx0eWllbGQgTWF0aC5yb3VuZCh3aWR0aCAqIDAuMTI1KTtcclxuXHR5aWVsZCBNYXRoLnJvdW5kKHdpZHRoICogMC4yNSk7XHJcblx0eWllbGQgTWF0aC5yb3VuZCh3aWR0aCAqIDAuMzc1KTtcclxuXHR5aWVsZCBNYXRoLnJvdW5kKHdpZHRoICogMC41KTtcclxuXHR5aWVsZCBNYXRoLnJvdW5kKHdpZHRoICogMC42MjUpO1xyXG5cdHlpZWxkIE1hdGgucm91bmQod2lkdGggKiAwLjc1KTtcclxuXHR5aWVsZCBNYXRoLnJvdW5kKHdpZHRoICogMC44NzUpO1xyXG5cdHlpZWxkIE1hdGgucm91bmQod2lkdGgpO1xyXG5cdHlpZWxkIE1hdGgucm91bmQod2lkdGggKiAxLjEyNSk7XHJcblx0eWllbGQgTWF0aC5yb3VuZCh3aWR0aCAqIDEuMjUpO1xyXG5cdHlpZWxkIE1hdGgucm91bmQod2lkdGggKiAxLjM3NSk7XHJcblx0eWllbGQgTWF0aC5yb3VuZCh3aWR0aCAqIDEuNSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltYWdlMih1c2VyT3B0aW9ucyA9IHt9KSB7XHJcblx0Y29uc3QgcGx1Z2luT3B0aW9ucyA9IHsgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLnVzZXJPcHRpb25zIH07XHJcblxyXG5cdGNvbnN0IGZpbHRlciA9IGNyZWF0ZUZpbHRlcihwbHVnaW5PcHRpb25zLmluY2x1ZGUsIHBsdWdpbk9wdGlvbnMuZXhjbHVkZSk7XHJcblx0bGV0IHZpdGVDb25maWc7XHJcblxyXG5cdGNvbnN0IHJlc29sdmVDb25maWcgPSByZXF1aXJlKCd0YWlsd2luZGNzcy9yZXNvbHZlQ29uZmlnLmpzJyk7XHJcblx0Y29uc3QgdGFpbHdpbmRDb25maWcgPSByZXF1aXJlKCcuL3RhaWx3aW5kLmNvbmZpZy5janMnKTtcclxuXHJcblx0Y29uc3QgeyB0aGVtZSB9ID0gcmVzb2x2ZUNvbmZpZyh0YWlsd2luZENvbmZpZyk7XHJcblxyXG5cdC8qKiBAdHlwZSB7TWFwPHN0cmluZywgaW1wb3J0KCdzaGFycCcpLlNoYXJwfSAqL1xyXG5cdGNvbnN0IGdlbmVyYXRlZEltYWdlcyA9IG5ldyBNYXAoKTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bmFtZTogJ2ltYWdlMicsXHJcblx0XHRlbmZvcmNlOiAncHJlJyxcclxuXHJcblx0XHRjb25maWdSZXNvbHZlZChjZmcpIHtcclxuXHRcdFx0dml0ZUNvbmZpZyA9IGNmZztcclxuXHRcdH0sXHJcblx0XHRhc3luYyBsb2FkKGlkKSB7XHJcblx0XHRcdGlmICghZmlsdGVyKGlkKSkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0XHRjb25zdCBzcmNVUkwgPSBwYXJzZVVSTChpZCk7XHJcblx0XHRcdGNvbnN0IGlzU2luZ2xlID0gc3JjVVJMLnNlYXJjaFBhcmFtcy5oYXMoJ3NpbmdsZScpO1xyXG5cclxuXHRcdFx0Y29uc3QgaW1nID0gc2hhcnAoZGVjb2RlVVJJQ29tcG9uZW50KHNyY1VSTC5wYXRobmFtZSkpO1xyXG5cdFx0XHRjb25zdCBtZXRhID0gYXdhaXQgaW1nLm1ldGFkYXRhKCk7XHJcblxyXG5cdFx0XHRjb25zdCBidWZmZXIgPSBhd2FpdCBpbWcuY2xvbmUoKS5yZXNpemUoMjQpLnBuZygpLnRvQnVmZmVyKCk7XHJcblx0XHRcdGNvbnN0IHN0ciA9IGJ1ZmZlci50b1N0cmluZygnYmFzZTY0Jyk7XHJcblx0XHRcdGxldCBkYXRhO1xyXG5cclxuXHRcdFx0aWYgKCFpc1NpbmdsZSkge1xyXG5cdFx0XHRcdGNvbnN0IGRlZmF1bHRXaWR0aCA9IHNyY1VSTC5zZWFyY2hQYXJhbXMuZ2V0KCdkZWZhdWx0JykgPz8gJzEwMHZ3JztcclxuXHJcblx0XHRcdFx0Y29uc3QgeHMgPSBzcmNVUkwuc2VhcmNoUGFyYW1zLmdldCgneHMnKSA/PyBkZWZhdWx0V2lkdGg7XHJcblx0XHRcdFx0Y29uc3Qgc20gPSBzcmNVUkwuc2VhcmNoUGFyYW1zLmdldCgnc20nKSA/PyB4cztcclxuXHRcdFx0XHRjb25zdCBtZCA9IHNyY1VSTC5zZWFyY2hQYXJhbXMuZ2V0KCdtZCcpID8/IHNtO1xyXG5cdFx0XHRcdGNvbnN0IGxnID0gc3JjVVJMLnNlYXJjaFBhcmFtcy5nZXQoJ2xnJykgPz8gbWQ7XHJcblx0XHRcdFx0Y29uc3QgeGwgPSBzcmNVUkwuc2VhcmNoUGFyYW1zLmdldCgneGwnKSA/PyBsZztcclxuXHJcblx0XHRcdFx0Y29uc3Qgc2l6ZXMgPSBbXHJcblx0XHRcdFx0XHRgKG1pbi13aWR0aDogJHt0aGVtZS5zY3JlZW5zLnhsfSkgJHt4bH1gLFxyXG5cdFx0XHRcdFx0YChtaW4td2lkdGg6ICR7dGhlbWUuc2NyZWVucy5sZ30pICR7bGd9YCxcclxuXHRcdFx0XHRcdGAobWluLXdpZHRoOiAke3RoZW1lLnNjcmVlbnMubWR9KSAke21kfWAsXHJcblx0XHRcdFx0XHRgKG1pbi13aWR0aDogJHt0aGVtZS5zY3JlZW5zLnNtfSkgJHtzbX1gLFxyXG5cdFx0XHRcdFx0YChtaW4td2lkdGg6ICR7dGhlbWUuc2NyZWVucy54c30pICR7eHN9YCxcclxuXHRcdFx0XHRcdGRlZmF1bHRXaWR0aFxyXG5cdFx0XHRcdF07XHJcblxyXG5cdFx0XHRcdGNvbnN0IHcgPSBwYXJzZUludChzcmNVUkwuc2VhcmNoUGFyYW1zLmdldCgndycpID8/ICczMicsIDEwKTtcclxuXHRcdFx0XHRjb25zdCBxdWFsaXR5ID0gcGFyc2VJbnQoc3JjVVJMLnNlYXJjaFBhcmFtcy5nZXQoJ3EnKSA/PyAnODAnLCAxMCk7XHJcblx0XHRcdFx0bGV0IGxvc3NsZXNzID0gc3JjVVJMLnNlYXJjaFBhcmFtcy5oYXMoJ2xvc3NsZXNzJyk7XHJcblx0XHRcdFx0bGV0IHNyY3MgPSBbXTtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgd2lkdGggb2YgZ2V0V2lkdGhzKHcpKSB7XHJcblx0XHRcdFx0XHRjb25zdCBpZCA9IGdlbmVyYXRlSW1hZ2VJRChzcmNVUkwsIHsgd2lkdGgsIHF1YWxpdHksIGxvc3NsZXNzIH0pO1xyXG5cdFx0XHRcdFx0Y29uc3Qgd2VicCA9IGltZ1xyXG5cdFx0XHRcdFx0XHQuY2xvbmUoKVxyXG5cdFx0XHRcdFx0XHQucmVzaXplKHdpZHRoKVxyXG5cdFx0XHRcdFx0XHQud2VicCh7IHF1YWxpdHksIG5lYXJMb3NzbGVzczogbG9zc2xlc3MsIHNtYXJ0U3Vic2FtcGxlOiB0cnVlIH0pO1xyXG5cdFx0XHRcdFx0Z2VuZXJhdGVkSW1hZ2VzLnNldChpZCwgd2VicCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLm1ldGEud2F0Y2hNb2RlKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IGZpbGVOYW1lID0gYmFzZW5hbWUoc3JjVVJMLnBhdGhuYW1lLCBleHRuYW1lKHNyY1VSTC5wYXRobmFtZSkpICsgYC53ZWJwYDtcclxuXHRcdFx0XHRcdFx0Y29uc3QgZmlsZUhhbmRsZSA9IHRoaXMuZW1pdEZpbGUoe1xyXG5cdFx0XHRcdFx0XHRcdG5hbWU6IGZpbGVOYW1lLFxyXG5cdFx0XHRcdFx0XHRcdHNvdXJjZTogYXdhaXQgd2VicC50b0J1ZmZlcigpLFxyXG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdhc3NldCdcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdHNyY3MucHVzaCh7IHNyYzogYF9fVklURV9JTUFHRV9BU1NFVF9fJHtmaWxlSGFuZGxlfV9fYCwgd2lkdGggfSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRzcmNzLnB1c2goeyBzcmM6IGpvaW4oJy9AaW1hZ2UyJywgaWQpLCB3aWR0aCB9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGRhdGEgPSB7XHJcblx0XHRcdFx0XHRzaXplczogc2l6ZXMuam9pbignLCAnKSxcclxuXHRcdFx0XHRcdHNyY3NldDogc3Jjcy5tYXAoKHsgc3JjLCB3aWR0aCB9KSA9PiBgJHtzcmN9ICR7d2lkdGh9d2ApLmpvaW4oJywgJyksXHJcblx0XHRcdFx0XHR3aWR0aDogdyxcclxuXHRcdFx0XHRcdGhlaWdodDogKG1ldGEuaGVpZ2h0IC8gbWV0YS53aWR0aCkgKiB3LFxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI6IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsJHtzdHJ9YFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bGV0IHdpZHRoID0gcGFyc2VJbnQoc3JjVVJMLnNlYXJjaFBhcmFtcy5nZXQoJ3cnKSA/PyBtZXRhLndpZHRoLnRvU3RyaW5nKCksIDEwKTtcclxuXHRcdFx0XHRsZXQgcXVhbGl0eSA9IHBhcnNlSW50KHNyY1VSTC5zZWFyY2hQYXJhbXMuZ2V0KCdxJykgPz8gJzgwJywgMTApO1xyXG5cdFx0XHRcdGxldCBsb3NzbGVzcyA9IHNyY1VSTC5zZWFyY2hQYXJhbXMuaGFzKCdsb3NzbGVzcycpO1xyXG5cdFx0XHRcdGxldCBjbG9uZSA9IGltZy5jbG9uZSgpO1xyXG5cdFx0XHRcdGxldCBzcmM7XHJcblx0XHRcdFx0Y2xvbmUgPSBjbG9uZS5yZXNpemUod2lkdGgpO1xyXG5cdFx0XHRcdGNvbnN0IHdlYnAgPSBjbG9uZS53ZWJwKHsgcXVhbGl0eSwgbmVhckxvc3NsZXNzOiBsb3NzbGVzcywgc21hcnRTdWJzYW1wbGU6IHRydWUgfSk7XHJcblx0XHRcdFx0Y29uc3QgaWQgPSBnZW5lcmF0ZUltYWdlSUQoc3JjVVJMLCB7IHdpZHRoLCBxdWFsaXR5LCBsb3NzbGVzcyB9KTtcclxuXHJcblx0XHRcdFx0Z2VuZXJhdGVkSW1hZ2VzLnNldChpZCwgd2VicCk7XHJcblx0XHRcdFx0aWYgKCF0aGlzLm1ldGEud2F0Y2hNb2RlKSB7XHJcblx0XHRcdFx0XHRjb25zdCBmaWxlTmFtZSA9IGJhc2VuYW1lKHNyY1VSTC5wYXRobmFtZSwgZXh0bmFtZShzcmNVUkwucGF0aG5hbWUpKSArIGAud2VicGA7XHJcblx0XHRcdFx0XHRjb25zdCBmaWxlSGFuZGxlID0gdGhpcy5lbWl0RmlsZSh7XHJcblx0XHRcdFx0XHRcdG5hbWU6IGZpbGVOYW1lLFxyXG5cdFx0XHRcdFx0XHRzb3VyY2U6IGF3YWl0IHdlYnAudG9CdWZmZXIoKSxcclxuXHRcdFx0XHRcdFx0dHlwZTogJ2Fzc2V0J1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRzcmMgPSBgX19WSVRFX0lNQUdFX0FTU0VUX18ke2ZpbGVIYW5kbGV9X19gO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzcmMgPSBqb2luKCcvQGltYWdlMicsIGlkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZGF0YSA9IHtcclxuXHRcdFx0XHRcdHNyYyxcclxuXHRcdFx0XHRcdHdpZHRoLFxyXG5cdFx0XHRcdFx0aGVpZ2h0OiAobWV0YS5oZWlnaHQgLyBtZXRhLndpZHRoKSAqIHdpZHRoLFxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI6IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsJHtzdHJ9YFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBkYXRhVG9Fc20oZGF0YSwge1xyXG5cdFx0XHRcdG5hbWVkRXhwb3J0czogdml0ZUNvbmZpZy5qc29uPy5uYW1lZEV4cG9ydHMgPz8gdHJ1ZSxcclxuXHRcdFx0XHRjb21wYWN0OiAhIXZpdGVDb25maWcuYnVpbGQubWluaWZ5ID8/IGZhbHNlLFxyXG5cdFx0XHRcdHByZWZlckNvbnN0OiB0cnVlXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcclxuXHRcdFx0c2VydmVyLm1pZGRsZXdhcmVzLnVzZShhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcclxuXHRcdFx0XHRpZiAocmVxLnVybD8uc3RhcnRzV2l0aCgnL0BpbWFnZTIvJykpIHtcclxuXHRcdFx0XHRcdGNvbnN0IFssIGlkXSA9IHJlcS51cmwuc3BsaXQoJy9AaW1hZ2UyLycpO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGltYWdlID0gZ2VuZXJhdGVkSW1hZ2VzLmdldChpZCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFpbWFnZSkge1xyXG5cdFx0XHRcdFx0XHRuZXh0KCk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBgaW1hZ2Uvd2VicGApO1xyXG5cdFx0XHRcdFx0cmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsICdtYXgtYWdlPTM2MDAwMCcpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGltYWdlLmNsb25lKCkucGlwZShyZXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRuZXh0KCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHJlbmRlckNodW5rKGNvZGUpIHtcclxuXHRcdFx0Y29uc3QgYXNzZXRVcmxSRSA9IC9fX1ZJVEVfSU1BR0VfQVNTRVRfXyhbYS16XFxkXXs4fSlfXyg/Ol8oLio/KV9fKT8vZztcclxuXHJcblx0XHRcdGxldCBtYXRjaDtcclxuXHRcdFx0bGV0IHM7XHJcblx0XHRcdHdoaWxlICgobWF0Y2ggPSBhc3NldFVybFJFLmV4ZWMoY29kZSkpKSB7XHJcblx0XHRcdFx0cyA9IHMgfHwgKHMgPSBuZXcgTWFnaWNTdHJpbmcoY29kZSkpO1xyXG5cdFx0XHRcdGNvbnN0IFtmdWxsLCBoYXNoLCBwb3N0Zml4ID0gJyddID0gbWF0Y2g7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGZpbGUgPSB0aGlzLmdldEZpbGVOYW1lKGhhc2gpO1xyXG5cclxuXHRcdFx0XHRsZXQgb3V0cHV0RmlsZXBhdGggPSB2aXRlQ29uZmlnLmJhc2UgKyBmaWxlICsgcG9zdGZpeDtcclxuXHRcdFx0XHRpZiAob3V0cHV0RmlsZXBhdGguc3RhcnRzV2l0aCgnLicpKSB7XHJcblx0XHRcdFx0XHRvdXRwdXRGaWxlcGF0aCA9IG91dHB1dEZpbGVwYXRoLnN1YnN0cmluZygxKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHMub3ZlcndyaXRlKG1hdGNoLmluZGV4LCBtYXRjaC5pbmRleCArIGZ1bGwubGVuZ3RoLCBvdXRwdXRGaWxlcGF0aCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzKSB7XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdGNvZGU6IHMudG9TdHJpbmcoKSxcclxuXHRcdFx0XHRcdG1hcDogdml0ZUNvbmZpZy5idWlsZC5zb3VyY2VtYXAgPyBzLmdlbmVyYXRlTWFwKHsgaGlyZXM6IHRydWUgfSkgOiBudWxsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxLdXJ0VGVnZXJlcm9cXFxcRGVza3RvcFxcXFx0ZWdlcmVyby12MlxcXFx0ZWdlcmVyby12MlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcS3VydFRlZ2VyZXJvXFxcXERlc2t0b3BcXFxcdGVnZXJlcm8tdjJcXFxcdGVnZXJlcm8tdjJcXFxcdGFpbHdpbmRDb25maWdQbHVnaW4uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0t1cnRUZWdlcmVyby9EZXNrdG9wL3RlZ2VyZXJvLXYyL3RlZ2VyZXJvLXYyL3RhaWx3aW5kQ29uZmlnUGx1Z2luLmpzXCI7aW1wb3J0IHsgZGF0YVRvRXNtIH0gZnJvbSAnQHJvbGx1cC9wbHVnaW51dGlscyc7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVSZXF1aXJlIH0gZnJvbSAnbW9kdWxlJztcclxuXHJcbmNvbnN0IHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKGltcG9ydC5tZXRhLnVybCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0YWlsd2luZENvbmZpZygpIHtcclxuXHRsZXQgdml0ZUNvbmZpZztcclxuXHRyZXR1cm4ge1xyXG5cdFx0bmFtZTogJ3RhaWx3aW5kQ29uZmlnJyxcclxuXHRcdGVuZm9yY2U6ICdwcmUnLFxyXG5cclxuXHRcdGNvbmZpZ1Jlc29sdmVkKGNmZykge1xyXG5cdFx0XHR2aXRlQ29uZmlnID0gY2ZnO1xyXG5cdFx0fSxcclxuXHRcdHJlc29sdmVJZChpZCkge1xyXG5cdFx0XHRpZiAoaWQgPT09ICckdGFpbHdpbmQnKSB7XHJcblx0XHRcdFx0cmV0dXJuICckdGFpbHdpbmQnO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0YXN5bmMgbG9hZChpZCkge1xyXG5cdFx0XHRpZiAoaWQgPT09ICckdGFpbHdpbmQnKSB7XHJcblx0XHRcdFx0Y29uc3QgcmVzb2x2ZUNvbmZpZyA9IHJlcXVpcmUoJ3RhaWx3aW5kY3NzL3Jlc29sdmVDb25maWcuanMnKTtcclxuXHRcdFx0XHRjb25zdCBjb25maWcgPSByZXF1aXJlKCcuL3RhaWx3aW5kLmNvbmZpZy5janMnKTtcclxuXHRcdFx0XHRjb25zdCBmdWxsQ29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xyXG5cclxuXHRcdFx0XHRjb25zdCBkYXRhID0ge1xyXG5cdFx0XHRcdFx0c2NyZWVuczogZnVsbENvbmZpZy50aGVtZS5zY3JlZW5zLFxyXG5cdFx0XHRcdFx0Y29sb3JzOiBmdWxsQ29uZmlnLnRoZW1lLmNvbG9yc1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdHJldHVybiBkYXRhVG9Fc20oZGF0YSwge1xyXG5cdFx0XHRcdFx0bmFtZWRFeHBvcnRzOiB2aXRlQ29uZmlnLmpzb24/Lm5hbWVkRXhwb3J0cyA/PyB0cnVlLFxyXG5cdFx0XHRcdFx0Y29tcGFjdDogISF2aXRlQ29uZmlnLmJ1aWxkLm1pbmlmeSA/PyBmYWxzZSxcclxuXHRcdFx0XHRcdHByZWZlckNvbnN0OiB0cnVlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyxnQkFBZ0I7OztBQ0YwVCxTQUFTLGNBQWMsaUJBQWlCO0FBQzNYLE9BQU8saUJBQWlCO0FBRXhCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsVUFBVSxTQUFTLFlBQVk7QUFDeEMsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsa0JBQWtCO0FBTjZMLElBQU0sMkNBQTJDO0FBUXpRLElBQU1BLFdBQVUsY0FBYyx3Q0FBZTtBQUU3QyxTQUFTLGdCQUFnQixLQUFLQyxTQUFRO0FBQ3JDLFFBQU0sVUFBVSxJQUFJLE9BQ2pCLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxRQUFRLElBQ2pDLElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxRQUFRO0FBRXRDLFNBQU8sV0FBVyxNQUFNLEVBQUUsT0FBTyxRQUFRLElBQUksRUFBRSxPQUFPLEtBQUssVUFBVUEsT0FBTSxDQUFDLEVBQUUsT0FBTyxLQUFLO0FBQzNGO0FBRUEsU0FBUyxTQUFTLFFBQVE7QUFDekIsU0FBTyxJQUFJLElBQUksT0FBTyxRQUFRLE1BQU0sS0FBSyxHQUFHLFNBQVM7QUFDdEQ7QUFFQSxJQUFNLGlCQUFpQjtBQUFBLEVBQ3RCLFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULFFBQVE7QUFBQSxFQUNSLGdCQUFnQjtBQUNqQjtBQUVBLFVBQVUsVUFBVSxPQUFPO0FBQzFCLFFBQU0sS0FBSyxNQUFNLFFBQVEsS0FBSztBQUM5QixRQUFNLEtBQUssTUFBTSxRQUFRLElBQUk7QUFDN0IsUUFBTSxLQUFLLE1BQU0sUUFBUSxLQUFLO0FBQzlCLFFBQU0sS0FBSyxNQUFNLFFBQVEsR0FBRztBQUM1QixRQUFNLEtBQUssTUFBTSxRQUFRLEtBQUs7QUFDOUIsUUFBTSxLQUFLLE1BQU0sUUFB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QUFXLE1BQU07QUFBQSxVQUMxQixRQUFRLFdBQVcsTUFBTTtBQUFBLFFBQzFCO0FBRUEsZUFBT0MsV0FBVSxNQUFNO0FBQUEsVUFDdEIsZ0JBQWMsZ0JBQVcsU0FBWCxtQkFBaUIsaUJBQWdCO0FBQUEsVUFDL0MsU0FBUyxDQUFDLENBQUMsV0FBVyxNQUFNO0FBQUEsVUFDNUIsYUFBYTtBQUFBLFFBQ2QsQ0FBQztBQUFBLE1BQ0Y7QUFDQSxhQUFPO0FBQUEsSUFDUjtBQUFBLEVBQ0Q7QUFDRDs7O0FGbkNBLFlBQVksVUFBVTtBQUV0QixJQUFNLGFBQWEsU0FBUyxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsUUFBUTtBQUdyRSxJQUFNLFNBQVM7QUFBQSxFQUNkLFNBQVMsQ0FBQyxlQUFlLEdBQUcsT0FBTyxHQUFHLFVBQVUsQ0FBQztBQUFBLEVBQ2pELE9BQU87QUFBQSxJQUNOLGVBQWU7QUFBQSxNQUNkLFFBQVE7QUFBQSxRQUNQLHdCQUF3QjtBQUFBLE1BQ3pCO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUlQO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDUCxpQkFBaUIsSUFBSTtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixTQUFjLGFBQVEsY0FBYztBQUFBLE1BQ3BDLFFBQWEsYUFBUSxhQUFhO0FBQUEsTUFDbEMsUUFBYSxhQUFRLGFBQWE7QUFBQSxNQUNsQyxNQUFXLGFBQVEsT0FBTztBQUFBLE1BQzFCLGFBQWtCLGFBQVEsa0JBQWtCO0FBQUEsSUFDN0M7QUFBQSxFQUNEO0FBQ0Q7QUFFQSxJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogWyJyZXF1aXJlIiwgImNvbmZpZyIsICJ0YWlsd2luZENvbmZpZyIsICJpZCIsICJkYXRhVG9Fc20iLCAiY3JlYXRlUmVxdWlyZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsIiwgInJlcXVpcmUiLCAiY3JlYXRlUmVxdWlyZSIsICJjb25maWciLCAiZGF0YVRvRXNtIl0KfQo=
