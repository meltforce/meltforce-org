import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { MASTODON_INSTANCES } from "./lib/config.js";
import {
  createClient,
  postStatus,
  getStatuses,
  uploadMedia,
  lookupSelf,
} from "./lib/mastodon.js";
import { login as bskyLogin, createPost as bskyCreatePost } from "./lib/bluesky.js";
import { htmlToText } from "./lib/html-to-text.js";
import type { mastodon } from "masto";

const STATE_FILE = path.join(os.homedir(), ".meltforce-sync-state");

function loadLastSyncedId(): string | null {
  if (!fs.existsSync(STATE_FILE)) return null;
  return fs.readFileSync(STATE_FILE, "utf-8").trim() || null;
}

function saveLastSyncedId(id: string): void {
  fs.writeFileSync(STATE_FILE, id + "\n");
}

async function downloadBlob(url: string): Promise<{ blob: Blob; buffer: Uint8Array; mimeType: string }> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const blob = await res.blob();
  const buffer = new Uint8Array(await blob.arrayBuffer());
  const mimeType = blob.type || "image/png";
  return { blob, buffer, mimeType };
}

async function repostToForkiverse(
  toot: mastodon.v1.Status,
): Promise<void> {
  const cfg = MASTODON_INSTANCES["theforkiverse.com"];
  const token = process.env[cfg.tokenEnv];
  if (!token) {
    console.warn("  Skipping theforkiverse.com: FORKIVERSE_TOKEN not set");
    return;
  }

  const client = createClient(cfg.url, token);
  const mediaIds: string[] = [];

  // Re-upload media attachments
  for (const attachment of toot.mediaAttachments) {
    if (!attachment.url) continue;
    const { blob } = await downloadBlob(attachment.url);
    const uploaded = await uploadMedia(client, blob, attachment.description ?? undefined);
    mediaIds.push(uploaded.id);
    console.log(`  Uploaded media to theforkiverse.com: ${uploaded.id}`);
  }

  const result = await postStatus(client, {
    status: htmlToText(toot.content),
    visibility: toot.visibility as "public" | "unlisted" | "private" | "direct",
    spoilerText: toot.spoilerText || undefined,
    sensitive: toot.sensitive,
    mediaIds: mediaIds.length > 0 ? mediaIds : undefined,
  });
  console.log(`  Posted to theforkiverse.com: ${result.url}`);
}

async function repostToBluesky(
  toot: mastodon.v1.Status,
): Promise<void> {
  const identifier = process.env.BSKY_IDENTIFIER;
  const password = process.env.BSKY_PASSWORD;
  if (!identifier || !password) {
    console.warn("  Skipping bsky.social: BSKY_IDENTIFIER or BSKY_PASSWORD not set");
    return;
  }

  await bskyLogin(identifier, password);

  const text = htmlToText(toot.content);
  const images: Array<{ blob: Uint8Array; mimeType: string; alt?: string }> = [];

  for (const attachment of toot.mediaAttachments) {
    if (attachment.type === "image" && attachment.url) {
      const { buffer, mimeType } = await downloadBlob(attachment.url);
      images.push({
        blob: buffer,
        mimeType,
        alt: attachment.description ?? undefined,
      });
    }
  }

  const result = await bskyCreatePost({
    text,
    images: images.length > 0 ? images : undefined,
  });
  console.log(`  Posted to bsky.social: ${result.uri}`);
}

async function main() {
  console.log("=== REPOST ===\n");

  // Connect to source instance
  const sourceToken = process.env.MASTODON_SOCIAL_TOKEN;
  if (!sourceToken) {
    console.error("MASTODON_SOCIAL_TOKEN is required");
    process.exit(1);
  }

  const source = createClient(MASTODON_INSTANCES["mastodon.social"].url, sourceToken);
  const me = await lookupSelf(source);
  console.log(`Source account: @${me.username}@mastodon.social (id: ${me.id})\n`);

  const lastSyncedId = loadLastSyncedId();
  console.log(`Last synced ID: ${lastSyncedId ?? "(none - first run)"}\n`);

  const statuses = await getStatuses(source, me.id, {
    sinceId: lastSyncedId ?? undefined,
    excludeReplies: true,
    excludeReblogs: true,
  });

  if (statuses.length === 0) {
    console.log("No new toots to sync.");
    return;
  }

  // Process in chronological order (oldest first)
  const chronological = statuses.reverse();
  console.log(`Found ${chronological.length} new toot(s) to sync.\n`);

  for (const toot of chronological) {
    const preview = htmlToText(toot.content).slice(0, 80);
    console.log(`Syncing toot ${toot.id}: "${preview}..."`);
    console.log(`  Media: ${toot.mediaAttachments.length} attachment(s)`);
    console.log(`  Visibility: ${toot.visibility}`);

    try {
      await repostToForkiverse(toot);
    } catch (err) {
      console.error(`  FAILED on theforkiverse.com:`, err);
    }

    try {
      await repostToBluesky(toot);
    } catch (err) {
      console.error(`  FAILED on bsky.social:`, err);
    }

    // Update state after each successful sync
    saveLastSyncedId(toot.id);
    console.log(`  State saved (last synced: ${toot.id})\n`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error("Repost failed:", err);
  process.exit(1);
});
