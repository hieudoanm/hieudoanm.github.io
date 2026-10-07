---
name: llrt-best-practices
description: Best practices for building with LLRT (Low Latency Runtime) — the fast AWS Lambda JavaScript runtime conventions. Use when writing, structuring, or reviewing LLRT-based serverless — covers runtime install/pinning, compat surface, Cold starts, and AWS integration.
---

# LLRT Best Practices

LLRT (**Low Latency Runtime**) is **an optimized-embedding runtime (QuickJS-based) for AWS Lambda JS functions — cold starts ~2–5x faster than Node** with a trimmed engine surface. Practical LLRT leans on **explicit runtime pinning (`aws-lambda-js-rt` extension / binary download), staying inside the supported JS surface (no Node-only globals), small bundles, and measuring cold-start under your own load** — LLRT's wins come from its env (embedding) — respect that: fewer deps, fewer Node-isms.

---

## 1. Runtime Setup

- **Pin the LLRT layer/version explicitly:**

```bash
# Package the function with the LLRT binary as the container entrypoint
```

- **Official pattern: image `public.ecr.aws/lambda/llrt` (or the binary in memory) pinned by SHA;**
- **Functions deployed with `Runtime: provided.al2`/custom + LLRT runtime handler — document the version parity.**

---

## 2. Surface & Compatibility

- **LLRT supports a subset: no full Node DOM/node_modules surface — `node:` built-ins are minimized:**
- **Static-only require/import lives fine; dynamic-plugin ecosystems (fastify-style init) may not fit.**
- **Feature-detect (`typeof process !== "undefined"`, `typeof body` reach) at the seams:**

```js
if (typeof BinaryDecoder !== "undefined") { /* … */ }
```

- **Standard web globals (`fetch`, `URL`, `TextEncoder`) available — but CONFIRM at the pinned version.**

---

## 3. Cold Start & Bundle

- **Cold start = billed latency — keep bundles small, code shallow:**

```js
// minimal handler, imports flattened
export async function handler(event) {
  return { statusCode: 200, body: "pong" };
}
```

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