import { expect, test } from 'vitest'

import { buildFeed } from './feed'

const posts = [
  {
    slug: 'newer',
    title: 'Tipos & <genéricos>',
    summary: 'Um "resumo" com aspas',
    date: new Date('2026-02-01')
  },
  {
    slug: 'older',
    title: 'Primeiro post',
    summary: 'Outro resumo',
    date: new Date('2026-01-01')
  }
]

test('lists the posts in the given order with absolute links', () => {
  const feed = buildFeed(posts)
  const links = feed
    .matchAll(/<item>[\s\S]*?<link>(.*?)<\/link>/g)
    .map(([, link]) => link)
    .toArray()
  expect(links).toEqual([
    'https://diasjoaovitor.com.br/blog/newer',
    'https://diasjoaovitor.com.br/blog/older'
  ])
  expect(feed).toContain(
    '<guid isPermaLink="true">https://diasjoaovitor.com.br/blog/newer</guid>'
  )
  expect(feed).toContain('<pubDate>Sun, 01 Feb 2026 00:00:00 GMT</pubDate>')
})

test('escapes XML special characters in titles and summaries', () => {
  const feed = buildFeed(posts)
  expect(feed).toContain('<title>Tipos &amp; &lt;genéricos&gt;</title>')
  expect(feed).toContain(
    '<description>Um &quot;resumo&quot; com aspas</description>'
  )
})

test('dates the channel by the latest post', () => {
  expect(buildFeed(posts)).toContain(
    '<lastBuildDate>Sun, 01 Feb 2026 00:00:00 GMT</lastBuildDate>'
  )
})

test('builds an empty channel without posts', () => {
  const feed = buildFeed([])
  expect(feed).not.toContain('<item>')
  expect(feed).not.toContain('<lastBuildDate>')
})
