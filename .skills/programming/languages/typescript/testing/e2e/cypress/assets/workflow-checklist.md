# Cypress Best Practices: Workflow Checklist

A practical run sheet for applying [Cypress Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Selectors & Queries: **data-testid or getByRole/getByLabelText-style accessible queries over CSS/XPath/class:**
- [ ] 1. Selectors & Queries: **Never couple to implementation classes** (cy.get(".btn-primary")) — design-in tests via data-testid contracts
- [ ] 2. Interacting & Asserting: **Intent verbs over micro-steps:**
- [ ] 2. Interacting & Asserting: **Assertions auto-retry — delete manual wait()/sleep:**
- [ ] 3. Network & API Stubbing: **Stub backend responses for deterministic UI tests:**
- [ ] 3. Network & API Stubbing: **Fixtures over live services** — E2E gates the frontend; the backend is container- or mock-verified separately
- [ ] 4. Data & Setup: **Seed via API calls (or DB) in beforeEach — not through the UI:**
- [ ] 4. Data & Setup: **Isolation**: reset per test; never share state across specs unless deliberate
- [ ] 5. Waiting & Flakiness: **Rely on auto-retry built into should; cy.intercept for network wait points; only then cy.wait() (on an alias).**
- [ ] 5. Waiting & Flakiness: **Animations/fetch resolved by the runner — set defaultCommandTimeout generously, not percieved wait() calls.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
