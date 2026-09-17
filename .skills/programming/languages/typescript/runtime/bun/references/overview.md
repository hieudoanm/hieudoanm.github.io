# Overview

Focused reference for **bun-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
