---
name: onelogin
description: Best practices for integrating OneLogin as an enterprise identity provider. Use when adding SSO (SAML/OIDC), directory sync, or policy-based authentication — covers federation, group-based access, and IdP-driven lifecycle.
---

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

---

## 2. Integration Patterns

- **Register each application as a OneLogin "app"** with its own SP/ACS config
- **Consume SAML assertions** signed + validated (audience, `InResponseTo`, expiry)
- Use **OIDC where your app supports it**; SAML remains the enterprise default
- **One connector per integration**, treat metadata (certificates, ACS URLs) as config

---

## 3. Authorization & Lifecycle

- **Map OneLogin groups to your roles/claims** — the IdP is the source of group truth
- **Honor deprovisioning**: directory disable/delete should cascade to your service via SCIM
- Expect **group drift** — sync or refresh group claims on a schedule
- Support **just-in-time provisioning** where directories don't SCIM

---

## 4. Security & Operations

- **Enable MFA and adaptive/smart policies** for production
- Rate-limit **ACS/login endpoints**; monitor for credential stuffing
- Enforce **least-privilege roles**; audit admin usage in OneLogin
- **Never log assertions/tokens**; keep secrets server-side
- Rehearse **IdP outage handling** — local token validation keeps reads working
- Monitor:
  - **SAML certificate expiry** (upstream rotation breaks login)
  - **sync/provisioning failures**
  - **failed login spikes**

---

## 5. General Rules of Thumb

- **Sehel plugin: OneLogin is the enterprise policy engine** — it decides who can sign in
- **Groups are the authorization contract** — your service consumes claims, not guesses
- **Directory is the source of truth** — lifecycle flows through SCIM
- **Certificates expire** — track and rotate upstream metadata proactively

---

## Quick-Start Checklist

- [ ] Apps registered with correct SP/ACS metadata; certificates tracked for expiry
- [ ] SAML assertions validated (signature, audience, `InResponseTo`)
- [ ] Groups mapped to authorization claims server-side
- [ ] MFA/smart policies enabled; ACS endpoints rate-limited
- [ ] SCIM provisioning configured; deprovisioning cascades to your app
- [ ] Local token validation; no assertion/token logging
- [ ] IdP outage rehearsed; sync and login failures monitored
- [ ] Least-privilege roles; admin usage audited