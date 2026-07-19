# Node.js Runtime Best Practices: Workflow Checklist

A practical run sheet for applying [Node.js Runtime Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Module System (ESM by Default): **ESM everywhere** — "type": "module" in package.json, import over require; no CJS interop friction for new code
- [ ] 1. Module System (ESM by Default): **Use node: prefix** for built-ins so they're unambiguous and not shadowable: import { readFile } from "node:fs/promises"
- [ ] 2. The Event Loop & Non-Blocking I/O: **Never block the event loop** — synchronous fs, crypto, or JSON.parse of huge inputs on the hot path starve every request. Prefer node:fs/promises and async crypto
- [ ] 2. The Event Loop & Non-Blocking I/O: **CPU-bound work belongs in worker_threads** — not on the main thread, and not as micro-optimized callbacks. A reasonable threshold: sustained compute > ~1–5ms per call should move off-thread
- [ ] 3. Streams & Large Data: **stream.pipeline for composed stream chains** — none of the errors leak, and it cleans up automatically:
- [ ] 3. Streams & Large Data: **Awaitables ReadableStream from node:stream/web for web-API-style consumption**; stream/consumers (text, json, buffer) for easy terminal reads of files/HTTP bodies
- [ ] 4. Process Lifecycle, Signals & Exit Codes: **Signal handling at the composition root**, once — SIGINT/SIGTERM begin graceful shutdown (stop accepting, drain, close server):
- [ ] 4. Process Lifecycle, Signals & Exit Codes: **Set process.exitCode instead of impact-process.exit() in library-adjacent code** — exit codes propagate; process.exit() can truncate flushed output
- [ ] 5. Files, Paths & Environment: **node:fs/promises everywhere**, mostly readFile/writeFile/readdir with encoding: "utf8" explicit
- [ ] 5. Files, Paths & Environment: **Paths via node:path and URL** — join/resolve, fileURLToPath, and don't concatenate paths by hand

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
