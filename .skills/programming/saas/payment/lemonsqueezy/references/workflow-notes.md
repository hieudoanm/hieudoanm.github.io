# Workflow notes

Focused reference for **lemonsqueezy**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Checkout & Correlation

- Create **products/variants** in the dashboard/API; embed checkout link or overlay
- Pass **`custom` fields** (user_id, order context) so webhooks map back to accounts
- **Amounts always server-side/from the catalog** — never client-supplied totals
- Prefer **`checkout` session creation** over hand-built URLs where client token flow is desired

---

## 3. Webhooks & Entitlement

- **Verify webhook signatures** (HMAC `X-Signature` against raw body + webhook secret) before trusting payloads
- **Dedup by event id** (`data.id` / event identifier) — delivery can repeat
- Handle the **canonical events**:
  - `order_created`, `subscription_created`, `subscription_cancelled`, `subscription_resumed`, `subscription_expired`, `subscription_paused`
- **Grant access on paid/active state** (order paid, subscription active), **revoke on cancellation/expiry**
- For **license keys**: embed user/plan in the key payload and validate server-side where online

```ts
const sig = req.headers["x-signature"];
const digest = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
if (sig !== digest) return res.status(401).end();
// event.data → dedup → entitlement updates
```

---
