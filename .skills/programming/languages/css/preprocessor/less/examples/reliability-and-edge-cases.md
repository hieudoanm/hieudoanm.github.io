# Less: 6. Common Pitfalls

## Source guidance

This example applies the **6. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Over-nesting causing high-specificity selectors that remove flexibility.
- Forgetting variable lazy-evaluation order (evaluated at last use).
- Mixing units in operations without conversion utilities.
- Compiling in production — always precompile before deploy; in-browser mode is dev-only.

## Example

```less
// Over-nesting: .card .card__title .card__icon is harder to override
.card {
  .card__title {
    .card__icon {
      color: @brand;
    }
  }
}

// Flat BEM keeps specificity at one class
.card__icon {
  color: @brand;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for less.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
