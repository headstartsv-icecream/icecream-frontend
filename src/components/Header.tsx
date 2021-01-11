import Navigation from './Navigation'
import styled from 'styled-components'

const StyledHeader = styled.header`
  width: 100%;
  height: 5rem;
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255, 0.055);
  backdrop-filter: blur(10px);
`

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
function Header({}: Props) {
  return (
    <StyledHeader>
      <Navigation />
    </StyledHeader>
  )
}

export default Header
