---
name: "emotion"
description: "Emotion — CSS-in-JS library with tiny runtime, flexible styling APIs (css, styled, keyframes), and compatibility with React and vanilla JS."
tags:
  - "programming"
  - "language"
  - "css"
  - "js"
  - "emotion"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Emotion in a project."
prerequisites:
  - "Basic familiarity with CSS and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../styled-components/SKILL.md"
  - "../stylex/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Emotion

Emotion is a **CSS-in-JS library** with a **tiny runtime footprint**, offering both a **styled** API and a powerful **css** function, for React and plain JavaScript applications.

## When to use

Use when implementing, configuring, evaluating, or troubleshooting Emotion in a project.

## Prerequisites

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- Server/client class mismatch with runtime CSS — use extraction on SSR
- Passing internal prop through styled without shouldForwardProp
- Mixing Emotion and other CSS-in-JS (duplicate cache/injectGlobal)
- Pick one API per component (css for fragments, styled for component primitives)
- Keep dynamic styles through props, not string concatenation, for caching benefit
- Extract critical CSS on SSR
- [ ] Install and configure Emotion (@emotion/react/@emotion/styled + optional babel plugin)
- [ ] Build components with styled/css

## Focus areas

- 1. Setup and Babel
- 2. The `css` API
- 3. The `styled` API
- 4. Global Styles and Keyframes
- 5. Theming
- 6. SSR and Performance
- Common Pitfalls

## General Rules of Thumb

- Choose one API per component: `css` for fragments, `styled` for reusable primitives.
- Pass dynamic values as props rather than concatenating CSS strings.
- Extract critical styles on the server and keep cache configuration consistent between server and client.

## Quick-Start Checklist

- [ ] Install and configure `@emotion/react` and `@emotion/styled`; add the optional Babel plugin if useful.
- [ ] Build components with `styled` or `css`, and add `<Global>` for base styles when needed.
- [ ] Define a theme and use `<ThemeProvider>` where shared design tokens are needed.
- [ ] Configure SSR extraction or explicitly verify the runtime-injection approach.
- [ ] Check that server rendering and client hydration produce stable classes.

## Detailed references

- [Common Pitfalls](./references/common-pitfalls.md)
- [1. Setup and Babel](./references/setup-and-babel.md)
- [6. SSR and Performance](./references/ssr-and-performance.md)
- [2. The `css` API](./references/the-css-api.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
