# Akka Best Practices

Akka gives an **actor model** for concurrency and **Akka Streams** for reactive data flows, with typed actors (ActorRef[T]) as the modern default. Practical Akka leans on **one concern per actor, a supervision hierarchy that is the failure policy (SupervisorStrategy), message-driven state (never shared mutable state), and streams for anything that flows**. Actors are units of isolation; streams are units of transformation....

## When to use

Use when writing, structuring, or reviewing Akka (classic/typed + Pekko forks).

## Core topics

- 1. Actor Basics (Typed)
- 2. The Actor Hierarchy & Supervision
- 3. State & Concurrency
- 4. Akka Streams
- 5. Persistence & Event Sourcing
- 6. Fault Tolerance & Failure Modes

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Akka Best Practices: Basic Usage](./examples/basic-usage.md)
- [Akka Best Practices: 3. State & Concurrency](./examples/reliability-and-edge-cases.md)
- [Akka Best Practices: 2. The Actor Hierarchy & Supervision](./examples/setup-and-configuration.md)
- [Akka Best Practices: 7. Testing](./examples/testing-and-validation.md)

## Assets

- [Akka Best Practices: Decision Record](./assets/decision-record.md)
- [Akka Best Practices: Starter Template](./assets/starter-template.md)
- [Akka Best Practices: Validation Plan](./assets/validation-plan.md)
- [Akka Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
