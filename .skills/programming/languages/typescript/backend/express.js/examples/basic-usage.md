# Express.js Backend Best Practices: Basic Usage

Best practices for building HTTP APIs and web services with Express (Node.js/TypeScript). Use when creating, structuring, or reviewing an Express app — covers project layout, middleware, routing, validation, error handling, async discipline, and testing.

## Scenario

Use this example as a starting point when applying **express-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Middleware & Ordering** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(requestId());
app.use('/api', routes);
app.use(errorHandler()); // LAST — see §4
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
