import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import { fetchDetectedMusicInfo, getBase64EncodingFrom, wait } from 'src/utils/commons'
import { mergeLeftRightBuffers } from 'src/utils/recordrtc'
import styled, { keyframes } from 'styled-components'
import OverlayModal from './OverlayModal'

const FlexContainerColumn = styled.div`
  min-height: 300px;
  height: 100vh;
  padding-top: 4rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  background: linear-gradient(to bottom, #0bf, #066aff);

  h1,
  h2 {
    color: #fff;
    font-weight: bold;
    text-align: center;
    word-break: keep-all;
  }
`

const H1 = styled.h1`
  font-size: 3rem;
  margin: 1rem;
`

const H2 = styled.h2`
  margin: 1rem;
`

const MaxWidth = styled.div`
  max-width: 350px;
`

const breathingButton = keyframes`
  0%, 100% {
    transform: scale(1,1);
  }
  50% {
    transform: scale(1.05,1.05);
  }
`

const AnimatedImage = styled(Image)`
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.3));
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 2px;
  animation: ${breathingButton} 3s infinite ease-in-out;

  :hover {
    cursor: pointer;
  }
`

// Temporary Type
type InternalRecorder = {
  recordingLength: number
  leftchannel: Float32Array[]
}

function getAudioBlobFromAudioRecorder(audioRecorder: RecordRTC) {
  return new Promise<Blob>((resolve) => {
    const internalRecorder = (audioRecorder.getInternalRecorder() as unknown) as InternalRecorder
    mergeLeftRightBuffers(
      {
        desiredSampRate: 44100,
        sampleRate: 44100,
        numberOfAudioChannels: 1,
        internalInterleavedLength: internalRecorder.recordingLength,
        leftBuffers: internalRecorder.leftchannel,
        rightBuffers: [],
      },
      (buffer: BlobPart) => resolve(new Blob([buffer], { type: 'audio/wav' }))
    )
  })
}

type Props = {
  setMusicInfo: (info: Record<string, unknown>) => void
}

function Recorder({ setMusicInfo }: Props) {
  const audioStream = useRef<MediaStream | null>(null)
  const audioRecorder = useRef<RecordRTC | null>(null)
  const [ModalOpen, setModalOpen] = useState<boolean>(false)

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }
  async function recordAudioCyclically() {
    if (!audioStream.current || !audioRecorder.current) {
      audioStream.current = await window.navigator.mediaDevices.getUserMedia({ audio: true })
      audioRecorder.current = new RecordRTC(audioStream.current, {
        type: 'audio',
        recorderType: StereoAudioRecorder,
        disableLogs: true,
        sampleRate: 44100,
        desiredSampRate: 44100,
        numberOfAudioChannels: 1,
      })
    }

    for (let i = 0; i < 4; i++) {
      console.log('Recording...')
      audioRecorder.current.startRecording()
      await wait(3000 + i * 500)
      audioRecorder.current.stopRecording()

      const audioBlob = await getAudioBlobFromAudioRecorder(audioRecorder.current)
      const base64Encoding = await getBase64EncodingFrom(audioBlob)

      console.log('Searching audio blob...')
      const newMusicInfo = await fetchDetectedMusicInfo(base64Encoding)

      if (newMusicInfo.matches.length) {
        setMusicInfo(newMusicInfo)
        break
      } else {
        audioRecorder.current.reset()
      }
    }
  }

  useEffect(() => {
    return () => {
      audioStream.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  return (
    <FlexContainerColumn>
      <H1>Icezam은 주변에서 들리는 곡을 인식합니다.</H1>
      <H2>클릭하여 Icezam하기</H2>
      <MaxWidth>
        <AnimatedImage
          src="/icezam-logo.png"
          alt="icezam-logo"
          width={500}
          height={500}
          onClick={() => {
            recordAudioCyclically()
            openModal()
          }}
        />
        <OverlayModal isOpen={ModalOpen} close={closeModal} />
      </MaxWidth>
    </FlexContainerColumn>
    // <div style={{ backgroundColor: '#123456' }}>
    //   <h3>Shazam은 주변에서 들리는 곡을 인식합니다.</h3>
    //   <h4>클릭하여 Shazam하기</h4>

    //   <button
    // onClick={() => {
    //   recordAudioCyclically()
    //   openModal()
    // }}
    //   >
    //     녹음
    //   </button>
    //   <OverlayModal isOpen={ModalOpen} close={closeModal} />
    // </div>
  )
}

export default Recorder
