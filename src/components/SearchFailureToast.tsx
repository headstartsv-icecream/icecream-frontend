import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { memo } from 'react'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import styled, { keyframes } from 'styled-components'
import ClientPortal from './atoms/ClientPortal'

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-1rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const FixedPosition = styled.div`
  width: 80vw;
  min-width: 250px;
  max-width: 550px;

  position: fixed;
  bottom: 2rem;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
`

const FlexContainer = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #48b;
  border-radius: 0.5rem;
  background-color: #fff;
  position: relative;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  animation: ${appear} 0.5s ease-out;

  @media (max-width: ${TABLET_MIN_WIDTH}) {
    div {
      text-align: center;
    }
  }
`

const StyledExclamationCircle = styled(ExclamationCircleFilled)`
  font-size: 5rem;
  color: #08f;
`

const StyledCloseOutlined = styled(CloseOutlined)`
  font-size: 1.5rem;
  color: #888;

  position: absolute;
  top: 1rem;
  right: 1rem;
`

const P = styled.p`
  margin: 0;
`

type Props = {
  isOpen: boolean
  onClose: () => void
}

function SearchFailureToast({ isOpen, onClose }: Props) {
  return (
    <ClientPortal isOpen={isOpen} onClose={onClose}>
      <FixedPosition>
        <FlexContainer>
          <StyledExclamationCircle />
          <div>
            <h2>일치하는 콘텐츠를 찾을 수 없습니다.</h2>
            <P>컴퓨터에 곡이 또렷하게 들리는지 확인하고 다시 시도하세요.</P>
          </div>
          <StyledCloseOutlined onClick={onClose} />
        </FlexContainer>
      </FixedPosition>
    </ClientPortal>
  )
}

export default memo(SearchFailureToast)
