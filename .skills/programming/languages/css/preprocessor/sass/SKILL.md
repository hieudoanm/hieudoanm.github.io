---
name: "sass"
description: "Sass — most mature CSS preprocessor with SCSS syntax, variables, nesting, mixins, functions, and modules, compiled via Dart Sass."
tags:
  - "programming"
  - "language"
  - "css"
  - "preprocessor"
  - "sass"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Sass in a project."
prerequisites:
  - "Basic familiarity with CSS and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../less/SKILL.md"
  - "../../SKILL.md"
  - "../../components/bootstrap/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Sass

Sass is the **most mature and widely used CSS preprocessor**, extending CSS with **variables, nesting, partials, mixins, @use/modules, and math functions**, compiled to plain CSS by **Dart Sass** (the only official implementation).

## When to use

Use when implementing, configuring, evaluating, or troubleshooting Sass in a project.

## Prerequisites

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- Using legacy @import (global namespace pollution) instead of @use/@forward
- Over-nesting/@extend chains that balloon specificity and output size
- Mixing unit arithmetic without strip-unit/math helpers
- Assuming media-query + variable values are interpolated everywhere (works in Dart Sass)
- Structure: _variables.scss, _mixins.scss, _functions.scss, component partials, one barrel @use
- Prefer mixins for reuse; keep nesting flat; use @use/@forward only
- Generate utilities/responsive classes with loops + maps
- Always precompile via the build tool; never ship sass in the browser

## Focus areas

- 1. Installation and Setup
- 2. Syntax: SCSS vs Sass
- 3. Variables, Maps, and Functions
- 4. Mixins and Include
- 5. Nesting, `&`, and Extending
- 6. Modules and Partials
- 7. Media Queries and Breakpoints
- 8. Common Pitfalls

## General Rules of Thumb

- Organize shared variables, mixins, and functions as modules and expose them through `@use`/`@forward`.
- Keep nesting and `@extend` usage shallow to control specificity and generated CSS size.
- Use maps and mixins for repeated responsive patterns; compile Sass before delivery.

## Quick-Start Checklist

- [ ] Install Dart Sass and connect it to the project's bundler or CLI.
- [ ] Organize tokens, mixins, functions, and component modules.
- [ ] Replace deprecated `@import` with `@use` and `@forward`.
- [ ] Define breakpoints in a map and use a consistent mobile-first mixin.
- [ ] Inspect compiled CSS for output size and selector specificity.
- [ ] Run the project's style lint/format check.

## Detailed references

- [8. Common Pitfalls](./references/common-pitfalls.md)
- [1. Installation and Setup](./references/installation-and-setup.md)
- [2. Syntax: SCSS vs Sass](./references/syntax-scss-vs-sass.md)
- [3. Variables, Maps, and Functions](./references/variables-maps-and-functions.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
