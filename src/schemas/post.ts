import { z } from 'zod'

export const postSchema = z.object({
  title: z.string(),
  slug: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export type Post = z.infer<typeof postSchema>
