import { DragEvent, useState } from 'react'
import { fetchDetectedMusicInfo, getBase64EncodingFrom } from 'src/utils/commons'
import styles from './DragDrop.module.css'

type Props = {
  setMusicInfo: (info: Record<string, unknown>) => void
}

function DragDrop({ setMusicInfo }: Props) {
  const [inDropZone, setInDropZone] = useState(false)
  const [fileName, setFileName] = useState('')

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    setInDropZone(true)
    e.dataTransfer.dropEffect = 'copy'
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault() // Prevent file from being opened
  }

  function handleDragLeave() {
    setInDropZone(false)
  }

  async function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault() // Prevent file from being opened

    const newFile = e.dataTransfer.files[0]

    if (newFile && newFile.name !== fileName) {
      setFileName(newFile.name)
      const base64Encoding = await getBase64EncodingFrom(newFile)

      console.log('Searching audio blob...')
      const newMusicInfo = await fetchDetectedMusicInfo(base64Encoding)
      setMusicInfo(newMusicInfo)
    }

    setInDropZone(false)
  }

  return (
    <div
      className={inDropZone ? styles.insideDragDropZone : styles.dragDropZone}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className={styles.p}>또는 파일을 여기로 드래그하여 Icezam하기</p>
      <h5>44.1kHz, 1 Channel, Signed 16-bit PCM, Little endian</h5>
    </div>
  )
}

export default DragDrop
