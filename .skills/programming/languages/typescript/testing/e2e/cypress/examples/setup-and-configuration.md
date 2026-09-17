# Cypress Best Practices: 4. Data & Setup

## Source guidance

This example applies the **4. Data & Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Seed via API calls (or DB) in `beforeEach` — not through the UI:**
- **Isolation**: reset per test; never share state across specs unless deliberate.
- **Test users/config controlled via a dedicated test-mode endpoint** — avoids brittle long setup journeys.

## Example

```ts
beforeEach(() => {
  cy.request("POST", "/api/test/seed", { user: "ada" });  // test-mode endpoint
  cy.visit("/dashboard");
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for cypress-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
