import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function Navigation({}: Props) {
  return (
    <nav>
      <Link href="projects">
        <a href="projects">Projects</a>
      </Link>
      <Link href="about">
        <a href="about">About</a>
      </Link>
    </nav>
  )
}

export default Navigation
