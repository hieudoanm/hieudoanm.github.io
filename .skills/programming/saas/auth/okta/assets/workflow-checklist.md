# Okta Best Practices: Workflow Checklist

A practical run sheet for applying [Okta Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **OIDC** for modern apps; **SAML** for enterprise SSO with legacy IdPs
- [ ] 1. Core Stack & Concepts: **Groups** carry authorization (returned as claims) — the primary authorization primitive
- [ ] 2. Integration & Token Handling: **Validate access/ID tokens locally** (RS256 + JWKS), checking iss, aud, exp
- [ ] 2. Integration & Token Handling: **Use group claims for authorization decisions** — not custom headers from the client
- [ ] 3. SSO, Federation & Provisioning: Use **Okta as an IdP or rely on its federation** to integrate enterprise SAML sources
- [ ] 3. SSO, Federation & Provisioning: **SCIM** for automated user provisioning/deprovisioning from HR systems
- [ ] 4. Security & Operations: **Enable MFA + adaptive auth policies** for production
- [ ] 4. Security & Operations: **Rate-limit login endpoints**; monitor for credential-stuffing
- [ ] 5. General Rules of Thumb: **Groups, not roles** — authorization flows from IdP group membership
- [ ] 5. General Rules of Thumb: **Validate locally, authorize from claims** — the trust boundary is the verified token

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
