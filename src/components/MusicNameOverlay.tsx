import { memo, useEffect, useState } from 'react'
import useStopBodyScroll from 'src/hooks/useStopBodyScroll'
import { getBlackOrWhiteTextColorFrom } from 'src/utils/commons'
import styled, { keyframes } from 'styled-components'
import ClientPortal from './atoms/ClientPortal'

const slideToTop = keyframes`
  0% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0;
  }
`

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
  }
`

const FixedPosition = styled.div<{ backgroundColor: string }>`
  width: 100%;
  height: 0;
  position: fixed;
  top: 0;
  z-index: 1;

  overflow-y: auto;
  background-color: ${(p) => p.backgroundColor};

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${slideToTop} 3s ease-in-out;

  * {
    color: ${(p) => getBlackOrWhiteTextColorFrom(p.backgroundColor)};
  }
`

const Animated = styled.div`
  font-size: 2rem;
  text-align: center;

  animation: ${appear} 0.5s ease-out;
`

export type Props = {
  backgroundColor: string
  musicName: string
}

/**
 * @param backgroundColor #123456 형태만 가능
 */
function MusicNameOverlay({ backgroundColor, musicName }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsOpen(false)
    }, 2000)
    return () => {
      clearTimeout(timerId)
    }
  }, [])

  useStopBodyScroll(isOpen)

  return (
    <ClientPortal>
      <FixedPosition backgroundColor={backgroundColor}>
        <Animated>{musicName}</Animated>
      </FixedPosition>
    </ClientPortal>
  )
}

export default memo(MusicNameOverlay)
