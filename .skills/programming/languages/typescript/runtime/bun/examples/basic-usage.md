# Bun Runtime Best Practices: Basic Usage

Best practices for building applications that run on the Bun runtime (TypeScript/JavaScript). Use when structuring or reviewing Bun servers, CLIs, scripts, or tests — covers Bun.serve, file I/O, shell scripting, bun:test, the package manager, and tooling.

## Scenario

Use this example as a starting point when applying **bun-runtime** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Serving HTTP (Bun.serve)** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
