# Antigravity: Validation Plan

Use this plan to verify work guided by [Antigravity](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Read the actual diff in your VCS,** not the agent's summary of what it did. The summary is produced by the same system that made the change and inherits its blind spots
- [ ] **Look for omissions, not errors.** Errors are visible in the diff; the dangerous defect is the dropped branch, the unhandled rejection, the changed default. Ask which test would catch it
- [ ] **Verify the tests still assert something.** A deleted or weakened assertion in a generated diff is a reason to stop and ask why
- [ ] **Run the full check suite — typecheck, lint, tests — every time.** It is cheaper than any review, and it catches what reading does not
- [ ] **Reject a large diff on a small task** as a scope failure, not a stylistic preference
- [ ] **Treat the generated code as a first draft you own.** It becomes your code the moment it is committed, and the next reader has no way to tell it was generated

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
