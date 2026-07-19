# Implementation notes

Focused reference for **postmark**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Reliability & Operations

- **Retry with backoff** on 422 (validation), 429 (rate limit), and 5xx — idempotent
- 200 means **accepted**, not delivered — delivery truth is in the webhooks
- Handle **rate limits / throughput plans** deliberately
- **PII-aware**: emails are personal data — minimal retention, aligned with policy

---

## 5. General Rules of Thumb

- **Transactional means behavioral** — Postmark is not a campaign tool
- **Streams isolate reputation** — separate transactional from notifications
- **Webhooks are the delivery truth** — bounces surface vs silently slipping
- **Suppression is proactive** — let Postmark + your list both prune
