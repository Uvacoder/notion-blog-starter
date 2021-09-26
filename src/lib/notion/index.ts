import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import { normalizePost } from './utils'

export const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

export async function listPosts() {
  const database_id = process.env.NOTION_POSTS_DATABASE_ID
  if (!database_id) {
    throw new Error(
      `Make sure to inlcude NOTION_POSTS_DATABASE_ID in your .env`
    )
  }
  const posts = await notion.databases.query({ database_id, page_size: 100 })
  return posts.results
    .map((post) => normalizePost(post))
    .filter((post) => post.isPublished)
}

export type Block = ListBlockChildrenResponse['results'][0]
export type Body = Array<Block>

export async function getPostBody(id: string) {
  const { results } = await notion.blocks.children.list({
    block_id: id,
    page_size: 100000
  })
  return results
}
