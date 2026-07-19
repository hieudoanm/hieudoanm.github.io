# Cypress Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `data-testid`/role-based queries; no CSS-class coupling
- [ ] Intent verbs; `should` auto-retry; no manual `wait()`
- [ ] `cy.intercept` stubs + aliases; fixtures over live backends
- [ ] API-seeded `beforeEach` isolation; per-test resets
- [ ] `cy.clock`/`tick` for time-dependent flows
- [ ] Journey per spec; CI parallel run; failure artifacts captured

## Example

A team applying **Quick-Start Checklist** to a Cypress Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `data-testid`/role-based queries; no CSS-class coupling**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for cypress-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
