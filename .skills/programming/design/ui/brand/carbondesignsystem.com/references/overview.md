# Overview

Focused reference for **carbon-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
