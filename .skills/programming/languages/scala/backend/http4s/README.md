# http4s Best Practices

http4s is a **purely functional HTTP library on cats-effect** — routes are HttpRoutes/Kleisli[F, Request[F], Response[F]], and every handler returns an F[_]. Practical http4s leans on **the routes DSL (pattern-matching methods), services composed with orNotFound + middlewares, F threaded everywhere with the effect type in the signature**, and **EntityCodec/EntityDecoder for typed JSON**. The type system IS the HTTP...

## When to use

Use when writing, structuring, or reviewing http4s.

## Core topics

- 1. Server & App Wiring
- 2. Routes & DSL
- 3. Effects & Context
- 4. Middleware & Errors
- 5. Client
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [http4s Best Practices: Basic Usage](./examples/basic-usage.md)
- [http4s Best Practices: 4. Middleware & Errors](./examples/reliability-and-edge-cases.md)
- [http4s Best Practices: 2. Routes & DSL](./examples/setup-and-configuration.md)
- [http4s Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [http4s Best Practices: Decision Record](./assets/decision-record.md)
- [http4s Best Practices: Starter Template](./assets/starter-template.md)
- [http4s Best Practices: Validation Plan](./assets/validation-plan.md)
- [http4s Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
