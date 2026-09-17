# Implementation notes

Focused reference for **onelogin**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
