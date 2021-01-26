import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import { HEADER_HEIGHT } from 'src/models/constants'
import styled from 'styled-components'
import Banner from 'src/components/Banner'
import MusicList from '../../components/MusicList'

const PaddingTop = styled.div`
  padding-top: ${HEADER_HEIGHT};
`

function ChartsPage() {
  return (
    <PageTitle title="Icecream Music - Charts">
      <PageLayout>
        <PaddingTop />
        <Banner />
        <MusicList />
      </PageLayout>
    </PageTitle>
  )
}
export default ChartsPage
