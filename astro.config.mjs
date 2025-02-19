import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
  site: "https://mzb.dev", // Replace with your actual domain
  build: {
    format: "directory",
  },
  adapter: vercel(),
});
