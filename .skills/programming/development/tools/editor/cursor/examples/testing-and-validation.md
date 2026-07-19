# Cursor: 4. Reviewing AI Diffs

## Scenario

A project is working on **4. reviewing ai diffs** for Cursor. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Read the diff as code review, not as a summary.** The question is never "does this look right" but "what did it miss" — the dropped error branch, the unhandled promise, the changed default.
- **Check what is *not* in the diff.** The most common defect is an omission, which a diff review is naturally bad at noticing. Ask: which test would fail if this were wrong, and does one exist?
- **Run the checks, always.** `pnpm typecheck` and `pnpm test` catch more AI mistakes than reading does, and they are cheap relative to the cost of a subtle regression.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reviewing AI Diffs** section of [SKILL.md](../SKILL.md).
