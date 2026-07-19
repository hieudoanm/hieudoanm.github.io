---
name: "astryx-design-system"
description: "Build and customize interfaces with Astryx, an open-source, themeable design system with reusable components, design tokens, themes, and templates. Use when creating or adapting UI with Astryx or matching the live Astryx design-system site."
tags:
  - "programming"
  - "design"
  - "brand"
  - "astryx"
  - "atmeta"
  - "design-system"
when_to_use: "Use when building or reviewing UI with Astryx components and tokens, creating a custom Astryx theme, or using the Astryx site as a design reference."
prerequisites:
  - "A defined UI goal and the target project's framework and constraints."
  - "Familiarity with semantic HTML, CSS, and accessible interaction patterns."
related_skills:
  - "../m3.material.io/SKILL.md"
  - "../carbondesignsystem.com/SKILL.md"
avoid_when:
  - "When the brief does not call for this design system or philosophy; follow the project’s existing design language instead."
status: "active"
---

# Astryx Design System

Astryx is an open-source, customizable design system with reusable UI
components, semantic design tokens, theme variants, templates, and a
playground. Treat it as a system to configure and compose—not a single fixed
visual style. The active theme controls typography, color, shape, and component
feel; preserve those tokens instead of hard-coding values into individual
components.

## Provenance and confidence

This guide is based on the public Astryx site and its published stylesheets,
checked on 2026-10-10:

- **Verified from the live site:** Astryx describes itself as an open-source,
  customizable design system; its navigation exposes Docs, Components,
  Templates, Themes, and Playground; the current page uses
  `data-astryx-theme="astryx"` and supports light/dark mode.
- **Verified from the published base stylesheet:** semantic color, typography,
  spacing, radius, motion, focus, and shadow tokens. These values are
  summarized in [`references/tokens.css`](./references/tokens.css).
- **Verified from theme stylesheets:** theme-scoped overrides exist. The
  published CSS includes named variants such as Butter and Stone; do not assume
  their values or appearance apply to the default Astryx theme.
- **Not verified here:** the full supported component API, package versions,
  install commands, or every theme's token values. Use the current official
  documentation and repository for implementation-specific details.

Official sources:

- [Astryx Design System](https://astryx.atmeta.com/)
- [Astryx documentation](https://astryx.atmeta.com/docs/getting-started)
- [Astryx components](https://astryx.atmeta.com/components)
- [Astryx themes](https://astryx.atmeta.com/themes)
- [Astryx source repository](https://github.com/facebook/astryx)

## Mental model

Astryx has four layers:

1. **Tokens** define the semantic vocabulary—surface, text, accent, status,
   spacing, typography, shape, focus, and motion.
2. **Themes** map that vocabulary to a visual identity. Keep a theme consistent
   across a page or explicitly scope a theme boundary.
3. **Components** implement familiar interaction patterns and should consume
   tokens rather than inventing their own visual values.
4. **Templates and composition** combine components into larger page patterns.

For an existing app, first identify the installed Astryx version and theme
boundary. Do not copy generated class names from the live page: they are build
artifacts, not a stable customization API.

## Design principles

- **Use semantic tokens.** Choose a role such as `color-text-secondary` or
  `color-background-surface`; avoid scattering raw hex values through UI code.
- **Theme at the boundary.** Set the intended theme once on the appropriate
  root or container, and let components inherit it.
- **Compose before recreating.** Prefer the closest existing component and
  supported variant; add custom styling only where the system has no suitable
  primitive.
- **Treat light and dark as first-class.** Use paired theme-aware values and
  verify contrast, borders, status colors, and focus indicators in both modes.
- **Keep states semantic.** Hover, pressed, selected, disabled, success, warning,
  and error need distinct, perceivable treatments; do not communicate state
  through color alone.
- **Preserve accessibility.** Use native semantics, keyboard operation, visible
  focus, reduced-motion support, and WCAG AA contrast for text and controls.
- **Customize intentionally.** Theme variants are an expected capability; avoid
  mixing arbitrary theme values on a single component or screen.

## Recommended workflow

1. **Inspect the project.** Find its Astryx package/version, theme setup,
   existing wrappers, component conventions, and relevant tests.
2. **Choose the visual target.** Decide whether to use the default Astryx theme,
   an existing named theme, or a project-owned theme. Confirm this against the
   product brief rather than guessing from the directory name.
3. **Find the intended primitive.** Check the current component docs and
   examples. Confirm supported props, variants, states, and accessibility
   behavior for the installed version.
4. **Compose with tokens.** Use the smallest set of components that satisfies
   the task. Keep custom rules at the theme or component boundary.
5. **Check responsive and interactive behavior.** Test narrow layouts,
   keyboard-only use, focus visibility, loading/empty/error states, and light
   and dark appearances.
6. **Validate the implementation.** Run the project’s formatter, type check,
   tests, and build. Compare against the actual target theme, not a guessed
   approximation.

## Theme and token usage

The live page marks its active theme with `data-astryx-theme`. Theme values are
scoped, and theme-specific CSS overrides the base defaults. Follow the
integration API documented for the project's installed version; do not assume
that manually setting an HTML attribute alone loads a theme.

The base token sample is in [`references/tokens.css`](./references/tokens.css).
It is a reference for the published default base layer, not a replacement for
Astryx's package or a complete dump of every theme. Keep token names as CSS
custom properties and override them only through documented theme mechanisms.

## Common mistakes

- Treating Astryx as one fixed brand palette even though it supports themes.
- Hard-coding observed colors or generated CSS class names into components.
- Mixing tokens from different themes without a clear, intentional boundary.
- Rebuilding an existing button, input, dialog, or navigation pattern from
  scratch before checking the component library.
- Assuming a dark-mode page merely inverts the light palette.
- Omitting keyboard, focus, reduced-motion, empty, error, or disabled states.
- Copying a live example without checking the installed Astryx API/version.

## Review checklist

- [ ] The project's installed Astryx version and chosen theme are known.
- [ ] Components use documented APIs and semantic tokens.
- [ ] No generated class names or unverified token values are relied on.
- [ ] Light and dark modes have been reviewed.
- [ ] Responsive layout and component states have been checked.
- [ ] Keyboard access, visible focus, semantics, and contrast are adequate.
- [ ] Any custom styles are scoped and do not break theme inheritance.
- [ ] The project’s type checks, tests, and build pass.

## Supporting files

- [`references/components.md`](./references/components.md) — composition and
  accessible state patterns.
- [`references/tokens.css`](./references/tokens.css) — verified base token
  snapshot with theme caveats.
- [`references/overview.md`](./references/overview.md) — system anatomy and
  source-of-truth map.
- [`references/workflow-notes.md`](./references/workflow-notes.md) — focused
  implementation and review workflow.
- [`assets/template.html`](./assets/template.html) — standalone token-driven
  visual reference, not a replacement for the Astryx package.
- [`examples/basic-usage.md`](./examples/basic-usage.md) — worked
  theme-aware component example.
