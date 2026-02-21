import { AtpAgent, RichText } from "@atproto/api";
import type { AppBskyEmbedExternal, AppBskyFeedPost } from "@atproto/api";

let agent: AtpAgent | null = null;

export async function login(identifier: string, password: string): Promise<AtpAgent> {
  agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({ identifier, password });
  return agent;
}

export function getAgent(): AtpAgent {
  if (!agent) throw new Error("Bluesky: call login() first");
  return agent;
}

export async function createPost(params: {
  text: string;
  url?: string;
  title?: string;
  description?: string;
  images?: Array<{ blob: Uint8Array; mimeType: string; alt?: string }>;
}): Promise<{ uri: string; cid: string }> {
  const a = getAgent();

  const rt = new RichText({ text: params.text });
  await rt.detectFacets(a);

  const record: Partial<AppBskyFeedPost.Record> = {
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString(),
  };

  // Add link card embed if URL provided and no images
  if (params.url && (!params.images || params.images.length === 0)) {
    const embed: AppBskyEmbedExternal.Main = {
      $type: "app.bsky.embed.external",
      external: {
        uri: params.url,
        title: params.title ?? "",
        description: params.description ?? "",
      },
    };
    record.embed = embed;
  }

  // Upload and attach images if provided
  if (params.images && params.images.length > 0) {
    const uploadedImages = await Promise.all(
      params.images.map(async (img) => {
        const response = await a.uploadBlob(img.blob, {
          encoding: img.mimeType,
        });
        return {
          alt: img.alt ?? "",
          image: response.data.blob,
          aspectRatio: undefined,
        };
      }),
    );
    record.embed = {
      $type: "app.bsky.embed.images",
      images: uploadedImages,
    };
  }

  const response = await a.post(record as AppBskyFeedPost.Record);
  return response;
}
