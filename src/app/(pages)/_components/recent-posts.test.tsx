import { render, screen, within } from '@testing-library/react'
import type { Post } from 'content-collections'
import { expect, test, vi } from 'vitest'

import { getVisiblePosts } from '@/app/helpers/posts'

import { RecentPosts } from './recent-posts'

vi.mock('@/app/helpers/posts', () => ({ getVisiblePosts: vi.fn() }))

const post = (slug: string) =>
  ({ slug, title: slug, summary: slug, date: new Date('2026-01-01') }) as Post

test('lists only the three most recent posts, in the given order', () => {
  vi.mocked(getVisiblePosts).mockReturnValue(
    ['d', 'c', 'b', 'a'].map((slug) => post(slug))
  )
  render(<RecentPosts />)
  const section = screen.getByRole('region', { name: 'posts recentes' })
  expect(
    within(section)
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)
  ).toEqual(['d', 'c', 'b'])
})

test('renders nothing when there are no posts', () => {
  vi.mocked(getVisiblePosts).mockReturnValue([])
  const { container } = render(<RecentPosts />)
  expect(container.childElementCount).toBe(0)
})
