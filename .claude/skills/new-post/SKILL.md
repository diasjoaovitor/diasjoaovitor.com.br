---
name: new-post
description: Start a new blog post in content/posts and shape its structure with the author — topic, audience, outline, summary — without writing the prose for them. Use when the author wants to start, plan, outline or restructure a post.
---

The author writes the post. Your job is to help them decide what to say and in what order, not to write it. Never write paragraphs of prose unless the author explicitly asks for a specific passage, and even then mark it as a suggestion for them to rewrite in their own voice. Talk to the author in pt-BR.

## 1. Understand the post

Ask one question at a time, each with a recommended answer, and stop asking once the answers are enough to outline:

- **Topic and angle**: what the post is about and what's specific about the author's take (a problem they solved, a decision they made, a comparison they ran).
- **Reader**: who it's for and what they already know (this sets how much to explain).
- **Takeaway**: the one thing the reader should leave with. If it can't be said in a sentence, the topic is still too broad: help narrow it.
- **Evidence**: what the post relies on (the author's code, measurements, docs, specs). Note the claims that will need references (see the `cite` skill).

## 2. Create the file

- Slug: short, lowercase, hyphen-separated, in pt-BR without accents (e.g. `react-compiler-na-pratica`). It's the URL (`/blog/<slug>`), so don't change it after publishing.
- Create `content/posts/<slug>.md` with this frontmatter (fields from `content-collections.ts`):

  ```yaml
  ---
  title: '<title>'
  summary: '<one or two sentences, up to ~160 characters: it's the meta description, the Open Graph description and the RSS item>'
  date: <today, YYYY-MM-DD>
  author: 'João Vitor'
  lang: pt-BR
  draft: true
  ---
  ```

- `lang: pt-BR` is read by LTeX+ in VS Code (the workspace default is `en-US`); the content schema ignores it.
- `draft: true` keeps the post out of production while it's being written; `next dev` still serves it at `/blog/<slug>`.

## 3. Outline

Write the outline into the file, below the frontmatter, as headings and bullet notes the author will replace with prose:

- `##` for sections and `###` for subsections, never `#` (the page already renders the title as `h1`).
- Under each heading, bullets with what the section must cover, the claim it makes and its evidence, plus where a code block, table or image fits.
- Mark claims that need a source with `<!-- cite: ... -->` so the `cite` skill can pick them up.
- A typical shape: an introduction stating the problem and the takeaway, the body in the order the reader needs it, and a conclusion that answers the introduction. Adapt it to the post instead of forcing it.

Then review the outline with the author: does each section serve the takeaway, is anything missing or in the wrong order, is anything there that belongs in another post.

## 4. While the author writes

When asked, help with a specific section: suggest an example, a clearer order for the arguments, a table to replace a dense paragraph, or a transition. Keep suggestions short and point at the exact place in the file. Once a draft is done, suggest running the `review-post` skill.
