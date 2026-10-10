# oclif CLI Design Best Practices: Validation Plan

Use this plan to verify work guided by [oclif CLI Design Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **@oclif/test** provides cmd.run(["config", "get", "x"]) + stdout/stderr capture assertions:
- [ ] **Assert exit codes** (.exit(2)), stderr content, and --json output shape — the machine contract is the CLI's real API
- [ ] **Mock services at the seam** (sinon/vi.fn on the readKey-style collaborators), never oclif internals — commands stay thin and fast

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
