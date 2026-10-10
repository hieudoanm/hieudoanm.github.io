# Overview

Focused reference for **keycloak**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
