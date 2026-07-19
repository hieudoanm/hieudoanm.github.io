# Swift Argument Parser Best Practices: Validation Plan

Use this plan to verify work guided by [Swift Argument Parser Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **ValidationError for argument validation** — throw ValidationError("ID must be positive") produces user-friendly errors
- [ ] **requires and conflicts_with** — encode mutual exclusivity and requirements declaratively
- [ ] **env for environment variable fallback** — val token by option().envvar("API_TOKEN") reads from env when flag is absent

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
