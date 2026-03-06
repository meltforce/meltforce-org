import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../lib/og-image";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection(
    "blog",
    ({ data }) => !data.draft && !data.ogImage,
  );
  return posts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      date: post.data.date.toISOString().split("T")[0],
      tags: post.data.tags,
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage(props as any);
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
