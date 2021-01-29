import { useEffect } from 'react'

/** 이 hook을 사용하는 컴포넌트는 pointer-events: auto 로 설정해야 마우스 상호작용이 가능하다. */
function useStopBodyScroll(when: boolean) {
  useEffect(() => {
    if (when) {
      const style = document.body.style
      const scrollY = window.scrollY
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
