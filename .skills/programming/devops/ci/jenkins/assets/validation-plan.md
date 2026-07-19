# Jenkins Best Practices: Validation Plan

Use this plan to verify work guided by [Jenkins Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Skill-specific review

- [ ] Confirm the output satisfies the stated goal and scope.
- [ ] Exercise representative and boundary cases.
- [ ] Review failures, assumptions, and limitations.

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
