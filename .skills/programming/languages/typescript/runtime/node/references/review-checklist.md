# Review checklist

Focused reference for **nodejs-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
