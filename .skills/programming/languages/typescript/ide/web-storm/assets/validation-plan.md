# WebStorm: Validation Plan

Use this plan to verify work guided by [WebStorm](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Configure the formatter and linter from the repo's config** — Prettier for format, ESLint for lint — and let the IDE run the repo's binaries rather than its own reimplementation, so the editor and pnpm format produce identical output
- [ ] **Prettier's Tailwind plugin sorts classes; the IDE must use the same plugin and config** or every file reorders on the next format
- [ ] **eslint --fix and prettier --write in the IDE should be wired to the same scripts as CI,** so a save produces the same result as a commit hook
- [ ] **eslint flat config (eslint.config.js) is the current form**; a legacy .eslintrc is being phased out. Configure the IDE for the form the repo uses
- [ ] **Pre-commit hooks belong in the repo,** not the IDE's commit dialog; the hook is the shared rule
- [ ] **Commit eslint.config.js, .prettierrc, tsconfig.json, and the lockfile** — these four define the project's front-end contract and belong in review

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
