---
name: nodejs-runtime
description: Best practices for building applications that run on the Node.js runtime (TypeScript/JavaScript). Use when structuring or reviewing Node.js server, CLI, or library code — covers ESM, the event loop, streams, processes and signals, fs, testing, and tooling.
---

# Node.js Runtime Best Practices

Node.js is a single-threaded, event-loop-based JavaScript runtime with a rich set of standard modules. The modern runtime has converged on ESM, `node:` (and `node:test`) built-ins, first-class `fetch`, and smooth TypeScript — so "best practice" is about writing non-blocking I/O, managing the process lifecycle explicitly, and using the well-trodden tools (`node --watch`, `--env-file`, `node:test`) instead of re-inventing them.

---

## 1. Module System (ESM by Default)

- **ESM everywhere** — `"type": "module"` in `package.json`, `import` over `require`; no CJS interop friction for new code.
- **Use `node:` prefix** for built-ins so they're unambiguous and not shadowable: `import { readFile } from "node:fs/promises"`.
- **TypeScript runs first-class** — Node 22.6+ (type stripping) and 23.6+/24 (enabled by default) execute `.ts` directly; keep `--experimental-transform-types`/`erasableSyntaxOnly` in mind and keep types erasable (no enums/namespaces in hot paths if runtime-TS).
- **`import.meta.url` / `import.meta.dirname`** replace `__dirname` for file-path resolution in ESM:

```ts
import { fileURLToPath } from "node:url";
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

```ts
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";

await pipeline(createReadStream(src), makeTransform(), createWriteStream(dest));
```

- **Awaitables `ReadableStream` from `node:stream/web` for web-API-style consumption**; `stream/consumers` (`text`, `json`, `buffer`) for easy terminal reads of files/HTTP bodies.
- **Process files line-by-line or chunked for big inputs** — don't `readFile` a multi-GB file as one string; stream it.
- Respond to HTTP bodies and DB cursors as streams when the payload is large — buffering everything into memory bounds your parallelism.

---

## 4. Process Lifecycle, Signals & Exit Codes

- **Signal handling at the composition root**, once — SIGINT/SIGTERM begin graceful shutdown (stop accepting, drain, close server):

```ts
import { once } from "node:events";

const server = createServer();
server.listen(PORT);
for (const sig of ["SIGINT", "SIGTERM"] as const) {
    process.once(sig, async () => {
        server.close();
        await drainTasks();                     // flush what's in flight
        process.exit(0);                       // exit AFTER graceful close
    });
}
```

- **Set `process.exitCode` instead of impact-`process.exit()` in library-adjacent code** — exit codes propagate; `process.exit()` can truncate flushed output.
- **`uncaughtException`/`unhandledRejection` handlers log+exit (or log, then re-`throw`)** — a process in an undefined state continuing silently is a worse bug than a crash.
- **`SIGKILL` can't be caught** — that's why graceful shutdown must be fast and idempotent (systemd/Docker timeouts).

---

## 5. Files, Paths & Environment

- **`node:fs/promises` everywhere**, mostly `readFile`/`writeFile`/`readdir` with `encoding: "utf8"` explicit.
- **Paths via `node:path` and `URL`** — `join`/`resolve`, `fileURLToPath`, and don't concatenate paths by hand.
- **Atomic writes for durability** — write a temp file in the target dir, then `rename()`; `fsync` where a crash must not lose data (databases, caches):

```ts
const tmp = `${file}.${process.pid}.tmp`;
await writeFile(tmp, data);
await rename(tmp, file);
```

- **Env access one place** — load with `node --env-file=.env` (built-in) or a small parse; never spread `process.env` access across modules; validate required vars at startup with a clear error.

---

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
import { test } from "node:test";
import assert from "node:assert/strict";

test("loads the value when present", () => {
    assert.equal(load("k"), "v");
});
```

- **`mock` (`t.mock`) for function/API stubbing**; `node:assert/strict` over `assert` — `deepEqual` strictness is where the truth is.
- **Coverage via `--experimental-test-coverage`** for meaningful coverage gates on domain logic; `node --test --test-reporter=spec` for CI-readable output.
- **Name tests as specifications**; use subtests (`t.test`) for parameterized tables.

---

## 9. Tooling (Non-negotiable)

- **`node --watch` for dev reload**; `node --env-file` for env; both are built-in and remove the watcher/dotenv deps for simple apps.
- **`pnpm` + committed lockfile**, `engines` pinned, `corepack` for toolchain identity.
- **`node:test` instead of a framework unless you need the extras** (vitest's watches/coverage ergonomics are a fine upgrade — pick one, stay consistent).
- **ESLint + TS strict + prettier gating CI**; `package.json` `"exports"` map (with `types` entry) for library consumers.
- **Run on the current LTS** — pin `engines` to `>=22` (or newer LTS), test against the LTS matrix in CI.

---

## 10. Security Basics

- **Validate every external input with `zod`/schema before trusting it** (see Typescript skill §8) — not just HTTP, but env, files, CLI args.
- **Keep `Authorization`, cookies, and tokens out of logs and error messages**.
- **Dependency audit in CI** (`pnpm audit`/`npm audit`), `engines`-pin LTS, and prefer small, maintained deps.
- **No `eval`, no `child_process` with interpolated shell strings** (`execFile` with args array over `exec` with a string).
- **Rate-limit and time out outbound requests**; `AbortSignal.timeout` on every cross-process call.

---

## 11. General Rules of Thumb

- **Async-first, streaming for large data, single-threaded discipline** — your program is one event loop; treat it kindly.
- **Built-ins before dependencies** — `node:test`, `fetch`, `--watch`, `--env-file`, `node:` modules cover a surprising amount of need.
- **Process ownership exists at the root** — signals, exit codes, graceful shutdown live in the entrypoint, not in libraries.
- **Small modules with narrow exports** — the runtime rewards composition over fat singletons.
- **Machine output for CLIs and services** — JSON on stdout (interleaved with logs only via explicit `--log-format`, not interleaved freeform).

---

## Quick-Start Checklist

- [ ] `"type": "module"` + `node:`-prefixed built-in imports
- [ ] No blocking sync I/O on the hot path; `worker_threads` for CPU-bound work
- [ ] `stream.pipeline` for stream chains; streaming for large files
- [ ] SIGINT/SIGTERM graceful shutdown at the entrypoint
- [ ] `process.exitCode` over mid-flush `process.exit()`
- [ ] `fs/promises` + atomic `write→rename` for durable writes
- [ ] `fetch` with `AbortSignal.timeout` for outbound calls
- [ ] Typed errors with `cause`; structured logs, no secrets
- [ ] `node:test` + `node --test` runner, strict asserts
- [ ] `--watch`/`--env-file`; `pnpm` lockfile; engines pinned to LTS
- [ ] Inputs validated (zod/schema) at every boundary; `pnpm audit` in CI