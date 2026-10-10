# OneLogin Best Practices: Workflow Checklist

A practical run sheet for applying [OneLogin Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **SAML 2.0** for app SSO; **OIDC** for modern apps where supported
- [ ] 1. Core Stack & Concepts: **Apps** in OneLogin = connections to your applications (SP metadata)
- [ ] 2. Integration Patterns: **Register each application as a OneLogin "app"** with its own SP/ACS config
- [ ] 2. Integration Patterns: **Consume SAML assertions** signed + validated (audience, InResponseTo, expiry)
- [ ] 3. Authorization & Lifecycle: **Map OneLogin groups to your roles/claims** — the IdP is the source of group truth
- [ ] 3. Authorization & Lifecycle: **Honor deprovisioning**: directory disable/delete should cascade to your service via SCIM
- [ ] 4. Security & Operations: **Enable MFA and adaptive/smart policies** for production
- [ ] 4. Security & Operations: Rate-limit **ACS/login endpoints**; monitor for credential stuffing
- [ ] 5. General Rules of Thumb: **Sehel plugin: OneLogin is the enterprise policy engine** — it decides who can sign in
- [ ] 5. General Rules of Thumb: **Groups are the authorization contract** — your service consumes claims, not guesses

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
