# Kotlin Best Practices: Validation Plan

Use this plan to verify work guided by [Kotlin Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Use kotlin.test (+ JUnit 5 underneath) and runTest for coroutine code** — StandardTestDispatcher gives deterministic virtual time, so tests don't delay()-sleep:
- [ ] **Name tests as sentences** — backtick names read as specifications (returns ok when upstream succeeds), which the repo convention prefers over testFetch(). If backticks aren't used, use camelCase with the same descriptive intent
- [ ] **Fake/mock the boundaries, not the internals** — FakeRepo, in-memory doubles; test behaviour and outcomes, not call-order implementation details
- [ ] **Property-based / parameterized testing** for wide input spaces — JUnit 5 @ParameterizedTest + @MethodSource, or kotlinx-benchmark/kover where relevant
- [ ] **Test coroutine cancellation and errors** — assert withTimeout failures, runCatching results, and scope survival (supervisorScope)
- [ ] **Isolate tests** — each test builds its own state; no shared singletons to reset (the object-singleton habit is the top source of test-order bugs)

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
