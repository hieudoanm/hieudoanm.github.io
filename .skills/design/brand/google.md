---
name: google-design-system
description: Build web/app UI on an inherited, opinionated design system (Material Design 3 / Google) instead of inventing tokens from scratch. Covers color roles, type and shape scales, elevation, state layers, motion tokens, Tailwind v4 + DaisyUI 5 wiring, and where divergence must be declared. Use when starting a new app, choosing between borrowing a system and deriving one, or reviewing UI that drifts from its own design system.
---

# Google Design System (Material Design 3)

Every product ends up with a design system. The question is whether you
**inherit** one or **derive** one from content (see `design/brand/nothing.md`).
Mixing the two is the usual reason UI feels inconsistent with no explainable
cause. This skill covers the inherit branch, using M3 because its token model is
role-based and maps cleanly onto CSS variables, Tailwind v4, and DaisyUI 5.

**You buy:** cohesion, passing contrast, platform familiarity, and a decision you
don't have to re-litigate. **You pay:** you look like everything else using it,
and real needs outside it need a workaround or a declared divergence.

---

## 1. Core Principles

- **Roles, not names** — a token says what it _does_ (`on-surface`), never what
  it looks like (`gray-800`). Name-by-color breaks the moment a theme changes.
- **Ink on ground** — every color token is a surface/ink pair (`surface` +
  `on-surface`). Contrast then holds by construction instead of by review.
- **One source per feel** — elevation from surface tint, interaction from state
  layers, emphasis from color. Don't stack shadows to fake depth that has a token.
- **The system is the decision record** — a component library is disposable; the
  resolved ratios and thresholds are the asset.
- **Constraints buy consistency** — the point of inheriting is that the common
  case is cheap and the unusual case is deliberate.

---

## 2. Color Is a Set of Roles

| Role                                         | Use                                  |
| -------------------------------------------- | ------------------------------------ |
| `primary` / `on-primary`                     | Brand emphasis, filled buttons       |
| `primary-container` / `on-primary-container` | Low-emphasis brand fill, chips       |
| `surface` / `on-surface`                     | Page and card ground                 |
| `surface-container-{low,high,highest}`       | Nested surfaces, by elevation        |
| `surface-variant` / `on-surface-variant`     | Secondary text, icons, dividers      |
| `outline` / `outline-variant`                | Borders, focus rings, disabled fills |
| `error` / `on-error` / `error-container`     | Destructive actions, validation      |

- **Never** reference a raw ramp in a component — `bg-blue-500` can't respond to a
  theme and is unauditable for contrast.
- **`on-*` is not optional.** Every ground ships with its ink. This one rule
  prevents most contrast regressions.
- Extend the vocabulary only with a declared custom role.

---

## 3. Wire Roles Into Tokens

Define once as CSS variables; Tailwind v4 `@theme` promotes them to utilities.
Themes swap variables, never classes.

```css
@theme {
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
}

[data-theme='exibit-light'] {
  --surface: oklch(99% 0.004 264);
  --on-surface: oklch(21% 0.012 264);
  --surface-variant: oklch(95% 0.006 264);
  --on-surface-variant: oklch(45% 0.014 264);
  --primary: oklch(48% 0.15 264);
  --on-primary: oklch(99% 0.004 264);
  --outline: oklch(72% 0.01 264);
  --error: oklch(52% 0.19 27);
}

/* dark: same role names, different values */
[data-theme='exibit-dark'] {
  --surface: oklch(21% 0.012 264);
  --on-surface: oklch(95% 0.006 264);
  --surface-variant: oklch(28% 0.014 264);
  --on-surface-variant: oklch(74% 0.012 264);
  --primary: oklch(80% 0.11 264);
  --on-primary: oklch(24% 0.06 264);
  --outline: oklch(48% 0.01 264);
  --error: oklch(70% 0.16 27);
}
```

```tsx
export function ReceiptTotal({ total }: { total: Money }) {
  return (
    <p className="bg-surface text-on-surface font-title tabular-nums">
      {total.format()}
    </p>
  );
}
```

- **`oklch`, not hex** — perceptual lightness makes tonal ramps and contrast
  checks meaningful; hex lightness does not.
- **Never redefine a role per component.** If a screen needs a look the roles
  can't express, that's a missing role — add it to the theme, don't patch the
  component.
- **DaisyUI 5 is M3-shaped** (`--color-primary`, `--radius-box`, `--size-field`),
  so map roles onto DaisyUI variables instead of fighting its defaults.
- Set `data-theme` on `<html>` and persist it; never branch on
  `prefers-color-scheme` in component code.

---

## 4. Type Is Roles With Bundled Metrics

