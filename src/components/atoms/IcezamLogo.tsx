import Image from 'next/image'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function IcezamLogo({}: Props) {
  return (
    <Link href="/">
      <a href="/">
        <Image src="/icezam-logo.png" alt="icezam-logo" width={50} height={50} />
      </a>
    </Link>
  )
}

export default IcezamLogo
