---
name: winter.js-best-practices
description: Best practices for building with WinterJS — the WinterCG-compliant JavaScript runtime conventions. Use when writing, structuring, or reviewing WinterJS deployments — covers the runtime, WinterCG APIs, deployment (Cloudflare-style), and compatibility.
---

# WinterJS Best Practices

WinterJS (**Winter Runtime**, from wasmer/Sparkle) is **a WinterCG-compliant runtime for the modern web-beyond—a HTTP/Node-compatible, deploy-fast layer** — designed around the WinterCG interoperability spec (`fetch`-first, `Request`/`Response`, `WebStreams`, no Node-only process APIs). Practical WinterJS leans on **platform APIs over Node built-ins (WinterCG surface), declarative deployments (Cloudflare Workers-like), and strict third-party-bundle discipline** — code that is WinterCG-clean runs unmodified across Cloudflare Workerd, LLRT, and Node-with-adapters.

---

## 1. Runtime & Compatibility

- **WinterCG-compliant code first: `fetch`/`Request`/`Response`/`TextEncoder`/`crypto.crypto.subtle`:**

```js
export default {
  async fetch(request) {
    return new Response("pong", { status: 200 });
  },
};
```

- **Policy: if it needs `process.`/`fs`, it's Node-specific — guard it or refactor to WinterCG.**
- **Feature-detect across runtimes (`typeof Deno`, `typeof Worker`, `globalThis.process`) at boundaries.**

---

## 2. The Fetch-First Model

- **Handlers are `fetch(env, ctx)` — entries mirror Serverless/Workers:**

```js
export default {
  async fetch(request, env, ctx) {
    const logs = await env.DB.prepare("SELECT 1").first();
    return Response.json(logs);
  },
};
```

- **Stream responses via `ReadableStream`/`Response.body` — WinterCG streams interop broadly.**
- **Bindings/env (`env.DB`, secrets) are the injected contract — no ambient globals.**

---

## 3. Deployment & Config

- **Deploy via wasmer (Sparkle/`wasmer deploy`) with a `wasmer.toml` describing routes/env:**

```toml
[package] name = "my-app"      # wasmer deploy runs the WinterJS server
[[routes]] glob = "**" -> "http://localhost:3000"
```

- **Env variables via the deploy platform; secrets through platform stores — never inline.**
- **Local dev: `wasmer` run or the WinterJS binary; parity checked before CI.**

---

## 4. State & Storage

- **Stateless handlers: no in-memory state across invocations (short-lived instances):**
- **Persist via bindings (`env.DB` (sqlite), KV, postgres adapters) — not process memory.**
- **Cache/edge placement per route; staleness policies deliberate.**

---

## 5. Ecosystem & Adapters

- **Adapters for mainstream frameworks (Hono, etc.) selective — WinterCG-compatible pieces only:**
- **Respect the "one runtime" rule: code that runs on Workerd-LLRT-WinterJS is your unlock — test each.**
- **Bundler (`wasmer-pack`) static-first; avoid dynamic `require` in the bundle path.**

---

## 6. Testing & Ops

- **Tests: local run + `fetch`-level integration; parity suite across runtimes:**

```js
const res = await app.fetch(new Request("https://example/"));
```

- **Observability: structured logs (`console.log(JSON.stringify(...))`), OpenTelemetry-adjacent when supported.**
- **Latency/startup measured under the deploy target; version runtime + adapter pinned.**

---

## General Rules of Thumb

- **WinterCG-first: `fetch`/`Response`/streams; no Node-process reliance.**
- **Handlers pure: `fetch(env, ctx)`; state via platform bindings.**
- **Deploy via `wasmer deploy` + `wasmer.toml`; secrets via the platform.**
- **Adapters chosen WinterCG-compatible; runtime versions pinned.**
- **Parity-tested across Workerd/LLRT/Node-with-adapters.**

---

## Quick-Start Checklist

- [ ] `fetch`-type entry (WinterCG); streams used ergonomically
- [ ] No unconditional `process.*`/`fs` in the public path
- [ ] `wasmer.toml` routes/env; secrets via platform store
- [ ] Stateless handlers; persistence through bindings
- [ ] Adapters WinterCG-only; bundle size kept lean
- [ ] Local-run parity tests + structured observability