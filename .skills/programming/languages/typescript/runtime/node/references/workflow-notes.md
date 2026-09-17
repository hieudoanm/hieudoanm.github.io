# Workflow notes

Focused reference for **nodejs-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ts
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

await pipeline(createReadStream(src), makeTransform(), createWriteStream(dest));
```

- **Awaitables `ReadableStream` from `node:stream/web` for web-API-style consumption**; `stream/consumers` (`text`, `json`, `buffer`) for easy terminal reads of files/HTTP bodies.
- **Process files line-by-line or chunked for big inputs** — don't `readFile` a multi-GB file as one string; stream it.
- Respond to HTTP bodies and DB cursors as streams when the payload is large — buffering everything into memory bounds your parallelism.

---

## 4. Process Lifecycle, Signals & Exit Codes

- **Signal handling at the composition root**, once — SIGINT/SIGTERM begin graceful shutdown (stop accepting, drain, close server):

```ts
import { once } from 'node:events';

const server = createServer();
server.listen(PORT);
for (const sig of ['SIGINT', 'SIGTERM'] as const) {
  process.once(sig, async () => {
    server.close();
    await drainTasks(); // flush what's in flight
    process.exit(0); // exit AFTER graceful close
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
