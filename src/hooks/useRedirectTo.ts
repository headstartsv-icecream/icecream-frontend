import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { showWarningMessage } from 'src/utils/ant-design'

function useRedirectTo(url: string, condition: boolean, showMessage?: string) {
  const router = useRouter()

  useEffect(() => {
    if (condition) {
      if (showMessage) {
        showWarningMessage(showMessage)
      }
    }
  }, [condition, showMessage])

  useEffect(() => {
    if (condition) {
      router.replace(url)
    }
  }, [router, condition, url, showMessage])
}

export default useRedirectTo
