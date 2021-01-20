import Image from 'next/image'
import router from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import DragDrop from 'src/components/atoms/DragDrop'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import RecorderModal from 'src/components/RecorderModal'
import SearchFailureToast from 'src/components/SearchFailureToast'
import useBoolean from 'src/hooks/useBoolean'
import { HEADER_HEIGHT } from 'src/models/constants'
import styled, { keyframes } from 'styled-components'

const FlexContainerColumn = styled.div`
  min-height: 100vh;
  padding-top: ${HEADER_HEIGHT};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  background: linear-gradient(to bottom, #0bf, #066aff);

  h1,
  h2 {
    color: #fff;
    font-weight: bold;
    text-align: center;
    word-break: keep-all;
  }
`

const H1 = styled.h1`
  font-size: 3rem;
  margin: 1rem;
`

const H2 = styled.h2`
  margin: 1rem;
`

const MaxWidth = styled.div`
  max-width: 350px;
`

const breathingButton = keyframes`
  0%, 100% {
    transform: scale(1,1);
  }
  50% {
    transform: scale(1.1,1.1);
  }
`

const AnimatedImage = styled(Image)`
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.3));
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 2px;
  animation: ${breathingButton} 3s infinite ease-in-out;

  :hover {
    cursor: pointer;
  }
`

const FlexContainer = styled.div`
  display: flex;
`

function HomePage() {
  const [musicInfo, setMusicInfo] = useState<Record<string, any> | null | undefined>()
  const [isRecorderModalOpen, , openRecorderModal, closeRecorderModal] = useBoolean(false)
  const [isSearchFailureToastOpen, , openSearchFailureToast, closeSearchFailureToast] = useBoolean(
    false
  )

  const handleSearchFailure = useCallback(() => {
    closeRecorderModal()
    openSearchFailureToast()
  }, [closeRecorderModal, openSearchFailureToast])

  useEffect(() => {
    if (musicInfo) {
      console.log(musicInfo)
      // const url = getMusicDetailUrlByMusicInfoFromServer(newMusicInfo)
      const url = `/musics/${musicInfo.track.key}`
      router.push(url)
    } else if (musicInfo === null) {
      openSearchFailureToast()
    }
  }, [musicInfo, openSearchFailureToast])

  return (
    <PageTitle title="Icezam - 음악을 검색하고, 음악에 대한 다양한 사람들의 반응을 알아보는 공간">
      <PageLayout>
        <FlexContainerColumn>
          <H1>Icezam은 주변에서 들리는 곡을 인식합니다.</H1>
          <H2>클릭하여 Icezam하기</H2>
          <MaxWidth>
            <AnimatedImage
              src="/icezam-logo.png"
              alt="icezam-logo"
              width={500}
              height={500}
              onClick={openRecorderModal}
            />
          </MaxWidth>
        </FlexContainerColumn>

        {isRecorderModalOpen && (
          <RecorderModal
            isOpen={isRecorderModalOpen}
            onClose={closeRecorderModal}
            onFailure={handleSearchFailure}
            setMusicInfo={setMusicInfo}
          />
        )}

        {isSearchFailureToastOpen && (
          <SearchFailureToast isOpen={isSearchFailureToastOpen} onClose={closeSearchFailureToast} />
        )}

        <DragDrop setMusicInfo={setMusicInfo} />

        <button onClick={openSearchFailureToast}>토스트 열기(디버그)</button>
        <button onClick={closeSearchFailureToast}>토스트 닫기(디버그)</button>

        <FlexContainer>
          <div>
            <h3>앱 다운로드</h3>
            <h2>어디서든 주변에서 나오는 곡이 무슨 곡인지 찾아 드립니다.</h2>
            <p>
              휴대폰 카메라로 코드를 스캔하여 Shazam 앱을 무료로 다운로드해 보세요 iOS, Android 및
              기타 기기에서 사용할 수 있습니다
            </p>
          </div>
        </FlexContainer>
      </PageLayout>
    </PageTitle>
  )
}

export default HomePage
