# Workflow notes

Focused reference for **osso**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Integration Patterns

- **Initiate SP login to Osso**, which handles the IdP selection for the organization
- **One connection per enterprise customer** — store/cache IdP metadata on their onboarding
- Osso is the **only SAML participant** in your stack — services don't speak SAML directly
- Use **IdP metadata/certificate rotation** updates as normal config operations, not code changes

---

## 3. Deployment & Operations

- **Self-host with its required dependencies** (Postgres, mailer, worker) on stable infrastructure
- **TLS everywhere**; restrict administrative access
- Back up the **DB (connections + metadata) and secrets**
- Pin versions; follow upgrade notes — SAML and IdP ecosystems move
- Monitor:
  - **failed SAML exchanges / certificate errors**
  - **IdP metadata staleness** (certificate rotation breaks login)
  - **SCIM sync failures**
