# Clerk Best Practices: Validation Plan

Use this plan to verify work guided by [Clerk Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Rate limits / MFA** configured in the Clerk dashboard; enforce for sensitive actions
- [ ] **Never log tokens, session cookies, or webhook secrets**
- [ ] Store CLERK_SECRET_KEY server-side only
- [ ] Keep session rotation/fresh behavior to Clerk; don't hand-roll token refresh
- [ ] Handle **session expiration and sign-out flows** cleanly in the UI

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
