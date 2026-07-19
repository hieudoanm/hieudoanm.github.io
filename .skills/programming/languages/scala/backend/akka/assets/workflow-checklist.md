# Akka Best Practices: Workflow Checklist

A practical run sheet for applying [Akka Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Actor Basics (Typed): **An actor is a behavior function over messages:**
- [ ] 1. Actor Basics (Typed): **Messages are immutable, closed sealed trait ADTs** — the message set is the actor's contract
- [ ] 2. The Actor Hierarchy & Supervision: **Actors form a hierarchy; supervisors apply the SupervisorStrategy — that IS the failure policy:**
- [ ] 2. The Actor Hierarchy & Supervision: **restart/resume/stop/escalate chosen deliberately** — restart must re-establish consistent state
- [ ] 3. State & Concurrency: **Actor state is private, modified only by messages** (the pattern above: run(count) returns the next behavior):
- [ ] 3. State & Concurrency: **Never share mutable state across actors** — the mailbox serializes per actor; cross-actor via messages
- [ ] 4. Akka Streams: **Streams for transformations; actors for state** — pick the tool by shape:
- [ ] 4. Akka Streams: **mapAsync with bounded parallelism for non-blocking I/O; map for pure transforms.**
- [ ] 5. Persistence & Event Sourcing: **Akka Persistence for event-sourced actors when audit/state history matters** — commands → events appended, state derived:
- [ ] 5. Persistence & Event Sourcing: **Events are immutable facts; commands are requests** — the event log is the source of truth, state is a projection

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
