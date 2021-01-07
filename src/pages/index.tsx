import { useEffect, useState } from 'react'
import DragDrop from 'src/components/atoms/DragDrop'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import Recorder from 'src/components/Recorder'
import { getBase64EncodingFrom } from 'src/utils/commons'
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

async function getDetectedMusicInfo(body: string) {
  try {
    const response = await fetch('https://shazam.p.rapidapi.com/songs/detect', {
      method: 'POST',
      headers: {
        'content-type': 'text/plain',
        'x-rapidapi-key': process.env.NEXT_PUBLIC_SHAZAM_API_KEY ?? '',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
      body,
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

function HomePage() {
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (file) {
      ;(async () => {
        const base64Encoding = await getBase64EncodingFrom(file)
        console.log(base64Encoding)
      })()
    }
  }, [file])

  async function handleClickMusicDetectionButton() {
    if (file) {
      const base64Encoding = await getBase64EncodingFrom(file)
      const musicInfo = await getDetectedMusicInfo(base64Encoding.slice(37))
      console.log(musicInfo)
    }
  }

  return (
    <PageTitle title="Icecream Music">
      <PageLayout>
        <Recorder />
        <DragDrop file={file} setFile={setFile} />
        <button onClick={handleClickMusicDetectionButton}>확인</button>
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
