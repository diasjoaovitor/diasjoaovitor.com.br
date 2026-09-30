import type { MetadataRoute } from 'next'

import { getVisiblePosts } from '@/app/helpers/posts'
import { siteUrl } from '@/app/helpers/site'

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = getVisiblePosts()
  const lastModified = posts[0]?.date

  return [
    { url: siteUrl, lastModified },
    { url: `${siteUrl}/blog`, lastModified },
    ...posts.map(({ slug, date }) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: date
    }))
  ]
}

export default sitemap
