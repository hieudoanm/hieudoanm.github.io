# Review checklist

Focused reference for **deno-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Mock HTTP/fetch with `@std/http/mock` or `undici`'s `MockAgent`** — test the service contract, not implementation.
- **`deno test --coverage` + `deno coverage`** for reports; name tests as specifications; run per-module `mod_test.ts` files next to sources.

---

## 7. Tooling (In-the-Box)

- **`deno fmt`** (opinionated formatter), **`deno lint`** (`deno lint` with `--rules-recommended`), **`deno doc`** (generate API docs + `deno doc --json`), **`deno check`** — all shipped, config lives in `deno.json`.
- **`deno compile`** produces a **single standalone binary** (bundled V8 + your code) for distribution — ideal for CLIs and tools; cross-platform flags for targets.
- **`deno install`** globally installs scripts (`deno install -g jsr:@scope/tool`), and the runtime self-updates (`deno upgrade`) — the CLI lifecycle is the toolchain.
- **`--watch`** for dev reload; `--env-file` support for env-in-files (check runtime version for the flag spelling — it's `--env-file` in recent releases).

---

## 8. General Rules of Thumb

- **Least privilege by default** — the first command you write for a production script should read like an audit: explicit, scoped `--allow-*` grants.
- **Pin and lock dependencies** — URL/JSR imports resolve deterministically only when everything is versioned and the lockfile is committed.
- **Web-API-first, `Deno.*`-second, `node:`-third** — the hierarchy of choices that keeps code portable and clean.
- **Tests and docs are features of the runtime** — `deno test`/`deno doc` being built in means the discipline is config, not ceremony.
- **A small import surface** — prefer a handful of pinned `@std`/`jsr:` modules over a sprawling dependency tree.

---

## Quick-Start Checklist

- [ ] Scoped `--allow-*` grants on every `deno run`; no blanket `-A` for untrusted input
- [ ] `deno.lock` committed; dependencies pinned (no floating `latest`)
- [ ] `jsr:@std/*` / `jsr:` modules over raw `node_modules` where possible
- [ ] `deno.json` with `tasks`, `imports`, `strict` compiler options
- [ ] `Deno.serve` + Web APIs for servers; `Deno.*` async I/O
- [ ] Inputs validated (zod/schema at the boundary); payload size limits
- [ ] `deno test` + `@std/assert`; coverage on core logic
- [ ] `deno fmt` + `deno lint` + `deno check` green in CI
- [ ] `deno compile` single-binary distribution where distribution matters
- [ ] Graceful shutdown on signals; no secrets logged
