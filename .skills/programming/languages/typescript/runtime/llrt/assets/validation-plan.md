# LLRT Best Practices: Validation Plan

Use this plan to verify work guided by [LLRT Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Local dev parity (llrt CLI download + handler harness) — the runtime differs from Node; test it:**
- [ ] **Golden output per event type; latency CI gate (cold start budget in the pipeline).**
- [ ] **Version-pin the runtime + dependencies; refresh on dot-releases deliberately.**

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
