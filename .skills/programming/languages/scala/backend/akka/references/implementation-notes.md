# Implementation notes

Focused reference for **akka-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Persistence & Event Sourcing

- **Akka Persistence for event-sourced actors when audit/state history matters** — commands → events appended, state derived:

```scala
Behaviors.setup[Add] { ctx =>
  EventSourcedBehavior[Add, Added, Int](
    persistenceId = PersistenceId("counter", id),
    emptyState = 0,
    commandHandler = (state, cmd) => Effect.persist(Added(state + 1)),
    eventHandler = (state, evt) => state + 1
  )
}
```

- **Events are immutable facts; commands are requests** — the event log is the source of truth, state is a projection.
- **"Persistence only where audit/replay is required"** — event sourcing is a tax, not a default.
- **Snapshot before state grows unbounded**; `recovery` replay bound.

---

## 6. Fault Tolerance & Failure Modes

- **Failures are actor-level, not process-level** — message-driven restarts keep the system alive.
- **`SupervisorStrategy` with backoff and `maxRestarts`** — a crash-looping actor degrades gracefully instead of burning CPU.
- **Dead letters logged in dev** (`akka.log-dead-letters`) — an unsent message is a design flaw surfaced.

---

## 7. Testing

- **Test actor behavior with `ActorTestKit`:**
