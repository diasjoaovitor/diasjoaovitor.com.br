---
name: review-post
description: Review a blog post in content/posts end to end — spelling, grammar, clarity, structure, fact-checking, missing or broken references, accessibility and frontmatter — and report findings for the author to accept. Use when the author asks to review, proofread, fact-check or check a post before publishing.
---

The text is the author's. Report findings and propose exact replacements; apply only the ones the author accepts, and keep their voice: fix what is wrong or unclear, don't rewrite what is merely different from how you'd say it. Talk to the author in pt-BR.

## 1. Read the whole post first

Read the file from start to end, including the frontmatter, before reporting anything, so findings about structure and consistency take the whole text into account.

## 2. Check

1. **Spelling**: run `pnpm exec cspell --no-progress <file>`. For each unknown word, say whether it's a typo (propose the fix) or a legitimate term (propose adding it to `.cspell/project-words.txt`, one word per line, also read by LTeX+).
2. **Grammar and standard pt-BR**: agreement, crase, regência, verb tenses, punctuation (commas between subject and verb, around explanatory clauses), the current spelling agreement, colloquialisms that don't fit (e.g. "a nível de", "onde" for something that isn't a place). Technical terms in English stay in English and in `code` when they are identifiers.
3. **Clarity and style**: sentences too long to follow, ambiguous pronouns, jargon the reader set in the outline wouldn't know, filler ("basicamente", "simplesmente", "é importante ressaltar que"), repeated words close together, inconsistent terms for the same thing.
4. **Structure**: does the introduction state the problem and the takeaway, does each section serve it, does the order work for the reader, does the conclusion answer the introduction. Headings start at `##`, are descriptive and don't skip levels.
5. **Fact-checking**: list every factual claim (versions, behavior of a library or API, numbers, dates, history, quotes) and check it against a current source (Context7 for libraries, the docs in `node_modules/next/dist/docs/` for Next.js, WebSearch/WebFetch otherwise). Flag what is wrong, outdated (a deprecated API, an older version's behavior) or only true under conditions the text doesn't state. Code blocks count: check that APIs, imports and options exist in the version the post uses.
6. **References**: claims that need a source and have none (propose one, following the `cite` skill), footnotes whose source doesn't support the claim, and links that don't load (open each URL with WebFetch). Footnotes follow the format in the `cite` skill.
7. **Accessibility**: every image has meaningful alt text (or empty alt if decorative), every code block declares its language, link text makes sense out of context (no "clique aqui"), tables have a header row.
8. **Frontmatter**: valid fields (`title`, `summary`, `date`, `author`, `lang: pt-BR`, `draft`), a `summary` of up to ~160 characters that stands on its own (it's the meta description, the Open Graph description and the RSS item), and a `date` that is the publication date. Before publishing, remind the author to set `draft: false`.

## 3. Report

Group findings by severity, most severe first:

- **Erro**: wrong facts, broken links, grammar and spelling mistakes, invalid frontmatter.
- **Melhoria**: clarity, structure, missing references, accessibility.
- **Sugestão**: optional style points.

For each finding: the location (`content/posts/YYYY-MM-DD-<slug>.md:<line>`), the current text, the proposed text and a one-line reason (with the source URL for fact-checking findings). Skip categories with no findings instead of saying they're fine.

Then ask which findings to apply. After applying, run `pnpm exec cspell --no-progress <file>`, `pnpm exec eslint <file>` and `pnpm exec prettier --check <file>`.
