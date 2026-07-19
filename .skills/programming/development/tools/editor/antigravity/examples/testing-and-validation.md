# Antigravity: 3. Reviewing the Result

## Scenario

A project is working on **3. reviewing the result** for Antigravity. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Read the actual diff in your VCS,** not the agent's summary of what it did. The summary is produced by the same system that made the change and inherits its blind spots.
- **Look for omissions, not errors.** Errors are visible in the diff; the dangerous defect is the dropped branch, the unhandled rejection, the changed default. Ask which test would catch it.
- **Verify the tests still assert something.** A deleted or weakened assertion in a generated diff is a reason to stop and ask why.
- **Run the full check suite — typecheck, lint, tests — every time.** It is cheaper than any review, and it catches what reading does not.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **3. Reviewing the Result** section of [SKILL.md](../SKILL.md).
