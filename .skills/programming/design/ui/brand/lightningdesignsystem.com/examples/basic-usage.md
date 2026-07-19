# Lightning Design System (Salesforce): Basic Usage

Build Salesforce enterprise application UI on the Lightning Design System. Covers the SLDS 1 to SLDS 2 migration, why design tokens are deprecated in favour of global styling hooks, the --slds-g-* hook grammar, Lightning base components over blueprints, blueprint drift, token scope discipline, theming through Themes and Branding, and accessibility. Use when building or reviewing LWC, Lightning pages, Apex-facing UI, or any Salesforce-native surface.

## Scenario

Use this example as a starting point when applying **lightning-design-system** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. The Global Styling Hook Grammar** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```css
/* global spacing hook — works in SLDS 1 and SLDS 2 */
.my-card {
  margin-right: var(--slds-g-spacing-2);
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
