# Cursor: 1. Why a Fork Changes the Rules

## Scenario

A project is working on **1. why a fork changes the rules** for Cursor. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Most of the correctness work in an AI-first editor happens in review, not in the prompt.** The model produces plausible code; your job is deciding whether it is correct. Budget time for that rather than for typing.
- **Everything VS Code does, Cursor does,** so the project-level settings discipline from vscode.md applies unchanged — committed `settings.json`, pinned extensions, `tsc --noEmit` as the authority.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. Why a Fork Changes the Rules** section of [SKILL.md](../SKILL.md).
