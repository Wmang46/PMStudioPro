import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const hotTopicsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/hot-topics' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['article', 'audio', 'video']),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    summary: z.string(),
    readTime: z.string().optional(),
    audioFile: z.string().optional(),
    duration: z.string().optional(),
    videoUrl: z.string().optional(),
  }),
});

export const collections = {
  'hot-topics': hotTopicsCollection,
};
