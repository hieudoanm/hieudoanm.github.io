# Gin Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Gin Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Go and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Bind typed structs with tags** and let Gin validate via binding:
- [ ] **Validate all external input; fail fast on invalid requests** — never trust client data
- [ ] **Validation at the handler edge, domain invariants in services** — handler validates shape, service validates rules
- [ ] **Custom validators registered once** (binding.Validator) for app-specific rules; keep them colocated with their structs
- [ ] **Authentication and authorization handled explicitly** — middleware verifies, services/policies authorize
- [ ] **Avoid exposing internal IDs unintentionally** — external IDs/ULIDs where persistence IDs shouldn't leak
- [ ] **Never trust client input**; escape/protect against injection at the persistence layer
- [ ] **Secrets via environment, never code** — config loaded in main, injected where needed (no global mutable config)
- [ ] Map internal errors to generic responses; keep failure details in logs, not responses
- [ ] **Small, focused functions** (≤30 lines — the repo convention); explicit error returns; clear naming over cleverness

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
