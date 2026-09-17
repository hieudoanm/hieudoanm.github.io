# Implementation notes

Focused reference for **cypress-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Fixtures over live services** — E2E gates the frontend; the backend is container- or mock-verified separately.
- **`as("alias")` + `cy.wait("@alias")` for request-response assertion; keep interceptions tightly patterned.**

---

## 4. Data & Setup

- **Seed via API calls (or DB) in `beforeEach` — not through the UI:**

```ts
beforeEach(() => {
  cy.request("POST", "/api/test/seed", { user: "ada" });  // test-mode endpoint
  cy.visit("/dashboard");
});
```

- **Isolation**: reset per test; never share state across specs unless deliberate.
- **Test users/config controlled via a dedicated test-mode endpoint** — avoids brittle long setup journeys.

---

## 5. Waiting & Flakiness

- **Rely on auto-retry built into `should`; `cy.intercept` for network wait points; only then `cy.wait()` (on an alias).**
- **Animations/fetch resolved by the runner — set `defaultCommandTimeout` generously, not percieved `wait()` calls.**
- **`cy.clock()`/`cy.tick()` for time-dependent views — deterministic virtual time over sleeps.**
