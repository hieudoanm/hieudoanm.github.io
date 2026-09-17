# tailwindcss: Workflow Checklist

A practical run sheet for applying [tailwindcss](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Installation and Setup (v3): Install: npm i -D tailwindcss postcss autoprefixer, npx tailwindcss init -p
- [ ] 1. Installation and Setup (v3): Configure content globs in tailwind.config.js to watch your source files for class extraction
- [ ] 2. Writing Utilities: Layout: flex, grid, p-*, m-*, w-*, h-*, gap-*
- [ ] 2. Writing Utilities: Styling: text-* (color/size), bg-*, border-*, rounded-*, shadow-*
- [ ] 3. Theming and Config: Extend default theme via theme.extend in config (colors, spacing, font sizes, breakpoints)
- [ ] 3. Theming and Config: Custom utilities via plugin + addUtilities or @layer utilities
- [ ] 4. Components and Reuse: Compose patterns with @apply inside @layer components for readable, tailwind-based components
- [ ] 4. Components and Reuse: Extract repeated groups with components (React components / Blade components) so markup stays clean
- [ ] 5. Performance and Best Practices: Do not use @apply inside the same file you write utilities for (Layers workaround) — apply it only in component layer
- [ ] 5. Performance and Best Practices: Avoid dynamic class strings like text-${color} — Tailwind can't inline-extract them (use full class names or safelist)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
