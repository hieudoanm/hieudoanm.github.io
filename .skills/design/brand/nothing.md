---
name: nothing-design-system
description: Build web/app UI in the Nothing (nothing.tech) design language — monochrome industrial restraint, Swiss/Colophon typography, dot-matrix motif, hairline structure, and one scarce accent. Covers the official palette and five typeface jobs, the three-layer hierarchy rule, spacing-as-meaning, the dot grid, motion and iconography, plus open substitutes for the proprietary fonts. Use when styling anything Nothing-inspired, matching Nothing OS or nothing.tech, or contrasting a brand-authored design system against an institutional one (see design/brand/google.md).
---

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

**Do not mix font sizes within a single use of NType82 Mono, NDot 55, or Lettera
Mono LL.** They behave like mechanical output, not flexible body copy.

| Face                 | Job                                 | Size     | Leading     | Tracking |
| -------------------- | ----------------------------------- | -------- | ----------- | -------- |
| **NType82 Headline** | Headlines, 1–2 words                | 40pt+    | 80%         | −20      |
| **NType82 Regular**  | Body, preamble, quotes              | 7.5pt+   | by size     | by size  |
| **NType82 Mono**     | Mechanical body passages            | 7.5–15pt | 145% / 140% | 0        |
| **NDot 55**          | Logotype and product names **only** | 10pt+    | 90%         | 0        |
| **Lettera Mono LL**  | Spec sheets, fine print             | 5–10pt   | 110%        | 0        |

NType82 Regular steps down with size: 7.5–15pt `+1%`/125% · 15–30pt `+1%`/115% ·
30–60pt `−1%`/115% · 60–120pt `−1%`/100% · 120pt+ `−1%`/85%.

- **Case is specified per face.** NType82 is **sentence case** — never all-caps,
  never all-lowercase, never hand-tuned letter-spacing. NDot 55 is mostly
  uppercase, but product names set in it are lowercase (`phone (2a)`).
- **NDot 55 never combines with another font in the same layout.**
- **NDot 57 is deprecated** — body text on nothing.tech in 2021–22, gone by Phone
  (1). Don't reach for it as "the authentic" pick.
- **Lettera Mono LL is 90% width, 5–10pt only** — spec-sheet texture, not UI.

### The three-layer hierarchy rule

Every screen has exactly **three** layers of importance. Not two, not five.

| Layer         | What                     | Treatment                                       |
| ------------- | ------------------------ | ----------------------------------------------- |
| **Primary**   | The ONE thing seen first | Display face at 48–96px, huge surrounding space |
| **Secondary** | Supporting context       | Body/subheading, grouped 8–16px from primary    |
| **Tertiary**  | Metadata, nav, system    | 11–12px mono, ALL CAPS, pushed to edges         |

**The test:** squint. If two things compete, one shrinks, fades, or moves. The
common failure is making _everything_ secondary — evenly sized elements with
even spacing read as flat. Be brave: the primary absurdly large, the tertiary
absurdly small. The contrast _is_ the hierarchy.

### The budget

Per screen: **max 2 font families**, **3 sizes**, **2 weights**.

```css
--display-xl: 72px/1/-0.03em; /* hero numbers, time */
--display-lg: 48px/1.05/-0.02em; /* section heroes, percentages */
--display-md: 36px/1.1/-0.02em; /* page titles */
--heading: 24px/1.2/-0.01em; /* section headings */
--subheading: 18px/1.3/0;
--body: 16px/1.5/0;
--body-sm: 14px/1.5/0.01em;
--caption: 12px/1.4/0.04em; /* timestamps, footnotes */
--label: 11px/1.2/0.08em; /* ALL CAPS mono, "instrument panel" */
```

**Rule of thumb: if you reach for a new font-size, it's probably a spacing
problem.** Add distance instead. Differentiate a label from its value with
colour, not size; a heading from body with size, not weight.

### Open substitutes — the real faces are licensed

Never commit them to a repo or ship them unlicensed (Colophon Foundry, Lineto).

| Official job                  | Open stack **[ADAPT]** | Note                                        |
| ----------------------------- | ---------------------- | ------------------------------------------- |
| NDot 55 / 57                  | **Doto**               | Variable round-dot; display use only, 36px+ |
| NType82 Headline / Regular    | **Space Grotesk**      | Colophon Foundry — same foundry, shared DNA |
| NType82 Mono, Lettera Mono LL | **Space Mono**         | Colophon Foundry; 11px ALL CAPS labels      |

Nothing OS 5.0 itself moved its functional UI to **Geist / Geist Mono**, so
`Geist` + `Geist Mono` + `Doto` is an equally defensible stack. Label every
substitution in the token layer — a dot-matrix imitation is a homage, not the asset.

---

## 4. Spacing Is Meaning

Spacing is the primary tool for communicating relationships. **[ADAPT]**

| Gap     | Meaning                                                 |
| ------- | ------------------------------------------------------- |
| 4–8px   | "These belong together" (icon + label, number + unit)   |
| 16px    | "Same group, different items" (list items, form fields) |
| 32–48px | "New group starts here" (section breaks)                |
| 64–96px | "This is a new context" (hero → content)                |

