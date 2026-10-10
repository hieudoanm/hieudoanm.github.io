# 6. Common Pitfalls

Focused reference for **tailwindcss-plus**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Common Pitfalls

- Mixing v3 config needs with v4 CSS-first (double configs confuse).
- Overuse of arbitrary values killing the design-token system.
- Forgetting `@layer` when overriding base styles with custom utilities.

```html
<!-- Bad: arbitrary values everywhere erodes the token system -->
<div class="mt-[13px] rounded-[7px] text-[#6d28d9]">Overdue</div>

<!-- Good: theme tokens, then the registered custom utility -->
<div class="mt-4 rounded-xl text-brand card-surface">Overdue</div>
```
