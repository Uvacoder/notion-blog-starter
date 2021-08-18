import { Client } from '@notionhq/client'
import { postSchema } from 'schemas/post'

export const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

export async function listPosts() {
  const database_id = process.env.NOTION_POSTS_DATABASE_ID
  if (!database_id) {
    throw new Error(`Make sure to inlcude NOTION_POSTS_DATABASE_ID in your env`)
  }
  const posts = await notion.databases.query({ database_id, page_size: 100 })
  return posts.results.map((result) => postSchema.parse(result))
}
