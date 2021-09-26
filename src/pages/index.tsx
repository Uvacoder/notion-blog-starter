import PageLayout from 'components/layout/page'
import Link from 'next/link'
import { listPosts } from 'lib/notion'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Post } from 'schemas/post'

const HomePage = ({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout headProps={{ title: 'headless-blog' }}>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </div>
        )
      })}
    </PageLayout>
  )
}

type Props = {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await listPosts()
  return {
    props: { posts },
    revalidate: 10
  }
}

export default HomePage
