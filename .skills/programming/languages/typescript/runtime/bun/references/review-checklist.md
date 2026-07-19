# Review checklist

Focused reference for **bun-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`bun build`** bundles to a single file/binary: `bun build --compile ./src/server.ts --outfile myserver` — a standalone executable with no runtime to install, ideal for CLIs and edge deployments.
- **`bun run --watch`** for dev reload; **hot reloading of TS without a watcher tool** for most projects.
- **Macros** (`import conf from "./conf.ts" with { type: "macro" }`) — inlined at build time for constants: use sparingly, they're a dark power.
- Keep **`engines: { "bun": ">=1.x" }`** partnered with CI on the current stable, and `bun update` frequently — the runtime evolves fast.

---

## 8. General Rules of Thumb

- **One tool for the whole pipeline** — `bun` running, testing, installing, bundling means fewer moving parts and fewer version-drift bugs.
- **Web APIs breathe naturally** — `fetch`/`Response`/`WebSocket` composition means your handlers, files, and streams are all the same vocabulary.
- **Prefer `bun:` and built-ins over setting up the node toolchain** — SQLite, shell, testing, and bundling come with the runtime.
- **Graceful lifecycle** — `Bun.serve`'s `server.stop()` + signal handling mirrors the "drain before exit" discipline of any service.
- **Keep the fast-path fast** — Bun's advantage disappears if you `node:`-wrap and `stream-once` everything; write it the way the runtime intends first, optimize later with measurement.

---

## Quick-Start Checklist

- [ ] TS executed natively — no pre-compile step in the dev loop
- [ ] `Bun.serve` with routed fetch handler; `server.stop()` graceful shutdown
- [ ] `Bun.file` for streaming/range file responses; `Bun.write` for one-shots
- [ ] `Bun.$` shell interpolation (no `child_process` string-squashing)
- [ ] `bun:test` + `bun test --coverage`; native TS in tests
- [ ] `bun install` + committed lockfile; workspaces for monorepos
- [ ] `bun run --watch` for dev; `--compile` single-binary distribution where appropriate
- [ ] Inputs validated (zod/schema); tokens never logged
- [ ] `bunx` for dev-time tools instead of permanent devDeps
- [ ] Engines + CI pinned to the current Bun stable
