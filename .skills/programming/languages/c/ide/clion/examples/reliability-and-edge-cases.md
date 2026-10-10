# CLion: 7. Performance & Refactoring

## Scenario

A project is working on **7. performance & refactoring** for CLion. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **CLion's refactorings are reliable for semantic changes** — extract function, introduce parameter, change signature — because they are backed by the real index. Use them rather than hand-editing signatures across a codebase.
- **The ReSharper C++ engine does most of the work,** so keeping the project fully indexed matters more than in other JetBrains IDEs. Excluding a generated directory with a full-project search will slow it noticeably; exclude narrow paths only.
- **Run inspections as a batch (Inspect Code → Whole solution) before large refactors,** not after, so the baseline is known.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **7. Performance & Refactoring** section of [SKILL.md](../SKILL.md).
