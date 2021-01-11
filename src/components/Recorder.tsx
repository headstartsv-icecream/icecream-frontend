import { useRef } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import { mergeLeftRightBuffers } from 'src/utils/recordrtc'

// Temporary Type
type InternalRecorder = {
  recordingLength: number
  leftchannel: Float32Array[]
}

type Props = {
  setFile: (file: File) => void
}

function Recorder({ setFile }: Props) {
  const audioStream = useRef<MediaStream | null>(null)
  const audioRecorder = useRef<RecordRTC | null>(null)

  async function startRecording() {
    audioStream.current = await window.navigator.mediaDevices.getUserMedia({ audio: true })
    // audioRecorder.current = new RecordRTC(audioStream.current, {
    //   type: 'audio',
    //   recorderType: StereoAudioRecorder,
    //   disableLogs: true,
    //   sampleRate: 44100,
    //   desiredSampRate: 44100,
    //   numberOfAudioChannels: 1,
    // })
    // audioRecorder.current.startRecording()
  }

  async function stopRecording() {
    if (audioRecorder.current && audioStream.current) {
      const internalRecorder = (audioRecorder.current.getInternalRecorder() as unknown) as InternalRecorder

      mergeLeftRightBuffers(
        {
          desiredSampRate: 44100,
          sampleRate: 44100,
          numberOfAudioChannels: 1,
          internalInterleavedLength: internalRecorder.recordingLength,
          leftBuffers: internalRecorder.leftchannel,
          rightBuffers: [],
        },
        (buffer: BlobPart) => {
          const blob = new Blob([buffer], {
            type: 'audio/wav',
          })
          setFile(blob as File)
        }
      )

      audioStream.current.getTracks().forEach((track) => track.stop())
      console.log('stopRecording')
    }
  }

  return (
    <div style={{ backgroundColor: '#123456' }}>
      <h3>Shazam은 주변에서 들리는 곡을 인식합니다.</h3>
      <h4>클릭하여 Shazam하기</h4>

      <button onClick={startRecording}>녹음</button>
      <button onClick={stopRecording}>정지</button>
    </div>
  )
}

export default Recorder
