# C# Best Practices: Validation Plan

Use this plan to verify work guided by [C# Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **xUnit (or NUnit) + flut asserts-style equality on records**; arrange/act/assert with a blank line per phase
- [ ] **[Theory]/[InlineData]/[MemberData] for contract tables** — validation cases, status-code maps, string-parsing tables:
- [ ] **Async tests are async** (Task/ValueTask returning), names read as Method_WhenCondition_ThenResult
- [ ] **Isolate** — fake the seams (interfaces over mocks); in-memory/test DBs per suite; no wall-clock sleeps (virtual time)
- [ ] **Cover the contract** — success, validation failure, not-found, cancellation — at the service boundary, not branch-by-branch internals

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
