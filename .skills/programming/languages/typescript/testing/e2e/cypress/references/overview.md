# Overview

Focused reference for **cypress-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Cypress Best Practices

Cypress runs **real browser E2E tests** with an interactive runner and commands that auto-retry. Practical Cypress leans on **user-centric selectors (`data-testid`/roles), commands that mirror user intent (interact, assert), explicit waits avoided (auto-retry does the work), and API/network stubbing to keep tests deterministic.** Reliability is the product — a flaky suite is worse than none.

---

## 1. Selectors & Queries

- **`data-testid` or `getByRole`/`getByLabelText`-style accessible queries over CSS/XPath/class:**

```ts
cy.getByTestId("submit-btn").click();
cy.get('[data-testid="user-name"]').should("contain", "Ada");
```

- **Never couple to implementation classes** (`cy.get(".btn-primary")`) — design-in tests via `data-testid` contracts.
- **`contains()` for text-affirming; `find()`/`within()` scope within a container — chain the query to the exact element.**
- **Use Cypress Testing Library helpers (`testing-library/cypress`)** for role/label queries.

---

## 2. Interacting & Asserting
