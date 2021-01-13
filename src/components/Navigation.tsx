/* eslint-disable no-constant-condition */
import useScrollPosition from '@react-hook/window-scroll'
import Link from 'next/link'
import styled from 'styled-components'
import IcezamLogo from './atoms/IcezamLogo'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import SearchInput from './SearchInput'

const FlexContainerBetween = styled.div<{ isTop: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  transition: color 0.2s cubic-bezier(0.4, 0, 1, 1) 0s,
    background-color 0.2s cubic-bezier(0.4, 0, 1, 1) 0s;

  ${(p) =>
    p.isTop
      ? `a {
          color: #fff;
         }`
      : `background-color: #fff`}
`

const FlexContainer = styled.div`
  margin: 0 1rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 1rem;

  > * {
    width: max-content;
  }
`

const LeftNavigation = styled(FlexContainer)``

function Navigation() {
  const scrollY = useScrollPosition()

  return (
    <nav>
      <FlexContainerBetween isTop={scrollY === 0}>
        <LeftNavigation>
          <IcezamLogo />
          <Link href="myicezam">
            <a href="myicezam">내 라이브러리</a>
          </Link>
          <Link href="charts">
            <a href="charts">차트</a>
          </Link>
        </LeftNavigation>

        <FlexContainer>
          <SearchInput />
          {true ? <LoginButton /> : <LogoutButton />}
        </FlexContainer>
      </FlexContainerBetween>
    </nav>
  )
}

export default Navigation
