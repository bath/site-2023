import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
  site: "https://mzb.dev", // Replace with your actual domain
  build: {
    format: "directory",
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    devMode: process.env.NODE_ENV === "development",
    functionPerRoute: false,
    maxDuration: 10, // Increase function timeout for debugging
    debug: true, // Enable verbose logging
  }),
  vite: {
    build: {
      minify: false, // Disable minification for better error messages
    },
    logLevel: "info",
  },
});
