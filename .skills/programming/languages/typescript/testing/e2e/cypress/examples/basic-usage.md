# Cypress Best Practices: Basic Usage

Best practices for end-to-end testing with Cypress — the browser automation conventions for web apps. Use when writing, structuring, or reviewing Cypress suites — covers commands, selectors, waiting, API stubbing, parallel CI, and reliability patterns.

## Scenario

Use this example as a starting point when applying **cypress-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Interacting & Asserting** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
cy.getByTestId("email").type("ada@example.com");
cy.getByTestId("submit").click();
cy.getByTestId("success").should("be.visible");
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
