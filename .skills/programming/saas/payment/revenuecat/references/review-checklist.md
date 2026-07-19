# Review checklist

Focused reference for **revenuecat**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **RC = source of truth** for entitlements across native stores
- **Webhooks + API sync** — client SDKs are entry points, not authority
- **Entitlement-aware features** — gate code paths on active entitlements, not store receipt hacks
- **Store compliance respected** — offerings, paywalls, trials aligned with policy

---

## Quick-Start Checklist

- [ ] Offerings/products configured; SDK integrated on each platform
- [ ] Purchase → entitlement flow tested in sandbox; RC keys per env
- [ ] Webhooks verified + deduped; entitlement events processed backend
- [ ] Server-side entitlement checks (SDK verify / API) not client-only flags
- [ ] Revoke on entitlement revoked/expired; refunds handled
- [ ] Offers/trials monitored for conversion; transfer/proration handled
- [ ] Periodic reconciliation vs subscribers endpoint
- [ ] Secrets server-side; grant/revoke and webhook failures monitored
