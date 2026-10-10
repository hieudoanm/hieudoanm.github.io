# Deno Runtime Best Practices: Validation Plan

Use this plan to verify work guided by [Deno Runtime Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **deno test** — the built-in runner; @std/assert for assertions, describe/it from @std/testing/bdd, plus built-in coverage:
- [ ] **Mock HTTP/fetch with @std/http/mock or undici's MockAgent** — test the service contract, not implementation
- [ ] **deno test --coverage + deno coverage** for reports; name tests as specifications; run per-module mod_test.ts files next to sources

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
