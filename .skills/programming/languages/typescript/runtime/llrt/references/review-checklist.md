# Review checklist

Focused reference for **llrt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. CI & Testing

- **Local dev parity (`llrt` CLI download + handler harness) — the runtime differs from Node; test it:**
- **Golden output per event type; latency CI gate (cold start budget in the pipeline).**
- **Version-pin the runtime + dependencies; refresh on dot-releases deliberately.**

---

## General Rules of Thumb

- **Pin the LLRT version/layer; deploy the binary explicitly.**
- **Stay on the supported surface — feature-detect, avoid Node-only globals.**
- **Bundle small; lazy-import; measure cold start under load.**
- **S3/API/EventBridge handlers as pure functions; structured logs.**
- **CI tests on the actual runtime + latency budget.**

---

## Quick-Start Checklist

- [ ] LLRT binary/layer version pinned (SHA); deployment doc written
- [ ] Runtime surface audited; feature-detects at Node-isms
- [ ] Bundle minimized; lazy imports in branches; cold-start measured
- [ ] Async handlers + SDK v3 subset pinned
- [ ] Structured JSON logs; timing breadcrumbs
- [ ] CI harness on the real runtime; latency gate enforced
