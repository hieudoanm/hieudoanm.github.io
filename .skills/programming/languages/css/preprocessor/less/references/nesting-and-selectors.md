# 3. Nesting and Selectors

Focused reference for **less**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Nesting and Selectors

- Nest selectors for readability; `&` refers to the current selector: `.nav { &-item { ... } &--active { ... } }`.
- Combine with media queries nested inside rules: `.card { @media (max-width: 600px) { ... } }`.
- Keep nesting shallow (≤ 3 levels) to limit specificity.

```less
.nav {
  display: flex;
  gap: 0.5rem;

  &.is-open {
    display: block;
  }

  &-item {
    padding: 0.25rem 0.5rem;
  }

  &--stacked {
    flex-direction: column;
  }
}
```

```less
.card {
  padding: 1.5rem;

  @media (max-width: 600px) {
    padding: 1rem;
  }
}
```
