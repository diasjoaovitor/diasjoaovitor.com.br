import type { Metadata } from 'next'

import {
  openGraphDefaults,
  siteDescription,
  siteTitle
} from '@/app/helpers/site'

import { Hero } from './_components/hero'
import { RecentPosts } from './_components/recent-posts'
import { SkillMarquee } from './_components/skill-marquee'

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    ...openGraphDefaults,
    title: siteTitle,
    description: siteDescription,
    url: '/',
    type: 'website'
  }
}

const HomePage = () => (
  <div className="flex flex-1 flex-col justify-center gap-16 py-12">
    <Hero />
    <SkillMarquee />
    <RecentPosts />
  </div>
)

export default HomePage
