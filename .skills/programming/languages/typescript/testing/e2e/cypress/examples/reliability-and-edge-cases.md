# Cypress Best Practices: 1. Selectors & Queries

## Source guidance

This example applies the **1. Selectors & Queries** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`data-testid` or `getByRole`/`getByLabelText`-style accessible queries over CSS/XPath/class:**
- **Never couple to implementation classes** (`cy.get(".btn-primary")`) — design-in tests via `data-testid` contracts.
- **`contains()` for text-affirming; `find()`/`within()` scope within a container — chain the query to the exact element.**
- **Use Cypress Testing Library helpers (`testing-library/cypress`)** for role/label queries.

## Example

```ts
cy.getByTestId("submit-btn").click();
cy.get('[data-testid="user-name"]').should("contain", "Ada");
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for cypress-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
