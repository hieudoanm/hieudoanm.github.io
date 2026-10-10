# WinterJS Best Practices: Validation Plan

Use this plan to verify work guided by [WinterJS Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Deploy via wasmer (Sparkle/wasmer deploy) with a wasmer.toml describing routes/env:**
- [ ] **Env variables via the deploy platform; secrets through platform stores — never inline.**
- [ ] **Local dev: wasmer run or the WinterJS binary; parity checked before CI.**
- [ ] **Tests: local run + fetch-level integration; parity suite across runtimes:**
- [ ] **Observability: structured logs (console.log(JSON.stringify(...))), OpenTelemetry-adjacent when supported.**
- [ ] **Latency/startup measured under the deploy target; version runtime + adapter pinned.**

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
