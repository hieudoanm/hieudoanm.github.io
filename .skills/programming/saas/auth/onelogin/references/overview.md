# Overview

Focused reference for **onelogin**, excerpted from SKILL.md. The skill file remains the canonical guide.

# OneLogin Best Practices

OneLogin is a cloud identity provider popular for enterprise SSO and lifecycle management. Best practice is using it as the **enterprise IdP and policy engine**: federate with SAML/OIDC, drive authorization from groups, and honor the directory as the source of truth for user lifecycle.

---

## 1. Core Stack & Concepts

- **SAML 2.0** for app SSO; **OIDC** for modern apps where supported
- **Apps** in OneLogin = connections to your applications (SP metadata)
- **Groups/Roles** map to authorization claims
- **Smart MFA / policies** apply adaptive rules (device, location, risk)
- **SCIM** for automated user provisioning to targets

```
Enterprise directory ──► OneLogin (IdP) ──(SAML/OIDC)──► Your App
                            │
                            └──(SCIM / claims)──► Authorization from groups
```
