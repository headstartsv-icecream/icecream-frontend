/* eslint-disable jsx-a11y/media-has-caption */

import { useCallback, useEffect, useRef, useState } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'

async function recordMic() {
  /* const chunks = []

  try {
    audioRecorder = (e) => {
      playRecording.appendChild(clipContainer)

      audio.controls = true
      const blob = new Blob(chunks, {
        type: 'audio/ogg codecs=opus',
      })
      chunks = []
      const audioURL = URL.createObjectURL(blob)
      audio.src = audioURL
    }

    audioRecorder = (e) => {
      chunks.push(e.data)
    }
  } catch (err) {
    console.log('The following error occurred: ' + err)
  }

  return 1
  */
}

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function Recorder({}: Props) {
  /* const { status, startRecording, stopRecording, mediaBlobUrl } = useReactaudioRecorder({
    audio: true,
    blobPropertyBag: { type: 'audio/raw' },
  }) */

  const audioChunks = useRef<Blob[]>([])
  const audioRecorder = useRef<MediaRecorder | null>(null)
  const audioStream = useRef<MediaStream | null>(null)
  // const recorder = useRef<RecordRTC | null>(null)

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [recordedData, setRecordedData] = useState<Float32Array[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        /* const response = await detectMusic('base64 encoding')
        console.log(response) */
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  async function startRecording() {
    /* const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/webm;codecs=pcm',
      sampleRate: 44100,
      desiredSampRate: 44100,
      numberOfAudioChannels: 1,
    })
    recorder.startRecording() */
    //
    /* const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    audioRecorder.current = new MediaRecorder(audioStream, { mimeType: 'audio/webm;codecs=pcm' })
    audioRecorder.current.ondataavailable = ({ data }: BlobEvent) => {
      audioChunks.current.push(data)
    }
    audioRecorder.current.onstop = async () => {
      const [chunk] = audioChunks.current
      const blobProperty: BlobPropertyBag = Object.assign({ type: chunk.type })
      const blob = new Blob(audioChunks.current, blobProperty)

      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = async () => {
        console.log(reader.result?.toString())
        const body = await getDetectedMusicInfo(reader.result?.toString().slice(35) ?? '')
        console.log(body)
      }

      // data:audio/webm;codecs=opus;base64,
      // const url = URL.createObjectURL(blob)
      // setStatus('stopped')
      // setMediaBlobUrl(url)
      // onStop(url, blob)
    }
    audioRecorder.current.onerror = () => {
      // setError('NO_RECORDER')
      // setStatus('idle')
    }
    audioRecorder.current.start()

    const audioContext = new window.AudioContext({ sampleRate: 44100 })
    const newAudioInput = audioContext.createMediaStreamSource(audioStream) */
  }

  async function stopRecording() {
    /* if (recorder.current) {
      recorder.current.stopRecording()
      const blob = recorder.current.getBlob()

      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = async () => {
        console.log(reader.result)
        // const body = await getDetectedMusicInfo(reader.result?.toString().slice(35) ?? '')
        // console.log(body)
      }
    } */
    if (audioRecorder.current?.state !== 'inactive') {
      audioRecorder.current?.stop()
      audioStream.current?.getTracks().forEach((track) => track.stop())
      audioChunks.current = []
    }
  }

  return (
    <div>
      <h3>Shazam은 주변에서 들리는 곡을 인식합니다.</h3>
      <h4>클릭하여 Shazam하기</h4>

      <button onClick={startRecording}>녹음</button>
      <button onClick={stopRecording}>정지</button>
    </div>
  )
}

export default Recorder
