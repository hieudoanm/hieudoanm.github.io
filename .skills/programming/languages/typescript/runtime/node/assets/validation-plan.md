# Node.js Runtime Best Practices: Validation Plan

Use this plan to verify work guided by [Node.js Runtime Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **node:test + node --test** — zero-dependency runner, structured describe/it/t, test files auto-discovered under test/:
- [ ] **mock (t.mock) for function/API stubbing**; node:assert/strict over assert — deepEqual strictness is where the truth is
- [ ] **Coverage via --experimental-test-coverage** for meaningful coverage gates on domain logic; node --test --test-reporter=spec for CI-readable output
- [ ] **Name tests as specifications**; use subtests (t.test) for parameterized tables
- [ ] **Validate every external input with zod/schema before trusting it** (see Typescript skill §8) — not just HTTP, but env, files, CLI args
- [ ] **Keep Authorization, cookies, and tokens out of logs and error messages**
- [ ] **Dependency audit in CI** (pnpm audit/npm audit), engines-pin LTS, and prefer small, maintained deps
- [ ] **No eval, no child_process with interpolated shell strings** (execFile with args array over exec with a string)
- [ ] **Rate-limit and time out outbound requests**; AbortSignal.timeout on every cross-process call

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
