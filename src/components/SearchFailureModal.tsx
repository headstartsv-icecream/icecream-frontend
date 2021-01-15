import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import styled, { css, keyframes } from 'styled-components'
import ClientPortal from './atoms/ClientPortal'

const appear = keyframes`
  0% {
    opacity: 0.5;
    transform: translateY(-1rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const disappear = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0); 
  }

  100% {
    opacity: 0;
    transform: translateY(0.5rem);
  }
`

const FixedPosition = styled.div<{ isModalOpen?: boolean }>`
  width: 100%;
  position: fixed;
  bottom: 2rem;
  z-index: 1;
  opacity: ${(p) => (p.isModalOpen ? 1 : 0)};

  display: flex;
  justify-content: center;

  ${(p) =>
    p.isModalOpen === true
      ? css`
          animation: ${appear} 0.2s cubic-bezier(0.36, 0.11, 0.89, 0.32);
        `
      : p.isModalOpen === false
      ? css`
          animation: ${disappear} 0.2s cubic-bezier(0.36, 0.11, 0.89, 0.32);
        `
      : ''};
`

const FlexContainer = styled.div`
  width: 80vw;
  min-width: 250px;
  max-width: 600px;
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

type Props = {
  isOpen: boolean | undefined
  onClose: () => void
}

function SearchFailureModal({ isOpen, onClose }: Props) {
  return (
    <ClientPortal isOpen={isOpen ?? false} onClose={onClose}>
      <FixedPosition isModalOpen={isOpen}>
        <FlexContainer>
          <StyledExclamationCircle />
          <div>
            <h2>일치하는 콘텐츠를 찾을 수 없습니다.</h2>
            <p>컴퓨터에 곡이 또렷하게 들리는지 확인하고 다시 시도하세요.</p>
          </div>
          <StyledCloseOutlined onClick={onClose} />
        </FlexContainer>
      </FixedPosition>
    </ClientPortal>
  )
}

export default SearchFailureModal
