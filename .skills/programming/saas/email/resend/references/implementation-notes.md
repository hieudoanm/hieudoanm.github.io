# Implementation notes

Focused reference for **resend**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ts
// bounce webhook → remove address from future sends
if (payload.data && payload.data.event === "email.bounced") {
  await suppressionList.add(payload.data.email);
}
```

---

## 4. Reliability & Operations

- **Retry with backoff on 4xx/5xx** (429 rate limit, 500) — idempotent sends only
- Handle **rate limits** explicitly; batch vs throttle according to plan
- **Secret/API key server-side only**; never in client bundles
- Keep **templates + addresses** data-separated (PII minimal; email = personal data)
- Monitor:
  - **send success/failure rates**
  - **bounce/complaint rates per domain**
  - **webhook processing lag**
- **Log event IDs**, not full payloads; keep privacy in mind

---

## 5. General Rules of Thumb
