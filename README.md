# diasjoaovitor.com.br

Technical notes on fullstack development, written by João Vitor. Built with [Next.js](https://nextjs.org) (App Router), React, TypeScript and Tailwind CSS.

## Getting Started

Install the dependencies and start the development server (Node version in `.nvmrc`, package manager: pnpm):

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

| Script                                      | What it does                                            |
| ------------------------------------------- | ------------------------------------------------------- |
| `pnpm dev`                                  | Start the development server                            |
| `pnpm build`                                | Create the production build                             |
| `pnpm start`                                | Serve the production build                              |
| `pnpm type-check`                           | Generate route types and type-check with `tsc --noEmit` |
| `pnpm eslint:check` / `pnpm eslint:fix`     | Lint (and auto-fix) with ESLint                         |
| `pnpm prettier:check` / `pnpm prettier:fix` | Check (and rewrite) formatting                          |
| `pnpm test` / `pnpm test:watch`             | Run the Vitest unit tests                               |
| `pnpm test:e2e` / `pnpm test:e2e:ui`        | Run the Playwright end-to-end tests                     |
| `pnpm shadcn:add <name>`                    | Add a shadcn/ui component                               |

## Project conventions

The full conventions live in [`AGENTS.md`](./AGENTS.md), and the step-by-step flow from planning to merge is in [`docs/development-workflow.md`](./docs/development-workflow.md); the highlights are below.

### Tooling

- **Package manager:** pnpm only. Versions in `dependencies` and `devDependencies` are pinned exact (install with `pnpm add -E <pkg>`).
- **Node:** version pinned in `.nvmrc` (`lts/krypton`) and, for Vercel, in `engines.node` (`24.x`) in `package.json`.
- **React Compiler:** enabled via `reactCompiler: true` in `next.config.ts`.
- **Path alias:** `@/*` resolves to `src/*`.

### Project structure

- `src/app` holds frontend-exclusive code only. Routes live in the `src/app/(pages)` route group (which does not affect the URL), shared components live in `src/app/components` and future hooks/utils in `src/app/lib`. There are no `index.ts` barrels: modules are imported directly from their files through the `@/` alias.
- Components are grouped by role: `ui/` for visual building blocks, `providers/` for context providers and `layouts/` for page shells, whose private parts live in a `_components/` folder next to them.
- Global styles moved to `src/app/styles/globals.css`.
- Anything that is not frontend-exclusive, such as `src/tests`, sits directly under `src`, as a sibling of `app`.

### Styling and UI

- **Tailwind CSS v4** through `@tailwindcss/postcss`.
- **Light and dark themes** via `next-themes`: a `.dark` class on `<html>` drives the `dark:` variant and the dark tokens. The first visit follows the system preference and a chosen theme persists across visits.
- **shadcn/ui** (style `base-nova`, base color `neutral`, `lucide` icons) on top of [Base UI](https://base-ui.com), with `class-variance-authority` and a `cn()` helper. Components land in `src/app/components/ui/shadcn/`; add more with `pnpm shadcn:add <name>`.

### Linting and formatting

- **ESLint** (flat config) extends `eslint-config-next` and adds the `unicorn`, `simple-import-sort`, `tailwindcss`, `promise` and `prefer-arrow-functions` plugins, plus `@eslint/json` and `@eslint/markdown`.
- **Prettier** with single quotes, no semicolons and no trailing commas. Indentation and whitespace are enforced by `.editorconfig`.
- Scripts: `pnpm eslint:check`, `pnpm eslint:fix`, `pnpm prettier:check`, `pnpm prettier:fix` and `pnpm type-check`.

### Code comments

- Comments only record why a decision was made, ideally with a reference (docs, issue or upstream bug), never what the code does. They are written in English.

### Testing

- **Unit tests:** Vitest with `jsdom` and Testing Library. Run `pnpm test` (once) or `pnpm test:watch`. Only `src/**/*.test.{ts,tsx}` files are picked up.
- **E2E tests:** Playwright (Chromium) in `src/tests/e2e`. Run `pnpm test:e2e` or `pnpm test:e2e:ui`. The dev server starts automatically.

### Git hooks and CI

- **Husky hooks:**
  - `pre-commit` runs `lint-staged` (Prettier, ESLint and `vitest related` on staged files).
  - `commit-msg` adds the emoji prefix and runs `commitlint`.
  - `pre-push` runs `pnpm type-check` and `pnpm test:e2e`.
- **Commit messages** are written in English, in the imperative mood and lowercase, with a semantic prefix, for example `✨ feat: add product page`. Typing `feat: ...` is enough, since the hook adds the emoji.
- **Branches:** work for each issue goes on a new branch named `<scope>/<title>#<issue>`, where `<scope>` is the commit prefix without the emoji, for example `feat/home-page#3`. For very specific work, add an optional target in parentheses (a page, component or other area), for example `fix(card)/focus-ring#7`. Nothing for an issue is committed directly to `main`.
- **Issues:** tick every completed checklist item in the issue body before closing it.
- **GitHub Actions** (`.github/workflows/ci.yml`) runs on every pull request: commitlint, type-check, ESLint, Prettier, unit tests and E2E tests.

### AI assistant setup

- `AGENTS.md` (imported by `CLAUDE.md`) documents the project conventions for coding agents.
- `.mcp.json` configures the `context7` (library docs) and `playwright` MCP servers.
- `.claude/` contains a `new-component` skill for adding shadcn or shared components and a `ui-reviewer` subagent that reviews UI semantics and accessibility.

#### Context7 API key

`.mcp.json` reads the key from the `CONTEXT7_API_KEY` environment variable (`"Authorization": "Bearer ${CONTEXT7_API_KEY}"`), so it never lands in the repository. Claude Code expands the variable on startup.

1. Generate an API key in the [Context7](https://context7.com) dashboard.
2. Set the variable using one of these options:
   - **Shell (all projects):** export it in your shell profile. In fish, run `set -Ux CONTEXT7_API_KEY <your-key>`. In bash or zsh, add `export CONTEXT7_API_KEY=<your-key>` to `~/.bashrc` or `~/.zshrc`.
   - **This project only:** add it to `.claude/settings.local.json`, which is git-ignored:

     ```json
     {
       "env": {
         "CONTEXT7_API_KEY": "<your-key>"
       }
     }
     ```

3. Restart Claude Code and run `/mcp` to check that `context7` is connected.

Never put the key in `.mcp.json` or in `.claude/settings.json`, since both are committed.
