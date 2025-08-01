import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx', '**/*.mdoc'], base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
  }),
});

const reference = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx', '**/*.mdoc'], base: "./src/content/reference" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
  }),
});

const spreadsheets = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/spreadsheets" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
  }),
});

const whitepapers = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/whitepapers" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    readLink: z.string().optional(),
    btnTitle: z.string().optional(),
    btnLink: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx', '**/*.mdoc'], base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.string(),
    labels: z.array(z.string()).optional(),
    icon: z.string(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).optional(),
    layout: z.string().optional(),
  }),
});

export const collections = { articles, reference, spreadsheets, whitepapers, news };
