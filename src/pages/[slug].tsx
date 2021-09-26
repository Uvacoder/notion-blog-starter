import * as React from 'react'
import clsx from 'clsx'
import { getPostBody, listPosts, Body } from 'lib/notion'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Post } from 'schemas/post'

const PostPage = ({
  post,
  body
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <article>
      <h1>{post.title}</h1>
      {body.map((block) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={block.id}>
                {block.paragraph.text.map((text, i) => {
                  if (text.type !== 'text') return null
                  const children = (
                    <span
                      key={i}
                      className={clsx({
                        italic: text.annotations.italic,
                        'font-bold': text.annotations.bold,
                        'font-mono': text.annotations.code,
                        'line-through': text.annotations.strikethrough,
                        underline: text.annotations.underline
                      })}
                    >
                      {text.text.content}
                    </span>
                  )
                  return (
                    <React.Fragment key={i}>
                      {text.href ? (
                        <a
                          href={text.href}
                          className="text-blue-400 transition border-b border-blue-400/70 hover:text-blue-300 hover:border-blue-400"
                        >
                          {children}
                        </a>
                      ) : (
                        children
                      )}
                    </React.Fragment>
                  )
                })}
              </p>
            )
          default:
            return null
        }
      })}
    </article>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const posts = await listPosts()
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: 'blocking'
  }
}

type Props = {
  post: Post
  body: Body
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const posts = await listPosts()
  const post = posts.find((post) => post.slug === params?.slug)
  if (!post) {
    return { notFound: true }
  }
  const body = await getPostBody(post.id)
  return {
    props: { post, body },
    revalidate: 10
  }
}

export default PostPage
