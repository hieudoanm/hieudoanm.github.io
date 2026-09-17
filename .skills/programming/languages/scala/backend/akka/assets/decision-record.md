# Akka Best Practices: Decision Record

Use this record when applying [Akka Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building reactive systems with Akka — the actor-model and stream conventions for Scala/JVM. Use when writing, structuring, or reviewing Akka (classic/typed + Pekko forks) — covers actors, the actor hierarchy, typed/reception, streams, fault tolerance, persistence, and testing.

Akka gives an **actor model** for concurrency and **Akka Streams** for reactive data flows, with typed actors (ActorRef[T]) as the modern default. Practical Akka leans on **one concern per actor, a supervision hierarchy that is the failure policy (SupervisorStrategy), message-driven state (never shared mutable state), and streams for anything that flows**. Actors are units of isolation; streams are units of transformation. Use typed (akka:actor.typed.*); the classic untyped API is legacy.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Scala and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Actor Basics (Typed)
- [ ] 2. The Actor Hierarchy & Supervision
- [ ] 3. State & Concurrency
- [ ] 4. Akka Streams
- [ ] 5. Persistence & Event Sourcing
- [ ] 6. Fault Tolerance & Failure Modes
- [ ] 7. Testing
- [ ] General Rules of Thumb

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