**If you need a divider line, the spacing is wrong.** Dividers are a symptom of
insufficient spacing contrast — use them only in data-dense lists whose rows are
structurally identical.

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

## 9. Naming Rules

The product name _is_ the brand, so spacing is specified.

- Brand → product: **2×** standard space between `NOTHING` and the product name.
- Around brackets: **1×** standard space (`phone (2a)`).
- Inside brackets: no spacing, letters inside lowercase.
- **Never drop the brackets** — `Phone 3` is wrong; `Phone (3)` is right.
- NDot lockups lowercase product name; NType lockups title case
  (`Phone(4a)Pro`). Suffixes sit **outside** the brackets (`phone (2a)plus`).
- Wordmark is uppercase only and keeps its `(R)` unless locked with a product
  name. No spaces around the `(R)`.

---

## 10. Anti-Patterns

- Skeleton loading screens — use `[LOADING...]` text or a segmented spinner.
- Toast popups — use inline status text: `[SAVED]`, `[ERROR: …]`.
- Empty-state illustrations, mascots, or multi-paragraph copy.
- Zebra striping in tables.
- Filled, multicolor, or emoji icons.
- Parallax, scroll-jacking, gratuitous animation, spring/bounce easing.
- Gradients and shadows in UI chrome; blur for its own sake.
- Differentiating data series by colour alone — reach for opacity
  (100/60/30%) or pattern (solid/striped/dotted) first.
- NDot for anything but product names; size-mixing inside a mechanical face.
- Three or more accent elements on one screen.
- Copying Glyph or weather icon art — proprietary; use as inspiration only.

---

## 11. Sources, and Where They Disagree

- **nothing.tech**, **nothing.community**, and the **Brand Guidelines** as
  condensed by `nothing.wiki/nothing/brand_reference` — authoritative for palette,
  the five faces, naming, grid, and the graphic don'ts.
- **`github.com/dominikmartn/nothing-design-skill`** (MIT, v3.0.0) — the
  strongest community skill; source of the three-layer rule, the type budget,
  spacing-as-meaning, container ladder, motion values, and iconography.

Known conflicts, resolved:

| Question    | Official                                  | Community                  | Use                                      |
| ----------- | ----------------------------------------- | -------------------------- | ---------------------------------------- |
| Accent red  | `#C8102E`                                 | `#D71921`                  | Official unless targeting OS widgets     |
| Base unit   | 4px                                       | 8px                        | 4px for anything claiming brand fidelity |
| Card radius | ≤8px                                      | ≤16px                      | ≤8px; pill buttons are legitimate        |
| Typeface    | NType82 / NDot                            | Space Grotesk / Space Mono | Substitutes — label them                 |
| Grid        | 2/4/6/8/10 cols, 2.3% margin, top-aligned | —                          | Official; nothing competes               |

A monochrome-plus-one-accent system is _not_ by itself the Nothing look — every
well-made dark UI does that. The recognisable parts are the **dot matrix**, the
**mechanical type discipline**, the **exposed grid**, and the **one deliberate
break per screen**.

---

## General Rules of Thumb

- **Three layers per screen, one break per screen.** Both, always.
- **Monochrome carries structure; accent means "here, now".**
- **Two families, three sizes, two weights** — a budget, not a suggestion.
- **New font-size? Probably a spacing problem.**
- **Need a divider? The spacing is wrong.**
- **Never box the most important element.**
- **Absolute black/white inversion** between modes; neither mode is derived.
- **Dots are complete circles on 9×9 or 25×25** — never mask-clipped, never in controls.
- **No shadows, no gradients, no spring.** Fades, not slides.
- **Mechanical honesty** — a toggle looks like a switch.
- **Label your font substitutions.** A homage is not the asset.
- **If it looks generic, it failed** — recognisability is the test.

---

## Quick-Start Checklist

- [ ] Palette tokenized; red choice made deliberately (`#C8102E` vs `#D71921`)
- [ ] Four-level grey hierarchy capped; accent ≤ 1 element per screen
- [ ] Both modes authored independently; black/white inversion verified
- [ ] Three layers identified before any code; squint test passes
- [ ] Font/size/weight budget respected; substitutions documented in tokens
- [ ] NDot/Doto restricted to product names; sentence case applied elsewhere
- [ ] Spacing gaps carry meaning; container ladder stopped at the lightest step
- [ ] Exactly one pattern break per screen; composition asymmetric
- [ ] Dot field inverted locally via `difference`, behind cards, `aria-hidden`
- [ ] Icons monoline 1.5px unfilled; no emoji as UI
- [ ] Motion: opacity-only, `cubic-bezier(0.25, 0.1, 0.25, 1)`, no spring
- [ ] No shadows, no gradients, no skeletons, no toasts, no zebra tables
- [ ] Data series differentiated by opacity/pattern before colour
- [ ] Grid: 2/4/6/8/10 columns, 2.3% margin, 4px unit, top-aligned
- [ ] Proprietary assets excluded; homage credited
