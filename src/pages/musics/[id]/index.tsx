import { useRouter } from 'next/router'

function MusicDetailPage() {
  const router = useRouter()
  const id = router.query.id

  return <div>음악 상세 페이지 ID: {id}</div>
}

export default MusicDetailPage
