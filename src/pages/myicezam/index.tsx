import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import LoginForm from 'src/components/LoginForm'
import { HEADER_HEIGHT } from 'src/models/constants'
import styled from 'styled-components'

const PaddingTop = styled.div`
  padding-top: ${HEADER_HEIGHT};
`

function MyPage() {
  const login = false
  return (
    <PageTitle title="Icezam - My Page">
      <PageLayout>
        <PaddingTop />
        {login ? 'My Page' : <LoginForm />}
      </PageLayout>
    </PageTitle>
  )
}

export default MyPage
