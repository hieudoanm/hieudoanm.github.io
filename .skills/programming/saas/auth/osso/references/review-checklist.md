# Review checklist

Focused reference for **osso**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## Quick-Start Checklist

- [ ] SAML login flow works via Osso (SP-initiated) with one connection per customer
- [ ] IdP metadata stored/cached as data; rotation is a config op
- [ ] SCIM directory sync configured for user provisioning/deprovisioning
- [ ] Production deployment: Postgres + worker + TLS + admin access restricted
- [ ] Backups of connection DB + secrets; upgrade process rehearsed
- [ ] SAML/ACS endpoints rate-limited; assertions validated (`InResponseTo`)
- [ ] Certificate/metadata staleness monitored; no assertion or session logging
