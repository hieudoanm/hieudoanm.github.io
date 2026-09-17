# Puppeteer Best Practices: Validation Plan

Use this plan to verify work guided by [Puppeteer Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **page.evaluate returns serializable data — batch reads, avoid per-node round trips.**
- [ ] **page.setViewport/emulate devices for responsive checks; request interception (page.setRequestInterception(true)) to block heavy media when reading only text.**
- [ ] **page.metrics()/performance.getEntriesByType("navigation") via evaluate for perf probes.**

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
