# Overview

Focused reference for **nodejs-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Node.js Runtime Best Practices

Node.js is a single-threaded, event-loop-based JavaScript runtime with a rich set of standard modules. The modern runtime has converged on ESM, `node:` (and `node:test`) built-ins, first-class `fetch`, and smooth TypeScript — so "best practice" is about writing non-blocking I/O, managing the process lifecycle explicitly, and using the well-trodden tools (`node --watch`, `--env-file`, `node:test`) instead of re-inventing them.

---

## 1. Module System (ESM by Default)

- **ESM everywhere** — `"type": "module"` in `package.json`, `import` over `require`; no CJS interop friction for new code.
- **Use `node:` prefix** for built-ins so they're unambiguous and not shadowable: `import { readFile } from "node:fs/promises"`.
- **TypeScript runs first-class** — Node 22.6+ (type stripping) and 23.6+/24 (enabled by default) execute `.ts` directly; keep `--experimental-transform-types`/`erasableSyntaxOnly` in mind and keep types erasable (no enums/namespaces in hot paths if runtime-TS).
- **`import.meta.url` / `import.meta.dirname`** replace `__dirname` for file-path resolution in ESM:

```ts
import { fileURLToPath } from 'node:url';
const cwd = import.meta.dirname;
```

- Top-level `await` is fine in modules — but use it at the composition root, not scattered in libraries.

---

## 2. The Event Loop & Non-Blocking I/O

- **Never block the event loop** — synchronous `fs`, `crypto`, or `JSON.parse` of huge inputs on the hot path starve every request. Prefer `node:fs/promises` and async crypto.
- **CPU-bound work belongs in `worker_threads`** — not on the main thread, and not as micro-optimized callbacks. A reasonable threshold: sustained compute > ~1–5ms per call should move off-thread.
- **`util.promisify`/async APIs over raw callbacks** in libraries you control; keep callback styles only at SDK compatibility boundaries.
- **Backpressure matters in streams** (see §3) — awaiting `drain`/using `pipeline` keeps memory bounded when producers outrun consumers.

---

## 3. Streams & Large Data

- **`stream.pipeline` for composed stream chains** — none of the errors leak, and it cleans up automatically:
