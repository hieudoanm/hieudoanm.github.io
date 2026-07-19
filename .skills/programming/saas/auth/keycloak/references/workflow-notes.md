# Workflow notes

Focused reference for **keycloak**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
