export const SITE_URL = "https://meltforce.org";

export const MASTODON_INSTANCES = {
  "mastodon.social": {
    url: "https://mastodon.social",
    tokenEnv: "MASTODON_SOCIAL_TOKEN",
  },
  "theforkiverse.com": {
    url: "https://theforkiverse.com",
    tokenEnv: "FORKIVERSE_TOKEN",
  },
} as const;

export type MastodonInstance = keyof typeof MASTODON_INSTANCES;

export type Platform = MastodonInstance | "bsky.social";

export const ALL_PLATFORMS: Platform[] = [
  "mastodon.social",
  "theforkiverse.com",
  "bsky.social",
];

export interface PostedState {
  [slug: string]: {
    [platform in Platform]?: string | null;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  draft?: boolean;
}

export const DRY_RUN = process.env.DRY_RUN === "1";
