# meltforce.org

Personal site built with [Astro 5](https://astro.build/), deployed to GitHub Pages.

## Development

```sh
npm install
npm run dev       # start dev server (http://localhost:4321)
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

The dev server also accepts connections from the hostname `jesus` (configured in `astro.config.mjs`).

## Blogging

### Writing a post

Create a Markdown file in `src/content/blog/`:

```markdown
---
title: "Post Title"
date: 2026-02-22
tags: ["tag1", "tag2"]
description: "Short summary shown in listings and social cards."
draft: true
---

Your content here.
```

Frontmatter fields:

| Field | Required | Default | Notes |
|-------|----------|---------|-------|
| `title` | yes | | |
| `date` | yes | | |
| `description` | yes | | Used in listings, RSS, and social posts |
| `tags` | no | `[]` | |
| `draft` | no | `false` | Hides the post from production builds |
| `toc` | no | `false` | Enables table of contents |

Schema is defined in `src/content.config.ts`.

### Draft workflow

Set `draft: true` in frontmatter while working on a post.

- **Dev server** (`npm run dev`): drafts are **visible** — use this to preview
- **Production build** (`npm run build`): drafts are **excluded** from all pages, tags, and the RSS feed

When ready to publish, remove `draft: true` (or set it to `false`), commit, and push to `master`. The deploy pipeline handles the rest.

## Social cross-posting

When the site deploys, the `announce` job automatically cross-posts **new blog entries** to:

- [mastodon.social](https://mastodon.social/@meltforce)
- [theforkiverse.com](https://theforkiverse.com/@meltforce)
- [bsky.social](https://bsky.app/profile/meltforce.bsky.social)

### How it works

1. `tools/announce.ts` reads all non-draft posts from `src/content/blog/`
2. Compares them against `data/posted.json` (tracks what was already posted)
3. Posts to any platform where the entry is missing
4. Commits updated `data/posted.json` back to the repo
5. If a platform fails, that entry stays unrecorded and **retries on the next deploy**

The script fails the pipeline if **no credentials are configured at all**, so missing secrets don't go unnoticed.

### Secrets

The pipeline needs four GitHub Actions secrets (Settings > Secrets and variables > Actions):

| Secret | Source |
|--------|--------|
| `MASTODON_SOCIAL_TOKEN` | mastodon.social > Preferences > Development > App > Access token |
| `FORKIVERSE_TOKEN` | theforkiverse.com > Preferences > Development > App > Access token |
| `BSKY_IDENTIFIER` | Bluesky handle (e.g. `meltforce.bsky.social`) |
| `BSKY_PASSWORD` | bsky.app > Settings > App Passwords |

Credentials are stored in 1Password (`Homelab Admin` vault). To set them from 1Password:

```sh
op read "op://Homelab Admin/Mastodon mastodon.social/credential" | gh secret set MASTODON_SOCIAL_TOKEN --repo meltforce/meltforce-org
op read "op://Homelab Admin/Mastodon theforkiverse.com/credential" | gh secret set FORKIVERSE_TOKEN --repo meltforce/meltforce-org
op read "op://Homelab Admin/Bluesky/username" | gh secret set BSKY_IDENTIFIER --repo meltforce/meltforce-org
op read "op://Homelab Admin/Bluesky/credential" | gh secret set BSKY_PASSWORD --repo meltforce/meltforce-org
```

### Running locally

All local runs use `op run` to inject credentials from 1Password at runtime (no `.env` files on disk). You need to be authenticated with `op` first (`eval $(op signin)`).

```sh
cd tools && npm ci
DRY_RUN=1 npx tsx announce.ts         # dry run (no tokens needed)
npm run announce:local                # announce new blog posts for real
npm run repost                        # cross-post recent mastodon.social toots
```

## Deploy pipeline

Defined in `.github/workflows/deploy.yml`. Triggers on push to `master` or manual dispatch.

| Job | What it does |
|-----|--------------|
| **build** | `astro build` + pagefind indexing |
| **deploy** | Publishes `dist/` to GitHub Pages |
| **announce** | Cross-posts new blog entries to social platforms |
