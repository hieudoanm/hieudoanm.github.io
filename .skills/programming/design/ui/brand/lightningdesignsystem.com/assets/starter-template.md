# Lightning Design System (Salesforce): Starter Template

A reusable starting point derived from the **4. Two Salesforce-Specific Traps** section of [Lightning Design System (Salesforce)](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```css
/* wrong — a button-scoped token used inside a card */
.my-card {
  margin: var(--lwc-buttonSpacing);
}

/* right — a global primitive with the value you actually need */
.my-card {
  margin: var(--lwc-spacingMedium);
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
