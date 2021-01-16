import useAudioRecorder from 'src/hooks/useAudioRecorder'
import styled, { keyframes } from 'styled-components'
import ClientPortal from './atoms/ClientPortal'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gif = require('../../public/equalizer.gif')

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const FixedPosition = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 1;

  background-image: linear-gradient(to bottom, #0bf, #066aff);

  animation: ${fadeIn} 0.5s ease-out;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

  return (
    <ClientPortal isOpen={isOpen} onClose={onClose}>
      <FixedPosition>
        <FlexContainer>
          <h1 id="transition-modal-title">Hearing your music...</h1>
          <img src={gif} alt="Searching your music..." />
          <p id="transition-modal-description">react-transition-group animates me.</p>
          <h2>{getSearchingStatusFrom(recordingCount)[0]}</h2>
          <h3>{getSearchingStatusFrom(recordingCount)[1]}</h3>

          <button onClick={onClose}>취소하기</button>
        </FlexContainer>
      </FixedPosition>
    </ClientPortal>
  )
}

export default RecorderModal
