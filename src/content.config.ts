import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    github: z.string().url().optional(),
    url: z.string().url().optional(),
    featured: z.boolean().default(false),
    // Landing page GEM skin: file label under the icon, bitmap name from src/lib/pixel-icons.ts
    file: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { projects };
