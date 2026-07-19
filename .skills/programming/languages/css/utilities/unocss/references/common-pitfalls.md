# 6. Common Pitfalls

Focused reference for **unocss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Common Pitfalls

- Missing `content` configuration → icons/classes not generated for dynamic markup.
- Preset conflicts when mixing `preset-uno` and `preset-wind` variants.
- Dynamic class names (`text-${color}`) can't be extracted — use safelist.

```ts
// Bad: the extractor never sees `text-success` or `text-danger`
const tone = (status: string) => `text-${status}`;

// Good: map to full class names the extractor can find
const tone = { success: 'text-success', danger: 'text-danger' } as const;
```
