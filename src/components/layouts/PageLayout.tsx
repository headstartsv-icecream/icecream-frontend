import { ReactNode } from 'react'
import styled from 'styled-components'
import Footer from '../Footer'
import Header from '../Header'

const HeaderPadding = styled.div`
  padding-top: 5rem;
`

type Props = {
  children: ReactNode
}

function PageLayout({ children }: Props) {
  return (
    <>
      <Header />
      <HeaderPadding />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default PageLayout
