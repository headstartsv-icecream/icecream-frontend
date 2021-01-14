import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import LoginForm from 'src/components/LoginForm'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function MyPage({}: Props) {
  const login = false
  return (
    <PageTitle title="Icezam - My Page">
      <PageLayout>{login ? 'My Page' : <LoginForm />}</PageLayout>
    </PageTitle>
  )
}

export default MyPage
