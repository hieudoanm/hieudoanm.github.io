# Hapi.js Backend Best Practices: Basic Usage

Best practices for building HTTP APIs and web services with hapi (Node.js/TypeScript). Use when creating, structuring, or reviewing a hapi app — covers plugin registration, route config, Joi validation, Boom errors, lifecycle extensions, caching, and testing.

## Scenario

Use this example as a starting point when applying **hapi-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Server Construction & Plugins** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import Hapi from '@hapi/hapi';

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0',
  routes: {
    cors: { origin: ['https://app.example.com'] },
    validate: { failAction: 'error' },
  },
});

await server.register([
  { plugin: userRoutes, routes: { prefix: '/api/v1/users' } },
  { plugin: loggingPlugin },
]);

await server.start();
console.log(`listening on ${server.info.uri}`);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
