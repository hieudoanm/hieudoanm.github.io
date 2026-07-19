# Google Design System (Material Design 3): Workflow Checklist

A practical run sheet for applying [Google Design System (Material Design 3)](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Principles: **Roles, not names** — a token says what it _does_ (on-surface), never what
- [ ] 1. Core Principles: **Ink on ground** — every color token is a surface/ink pair (surface +
- [ ] 2. Color Is a Set of Roles: **Never** reference a raw ramp in a component — bg-blue-500 can't respond to a
- [ ] 2. Color Is a Set of Roles: **on-* is not optional.** Every ground ships with its ink. This one rule
- [ ] 3. Wire Roles Into Tokens: **oklch, not hex** — perceptual lightness makes tonal ramps and contrast
- [ ] 3. Wire Roles Into Tokens: **Never redefine a role per component.** If a screen needs a look the roles
- [ ] 4. Type Is Roles With Bundled Metrics: **Use body-medium for product chrome**, not body-large — dense operational
- [ ] 4. Type Is Roles With Bundled Metrics: **Monospace only for aligned numeric data** — prices, quantities, timestamps —
- [ ] 5. Shape, Elevation, and State: **Shape scale** — none → extra-small (4dp) → small (8dp) → medium
- [ ] 5. Shape, Elevation, and State: **Elevation** — use surface-container-*, not stacked shadows. Reserve shadow

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
