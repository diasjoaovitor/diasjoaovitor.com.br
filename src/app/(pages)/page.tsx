import type { Metadata } from 'next'

import { Hero } from './_components/hero'
import { SkillMarquee } from './_components/skill-marquee'

const title = 'João Vitor — Desenvolvedor Fullstack'
const description =
  'Anotações técnicas sobre desenvolvimento fullstack, escritas por João Vitor.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'diasjoaovitor.com.br',
    locale: 'pt_BR',
    type: 'website'
  }
}

const HomePage = () => (
  <div className="flex flex-1 flex-col justify-center gap-16 py-12">
    <Hero />
    <SkillMarquee />
  </div>
)

export default HomePage
