# Implementation notes

Focused reference for **winter.js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
