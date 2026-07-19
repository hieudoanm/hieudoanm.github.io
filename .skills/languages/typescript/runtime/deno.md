---
name: deno-runtime
description: Best practices for building applications that run on the Deno runtime (TypeScript). Use when structuring or reviewing Deno scripts, servers, or tools — covers permissions, module URLs and JSR, the standard library, Web APIs, testing, and tooling.
---

# Deno Runtime Best Practices

Deno is a secure-by-default TypeScript-first runtime: modules come from URLs/JSR, permissions are granted explicitly per-run, everything standard ships in the runtime and `deno_std`, and the toolchain (`fmt`, `lint`, `test`, `doc`, `compile`) is built in. Best practice here is embracing that model — sandboxed permissions as a feature, URL/JSR modules without `node_modules`, Web-standard APIs by default, and letting the built-in tools be the gates.

---

## 1. Secure by Default (Permissions)

- **No implicit network, filesystem, or environment access** — the runtime starts sandboxed; grant only what the program needs:

```bash
deno run --allow-net=api.example.com src/main.ts    # allow network, scoped to one origin
deno run --allow-net --allow-read=./config src/main.ts
```

| Permission      | Grants                                   | Prefer scoping                                 |
| --------------- | ---------------------------------------- | ---------------------------------------------- |
| `--allow-net`   | Outbound socket/HTTP                     | `--allow-net=<host>` to a known allowlist      |
| `--allow-read`  | Read the filesystem                      | `--allow-read=<path>` (dir or glob)            |
| `--allow-write` | Write the filesystem                     | `--allow-write=<path>` for the specific dir    |
| `--allow-env`   | Read `Deno.env`                          | `--allow-env=KEY1,KEY2` for the named variables |
| `--allow-run`   | Spawn child processes                    | Avoid if possible; treat as high-risk          |
| `--deny-*`      | Explicit forbidden capability (belt+braces) | Combined with `--allow-*` for strictness     |

- **`deno run --check`/`deno check`** type-checks as it runs — the compiler is part of execution, not a separate step.
- **Prompt as a fallback, not the default** — use `--allow-all`/`-A` only for trusted internal scripts, never for apps parsing external input.

---

## 2. Modules & Dependencies

- **URL and `jsr:` imports — no `node_modules`**:

```ts
import { join } from "jsr:@std/path@1";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
```

- **`jsr:@std/*` is the current home for `deno_std`** — `@std/path`, `@std/assert`, `@std/testing`, `@std/datetime`, `@std/http`; pin versions (`jsr:@std/path@1`) not float `latest`.
- **Pin your dependency graph with `deno.lock`** (auto-generated, committed) for reproducible builds; `deno task`/`deno run` resolve from it.
- **`deno add jsr:@std/collections`** manages the import map / `deno.json` "imports" so you import `@std/collections` without writing URLs everywhere.
- **Node/npm compat** exists (`npm:` specifiers, `node:` built-ins, `node_modules` optional mode) — use it *at the boundary* for legacy packages, but prefer `jsr:`/Web APIs whenever a substitute exists. Language-aware tooling (`deno.json` "imports" + `nodeModulesDir`) is disabled by default — that's a feature.

---

## 3. Code Organization

- **`deno.json`** is the config hub: `tasks`, `imports`, `compilerOptions`, `unstable`, `fmt`/`lint` config, `lock`, `nodeModulesDir`:

```json
{
  "tasks": { "dev": "deno run --watch src/main.ts", "test": "deno test" },
  "imports": { "@std/path": "jsr:@std/path@1" },
  "compilerOptions": { "strict": true }
}
```

- **`deno task <name>` as the entry surface** — one discoverable place for dev/build/test/start regardless of platform.
- Keep entrypoints (`src/main.ts`) thin; business logic in imported modules; `mod.ts` files re-export a module's public API (the Deno convention).

---

## 4. Web APIs & I/O

- **Web standards are the native API** — `fetch`, `Response`/`Request`, `WebSocket`, `ReadableStream`, `Headers`, `URL`, `FormData`, `File`, `crypto` all work without imports.
- **`Deno.serve` for HTTP servers** — the modern, fast server built on Web APIs:

```ts
const server = Deno.serve(
    { port: 3000, onListen: ({ hostname, port }) => console.log(`on ${hostname}:${port}`) },
    (req) => new Response(await Deno.readTextFile("./index.html"), { headers: { "content-type": "text/html" } }),
);
```

- **Filesystem via `Deno.readTextFile`/`readFile`/`writeTextFile`** (async by default) — always prefer the `promise`-returning variants; `Deno.cwd`/`Deno.env`/`Deno.args` for process basics.
- Use **`@std/io` (`iterateReader`/`iterateWriter`)** for streaming large files instead of buffering whole files; `ServeStatic`/`@std/http` helpers for static + file responses.
- **JSON body handling**: `await req.json()` with try/catch + size limits; validate with zod (`npm:zod` or `jsr:` schema lib) at the boundary.

---

## 5. TypeScript & Strict Mode

- **TS is the runtime language** — `.ts` files run directly; `deno run --check` / `deno check` gates types before/at execution, so *every* run is a type-check when you want it to be.
- **`strict: true` in `deno.json` compilerOptions** aligns with the single-config style; `JSR`/`jsr:` packages are type-checked on publish, which is upstream quality leverage.
- **Self-document types** — annotate public signatures; derived `satisfies`, branded types etc. follow the TypeScript skill (see `.skills/typescript/typescript.md`).

---

## 6. Testing

- **`deno test`** — the built-in runner; `@std/assert` for assertions, `describe`/`it` from `@std/testing/bdd`, plus built-in coverage:

```ts
import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";

describe("getUser", () => {
    it("returns the user when found", async () => {
        assertEquals((await getUser("1")).id, 1);
    });
});
```

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