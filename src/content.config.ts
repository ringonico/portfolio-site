import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('未分類'),
    summary: z.string().default(''),
    thumbnail: z.string().default('/images/articles/default.png'),
    relatedGame: z.string().optional(),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().default(''),
    role: z.string().default(''),
    highlight: z.string().default(''),
    learning: z.string().default(''),
    skills: z.array(z.string()).default([]),
    thumbnail: z.string().default('/images/works/default.png'),
    order: z.number().default(0),
  }),
});

const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().default(''),
    thumbnail: z.string().default('/images/games/default.png'),
    period: z.string().default(''),
    tools: z.array(z.string()).default([]),
    role: z.string().default(''),
    url: z.string().default(''),
    order: z.number().default(0),
  }),
});

const profile = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    catch: z.string().default(''),
  }),
});

const plans = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/plans' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().default(''),
    genre: z.string().default(''),
    purpose: z.string().default(''),
    point: z.string().default(''),
    thumbnail: z.string().default('/images/plans/default.png'),
    pdfUrl: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { articles, works, games, plans, profile };
