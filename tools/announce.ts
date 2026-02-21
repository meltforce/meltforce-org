import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import {
  SITE_URL,
  MASTODON_INSTANCES,
  ALL_PLATFORMS,
  DRY_RUN,
  type PostedState,
  type BlogPost,
  type Platform,
  type MastodonInstance,
} from "./lib/config.js";
import { createClient, postStatus } from "./lib/mastodon.js";
import { login as bskyLogin, createPost as bskyCreatePost } from "./lib/bluesky.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, "../src/content/blog");
const POSTED_PATH = path.resolve(__dirname, "../data/posted.json");

function loadBlogPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title as string,
        description: (data.description as string) ?? "",
        date: new Date(data.date as string),
        tags: (data.tags as string[]) ?? [],
        draft: data.draft as boolean | undefined,
      };
    })
    .filter((p) => !p.draft);
}

function loadPostedState(): PostedState {
  if (!fs.existsSync(POSTED_PATH)) return {};
  return JSON.parse(fs.readFileSync(POSTED_PATH, "utf-8"));
}

function savePostedState(state: PostedState): void {
  fs.writeFileSync(POSTED_PATH, JSON.stringify(state, null, 2) + "\n");
}

function composeMastodonStatus(post: BlogPost): string {
  const url = `${SITE_URL}/blog/${post.slug}/`;
  const hashtags = post.tags.map((t) => `#${t.replace(/[^a-zA-Z0-9]/g, "")}`).join(" ");
  return `${post.title}\n\n${post.description}\n\n${url}\n\n${hashtags}`;
}

function composeBlueskyText(post: BlogPost): string {
  const url = `${SITE_URL}/blog/${post.slug}/`;
  const hashtags = post.tags
    .slice(0, 3)
    .map((t) => `#${t.replace(/[^a-zA-Z0-9]/g, "")}`)
    .join(" ");
  // Bluesky has a 300 grapheme limit; keep it tight
  let text = `${post.title}\n\n${post.description}`;
  if (hashtags) text += `\n\n${hashtags}`;
  // Truncate if needed (leave room for facets, the URL is in the embed)
  if (text.length > 295) {
    text = text.slice(0, 292) + "...";
  }
  return text;
}

async function announceToMastodon(
  instance: MastodonInstance,
  post: BlogPost,
): Promise<void> {
  const cfg = MASTODON_INSTANCES[instance];
  const token = process.env[cfg.tokenEnv];
  if (!token) {
    console.warn(`  Skipping ${instance}: ${cfg.tokenEnv} not set`);
    return;
  }

  const status = composeMastodonStatus(post);
  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would post to ${instance}:\n${status}\n`);
    return;
  }

  const client = createClient(cfg.url, token);
  const result = await postStatus(client, { status });
  console.log(`  Posted to ${instance}: ${result.url}`);
}

async function announceToBluesky(post: BlogPost): Promise<void> {
  const identifier = process.env.BSKY_IDENTIFIER;
  const password = process.env.BSKY_PASSWORD;
  if (!identifier || !password) {
    console.warn("  Skipping bsky.social: BSKY_IDENTIFIER or BSKY_PASSWORD not set");
    return;
  }

  const text = composeBlueskyText(post);
  const url = `${SITE_URL}/blog/${post.slug}/`;

  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would post to bsky.social:\n${text}\n  Link card: ${url}\n`);
    return;
  }

  await bskyLogin(identifier, password);
  const result = await bskyCreatePost({
    text,
    url,
    title: post.title,
    description: post.description,
  });
  console.log(`  Posted to bsky.social: ${result.uri}`);
}

async function main() {
  console.log(DRY_RUN ? "=== ANNOUNCE (DRY RUN) ===" : "=== ANNOUNCE ===");

  const posts = loadBlogPosts();
  const state = loadPostedState();
  let updated = false;

  for (const post of posts) {
    if (!state[post.slug]) {
      state[post.slug] = {};
    }

    const pending = ALL_PLATFORMS.filter((p) => !state[post.slug][p]);
    if (pending.length === 0) continue;

    console.log(`\nAnnouncing: ${post.title} (${post.slug})`);
    console.log(`  Pending platforms: ${pending.join(", ")}`);

    for (const platform of pending) {
      try {
        if (platform === "bsky.social") {
          await announceToBluesky(post);
        } else {
          await announceToMastodon(platform, post);
        }
        state[post.slug][platform] = new Date().toISOString();
        updated = true;
      } catch (err) {
        console.error(`  FAILED on ${platform}:`, err);
        // Leave this platform as null so it retries next deploy
      }
    }
  }

  if (updated || DRY_RUN) {
    savePostedState(state);
    console.log("\nSaved posted state.");
  } else {
    console.log("\nNothing new to announce.");
  }
}

main().catch((err) => {
  console.error("Announce failed:", err);
  process.exit(1);
});
