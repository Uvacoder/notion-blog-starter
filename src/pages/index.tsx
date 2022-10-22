import PageLayout from 'components/layout/page'
import Link from 'next/link'
import { listPosts } from 'lib/notion'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Post } from 'schemas/post'

const HomePage = ({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout contain={{ className: 'py-16' }}>
      <h1 className="mb-4 text-4xl font-bold">Posts</h1>
      <ul className="list-disc list-inside">
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
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
