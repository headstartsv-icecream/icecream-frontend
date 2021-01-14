import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function ChartsPage({}: Props) {
  return (
    <PageTitle title="Icecream Music - Charts">
      <PageLayout>Charts</PageLayout>
    </PageTitle>
  )
}

export default ChartsPage
