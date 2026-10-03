---
name: cite
description: Find and verify sources for claims in a blog post and add them as GFM footnotes in the project's reference format. Use when the author asks to add a reference, cite a claim, back up a statement or resolve the `<!-- cite: ... -->` markers in a post.
---

Talk to the author in pt-BR. Never add a reference you haven't opened and checked.

## 1. Find the claims

Work on what the author points at: a passage, a claim, or every `<!-- cite: ... -->` marker in the post. If asked to cover the whole post, list the factual claims that lack a source (versions, behavior of a library or API, numbers, dates, history, quotes) and confirm with the author which ones to cite before searching.

## 2. Search, in this order

1. **Official documentation** of the library, framework or tool, through the Context7 MCP (`resolve-library-id`, then `query-docs`), plus the docs page itself so there's a stable URL to link. For Next.js, the guides in `node_modules/next/dist/docs/` match the installed version.
2. **Primary sources**: specifications (WHATWG, W3C, ECMAScript, RFCs), the project's repository (release notes, changelogs, issues, PRs), the author's paper or announcement.
3. **Secondary sources** (articles, talks, books) only when there's no primary one, preferring well-known authors and publications. Never cite a forum answer, an AI-generated page or a content farm.

## 3. Verify

For each candidate, open the URL (WebFetch) and check that:

- it loads and isn't a redirect to something else;
- it actually supports the claim as the post words it: not a weaker, older or different version of it;
- it's current: for a versioned library, it matches the version the post talks about (or the post states the version);
- it's the most stable URL available (a versioned docs page, a tagged release, a permalink to a line in a repository).

If the source contradicts the claim, don't cite it: tell the author what the source says and suggest how to reword the claim.

## 4. Add the footnote

GFM footnotes are the project's reference format (rendered with pt-BR labels by `rehypeFootnoteLabels`, under "Notas de rodapé"):

- In the text, right after the claim and after the punctuation: `...otimiza os componentes automaticamente.[^react-compiler]`
- Use descriptive labels (`[^react-compiler]`), not numbers: GFM numbers them in order of appearance, and named labels survive edits.
- Definitions at the end of the file, in the order they're referenced, in this format:

  ```markdown
  [^react-compiler]: [React Compiler](https://react.dev/learn/react-compiler), documentação do React.

  [^rfc-9110]: [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110), IETF, 2022.

  [^article]: Autora Exemplo, [Título do artigo](https://example.com/post), Publicação, 2025.
  ```

  That is: `[Title](URL)`, then who published it (the project's docs, an organization or the author), then the year when the source is dated. Add the version when the docs are versioned (`documentação do Next.js 16`). Keep the source's original title, in its own language.

- One footnote can back a whole paragraph; don't repeat the same source on every sentence. Reuse the same label when the same source is cited again.
- Remove the `<!-- cite: ... -->` marker once the claim is cited.

Show the author each claim with the proposed source and footnote before writing it into the file, unless they asked you to apply them directly.
