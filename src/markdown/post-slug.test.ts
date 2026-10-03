import { expect, test } from 'vitest'

import { getPostSlug } from './post-slug'

const date = new Date('2026-10-03')

test('strips the date prefix from the file name', () => {
  expect(getPostSlug('2026-10-03-react-compiler-na-pratica', date)).toBe(
    'react-compiler-na-pratica'
  )
})

test('rejects a file name without the date prefix', () => {
  expect(() => getPostSlug('react-compiler-na-pratica', date)).toThrow(
    'must start with its date'
  )
})

test('rejects a file name whose date differs from the frontmatter date', () => {
  expect(() =>
    getPostSlug('2026-10-02-react-compiler-na-pratica', date)
  ).toThrow('frontmatter date is 2026-10-03')
})
