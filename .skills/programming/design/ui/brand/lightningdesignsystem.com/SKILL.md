---
name: "lightning-design-system"
description: "Build Salesforce enterprise application UI on the Lightning Design System. Covers the SLDS 1 to SLDS 2 migration, why design tokens are deprecated in favour of global styling hooks, the --slds-g-* hook grammar, Lightning base components over blueprints, blueprint drift, token scope discipline, theming through Themes and Branding, and accessibility. Use when building or reviewing LWC, Lightning pages, Apex-facing UI, or any Salesforce-native surface."
tags:
  - "programming"
  - "design"
  - "brand"
  - "lightningdesignsystem"
  - "com"
  - "lightning"
when_to_use: "Use when building or reviewing LWC, Lightning pages, Apex-facing UI, or any Salesforce-native surface."
prerequisites:
  - "A clear product or design goal."
  - "Familiarity with the target audience and existing interface constraints."
related_skills:
  - "../carbondesignsystem.com/SKILL.md"
  - "../spectrum.adobe.com/SKILL.md"
  - "../polaris/SKILL.md"
avoid_when:
  - "When the brief does not call for this design system or philosophy; follow the project’s existing design language instead."
status: "active"
---

# Lightning Design System (Salesforce)

SLDS is the design system behind Salesforce: Lightning pages, Lightning web components, the console, and the admin surfaces around them. It is the reference for dense CRM UI where records, lists, and forms dominate the screen.

**You buy:** the Salesforce look and feel, components that map to Lightning base components, and a theming layer that lets an org's brand flow through without forking anything.

## When to use

Use when building or reviewing LWC, Lightning pages, Apex-facing UI, or any Salesforce-native surface.

## Prerequisites

- A clear product or design goal.
- Familiarity with the target audience and existing interface constraints.

## Scope boundary

- When the brief does not call for this design system or philosophy; follow the project’s existing design language instead.

## Essential checks

- **Prefer Lightning base components.** They are the supported path; blueprints are
- framework-agnostic markup you copy, and copies drift
- **Styling hooks, not design tokens, for anything that must work in SLDS 2.**
- **Theming happens in Themes and Branding**, not in your CSS. An override is a
- defect with a deadline
- **Blueprint markup does not auto-update.** Salesforce updates base components
- when SLDS changes; your copied blueprint markup does not
- **Density is the requirement.** Records lists and forms are the product

## Focus areas

- 1. Core Principles
- 2. SLDS 1 vs SLDS 2
- 3. The Global Styling Hook Grammar
- 4. Two Salesforce-Specific Traps
- 5. Lightning Base Components over Blueprints
- 6. Theming and Brand
- 7. Accessibility

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
