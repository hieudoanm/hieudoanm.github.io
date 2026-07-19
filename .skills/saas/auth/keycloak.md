---
name: keycloak
description: Best practices for running Keycloak as a self-hosted identity provider. Use when deploying Keycloak, configuring realms/clients, or integrating OIDC/SAML — covers realm isolation, token validation, high availability, and upgrades.
---

# Keycloak Best Practices

Keycloak is an open-source, self-hosted identity and access management server supporting OIDC and SAML. Best practice is running it as a **managed platform piece**: realms for isolation, clients with least-privilege, DB-backed state for HA, close attention to upgrades, and local token validation on the application side.

---

## 1. Core Stack & Concepts

- **Realms** are isolated identity domains (analogous to tenants) — one realm per environment/business unit
- **Clients** define consumers (SPA, native, backend) with their own flows and scopes
- **OIDC** (primary) and **SAML** (legacy/federation) supported
- Backend storage: **database (PostgreSQL by default)** — not the default in-memory H2/Dev mode for prod
- **Admin Console** config + **Admin/REST API** for automation and provisioning

```sh
# external PostgreSQL is the production requirement
docker run --name keycloak-db -e POSTGRES_DB=keycloak -e POSTGRES_USER=keycloak \
  -e POSTGRES_PASSWORD=changeme postgres:16
docker run --name keycloak --link keycloak-db:postgres quay.io/keycloak/keycloak:24 \
  start --db=postgres --features=declarative-ui
```

---

## 2. Deployment & High Availability

- **External database (PostgreSQL) with periodic backups** — state lives in DB, not in-pod storage
- Run **multiple Keycloak nodes** sharing the DB for HA; use a load balancer
- **Hostname/URL configuration** (`KC_HOSTNAME`) set explicitly for production; avoid the default `localhost`
- **Enable production mode** (`start` not `start-dev`); disable Dev mode settings
- **TLS termination** at LB or node; never expose plaintext admin over HTTP
- Plan **failover and restore** — rehearse restoring from backups

---

## 3. Realm & Client Configuration

- **One realm per environment/tenant** — dev/stage/prod isolated
- **Clients with least privilege**: correct access type (public/confidential), minimal redirect URIs, scoped roles
- Use **service accounts + `client_credentials`** for server-to-server
- **PKCE required** for public clients (native/SPA)
- Apply **custom password policies, MFA (OTP/WebAuthn)** per realm requirements
- Enable **brute-force protection** per realm for login flows

---

## 4. Token & Integration Security

- **Validate access tokens locally** (RS256 + JWKS), checking `iss`/`aud`/`exp` — avoid per-request calls to Keycloak
- **Cache JWKS** and handle key rotation (re-fetch on unknown `kid`)
- Use **claims** (roles, groups, `aud`) for authorization — don't trust client-sent headers
- **Never store or log tokens**; keep refresh tokens server-side
- Protect the **Admin API** and admin account with strong auth; rotate admin credentials

---

## 5. Upgrades & Operations

- **Upgrades are significant events** — read the release upgrade notes; breaking changes are common between majors
- Test upgrades in a staging realm/database first
- **Back up the database + secrets** before upgrades; have a rollback plan
- Monitor:
  - **DB health and connection count**
  - **login failures / brute-force lockouts**
  - **token signing key rotation errors**
  - **JVM heap / GC** on nodes
- Pin versions; avoid running `start-dev` anywhere near production

---

## 6. General Rules of Thumb

- **Keycloak is a platform service** — external DB, HA nodes, rehearsed restore
- **Realms isolate; clients least-privilege** — the configuration discipline
- **Validate locally, authorize from claims** — your services don't ping Keycloak per request
- **Upgrades are planned migrations, not piped operations**

---

## Quick-Start Checklist

- [ ] External PostgreSQL configured with backups; no Dev mode in prod
- [ ] Multiple nodes + LB for HA; `KC_HOSTNAME` and TLS configured
- [ ] Realms isolated per environment/tenant
- [ ] Clients least-privilege, minimal redirect URIs, PKCE for public clients
- [ ] MFA/OTP + brute-force protection enabled per realm
- [ ] Tokens validated locally (JWKS cached); issuer/audience checked
- [ ] No token/secret logging; admin access protected and audited
- [ ] Upgrade rehearsed in staging; rollback plan ready; metrics monitored