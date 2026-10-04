---
name: zitadel
description: Best practices for running ZITADEL as a self-hosted or managed identity provider. Use when deploying realms/projects, configuring OIDC clients, or integrating IAM for your product — covers project/isolation model, token validation, and production operations.
---

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

---

## 2. Isolation & Project Model

- **One project per logical service scope**; align `aud` with the project/application
- Use **grants** to delegate org membership to projects — don't flatten every org into one role bag
- **Instances separate prod/stage/dev** and even different customers/clusters
- Configure **project roles** and have clients assert them via OIDC claims (userinfo/access token)

---

## 3. Integration & Token Handling

- **Validate access tokens locally** (RS256 + JWKS): `iss`, `aud`, `exp`
- **Cache JWKS** and handle key rotation (re-fetch on unknown `kid`)
- **Authorization from claims/grants**, not client-supplied headers
- Use **machine users with scoped `client_credentials`** for server-to-server
- **Never store or log tokens**; keep refresh tokens server-side

---

## 4. Security & Operations

- **Enable MFA and passwordless** (passkeys) per policy; enforce for admins
- **Brute-force protection and lockout policies** configured
- Secure the **admin (console/API)** surface; least-privilege machine users
- **Backups and HA** are part of operations — event-sourced store still needs consistent backups
- Monitor:
  - **login failures/lockouts**
  - **JWKS/key rotation errors**
  - **token validation failures falling back to network**
- Keep **instances and orgs** cleanly separated to match your tenancy model

---

## 5. General Rules of Thumb

- **Instances/orgs/projects are the isolation model** — design tenancy around grants, not hacks
- **Let ZITADEL own the sign-in UX; you own authz from claims**
- **Local validation + cached JWKS** — services shouldn't hit the IdP per request
- **Machine users and humans are distinct** — use the right flow for each

---

## Quick-Start Checklist

- [ ] Instance/org/project/grants modeled to match your tenancy
- [ ] OIDC flows correct: PKCE public clients, `client_credentials` M2M
- [ ] Access tokens validated locally (JWKS cached) — `iss`/`aud`/`exp`
- [ ] Authorization from claims/grants; no client-supplied headers
- [ ] MFA/passwordless + lockout policies enabled; admin access secured
- [ ] No token/secret logging; refresh tokens server-side
- [ ] Backups + HA planned; key rotation and failures monitored
- [ ] Staging/prod instances separated; upgrades rehearsed