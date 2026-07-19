# Auth0 Best Practices: Workflow Checklist

A practical run sheet for applying [Auth0 Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **OIDC/OAuth2**: use the standardized flows (authorization_code + PKCE for SPAs/native, client_credentials for machine-to-machine)
- [ ] 1. Core Stack & Concepts: **Tenants** isolate environments (dev/prod); **organizations** group users
- [ ] 2. Integration & Token Handling: **Validate access tokens on every protected request** — signature, issuer, audience, expiry
- [ ] 2. Integration & Token Handling: **Never send the ID token to your API** to carry authorization; use the access token and its claims/scopes
- [ ] 3. Security: **Enable MFA** for production users; enforce for elevated roles
- [ ] 3. Security: **Enable brute-force protection and bot detection** for the login endpoints
- [ ] 4. Reliability & Operations: Handle **JWKS fetch caching** (keys rotate); fall back to re-fetch on kid unknown
- [ ] 4. Reliability & Operations: **Gracefully handle auth outages** — token validation is local; only login/refresh needs the provider
- [ ] 5. General Rules of Thumb: **Validate tokens locally, never per-request network calls to Auth0**
- [ ] 5. General Rules of Thumb: **Trust the token, not the browser** — authorization is server-enforced

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
