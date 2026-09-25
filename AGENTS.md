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

- `src/app` holds frontend-exclusive content only — there's no top-level `src/components` or `src/lib`, that shared code lives under `src/app` instead.
- Anything that isn't frontend-exclusive (e.g. `src/tests`, and any future non-frontend folder) lives directly under `src`, as a sibling of `app`, not nested inside it.
- Routes are grouped under `src/app/(pages)` (a route group, so it doesn't affect the URL).
- Shared frontend code lives in `src/app/components`, React hooks in `src/app/hooks` (e.g. `useIsHydrated`) and other helpers in `src/app/lib` (created with the first helper), matching the shadcn `hooks`/`lib`/`utils` aliases in `components.json`. There are no `index.ts` barrels: import each module directly from its file through the `@/` alias (e.g. `@/app/components/ui/shadcn/button`). Barrels caused circular imports, gave two import paths for the same module and made Vite/Vitest load every re-exported module.
- `src/app/components` groups components by role: `ui/` for visual building blocks (shadcn ones under `ui/shadcn/`, Magic UI ones under `ui/magicui/`, our own under `ui/custom/`, e.g. `TerminalCommand`), `providers/` for context providers without UI of their own (e.g. `ThemeProvider`) and `layouts/` for page shells (e.g. `AppLayout`).
- A layout lives in its own folder (`layouts/<name>/index.tsx`), with the parts only it uses in a private `_components/` folder next to it. Code outside the layout imports only `layouts/<name>`, never its `_components/`.
- `favicon.ico` stays directly in `src/app/`, not nested in a route group.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`, `babel-plugin-react-compiler` devDependency).

### Linting & formatting

- ESLint uses native flat config (`eslint.config.mjs`), extending the `core-web-vitals`/`typescript` configs from `eslint-config-next`, plus `eslint-plugin-unicorn`, `eslint-plugin-simple-import-sort`, `eslint-plugin-tailwindcss`, `eslint-plugin-promise`, `eslint-plugin-prefer-arrow-functions`, `eslint-config-prettier`, and `@eslint/json`/`@eslint/markdown` for JSON/Markdown files. `eslint-plugin-tailwindcss` rule docs are in `node_modules/eslint-plugin-tailwindcss/docs/rules/` — check there before overriding a Tailwind lint rule.
- Use `pnpm eslint:check` / `pnpm eslint:fix` and `pnpm prettier:check` / `pnpm prettier:fix`.
- Prettier style: single quotes, no semicolons, no trailing commas (`.prettierrc`).
- Base indentation/whitespace rules (2 spaces, LF, trim trailing whitespace, final newline) are enforced editor-side via `.editorconfig`.

### Code comments

- Comments only record **why** a decision was made, ideally with a reference (docs link, issue number, upstream bug). Never write comments that explain what the code does or how it works.
- Default to no comment. Add one only for a non-obvious choice that someone might "fix" by mistake.
- Write comments in English.

### Git hooks (husky)

- `pre-commit`: runs `lint-staged` (`lint-staged.config.js`) — prettier + eslint + `vitest related --passWithNoTests` scoped per staged file type, invoked directly via `pnpm exec` rather than through `package.json` scripts.
- `commit-msg`: auto-prepends the emoji prefix from the Commit Rules below based on the leading word (e.g. `feat: ...` → `✨ feat: ...`), then runs `commitlint` (`commitlint-config-emoji-convention`). You can type the plain word and let the hook add the emoji.
- `pre-push`: runs `pnpm type-check` (`next typegen && tsc --noEmit`, so the route type helpers like `LayoutProps` exist without a prior `next dev`/`next build`) and `pnpm test:e2e` (full Playwright suite).

### Testing

- Unit tests: **Vitest** (`vitest.config.mts`), `jsdom` environment, native Vite `resolve.tsconfigPaths` (no `vite-tsconfig-paths` plugin needed). Only picks up `src/**/*.test.{ts,tsx}`. Component tests use `@testing-library/react` / `@testing-library/dom`.
- E2E tests: **Playwright** (`playwright.config.ts`), tests live in `src/tests/e2e`, single `chromium` project, `webServer` auto-starts `pnpm dev` against `http://localhost:3000`.
- Scripts: `pnpm test` (unit, run once) / `pnpm test:watch` (unit, watch mode) / `pnpm test:e2e` (e2e) / `pnpm test:e2e:ui` (e2e, Playwright UI mode).
- CI (`.github/workflows/ci.yml`, triggered on `pull_request`) runs, in order: `commitlint` over the PR's commit range, `pnpm type-check`, `pnpm eslint:check`, `pnpm prettier:check`, `pnpm test`, then installs Chromium (`pnpm exec playwright install --with-deps chromium`) and runs `pnpm test:e2e`.

### Styling & UI

- Tailwind CSS v4 (`@tailwindcss/postcss` only — no `autoprefixer`/`postcss`, v4 uses Lightning CSS internally). Global styles live in `src/app/styles/globals.css`, which also imports `tw-animate-css` and the shadcn base stylesheet (`shadcn/tailwind.css`).
- Theming is class-based: `next-themes` (`ThemeProvider` in `src/app/components/providers/theme-provider.tsx`, wrapping the root layout) toggles `.dark` on `<html>`, and Tailwind's `dark:` variant is bound to that class (`@custom-variant dark (&:where(.dark, .dark *))`). Light tokens live in `:root` and dark tokens in `.dark`, each with its own `color-scheme`. The first visit follows the system preference; a chosen theme persists in `localStorage` (`theme`). Never style against `prefers-color-scheme` directly.
- **shadcn/ui** (`components.json`, style `base-nova`, base color `neutral`, icon library `lucide`): `Button` and `Card` are in place so far (`src/app/components/ui/shadcn/{button,card}.tsx`). Add components with `pnpm shadcn:add <name>` (wraps `pnpm dlx shadcn@latest add`) — aliases and target paths are in `components.json`.
- **Magic UI** (`@magicui` registry in `components.json`): `Marquee` and `TypingAnimation` so far (`src/app/components/ui/magicui/`). Add components with `pnpm shadcn:add @magicui/<name> --path src/app/components/ui/magicui`, then pin any new dependency with `pnpm add -E` (the CLI installs with `^`), import `cn` from the `cn` package and fix what `pnpm eslint:fix` can't. Magic UI animations don't handle `prefers-reduced-motion`, so the caller must (e.g. `motion-reduce:` variants).
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
