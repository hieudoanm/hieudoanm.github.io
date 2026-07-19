# daisyui: Workflow Checklist

A practical run sheet for applying [daisyui](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup and Installation: Requirements: Tailwind CSS v3/v4
- [ ] 1. Setup and Installation: Install: npm i daisyui then add require('daisyui') to tailwind.config.js plugins (or @plugin "daisyui" for v4)
- [ ] 2. Component Classes: Buttons: btn btn-primary btn-outline btn-ghost btn-xs…btn-lg, btn-circle
- [ ] 2. Component Classes: Layout: card, navbar, drawer, menu, tabs (tab, tab-active, tab-content), breadcrumbs
- [ ] 3. Theming and Dark Mode: Prefix themes: data-theme="light|dark|cupcake|cyberpunk|..." on <html> for instant theming
- [ ] 3. Theming and Dark Mode: When using Tailwind config, set themes: ["light", "dark", ...]; use themes: false to use a single dark/base theme
- [ ] 4. Styling vs Tailwind: Prefer DaisyUI component classes for standard UI pieces; use Tailwind utilities for spacing/layout details
- [ ] 4. Styling vs Tailwind: DaisyUI is JIT-friendly: only classes you use are generated
- [ ] 5. Accessibility: Most components carry correct ARIA; verify interactive elements have focus and keyboard semantics
- [ ] 5. Accessibility: Add aria-labels to icon-only buttons/btn-circle

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
