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
    functionPerRoute: true,
    maxDuration: 10,
    debug: true,
  }),
  vite: {
    build: {
      minify: false,
    },
    logLevel: "info",
  },
});
