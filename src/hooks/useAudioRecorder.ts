import { useCallback, useEffect, useRef, useState } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import useMounted from 'src/hooks/useMounted'
import { fetchDetectedMusicInfo, getBase64EncodingFrom, wait } from 'src/utils/commons'
import { mergeLeftRightBuffers } from 'src/utils/recordrtc'

function getAudioBlobFromAudioRecorder(audioRecorder: RecordRTC) {
  return new Promise<Blob>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internalRecorder = audioRecorder.getInternalRecorder() as any
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

type Options = {
  onFailure: () => void
  setMusicInfo: (info: Record<string, unknown> | null) => void
}

function useAudioRecorder({ onFailure, setMusicInfo }: Options) {
  const audioStream = useRef<MediaStream | null>(null)
  const audioRecorder = useRef<RecordRTC | null>(null)
  const [recordingCount, setRecordingCount] = useState(0)

  const isMounted = useMounted()

  const recordAndSearchAudio = useCallback(async () => {
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

      if (!isMounted.current) {
        audioStream.current.getTracks().forEach((track) => track.stop()) // 마이크 비활성화
      }
    }

    if (isMounted.current) {
      console.log('Recording audio...')
      audioRecorder.current.startRecording()
      await wait(3500 + 500 * recordingCount)
      audioRecorder.current.stopRecording()

      if (isMounted.current) {
        const audioBlob = await getAudioBlobFromAudioRecorder(audioRecorder.current)
        audioRecorder.current?.reset()
        const base64Encoding = await getBase64EncodingFrom(audioBlob)

        if (isMounted.current) {
          console.log('Searching audio...')
          const newMusicInfo = await fetchDetectedMusicInfo(base64Encoding)

          if (isMounted.current) {
            if (newMusicInfo.matches.length) {
              setMusicInfo(newMusicInfo)
            } else if (recordingCount < 3) {
              console.log("Didn't detect the audio")
              setRecordingCount((prev) => prev + 1)
            } else {
              setMusicInfo(null)
              onFailure()
            }
          }
        }
      }
    }
  }, [isMounted, onFailure, recordingCount, setMusicInfo])

  useEffect(() => {
    return () => {
      audioStream.current?.getTracks().forEach((track) => track.stop()) // 마이크 비활성화
    }
  }, [])

  useEffect(() => {
    if (recordingCount < 4) {
      recordAndSearchAudio()
    }
  }, [recordAndSearchAudio, recordingCount])

  return recordingCount
}

export default useAudioRecorder
