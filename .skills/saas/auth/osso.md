---
name: osso
description: Best practices for self-hosting SSO for B2B SaaS with Osso. Use when adding enterprise SAML login, managing IdP connections, or syncing directory users — covers SAML flows, connection management, and production deployment.
---

# Osso Best Practices

Osso is an open-source, self-hosted SAML SSO service for B2B SaaS products — the "Auth0 for enterprise on your own infra." Best practice is treating it as an internal identity gateway: SAML termination handled by a single service, IdP connections managed as data, and directory users synced via SCIM for upstream apps like Okta/Azure AD.

---

## 1. Core Stack & Concepts

- **SAML 2.0 IdP-initiated and SP-initiated** login handled centrally by Osso
- **IdP connections** modeled as data — each enterprise customer supplies their IdP metadata
- **Directory sync** (SCIM) to provision/deprovision users from the enterprise directory
- Internal service in your stack — not a public multi-tenant SaaS

```
Browser ──► Your App
               │
               └─► Osso (SAML SP) ◄── SAML ── Enterprise IdP (Okta/AzureAD)
                      │
                      └─► SCIM sync ◄── directory → user provisioning
```

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

---

## 4. Security

- **Keep metadata and certificates up to date per IdP** — expired certs = locked-out customers
- **Never log assertion payloads or session data**
- Rate-limit **SAML/ACS endpoints** to mitigate assertion attacks
- Validate **SAML responses** at Osso (signature + `InResponseTo`)
- Least-privilege access to the **admin API/panel** that manages connections

---

## 5. General Rules of Thumb

- **One SAML gateway for your entire SaaS** — enterprises connect to Osso, not to each service
- **Connections are data** — on/offboard IdPs as config, never code
- **Certificates expire** — monitor and rotate IdP metadata before upstream certs lapse
- **Upstream sync is the source of truth** — SCIM drives provisioning

---

## Quick-Start Checklist

- [ ] SAML login flow works via Osso (SP-initiated) with one connection per customer
- [ ] IdP metadata stored/cached as data; rotation is a config op
- [ ] SCIM directory sync configured for user provisioning/deprovisioning
- [ ] Production deployment: Postgres + worker + TLS + admin access restricted
- [ ] Backups of connection DB + secrets; upgrade process rehearsed
- [ ] SAML/ACS endpoints rate-limited; assertions validated (`InResponseTo`)
- [ ] Certificate/metadata staleness monitored; no assertion or session logging