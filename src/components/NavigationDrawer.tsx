import Link from 'next/link'
import styled from 'styled-components'
import ClientPortal from './atoms/ClientPortal'
import IcezamLogo from './atoms/IcezamLogo'

const AbsolutePosition = styled.div<{ doesDrawerOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  z-index: 1;

  background-color: #888;
  overflow-y: auto;

  ${(p) => (p.doesDrawerOpen ? 'transform: translate(0, 0);' : 'transform: translate(101%, 0);')}
  transition: transform 0.3s cubic-bezier(0.4, 0.2, 0, 1);
`

const FlexContainerBetween = styled.div`
  margin: 0 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const FlexContainerColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

type Props = {
  closeDrawer: () => void
  doesDrawerOpen: boolean
}

function NavigationDrawer({ closeDrawer, doesDrawerOpen }: Props) {
  return (
    <ClientPortal>
      <AbsolutePosition doesDrawerOpen={doesDrawerOpen}>
        <FlexContainerBetween>
          <div onClick={closeDrawer} onKeyDown={closeDrawer} role="button" tabIndex={0}>
            <IcezamLogo />
          </div>
          <div onClick={closeDrawer} onKeyDown={closeDrawer} role="button" tabIndex={0}>
            X
          </div>
        </FlexContainerBetween>
        <FlexContainerColumn>
          <Link href="myicezam">
            <a href="myicezam">내 라이브러리</a>
          </Link>
          <Link href="charts">
            <a href="charts">차트</a>
          </Link>
        </FlexContainerColumn>
      </AbsolutePosition>
    </ClientPortal>
  )
}

export default NavigationDrawer
