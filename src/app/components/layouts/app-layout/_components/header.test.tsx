import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Header } from './header'

test('brand links home with the name alone as its accessible name', () => {
  render(<Header />)
  const brand = screen.getByRole('link', { name: 'João Vitor' })
  expect(brand.getAttribute('href')).toBe('/')
  expect(brand.textContent).toBe('<João Vitor/>')
})
