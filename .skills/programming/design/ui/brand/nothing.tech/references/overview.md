# Overview

Focused reference for **nothing-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Nothing Design Language

Two schools produce a design system. An **institutional** one (Material — see
`design/brand/google.md`) ships a large neutral vocabulary so nobody needs taste
and nobody is surprised. An **authored** one ships a small opinionated vocabulary
so nobody can mistake who made it. Nothing is the authored school taken to its
logical end: the interface _is_ the brand statement.

**Thesis — "Technical Warmth":** industrial precision (monochrome, hairline
structure, mechanical type) carrying visible components. Nothing's own words:
_start from scratch — no notes, no blueprints, no map to find our way back._
Transparency in hardware became dot-matrix type in software. Reference points are
Swiss typography and Braun / Teenage Engineering — technical, never cold.

**Why it works:** in a category of near-identical slabs, coherence across every
surface beats one spectacular element. Recognisable in a screenshot with no logo
is the bar.

**Not affiliated with Nothing Technology.** Nothing, the logotype, Glyph, and
NDot are trademarks. This is a reference for _inspired_ work — do not ship their
assets.

**Provenance matters here.** Values are marked **[OFFICIAL]** (Nothing's published
brand guidelines, condensed by nothing.wiki) or **[ADAPT]** (community adaptation
from `dominikmartn/nothing-design-skill`, useful and widely adopted). When they
conflict, **[OFFICIAL]** wins — see §11.

---

## 1. Core Principles

- **Subtract, don't add** — every element earns its pixels; default to removal.
- **Type does the heavy lifting** — scale, weight, spacing create hierarchy. Not
  colour, not icons, not borders.
- **Colour is an event, not a default** — monochrome is the canvas; an accent is
  an interrupt meaning "here, now".
- **Structure is ornament** — expose the grid and the hierarchy itself.
- **Mechanical honesty** — controls look like controls. A toggle is a switch, a
  gauge is an instrument. Percussive, not fluid: click not swoosh.
- **Both modes are first-class** — dark is OLED black, light is warm off-white.
  Neither is derived from the other.
- **If it looks generic, it failed** — regardless of how clean it is.

---

## 2. Colour

**[OFFICIAL]** foundation and primary:

| Token       | Hex       | Role                                      |
| ----------- | --------- | ----------------------------------------- |
| Pure Black  | `#000000` | Ink in light; canvas in inverted surfaces |
| Pure White  | `#FFFFFF` | Paper in light; ink in inverted surfaces  |
| N-Grey      | `#DCD7D2` | Warm neutral — dividers, quiet fills      |
| Window Grey | `#B1B3B3` | Muted controls, inactive states           |
| N-Red       | `#C8102E` | Signature accent — live, record, error    |
| N-Blue      | `#002F6C` | Secondary accent                          |
| N-Yellow    | `#FFC700` | Tertiary / highlight                      |

- **Absolute inversion.** Dark mode is `#000` on `#FFF` — no grey intermediates.
- **Never colour-fill a graphic element.** No fills, gradients, or shadows on the
  logotype or anything from the brand system.
- **The red has two values and you must pick deliberately.** `#C8102E` is the
  official brand red; `#D71921` is _Nothing OS Widget Red_ — real and observed in
  OS use, but **not** in the published guidelines. See §11.
- **Accent count is countable on one hand.** One accent element per screen. If
  nothing is urgent, there is no red on the screen.

**[ADAPT]** four-level grey hierarchy — max four per screen. The greyscale _is_
the hierarchy:

| Level     | Dark      | Light     | Contrast (dark) | Use                           |
| --------- | --------- | --------- | --------------- | ----------------------------- |
| display   | `#FFFFFF` | `#000000` | 21:1            | Hero numbers. One per screen. |
| primary   | `#E8E8E8` | `#1A1A1A` | 16.5:1          | Body text, primary content    |
| secondary | `#999999` | `#666666` | 6.3:1           | Labels, captions, metadata    |
| disabled  | `#666666` | `#999999` | 4.0:1           | Disabled, timestamps, hints   |

**[ADAPT]** surfaces: `--surface` `#111111`/`#FFFFFF`, `--surface-raised`
`#1A1A1A`/`#F0F0F0`, `--border` `#222222`/`#E8E8E8`, `--border-visible`
`#333333`/`#CCCCCC`.

- **Status colours are exempt from the one-accent rule** — they encode data
  values: success `#4A9E5C`, warning `#D4A843`, bad/over-limit `#D71921`, neutral
  inherits `--text-primary`. Apply colour to the **value**, never the label or
  row background.
- **Links need their own hue** (`#5B9BF6` dark / `#007AFF` light) — the one place
  a blue is functional rather than decorative.

---

## 3. Typography

### The five official faces — non-overlapping jobs
