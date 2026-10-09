---
name: carbon-design-system
description: Build enterprise, data-dense web UI on IBM's Carbon design system instead of inventing tokens. Covers the four themes, the role-based token layer, productive vs editorial typography, layer-based elevation, the 2x Grid, Carbon package wiring for React and Web Components, accessibility, and where to declare divergence. Use when building or reviewing dashboards, admin consoles, tables, forms, settings, or any app that must sit inside IBM Cloud or a Carbon-flavoured surface.
---

# Carbon Design System (IBM)

Carbon is IBM's open-source, enterprise-first design system and the software
expression of the IBM Design Language. It is the right default when the work is
**enterprise software**: dashboards, consoles, tables, forms, settings — surfaces
where density, clarity and predictable behaviour matter more than personality.

**You buy:** four ready-made themes, a role-based token layer, a component library
shipped as both React and Web Components, a documented 2x Grid, and accessibility
that is already solved for the hard widgets (data table, combo box, tabs).

**You pay:** you look like Carbon, four themes is genuinely four, and its token
layer is Sass-flavoured rather than a modern design-token pipeline.

**Version note:** the docs carry "last updated" dates and the site actively signals
the next major and Carbon MCP. Re-read the foundations pages before pinning a
version; this file describes the model, not a lockfile.

---

## 1. Core Principles

- **Themes change values, never roles.** A token's _role_ is fixed across all four
  themes; only its _value_ changes. Anything else means you hard-coded a hex.
- **Dense is the default.** Carbon is sized for scanning tables and forms at
  enterprise density. If your layout looks empty, the fix is hierarchy, not padding.
- **Elevation is a layer token.** Stacked shadows that fake depth are a bug; use
  `$layer-01…$layer-accent-01`.
- **Productive type is the UI voice.** Editorial styles are for reading, not for
  buttons and tables.
- **Reach for the component, not the markup.** Keyboard and focus behaviour in
  `DataTable`, `ComboBox`, `ContentSwitcher`, `Tabs` is not worth re-deriving.
- **The token layer is the asset.** The React package is disposable; the resolved
  roles and thresholds are what you actually inherit.

---

## 2. Themes and the Token Model

| Theme   | Use                                              |
| ------- | ------------------------------------------------ |
| `white` | Default. Light, highest contrast, print-friendly |
| `g10`   | Light with a light-gray ground                   |
| `g90`   | Dark with a dark-gray ground                     |
| `g100`  | Highest-contrast dark                            |

Sass tokens use a `$` prefix (`$layer-01`, `$interactive`, `$field-01`) and are
grouped into four categories: **color**, **spacing**, **typography**, **global**.
Global tokens hold the layer and component-level values.

Sass tokens compile to `--cds-*` custom properties, so the fastest way to find the
real name of a value is to read the compiled CSS rather than guess.

Customise by overriding token values with the Sass module `with` clause — never by
patching component internals:

```scss
@use '@carbon/react' with (
  $background: #ffffff,
  $layer-01: #f4f4f4
);
```

The authoritative list lives in `@carbon/themes` (`white.ts`, `g10.js`, `g90.ts`,
`g100.ts`). Check that package before quoting a token in a design doc.

---

## 3. Color Is Roles Over Values

This is the single most useful table on the Carbon site — it shows the same roles
holding across a light and a dark theme:

| Token             | Role              | White    | Gray 100 |
| ----------------- | ----------------- | -------- | -------- |
| `$background`     | Page background   | White    | Gray 100 |
| `$text-primary`   | Primary text      | Gray 100 | Gray 10  |
| `$text-secondary` | Label / secondary | Gray 70  | Gray 30  |
| `$border-strong`  | Strong border     | Gray 50  | Gray 60  |
| `$icon-primary`   | Primary icon      | Gray 100 | Gray 10  |
| `$field-01`       | Form field ground | Gray 10  | Gray 90  |

- `$interactive` resolves through to a palette token such as `$blue-60` in the
  default theme — role in, value out.
- Reference the role in components. `background: $background` themes itself;
  `background: #ffffff` does not.
- Interactive, support, success, warning, error, and disabled each have their own
  layer and token group. Reach for those, not for `gray-*`.

---

## 4. Typography Has Four Categories

| Category     | Use                                                   |
| ------------ | ----------------------------------------------------- |
| `productive` | UI: tables, forms, labels, buttons. The default voice |
| `editorial`  | Long-form reading, marketing and documentation pages  |
| `universal`  | Works in either context — headings across products    |
| `additional` | Supporting roles: code, captions, legal               |

IBM Plex Sans is the productive workhorse, IBM Plex Serif the editorial face, IBM
Plex Mono the additional face. Productive styles are deliberately tighter and
smaller than editorial ones; that difference is the reason a Carbon table looks
like a tool and not a document.

