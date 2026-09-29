import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { PostDate } from './post-date'

test('renders the date in pt-BR without shifting the day', () => {
  render(<PostDate date={new Date('2026-09-27')} />)
  expect(screen.getByText('27 de setembro de 2026')).toHaveProperty(
    'dateTime',
    '2026-09-27'
  )
})
