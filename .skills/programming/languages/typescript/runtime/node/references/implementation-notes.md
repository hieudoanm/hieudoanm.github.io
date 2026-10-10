# Implementation notes

Focused reference for **nodejs-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. HTTP & Networking

- **`fetch` (undici) for outbound requests** — Node's built-in, with timeouts (`AbortSignal.timeout`) and no third-party HTTP client needed for most cases:

```ts
const res = await fetch(url, { signal: AbortSignal.timeout(5_000) });
if (!res.ok) throw new HttpError(res.status);
```

- **`node:http`/`node:https` for servers** (or a framework on top); set `server.setTimeout`, cap body size, and always `end()`/drain responses.
- **DNS/ACME/WebSocket (WebSocket is built in)** come from built-ins — check `node:` modules before adding dependencies.
- **Connection pools and keep-alive** come from undici's `Agent`/`fetch` defaults — configure `Agent({ keepAlive })` explicitly for long-lived processes.

---

## 7. Errors & Logging

- **Errors are data** — typed errors (`class ConfigError extends Error`) with a `cause`; log structured metadata, never `console.log` in prod libraries.
- **Structured logs via `pino` (or `winston`)** to stdout — one JSON line per event, `level`, `msg`, `err`, `reqId`; routing sinks is a deployment concern, not a library one.
- **Never log secrets** — redact `password`/`token`/`authorization` from request/error serialization.
- **`error.cause` chaining** (`new Error("...", { cause })`) preserves the original failure without string-stuffing.

---

## 8. Testing

- **`node:test` + `node --test`** — zero-dependency runner, structured `describe`/`it`/`t`, test files auto-discovered under `test/`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('loads the value when present', () => {
  assert.equal(load('k'), 'v');
});
```

- **`mock` (`t.mock`) for function/API stubbing**; `node:assert/strict` over `assert` — `deepEqual` strictness is where the truth is.
- **Coverage via `--experimental-test-coverage`** for meaningful coverage gates on domain logic; `node --test --test-reporter=spec` for CI-readable output.
- **Name tests as specifications**; use subtests (`t.test`) for parameterized tables.

---
