# tailwindcss-plus: Workflow Checklist

A practical run sheet for applying [tailwindcss-plus](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core: CSS-First Configuration: Replace config file with @import "tailwindcss"; and @theme { ... } in your CSS
- [ ] 1. Core: CSS-First Configuration: Define tokens as CSS variables: @theme { --color-brand: #4b8; --font-family-sans: ... }
- [ ] 2. Utilities and States: Use classes: flexbox, grid, spacing (p-4, m-2), typography, colors, effects
- [ ] 2. Utilities and States: Variants: hover:, focus:, group-hover:, dark:, max-*, min-[…]:
- [ ] 3. Responsive and Container Queries: Breakpoints via sm:, md:, lg: customisable in @theme
- [ ] 3. Responsive and Container Queries: **Container queries** (Plus/foundation): @container + @md: etc. — style a component based on its container width, not viewport
- [ ] 4. Dark Mode and Theming: Dark mode: dark: variant (class or prefers-color-scheme per config)
- [ ] 4. Dark Mode and Theming: Theme multiple brands/variants with @theme variable sets + @layer
- [ ] 5. Performance: JIT: only used utilities are generated → tiny output vs old full builds
- [ ] 5. Performance: Use @apply/@utility to compose; keep purging active in production builds

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
