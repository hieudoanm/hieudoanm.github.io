# Overview

Focused reference for **osso**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
