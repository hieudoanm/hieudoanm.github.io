# 5. Performance and Best Practices

Focused reference for **tailwindcss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Performance and Best Practices

- Do not use `@apply` inside the same file you write utilities for (`Layers` workaround) — apply it only in component layer.
- Avoid dynamic class strings like `text-${color}` — Tailwind can't inline-extract them (use full class names or safelist).
- Prefer small `@layer` for overrides; rely on JIT scan accuracy.

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
