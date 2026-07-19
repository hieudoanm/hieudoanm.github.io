# 5. Performance

Focused reference for **tailwindcss-plus**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Performance

- JIT: only used utilities are generated → tiny output vs old full builds.
- Use `@apply`/`@utility` to compose; keep purging active in production builds.

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
