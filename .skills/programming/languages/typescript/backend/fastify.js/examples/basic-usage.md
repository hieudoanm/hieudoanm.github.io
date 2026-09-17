# Fastify.js Backend Best Practices: Basic Usage

Best practices for building HTTP APIs and web services with Fastify (Node.js/TypeScript). Use when creating, structuring, or reviewing a Fastify app — covers plugin architecture, schema validation, hooks, encapsulation, error handling, and testing.

## Scenario

Use this example as a starting point when applying **fastify-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Plugin Architecture (Encapsulation)** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
// src/plugins/config.ts
import fp from 'fastify-plugin';

export default fp(
  async (app, opts) => {
    const cfg = parseConfigFromEnv();
    app.decorate('config', cfg); // app.config available in nested scopes
    app.addHook('onClose', async () => {
      // cleanup hooks live with their plugin
      await closePools();
    });
  },
  { name: 'config' }
);

// src/app.ts
const app = Fastify({ logger: true });
await app.register(configPlugin);
await app.register(userRoutes, { prefix: '/api/v1/users' });
await app.ready(); // ensure all register-ed plugins loaded
await app.listen({ port: 3000 });
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
