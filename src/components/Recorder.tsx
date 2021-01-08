/* eslint-disable jsx-a11y/media-has-caption */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import { getBase64EncodingFrom } from 'src/utils/commons'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function Recorder({}: Props) {
  const audioRecorder = useRef<MediaRecorder | null>(null)
  const audioStream = useRef<MediaStream | null>(null)
  // const recorder = useRef<RecordRTC | null>(null)

  // const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  // const [recordedData, setRecordedData] = useState<Float32Array[]>([])

  // const [gumStream, setGumStrem] = useState()

  async function startRecording() {
    // StackOverflow: https://stackoverflow.com/questions/59180979/get-16-bit-output-audio-using-audiocontext
    /* console.log('recordButton clicked')

    const audioContext = new AudioContext({ sampleRate: 44100 })

    const constraints = {
      audio: true,
      video: false,
    }

    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true , video: false,
    })

    console.log('getUserMedia() success, stream created, initializing Recorder.js ...')
    
    gumStream = audioStream
    
    input = audioContext.createMediaStreamSource(stream)
    
    rec = new Recorder(input, { numChannels: 1 })
    // start the recording process
    rec.record()
    console.log('Recording started') */
    // RecordRTC
    /* const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/webm;codecs=pcm',
      sampleRate: 44100,
      desiredSampRate: 44100,
      numberOfAudioChannels: 1,
    })
    recorder.startRecording() */

    // const audioContext = new window.AudioContext({ sampleRate: 44100 })
    // const newAudioInput = audioContext.createMediaStreamSource(audioStream)
    console.log('startRecording')
    audioStream.current = await window.navigator.mediaDevices.getUserMedia({ audio: true })
    audioRecorder.current = new MediaRecorder(audioStream.current)
    audioRecorder.current.ondataavailable = ({ data }: BlobEvent) => {
      setObjectURL((window.URL ?? window.webkitURL).createObjectURL(new Blob([data])))
    }
    audioRecorder.current.onerror = (e: MediaRecorderErrorEvent) => {
      console.error('audioRecoder onError', e)
    }
    audioRecorder.current.start()
  }

  const [objectURL, setObjectURL] = useState('')

  async function stopRecording() {
    console.log('stopRecording')
    if (audioRecorder.current && audioStream.current) {
      if (audioRecorder.current.state !== 'inactive') {
        audioRecorder.current.stop()
        audioStream.current.getTracks().forEach((track) => track.stop())
      }
    }
  }

  /* const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: { type: 'application/octet-stream' },
  }) */

  useEffect(() => {
    console.log(objectURL)
    // 여기까지 이해함
    // console.log(window.navigator.mediaDevices.getUserMedia({ audio: true }))
  }, [objectURL])

  return (
    <div>
      <h3>Shazam은 주변에서 들리는 곡을 인식합니다.</h3>
      <h4>클릭하여 Shazam하기</h4>

      <button onClick={startRecording}>녹음</button>
      <button onClick={stopRecording}>정지</button>
      <audio src={objectURL} controls />
    </div>
  )
}

export default Recorder
