# Koa.js Backend Best Practices: Basic Usage

Best practices for building HTTP APIs and web services with Koa (Node.js/TypeScript). Use when creating, structuring, or reviewing a Koa app — covers the context model, onion middleware, routing, validation, error handling, and testing.

## Scenario

Use this example as a starting point when applying **koa-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. The Context Model** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
app.use(async (ctx) => {
  ctx.body = { ok: true, url: ctx.url };
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
