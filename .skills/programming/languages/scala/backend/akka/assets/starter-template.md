# Akka Best Practices: Starter Template

A reusable starting point derived from the **1. Actor Basics (Typed)** section of [Akka Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
