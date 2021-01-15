import { CloseOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import ClientPortal from './atoms/ClientPortal'
import IcezamLogo from './atoms/IcezamLogo'

const AbsolutePosition = styled.div<{ doesDrawerOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  z-index: 1;

  overflow-y: auto;
  background-color: #111;

  ${(p) => (p.doesDrawerOpen ? 'transform: translate(0, 0);' : 'transform: translate(101%, 0);')}
  transition: transform 0.3s cubic-bezier(0.4, 0.2, 0, 1);

  a,
  div {
    color: white;
    font-size: 1.2rem;
  }

  a:hover {
    text-decoration: underline;
  }
`

const FlexContainerBetween = styled.div`
  margin: 0 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const StyledCloseOutlined = styled(CloseOutlined)`
  font-size: 1.5rem;
`

const FlexContainerColumn = styled.ul`
  margin: 3rem 0;
  display: flex;
  flex-flow: column nowrap;
  gap: 2rem;

  list-style-type: none;
`

type Props = {
  closeDrawer: () => void
  doesDrawerOpen: boolean
}

function NavigationDrawer({ closeDrawer, doesDrawerOpen }: Props) {
  const previousScrollY = useRef<number>()

  useLayoutEffect(() => {
    if (doesDrawerOpen) {
      previousScrollY.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${previousScrollY.current}px`
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      if (previousScrollY.current) {
        window.scrollTo(0, previousScrollY.current)
      }
    }
  }, [doesDrawerOpen, previousScrollY])

  return (
    <ClientPortal>
      <AbsolutePosition doesDrawerOpen={doesDrawerOpen}>
        <FlexContainerBetween>
          <div onClick={closeDrawer} onKeyDown={closeDrawer} role="button" tabIndex={0}>
            <IcezamLogo />
          </div>
          <StyledCloseOutlined onClick={closeDrawer} />
        </FlexContainerBetween>
        <FlexContainerColumn>
          <li>
            <Link href="myicezam">
              <a href="myicezam">내 라이브러리</a>
            </Link>
          </li>
          <li>
            <Link href="charts">
              <a href="charts">차트</a>
            </Link>
          </li>
        </FlexContainerColumn>
      </AbsolutePosition>
    </ClientPortal>
  )
}

export default NavigationDrawer
