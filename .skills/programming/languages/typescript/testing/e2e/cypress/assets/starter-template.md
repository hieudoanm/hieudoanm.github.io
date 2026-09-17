# Cypress Best Practices: Starter Template

A reusable starting point derived from the **4. Data & Setup** section of [Cypress Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
beforeEach(() => {
  cy.request("POST", "/api/test/seed", { user: "ada" });  // test-mode endpoint
  cy.visit("/dashboard");
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
