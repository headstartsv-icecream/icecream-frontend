import { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import 'sanitize.css'
import 'antd/dist/antd.css'

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    padding: 0;
    font-size: 16px;
  }
`

function IcecreamApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, minimal-ui" />
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
