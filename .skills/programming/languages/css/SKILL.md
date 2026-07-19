---
name: "css"
description: "CSS — Cascading Style Sheets for styling web documents with selectors, layout, responsive design, and performance."
tags:
  - "programming"
  - "language"
  - "css"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting CSS in a project."
prerequisites:
  - "Basic familiarity with CSS and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "components/bootstrap/SKILL.md"
  - "js/emotion/SKILL.md"
  - "components/bulma/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# CSS

CSS (Cascading Style Sheets) controls the **presentation layer of the web** — from color and typography to layout, animation, and responsive design.

## When to use

Use when implementing, configuring, evaluating, or troubleshooting CSS in a project.

## Prerequisites

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- !important/high-specificity sneak attacks making overrides painful
- position: absolute stacks without room; collapsing margins without overflow context
- Neglecting prefers-reduced-motion/color contrast/accessibility
- Non-performant animations (animating width/height instead of transforms)
- Layout with Grid/Flexbox, spacing with logical properties + custom-property tokens
- Mobile-first, responsive via clamp() where possible; container queries for component context
- Keep specificity flat and low; rely on the cascade and layers
- Design for motion, dark, and reduced-motion variants from the start

## Focus areas

- 1. Box Model and Units
- 2. Layout Systems
- 3. Selectors and Specificity
- 4. Responsive Design
- 5. Typography, Colors, and Effects
- 6. Performance and Maintainability
- 7. Modern Practices and Tools
- 8. Common Pitfalls

## General Rules of Thumb

- Use Grid/Flexbox for layout and logical properties with custom-property tokens for spacing.
- Prefer mobile-first responsive rules, `clamp()` for fluid values, and container queries for component context.
- Keep specificity low; use cascade layers instead of escalating selector weight.
- Account for dark mode, contrast, keyboard focus, and reduced-motion preferences.

## Quick-Start Checklist

- [ ] Establish box sizing, spacing, and typography in a reset/base layer.
- [ ] Define color, spacing, radius, and type tokens as custom properties.
- [ ] Build responsive layouts with Grid/Flexbox and media/container queries.
- [ ] Verify contrast, visible focus, semantic markup, and target sizes.
- [ ] Check reduced motion, dark theme, and animation performance.
- [ ] Run Stylelint and inspect representative browser/performance results.

## Detailed references

- [1. Box Model and Units](./references/box-model-and-units.md)
- [2. Layout Systems](./references/layout-systems.md)
- [7. Modern Practices and Tools](./references/modern-practices-and-tools.md)
- [3. Selectors and Specificity](./references/selectors-and-specificity.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
