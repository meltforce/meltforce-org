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

## Social Media Cross-Posting

New blog posts are automatically announced to Mastodon and Bluesky when the site deploys. A separate CLI tool lets you manually sync toots from mastodon.social to your other accounts.

### Setup

Create API tokens and add them as GitHub Actions secrets **and** to `tools/.env` for local use:

| Secret | Source |
|---|---|
| `MASTODON_SOCIAL_TOKEN` | mastodon.social > Preferences > Development > New app |
| `FORKIVERSE_TOKEN` | theforkiverse.com > Preferences > Development > New app |
| `BSKY_IDENTIFIER` | `meltforce.bsky.social` |
| `BSKY_PASSWORD` | bsky.app > Settings > App Passwords |

Mastodon app scopes needed: `read:statuses`, `write:statuses`, `write:media`.

```bash
cd tools && npm install
op inject -i .env.tpl -o .env
```

### Blog Announce (automatic)

Runs after every deploy via GitHub Actions. For each published (non-draft) blog post not yet tracked in `data/posted.json`, it posts to all three accounts: mastodon.social, theforkiverse.com, and bsky.social.

Tracking is per-platform — if one fails, only that platform retries next deploy.

Test locally with dry-run mode:

```bash
cd tools && DRY_RUN=1 npx tsx announce.ts
```

### Repost CLI (manual)

Syncs original toots from mastodon.social to theforkiverse.com and Bluesky. Skips replies and boosts. Preserves media, visibility, content warnings, and sensitive flags.

```bash
cd tools && npx tsx repost.ts
```

State is stored in `~/.meltforce-sync-state` (last synced toot ID).

### Preventing duplicate announcements

`data/posted.json` tracks which posts have been announced to which platforms. To skip a post, add its slug manually:

```json
{
  "my-post-slug": {
    "mastodon.social": "2026-01-01T00:00:00Z",
    "theforkiverse.com": "2026-01-01T00:00:00Z",
    "bsky.social": "2026-01-01T00:00:00Z"
  }
}
```

## Useful Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro -- --help` - See all Astro CLI options
