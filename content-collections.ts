import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMarkdown } from '@content-collections/markdown'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

import { rehypeFootnoteLabels } from './src/markdown/rehype-footnote-labels'

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    draft: z.boolean().default(false),
    content: z.string()
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeFootnoteLabels,
        [
          rehypePrettyCode,
          {
            theme: {
              light: 'github-light-default',
              dark: 'github-dark-default'
            }
          }
        ]
      ]
    })
    return {
      ...document,
      slug: document._meta.path,
      html
    }
  }
})

const legalPages = defineCollection({
  name: 'legalPages',
  directory: 'content/legal',
  include: '*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    updatedAt: z.coerce.date(),
    content: z.string()
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeFootnoteLabels]
    })
    return {
      ...document,
      slug: document._meta.path,
      html
    }
  }
})

export default defineConfig({
  content: [posts, legalPages]
})
