# 2. Writing Utilities

Focused reference for **tailwindcss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Writing Utilities

- Layout: `flex`, `grid`, `p-*`, `m-*`, `w-*`, `h-*`, `gap-*`.
- Styling: `text-*` (color/size), `bg-*`, `border-*`, `rounded-*`, `shadow-*`.
- Variants: `hover:`, `focus:`, `active:`, `disabled:`, `responsive:` (`sm:`, `md:`, `lg:`, `xl`), dark mode (`dark:`).
- Arbitrary values: `top-[117px]`, `grid-cols-[200px,1fr]`, `bg-[#0af]`.

```html
<!-- mobile-first utilities, variants and arbitrary values in one pass -->
<div class="grid grid-cols-1 gap-6 p-4 md:grid-cols-3 md:gap-8 dark:bg-slate-900">
  <article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-brand-500 dark:border-slate-700 dark:bg-slate-800">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Usage</h3>
    <p class="mt-1 text-sm text-slate-500">1,204 requests this week.</p>
    <span class="mt-3 inline-block rounded-full bg-brand-500/10 px-2 py-0.5 text-xs font-medium text-brand-600">+12%</span>
  </article>
  <aside class="col-start-2 top-[117px] bg-[#0af]">anything CSS can express</aside>
</div>
```
