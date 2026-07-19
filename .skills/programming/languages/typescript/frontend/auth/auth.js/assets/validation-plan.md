# Auth.js Best Practices: Validation Plan

Use this plan to verify work guided by [Auth.js Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **AUTH_SECRET/secret long, rotated; provider secrets never in client bundles.**
- [ ] **CSRF/callbackUrl handling sanctioned (NextAuth handles most — verify redirect sanity).**
- [ ] **Rate-limit the credential path; lockout on brute-force via stored throttling.**
- [ ] **Audit dependency upgrades (@auth/* versioning reviewed); logs redact PII.**

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
