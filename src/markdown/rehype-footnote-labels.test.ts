import type { Element, Root } from 'hast'
import { expect, test } from 'vitest'

import { rehypeFootnoteLabels } from './rehype-footnote-labels'

const element = (
  tagName: string,
  properties: Element['properties'],
  children: Element['children'] = []
): Element => ({ type: 'element', tagName, properties, children })

test('translates the footnote heading and back reference labels', () => {
  const heading = element('h2', { id: 'footnote-label' }, [
    { type: 'text', value: 'Footnotes' }
  ])
  const backref = element('a', {
    dataFootnoteBackref: '',
    ariaLabel: 'Back to reference 1-2'
  })
  const tree: Root = {
    type: 'root',
    children: [element('section', {}, [heading, element('li', {}, [backref])])]
  }

  rehypeFootnoteLabels()(tree)

  expect(heading.children).toEqual([{ type: 'text', value: 'Notas de rodapé' }])
  expect(backref.properties.ariaLabel).toBe('Voltar à referência 1-2')
})

test('leaves aria labels outside footnote back references untouched', () => {
  const link = element('a', { ariaLabel: 'Back to reference 1' })

  rehypeFootnoteLabels()({ type: 'root', children: [link] })

  expect(link.properties.ariaLabel).toBe('Back to reference 1')
})
