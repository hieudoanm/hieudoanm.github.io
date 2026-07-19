---
name: cypress-best-practices
description: Best practices for end-to-end testing with Cypress — the browser automation conventions for web apps. Use when writing, structuring, or reviewing Cypress suites — covers commands, selectors, waiting, API stubbing, parallel CI, and reliability patterns.
---

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

---

## 6. Structure & CI

- **Specs by user journey** (`login.spec.cy.ts`, `checkout.spec.cy.ts`) mirroring product flows.
- **Run in CI on every push; parallelize specs (`specPattern` shards/`cypress run --parallel`) for speed; record artifacts on failure.**
- **`webServer`/`cypress.config` serves the built app — E2E on the real bundle, not the dev server.**

---

## General Rules of Thumb

- **User-centric selectors; `data-testid` design-in.**
- **Interact then assert; auto-retry does the waiting — no sleeps.**
- **Stub backend / seed via API; fixtures deterministic.**
- **One feature per spec; parallel CI; artifacts on failure.**
- **A suite that's green AND stable is the deliverable.**

---

## Quick-Start Checklist

- [ ] `data-testid`/role-based queries; no CSS-class coupling
- [ ] Intent verbs; `should` auto-retry; no manual `wait()`
- [ ] `cy.intercept` stubs + aliases; fixtures over live backends
- [ ] API-seeded `beforeEach` isolation; per-test resets
- [ ] `cy.clock`/`tick` for time-dependent flows
- [ ] Journey per spec; CI parallel run; failure artifacts captured