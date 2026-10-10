# Lightning Design System (Salesforce): Workflow Checklist

A practical run sheet for applying [Lightning Design System (Salesforce)](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Principles: **Prefer Lightning base components.** They are the supported path; blueprints are
- [ ] 1. Core Principles: **Styling hooks, not design tokens, for anything that must work in SLDS 2.**
- [ ] 2. SLDS 1 vs SLDS 2: SLDS 1 and SLDS 2 **share the same component blueprints.** Only the CSS property
- [ ] 2. SLDS 1 vs SLDS 2: Design tokens "are still present and work normally in SLDS 1 themes, but aren't
- [ ] 4. Two Salesforce-Specific Traps: CSSStyleDeclaration.getPropertyValue() does **not** work on them
- [ ] 4. Two Salesforce-Specific Traps: CSSStyleDeclaration.setPropertyValue() does **not** work on them
- [ ] 5. Lightning Base Components over Blueprints: Blueprints are **framework-agnostic**, using standard HTML. When building an LWC,
- [ ] 5. Lightning Base Components over Blueprints: Blueprint markup you copy becomes _your_ code. When SLDS updates the blueprint,
- [ ] 6. Theming and Brand: Salesforce's Cosmos theme runs on **SLDS 2**, as do custom SLDS 2 themes
- [ ] 6. Theming and Brand: Use **accent-category global styling hooks** so components pick up brand colors

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