Verify exact sizes and tracking in the typography foundation before hard-coding
them — do not carry sizes across from another system.

---

## 5. Spacing and the 2x Grid

- Spacing is a **4px base with 2px half-steps**. Choose from the `$spacing-*`
  scale; do not invent a value.
- The 2x Grid is a 16-column layout at desktop, 8 at the intermediate breakpoint,
  4 at small, with a 16px gutter and 16px margin.
- Prefer the grid's span utilities over percentage widths or arbitrary flex ratios.
- Icons, checkboxes, and inline controls align to the same 4px rhythm as text — if
  something sits half a step off, it is nearly always a spacing-scale miss.

Read the current `$spacing-*` ladder out of `@carbon/themes` rather than reciting
step numbers from memory; the scale has grown increments over time.

---

## 6. Elevation Is a Layer, Not a Shadow

Carbon models surfaces as layers rather than as a pile of shadows:

```scss
.card {
  background: $layer-01;
}

.card--raised {
  background: $layer-accent-01;
}
```

- `$layer-01` … nested containers; `$layer-accent-01` for the raised/popover plane.
- A container that needs a shadow is usually a `$layer-accent` surface plus a
  border. Reach for the layer first.
- Overlays (`modal`, `popover`, `toggletip`) sit on the accent layer and own the
  focus indicator.

---

## 7. Implementation: Which Package

| Need               | Package                          |
| ------------------ | -------------------------------- |
| React components   | `@carbon/react`                  |
| Framework-agnostic | `@carbon/web-components`         |
| Themes and tokens  | `@carbon/themes`                 |
| Grid and layout    | `@carbon/layout`, `@carbon/grid` |
| Icons              | `@carbon/icons-react`            |
| Charts             | `@carbon/charts`                 |

Pick one component layer and stay in it. Carbon publishes both React and Web
Components from the same design source; mixing them in one surface produces two
focus systems and two token namespaces fighting each other.

For an existing React codebase, `@carbon/react` is the low-friction choice. For a
design-system-agnostic or framework-portable embed, use Web Components.

---

## 8. Accessibility

- Carbon components ship keyboard interaction, focus management, and ARIA for the
  complex widgets. Prefer them to native elements plus your own key handling.
- WCAG AA is the baseline Carbon is held to; do not ship a variant that regresses it.
- Focus indicators are part of the layer system — never `outline: none` without a
  replacement you have checked against a dark theme.
- Never encode state in color alone. Status needs an icon, a label, or both.
- Disabled is not the same as hidden. Removing a control from the layout changes
  what the user knows the system can do.
- Test all four themes, not just white. Contrast regressions hide in `g90`.

---

## 9. Declaring Divergence

Divergence is allowed and should be written down. When you depart from Carbon:

1. State what you changed and why (product requirement, not taste).
2. Do it by adding or overriding a **token**, so the change is theme-aware.
3. Keep the deviation in one file. Divergence scattered across components is
   indistinguishable from having no design system.
4. Re-check contrast in all four themes.

If you find yourself overriding three or more tokens to make one component look
different, the honest conclusion is that this surface is not Carbon.

---

## General Rules of Thumb

- Reference roles, never palette values or hex codes, in components.
- Choose the theme once, at the app shell, and let it cascade.
- Productive type for anything the user operates; editorial only for reading.
- Spacing from the scale, layout from the grid, depth from the layers.
- Use the component library for anything with keyboard behaviour.
- One component layer per surface — React or Web Components, not both.
- Test every theme before calling a screen done.
- Write down each divergence, with the token that carries it.

---

## Quick-Start Checklist

- [ ] `@carbon/react` (or Web Components) installed; the other layer not mixed in
- [ ] Theme selected at the shell, from `white` / `g10` / `g90` / `g100`
- [ ] No hex codes or `$blue-*` palette references inside components
- [ ] `$background`, `$text-primary`, `$layer-01` used instead of ad-hoc colors
- [ ] Productive type styles throughout the UI, editorial reserved for prose
- [ ] Spacing and grid spans from the system, not hard-coded percentages
- [ ] Keyboard paths exercised for every interactive element
- [ ] All four themes checked for contrast and focus visibility
- [ ] Every divergence recorded with its token

---

## Sources

- Carbon docs — https://carbondesignsystem.com/
- Themes (verified for this file) — https://carbondesignsystem.com/building-blocks/foundations/themes
- Foundations index — https://carbondesignsystem.com/building-blocks/foundations
- IBM Design Language — https://ibm.com/design/language
- Token source of truth — https://github.com/carbon-design-system/carbon/tree/main/packages/themes
