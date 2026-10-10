# Review checklist

Focused reference for **klarna**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. General Rules of Thumb

- **Session-first: create on server, render on client, capture on server**
- **Capture is where money lands** — authorize-then-capture, never double
- **Webhooks reconcile state** — trust them + re-check with GET Order
- **Server-side amounts and credentials** — the payment trust boundary

---

## Quick-Start Checklist

- [ ] Checkout session created server-side with correct country/currency/locale
- [ ] Amounts/line items from server logic only
- [ ] Authorization → capture flow; single capture; expiry handling
- [ ] Refunds via order management
- [ ] Webhooks registered + verified; events deduped/processed
- [ ] Reconcile with GET Order on divergence
- [ ] Playground vs Production separated; credentials server-side
- [ ] Auth→capture mismatches, abandonments, capture failures monitored
