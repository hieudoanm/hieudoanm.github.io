# Husky: Validation Plan

Use this plan to verify work guided by [Husky](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Pre-v9 boilerplate left in .husky/** (_/husky.sh), which either errors or silently does nothing on v9
- [ ] **Missing "prepare": "husky"**, so hooks work for the developer who set them up and nobody else
- [ ] **A whole-repo lint in pre-commit**, which trains the team to use --no-verify
- [ ] **Fixing but not aborting** — a hook without set -e reports problems and commits anyway
- [ ] **Losing the executable bit**, especially across a Windows checkout or a core.fileMode=false clone
- [ ] **Relying on a hook to enforce something CI does not also check**, which makes it a suggestion rather than a control
- [ ] **npx commitlint without --no**, allowing a mid-commit network install
- [ ] **Assuming hooks run in CI.** They do not; clones in pipelines skip them entirely
- [ ] **Two hook managers fighting over core.hooksPath.**
- [ ] **Committing .husky/_ or .huskyrc** on v9, where they are dead weight

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
