import { useEffect, useState } from 'react'
import DragDrop from 'src/components/atoms/DragDrop'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import Recorder from 'src/components/Recorder'
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

function HomePage() {
  const [musicInfo, setMusicInfo] = useState({})
  useEffect(() => {
    console.log(musicInfo)
  }, [musicInfo])

  return (
    <PageTitle title="Icezam - 음악을 검색하고, 음악에 대한 다양한 사람들의 반응을 알아보는 공간">
      <PageLayout>
        <Recorder setMusicInfo={setMusicInfo} />
        <DragDrop setMusicInfo={setMusicInfo} />

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
