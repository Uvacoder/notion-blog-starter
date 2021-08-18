import { listPosts } from 'lib/notion'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Post } from 'schemas/post'

type Props = {
  post: Post
}

const PostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [{ params: { slug: 'hello-world' } }],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await listPosts()
  return {
    props: {
      post: posts[0]
    },
    revalidate: 10
  }
}

export default PostPage
