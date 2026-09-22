# Visual identity

Design decisions made for issue #3, before the shared layout and the home page are built. Read alongside [`AGENTS.md`](./AGENTS.md) for the general project conventions.

## Color

Base palette: the shadcn/ui scaffold defaults (`base-nova` style, `neutral` base color), unchanged — a monochrome system for structural surfaces (`background`, `card`, `popover`, `secondary`, `muted`, `accent`, `border`) in both light and dark, defined in `src/app/styles/globals.css`.

The one addition is a teal `primary` hue, used as the site's single accent color:

| Token     | Light                                      | Dark                                       |
| --------- | ------------------------------------------ | ------------------------------------------ |
| `primary` | `oklch(0.511 0.086 186.391)` (≈ `#0f766e`) | `oklch(0.785 0.133 181.912)` (≈ `#2dd4bf`) |
| `ring`    | same value as `primary`                    | same value as `primary`                    |

`primary-foreground` keeps the scaffold's existing neutral values (near-white in light, near-black in dark).

**Usage:** `primary` is the only accent — active/hover link color, primary button backgrounds, and (through `ring`) the visible focus outline and other interactive borders. Every other token (background, card, popover, secondary, muted, accent, destructive, chart colors, sidebar tokens) stays the shadcn `neutral` scaffold as-is.

**Contrast (WCAG):**

- Light — `primary-foreground` on `primary`: 5.47:1 (passes AA for normal text).
- Dark — `primary-foreground` on `primary`: 7.88:1 (passes AA for normal text).

## Typography

Keep the scaffold: **Geist Sans** for body copy and UI, **Geist Mono** for code and metadata (dates, tags). `--font-heading` stays aliased to `--font-sans` — no separate display face. The teal accent and layout carry the personality, not the typeface.

## Layout principles

- **Spacing:** Tailwind's default scale (4px base unit). No custom scale.
- **Radius:** keep the scaffold default, `--radius: 0.625rem` (10px), applied through the existing `--radius-sm` … `--radius-4xl` scale in `globals.css`.
- **Reading width:** long-form content (blog posts) uses a `max-w-[65ch]` container — inside the 45–75 character range considered comfortable for reading, on the tighter, denser side.

## Tone

Direct and technical, no filler. The audience is developers, recruiters and potential clients — copy should read like documentation written by someone who respects the reader's time: plain verbs, sentence case, specifics over marketing language.
