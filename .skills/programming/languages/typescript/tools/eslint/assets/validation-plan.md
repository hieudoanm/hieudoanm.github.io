# ESLint: Validation Plan

Use this plan to verify work guided by [ESLint](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Running Prettier and stylistic ESLint rules against each other** — infinite churn. eslint-config-prettier/flat last, always
- [ ] **tseslint.config()** — deprecated, and its files override semantics differ from defineConfig in ways that silently disable rules
- [ ] **Turning on a type-aware preset without projectService**, so every rule is a no-op and you believe you have coverage you do not
- [ ] **Using { ignores: [...] } expecting a global skip** — use globalIgnores()
- [ ] **Enabling an all preset** and drowning in false positives
- [ ] **A bare eslint-disable** with no explanation, which outlives the reason
- [ ] **Storing secrets in an env block or inline comment** — config files get committed; use your CI secret store
- [ ] **Validating dist in the editor**, which is the top cause of a slow ESLint experience
- [ ] **Deep typed linting in the pre-commit hook**, pushing developers to --no-verify

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
