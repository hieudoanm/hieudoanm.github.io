# Review checklist

Focused reference for **onelogin**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
