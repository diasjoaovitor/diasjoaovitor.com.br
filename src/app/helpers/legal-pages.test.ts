import { expect, test, vi } from 'vitest'

import { getLegalPage, getLegalPageMetadata } from './legal-pages'

vi.mock('content-collections', () => ({
  allLegalPages: [
    {
      slug: 'termos-de-uso',
      title: 'Termos de Uso',
      summary: 'Condições de uso.'
    }
  ]
}))

test('finds a legal page by its slug', () => {
  expect(getLegalPage('termos-de-uso').title).toBe('Termos de Uso')
})

test('fails the build when a legal page is missing', () => {
  expect(() => getLegalPage('missing')).toThrow('content/legal/missing.md')
})

test('builds the metadata from the page frontmatter', () => {
  expect(getLegalPageMetadata('termos-de-uso')).toMatchObject({
    title: 'Termos de Uso',
    description: 'Condições de uso.',
    openGraph: {
      title: 'Termos de Uso',
      description: 'Condições de uso.',
      url: '/termos-de-uso'
    }
  })
})
