# ZITADEL Best Practices: Workflow Checklist

A practical run sheet for applying [ZITADEL Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Instances** = isolated deployments; **organizations** = tenants within an instance; **projects** = applications/services
- [ ] 1. Core Stack & Concepts: **Grants** connect organizations to projects — the isolation/access model
- [ ] 2. Isolation & Project Model: **One project per logical service scope**; align aud with the project/application
- [ ] 2. Isolation & Project Model: Use **grants** to delegate org membership to projects — don't flatten every org into one role bag
- [ ] 3. Integration & Token Handling: **Validate access tokens locally** (RS256 + JWKS): iss, aud, exp
- [ ] 3. Integration & Token Handling: **Cache JWKS** and handle key rotation (re-fetch on unknown kid)
- [ ] 4. Security & Operations: **Enable MFA and passwordless** (passkeys) per policy; enforce for admins
- [ ] 4. Security & Operations: **Brute-force protection and lockout policies** configured
- [ ] 5. General Rules of Thumb: **Instances/orgs/projects are the isolation model** — design tenancy around grants, not hacks
- [ ] 5. General Rules of Thumb: **Let ZITADEL own the sign-in UX; you own authz from claims**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