Ship a _named_ scale — each role fixes size, line-height, weight, and tracking
together, so line breaks stay stable across components. Roles run
`display-*`, `headline-*`, `title-*`, `body-*`, `label-*`, each at
`small|medium|large`.

```css
@theme {
  --text-body-medium: 0.875rem;
  --text-body-medium--line-height: 1.45;
  --text-title-medium: 1rem;
  --text-title-medium--line-height: 1.4;
  --text-headline-medium: 1.5rem;
  --text-headline-medium--line-height: 1.3;
}
```

- **Use `body-medium` for product chrome**, not `body-large` — dense operational
  UIs lose information density at `body-large`.
- **Monospace only for aligned numeric data** — prices, quantities, timestamps —
  and opt-in per instance, never a font-family default.

---

## 5. Shape, Elevation, and State

- **Shape scale** — `none` → `extra-small` (4dp) → `small` (8dp) → `medium`
  (12dp) → `large` (16dp) → `full`. One radius per component class; mixing radii
  inside a card reads as an accident.
- **Elevation** — use `surface-container-*`, not stacked shadows. Reserve shadow
  for genuinely floating things (menu, dialog, FAB): `elevation-1` … `elevation-5`.
- **State layers** — hover, focus, pressed, and selected are _opacity overlays on
  the same tokens_, never new colors.

```css
.btn {
  background: var(--primary);
  color: var(--on-primary);
  position: relative;
}
.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: currentColor;
  opacity: 0;
  transition: opacity 120ms cubic-bezier(0.2, 0, 0, 1);
}
.btn:hover::after {
  opacity: 0.08;
}
.btn:focus-visible::after {
  opacity: 0.12;
}
.btn:active::after {
  opacity: 0.12;
}
```

---

## 6. Accessibility Is Part of the System

Non-negotiable, and belongs in review — not in a follow-up ticket.

- **Contrast** — body text ≥ 4.5:1, large text and non-text UI ≥ 3:1, checked
  **per theme**; dark themes fail independently.
- **Touch target** — interactive controls ≥ 48×48dp. Enlarge the hit area with
  padding or a pseudo-element, not by growing the visual box.
- **Focus is always visible** — a `:focus-visible` ring on `outline`, never
  removed without an equal replacement.
- **Never encode meaning in color alone** — pair every status color with text, an
  icon, or a shape change.
- **Honor `prefers-reduced-motion`** — collapse durations to near-zero.

---

## 7. Motion as Tokens

- **Duration scale** — `short` 100ms (state) / `medium` 200ms (enter, exit) /
  `long` 300ms (large surfaces) / `extra-long` 400ms (full-screen).
- **Easing** — `standard` on-screen, `emphasized` user-initiated, `linear` only
  for continuous values (progress).
- **Animate transform and opacity only** — `width`, `height`, `top`, and
  `box-shadow` force layout or paint and read as jank on mid-range hardware.

---

## 8. When to Choose This Branch — and When to Leave

Choose it when the product is operational or enterprise, when accessibility
budget is scarce, when users arrive with habits from other apps, or when speed to
a coherent first release matters more than distinctiveness.

Leave it — deliberately, in writing — when the brand must be recognizable in a
screenshot with no logo, a required interaction has no M3 analogue, or you're
already maintaining two systems and a third is cheaper.

**Declare divergence, don't smuggle it.** A token plus a one-line comment is fine;
scattered arbitrary values are how a system dies.

```tsx
// DIVERGENCE: hardware-scanner keypad needs 64dp targets; M3 min is 48dp.
const KEYPAD_TARGET = 64;
```

---

## General Rules of Thumb

- **Use roles, never color names** — `on-surface`, not `gray-800`.
- **Ship every ground with its ink** — contrast by construction.
- **Prefer surface tokens to shadows** — shadow means "floating".
- **Express interaction as opacity, not new colors** — one token, many states.
- **Bundle type metrics into named roles** — size alone drifts.
- **Check both themes, every time** — they fail independently.
- **Divergence is fine; drift is not** — declare it.

---

## Quick-Start Checklist

- [ ] Inherit-vs-derive decision recorded with reasons
- [ ] Role palette defined per theme, each ground paired with its ink
- [ ] Contrast verified ≥ 4.5:1 body, ≥ 3:1 large/non-text, per theme
- [ ] Type scale defined as named roles with line-height and tracking
- [ ] Radius and elevation scales set; shadow reserved for floating surfaces
- [ ] Interaction states expressed as opacity layers on existing tokens
- [ ] Touch targets ≥ 48×48dp; focus ring visible on every interactive element
- [ ] Motion tokenized, transform/opacity only, reduced-motion honored
- [ ] Token values live in one theme file; no raw colors or magic numbers in components
- [ ] Every out-of-spec decision carries a `DIVERGENCE` comment
