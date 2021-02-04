import Skeleton from '@material-ui/lab/Skeleton'
import Image from 'next/image'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import ChartMusicList from 'src/components/ChartMusicList'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import { HEADER_HEIGHT } from 'src/models/constants'
import { fetchChartCountryList, fetchChartTrackList } from '../../utils/commons'

const GridContainerTop = styled.div`
  height: 60vh;
  padding: ${HEADER_HEIGHT} 0 0 2%;
  background: linear-gradient(to bottom, #0bf, #ecd5ec);
  min-height: 330px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 3fr 1fr;
`

const SelectFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 15px;
`

const MainGrid = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
`

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  height: 3rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  background-color: #baa6f8;

  padding: 0.6em 1.4em 0.5em 2em;
  margin: 0;
  width: 200px;
  border-radius: 0.5em;
`

const Option = styled.option`
  font-weight: normal;
`

const TitleFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const FirstTitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.5rem;
`

const SecondTitle = styled.div`
  display: flex;
  color: #ffffff;
  font-weight: bold;
  font-size: 2.5rem;
  align-self: baseline;
`

const Icon = styled.div`
  display: flex;
  padding-top: 15px;
  flex-direction: column;
  justify-content: center;
`

const GridContainerMusicList = styled.div`
  display: grid;
  grid-template-columns: 0.55fr minmax(0, 0.45fr);
  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 30px;
`

const FlexContainerLeft = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
`

const FlexContainerRight = styled.div`
  padding-top: 10%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  @media screen and (max-width: 960px) {
    display: none;
  }
`

const CoverArt = styled.img`
  border-radius: 8px;
  width: 60%;
  position: sticky;
  top: 100px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  :hover {
    box-shadow: 0 0 3px 2px rgba(0, 140, 186, 0.5);
    transition: all 0.3s;
  }
`

const Padding = styled.div`
  padding: ${HEADER_HEIGHT} 0 0 0;
  background: linear-gradient(to bottom, #0bf, #ecd5ec);
`

const FlexSkeletonRow = styled.div`
  padding-left: 8%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`
const GridSkeleton = styled.div`
  display: grid;
  padding-left: 5%;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  justify-content: stretch;
`

const GridSkeletonItem = styled.div`
  display: flex;
  flex-direction: row;
`

type Props = {
  chartCountryList: {
    countries: {
      id: number
      name: string
    }[]
    message: string
  }
}

function ChartsPage({ chartCountryList }: Props) {
  const [countryCode, setCountryCode] = useState('KR')
  const [startFrom, setStartFrom] = useState(0)
  const [musicList, setMusicList] = useState<any[]>([])
  const [hasMoreItem, setHasMoreItems] = useState(true)

  async function handleLoadMore() {
    const response = await fetchChartTrackList(countryCode, startFrom)
    if (startFrom < 200) {
      setMusicList([...musicList, ...response.tracks])
      setStartFrom((prev) => prev + 20)
    } else {
      setHasMoreItems(false)
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCountryCode(event.target.value)
    setStartFrom(0)
    setMusicList([])
  }

  if (!chartCountryList.countries) {
    return (
      <PageTitle title="Icecream Music - Error">
        <PageLayout>
          <Padding>{chartCountryList.message}</Padding>
        </PageLayout>
      </PageTitle>
    )
  }

  return (
    <PageTitle title="Icecream Music - Charts">
      <PageLayout>
        <GridContainerTop>
          <SelectFlex>
            <Select value={countryCode} onChange={handleChange}>
              {chartCountryList.countries.map((country) => (
                <Option key={country.id} value={country.id}>
                  {country.name}
                </Option>
              ))}
            </Select>
          </SelectFlex>
          <MainGrid>
            <Icon>
              <Image src="/play-circle-regular.svg" alt="play-button" width={80} height={80} />
            </Icon>
            <TitleFlex>
              <FirstTitle>{countryCode}</FirstTitle>
              <SecondTitle>Top 200</SecondTitle>
              <FirstTitle>이번 주에 {countryCode}에서 가장 많이 icezam된 트랙</FirstTitle>
            </TitleFlex>
          </MainGrid>
        </GridContainerTop>
        <GridContainerMusicList>
          <FlexContainerLeft>
            <InfiniteScroll
              loadMore={handleLoadMore}
              hasMore={hasMoreItem}
              loader={
                <div className="loader" key={0}>
                  <FlexSkeletonRow>
                    <Skeleton variant="rect" width={90} height={90} />
                    <GridSkeleton>
                      <GridSkeletonItem>
                        <Skeleton width="80%" />
                      </GridSkeletonItem>
                      <GridSkeletonItem>
                        <Skeleton width="50%" />
                      </GridSkeletonItem>
                    </GridSkeleton>
                  </FlexSkeletonRow>
                </div>
              }
            >
              <ChartMusicList musicList={musicList} />
            </InfiniteScroll>
          </FlexContainerLeft>
          <FlexContainerRight>
            {startFrom > 0 ? (
              <CoverArt src={musicList[0]?.share.image} alt="coverart" />
            ) : (
              <Skeleton variant="rect" width="80%" height="100%" />
            )}
          </FlexContainerRight>
        </GridContainerMusicList>
      </PageLayout>
    </PageTitle>
  )
}

export async function getStaticProps() {
  const chartCountryList = await fetchChartCountryList()

  return {
    props: {
      chartCountryList,
    },
  }
}

export default ChartsPage
