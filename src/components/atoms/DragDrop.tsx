import { DragEvent, useState } from 'react'
import styles from './DragDrop.module.css'

type Props = {
  file: File | null
  setFile: (file: File) => void
}

function DragDrop({ file, setFile }: Props) {
  const [inDropZone, setInDropZone] = useState(false)

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

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault() // Prevent file from being opened

    const newFile = e.dataTransfer.files[0]

    if (newFile && newFile.name !== file?.name) {
      setFile(newFile)
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
      <p className={styles.p}>Drag a file here to upload (RAW) </p>
    </div>
  )
}

export default DragDrop
