# Ktor Backend Best Practices: Validation Plan

Use this plan to verify work guided by [Ktor Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Small, focused suspend functions**; clear naming; prefer immutability (Kotlin defaults)
- [ ] **Stateless services where possible**; repositories handle persistence only; services own business logic
- [ ] **Composition over inheritance** — dependency injection via constructor params (Kotlin-native, no reflection-heavy framework needed)
- [ ] **Log at system boundaries** — HTTP, DB, and external calls; structured, with request context
- [ ] **Clarity over clever DSL abuse** — idiomatic Ktor routing {} where it reads, explicit Kotlin elsewhere
- [ ] **testApplication + ktor-server-test-host** — in-process, no network, exercises routing/plugins/pipeline:
- [ ] **Test the contract** — success status/body, 400/404, auth boundaries (401 unauthenticated, 403 forbidden)
- [ ] **Isolate** — test DB (H2/SQLite, Exposed schema) reset per suite; mock outbound at service seams
- [ ] **Deterministic and named as behavior** — Kotlin backtick test names read as specs

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
