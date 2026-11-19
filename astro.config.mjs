import { defineConfig } from "astro/config";

export default defineConfig({
  // The site is one page. Old page URLs go to it.
  redirects: {
    "/work": "/",
    "/projects": "/",
    "/skills": "/",
  },
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
