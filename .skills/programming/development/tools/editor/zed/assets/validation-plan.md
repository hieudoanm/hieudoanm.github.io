# Zed: Validation Plan

Use this plan to verify work guided by [Zed](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Zed is fast on large files by design; the usual cause of a slowdown is an extension, not the editor.** Disable extensions one at a time to find it rather than assuming the project is too big
- [ ] **Project-scoped syntax trees and language servers do real work on open**; a very large monorepo benefits from opening the root once rather than several nested projects
- [ ] **Zed's language_server diagnostics for a file you are not editing can be deferred** by the server itself; a slow language server is a server problem, not a Zed one

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
