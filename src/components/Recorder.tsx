import { useEffect, useRef } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import {
  downloadFile,
  fetchDetectedMusicInfo,
  getBase64EncodingFrom,
  wait,
} from 'src/utils/commons'
import { mergeLeftRightBuffers } from 'src/utils/recordrtc'
import styled from 'styled-components'

const FlexContainerColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  background: linear-gradient(to bottom, #0bf, #066aff);
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
      <h3>Shazam은 주변에서 들리는 곡을 인식합니다.</h3>
      <h4>클릭하여 Shazam하기</h4>

      <button onClick={recordAudioCyclically}>녹음</button>
    </FlexContainerColumn>
  )
}

export default Recorder
