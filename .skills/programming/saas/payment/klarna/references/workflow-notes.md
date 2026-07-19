# Workflow notes

Focused reference for **klarna**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Integration & Checkout

- **Create the session server-side** with `purchase_country`, `purchase_currency`, locale, and line items
- Pass **order amounts/items from your cart logic**, never client-supplied totals
- Use session flow with **iframe/redirect** (don't build raw funding").locale
- Capture the returned `order_id`; keep it for order-management calls
- **Testing**: set `merchant_reference1` (order id) and test amounts; use Playground tokens

---

## 3. Authorization & Capture

- After client approval, **authorize** then **capture** (full or partial)
- **Capture once** — double-capture is a chargeback/lost-money path
- Handle **authorization expiries** (Klarna authorizations expire; re-auth needed) explicitly
- Use **holding/auto-capture** only when appropriate for your business model
- **Refund** via order management when requested
