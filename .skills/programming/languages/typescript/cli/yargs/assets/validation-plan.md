# Yargs CLI Design Best Practices: Validation Plan

Use this plan to verify work guided by [Yargs CLI Design Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **.check((argv) => ...)** for cross-field invariants that declarations can't express (--format json requires --output file); throw from inside to produce a usage error
- [ ] **.demandOption()** in builder declarations ({ demandOption: true }) vs. manually checking !argv.key
- [ ] Failure messages should be **actionable** — what went wrong _and_ how to fix it. Combine with .fail() to format:
- [ ] **.exitProcess(false) in tests** — let parsing errors surface as thrown/returned objects instead of killing the process, and assert on them
- [ ] **Test the handler directly** with a built argv object ({ key: "x", output: "json" }), or invoke the full .parseAsync() against a fixture argv array with .exitProcess(false) and assert on output/process.exitCode
- [ ] **Parametrize cases** for format combos and bad input (unknown flag, missing positional, choices violation) — each asserts a stable stderr/exit code
- [ ] **Assert machine output** — --output json must parse with JSON.parse and match the documented shape; this is the scripting contract

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
