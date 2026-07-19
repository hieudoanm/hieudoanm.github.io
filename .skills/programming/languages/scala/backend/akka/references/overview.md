# Overview

Focused reference for **akka-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
