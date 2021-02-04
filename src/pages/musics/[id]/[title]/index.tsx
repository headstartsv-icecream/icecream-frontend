import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { musicsVar } from 'src/apollo/cache'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import MusicNameOverlay from 'src/components/MusicNameOverlay'
import { useMusicFromClientQuery, useMusicQuery } from 'src/graphql/generated/types-and-hooks'
import { HEADER_HEIGHT, MOBILE_MIN_WIDTH } from 'src/models/constants'
import { formatNumber, getBlackOrWhiteTextColorFrom } from 'src/utils/commons'
import styled from 'styled-components'

const FlexContainer = styled.div<{ backgroundColor: string }>`
  width: 100%;
  padding: ${HEADER_HEIGHT} 0 0 0;
  position: relative;

  ${(p) => `background: linear-gradient(${p.backgroundColor} 50%, white 50%);`}

  display: flex;
  flex-flow: row wrap;

  * {
    color: ${(p) => getBlackOrWhiteTextColorFrom(p.backgroundColor)};
  }
`

const StyledImage = styled.img`
  width: 100%;
  max-width: ${MOBILE_MIN_WIDTH};
  height: auto;
  object-fit: cover;
`

const MusicInformation = styled.div``

const dummy = {
  id: '0',
  title: 'Nonstop',
  artists: [
    { id: '1', name: 'OH MY GIRL' },
    { id: '2', name: '오마이걸' },
  ],
  searchCount: 1123124,
  albumImage: 'https://images.shazam.com/coverart/t525216235-b1508988683_s800.jpg',
  artistImage:
    'https://is1-ssl.mzstatic.com/image/thumb/Features114/v4/e8/dd/f1/e8ddf19a-a284-74b2-dd8d-5a26017363b3/mzl.xfkduycl.jpg/800x800bb.jpeg',
  genres: ['K-POP'],
  lyrics: ['asf', 'sadf'],
  melonLink: 'https://www.melon.com/video/detail2.htm?mvId=50219624&menuId=28010101',
  shazamId: '123',
  youtubeLink:
    'https://www.youtube.com/watch?v=iDjQSdN_ig8&ab_channel=1theK%28%EC%9B%90%EB%8D%94%EC%BC%80%EC%9D%B4%29',
  youtubeImage: '',
  artistOtherMusics: [
    {
      id: '0',
      title: 'ON',
    },
  ],
  comments: [
    {
      id: '1',
      creationDate: Date.now(),
      crawlingDate: Date.now(),
      content: '댓글 내용',
      userName: '댓글 쓴 사용자 이름',
      source: 'YOUTUBE',
      likeCount: 1,
    },
  ],
  includedPlaylists: [
    {
      id: '1',
      name: 'name',
    },
  ],
  similarMusics: [
    {
      id: '1',
      title: '노래 제목',
      artists: '가수 이름',
    },
  ],
}

function MusicDetailPage() {
  const router = useRouter()
  const { id, title } = router.query

  const music = useReactiveVar(musicsVar)[`${id}`] as any
  console.log(music)

  return (
    <PageTitle title={`Icezam - musics - ${music.title}`}>
      <PageLayout>
        <MusicNameOverlay backgroundColor={'#c8bebb'} musicName={title as string} />
        <FlexContainer backgroundColor={'#c8bebb'}>
          <StyledImage src={music.images.coverart} alt="music cover" />

          <MusicInformation>
            <h1>{title}</h1>
            <h3>{music.subtitle}</h3>

            <div>{music.genres?.primary}</div>
            <div>Icezam {formatNumber(dummy.searchCount)}회</div>
          </MusicInformation>
        </FlexContainer>
      </PageLayout>
    </PageTitle>
  )
}

export default MusicDetailPage
