# Overview

Focused reference for **okta**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
