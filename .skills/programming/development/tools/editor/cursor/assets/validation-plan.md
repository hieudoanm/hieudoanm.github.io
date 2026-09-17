# Cursor: Validation Plan

Use this plan to verify work guided by [Cursor](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Read the diff as code review, not as a summary.** The question is never "does this look right" but "what did it miss" — the dropped error branch, the unhandled promise, the changed default
- [ ] **Check what is *not* in the diff.** The most common defect is an omission, which a diff review is naturally bad at noticing. Ask: which test would fail if this were wrong, and does one exist?
- [ ] **Run the checks, always.** pnpm typecheck and pnpm test catch more AI mistakes than reading does, and they are cheap relative to the cost of a subtle regression
- [ ] **Verify the tests were not weakened to make the change pass.** A deleted assertion or a loosened matcher in an AI diff is a red flag worth stopping the review for
- [ ] **Do not accept a large diff on a small task.** If a one-line change produced 400 lines, the agent misunderstood the scope; ask for it to be redone

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
