# Koa.js Backend Best Practices: 2. The Context Model

## Source guidance

This example applies the **2. The Context Model** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`ctx` is both request and response** — `ctx.method`, `ctx.url`, `ctx.params`/`ctx.request.body`, and output via `ctx.body`/`ctx.status`:
- **Setting `ctx.body` is the response** — Koa serializes and assigns status; `ctx.body = null` means 204. Prefer assigning a value over mutating `ctx.res` directly.
- **`ctx.state` for per-request flow** — it carries authenticated/tenant info down the middleware chain without globals.
- **Never interact with `ctx.res` directly** unless you're writing a body streamer — Koa's abstraction is where logging, headers, and error mapping live.

## Example

This excerpt is from the cited **2. The Context Model** section.

```ts
app.use(async (ctx) => {
  ctx.body = { ok: true, url: ctx.url };
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for koa-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
