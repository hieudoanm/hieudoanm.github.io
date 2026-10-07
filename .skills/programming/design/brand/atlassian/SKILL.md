---
name: atlassian-design-system
description: Build enterprise productivity and collaboration UI on the Atlassian Design System. Covers the color token anatomy (property, role, emphasis, state), the interchangeable accent palette, light and dark themes, emphasis levels, inverse tokens, WCAG AA contrast requirements, Atlaskit and Forge as the implementation lines, and where Atlassian expects divergence. Use when building or reviewing issue trackers, project tools, admin consoles, or collaborative enterprise apps.
---

# Atlassian Design System (Atlassian)

Atlassian's design system covers productivity and collaboration surfaces: issue
tracking, project management, service management, and the admin tooling around
them. It is the right reference when many users live in the product all day and
learn its status language once.

**You buy:** a color model that scales across a large product surface, an explicit
role vocabulary, first-class light and dark themes, and an accent palette designed
to be swapped without loss of meaning.

**You pay:** the token namespace is verbose, Atlaskit is React-first, and some
foundations — radius in particular — are still beta and should not be leaned on.

---

## 1. Core Principles

- **Tokens encode intent.** A token says what a color _does_ in a situation, never
  what it looks like.
- **Meaning beats decoration.** Color is a signal first. If it is not carrying
  meaning, it should not be saturated.
- **The accent palette is swappable.** Any accent color can replace any other and
  the experience should remain unchanged.
- **Dense is normal.** Power users scan. Layout optimized for a first-time visitor
  wastes their day.
- **Status is a first-class vocabulary.** Shared language across products is a large
  part of the value.
- **Accessibility is a constraint, not a phase.** WCAG AA is where the design
  system meets the legal floor.

---

## 2. Foundations

The system's foundations are documented as: tokens, accessibility, content,
spacing, grid, color, typography, motion, iconography, illustrations, logos,
elevation, border, and radius (**beta**).

Two structural consequences:

- **Radius is beta.** Do not build visual identity on it; it may change.
- **Content and accessibility are foundations, not add-ons.** Content guidelines
  ship with the same weight as color.

---

## 3. The Color Token Anatomy

Atlassian color tokens read as a sentence:

```
color.{property}.{role}.{emphasis}.{state}
```

| Segment    | Values                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| `property` | `background`, `text`, `border`, `icon`                                                                       |
| `role`     | `neutral`, `brand`, `information`, `success`, `warning`, `danger`, `discovery`, `accent`, `inverse`, `input` |
| `emphasis` | `subtlest`, `subtle`, (default), `bold`                                                                      |
| `state`    | `hovered`, `pressed`, `focused`, `selected`, `disabled`                                                      |

Real examples from the documented examples:

- `color.background.brand.bold` — the primary button fill
- `color.background.danger.bold.hovered` — a destructive button on hover
- `color.background.neutral.subtle.hovered` — an icon's hover treatment
- `color.text.inverse` — text on a bold background

**Read the token name out loud.** `color.background.danger.bold.hovered` tells you
more about correct usage than any value it holds, because the name is the decision.

- Choosing the right role is the whole job. The emphasis and state segments then
  follow from it.
- Do not use an `accent` color where color carries meaning. Accents are for
  expression, not signal.

---

## 4. Emphasis Levels

Emphasis is how much contrast a value has against the default surface. It is the
main lever for hierarchy inside a dense screen:

| Level      | Use                                                    |
| ---------- | ------------------------------------------------------ |
| `subtlest` | Least contrast — metadata, timestamps                  |
| `subtle`   | Supporting copy, secondary labels                      |
| default    | Body text and primary UI                               |
| `bold`     | Section headings, primary actions, high-attention rows |

- Emphasis replaces most of what layout hacks usually reach for. Before adding a
  border or a background to separate things, change the emphasis level.
- Bold text is not a heading style; it is a hierarchy step, used consistently.

---

## 5. Inverse Tokens on Bold Backgrounds

Bold backgrounds need their own ink, and one special case matters:

- Text, borders, and icons on bold backgrounds use `inverse` tokens.
- `warning.inverse` tokens exist specifically so **warning text passes WCAG AA on
  yellow**. Yellow is the one bold background where the default ink does not work.
- Do not put dark ink on a bold warning background "because it looks better" —
  it fails contrast, and it is precisely what those tokens exist to prevent.

---

## 6. Accent Colors Are Interchangeable

