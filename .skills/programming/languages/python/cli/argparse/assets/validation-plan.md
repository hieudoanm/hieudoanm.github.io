# Argparse Best Practices: Validation Plan

Use this plan to verify work guided by [Argparse Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **main(argv=[...]) is testable without subprocess — pass args directly:**
- [ ] **Parsing table-tests**: input args × expected args namespace / exit code
- [ ] **Contract cases**: missing required, unknown option, bad type, -h/--help output shape

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
