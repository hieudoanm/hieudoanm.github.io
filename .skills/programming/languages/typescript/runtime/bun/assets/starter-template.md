# Bun Runtime Best Practices: Starter Template

A reusable starting point derived from the **2. Serving HTTP (Bun.serve)** section of [Bun Runtime Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
