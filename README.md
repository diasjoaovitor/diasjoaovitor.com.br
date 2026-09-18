This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/(pages)/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Modifications

Everything above is the stock `create-next-app` output. This project stays as close to that scaffold as possible; the sections below describe what was added or changed on top of it. The full conventions live in [`AGENTS.md`](./AGENTS.md).

### Tooling

- **Package manager:** pnpm only. Versions in `dependencies` and `devDependencies` are pinned exact (install with `pnpm add -E <pkg>`).
- **Node:** version pinned in `.nvmrc` (`lts/krypton`).
- **React Compiler:** enabled via `reactCompiler: true` in `next.config.ts`.
- **Path alias:** `@/*` resolves to `src/*`.

### Project structure

- `src/app` holds frontend-exclusive code only. Routes live in the `src/app/(pages)` route group (which does not affect the URL), and shared code lives in `src/app/components` and `src/app/lib`, each re-exported through an `index.ts` barrel.
- Global styles moved to `src/app/styles/globals.css`.
- Anything that is not frontend-exclusive, such as `src/tests`, sits directly under `src`, as a sibling of `app`.

### Styling and UI

- **Tailwind CSS v4** through `@tailwindcss/postcss`.
- **shadcn/ui** (style `base-nova`, base color `neutral`, `lucide` icons) on top of [Base UI](https://base-ui.com), with `class-variance-authority` and a `cn()` helper. Components land in `src/app/components/ui/shadcn/`; add more with `pnpm shadcn:add <name>`.
- The home page was rebuilt from the default template using the shadcn `Card` and `buttonVariants`.

### Linting and formatting

- **ESLint** (flat config) extends `eslint-config-next` and adds the `unicorn`, `simple-import-sort`, `tailwindcss`, `promise` and `prefer-arrow-functions` plugins, plus `@eslint/json` and `@eslint/markdown`.
- **Prettier** with single quotes, no semicolons and no trailing commas. Indentation and whitespace are enforced by `.editorconfig`.
- Scripts: `pnpm eslint:check`, `pnpm eslint:fix`, `pnpm prettier:check`, `pnpm prettier:fix` and `pnpm type-check`.

### Testing

- **Unit tests:** Vitest with `jsdom` and Testing Library. Run `pnpm test` (once) or `pnpm test:watch`. Only `src/**/*.test.{ts,tsx}` files are picked up.
- **E2E tests:** Playwright (Chromium) in `src/tests/e2e`. Run `pnpm test:e2e` or `pnpm test:e2e:ui`. The dev server starts automatically.

### Git hooks and CI

- **Husky hooks:**
  - `pre-commit` runs `lint-staged` (Prettier, ESLint and `vitest related` on staged files).
  - `commit-msg` adds the emoji prefix and runs `commitlint`.
  - `pre-push` runs `pnpm type-check` and `pnpm test:e2e`.
- **Commit messages** are written in English, in the imperative mood and lowercase, with a semantic prefix, for example `✨ feat: add product page`. Typing `feat: ...` is enough, since the hook adds the emoji.
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
