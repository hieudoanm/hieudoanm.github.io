# Java Best Practices: Validation Plan

Use this plan to verify work guided by [Java Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **JUnit 5 (@Test) + AssertJ for fluent assertions** — assertThat(result).isEqualTo(expected) reads like a sentence; use assertEquals/assertThrows where you prefer the JDK API
- [ ] **Table-driven tests with @ParameterizedTest + @CsvSource/@MethodSource** — data and expectation in one place:
- [ ] **Name tests as specifications** — throwsNotFoundForMissingId, returnsActiveUsersOnly style; long descriptive names are fine and better than numbers
- [ ] **@DisplayName for readable, human labels** where the method name stays terse
- [ ] **Mock the boundaries, not internals** — Mockito/heavy mocking at the seams (HTTP client, clock, DB); test behaviour and outcomes on real logic
- [ ] **Test isolation** — each test builds its own fixtures; no shared mutable static state to reset. Use @BeforeEach over @BeforeAll for per-test setup

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
