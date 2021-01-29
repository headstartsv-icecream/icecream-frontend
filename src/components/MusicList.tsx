import { useEffect, useState } from 'react'
import styled from 'styled-components'
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'
import Link from 'next/link'
import { fetchChartTrack } from '../utils/commons'
import InfiniteScroll from 'react-infinite-scroller'

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

function MusicList(countryCode: Record<string, string>) {
  const [startFrom, setStartFrom] = useState(0)
  const [musicList, setMusicList] = useState<any[]>([])
  const [hasMoreItem, setHasMoreItems] = useState(true)

  function handleLoadMore() {
    ;(async () => {
      const response = await fetchChartTrack(countryCode, startFrom)
      const page = response.tracks
      if (startFrom < 200) {
        setMusicList([...musicList, ...page])
        setStartFrom((prev) => prev + 20)
      } else {
        setHasMoreItems(false)
      }
    })()
  }
  return (
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
        {musicList ? <CoverArt src={musicList[0]?.share.image} alt="coverart" /> : null}
      </RightWrapper>
    </Container>
  )
}

export default MusicList
