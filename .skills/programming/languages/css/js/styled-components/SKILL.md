---
name: "styled-components"
description: "styled-components — CSS-in-JS for React with tagged template literals, theme support, and automatic critical CSS extraction."
tags:
  - "programming"
  - "language"
  - "css"
  - "js"
  - "styled"
  - "components"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting styled-components in a project."
prerequisites:
  - "Basic familiarity with CSS and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../emotion/SKILL.md"
  - "../stylex/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Styled Components

styled-components is the **styled-first CSS-in-JS library for React**, building components from tagged template literals and **automatically extracting critical CSS** at runtime.

## When to use

Use when implementing, configuring, evaluating, or troubleshooting styled-components in a project.

## Prerequisites

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- Passing internal props into DOM (shouldForwardProp to filter)
- Server/client class mismatch when SSR extraction isn't wired
- Compute functions referencing props wrongly (function form uses returns)
- Use styled components for containers and simple primitives; css fragments from Emotion's sibling — but stick to one library
- Keep prop-derived styles to a minimum for performance
- Wire SSR extraction for any server-rendered app
- [ ] Install and add the Babel plugin for development ergonomics
- [ ] Build components with styled.* and dynamic props

## Focus areas

- 1. Setup
- 2. Creating Components
- 3. Theming
- 4. Global Styles and Animations
- 5. SSR and Extraction
- 6. Performance Notes
- Common Pitfalls

## General Rules of Thumb

- Use styled components for reusable primitives and keep prop-derived styles bounded.
- Filter styling-only props so they do not leak onto DOM elements.
- Configure server-side style extraction for rendered applications and keep one sheet per request.

## Quick-Start Checklist

- [ ] Install styled-components and configure the Babel plugin if the project uses it.
- [ ] Build components with `styled.*`; introduce typed theme values through `<ThemeProvider>`.
- [ ] Add `createGlobalStyle` and `keyframes` only where they clarify shared behavior.
- [ ] Configure SSR extraction and client hydration when applicable.
- [ ] Verify DOM props are filtered and server/client classes match.

## Detailed references

- [Common Pitfalls](./references/common-pitfalls.md)
- [2. Creating Components](./references/creating-components.md)
- [6. Performance Notes](./references/performance-notes.md)
- [1. Setup](./references/setup.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
