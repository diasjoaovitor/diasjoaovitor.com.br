import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { expect, test, vi } from 'vitest'

import { Nav } from './nav'

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }))

const renderAt = (pathname: string) => {
  vi.mocked(usePathname).mockReturnValue(pathname)
  render(<Nav />)
}

const currentLinks = () =>
  screen
    .getAllByRole('link')
    .filter((link) => link.getAttribute('aria-current') === 'page')
    .map((link) => link.textContent)

test.each([
  ['/', ['olá']],
  ['/blog', ['blog']],
  ['/blog/some-post', ['blog']],
  ['/blogger', []]
])('on %s marks %j as the current page', (pathname, expected) => {
  renderAt(pathname)
  expect(currentLinks()).toEqual(expected)
})
