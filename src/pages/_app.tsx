import { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import 'sanitize.css'
import 'antd/dist/antd.css'

// 이거 추가하니까 TypeError: document.querySelector... 오류 없어졌는데 왜 없어진거지?
if (typeof document === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  global.document = { querySelector: function () {} }
}

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    padding: 0;
    font-size: 16px;
  }
`

// 최대 120자
const description = '지금 들리는 음악을 Icezam에서 검색하고 다양한 사람들의 반응을 알아보세요.'

// 최대 10개
const keywords = '아이스잠, Icezam, 노래, 음악, 음악검색, MusicDetection'

function IcecreamApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default IcecreamApp
