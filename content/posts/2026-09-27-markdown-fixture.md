---
title: 'Markdown fixture'
summary: 'Every Markdown element the blog renders, to check the pipeline and the prose styles.'
date: 2026-09-27
author: 'João Vitor'
draft: true
---

A paragraph with **bold**, _italic_, ~~strikethrough~~, `inline code` and a [link](https://example.com).

## Heading 2

### Heading 3

#### Heading 4

- Unordered item
- Another item
  - Nested item

1. Ordered item
2. Another item

- [x] Done task
- [ ] Pending task

> A blockquote with a second sentence to check how the text wraps inside it.

| Language   | Typing  | Year |
| ---------- | ------- | ---: |
| TypeScript | Static  | 2012 |
| Python     | Dynamic | 1991 |

```ts
type Post = { title: string; draft: boolean }

export const published = (posts: Post[]) => posts.filter((post) => !post.draft)
```

```bash
pnpm add -D -E remark-gfm
```

```text
Plain text without a language.
```

---

An autolink: https://example.com and a footnote.[^1]

[^1]: The footnote text.
