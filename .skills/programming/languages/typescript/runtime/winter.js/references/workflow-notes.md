# Workflow notes

Focused reference for **winter.js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
