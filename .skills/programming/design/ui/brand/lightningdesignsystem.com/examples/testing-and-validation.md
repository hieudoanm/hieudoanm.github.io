# Lightning Design System (Salesforce): Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Lightning Design System (Salesforce). The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] New styles use global styling hooks, not SLDS 1 design tokens
- [ ] Hooks work under both SLDS 1 and SLDS 2 themes
- [ ] No runtime `getPropertyValue` / `setPropertyValue` on styling hooks
- [ ] Interactive elements are Lightning base components, not copied blueprint markup
- [ ] Token/hook scope matches the component using it
- [ ] Brand color comes from accent-category hooks + Themes and Branding
- [ ] No hard-coded brand hex values in component CSS

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
