import { afterEach, expect, test, vi } from 'vitest'

import PostPage, { generateStaticParams } from './page'

vi.mock('content-collections', () => ({
  allPosts: [
    {
      slug: 'published',
      draft: false
    },
    {
      slug: 'draft',
      draft: true
    }
  ]
}))

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND')
  }
}))

const pageProps = (slug: string) => ({
  params: Promise.resolve({ slug }),
  searchParams: Promise.resolve({})
})

afterEach(() => {
  vi.unstubAllEnvs()
})

test('generates only published posts outside development', () => {
  vi.stubEnv('NODE_ENV', 'production')
  expect(generateStaticParams()).toEqual([{ slug: 'published' }])
})

test('also generates drafts in development', () => {
  vi.stubEnv('NODE_ENV', 'development')
  expect(generateStaticParams()).toEqual([
    { slug: 'published' },
    { slug: 'draft' }
  ])
})

test('returns 404 for a draft outside development and for an unknown slug', async () => {
  vi.stubEnv('NODE_ENV', 'production')
  await expect(PostPage(pageProps('draft'))).rejects.toThrow('NEXT_NOT_FOUND')
  await expect(PostPage(pageProps('unknown'))).rejects.toThrow('NEXT_NOT_FOUND')
})
