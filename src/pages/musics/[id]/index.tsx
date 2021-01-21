import Link from 'next/link'
import { useRouter } from 'next/router'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import MusicNameOverlay from 'src/components/MusicNameOverlay'
import { HEADER_HEIGHT, imgUrl, MOBILE_MIN_WIDTH } from 'src/models/constants'
import { getBlackOrWhiteTextColorFrom } from 'src/utils/commons'
import styled from 'styled-components'

const FlexContainer = styled.div<{ backgroundColor: string }>`
  width: 100%;
  padding: ${HEADER_HEIGHT} 0 0 0;

  background-color: ${(p) => p.backgroundColor};

  display: flex;
  flex-flow: row wrap;

  * {
    color: ${(p) => getBlackOrWhiteTextColorFrom(p.backgroundColor)};
  }
`

const StyledImage = styled.img`
  min-width: ${MOBILE_MIN_WIDTH};
`

const MusicInformation = styled.div``

export function MusicDetailPage() {
  const router = useRouter()
  const id = router.query.id

  // 서버로 음악 정보랑 댓글 정보 요청 보내고 받기
  // const { data, error, loading } = use___Query({ variables: ... })
  const musicName = 'Icezam-mite'

  const backgroundColor = '#c8bebb'

  return (
    <PageTitle title="Icezam - My Page">
      <PageLayout>
        <MusicNameOverlay backgroundColor={backgroundColor} musicName={musicName} />
        <FlexContainer backgroundColor={backgroundColor}>
          <StyledImage src={imgUrl} alt="music cover" />
          <MusicInformation>
            <div>맑은 하늘</div>
            <Link href="/artists/12">
              <a href="/artists/12">陳致逸 & HOYO-MiX</a>
            </Link>
            <div>OST</div>
            <div>Icezam 268회</div>
            <div>음악 상세 페이지 ID: {id}</div>
          </MusicInformation>
        </FlexContainer>
      </PageLayout>
    </PageTitle>
  )
}

export default MusicDetailPage
