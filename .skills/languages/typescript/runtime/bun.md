---
name: bun-runtime
description: Best practices for building applications that run on the Bun runtime (TypeScript/JavaScript). Use when structuring or reviewing Bun servers, CLIs, scripts, or tests — covers Bun.serve, file I/O, shell scripting, bun:test, the package manager, and tooling.
---

# Bun Runtime Best Practices

Bun is an all-in-one JavaScript/TypeScript runtime, bundler, transpiler, test runner, and package manager. It executes `.ts`/`.tsx` natively, implements web-standard APIs (`fetch`, `WebSocket`, `Request`/`Response`, `Blob`), and ships a fast filesystem, database (`bun:sqlite`), and shell-command layer. Best practice here is to lean into Bun's built-ins — `Bun.serve`/`Bun.file`/`Bun.$`/`bun:test` — instead of bolting on the node-style toolchain Bun replaces.

---

## 1. Runtime Foundations

- **One binary, zero setup**: `bun run`, `bun test`, `bun install`, `bunx`, and bundling are all the same tool — no separate transpiler/runner/installer to wire.
- **TypeScript is first-class** — no compile step for execution (`bun run src/server.ts`); keep `.ts`/`.tsx` as the source of truth, use `bun build` only for distribution.
- **Web-standard APIs preferred** — `fetch`, `Request`/`Response`, `WebSocket`, `ReadableStream`, `Blob`, `FormData` work natively; reach for `node:` built-ins only when a library requires Node compat (Bun supports them).
- **`bun:sqlite` for embedded persistence** — a fast, zero-config SQLite bundled in the runtime, no driver dependency for single-process apps.

---

## 2. Serving HTTP (Bun.serve)

- **`Bun.serve` is the server layer** — typed routes, `fetch`-style handler, native TLS/SNI and WebSocket upgrade support:

```ts
const server = Bun.serve({
    port: 3000,
    fetch(req, server) {
        const url = new URL(req.url);
        if (url.pathname === "/") return new Response("hello");
        if (server.upgrade(req)) return undefined;   // WebSocket
        return new Response("not found", { status: 404 });
    },
    websocket: { message(ws, msg) { ws.send(msg); } },
});
console.log(`listening on ${server.port}`);
```

- **Native `ServeStatic` (`Bun.serve({ static })`)** for static files, or a tiny stream of `Bun.file(path)` for JSON/file responses — streaming + range requests handled for you.
- **Base URL via `server.url`/`hostname`**, and **`server.stop()` for graceful shutdown** (drain in-flight before returning in a signal handler).
- Keep timeouts and body-size limits explicit for public endpoints (routed handler-level checks are your responsibility with bare `Bun.serve`).

---

## 3. File I/O & Blobs

- **`Bun.file(path)`** gives a lazy file handle that streams and ranges and is a first-class `Response` body:

```ts
const file = Bun.file("./data/users.json");
const json = await file.json();        // or .text(), .bytes(), .stream()
return new Response(file);             // serves with content-type + range
```

- **`Bun.write(path, data)`** for a one-shot write (string/`Uint8Array`/`Blob`/`Response`-ish); **`Bun.stdin`/`Bun.stdout`** for terminal I/O.
- Iterate large files line-by-line with a `Bun.file(file).stream()` + a line reader rather than reading a multi-GB file at once.

---

## 4. Shell & Scripting (Bun.$, bunx)

- **`Bun.$` is a tagged shell** — run commands safely with interpolation, captured stdout, and piping without `child_process` string-squashing:

```ts
const { stdout } = await Bun.$`git rev-parse --abbrev-ref HEAD`;
const branch = stdout.toString().trim();
await Bun.$`echo "on ${branch}" > .branch`.cwd(repoPath);
```

- **`bunx <pkg>` runs npm-published tools without installing to the project** (`bunx prettier --write .`), and **`bun run <script>`** executes package.json scripts (bare `bun <script>` works for `bun`-aware targets).
- For one-off scripts, Bun's TS-native execution means a `scripts/*.ts` file is your whole harness — no ts-node/compile ceremony.

---

## 5. Testing (bun:test)

- **`bun test` + `bun:test`** is a Jest-compatible runner with zero config — `describe`/`it`/`expect`, `beforeEach`/`afterEach`, mocks/spies, and TS native:

```ts
import { test, expect, mock } from "bun:test";

const read = mock(() => "v");
test("reads the value", () => {
    expect(read()).toBe("v");
    expect(read).toHaveBeenCalledTimes(1);
});
```

- **`bun test --coverage` for reports** (built-in coverage provider, no extra dependency); watch mode via `bun test --watch`.
- **Test the service boundary with real `Bun.serve` on a random port** (`Bun.serve({ port: 0 })` → `server.url`) for honest integration tests — spin-up is fast enough that dockerizing every test isn't needed for small services.

---

## 6. The Package Manager

- **`bun install` is faster than `pnpm` similarly-committed setups** and produces a binary `bun.lock` — but committing either a `bun.lock`/`bun.lockb` file — whichever you choose — is the reproducibility contract.
- **Workspaces** in `package.json` are supported ([`"workspaces": ["packages/*"]`]) for monorepos; `bun add`/`bun add -d` for dependency changes.
- **Scripts**: `bun run dev` runs `dev` scripts; Bun runs package.json `bin`/lifecycle scripts without `npx`.
- **`native` Node deps work** (Bun maintains Node.js API compat), but check `node:`-requiring libs on `bun` if you hit a compat edge — prefer pure-JS/`bun:`-native alternatives where availability matters.

---

## 7. Tooling & Distribution

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