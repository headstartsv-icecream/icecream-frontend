/* eslint-disable no-constant-condition */
import Link from 'next/link'
import IcecreamLogo from './atoms/IcecreamLogo'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import SearchInput from './SearchInput'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function Navigation({}: Props) {
  return (
    <nav>
      <IcecreamLogo />
      <Link href="charts">
        <a href="charts">차트</a>
      </Link>
      <Link href="my">
        <a href="my">내 라이브러리</a>
      </Link>
      <SearchInput />
      {true ? <LoginButton /> : <LogoutButton />}
    </nav>
  )
}

export default Navigation
