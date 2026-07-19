# 8. Common Pitfalls

Focused reference for **sass**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 8. Common Pitfalls

- Using legacy `@import` (global namespace pollution) instead of `@use`/`@forward`.
- Over-nesting/`@extend` chains that balloon specificity and output size.
- Mixing unit arithmetic without `strip-unit`/math helpers.
- Assuming media-query + variable values are interpolated everywhere (works in Dart Sass).

## 4. Mixins and Include

- Reusable styles: @mixin card($radius: 4px) { ... } consumed with @include card().
- Content blocks: @content inside mixins for slot-style overriding.
- Conditional inline if()/@if + loops (@for, @each, @while) for generating utility classes.

## 6. Modules and Partials

- _partial.scss files get imported into another file with @use 'file' (namespaced).
- @use 'colors' as *; exposes members locally; @forward re-exports across a barrel.
- Avoid legacy @import: it injects globally, causes name collisions and duplicates.
