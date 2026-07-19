# Tailwindcss Plus: Starter Template

A reusable starting point derived from the **1. Core: CSS-First Configuration** section of [Tailwindcss Plus](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
