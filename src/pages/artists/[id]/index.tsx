import { useRouter } from 'next/router'
import { useEffect } from 'react'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import { HEADER_HEIGHT } from 'src/models/constants'
import styled from 'styled-components'

const Padding = styled.div`
  padding: ${HEADER_HEIGHT} 0 0 0;
`

function ArtistDetailPage() {
  const router = useRouter()

  useEffect(() => {
    console.log(router.query)
  }, [router])

  return (
    <PageTitle title="Icezam - Artist Detail Page">
      <PageLayout>
        <Padding>Artist Detail Page</Padding>
      </PageLayout>
    </PageTitle>
  )
}

export default ArtistDetailPage
