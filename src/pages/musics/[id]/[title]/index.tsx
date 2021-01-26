import Link from 'next/link'
import { useRouter } from 'next/router'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import MusicNameOverlay from 'src/components/MusicNameOverlay'
import { useMusicQuery } from 'src/graphql/generated/types-and-hooks'
import { HEADER_HEIGHT, imgUrl, MOBILE_MIN_WIDTH } from 'src/models/constants'
import { getBlackOrWhiteTextColorFrom } from 'src/utils/commons'
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

function MusicDetailPage() {
  const router = useRouter()
  const { id, title } = router.query

  const { data, error, loading } = useMusicQuery({ variables: { id: id as string } })

  const backgroundColor = '#c8bebb'

  return (
    <PageTitle title="Icezam - My Page">
      <PageLayout>
        <MusicNameOverlay backgroundColor={backgroundColor} musicName={title as string} />
        <FlexContainer backgroundColor={backgroundColor}>
          <StyledImage src={imgUrl} alt="music cover" />

          <MusicInformation>
            <div>맑은 하늘</div>
            <Link href="/artists/12">
              <a href="/artists/12">陳致逸 & HOYO-MiX</a>
            </Link>
            ``
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
