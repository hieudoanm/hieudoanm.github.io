# Overview

Focused reference for **winter.js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
