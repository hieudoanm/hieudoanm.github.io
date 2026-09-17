# Tailwindcss: 5. Performance and Best Practices

## Source guidance

This example applies the **5. Performance and Best Practices** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Do not use `@apply` inside the same file you write utilities for (`Layers` workaround) — apply it only in component layer.
- Avoid dynamic class strings like `text-${color}` — Tailwind can't inline-extract them (use full class names or safelist).
- Prefer small `@layer` for overrides; rely on JIT scan accuracy.

## Example

```tsx
// Bad: the JIT scanner cannot see an interpolated class, so nothing is emitted
const bad = <p className={`text-${status}-500`}>Overdue</p>;

// Good: every full class name exists as a literal string in the file
const statusTextColor = {
  active: 'text-emerald-500',
  overdue: 'text-rose-500',
} as const satisfies Record<Status, string>;

const good = <p className={statusTextColor[status]}>Overdue</p>;
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for tailwindcss.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
