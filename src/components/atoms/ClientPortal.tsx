import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
}

function ClientPortal({ children }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    ref.current = document.getElementById('__next')
  }, [])

  return ref.current ? createPortal(children, ref.current) : null
}

export default ClientPortal
