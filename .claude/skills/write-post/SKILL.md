---
name: write-post
description: Write a complete blog post from its outline, in the author's voice, with verified facts and references, either into the post in content/posts, ready to publish, or into content/references, as the reference the author rewrites the post from. Use when the author asks you to write, draft or fill in a post, or for a reference text to write it themselves. To plan a post, use new-post; to review one, use review-post.
---

This is the one writing skill that writes prose: the author asked for it. Everything else in the project still holds (the author publishes, the other skills only suggest). Talk to the author in pt-BR.

## 1. Pick the mode

Ask which mode the author wants, unless they already said:

- **Post** (default): write into the post file itself, ready to publish once the author fills in the TODOs and reviews it.
- **Reference**: the author will write the post from scratch and wants your text as their main reference. Write it into `content/references/YYYY-MM-DD-<slug>.md` (same name as the post), copying the post's frontmatter so `lang: pt-BR` and the suggested `title` and `summary` come along, and leave the post file with its outline untouched. `content/references` isn't read by any collection, so the file is never served; it's committed and kept after the post is published, as a record of what the post was based on.

Everything below applies to both modes; "the file" is the post file or the reference file.

## 2. Start from the outline

- The post must exist as `content/posts/YYYY-MM-DD-<slug>.md` with an outline the author approved: the headings, the reader, the takeaway and the notes under each heading. If there's no outline yet, follow steps 1 to 3 of the `new-post` skill first.
- Write the whole post in one pass. If the file already has prose the author wrote, keep it as it is and only fill in the sections that are still notes, unless the author asks otherwise.

## 3. Learn the author's voice

Before writing, read the author's texts: the published posts in `content/posts` (`draft: false`) and any source the author points at (an older post, a gist, a talk). Note the person (first person singular), the tone, how formal it is, how long the sentences are and how they address the reader. Without references, write in the first person, didactic and direct, addressing the reader as "você".

## 4. Write

- Replace the notes under each heading with prose that covers everything they ask for, in the order they set. Keep the headings (`##` and `###`, never `#`) unless a change is clearly better, and say so in the summary.
- Write for the reader set in the outline: for a beginner, explain each concept the first time it shows up, in one or two plain sentences, and don't assume what wasn't explained before.
- Standard pt-BR (see the grammar checklist in the `review-post` skill). Technical terms stay in English; identifiers, commands, paths and keys go in `code`. No filler ("basicamente", "simplesmente", "é importante ressaltar que") and no promotional tone.
- Code blocks declare their language and contain only what the reader should type or see. Tables have a header row. Images get a `<!-- TODO: ... -->` describing the screenshot to take and its alt text.

## 5. Verify every fact

- Never write a command, version, option, default or behavior from memory. Check each one in the current official docs (the Context7 MCP for libraries, WebFetch for the docs page), in the project's repository or, for the author's setup, on this machine (read-only commands such as `--version` or reading a config file).
- Add references while writing, following the `cite` skill (GFM footnotes with descriptive labels, sources opened and checked), and resolve every `<!-- cite: ... -->` marker from the outline. If a source contradicts the outline, write what the source says and flag it in the summary.

## 6. Don't invent the author

What only the author knows stays a `<!-- TODO: ... -->` in the exact place it belongs: opinions, experiences, why they chose a tool, anecdotes, screenshots and anything personal. Write the sentence around it so the text still reads when the TODO is filled in, but never make up a reason or an experience.

## 7. Finish

- Keep `draft: true`: publishing is the author's decision. In reference mode, the post file stays as it was. Check that the `summary` still matches the text (up to ~160 characters).
- Run `pnpm exec cspell --no-progress <file>` (fix typos; propose legitimate terms for `.cspell/project-words.txt`), `pnpm exec eslint <file>` and `pnpm exec prettier --check <file>`.
- Report in a short summary: the assumptions you made, the TODOs left, the sources used and anything that differs from the outline. Remind the author to decide whether the post should say it was written with AI help; don't add that note yourself. Then suggest running the `review-post` skill.
