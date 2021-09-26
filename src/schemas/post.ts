import { z } from 'zod'

export const postSchema = z.object({
  id: z.string(),
  date: z.string(),
  createdTime: z.string(),
  title: z.string(),
  slug: z.string(),
  tags: z.array(
    z.object({ id: z.string(), name: z.string(), color: z.string() })
  ),
  isPublished: z.boolean(),
  url: z.string(),
  cover: z.string().nullable(),
  icon: z.string().nullable()
})

export type Post = z.infer<typeof postSchema>
