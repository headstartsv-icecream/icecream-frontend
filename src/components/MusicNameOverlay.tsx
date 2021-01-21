import { memo, useEffect, useState } from 'react'
import useStopBodyScroll from 'src/hooks/useStopBodyScroll'
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
`

const Animated = styled.div<{ textColor: string }>`
  font-size: 2rem;
  color: ${(p) => p.textColor};
  text-align: center;

  animation: ${appear} 0.5s ease-out;
`

const middleBrightness = (256 + 256 + 256) / 2

function decideBlackOrWhiteFrom(backgroundColor: string) {
  const r = parseInt(backgroundColor.slice(1, 3), 16)
  const g = parseInt(backgroundColor.slice(3, 5), 16)
  const b = parseInt(backgroundColor.slice(5, 7), 16)
  const backgroundBrightness = r + g + b

  if (backgroundBrightness < middleBrightness) {
    return '#eee'
  } else {
    return '#222'
  }
}

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
        <Animated textColor={decideBlackOrWhiteFrom(backgroundColor)}>{musicName}</Animated>
      </FixedPosition>
    </ClientPortal>
  )
}

export default memo(MusicNameOverlay)
