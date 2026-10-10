# Review checklist

Focused reference for **nothing-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
