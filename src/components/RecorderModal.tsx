import Image from 'next/image'
import useAudioRecorder from 'src/hooks/useAudioRecorder'
import useStopBodyScroll from 'src/hooks/useStopBodyScroll'
import { MOBILE_MIN_WIDTH } from 'src/models/constants'
import styled, { keyframes } from 'styled-components'
import ClientPortal from './atoms/ClientPortal'
import IcezamLogo from './atoms/IcezamLogo'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const ripple = keyframes`
  50% {
    opacity: .2;
  }

  100% {
    height: 80vmin;
    width: 80vmin;
    opacity: 0;
  }
`

const FixedPosition = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
  pointer-events: auto; // body의 scroll 방지 시 none 상속 방지

  overflow-y: auto;
  background-image: linear-gradient(to bottom, #0bf, #066aff);

  display: flex;
  align-items: center;

  animation: ${fadeIn} 0.5s ease-out;
`

const Margin = styled.div`
  margin: 0 1rem;
  position: absolute;
  top: 0;
  left: 0;
`

const Wave = styled.div<{ delay: number }>`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, -50%);

  opacity: 0;
  background-color: white;
  border-radius: 50%;

  animation: ${ripple} 3s cubic-bezier(0.36, 0.11, 0.89, 0.32) ${(p) => p.delay}s infinite;
`

const FlexContainerColumn = styled.div`
  width: 100%;
  margin: 1rem;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  * {
    color: #eee;
  }
`

const breathing = keyframes`
  0%, 100% {
    transform: scale(1,1);
  }
  50% {
    transform: scale(1.1,1.1);
  }
`

const AnimatedImage = styled(Image)`
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.3));
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 2px;
  animation: ${breathing} 3s infinite ease-in-out;
`

const CancelButton = styled.button`
  height: 50px;
  width: ${MOBILE_MIN_WIDTH};
  background-color: rgba(39, 6, 128, 0.3);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`

function getSearchingStatusFrom(recordingCount: number): [string, string] {
  switch (recordingCount) {
    case 0:
      return ['확인 중', '이 페이지를 새로고침하거나 닫지 마세요.']
    case 1:
      return ['일치하는 음악 검색 중', '기다려주세요.']
    case 2:
      return ['검색 확장 중', '기다려주세요.']
    case 3:
      return ['현재까지 검색 결과가 없습니다.', '마지막 시도']
    default:
      return ['너무 많은 검색 시도.. 그만 시도 하세요!', '(이 메시지가 보이면 오류)']
  }
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onFailure: () => void
  setMusicInfo: (info: Record<string, unknown> | null) => void
}

function RecorderModal({ isOpen, onClose, onFailure, setMusicInfo }: Props) {
  const recordingCount = useAudioRecorder({ onFailure, setMusicInfo })

  useStopBodyScroll(isOpen)

  return (
    <ClientPortal isOpen={isOpen} onClose={onClose}>
      <FixedPosition>
        <Margin onClick={onClose} onKeyDown={onClose} role="button" tabIndex={0}>
          <IcezamLogo />
        </Margin>
        <Wave delay={0.3} />
        <Wave delay={0.6} />
        <Wave delay={1.2} />
        <Wave delay={2.4} />
        <FlexContainerColumn>
          <AnimatedImage src="/icezam-logo.png" alt="icezam-logo" width={250} height={250} />
          <h1>{getSearchingStatusFrom(recordingCount)[0]}</h1>
          <h3>{getSearchingStatusFrom(recordingCount)[1]}</h3>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </FlexContainerColumn>
      </FixedPosition>
    </ClientPortal>
  )
}

export default RecorderModal
