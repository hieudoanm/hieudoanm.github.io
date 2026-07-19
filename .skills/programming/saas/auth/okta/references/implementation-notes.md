# Implementation notes

Focused reference for **okta**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Security & Operations

- **Enable MFA + adaptive auth policies** for production
- **Rate-limit login endpoints**; monitor for credential-stuffing
- **Never store or log tokens**; refresh tokens server-side
- **Least-privilege scopes and groups** — no wildcard grants
- Rehearse **SSO outage handling** — validate tokens locally so reads work while the IdP is down

---

## 5. General Rules of Thumb

- **Groups, not roles** — authorization flows from IdP group membership
- **Validate locally, authorize from claims** — the trust boundary is the verified token
- **Lifecycle is an integration** — SCIM/provisioning aligned with deactivation, not afterthought
- **SSO reliability matters** — cache JWKS, plan for IdP outages
