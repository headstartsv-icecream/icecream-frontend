import { Button, message } from 'antd'
import MaterialButton from '@material-ui/core/Button'
import PageLayout from 'src/components/layouts/PageLayout'

import PageTitle from 'src/components/layouts/PageTitle'
import styled from 'styled-components'

const Title = styled.h1`
  text-align: center;
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`

const StyledA = styled.a`
  color: #0070f3;
  text-decoration: none;

  :hover,
  :focus,
  :active {
    text-decoration: underline;
  }
`

const Description = styled.p`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
`

const FlexContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 150px;
`

function handleClickTestButton() {
  return message.info('With Ant-Design')
}

function HomePage() {
  return (
    <PageTitle title="Icecream">
      <PageLayout>
        <Title>
          Welcome to <StyledA href="https://www.google.com/">Icecream Front-End!</StyledA>
        </Title>

        <Description>
          Get started by editing <code>src/pages/index.tsx</code>
        </Description>

        <FlexContainer>
          <Button onClick={handleClickTestButton} type="primary">
            Test Button
          </Button>
          <MaterialButton variant="contained" color="primary">
            Hello World
          </MaterialButton>
        </FlexContainer>
      </PageLayout>
    </PageTitle>
  )
}

export default HomePage
