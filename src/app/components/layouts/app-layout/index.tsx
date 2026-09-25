import type { ReactNode } from 'react'

import { Background } from './_components/background'
import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Main } from './_components/main'

export const AppLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />
    <Background />
  </>
)
