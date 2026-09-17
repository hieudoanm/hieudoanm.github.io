# 1. Core: CSS-First Configuration

Focused reference for **tailwindcss-plus**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core: CSS-First Configuration

- Replace config file with `@import "tailwindcss";` and `@theme { ... }` in your CSS.
- Define tokens as CSS variables: `@theme { --color-brand: #4b8; --font-family-sans: ... }`
- `@theme` values become utilities automatically (`bg-brand`, `font-sans`, `text-*`).
- Legacy JS config still works via `@config` if you need extensions.

```bash
npm i tailwindcss @tailwindcss/vite
```

```css
/* src/app.css — the whole config now lives in CSS */
@import "tailwindcss";

@theme {
  --color-brand: oklch(55% 0.19 285);
  --color-brand-600: oklch(48% 0.19 285);
  --color-surface: oklch(100% 0 0);
  --font-sans: "Inter", system-ui, sans-serif;
  --spacing-18: 4.5rem;
  --breakpoint-md: 48rem;
}

/* Only when extending an existing v3 config */
@config "../../tailwind.config.js";

/* v4 defaults to prefers-color-scheme — opt into the class strategy explicitly */
@custom-variant dark (&:where(.dark, .dark *));
```
