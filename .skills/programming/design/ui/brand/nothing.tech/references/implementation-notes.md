# Implementation notes

Focused reference for **nothing-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

**Container ladder** — use the lightest step that works:

1. Spacing alone (proximity)
2. A single divider
3. A subtle border outline
4. A surface card with background change

**Never box the most important element** — let it float on the background.

---

## 5. Composition

- **One break per screen.** Be consistent in families, label treatment, spacing
  rhythm, colour roles, shapes, and alignment. Then break the pattern in exactly
  **one** place: an oversized number, a circular widget among rectangles, a red
  dot, a Doto headline, one vast gap where everything else is tight. That single
  break _is_ the design. Zero breaks is sterile; two is chaos.
- **Asymmetry over symmetry.** Centred reads generic. Prefer large-left /
  small-right, top-heavy, or edge-anchored with negative space in the middle.
  Balance heavy elements with more emptiness, never with more heavy elements.
- **Data as beauty.** `36 GB/s` in mono at 48px _is_ the visual. No illustration
  needed. When 3+ data sections appear, vary the **form** and keep the **voice**
  constant: hero number → segmented progress → concentric rings → compact inline
  bar → status-coloured value → sparkline → stat row. Lead section gets the
  heaviest form; tertiary gets the lightest.

---

## 6. The Dot Language

The signature. It appears in four places, each on a fixed grid.

- **Standalone numerals** — dot-display face for counts, indices, percentages,
  dates, gauges. Letter units (`GB`, `K`) stay in mono.
- **Icons — 9×9.** Each lit cell is a **complete round dot** (`border-radius: 50%`).
  Never build with `mask` or `clip-path`; that cuts dots into half-circles. Scale
  via one `--dot-size`, gap = `size / 20`.
- **Glyph Matrix — 25×25 circularly masked** (Phone (3)): no dots in the corners,
  white on `#070707`, dim LEDs (`~6%` white) as base texture. Generate
  geometrically (rings, bars, triangles) — hand-drawn bitmaps look ragged here.
- **Punctuation in dot contexts** — `:`, `·`, `…` from round-dot units, slightly
  smaller than adjacent digit dots. Not font glyphs, not squares.

**Page dot field** — sparse texture, inverts locally via `mix-blend-mode:
difference`, sits at `z-index: -1` beneath cards so they cover it. ~1.3px dots at
~120px spacing; denser than ~64px is wrong. `aria-hidden` — it is texture, and
must not reach screen readers.

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.42) 1.3px,
    transparent 1.7px
  );
  background-size: 120px 120px;
  background-attachment: fixed;
  mix-blend-mode: difference;
}
```

**Data-viz dot grid** is a different, denser thing: 1–2px dots on a 12–16px grid,
opacity 0.1–0.2 as background, full strength as data. Never a container border or
button style.

**Functional icons are not dots** — see §8.

---

## 7. Depth, Motion, and Interaction

- **No shadows. No gradients. No blur.** Depth comes from spacing, hairline
  borders, and z-index. Light mode gains elevation from white cards on off-white
  paper — `#FFFFFF` on `#F5F5F5`, no shadow required.
- **One sanctioned material:** Nothing OS 5.0 added transparency with a subtle
  frost for genuine layering where several things share a screen. That is
  material, not shadow — and it is the exception, not the default.
- **Inversion is the primary interaction.** Controls flip black↔white; they do not
  take the accent colour.
- **Motion:** 150–250ms micro, 300–400ms transitions, easing
  `cubic-bezier(0.25, 0.1, 0.25, 1)`. **No spring, no bounce.** Prefer opacity
  over position — elements fade, they don't slide.
- **Hover:** border or text brightens. No scale, no shadow, no `translateY`.
  (Frosted cards may lift 2px; flat ones must not.)

---

## 8. Iconography

- Monoline, **1.5px stroke, no fill**, 24×24 canvas with a 20×20 live area, round
  caps and joins, max 5–6 strokes. Colour inherits `currentColor`.
- Lucide (thin) or Phosphor (thin). **Never** filled, multicolor, or emoji as UI.
- **Dots are for display and status, not for controls.** A 9×9 dot glyph inside a
  button is a legibility failure.

---
