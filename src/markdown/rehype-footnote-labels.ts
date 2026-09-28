import type { Element, Root, RootContent } from 'hast'

const backLabelPrefix = 'Back to reference '

const translate = (element: Element) => {
  if (element.properties.id === 'footnote-label') {
    element.children = [{ type: 'text', value: 'Notas de rodapé' }]
  }
  const { ariaLabel } = element.properties
  if (
    typeof ariaLabel === 'string' &&
    element.properties.dataFootnoteBackref !== undefined &&
    ariaLabel.startsWith(backLabelPrefix)
  ) {
    element.properties.ariaLabel = `Voltar à referência ${ariaLabel.slice(backLabelPrefix.length)}`
  }
}

const walk = (node: Root | RootContent) => {
  if (node.type === 'element') translate(node)
  if ('children' in node) for (const child of node.children) walk(child)
}

// `compileMarkdown` doesn't expose the `remark-rehype` options (`footnoteLabel`,
// `footnoteBackLabel`), so the English defaults are translated after the fact
export const rehypeFootnoteLabels = () => walk
