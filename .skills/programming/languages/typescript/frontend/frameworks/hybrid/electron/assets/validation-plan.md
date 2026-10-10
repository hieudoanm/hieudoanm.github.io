# Electron Best Practices: Validation Plan

Use this plan to verify work guided by [Electron Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Context isolation** — always enable context isolation:
- [ ] **Disable node integration** — never enable node integration in renderer
- [ ] **Content security policy** — implement CSP:
- [ ] **Validate input** — validate all input from renderer process
- [ ] **Disable dangerous features** — disable remote module, webSecurity false
- [ ] **Lazy loading** — lazy load heavy dependencies:
- [ ] **Web workers** — use web workers for CPU-intensive tasks:
- [ ] **Memory management** — clean up resources properly:
- [ ] **Optimize startup** — minimize main process startup time
- [ ] **Spectron for E2E testing** — test Electron apps with Spectron:

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
