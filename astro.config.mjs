import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://meltforce.org",
  output: "static",
  vite: {
    server: {
      allowedHosts: ["jesus"],
    },
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
