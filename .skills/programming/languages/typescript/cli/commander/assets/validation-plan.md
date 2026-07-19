# Commander.js CLI Design Best Practices: Validation Plan

Use this plan to verify work guided by [Commander.js CLI Design Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Test the run(argv) entrypoint, not the internals** — spawn via execFile/execa _or_ call the parsed action in-process with .exitOverride(); assert on exit code, stdout, and stderr:
- [ ] **Test error paths** — assert actionable message on stderr and the correct nonzero exit code for known failures
- [ ] **Parameterize the case table** for output formats and flag combinations (@parametrize/a forEach of cases)

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
