# HOWTO: meltforce-org

This is an Astro 5.x static site featuring a landing page and a project showcase.

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
npm install
```

## Development

### Start the dev server
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for production
```bash
npm run build
```

Output is generated in the `dist/` directory.

### Preview production build
```bash
npm run preview
```

## Project Structure

```
src/
  layouts/       - Reusable layout components
  pages/         - Top-level pages (auto-routed)
  components/    - Reusable UI components
  styles/        - Global styles
  content/       - Project entries (using Astro Content Collections)
  lib/           - Pixel icon bitmaps for the landing page
public/          - Static assets
```

## Projects

Project entries are stored in `src/content/projects/` as Markdown files. The
project index is at `/projects/`; entries with `featured: true` also appear on
the landing page.

### Adding a project

1. Create a new `.md` file in `src/content/projects/`
2. Fill in the frontmatter (the Markdown body is not rendered)

Example:
```markdown
---
title: "My Project"
description: "One sentence describing what it does."
tags: ["go", "mcp"]
github: "https://github.com/meltforce/myproject"
url: "https://myproject.meltforce.org"
featured: true
order: 1
---
```

The full field reference is in `README.md`.

## Styling

The site uses CSS custom properties (variables) for theming.

- `src/styles/home.css` — landing page skins (light, Atari ST)
- `src/styles/global.css` — `/projects/` and 404 (dark)

## Deployment

The site is deployed via GitHub Pages. Push to `origin/master` to trigger a deployment workflow.

## Useful Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro -- --help` - See all Astro CLI options
