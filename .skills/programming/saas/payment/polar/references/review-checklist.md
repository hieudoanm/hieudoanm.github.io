# Review checklist

Focused reference for **polar**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. General Rules of Thumb

- **Benefits are the product** — entitlements you grant based on paid/active state
- **Polar is the MoR** — tax/invoicing is theirs; fulfillment is yours
- **Webhooks are truth** — verify, dedup, grant/revoke deliberately
- **Metadata/ids connect** — correlation with your users is prerequisite to fulfillment

---

## Quick-Start Checklist

- [ ] Products/tiers + benefits defined; checkout integrated
- [ ] Metadata (user/org) passed for reconciliation
- [ ] Webhook signatures verified; events deduped
- [ ] Benefits granted on active/paid; revoked on revoke/cancel/expire
- [ ] License keys generated + validated server-side where online
- [ ] Order/subscription ids persisted; sandbox/prod separated
- [ ] Webhook failures, churn, grant failures monitored
- [ ] MoR model used; no custom tax logic
