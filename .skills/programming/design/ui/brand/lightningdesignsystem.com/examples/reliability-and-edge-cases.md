# Lightning Design System (Salesforce): 4. Two Salesforce-Specific Traps

## Source guidance

This example applies the **4. Two Salesforce-Specific Traps** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

**Compile-time substitution.** In some Salesforce contexts the variables are
replaced with their values at compile time. That means at runtime:
- `CSSStyleDeclaration.getPropertyValue()` does **not** work on them.
- `CSSStyleDeclaration.setPropertyValue()` does **not** work on them.
Do not write code that reads or writes styling hooks at runtime.
**Token scope discipline.** SLDS 1 tokens come in global and component-scoped
variants, and using the wrong scope is the classic error:

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for lightning-design-system.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
