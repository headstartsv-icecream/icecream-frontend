import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import Recoder from 'src/components/Recoder'
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

function HomePage() {
  return (
    <PageTitle title="Icecream Music">
      <PageLayout>
        <Recoder />
        <FlexContainer>
          <img
            src="https://www.shazam.com/resources/291229600ef1fb473214ef503895c8185827152f/home/rec-devices.jpg"
            alt="app-preview"
          />
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
