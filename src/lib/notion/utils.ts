import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { Post } from 'schemas/post'
import slug from 'slugify'

export function normalizePost(post: QueryDatabaseResponse['results'][0]): Post {
  const properties = post.properties as any
  const title = properties.Name.title[0].plain_text
  return {
    title,
    id: post.id,
    tags: properties.Tags?.multi_select ?? [],
    createdTime: post.created_time,
    url: post.url,
    date: post.created_time,
    isPublished: !post.archived,
    slug:
      properties.Slug?.title?.[0].plain_text ||
      slug(title, { strict: true, lower: true }),
    cover:
      (post.cover?.type === 'external'
        ? post.cover.external.url
        : post.cover?.file.url) ?? null,
    icon:
      (post.icon?.type === 'external'
        ? post.icon.external.url
        : post.icon?.type === 'emoji'
        ? post.icon.emoji
        : post.icon?.file.url) ?? null
  }
}
