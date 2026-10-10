# Zed: 4. Performance

## Scenario

A project is working on **4. performance** for Zed. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Zed is fast on large files by design; the usual cause of a slowdown is an extension, not the editor.** Disable extensions one at a time to find it rather than assuming the project is too big.
- **Project-scoped syntax trees and language servers do real work on open**; a very large monorepo benefits from opening the root once rather than several nested projects.
- **Zed's `language_server` diagnostics for a file you are not editing can be deferred** by the server itself; a slow language server is a server problem, not a Zed one.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Performance** section of [SKILL.md](../SKILL.md).
