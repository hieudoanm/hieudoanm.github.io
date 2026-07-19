# Workflow notes

Focused reference for **onelogin**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
