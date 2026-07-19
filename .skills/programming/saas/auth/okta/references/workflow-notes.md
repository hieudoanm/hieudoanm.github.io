# Workflow notes

Focused reference for **okta**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Integration & Token Handling

- **Validate access/ID tokens locally** (RS256 + JWKS), checking `iss`, `aud`, `exp`
- **Use group claims for authorization decisions** — not custom headers from the client
- Configure **audiences per API**; don't share one access token for everything
- Use **client_credentials** for server-to-server, PKCE for public clients
- **Handle key rotation** — cache JWKS and re-fetch on unknown `kid`

---

## 3. SSO, Federation & Provisioning

- Use **Okta as an IdP or rely on its federation** to integrate enterprise SAML sources
- **SCIM** for automated user provisioning/deprovisioning from HR systems
- Terminate/federate **lifecycle** correctly — deactivated != deleted; honor group sync
- **Support signed-out / re-auth flows** through standard OIDC endpoints, not custom hacks
- Plan for **just-in-time provisioning** when SCIM is impractical
