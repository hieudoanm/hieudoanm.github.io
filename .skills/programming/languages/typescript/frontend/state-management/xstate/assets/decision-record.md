# XState Best Practices: Decision Record

Use this record when applying [XState Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for modeling state machines with XState — the statechart conventions for events/actions/guards. Use when writing, structuring, or reviewing XState (v5) — covers machines, states/transitions, actions, guards, actors, and testing.

XState models **state machines & statecharts** — a machine is a graph of states with on transitions triggered by events, guarded by guards and executed by actions. Practical XState leans on **machines that mirror the domain's real state space (idle/loading/ready/error), events as the only input, guards for decision boundaries, actions for pure (or invoke-mediated) effects**, and **actors for living instances**. A machine is executable documentation — the states are the spec.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Defining a Machine
- [ ] 2. Guards
- [ ] 3. Actions & Effects
- [ ] 4. Actors & Orchestration
- [ ] 5. Persistence & Interop
- [ ] 6. Testing
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

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
