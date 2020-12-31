import IcecreamLogo from './atoms/IcecreamLogo'
import Navigation from './Navigation'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function Header({}: Props) {
  return (
    <header>
      <IcecreamLogo />
      <Navigation />
    </header>
  )
}

export default Header
