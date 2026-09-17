# Workflow notes

Focused reference for **cypress-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Intent verbs over micro-steps:**

```ts
cy.getByTestId("email").type("ada@example.com");
cy.getByTestId("submit").click();
cy.getByTestId("success").should("be.visible");
```

- **Assertions auto-retry — delete manual `wait()`/`sleep`:**

```ts
// NO cy.wait(1000); instead:
cy.getByTestId("result").should("contain", "done");   // retries until visible
```

- **Chain assertions with `should` on the same element; expect-driven (`expect(...)` via chai) inside `then` for imperative checks.**
- **One feature flow per test** — a 500-line test that verifies "everything" hides the failing step.

---

## 3. Network & API Stubbing

- **Stub backend responses for deterministic UI tests:**

```ts
cy.intercept("GET", "/api/user", { fixture: "user.json" });
cy.intercept("POST", "/api/login").as("login");
cy.getByTestId("login-btn").click();
cy.wait("@login").its("response.statusCode").should("eq", 200);
```
