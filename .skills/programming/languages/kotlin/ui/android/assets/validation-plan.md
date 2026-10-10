# Android: Validation Plan

Use this plan to verify work guided by [Android](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Add a baseline profile** — the single biggest cold-start and scroll-smoothness win available. Generate it in Macrobenchmark, and verify it is packaged
- [ ] **R8 in release** with sane keep rules: shrink aggressively, and confirm the app does not crash only after minification
- [ ] **Avoid work in Application.onCreate** — initialize lazily per feature; measure with Trace before optimizing
- [ ] **Do not use !!, GlobalScope, or a static mutable singleton** for anything screen-related; they are the usual source of leaks and lost state
- [ ] **Profile on a low-end device** in release mode. Debug builds and fast dev phones hide most jank
- [ ] **Split by execution cost**: pure JVM unit tests for domain and ViewModel logic, Robolectric or instrumented tests only where the platform is actually required
- [ ] **Test the ViewModel, not the composable** for state logic — a StateFlow assertion is faster and less brittle than a UI test
- [ ] **Always test Room migrations** with MigrationTestHelper; a passing app on a fresh install proves nothing about an upgrade path
- [ ] **Use kotlinx-coroutines-test** to make coroutine tests deterministic, and inject a TestDispatcher rather than relying on real delays
- [ ] **Fakes over mocks for dependencies**, and one shared test-data factory to keep fixtures consistent

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
