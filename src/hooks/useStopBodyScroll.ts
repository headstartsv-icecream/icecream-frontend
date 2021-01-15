import { useRef, useLayoutEffect } from 'react'

function useStopBodyScroll(when: boolean) {
  const previousScrollY = useRef(0)

  useLayoutEffect(() => {
    if (when) {
      previousScrollY.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${previousScrollY.current}px`
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, previousScrollY.current)
    }
  }, [when, previousScrollY])
}

export default useStopBodyScroll
