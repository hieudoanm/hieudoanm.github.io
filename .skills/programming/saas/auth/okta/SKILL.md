---
name: okta
description: Best practices for integrating Okta into a backend. Use when adding enterprise authentication, SSO/SAML-OIDC federation, or provisioning — covers token validation, group claims, SSO, and lifecycle management.
---

# Okta Best Practices

Okta is an enterprise identity platform known for SSO, federation, and lifecycle management. Best practice is leveraging it for **federated identity** (SAML/OIDC with enterprise IdPs), validating tokens locally, and relying on **groups as the authorization primitive** rather than custom role plumbing.

---

## 1. Core Stack & Concepts

- **OIDC** for modern apps; **SAML** for enterprise SSO with legacy IdPs
- **Groups** carry authorization (returned as claims) — the primary authorization primitive
- **Okta orgs** vs **identity providers** — Okta can federate external, outbound IdPs
- **MFA/adaptive auth policies** applied at the org policy level

```ts
// groups-as-claims authorization
const { payload } = jwt.verify(token, jwks);
if (!payload.groups.includes("admins")) throw new ForbiddenError();
```

---

## 2. Integration & Token Handling

- **Validate access/ID tokens locally** (RS256 + JWKS), checking `iss`, `aud`, `exp`
- **Use group claims for authorization decisions** — not custom headers from the client
- Configure **audiences per API**; don't share one access token for everything
- Use **client_credentials** for server-to-server, PKCE for public clients
- **Handle key rotation** — cache JWKS and re-fetch on unknown `kid`

---

## 3. SSO, Federation & Provisioning

- Use **Okta as an IdP or rely on its federation** to integrate enterprise SAML sources
- **SCIM** for automated user provisioning/deprovisioning from HR systems
- Terminate/federate **lifecycle** correctly — deactivated != deleted; honor group sync
- **Support signed-out / re-auth flows** through standard OIDC endpoints, not custom hacks
- Plan for **just-in-time provisioning** when SCIM is impractical

---

## 4. Security & Operations

- **Enable MFA + adaptive auth policies** for production
- **Rate-limit login endpoints**; monitor for credential-stuffing
- **Never store or log tokens**; refresh tokens server-side
- **Least-privilege scopes and groups** — no wildcard grants
- Rehearse **SSO outage handling** — validate tokens locally so reads work while the IdP is down

---

## 5. General Rules of Thumb

- **Groups, not roles** — authorization flows from IdP group membership
- **Validate locally, authorize from claims** — the trust boundary is the verified token
- **Lifecycle is an integration** — SCIM/provisioning aligned with deactivation, not afterthought
- **SSO reliability matters** — cache JWKS, plan for IdP outages

---

## Quick-Start Checklist

- [ ] OIDC/SAML chosen to match IdP + app needs; audiences configured per API
- [ ] Tokens validated locally (RS256 + JWKS) — `iss`/`aud`/`exp` checked
- [ ] Authorization via group claims; no client-supplied authorization headers
- [ ] PKCE for public clients; client_credentials for M2M
- [ ] MFA/adaptive policies enabled; brute-force protection on
- [ ] SCIM/lifecycle integration configured; deactivation semantics honored
- [ ] JWKS cached; key rotation handled; SSO outages rehearsed
- [ ] No token/secret logging; least-privilege scopes; prod vs dev orgs separated