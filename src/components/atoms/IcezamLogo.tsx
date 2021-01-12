import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import styled from 'styled-components'

const MaxWidth = styled.div`
  width: 100%;
  min-width: 3rem;
  max-width: 5rem;

  transition: transform 0.2s cubic-bezier(0.4, 0, 1, 1) 0s;

  &:hover {
    transform: scale(1.04);
  }
`

function IcezamLogo() {
  return (
    <Link href="/">
      <a href="/">
        <MaxWidth>
          <Image src="/icezam-logo.png" alt="icezam-logo" width={500} height={500} />
        </MaxWidth>
      </a>
    </Link>
  )
}

export default memo(IcezamLogo)
