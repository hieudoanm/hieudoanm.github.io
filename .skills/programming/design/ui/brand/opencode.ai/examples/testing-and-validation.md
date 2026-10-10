# OpenCode design system: Design rules

## Scenario

A project is working on **design rules** for OpenCode design system. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **One font family, monospace.** Set `font-family: var(--font-mono)` on the page root. Do not mix in a proportional sans for headings; hierarchy comes from size and weight only.
- **Follow the OS theme** with `prefers-color-scheme`; define every color as a variable on a page-scope selector, light first, dark in the media query. No manual toggle needed.
- **Hairlines, not boxes.** Sections get `border-top: 1px solid var(--color-border-weak)`; cards get a 1px border and 6px radius, nothing heavier. No shadows or glows.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Design rules** section of [SKILL.md](../SKILL.md).
