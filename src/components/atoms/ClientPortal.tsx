import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
}

function ClientPortal({ children }: Props) {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setContainerElement(document.getElementById('__next'))
  }, [])

  return containerElement ? createPortal(children, containerElement) : null
}

export default ClientPortal
