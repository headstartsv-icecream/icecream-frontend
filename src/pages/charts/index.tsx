import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchChartList, fetchChartTrack } from '../../utils/commons'

import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import { HEADER_HEIGHT } from 'src/models/constants'

import InfiniteScroll from 'react-infinite-scroller'
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'

const PaddingTop = styled.div`
  padding-top: ${HEADER_HEIGHT};
`
const ParentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 3fr 1fr;
  padding-left: 2%;
  height: 60vh;
  background: linear-gradient(to bottom, #0bf, #ecd5ec);
`
const SelectFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 15px;
`
const MainGrid = styled.div`
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

const List = styled.ol`
  list-style-type: none;
  vertical-align: baseline;
  padding-top: 30px;
`
const ListItem = styled.li`
  display: list-item;
  font-weight: bold;
  font-size: 1rem;
  min-width: 256px;
  border-bottom: 2px solid #d6d4d4;
  /* margin-right: -4px; */
  padding: 25px;
  :hover {
    background-color: #eeecec;
    transition: all 0.2s;
  }
`
const Title = styled.span`
  padding-left: 20px;
  font-size: 1.1rem;
  color: black;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    color: blue;
  }
`
const SubTitle = styled.span`
  color: gray;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Rank = styled.div`
  color: black;
  padding-right: 30px;
  font-size: 25px;
  white-space: nowrap;
`

const FlexContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`

const ThumbNail = styled.img`
  vertical-align: middle;
  padding-left: 10;
  width: 90px;
  height: 90px;
  border-radius: 10%;
  border: 1px solid #3a3939;
`

const CommentChip = styled.div`
  display: inline-block;
  white-space: nowrap;
  margin-left: auto;
  padding: 0 25px;
  height: 50px;
  font-size: 0.5rem;
  line-height: 50px;
  border-radius: 25px;
  background-color: #f1f1f1;
`

const Container = styled.div`
  display: grid;
  /* border: 3px solid red; */
  grid-template-columns: 0.55fr minmax(0, 0.45fr);
  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 30px;
`
const LeftWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: stretch;
  /* border: 2px solid blue; */
`

const RightWrapper = styled.div`
  display: flex;
  padding-top: 10%;
  flex-wrap: nowrap;
  align-items: center;
  flex-direction: column;
  /* border: 2px solid blue; */

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
type Props = {
  track: {
    id: string
    title: string
    subtitle: string
    images: {
      coverart: string
    }
  }
  index: number
}

function RenderItems({ track, index }: Props) {
  return (
    <Link href="/music/">
      <a href="/music/1">
        <ListItem>
          <FlexContainerRow>
            <Rank>{index}</Rank>
            {track ? (
              <ThumbNail
                src={
                  track.images
                    ? track.images.coverart
                      ? track.images.coverart
                      : '/icezam-logo.png'
                    : '/icezam-logo.png'
                }
              />
            ) : null}
            <Title>
              {track.title} <br /> <SubTitle>{track.subtitle}</SubTitle>
            </Title>
            <CommentChip>
              <TextsmsOutlinedIcon />
              반응보기
            </CommentChip>
          </FlexContainerRow>
        </ListItem>
      </a>
    </Link>
  )
}

function ChartsPage() {
  const [countryCode, setCountryCode] = useState('KR')
  const [chartList, setChartList] = useState<any>()

  const [startFrom, setStartFrom] = useState(0)
  const [musicList, setMusicList] = useState<any[]>([])
  const [hasMoreItem, setHasMoreItems] = useState(true)

  async function handleLoadMore() {
    const response = await fetchChartTrack(countryCode, startFrom)
    const page = response.tracks
    if (startFrom < 200) {
      setMusicList([...musicList, ...page])
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

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  useEffect(() => {
    ;(async () => {
      const result = await fetchChartList()
      setChartList(result)
    })()
  }, [])

  return (
    <PageTitle title="Icecream Music - Charts">
      <PageLayout>
        <ParentContainer>
          <PaddingTop />
          <SelectFlex>
            <Select value={countryCode} onChange={handleChange}>
              {(chartList?.countries as any[])?.map((country) => (
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
        </ParentContainer>
        <Container>
          <LeftWrapper>
            <InfiniteScroll
              pageStart={0}
              loadMore={handleLoadMore}
              hasMore={hasMoreItem}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              <List>
                {musicList?.map((track, index) => (
                  <RenderItems key={track.key} index={index + 1} track={track} />
                ))}
              </List>
            </InfiniteScroll>
          </LeftWrapper>
          <RightWrapper>
            {startFrom > 0 ? <CoverArt src={musicList[0]?.share.image} alt="coverart" /> : null}
          </RightWrapper>
        </Container>
      </PageLayout>
    </PageTitle>
  )
}

export default ChartsPage
