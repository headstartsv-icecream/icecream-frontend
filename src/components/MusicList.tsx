import { useEffect, useState } from 'react'
import styled from 'styled-components'
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'
import Link from 'next/link'
import { fetchChartList } from '../utils/commons'

const List = styled.ol`
  list-style-type: none;
  vertical-align: baseline;
  padding-top: 30px;
`
const ListItem = styled.li`
  display: list-item;
  font-weight: bold;
  font-size: 1rem;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    color: blue;
  }
`
const SubTitle = styled.span`
  color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Rank = styled.div`
  color: black;
  padding-right: 30px;
  font-size: 25px;
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
  /* white-space: nowrap; */
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

  /* @media screen and (max-width: 960px) {
    display: none;
  } */
`

const CoverArt = styled.img`
  border-radius: 8px;
  width: 60%;
  position: sticky;
  top: 100px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  :hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
    /* transition: all 0.3s; */
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
            <ThumbNail src={track.images.coverart} />
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

function MusicList() {
  const [chartList, setChartList] = useState<any>()
  useEffect(() => {
    ;(async () => {
      const result = await fetchChartList()
      setChartList(result)
      console.log(
        (result.tracks as any[]).map((track) => {
          return track.key
        })
      )
    })()
  }, [])
  return (
    <Container>
      <LeftWrapper>
        <List>
          {(chartList?.tracks as any[])?.map((track, index) => (
            <RenderItems key={track.key} index={index + 1} track={track} />
          ))}
        </List>
      </LeftWrapper>
      <RightWrapper>
        <CoverArt src={chartList?.tracks[0].share.image} alt="coverart" />
      </RightWrapper>
    </Container>
  )
}

export default MusicList
