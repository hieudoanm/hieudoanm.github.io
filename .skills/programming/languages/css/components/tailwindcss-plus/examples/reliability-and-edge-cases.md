# Tailwindcss Plus: 5. Performance

## Source guidance

This example applies the **5. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- JIT: only used utilities are generated → tiny output vs old full builds.
- Use `@apply`/`@utility` to compose; keep purging active in production builds.

## Example

```css
/* @utility registers a first-class utility, variants work on it for free */
@utility card-surface {
  border-radius: 0.75rem;
  border: 1px solid color-mix(in oklab, var(--color-slate-200) 80%, transparent);
  background: var(--color-surface);
  box-shadow: 0 1px 2px color-mix(in oklab, var(--color-slate-900) 8%, transparent);
}

@utility text-balance {
  text-wrap: balance;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for tailwindcss-plus.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
