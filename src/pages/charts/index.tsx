import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import styled from 'styled-components'

const PaddingTop = styled.div`
  padding-top: 5rem;
`

function ChartsPage() {
  return (
    <PageTitle title="Icecream Music - Charts">
      <PageLayout>
        <PaddingTop />
        Charts
      </PageLayout>
    </PageTitle>
  )
}

export default ChartsPage
