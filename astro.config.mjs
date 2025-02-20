import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    build: {
      minify: true,
      cssMinify: true,
    },
    css: {
      devSourcemap: false,
    },
  },
});
