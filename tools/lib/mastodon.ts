import { createRestAPIClient } from "masto";
import type { mastodon } from "masto";

export function createClient(baseUrl: string, token: string) {
  return createRestAPIClient({ url: baseUrl, accessToken: token });
}

export async function postStatus(
  client: mastodon.rest.Client,
  params: {
    status: string;
    visibility?: "public" | "unlisted" | "private" | "direct";
    spoilerText?: string;
    sensitive?: boolean;
    mediaIds?: string[];
  },
): Promise<mastodon.v1.Status> {
  return client.v1.statuses.create({
    status: params.status,
    visibility: params.visibility ?? "public",
    spoilerText: params.spoilerText,
    sensitive: params.sensitive,
    mediaIds: params.mediaIds,
  });
}

export async function getStatuses(
  client: mastodon.rest.Client,
  accountId: string,
  opts: { sinceId?: string; limit?: number; excludeReplies?: boolean; excludeReblogs?: boolean } = {},
): Promise<mastodon.v1.Status[]> {
  const statuses: mastodon.v1.Status[] = [];
  for await (const page of client.v1.accounts.$select(accountId).statuses.list({
    sinceId: opts.sinceId,
    limit: opts.limit ?? 40,
    excludeReplies: opts.excludeReplies ?? true,
    excludeReblogs: opts.excludeReblogs ?? true,
  })) {
    statuses.push(...page);
    break; // single page is enough for repost
  }
  return statuses;
}

export async function uploadMedia(
  client: mastodon.rest.Client,
  blob: Blob,
  description?: string,
): Promise<mastodon.v1.MediaAttachment> {
  const file = new File([blob], "media", { type: blob.type });
  return client.v2.media.create({
    file,
    description,
  });
}

export async function lookupSelf(
  client: mastodon.rest.Client,
): Promise<mastodon.v1.Account> {
  return client.v1.accounts.verifyCredentials();
}
