# Visual identity

Design decisions made for issue #3, before the shared layout and the home page are built. Read alongside [`AGENTS.md`](./AGENTS.md) for the general project conventions.

## Color

Base palette: the shadcn/ui scaffold defaults (`base-nova` style, `neutral` base color), unchanged — a monochrome system for structural surfaces (`background`, `card`, `popover`, `secondary`, `muted`, `accent`, `border`) in both light and dark, defined in `src/app/styles/globals.css`.

The one addition is a teal `primary` hue, used as the site's single accent color:

| Token     | Light                                                | Dark                                                 |
| --------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `primary` | `oklch(0.511 0.096 186.391)` (Tailwind's `teal-700`) | `oklch(0.777 0.152 181.912)` (Tailwind's `teal-400`) |
| `ring`    | same value as `primary`                              | same value as `primary`                              |

Both values are copied exactly from Tailwind's default palette (`node_modules/tailwindcss/theme.css`), so `primary` and the `teal-*` utilities used elsewhere in the layout stay on the same scale.

`primary-foreground` keeps the scaffold's existing neutral values (near-white in light, near-black in dark).

**Usage:** `primary` is the only accent — active/hover link color, primary button backgrounds, and (through `ring`) the visible focus outline and other interactive borders. The dividers that frame the app layout (the header's bottom and the footer's top border) use shades of the accent hue from Tailwind's palette instead of `primary` itself: `teal-500` (`oklch(70.4% 0.14 182.503)`, `border-teal-500`) in the light theme and `teal-950` (`oklch(27.7% 0.046 192.524)`, `dark:border-teal-950`) in the dark theme, so they mark the layout edges without competing with `primary`. The `border` token itself stays neutral, so cards, inputs and outline buttons keep their neutral edges. Every other token (background, card, popover, secondary, muted, accent, destructive, chart colors, sidebar tokens) stays the shadcn `neutral` scaffold as-is.

**Contrast (WCAG):**

- Light — `primary-foreground` on `primary`: 5.16:1 (passes AA for normal text).
- Dark — `primary-foreground` on `primary`: 9.60:1 (passes AA for normal text).

## Typography

Keep the scaffold: **Geist Sans** for body copy and UI, **Geist Mono** for code and metadata (dates, tags). `--font-heading` stays aliased to `--font-sans` — no separate display face. The teal accent and layout carry the personality, not the typeface.

## Brand

Decided in issue #21: the header brand is text, not an image logo — the name written as a self-closing JSX tag, `<João Vitor/>`, linking to `/`. A text brand needs no asset to keep in sync with the two themes, and the JSX tag says "developer" without extra copy.

- Set in **Geist Mono**, `tracking-tight`, at the body size and weight, in the `foreground` color in the light theme and `muted-foreground` in the dark theme.
- The `<` and `/>` characters use `teal-700` in both themes (`text-primary dark:text-teal-700`): the light `primary` value, kept in the dark theme too instead of switching to the brighter dark `primary` (`teal-400`).
- The brackets are `aria-hidden`, so the link's accessible name is just "João Vitor" instead of "less than João Vitor slash greater than".

## Layout principles

- **Spacing:** Tailwind's default scale (4px base unit). No custom scale.
- **Radius:** keep the scaffold default, `--radius: 0.625rem` (10px), applied through the existing `--radius-sm` … `--radius-4xl` scale in `globals.css`.
- **Layout widths:** the header and footer content spans `max-w-4xl` (896px), and the page content in `Main` is narrower, `max-w-3xl` (768px), so the frame is wider than what it holds.
- **Reading width:** long-form content (blog posts) uses a `max-w-[65ch]` container — inside the 45–75 character range considered comfortable for reading, on the tighter, denser side.

## Tone

Direct and technical, no filler. The audience is developers, recruiters and potential clients — copy should read like documentation written by someone who respects the reader's time: plain verbs, sentence case, specifics over marketing language.
