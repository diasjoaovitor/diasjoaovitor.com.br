import { allLegalPages } from 'content-collections'
import type { Metadata } from 'next'

import { openGraphDefaults } from '@/app/helpers/site'

export const getLegalPage = (slug: string) => {
  const page = allLegalPages.find((page) => page.slug === slug)
  if (!page) throw new Error(`Missing legal page: content/legal/${slug}.md`)
  return page
}

export const getLegalPageMetadata = (slug: string): Metadata => {
  const { title, summary } = getLegalPage(slug)
  return {
    title,
    description: summary,
    openGraph: {
      ...openGraphDefaults,
      title,
      description: summary,
      url: `/${slug}`,
      type: 'website'
    }
  }
}
