# 2. Utilities and States

Focused reference for **tailwindcss-plus**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Utilities and States

- Use classes: flexbox, grid, spacing (`p-4`, `m-2`), typography, colors, effects.
- Variants: `hover:`, `focus:`, `group-hover:`, `dark:`, `max-*`, `min-[…]:`.
- Arbitrary values keep full CSS power: `w-[calc(100%-1rem)]`, `grid-cols-[repeat(auto-fit,minmax(...))]`.

```html
<!-- theme tokens, group variants and arbitrary values side by side -->
<div class="grid grid-cols-[200px,1fr] gap-[117px] bg-[#0af] md:grid-cols-3 md:gap-8">
  <article class="group rounded-xl border border-slate-200 bg-surface p-4 shadow-sm transition hover:shadow-md">
    <h3 class="text-lg font-semibold text-slate-900 group-hover:text-brand">Usage</h3>
    <p class="mt-1 text-sm text-slate-500">1,204 requests this week.</p>
    <span class="mt-3 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">+12%</span>
  </article>
</div>
```
