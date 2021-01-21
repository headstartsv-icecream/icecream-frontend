import styled from 'styled-components'
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'
import { musicData } from '../models/constants'
import Link from 'next/link'

const List = styled.ol`
  list-style-type: none;
  vertical-align: baseline;
  padding-top: 30px;
`
const ListItem = styled.li`
  display: list-item;
  font-weight: bold;
  font-size: 1.5rem;
  border-bottom: 2px solid #d6d4d4;
  margin-right: -4px;
  padding: 25px;
  :hover {
    background-color: #eeecec;
  }
`
const Title = styled.span`
  padding-left: 20px;
  color: black;
  :hover {
    color: blue;
  }
`
const SubTitle = styled.span`
  color: gray;
`

const Rank = styled.div`
  color: black;
  padding-left: 10px;
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
  margin-left: 250px;
  padding: 0 25px;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  border-radius: 25px;
  background-color: #f1f1f1;
`

type Props = {
  data: {
    id: number
    title: string
    artist: string
    img?: string
  }
  index: number
}

function RenderItems({ data, index }: Props) {
  return (
    <Link href="/music/1">
      <a href="/music/1">
        <ListItem>
          <FlexContainerRow>
            <Rank>{index}</Rank>
            <ThumbNail src={data.img} />
            <Title>
              {data.title} <br /> <SubTitle>{data.artist}</SubTitle>
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
  return (
    <List>
      {musicData.map((data, index) => (
        <RenderItems key={data.id} index={index + 1} data={data} />
      ))}
    </List>
  )
}

export default MusicList
