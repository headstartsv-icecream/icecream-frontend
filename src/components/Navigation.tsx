/* eslint-disable no-constant-condition */
import Link from 'next/link'
import IcezamLogo from './atoms/IcezamLogo'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import SearchInput from './SearchInput'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function Navigation({}: Props) {
  return (
    <nav>
      <IcezamLogo />
      <Link href="myicezam">
        <a href="myicezam">내 라이브러리</a>
      </Link>
      <Link href="charts">
        <a href="charts">차트</a>
      </Link>

      <SearchInput />
      {true ? <LoginButton /> : <LogoutButton />}
    </nav>
  )
}

export default Navigation
