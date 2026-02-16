import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://meltforce.org",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
