import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

import { PostHeader } from './post-header'

afterEach(cleanup)

test('renders the date in pt-BR without shifting the day', () => {
  render(<PostHeader title="Post" date={new Date('2026-09-27')} />)
  expect(screen.getByText('27 de setembro de 2026')).toHaveProperty(
    'dateTime',
    '2026-09-27'
  )
})
