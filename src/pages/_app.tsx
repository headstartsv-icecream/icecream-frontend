import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { pageview } from 'src/utils/google-analytics'
import { createGlobalStyle } from 'styled-components'
import 'sanitize.css'
import 'antd/dist/antd.css'
import { ApolloProvider } from '@apollo/client'
import { client } from 'src/apollo/client'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    font-size: 16px;
  }
`

// 최대 120자
const description = '지금 들리는 음악을 Icezam에서 검색하고 다양한 사람들의 반응을 알아보세요.'

// 최대 10개
const keywords = '아이스잠, Icezam, 노래, 음악, 음악검색, MusicDetection'

function IcecreamApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Google Analytics로 정보 보내기
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const handleRouteChange = (url: string) => pageview(url)
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/icezam-logo.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default IcecreamApp
