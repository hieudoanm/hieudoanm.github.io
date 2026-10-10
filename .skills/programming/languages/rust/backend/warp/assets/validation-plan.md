# Warp Best Practices: Validation Plan

Use this plan to verify work guided by [Warp Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **warp::test::request() — no server needed:**
- [ ] **Test individual filters and the full composition**; RequestBuilder.reply gives the HTTP contract
- [ ] **Fake state/repo injected via the warp::any().map seam
- [ ] **Contract cases**: valid, not-found, bad param, wrong method, rejection mapping

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
