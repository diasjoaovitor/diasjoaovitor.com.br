import type { Post } from 'content-collections'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import sitemap from './sitemap'

const { allPosts } = vi.hoisted(() => ({ allPosts: [] as Partial<Post>[] }))

vi.mock('content-collections', () => ({ allPosts }))

beforeEach(() => {
  vi.stubEnv('NODE_ENV', 'production')
})

afterEach(() => {
  allPosts.length = 0
  vi.unstubAllEnvs()
})

test('lists the home, the blog and the published posts, dated by the latest post', () => {
  allPosts.push(
    { slug: 'older', date: new Date('2026-01-01'), draft: false },
    { slug: 'draft', date: new Date('2026-03-01'), draft: true },
    { slug: 'newer', date: new Date('2026-02-01'), draft: false }
  )
  expect(sitemap()).toEqual([
    {
      url: 'https://diasjoaovitor.com.br',
      lastModified: new Date('2026-02-01')
    },
    {
      url: 'https://diasjoaovitor.com.br/blog',
      lastModified: new Date('2026-02-01')
    },
    {
      url: 'https://diasjoaovitor.com.br/blog/newer',
      lastModified: new Date('2026-02-01')
    },
    {
      url: 'https://diasjoaovitor.com.br/blog/older',
      lastModified: new Date('2026-01-01')
    }
  ])
})

test('lists only the home and the blog, undated, without posts', () => {
  expect(sitemap()).toEqual([
    { url: 'https://diasjoaovitor.com.br', lastModified: undefined },
    { url: 'https://diasjoaovitor.com.br/blog', lastModified: undefined }
  ])
})
