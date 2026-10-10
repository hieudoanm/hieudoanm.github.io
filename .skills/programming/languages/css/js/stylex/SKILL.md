---
name: "stylex"
description: "StyleX — compile-time CSS-in-JS from Meta (previously the internal Facebook system), generating atomic CSS with minimal runtime."
tags:
  - "programming"
  - "language"
  - "css"
  - "js"
  - "stylex"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting StyleX in a project."
prerequisites:
  - "Basic familiarity with CSS and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../emotion/SKILL.md"
  - "../styled-components/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Stylex

StyleX is **Meta's CSS-in-JS solution (open-sourced as @stylexjs)** that **compiles atomic CSS at build time**, combining **fast atomic styles with no runtime**, full TypeScript types, and colocated styling with React.

## When to use

Use when implementing, configuring, evaluating, or troubleshooting StyleX in a project.

## Prerequisites

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- Forgetting the Babel/Vite plugin → styles won't transform and break
- Conditional strings className={condition ? 'x' : 'y'} instead of stylex.props
- Dynamic key lookups (tokens[color] as object) lose type safety
- Colocate styles; keep them typed and token-driven
- Compose variants via stylex.props conditionals, never template strings
- Define tokens with defineVars/themeable for theming
- [ ] Add dependencies + Babel/Vite plugin config
- [ ] Use stylex.create + stylex.props in components

## Focus areas

- 1. Core Idea
- 2. Setup and Integration
- 3. Stylex API
- 4. Theming and Tokens
- 5. Component Patterns
- 6. Performance and Trade-offs
- Common Pitfalls

## General Rules of Thumb

- Colocate styles with components and keep them typed and token-driven.
- Compose conditional variants through `stylex.props`, not runtime class-name strings.
- Define themeable variables centrally and keep style inputs statically analyzable.

## Quick-Start Checklist

- [ ] Add StyleX and configure its Babel/Vite transform for the project build.
- [ ] Define styles with `stylex.create` and apply them through `stylex.props`.
- [ ] Create shared variables/tokens for colors, spacing, and typography.
- [ ] Implement variants with statically known conditions and values.
- [ ] Verify the build emits CSS and that server/client class output stays deterministic.

## Detailed references

- [Common Pitfalls](./references/common-pitfalls.md)
- [1. Core Idea](./references/core-idea.md)
- [6. Performance and Trade-offs](./references/performance-and-trade-offs.md)
- [2. Setup and Integration](./references/setup-and-integration.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
