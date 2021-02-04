import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'
import Link from 'next/link'
import styled from 'styled-components'

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

type Props = {
  musicList: {
    key: string
    title: string
    subtitle: string
    images: {
      coverart: string
    }
  }[]
}

function ChartMusicList({ musicList }: Props) {
  return (
    <List>
      {musicList.map((music, index) => (
        <Link key={music.key} href={`/musics/${music.key}/${music.title}`}>
          <a href={`/musics/${music.key}/${music.title}`}>
            <ListItem>
              <FlexContainerRow>
                <Rank>{index + 1}</Rank>
                {music ? (
                  <ThumbNail
                    src={
                      music.images
                        ? music.images.coverart
                          ? music.images.coverart
                          : '/icezam-logo.png'
                        : '/icezam-logo.png'
                    }
                  />
                ) : null}
                <Title>
                  {music.title} <br /> <SubTitle>{music.subtitle}</SubTitle>
                </Title>
                <CommentChip>
                  <TextsmsOutlinedIcon />
                  반응보기
                </CommentChip>
              </FlexContainerRow>
            </ListItem>
          </a>
        </Link>
      ))}
    </List>
  )
}

export default ChartMusicList
