# meltforce.org

Personal site built with [Astro 5](https://astro.build/), deployed to GitHub Pages.
The site consists of a landing page and a project showcase.

## Development

```sh
npm install
npm run dev       # start dev server (http://localhost:4321)
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

The dev server also accepts connections from the hostname `jesus` (configured in `astro.config.mjs`).

## Landing page skins

The landing page renders the same content in three skins: `gem` (GEM desktop),
`disks` (floppy disk box) and `basic` (GFA BASIC listing). All three are in the
HTML; `<html data-skin="…">` selects the visible one via `src/styles/home.css`.

Skin selection, in order of precedence:

1. `?skin=gem|disks|basic` in the URL (not stored)
2. `localStorage['mf-skin']` — set when a visitor picks a skin
3. `sessionStorage['mf-skin']` — random pick, stable for the browser session

The selection script runs inline in `<head>` before first paint. The landing
page loads `src/styles/home.css` only; `/projects/` and 404 use
`src/layouts/Base.astro` with `src/styles/global.css`.

## Projects

### Adding a project

Create a Markdown file in `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "One sentence describing what it does."
tags: ["go", "mcp"]
github: "https://github.com/meltforce/example"
url: "https://example.meltforce.org"
featured: true
order: 1
file: "EXAMPLE.PRG"
icon: "doc"
---
```

Frontmatter fields:

| Field | Required | Default | Notes |
|-------|----------|---------|-------|
| `title` | yes | | |
| `description` | yes | | Shown in the listing |
| `tags` | no | `[]` | Rendered as plain labels, not linked. The language tag follows the repo's primary language on GitHub |
| `github` | no | | Adds the `src` link |
| `url` | no | | Primary link target; falls back to `github` |
| `featured` | no | `false` | Controls appearance on the landing page |
| `order` | no | `99` | Sort order among featured projects |
| `file` | no | | GEM skin label under the icon, e.g. `VOXTRAL.PRG` |
| `icon` | no | `doc` | GEM skin bitmap name from `src/lib/pixel-icons.ts` |

The `disks` skin assigns disk colours by position among featured projects (five
colours, repeating).

Schema is defined in `src/content.config.ts`. The Markdown body is not rendered;
only the frontmatter appears in the listing.

## Redirects

The blog was removed on 2026-08-30. The six published post URLs and `/blog/`
itself redirect to `/projects/` via the `redirects` map in `astro.config.mjs`,
because those URLs were cross-posted to Mastodon, Bluesky and Forkiverse and are
still linked from there. Astro emits one meta-refresh page per entry in the
static build.

`/feed.xml` and the `/tags/<tag>/` pages were removed without replacement and
now return 404.

## Deploy pipeline

Defined in `.github/workflows/deploy.yml`. Triggers on push to `master` or manual dispatch.

| Job | What it does |
|-----|--------------|
| **build** | `astro build` |
| **deploy** | Publishes `dist/` to GitHub Pages |