Accent colors: gray, red, green, blue, yellow, orange, teal, purple, magenta, lime.

The defining property is that **swapping one accent for another leaves the
experience unchanged** — because accent color carries no semantic meaning.

- Use accents for expression: empty states, celebration, moments of personality.
- Never use an accent to mean success, danger, or warning. Those are roles.
- If a user would read a color as a status, it is not an accent.

---

## 7. Icons Have No Hover Tokens — By Design

There are deliberately **no `hovered` or `pressed` color tokens for icons**.
Instead, indicate icon state with a subtle neutral background.

- If you are about to invent an icon hover color, you have misread the system.
- `color.background.neutral.subtle` and its `.hovered` / `.pressed` variants are the
  mechanism.
- This is worth knowing because it looks like a missing feature and gets
  "fixed" incorrectly.

---

## 8. Light and Dark Themes

Design tokens currently support two themes, light and dark. Each color token maps
to a different value per theme.

- **Use tokens and the mapping is handled for you.** Atlassian's guidance is
  explicit: if you are using design tokens, you should not be mapping values
  yourself.
- Hand-mapping light values to dark values is the main source of dark-mode
  contrast bugs.
- If a value only exists in one theme, that is a gap in the token set, not a
  special case for your component.

---

## 9. Accessibility

Atlassian holds colors to **WCAG AA contrast ratios**:

| Requirement | Applies to                                     |
| ----------- | ---------------------------------------------- |
| **4.5:1**   | Text smaller than 24px                         |
| **3:1**     | UI essential to understanding, and text ≥ 24px |

- Check contrast with the token you actually applied, in the theme you actually
  shipped.
- Warning backgrounds need the dedicated `warning.inverse` tokens.
- Never rely on color alone to convey state — pair with an icon, label, or shape.
- Verify focus visibility against every surface, including bold backgrounds.
- Accent backgrounds in particular tend to be the failure case.

---

## 10. Implementation

| Need                              | Line                              |
| --------------------------------- | --------------------------------- |
| Atlassian products and React apps | Atlaskit (`@atlaskit/*`)          |
| Jira/Confluence Forge apps        | Forge UI Kit                      |
| Brand assets and Atlassian markup | Brand kit (Orange DAM)            |
| New Atlassian-facing surfaces     | Atlassian Design System + Rovo UI |

- Atlaskit emits CSS custom properties in a `--ds-*` namespace. **Confirm the exact
  variable name in devtools** rather than hand-writing it; the generated set is
  large and the public token reference is the source of truth.
- The full token reference with values and descriptions lives in Atlassian's
  token reference list.
- Prefer building on Atlaskit primitives over assembling raw HTML for interactive
  components — keyboard and focus behavior is already handled.

---

## General Rules of Thumb

- Read the token name as a sentence; it is the usage contract.
- Change emphasis before adding a border or a background to separate things.
- Keep semantics in roles; accents are for expression only.
- Use `inverse` tokens on bold backgrounds, and `warning.inverse` on warning.
- Icons get a neutral background for state, not a color token.
- Use tokens for dark mode; do not map values by hand.
- Do not build on beta foundations such as radius.
- Verify 4.5:1 for body text and 3:1 for large text and essential UI, per theme.

---

## Quick-Start Checklist

- [ ] Correct role chosen (`brand`, `danger`, `warning`, …) before any value
- [ ] Correct property segment chosen (`background`, `text`, `border`, `icon`)
- [ ] Emphasis and state segments included in the token name
- [ ] Inverse tokens used on bold backgrounds
- [ ] Accent colors not used to carry semantic meaning
- [ ] Icon states use a neutral background, not an invented color
- [ ] Light and dark both verified, with tokens driving the values
- [ ] Contrast checked: 4.5:1 body text, 3:1 large text and essential UI
- [ ] Atlaskit primitives used for interactive components
- [ ] No dependency on beta foundations such as radius

---

## Sources

- Atlassian Design System — https://atlassian.design/
- Foundations index — https://atlassian.design/foundations/
- Color foundations and token anatomy — https://atlassian.design/foundations/color
- Color palettes (hex and RGBa) — https://atlassian.design/foundations/color/color-palette
- Accessibility — https://atlassian.design/foundations/accessibility
- All-tokens reference — https://atlassian.design/components/tokens/all-tokens
- Atlaskit — https://atlaskit.atlassian.com
- Brand kit — https://orangedam.atlassian.com/
