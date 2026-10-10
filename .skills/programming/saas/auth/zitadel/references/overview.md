# Overview

Focused reference for **zitadel**, excerpted from SKILL.md. The skill file remains the canonical guide.

# ZITADEL Best Practices

ZITADEL is an identity and access management platform built on event sourcing (like Auth0/Keycloak but open source, Go-native). Best practice is using its **project/org model** for isolation, letting it own the authn user experience while your services enforce authz from verified claims, and validating tokens locally.

---

## 1. Core Stack & Concepts

- **Instances** = isolated deployments; **organizations** = tenants within an instance; **projects** = applications/services
- **Grants** connect organizations to projects — the isolation/access model
- **OIDC** primary (SAML available): authorization code + PKCE, `client_credentials`, device flow
- **User federation** via external identity providers; built-in IdP for native users
- **Human users vs machine users** (service accounts) — distinct auth paths

```ts
// local validation with ZITADEL's well-known JWKS
const { payload } = jwt.verify(token, jwks, {
  issuer: "https://your-instance.zitadel.cloud",
  audience: "your.com/business/project",
});
```
