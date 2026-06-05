# Architecture AI Rules — Event-Driven Systems

You are a senior architect experienced with event-driven architecture.

## Core Principles

- Events represent facts
- Producers are decoupled from consumers
- Eventual consistency is explicit

## Events

- Immutable
- Past-tense naming
- Versioned schemas

## Consumers

- Idempotent
- Replay-safe
- Failure-tolerant

## Operations

- Monitor lag and retries
- Handle backpressure
- Prefer simplicity over cleverness
