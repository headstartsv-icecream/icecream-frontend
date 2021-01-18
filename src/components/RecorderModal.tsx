import { makeStyles, Theme, createStyles, Modal, Backdrop, Fade, Button } from '@material-ui/core'
import { useEffect, useRef, useState } from 'react'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'
import useMounted from 'src/hooks/useMounted'
import { fetchDetectedMusicInfo, getBase64EncodingFrom, wait } from 'src/utils/commons'
import { mergeLeftRightBuffers } from 'src/utils/recordrtc'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gif = require('../../public/equalizer.gif')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)

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
      return ['너무 많은 검색 시도', '그만 시도 하세요']
  }
}

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
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setMusicInfo: (info: Record<string, unknown>) => void
}

function RecorderModal({ isOpen, setIsOpen, setMusicInfo }: Props) {
  const audioStream = useRef<MediaStream | null>(null)
  const audioRecorder = useRef<RecordRTC | null>(null)

  const [recordingCount, setRecordingCount] = useState(0)
  const isMounted = useMounted()

  const classes = useStyles()

  function closeModal() {
    setIsOpen(false)
  }

  async function recordAudio(minimumRecordingDuration: number) {
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

    audioRecorder.current.startRecording()
    await wait(minimumRecordingDuration)
    audioRecorder.current.stopRecording()

    const audioBlob = await getAudioBlobFromAudioRecorder(audioRecorder.current)
    audioRecorder.current?.reset()
    return await getBase64EncodingFrom(audioBlob)
  }

  useEffect(() => {
    return () => {
      audioStream.current?.getTracks().forEach((track) => track.stop()) // 마이크 비활성화
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (recordingCount < 4) {
        console.log('Recording audio...')
        const base64Encoding = await recordAudio(3500 + 500 * recordingCount)

        let newMusicInfo
        if (isMounted.current) {
          console.log('Searching audio...')
          newMusicInfo = await fetchDetectedMusicInfo(base64Encoding)
        }

        if (isMounted.current) {
          if (newMusicInfo.matches.length) {
            setMusicInfo(newMusicInfo)
          } else if (recordingCount !== 3) {
            console.log("Didn't detect the audio")
            setRecordingCount((prev) => prev + 1)
          } else {
            console.log("Didn't detect the audio")
            setMusicInfo({})
            closeModal()
          }
        }
      }
    })()
    // `isMounted`는 컴포넌트가 해제될 때까지 값이 변하지 않기 때문에 dependancy array에 넣지 않는 것을 권장
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordingCount, setMusicInfo])

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <h1 id="transition-modal-title">Hearing your music...</h1>
          <img src={gif} alt="Searching your music..." />
          <p id="transition-modal-description">react-transition-group animates me.</p>
          <h2>{getSearchingStatusFrom(recordingCount)[0]}</h2>
          <h3>{getSearchingStatusFrom(recordingCount)[1]}</h3>

          <Button variant="contained" color="primary" onClick={closeModal}>
            취소하기
          </Button>
        </div>
      </Fade>
    </Modal>
  )
}

export default RecorderModal
