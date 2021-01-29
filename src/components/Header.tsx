import Navigation from './Navigation'
import styled from 'styled-components'
import { HEADER_HEIGHT } from 'src/models/constants'

const StyledHeader = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT};

  background-color: rgba(255, 255, 255, 0.055);
  //backdrop-filter: blur(10px);

  position: fixed;
  top: 0;
  z-index: 1;
`

function Header() {
  return (
    <StyledHeader>
      <Navigation />
    </StyledHeader>
  )
}

export default Header
