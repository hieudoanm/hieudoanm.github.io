# OpenCode design system: Workflow Checklist

A practical run sheet for applying [OpenCode design system](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] Provenance: what is verified and what is not: **Verified from source:** color tokens (light and dark), font stack, --padding and --vertical-padding, content max-width, breakpoint, button radius and padding, section divider rule, card/tab/dock radii, hero video rules, heading sizes called out below, body line-height
- [ ] Provenance: what is verified and what is not: **Verified from page text:** section order, copy, nav and footer contents, stats, FAQ questions
- [ ] Design rules: **One font family, monospace.** Set font-family: var(--font-mono) on the page root. Do not mix in a proportional sans for headings; hierarchy comes from size and weight only
- [ ] Design rules: **Follow the OS theme** with prefers-color-scheme; define every color as a variable on a page-scope selector, light first, dark in the media query. No manual toggle needed
- [ ] Files: references/tokens.css: color (light and dark), font, spacing, radius, layout tokens, base styles
- [ ] Files: references/components.md: component recipes

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
