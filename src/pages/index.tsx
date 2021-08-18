import PageLayout from 'components/layout/page'
import Button from 'components/primitives/button'

const HomePage = () => {
  return (
    <PageLayout headProps={{ title: 'headless-blog' }}>
      <Button>Hola mundo.</Button>
    </PageLayout>
  )
}

export default HomePage
