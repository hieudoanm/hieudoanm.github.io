# Swift Best Practices: Validation Plan

Use this plan to verify work guided by [Swift Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **XCTest / Swift Testing (swift-testing framework) with descriptive test names** — name tests as specifications:
- [ ] **Mirror test targets next to source** (Sources/MyLib → Tests/MyLibTests), one test file per source file where practical
- [ ] **Favour dependency injection so tests pass fakes** — protocols behind services (see #7) make mocking a conformance, not a swizzle
- [ ] **Test async code with async test functions and suspension points naturally** — no artificial expectation/wait plumbing for await-based code; use them only for callback-style legacy APIs
- [ ] **Treat tests as documentation** — assert behaviour and outcomes, not internal call sequences

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
