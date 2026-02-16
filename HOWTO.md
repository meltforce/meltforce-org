# HOWTO: meltforce-org

This is an Astro 5.x static site featuring a landing page with blog and project showcase.

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
  content/       - Blog posts and content (using Astro Content Collections)
public/          - Static assets
```

## Blog

Blog posts are stored in `src/content/blog/` as Markdown files. The blog index is at `/blog/`.

### Adding a blog post

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter with title, date, and optional description
3. Write your post in Markdown

Example:
```markdown
---
title: "My First Post"
pubDate: 2026-02-16
description: "A brief description of the post"
---

# Heading

Your content here...
```

## Styling

The site uses CSS custom properties (variables) for theming. Dark mode is the only theme.

See `src/styles/globals.css` for color definitions.

## Deployment

The site is deployed via GitHub Pages. Push to `origin/master` to trigger a deployment workflow.

## Useful Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro -- --help` - See all Astro CLI options
