import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function IcecreamLogo({}: Props) {
  return (
    <Link href="/">
      <a href="/">
        <img src="/icecream-logo.png" alt="icecream-logo" />
      </a>
    </Link>
  )
}

export default IcecreamLogo
