import Head from 'next/head'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
}

function PageTitle({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  )
}

export default PageTitle
