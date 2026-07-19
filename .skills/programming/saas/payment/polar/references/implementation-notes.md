# Implementation notes

Focused reference for **polar**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Open-Source & Community

- Map **repo → product/benefit** so funding traces to deliverables (e.g., private Discord, sponsor role)
- **Pledges/donations** are part of the model — support "sponsor me" without an Apple-tax equivalent
- **License keys for desktop/cli** tools — key is proof of purchase; verify against Polar API where online
- Use **campaigns/ads/SRM** features only if they match your monetization; otherwise, keep the surface focused

---

## 5. Reliability & Operations

- **Retry/backoff webhook consumer**; idempotent handlers (dedup by event id)
- Persist **order/subscription ids** in your DB as ground truth for support/refund handling
- **Sandbox vs production** separated; webhook secret server-side only
- Monitor:
  - **webhook failures / lag**
  - **subscription churn and failed renewals**
  - **benefit grant failures** (license generation, repo invite)
- **MoR tax handling** means leaning on Polar's invoices, not your own VAT logic
