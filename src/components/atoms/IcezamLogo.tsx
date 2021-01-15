import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { HEADER_HEIGHT } from 'src/models/constants'
import styled from 'styled-components'

const MaxWidth = styled.div`
  min-width: 2rem;
  max-width: ${HEADER_HEIGHT};
  max-height: ${HEADER_HEIGHT};

  transition: transform 0.2s cubic-bezier(0.4, 0, 1, 1) 0s;

  &:hover {
    transform: scale(1.04);
  }
`

function IcezamLogo() {
  return (
    <MaxWidth>
      <Link href="/">
        <a href="/">
          <Image src="/icezam-logo.png" alt="icezam-logo" width={500} height={500} />
        </a>
      </Link>
    </MaxWidth>
  )
}

export default memo(IcezamLogo)
