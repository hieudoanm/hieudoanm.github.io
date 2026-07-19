---
name: akka-best-practices
description: Best practices for building reactive systems with Akka — the actor-model and stream conventions for Scala/JVM. Use when writing, structuring, or reviewing Akka (classic/typed + Pekko forks) — covers actors, the actor hierarchy, typed/reception, streams, fault tolerance, persistence, and testing.
---

# Akka Best Practices

Akka gives an **actor model** for concurrency and **Akka Streams** for reactive data flows, with typed actors (`ActorRef[T]`) as the modern default. Practical Akka leans on **one concern per actor, a supervision hierarchy that is the failure policy (`SupervisorStrategy`), message-driven state (never shared mutable state), and streams for anything that flows**. Actors are units of isolation; streams are units of transformation. Use typed (`akka:actor.typed.*`); the classic untyped API is legacy.

---

## 1. Actor Basics (Typed)

- **An actor is a behavior function over messages:**

```scala
import akka.actor.typed.Behavior
import akka.actor.typed.scaladsl._

object Counter {
  sealed trait Command
  case object Inc extends Command
  case class Get(replyTo: ActorRef[Int]) extends Command

  def apply(): Behavior[Command] = run(0)

  private def run(count: Int): Behavior[Command] = Behaviors.receive { (ctx, msg) =>
    msg match {
      case Inc               => run(count + 1)
      case Get(replyTo)      => replyTo ! count; Behaviors.same
    }
  }
}
```

- **Messages are immutable, closed `sealed trait` ADTs** — the message set is the actor's contract.
- **One actor = one concern** — a "GodActor" managing everything is a concurrency bug waiting.
- **`ActorRef[T]` typed sends only `T`** — type safety at the boundary; the message type defines correctness.

---

## 2. The Actor Hierarchy & Supervision

- **Actors form a hierarchy; supervisors apply the `SupervisorStrategy` — that IS the failure policy:**

```scala
Behaviors.supervise(child())
  .onFailure[Exception](SupervisorStrategy.restartWithBackoff(minBackoff.toScala, maxBackoff.toScala, randomFactor))
```

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

```scala
class CounterSpec extends AnyFlatSpec with ActorTestKit {
  "Counter" should "increment on Inc" in {
    val ref = spawn(Counter())
    ref ! Counter.Inc
    ref ! Counter.Get
    expectMessage(...)
  }
}
```

- **Streams via `TestSource`/`TestSink` probes** — the pipeline contract (emit counts, completion, errors).
- **Event-sourced actors via `PersistenceTestKit`** — replay and snapshot behaviors asserted.
- **Contract cases**: message protocol, supervision trigger, timeout behavior.

---

## General Rules of Thumb

- **One concern per actor; ADT messages; state in the behavior return.**
- **Supervision strategy = the failure policy; backoff and maxRestarts set.**
- **Streams for flows, actors for state; backpressure bounded.**
- **Event sourcing only when audit/replay is required.**
- **Typed actors only; test with `ActorTestKit` + stream probes.**

---

## Quick-Start Checklist

- [ ] Typed `Behavior[Command]`; sealed message ADTs; one concern per actor
- [ ] `supervise(...).onFailure[Exception]` with backoff/maxRestarts
- [ ] State carried in behavior return; no shared mutable state
- [ ] `ask`/timeouts for request/response; no mailbox blocking
- [ ] Streams with bounded `mapAsync`; backpressure honored; `KillSwitch` where dynamic
- [ ] Event sourcing only for audit/replay needs; snapshots bounded
- [ ] `ActorTestKit` + stream `TestSource`/`Sink` tests; protocol contract