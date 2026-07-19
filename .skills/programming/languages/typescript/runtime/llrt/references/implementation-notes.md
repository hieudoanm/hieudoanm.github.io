# Implementation notes

Focused reference for **llrt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Lazy-import heavy helpers inside branches (only on the code path hit).**
- **No `npm install` behemoths; tree-shake servless zip; measure `initDuration` in CloudWatch.**

---

## 4. Async & Events

- **Async handlers supported; use `Promise`-based APIs, no multi-busy event-loop games.**
- **Connect to AWS SDK v3 subset (`@aws-sdk/` packs supported) — profile the pack versions.**
- **Streaming responses where amplitude allows; document event-source contracts (S3/API GW/EventBridge).**

---

## 5. Logging & Observability

- **Console logging via CloudWatch (stdout) — no fancy logger dependencies:**
- **`performance.now()`/timing embedded in the response for latency breadcrumbs.**
- **Structured logs (JSON) for `awslogs` filtering — parseable, keyed.**

---
