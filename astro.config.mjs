import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://meltforce.org",
  output: "static",
  redirects: {
    "/blog/": "/projects/",
    "/blog/freereps-v1/": "/projects/",
    "/blog/i-know-kung-fu/": "/projects/",
    "/blog/mbomail-v1/": "/projects/",
    "/blog/mbomail-v11/": "/projects/",
    "/blog/this-is-not-autocomplete/": "/projects/",
    "/blog/voxtral-memos-v1/": "/projects/",
  },
  vite: {
    server: {
      allowedHosts: ["jesus"],
    },
  },
});
