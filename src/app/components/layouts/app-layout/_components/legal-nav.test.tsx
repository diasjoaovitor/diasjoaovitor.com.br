import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { expect, test, vi } from 'vitest'

import { LegalNav } from './legal-nav'

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }))

const currentLinks = () =>
  screen
    .getAllByRole('link')
    .filter((link) => link.getAttribute('aria-current') === 'page')
    .map((link) => link.textContent)

test.each([
  ['/termos-de-uso', ['Termos de Uso']],
  ['/politica-de-privacidade', ['Política de Privacidade']],
  ['/', []],
  ['/termos-de-uso-antigos', []]
])('on %s marks %j as the current page', (pathname, expected) => {
  vi.mocked(usePathname).mockReturnValue(pathname)
  render(<LegalNav />)
  expect(currentLinks()).toEqual(expected)
})
