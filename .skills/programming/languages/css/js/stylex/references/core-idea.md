# 1. Core Idea

Focused reference for **stylex**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Idea

- Define styles as **typed objects** with `create({ ... })` and use `stylex.props(styles.x)`.
- Compiler generates **atomic CSS classes** at build — avoided runtime class merging.
- Only used classes are emitted; duplication across components collapses automatically.
- Deterministic ordering via compiler, resolving specificity conflicts predictably.

## 4. Theming and Tokens

- stylex.defineVars({ colorBrand: 'red' }) returns CSS-variable-backed tokens.
- Use stylex.themeable(tokens, theme) per component for token mapping.
- Combine tokens and p values for full styles.

## 5. Component Patterns

- Compose conditional styles with stylex.props(...) — never concatenate strings.
- createStyled not required; typically components create styles once at module scope.
- Prop-typed design: map variant: 'primary' | 'ghost' to style objects at call site.
