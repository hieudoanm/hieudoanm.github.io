# Click Best Practices: Validation Plan

Use this plan to verify work guided by [Click Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **CliRunner exercises the CLI end-to-end without subprocesses:**
- [ ] **Test the full group** — the command tree is the CLI contract; invoke from the root
- [ ] **Contract cases**: missing argument, bad type/path, unknown option, --help output, and the error paths

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
