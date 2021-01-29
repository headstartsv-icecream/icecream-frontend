import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

function ClientPortal({ children, isOpen, onClose }: Props) {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setContainerElement(document.getElementById('__next') ?? document.getElementById('root'))
  }, [])

  useEffect(() => {
    function closeDrawerWhenEscapeKeyPressed(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (isOpen && onClose) {
          onClose()
        }
      }
    }
    document.addEventListener('keydown', closeDrawerWhenEscapeKeyPressed)
    return () => document.removeEventListener('keydown', closeDrawerWhenEscapeKeyPressed)
  }, [isOpen, onClose])

  return containerElement ? createPortal(children, containerElement) : null
}

export default ClientPortal
