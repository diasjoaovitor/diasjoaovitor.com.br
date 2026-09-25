import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, beforeAll, expect, test, vi } from 'vitest'

import { skills } from './_components/skills'
import Home from './page'

// jsdom has no IntersectionObserver, which TypingAnimation needs through motion's useInView
beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  )
})

// Testing Library only auto-cleans up when Vitest globals are enabled
afterEach(cleanup)

test('renders the role as the only h1', () => {
  render(<Home />)
  const headings = screen.getAllByRole('heading', { level: 1 })
  expect(headings).toHaveLength(1)
  expect(headings[0]).toHaveProperty(
    'textContent',
    expect.stringContaining('Desenvolvedor Fullstack')
  )
  expect(screen.getByText('João Vitor')).toBeDefined()
})

test('lists every skill once for assistive tech', () => {
  render(<Home />)
  const section = screen.getByRole('region', { name: 'skills' })
  const items = within(section).getAllByRole('listitem')
  expect(items.map((item) => item.textContent)).toEqual(
    skills.map(({ label }) => label)
  )
})
