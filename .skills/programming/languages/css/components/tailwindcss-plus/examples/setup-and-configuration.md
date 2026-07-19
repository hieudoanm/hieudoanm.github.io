# Tailwindcss Plus: 1. Core: CSS-First Configuration

## Source guidance

This example applies the **1. Core: CSS-First Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Replace config file with `@import "tailwindcss";` and `@theme { ... }` in your CSS.
- Define tokens as CSS variables: `@theme { --color-brand: #4b8; --font-family-sans: ... }`
- `@theme` values become utilities automatically (`bg-brand`, `font-sans`, `text-*`).
- Legacy JS config still works via `@config` if you need extensions.

## Example

```bash
npm i tailwindcss @tailwindcss/vite
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for tailwindcss-plus.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
