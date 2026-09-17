# Overview

Focused reference for **astryx.atmeta.com**, excerpted from SKILL.md. The skill file remains the canonical guide.


# Astryx system overview

Astryx is presented by its official site as an open-source, customizable design
system. The live product exposes documentation, component examples, templates,
theme selection, and a playground. Use those surfaces as the current source of
truth for the component API and the chosen theme.

## System layers

| Layer | Responsibility | Guidance |
| --- | --- | --- |
| Tokens | Semantic values for color, type, spacing, shape, focus, and motion | Consume semantic variables; avoid raw values in component rules. |
| Themes | Map token roles to a visual appearance | Choose one theme for a page or clearly scoped surface. |
| Components | Encapsulate UI structure, behavior, variants, and states | Use the installed package's supported API. |
| Templates | Compose components into larger page patterns | Adapt content and layout without bypassing component semantics. |

## What is confirmed

- The page identifies itself as **Astryx Design System** and describes the
  system as open source, customizable, and agent ready.
- The page's primary navigation includes Docs, Components, Templates, Themes,
  and Playground.
- The rendered page sets `data-astryx-theme="astryx"` and offers a dark-mode
  control.
- The published stylesheet defines semantic CSS custom properties and uses
  theme-scoped values. The default base token snapshot is recorded in
  [`tokens.css`](./tokens.css).
- Published CSS contains scoped Butter and Stone theme definitions. Theme
  artwork is also named for Butter, Gothic, Matcha, Neutral, Stone, and Y2K.
  These are theme options—not evidence that every option shares the same
  tokens.

## Source of truth

1. Check the project's installed Astryx version and integration.
2. Consult the matching [official documentation](https://astryx.atmeta.com/docs/getting-started).
3. Use the [component catalogue](https://astryx.atmeta.com/components) for
   component APIs and states.
4. Use the [theme gallery](https://astryx.atmeta.com/themes) to choose a visual
   theme.
5. Use the [official repository](https://github.com/facebook/astryx) for
   package, release, and implementation details.

Do not infer component names, install commands, or supported properties from
compiled page class names. Do not use the CSS snapshot in this folder as a
substitute for the current package.

## Practical fit

Use Astryx when the project wants a reusable component system with coherent
theme customization. It is a poor fit for a one-off mockup if integration cost
exceeds the value of reuse, or when a product requirement mandates another
design system. In either case, preserve the project's established conventions.
