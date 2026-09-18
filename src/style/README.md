# Design system

The site's visual language, written down. Three files carry it:

| File | Role |
| --- | --- |
| `src/style/tokens.css` | **Source of truth.** Every color, size, duration and radius. |
| `tailwind.config.js` | The Tailwind surface for those tokens. Mirrors, never invents. |
| `src/pages/styleguide/` | A live reference at **`/styleguide`**. |

The styleguide reads values off `:root` at runtime rather than hardcoding
them, so it cannot drift: add a token to `tokens.css`, add its name to
`src/pages/styleguide/tokens.ts`, and it documents itself.

---

## The idea

Editorial, not decorative. The page is a printed spread: a 1200px measure with
**visible rails**, hairline rules that **break full-bleed past those rails**,
and content sitting in labelled fields. The tension between the contained
column and the edge-to-edge line is the signature — keep it.

Four rules that hold the whole thing together:

1. **One accent.** Blue means *interactive, or me*. Nothing else earns color.
2. **Depth from hairlines, not shadows.** Elevation tokens exist, but reach
   for a 1px rule first.
3. **The grid is square.** Corners stay sharp. Radius is reserved for a short
   list — tags and buttons (pill), the tech-stack tiles and the project stack
   drawer — and adding to that list is a deliberate decision, not a default.
4. **Motion confirms, it doesn't perform.** Nothing over 700ms, and everything
   collapses to 1ms under `prefers-reduced-motion`.

---

## Tokens

Three layers, and the direction only runs one way:

```
primitive  →  semantic  →  component
--blue-500    --primary-blue    text-primary-blue
```

**Components only ever touch the semantic layer.** That indirection is what
makes the dark theme a 30-line override instead of an audit of every file.

### Color

`--content-*` for text, `--background-*` for surfaces, `--border-*` for rules.
`--background-site` is the page; `--background-primary` is a surface raised on
top of it. Both themes draw from one neutral ramp — light from the top, dark
from the bottom.

### Type

Roboto Flex for display (wide, stretched, confident), Libre Franklin for body,
Jost for the wordmark only. Headings are fluid `clamp()` steps (`--text-h1`
… `--text-h4`), so they scale with the viewport and need no breakpoint
overrides. Body copy uses Tailwind's numeric scale, which the `--text-*`
tokens mirror exactly.

### Space

A 4px rhythm. `--space-4` and Tailwind's `p-4` are the same 1rem by design —
**use the Tailwind utility in components**; the tokens exist for raw CSS and
for the styleguide. `--space-section` is the vertical step between sections.

---

## Gotchas

**Opacity modifiers.** Tailwind emits `rgb(var(--x) / 0.7)` for `bg-foo/70`,
which is nonsense when the variable holds a hex string — the color silently
vanishes. Every color in `tailwind.config.js` therefore goes through the
`token()` helper, which emits `color-mix()` instead. If you add a color, add
it through that helper.

**Don't override Tailwind's numeric scales.** `fontSize` and `spacing` in the
config are *additive only*. Redefining `text-sm` or `p-4` silently reflows the
entire site and drops Tailwind's paired line-heights.

**The Japanese counterpart text is invisible on purpose.** It's set in
`--background-site`, the same color as the page — the cursor flashlight in
`GridReveal` is what reveals it. Don't "fix" its contrast.

---

## Components

`Hr` is the full-bleed rule. `TextLink` is the entire link vocabulary
(internal / external / download).
`ShinyButton` is the one filled control — reserve it for the single most
important action on a screen. `TechTag` keys its border to each technology's
brand mark.

All of them render live at `/styleguide`.

> **Note:** `/styleguide` is a client-side route. It works in dev and via
> in-app navigation, but a hard refresh on GitHub Pages will 404 until the
> deploy adds an SPA fallback (a `404.html` copy of `index.html`).
