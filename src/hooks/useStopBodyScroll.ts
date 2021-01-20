import { useEffect } from 'react'

function useStopBodyScroll(when: boolean) {
  useEffect(() => {
    const style = document.body.style
    const scrollY = window.scrollY
    if (when) {
      style.pointerEvents = 'none'
      style.position = 'fixed'
      style.top = `-${scrollY}px`

      return () => {
        style.removeProperty('pointer-events')
        style.removeProperty('position')
        style.removeProperty('top')
        window.scrollTo(0, scrollY)
      }
    }
  }, [when])
}

export default useStopBodyScroll
