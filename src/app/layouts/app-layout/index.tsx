import { ReactNode } from 'react'

import { Background, Footer, Header, Main } from './_components'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <Background />
    </>
  )
}
