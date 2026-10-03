<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Conventions

### Package manager

- Use **pnpm** only (not npm/yarn).
- Versions are pinned exact (no `^`/`~`) only for `dependencies` and `devDependencies` in `package.json`, no exceptions there. Install new deps with `pnpm add -E <pkg>` (or `pnpm add -D -E <pkg>` for dev deps) — never hand-edit version strings.
- The exact-version rule does not apply to MCP servers (`.mcp.json`) or `package.json` scripts, which may use `@latest` (e.g. `pnpm dlx shadcn@latest`, `pnpm dlx @playwright/mcp@latest`). They must still run through pnpm, never `npx`.
- Node version is pinned in `.nvmrc` (`lts/krypton`) for local use and in `engines.node` (`24.x`) in `package.json` for Vercel, which ignores `.nvmrc`. Keep both on the same major.
- On Vercel, the `ENABLE_EXPERIMENTAL_COREPACK=1` environment variable (Production and Preview) makes the build use the exact pnpm version from `packageManager`; without it Vercel picks pnpm from the lockfile version.
- `@/*` resolves to `src/*` (`tsconfig.json`).

### Project structure

- `src/app` holds frontend-exclusive content only — there's no top-level `src/components` or `src/helpers`, that shared code lives under `src/app` instead.
- Anything that isn't frontend-exclusive (e.g. `src/tests`, and any future non-frontend folder) lives directly under `src`, as a sibling of `app`, not nested inside it.
- Exception: blog content (Markdown with YAML frontmatter) lives in `content/` at the repository root (posts in `content/posts`, legal pages in `content/legal`), outside `src`, because it's data rather than code.
- Routes are grouped under `src/app/(pages)` (a route group, so it doesn't affect the URL).
- Shared frontend code lives in `src/app/components`, React hooks in `src/app/hooks` (e.g. `useIsHydrated`) and other helpers in `src/app/helpers` (e.g. `getVisiblePosts`). The `lib` alias in `components.json` still points to `src/app/lib`, which doesn't exist: if the shadcn CLI ever creates something there, keep it in `lib` or move it to `helpers` case by case. There are no `index.ts` barrels: import each module directly from its file through the `@/` alias (e.g. `@/app/components/ui/shadcn/button`). Barrels caused circular imports, gave two import paths for the same module and made Vite/Vitest load every re-exported module.
- `src/app/components` groups components by role: `ui/` for visual building blocks (shadcn ones under `ui/shadcn/`, Magic UI ones under `ui/magicui/`, our own under `ui/custom/`, e.g. `TerminalCommand`), `blocks/` for composed pieces reused across pages, grouped by domain (e.g. `blocks/post/` with `PostList` and `PostListItem`, shared by the blog listing and the home page); a block that belongs to no domain stays directly in `blocks/` (e.g. `MarkdownContent` and `FormattedDate`, shared by the posts and the legal pages), `providers/` for context providers without UI of their own (e.g. `ThemeProvider`) and `layouts/` for page shells (e.g. `AppLayout`).
- A layout lives in its own folder (`layouts/<name>/index.tsx`), with the parts only it uses in a private `_components/` folder next to it. Code outside the layout imports only `layouts/<name>`, never its `_components/`.
- `favicon.ico` stays directly in `src/app/`, not nested in a route group.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`, `babel-plugin-react-compiler` devDependency).

### Blog content

- The blog uses **Content Collections** (`@content-collections/core`, `@content-collections/next`, `@content-collections/markdown`), not `@next/mdx`. Collections are defined in `content-collections.ts` at the repository root, with `zod` schemas. Posts are compiled to HTML with `compileMarkdown` in the collection `transform`.
- Posts are plain Markdown (`.md`), not MDX: none needed JSX, and MDX can't be linted by `@eslint/markdown` (see #28). If a post ever needs a React component, going back to MDX is a deliberate decision, not a quick fix.
- Use the `content` key in `defineConfig` and declare `content` explicitly in the schema: the `collections` key and the implicit `content` property are deprecated (https://content-collections.dev/docs/deprecations/implicit-content-property).
- `withContentCollections` must stay the outermost wrapper in `next.config.ts`. It generates `.content-collections/` (git-, ESLint- and Prettier-ignored) on `next dev`, `next build` and `next typegen` (so `pnpm type-check` too), imported through the `content-collections` alias in `tsconfig.json`.
- Frontmatter fields: `title`, `summary`, `date` (`YYYY-MM-DD`, coerced to a `Date`), `author` and `draft` (defaults to `false`). Posts and legal pages also set `lang: pt-BR`, read only by LTeX+ in VS Code (see Linting & formatting); the schema doesn't declare it and drops it, so don't remove it as unused.
- References in posts are GFM footnotes with descriptive labels (`[^react-compiler]`, not numbers), placed right after the claim and its punctuation, and defined at the end of the file as `[Title](URL), publisher, year` (the version when the docs are versioned). There's no `references` frontmatter field.
- Writing a post goes through the `new-post` (file and outline), `cite` (references) and `review-post` (full review, including fact-checking) skills in `.claude/skills/`. They suggest; the author writes and accepts changes.
- `compileMarkdown` runs `remark-gfm` (tables, task lists, footnotes) and `rehype-pretty-code` with `shiki` (`github-light-default`/`github-dark-default`, which pass WCAG AA contrast unlike `github-light`/`github-dark`). Its dual-theme colors are bound to `.dark` in `globals.css`, not to `prefers-color-scheme` as in its docs. The transform also adds `slug` (the file name) and `html`.
- `compileMarkdown` doesn't expose the `remark-rehype` options, so `rehypeFootnoteLabels` (`src/markdown/rehype-footnote-labels.ts`, outside `src/app` because it runs at build time) translates the English footnote labels (`Footnotes`, `Back to reference N`) that screen readers announce into pt-BR.
- Posts are served at `/blog/[slug]` (`src/app/(pages)/blog/[slug]/page.tsx`), statically generated with `dynamicParams = false`. Drafts are only served by `next dev`, for previewing, on the post page, in the `/blog` listing (newest first) and in the home page's recent posts (the latest 3, hidden when there are none); that rule lives in `getVisiblePosts` (`src/app/helpers/posts.ts`), shared by the three pages; `content/posts/markdown-fixture.md` is a draft that exercises every Markdown element. The compiled HTML is rendered by `MarkdownContent` (`src/app/components/blocks/markdown-content.tsx`, shared with the legal pages) with `@tailwindcss/typography` (`prose`). Its colors come from the `prose-tokens` utility in `globals.css`, which maps the `--tw-prose-*` variables to the shadcn tokens, so there's no `prose-invert`.
- The Terms of Use (`/termos-de-uso`) and the Privacy Policy (`/politica-de-privacidade`) are Markdown in `content/legal` (`legalPages` collection, frontmatter `title`, `summary` and `updatedAt`, compiled with `remark-gfm` and `rehypeFootnoteLabels`, without `rehype-pretty-code`), each with its own route under `src/app/(pages)/(legal)`, rendered by `LegalPage` (`_components/legal-page.tsx`) with metadata from `getLegalPageMetadata` (`src/app/helpers/legal-pages.ts`). The file name is the slug and the URL. `Footer` links both. Update the Privacy Policy (and `updatedAt`) whenever the site starts handling data in a new way (a new third party, cookie, analytics or `localStorage` key).
- Page titles use the root layout's `title.template` (`%s — João Vitor`); the home page, in the same segment as the root layout, keeps its full title. Each post sets its own `generateMetadata` (title, summary and an Open Graph `article`).
- The canonical base URL comes from `SITE_URL` (server-only, defaults to `https://diasjoaovitor.com.br`) through `siteUrl` in `src/app/helpers/site.ts`, used by `metadataBase`, the sitemap, `robots.txt` and the feed. Site-wide values (name, title, description, Open Graph image) live there too.
- Every page that sets `openGraph` spreads `openGraphDefaults` (`src/app/helpers/site.ts`): Next.js merges `openGraph` shallowly, so a page's `openGraph` would drop the parent's `siteName`, `locale` and the file-based image. The image is generated at build time by `src/app/opengraph-image.tsx` (`ImageResponse`, hex colors because it can't read the CSS tokens).
- Metadata routes live directly in `src/app`, not in `(pages)`: `sitemap.ts` (`/`, `/blog`, the visible posts and the legal pages), `robots.ts`, `opengraph-image.tsx` and the RSS 2.0 feed at `/feed.xml` (`feed.xml/route.ts`, `force-static`, built by `buildFeed` in `src/app/helpers/feed.ts` with each post's summary only). The root layout links the feed through `alternates.types`.
- `esbuild` (used by `@content-collections/core`) is listed as `false` in `allowBuilds` (`pnpm-workspace.yaml`): its binary comes from the platform optional dependency, so the install script isn't needed.

### Linting & formatting

- ESLint uses native flat config (`eslint.config.mjs`), extending the `core-web-vitals`/`typescript` configs from `eslint-config-next`, plus `eslint-plugin-unicorn`, `eslint-plugin-simple-import-sort`, `eslint-plugin-tailwindcss`, `eslint-plugin-promise`, `eslint-plugin-prefer-arrow-functions`, `eslint-config-prettier`, and `@eslint/json`/`@eslint/markdown` for JSON/Markdown files (blog posts included). Markdown files use `frontmatter: 'yaml'`, so the frontmatter of posts and issue templates isn't parsed as Markdown. `eslint-plugin-tailwindcss` rule docs are in `node_modules/eslint-plugin-tailwindcss/docs/rules/` — check there before overriding a Tailwind lint rule.
- Use `pnpm eslint:check` / `pnpm eslint:fix` and `pnpm prettier:check` / `pnpm prettier:fix`.
- **cspell** (`cspell.json`, `pnpm spell:check`) checks the spelling of every file in the repository (identifiers, comments, strings, docs and content) against the `en` and `pt_BR` dictionaries, both in every file because the code is in English and the UI copy and content in pt-BR. It runs in `lint-staged` and in CI. Fix typos; add legitimate terms to `.cspell/project-words.txt` (one per line), not to `cspell.json`. GitHub GraphQL node IDs (e.g. Giscus' `repoId`) are ignored by a pattern in `cspell.json`.
- **LTeX+** (`ltex-plus.vscode-ltex-plus`, recommended in `.vscode/extensions.json`) checks grammar in the editor with LanguageTool, in Markdown and in JS/TS comments. `ltex.language` can't be set per language in VS Code (its scope is `resource`), so the workspace default is `en-US` and pt-BR Markdown sets `lang: pt-BR` in its frontmatter. Its dictionary is the same `.cspell/project-words.txt`. LanguageTool isn't run in CI: too many false positives on technical text for the cost of a Java server.
- The `review-copy` skill reviews the text in the code (naming, comments, test descriptions, UI copy, docs); use it on a diff before opening a pull request.
- Prettier style: single quotes, no semicolons, no trailing commas (`.prettierrc`).
- Base indentation/whitespace rules (2 spaces, LF, trim trailing whitespace, final newline) are enforced editor-side via `.editorconfig`.

### Code comments

- Comments only record **why** a decision was made, ideally with a reference (docs link, issue number, upstream bug). Never write comments that explain what the code does or how it works.
- Default to no comment. Add one only for a non-obvious choice that someone might "fix" by mistake.
- Write comments in English.

### Git hooks (husky)

- `pre-commit`: runs `lint-staged` (`lint-staged.config.js`) — prettier + eslint + `vitest related --passWithNoTests` scoped per staged file type, plus cspell on every staged file, invoked directly via `pnpm exec` rather than through `package.json` scripts.
- `commit-msg`: auto-prepends the emoji prefix from the Commit Rules below based on the leading word (e.g. `feat: ...` → `✨ feat: ...`), then runs `commitlint` (`commitlint-config-emoji-convention`). You can type the plain word and let the hook add the emoji.
- `pre-push`: runs `pnpm type-check` (`next typegen && tsc --noEmit`, so the route type helpers like `LayoutProps` exist without a prior `next dev`/`next build`) and `pnpm test:e2e` (full Playwright suite).

### Testing

- Unit tests: **Vitest** (`vitest.config.mts`), `jsdom` environment, native Vite `resolve.tsconfigPaths`. Only picks up `src/**/*.test.{ts,tsx}`. Component tests use `@testing-library/react` / `@testing-library/dom`. `vitest.setup.ts` (`setupFiles`) runs Testing Library's `cleanup` after every test, so test files don't repeat `afterEach(cleanup)`.
- E2E tests: **Playwright** (`playwright.config.ts`), tests live in `src/tests/e2e`, single `chromium` project, `webServer` auto-starts `pnpm dev` against `http://localhost:3000`. Failure artifacts go to `test-results/` (git- and ESLint-ignored). There are no global retries: a known flaky test gets `test.describe.configure({ retries })` in its own `describe`, with a comment linking the issue that tracks it (e.g. the first-paint theme test, #30).
- Only test logic we wrote (filtering, lookups, mappings, transforms). Don't test library or framework behavior (e.g. a component that only passes props or HTML through, zod defaults, `Link` routing), and drop a test whose main cost is a mock needed only to render. Prefer a unit test; add an e2e test only for what a unit test can't cover.
- Older issues may ask for tests that break the rule above (e.g. unit tests for `PostContent` in #10). Skip them without asking, and list them as dropped in the closing comment.
- Scripts: `pnpm test` (unit, run once) / `pnpm test:watch` (unit, watch mode) / `pnpm test:e2e` (e2e) / `pnpm test:e2e:ui` (e2e, Playwright UI mode).
- CI (`.github/workflows/ci.yml`, triggered on `pull_request`) runs, in order: `commitlint` over the PR's commit range, `pnpm type-check`, `pnpm eslint:check`, `pnpm prettier:check`, `pnpm spell:check`, `pnpm test`, then installs Chromium (`pnpm exec playwright install --with-deps chromium`) and runs `pnpm test:e2e`.

### Styling & UI

- Tailwind CSS v4 (`@tailwindcss/postcss` only — no `autoprefixer`/`postcss`, v4 uses Lightning CSS internally). Global styles live in `src/app/styles/globals.css`, which also imports `tw-animate-css` and the shadcn base stylesheet (`shadcn/tailwind.css`).
- Theming is class-based: `next-themes` (`ThemeProvider` in `src/app/components/providers/theme-provider.tsx`, wrapping the root layout) toggles `.dark` on `<html>`, and Tailwind's `dark:` variant is bound to that class (`@custom-variant dark (&:where(.dark, .dark *))`). Light tokens live in `:root` and dark tokens in `.dark`, each with its own `color-scheme`. The first visit follows the system preference; a chosen theme persists in `localStorage` (`theme`). Never style against `prefers-color-scheme` directly.
- Don't retint the default colors: keep the shadcn tokens in `globals.css` and Tailwind's palette as they come, and pick an existing palette color instead of a custom shade (e.g. `teal-500`, not a tinted `oklch(...)`). Where CSS variables can't be read (a canvas, `ImageResponse`), copy the palette value and name it in a comment.
- Decorative backgrounds are per page, not in `AppLayout`: the home page has the animated `FlickeringGrid` (`src/app/(pages)/_components/background.tsx`) and the blog pages a static `teal-500` radial gradient (`src/app/(pages)/blog/layout.tsx`), kept at 5% in light mode so `muted-foreground` stays at WCAG AA over it. The legal pages keep the plain background.
- **shadcn/ui** (`components.json`, style `base-nova`, base color `neutral`, icon library `lucide`): `Button` and `Card` are in place so far (`src/app/components/ui/shadcn/{button,card}.tsx`). Add components with `pnpm shadcn:add <name>` (wraps `pnpm dlx shadcn@latest add`) — aliases and target paths are in `components.json`.
- **Magic UI** (`@magicui` registry in `components.json`): `Marquee`, `TypingAnimation` and `FlickeringGrid` so far (`src/app/components/ui/magicui/`). Add components with `pnpm shadcn:add @magicui/<name> --path src/app/components/ui/magicui`, then pin any new dependency with `pnpm add -E` (the CLI installs with `^`), import `cn` from the `cn` package and fix what `pnpm eslint:fix` can't. Magic UI animations don't handle `prefers-reduced-motion`, so the caller must (e.g. `motion-reduce:` variants).
- The layout shell (`Header`, `Main`, `Footer`) puts the `px-4` gutter on the outer element and `mx-auto max-w-*` on the inner one, so the content reaches the full max width (`max-w-3xl` in `Main`, `max-w-4xl` in the header and footer) and the gutter only shows on narrower screens.
- Links that need to look like a `Button` (e.g. external CTAs) must stay plain `<a>`/`Link` elements styled with the exported `buttonVariants(...)` helper, not `Button` itself — Base UI's `Button` enforces button semantics (`role="button"`, keyboard handling) and its own docs say not to render links through it.
- Supporting libs: `@base-ui/react` (headless primitives), `class-variance-authority` for variant styling, `cn` for the `cn()` class-merging helper (imported directly from the `cn` package, as the shadcn components do; there is no `lib/utils.ts` re-export, see https://ui.shadcn.com/docs/changelog/2026-09-cn), `lucide-react` for icons. Before wiring up a Base UI primitive, check its docs in `node_modules/@base-ui/react/docs/react/` (`components/`, `utils/`, `handbook/`) for its semantics/keyboard behavior — component APIs there may differ from other headless UI kits.

## Development Workflow

The end-to-end flow (planning with `/grill-me`, issues, branches, commits, pull requests and closing) is described in [`docs/development-workflow.md`](./docs/development-workflow.md). Follow it for any issue.

## Branch Rules

Work for an issue is committed on a new branch, never directly on `main`. Branch names follow `<scope>/<title>#<issue>`, or `<scope>(<target>)/<title>#<issue>` when the work is very specific:

- `<scope>` is one of the semantic prefixes from the Commit Rules below, without the emoji (`feat`, `fix`, `docs`, `chore`, ...).
- `(<target>)` is optional: the page, component or other specific area the work touches (e.g. `home`, `card`).
- `<title>` is a short, lowercase, hyphen-separated summary in English.
- `#<issue>` is the number of the associated issue.

Examples: `feat/home-page#3`, `fix(card)/focus-ring#7`. Parentheses and `#` are special characters in shells, so quote the branch name in commands (e.g. `git switch -c 'fix(card)/focus-ring#7'`).

## Issue Rules

Before closing an issue, tick every completed checklist item (`- [x]`) in its body, e.g. with `gh issue edit <number> --body-file <file>`. Don't close an issue that still has unchecked items unless they were dropped or moved, and say so in the closing comment.

## Documentation Rules

`AGENTS.md` and `README.md` record only project conventions: what to do, where things live and how to handle a given case. Answers to the user's one-off questions (e.g. "why don't we use X?") stay in the conversation and are not written into them. Keep a "why" only when it prevents a likely mistaken "fix".

## Task Rules

Never start working on a task on your own, even when asked to move on to the next one or in auto/agentic mode. First present a summary of the plan (the issue, branch name, steps, files touched and any open decisions) and wait for explicit approval before creating the branch, installing dependencies or editing code. Read-only investigation (issues, docs, code) needs no approval.

## Commit Rules

Never run `git commit` on your own, even in auto/agentic mode. Only propose a commit message when the user asks for one, and create the commit only after explicit approval of that message.

Commit messages must be in English and follow this format:

- Use the following semantic prefixes: `🎉 init, ✨ feat, 🐛 fix, 📚 docs, 💎 style, 📦 refactor, 🚀 perf, 🚨 test, 🛠 build, ⚙️ ci, ♻️ chore, 🗑 revert`
- The message must be in the imperative mood and in lowercase.
- Write the commit body.
- Reference an associated issue by number, if it exists, using the format `Issue: #<number>`.

Example:

```text
✨ feat: add product page

Add the new product page for the product listing with the following features:
- Create a new product
- Update a product
- Delete a product

Issue: #1
```
