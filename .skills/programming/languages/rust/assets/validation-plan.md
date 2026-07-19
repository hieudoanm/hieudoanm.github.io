# Rust Best Practices: Validation Plan

Use this plan to verify work guided by [Rust Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Unit tests in the same file**, in a #[cfg(test)] mod tests block — standard convention, keeps tests next to the code they cover:
- [ ] **Integration tests in tests/** — these only see the crate's public API, good for catching API design issues unit tests miss
- [ ] **#[should_panic]** for tests asserting a panic path; prefer testing Result::Err variants directly where the code returns Result instead of panicking
- [ ] **Property-based testing** (proptest or quickcheck) for functions with a large input space (parsers, serialization round-trips) — catches edge cases example-based tests miss
- [ ] **cargo nextest** as a faster, better-output test runner if the project has grown beyond a handful of tests

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
