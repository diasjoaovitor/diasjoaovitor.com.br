import type { Post } from 'content-collections'

import { siteDescription, siteName, siteUrl } from './site'

type TFeedPost = Pick<Post, 'slug' | 'title' | 'summary' | 'date'>

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const buildItem = ({ slug, title, summary, date }: TFeedPost) => {
  const url = `${siteUrl}/blog/${slug}`
  return `<item>
<title>${escapeXml(title)}</title>
<link>${url}</link>
<guid isPermaLink="true">${url}</guid>
<pubDate>${date.toUTCString()}</pubDate>
<description>${escapeXml(summary)}</description>
</item>`
}

export const buildFeed = (posts: TFeedPost[]) => {
  const [latest] = posts
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escapeXml(siteName)}</title>
<link>${siteUrl}/blog</link>
<description>${escapeXml(siteDescription)}</description>
<language>pt-BR</language>
<atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${latest ? `<lastBuildDate>${latest.date.toUTCString()}</lastBuildDate>\n` : ''}${posts.map((post) => buildItem(post)).join('\n')}
</channel>
</rss>
`
}
