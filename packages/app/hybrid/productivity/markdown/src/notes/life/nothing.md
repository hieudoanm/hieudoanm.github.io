# NothingOS Design Principles

## Table of Contents

- [NothingOS Design Principles](#nothingos-design-principles)
  - [Table of Contents](#table-of-contents)
  - [Design Principles](#design-principles)
  - [Colors](#colors)
    - [Rules](#rules)

## Design Principles

1. **Monochrome is the canvas, red is the signal** — NothingOS is overwhelmingly
   monochrome: black, white, and a single gray. A single red accent —
   `--color-primary` (`#ff0030`) — drives CTAs, active states, and urgent
   badges. The default state of every element is monochrome. Red must be earned.

2. **Glyph over glance** — The Glyph Interface communicates notifications
   through light patterns on the back of the device so users never need to turn
   the screen on. Flip to Glyph makes this the primary notification channel.
   Information should be delivered without demanding attention. Light is a
   silent, private language.

3. **Dot-matrix is a design system, not a gimmick** — The Ndot dot-matrix font
   renders every product identifier — `phone(2a)`, `ear(open)` — in pixel-grid
   characters. Editorial headlines use NType82 ultra-light (weight 100) so text
   recedes and product photography dominates. Every label, button, and nav link
   is LatteraMonoLL uppercase mono at 11px. Three typefaces, three distinct
   jobs, no decorative extras.

4. **No ornaments** — Every visual element must earn its place through function.
   The transparent back reveals internal components honestly; the Glyph lights
   convey information; the dot-matrix font identifies products. Nothing in
   NothingOS exists purely for decoration. If it cannot be justified by utility,
   it does not ship.

5. **Bloatware is violence** — NothingOS ships near-stock Android with zero
   duplicate apps, zero manufacturer-themed utilities, and zero forced services.
   The only preloads are Facebook and Instagram — both removable in one tap. The
   OS does not compete with Google apps; it gets out of the way and lets the
   user decide what belongs on their phone.

6. **One feature, done well** — Instead of fifty half-baked AI gimmicks,
   NothingOS adds one: Essential Space. A single, focused tool for capturing
   ideas, recordings, and screenshots that syncs across devices. Every proposed
   feature must pass one question: "Would the user notice if this was gone?"

7. **Typography is the primary hierarchy** — NothingOS uses no bold weights, no
   decorative dividers, and no colour-coded navigation. Hierarchy comes from
   typeface switching: Ndot for identity, NType82 ultra-light for content that
   should recede, LatteraMonoLL uppercase for actions. Red is reserved for state
   changes (active, destructive), not for hierarchy.

8. **Consistency over customisation** — Other Android skins offer endless
   themes, icon packs, and accent colour pickers. NothingOS offers one coherent
   vision. The monochrome palette, the dot-matrix widgets, the uniform
   typography, the single red accent — consistency is the differentiator. Users
   should not have to fight the UI to make it look intentional.

9. **Screen-off is the default** — Flip the phone face down and Glyph takes
   over: notifications become light sequences, calls become rhythmic pulses,
   charging becomes an LED progress bar. The default interaction mode minimises
   screen-on time. NothingOS is designed to be used without being looked at.

10. **Nothing is not minimalism** — Minimalism removes until it looks clean.
    Subtractionism removes until only the essential remains. NothingOS starts
    from stock Android and deliberately subtracts: no duplicate apps, no themes,
    no ornament. A single red accent remains because destruction and urgency
    need a signal. Everything else has passed a strict filter of necessity. The
    result is not sparse — it is intentional.

## Colors

A `nothing` daisyUI theme defined in `globals.css`. Every colour descends from
one of these CSS custom properties.

| Token                       | Hex       | Usage                               |
| --------------------------- | --------- | ----------------------------------- |
| `--color-base-100`          | `#000000` | Primary background (OLED black)     |
| `--color-base-200`          | `#0a0a0a` | Elevated surfaces, cards            |
| `--color-base-300`          | `#1f1f1f` | Secondary elevation, hover states   |
| `--color-base-content`      | `#f5f5f5` | Primary text on base backgrounds    |
| `--color-primary`           | `#ff0030` | Signature red: CTAs, active, urgent |
| `--color-primary-content`   | `#f5f5f5` | Text on primary                     |
| `--color-secondary`         | `#f5f5f5` | Inverted surface, light-mode canvas |
| `--color-secondary-content` | `#1f1f1f` | Text on secondary                   |
| `--color-accent`            | `#6e7b86` | Muted accent: metadata, subtle UI   |
| `--color-accent-content`    | `#f5f5f5` | Text on accent                      |
| `--color-neutral`           | `#8a8a8a` | Neutral gray: disabled, placeholder |
| `--color-neutral-content`   | `#000000` | Text on neutral                     |
| `--color-info`              | `#4da3ff` | Informational                       |
| `--color-info-content`      | `#f5f5f5` | Text on info                        |
| `--color-success`           | `#00c853` | Success states                      |
| `--color-success-content`   | `#f5f5f5` | Text on success                     |
| `--color-warning`           | `#ffb000` | Warning states                      |
| `--color-warning-content`   | `#f5f5f5` | Text on warning                     |
| `--color-error`             | `#ff0030` | Error states (same as primary)      |
| `--color-error-content`     | `#f5f5f5` | Text on error                       |

### Rules

1. **Primary is red, not blue** — `--color-primary` (`#ff0030`) is the signature
   red. It drives primary CTAs, active tabs, and urgent badges. This replaces
   the blue that most frameworks (Bootstrap, shadcn) use as default primary.

2. **Semantic colours form a status language** — `info` (blue), `success`
   (green), `warning` (amber), `error` (red). Each maps to a clear emotional
   state. Never use a semantic colour decoratively — if it is not informing,
   succeeding, warning, or erroring, it stays monochrome.

3. **Base is three-deep** — `base-100` (black) → `base-200` (near-black) →
   `base-300` (dark gray). Every surface elevation is a lighter step from
   `#000000`. No coloured surfaces, no gradients — only luminance shifts.

4. **Content always contrasts its surface** — `--color-base-content` (`#f5f5f5`)
   lives on `--color-base-*` backgrounds; `--color-primary-content` lives on
   `--color-primary`. Never place a content token on a surface token from a
   different family. The pairing is enforced by naming.

5. **Secondary is the light switch** — `--color-secondary` (`#f5f5f5`) inverts
   the dark hierarchy. It is the canvas for light-mode cards and the text colour
   on dark surfaces. The OS is either dark (base family) or light (secondary
   family); there is no in-between.

6. **Accent is not the accent** — `--color-accent` (`#6e7b86`) is a muted
   gray-blue for metadata, timestamps, and secondary labels — not for
   interactive highlights. The real accent is `--color-primary` (red). The
   naming is a daisyUI convention; the role is purely informational.

7. **Neutral is the disabled dialect** — `--color-neutral` (`#8a8a8a`) handles
   every "off" state: disabled buttons, empty placeholders, inactive nav items.
   It sits exactly between `base-300` and `base-content` in luminance so it is
   visible but never demanding.

8. **One semantic colour per view** — A screen should communicate at most one
   status at a time. If the view is in an error state (`--color-error`), it
   should not also show a success banner (`--color-success`). Stacking status
   colours cancels the signal.

9. **No colour is decorative** — Every token maps to a functional role: base
   (background hierarchy), primary (interactive), semantic (status), neutral
   (disabled), accent (metadata). If an element does not fit one of these roles,
   it should not carry a colour.

10. **Rounded everything** — `--radius-selector`, `--radius-field`, and
    `--radius-box` are all `2rem`. Every corner shares the same pill radius. The
    shape language is consistent across buttons, inputs, cards, and badges.
    Sharp corners do not exist in this system.
