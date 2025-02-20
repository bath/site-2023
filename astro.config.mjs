import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    build: {
      minify: false,
      cssMinify: false,
    },
    css: {
      devSourcemap: true,
    },
  },
});
