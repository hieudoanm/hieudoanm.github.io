# Implementation notes

Focused reference for **sendgrid**, excerpted from SKILL.md. The skill file remains the canonical guide.

```js
// bounce webhook → suppress address
if (event.event === "bounce" || event.event === "spamreport") {
  await suppressionList.add(event.email);
}
```

---

## 4. Reliability & Operations

- **Retry with backoff** on 429 (rate-limited) and 5xx; treat 2xx as accepted (delivery is async)
- Understand **throttling** — plan send rates within your plan's limits
- Handle **async delivery** — a 202 means queued, not delivered; rely on events for truth
- Keep **template + recipient data minimal** and PII-aware
- Monitor:
  - **send failure/error rates**
  - **bounce + spam-report rates**
  - **delivery latency (processed → delivered)**
  - **webhook processing lag**

---

## 5. General Rules of Thumb
