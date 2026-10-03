---
name: review-copy
description: Review the text in the code — identifier naming, comments, test descriptions, UI copy and metadata, and the docs — for spelling, grammar, consistency and the project's conventions, and report findings to accept. Use when asked to review naming, comments, wording or copy in a file, a diff or the whole project. For blog posts, use review-post instead.
---

Talk to the user in pt-BR. Report findings and propose exact replacements; apply only the ones the user accepts.

## Scope

Work on what the user names: a path, the current diff (`git diff main...HEAD`), or the whole project. For the whole project, cover `src/`, the configuration files at the root, `.github/`, `.claude/`, `.husky/`, `docs/`, `AGENTS.md` and `README.md`, and skip generated or vendored code (`.next`, `.content-collections`, `node_modules`, `pnpm-lock.yaml`). Components copied from a registry (`src/app/components/ui/shadcn/`, `ui/magicui/`) are only checked for UI copy we added, not for their upstream naming. Read the files before reporting.

The code is in English; the UI copy, metadata and content are in pt-BR. Check each text in its own language.

## Check

1. **Spelling**: run `pnpm spell:check` (or `pnpm exec cspell --no-progress <files>`). Each unknown word is either a typo (propose the fix) or a legitimate term (propose adding it to `.cspell/project-words.txt`).
2. **Naming**:
   - Correct English, including each word of a compound identifier and its grammatical number (`getVisiblePosts` returns a list).
   - The name says what the thing is or does, at the level of the caller: no vague names (`data`, `handle`, `info`, `temp`) where a specific one fits, and no names that lie about the type or the behavior.
   - Consistent patterns across the codebase: `get*` for lookups, `is*`/`has*` for booleans, `use*` only for hooks, `T*` for type aliases (as in `TPostHeadingLevel`), components in PascalCase, files in kebab-case.
   - The same concept has the same name everywhere (e.g. `post` vs `article`, `slug` vs `id`), in code, tests and docs.
3. **Comments**: grammar, and the project rule from `AGENTS.md`: a comment only records why a decision was made, ideally with a reference; flag comments that explain what the code does or how it works, and comments that are stale (the reason no longer applies or the reference is gone).
4. **Test descriptions**: grammar, and whether each `describe`/`it`/`test` reads as a sentence that states the expected behavior (`it('hides drafts outside development')`), consistent in tense and person within a file.
5. **UI copy and metadata (pt-BR)**: grammar and standard pt-BR, tone (direct, informal "você", consistent across pages), the same term for the same thing everywhere (e.g. "post" or "artigo", "rascunho"), accessible names (`aria-label`, alt text) that describe the purpose, and titles and descriptions in metadata.
6. **Docs** (`AGENTS.md`, `README.md`, `docs/`, issue templates): grammar, consistency with the code (paths, script names and file names that still exist), and the Documentation Rules in `AGENTS.md`.

## Report

Group findings by severity, most severe first:

- **Erro**: typos, grammar mistakes, names or comments that are wrong or misleading, docs that contradict the code.
- **Melhoria**: unclear or inconsistent naming, comments that break the project rule, test descriptions that don't state the behavior.
- **Sugestão**: optional wording.

For each finding: `path:line`, the current text, the proposed text and a one-line reason. Mark renames of exported symbols or files, since they touch other files; list where they're used. Skip categories with no findings.

Then ask which findings to apply. Apply renames across every usage (code, tests, docs), then run `pnpm type-check`, `pnpm eslint:check`, `pnpm prettier:check`, `pnpm spell:check` and `pnpm test`.
