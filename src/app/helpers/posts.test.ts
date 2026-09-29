import { afterEach, expect, test, vi } from 'vitest'

import { getVisiblePosts } from './posts'

vi.mock('content-collections', () => ({
  allPosts: [
    { slug: 'older', date: new Date('2026-01-01'), draft: false },
    { slug: 'draft', date: new Date('2026-03-01'), draft: true },
    { slug: 'newer', date: new Date('2026-02-01'), draft: false }
  ]
}))

const visibleSlugs = () => getVisiblePosts().map(({ slug }) => slug)

afterEach(() => {
  vi.unstubAllEnvs()
})

test('hides drafts outside development, newest first', () => {
  vi.stubEnv('NODE_ENV', 'production')
  expect(visibleSlugs()).toEqual(['newer', 'older'])
})

test('shows drafts in development, newest first', () => {
  vi.stubEnv('NODE_ENV', 'development')
  expect(visibleSlugs()).toEqual(['draft', 'newer', 'older'])
})
