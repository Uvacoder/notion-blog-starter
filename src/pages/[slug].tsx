import * as React from 'react'
import Link from 'next/link'
import { getPostBody, listPosts, Body } from 'lib/notion'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Post } from 'schemas/post'
import { NotionBodyRenderer } from 'lib/notion/body-renderer'
import PageLayout from 'components/layout/page'

const PostPage = ({
  post,
  body
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout contain={{ className: 'py-16' }}>
      <article className="mx-auto max-w-prose">
        <Link href="/">
          <a className="block mb-4">{'<-'} Back</a>
        </Link>
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <NotionBodyRenderer body={body} />
      </article>
    </PageLayout>
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
