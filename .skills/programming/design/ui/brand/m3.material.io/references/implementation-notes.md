# Implementation notes

Focused reference for **google-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
