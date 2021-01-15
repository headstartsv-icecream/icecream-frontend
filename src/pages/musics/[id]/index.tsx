import { useRouter } from 'next/router'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import { HEADER_HEIGHT } from 'src/models/constants'
import styled from 'styled-components'

const PaddingTop = styled.div`
  padding-top: ${HEADER_HEIGHT};
  background-color: #4e98dd;
`

function MusicDetailPage() {
  const router = useRouter()
  const id = router.query.id

  // 서버로 음악 정보랑 댓글 정보 요청 보내고 받기

  return (
    <PageTitle title="Icezam - My Page">
      <PageLayout>
        <PaddingTop />
        <div>음악 상세 페이지 ID: {id}</div>
      </PageLayout>
    </PageTitle>
  )
}

export default MusicDetailPage
