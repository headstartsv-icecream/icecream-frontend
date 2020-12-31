import { ReactNode } from 'react'
import Footer from '../Footer'
import Header from '../Header'

type Props = {
  children: ReactNode
}

function PageLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default PageLayout
