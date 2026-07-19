# tailwindcss-plus: Basic Usage

Tailwind CSS Plus — Tailwind CSS v4 with CSS-first configuration, container queries, and the plus-extended utilities palette.

## Scenario

Use this example as a starting point when applying **tailwindcss-plus** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core: CSS-First Configuration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
