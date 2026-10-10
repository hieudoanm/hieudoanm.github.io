# Workflow notes

Focused reference for **akka-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`restart`/`resume`/`stop`/`escalate` chosen deliberately** — restart must re-establish consistent state.
- **Don't spawn a tree of actors per request** — long-lived actors per domain unit; request-scoped work uses `ActorContext.spawn` with stop-after-completion.
- **No supervisor, no hierarchy: decide on the strategy user by user, not globally.**

---

## 3. State & Concurrency

- **Actor state is private, modified only by messages** (the pattern above: `run(count)` returns the next behavior):

```scala
private def run(count: Int): Behavior[Command] = Behaviors.receiveMessage { ... }
```

- **Never share mutable state across actors** — the mailbox serializes per actor; cross-actor via messages.
- **Long-running work in an actor blocks its mailbox** — use `Futures`/streams/spawned workers, or the actor's dispatcher config.
- **`ask`/`perAsk` with a timeout** for request/response; no infinite waits.

---

## 4. Akka Streams

- **Streams for transformations; actors for state** — pick the tool by shape:

```scala
Source(range)
  .mapAsync(parallelism)(fetch)
  .filter(_.active)
  .runWith(Sink.foreach(emit))
```

- **`mapAsync` with bounded parallelism for non-blocking I/O; `map` for pure transforms.**
- **Backpressure is the contract** — a stream without a bounded buffer is uncontrolled memory.
- **`Materializer` explicitly threaded; subscriptions cancelled** (`KillSwitch`) where lifetimes are dynamic.
