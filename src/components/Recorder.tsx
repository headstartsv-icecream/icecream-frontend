import { useEffect, useRef, useState } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import {
  downloadFile,
  fetchDetectedMusicInfo,
  getBase64EncodingFrom,
  wait,
} from 'src/utils/commons'
import { mergeLeftRightBuffers } from 'src/utils/recordrtc'

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
  setFile: (file: File) => void
}

function Recorder({ setFile }: Props) {
  const audioStream = useRef<MediaStream | null>(null)
  const audioRecorder = useRef<RecordRTC | null>(null)
  // const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  async function recordAudioCyclically() {
    audioStream.current = await window.navigator.mediaDevices.getUserMedia({ audio: true })
    audioRecorder.current = new RecordRTC(audioStream.current, {
      type: 'audio',
      recorderType: StereoAudioRecorder,
      disableLogs: true,
      sampleRate: 44100,
      desiredSampRate: 44100,
      numberOfAudioChannels: 1,
    })

    audioRecorder.current.startRecording()
    for (let i = 0; i < 4; i++) {
      await wait(3000)

      audioRecorder.current.pauseRecording()
      const audioBlob = await getAudioBlobFromAudioRecorder(audioRecorder.current)
      console.log(audioBlob)

      await downloadFile(audioBlob)
      audioRecorder.current.resumeRecording()

      // const internalRecorder = (audioRecorder.current.getInternalRecorder() as unknown) as InternalRecorder
      // console.log(internalRecorder)
      // mergeLeftRightBuffers(
      //   {
      //     desiredSampRate: 44100,
      //     sampleRate: 44100,
      //     numberOfAudioChannels: 1,
      //     internalInterleavedLength: internalRecorder.recordingLength,
      //     leftBuffers: internalRecorder.leftchannel,
      //     rightBuffers: [],
      //   },
      //   (buffer: BlobPart) => setAudioBlob(new Blob([buffer], { type: 'audio/wav' }))
      // )
      // audioStream.current.getTracks().forEach((track) => track.stop())

      // const base64Encoding = await getBase64EncodingFrom(audioBlob)
      // const musicInfo = await fetchDetectedMusicInfo(base64Encoding)
      // console.log(musicInfo)
      // if (musicInfo.matches.length) break
    }
    audioRecorder.current.stopRecording()
    audioStream.current.getTracks().forEach((track) => track.stop())
  }

  // useEffect(() => {
  //   console.log(audioBlob)
  // }, [audioBlob])

  return (
    <div style={{ backgroundColor: '#123456' }}>
      <h3>Shazam은 주변에서 들리는 곡을 인식합니다.</h3>
      <h4>클릭하여 Shazam하기</h4>

      <button onClick={recordAudioCyclically}>녹음</button>
    </div>
  )
}

export default Recorder
