# Workflow notes

Focused reference for **revenuecat**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Integration & SDK Use

- **Configure offerings/products in the dashboard**, referenced by ID in code
- Handle **purchase success → check entitlement** on the client, but **persist server-side via webhook**
- **Respect platform rules**: consumables, non-consumables, auto-renew only where store policies allow
- **Package/offering IDs stable** — don't change IDs across versions casually
- Test with **sandbox/TestFlight + RC sandbox** before release; separate RC keys per env

---

## 3. Entitlements & Backend Truth

- **Verify entitlement status server-side** through SDk/webhook or `GET /subscribers/{app_user_id}` — don't trust client-side flags for security-sensitive features
- **Cache entitlement lookups with timeout** — don't hit RC on every request
- **Webhooks carry the truth**: subscribe to the canonical events, verify API keys, dedup by event id
- Map **active entitlement → feature access**; revoke when entitlements are revoked/expire
- **Handle subscription transfers and proration** events to keep state consistent

```ts
// backend reflects webhook: grant/revoke entitlement server-side
switch (event.type) {
  case "CUSTOMER_ENTITLEMENT_CREATED": await grant(event.app_user_id, event.entitlement_id); break;
  case "CUSTOMER_ENTITLEMENT_REVOKED": await revoke(event.app_user_id, event.entitlement_id); break;
}
```

---
