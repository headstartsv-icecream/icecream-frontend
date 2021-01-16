/* eslint-disable no-constant-condition */
import { MenuOutlined } from '@ant-design/icons'
import useScrollPosition from '@react-hook/window-scroll'
import Link from 'next/link'
import { DESKTOP_MIN_WIDTH, TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'
import IcezamLogo from './atoms/IcezamLogo'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import SearchForm from './atoms/SearchForm'
import NavigationDrawer from './NavigationDrawer'
import useBoolean from 'src/hooks/useBoolean'

const FlexContainerBetween = styled.div<{ isTop: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  transition: color 0.2s cubic-bezier(0.4, 0, 1, 1) 0s,
    background-color 0.2s cubic-bezier(0.4, 0, 1, 1) 0s;

  ${(p) =>
    p.isTop
      ? `
      a, span {
        color: #fff;
      }
      `
      : `
      background-color: #fff;
      input {
        background-color: #f4f4f4;
        color: #08f;
        transition: opacity .3s ease-in-out, box-shadow .3s ease-in-out;
        :focus {
          box-shadow: 0 0 2px 2px rgba(0,136,255,.5);
        }
      }
      span {
        color: #08f;
      }
  `}
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

const HamburgerIcon = styled(MenuOutlined)`
  font-size: 1.5rem;
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    display: none;
  }

  :hover {
    cursor: pointer;
  }
`

const LeftNavigation = styled(FlexContainer)`
  @media (max-width: ${DESKTOP_MIN_WIDTH}) {
    > :not(:first-child) {
      display: none;
    }
  }
`

const RightNavigation = styled(FlexContainer)`
  @media (max-width: ${TABLET_MIN_WIDTH}) {
    > :not(:last-child) {
      display: none;
    }
  }
`

function Navigation() {
  const [isDrawerOpen, , openDrawer, closeDrawer] = useBoolean(false)
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

        <RightNavigation>
          <SearchForm />
          {true ? <LoginButton /> : <LogoutButton />}

          <HamburgerIcon onClick={openDrawer} />
        </RightNavigation>
      </FlexContainerBetween>
      <NavigationDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </nav>
  )
}

export default Navigation
