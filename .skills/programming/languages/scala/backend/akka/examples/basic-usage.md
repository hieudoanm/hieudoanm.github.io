# Akka Best Practices: Basic Usage

Best practices for building reactive systems with Akka — the actor-model and stream conventions for Scala/JVM. Use when writing, structuring, or reviewing Akka (classic/typed + Pekko forks) — covers actors, the actor hierarchy, typed/reception, streams, fault tolerance, persistence, and testing.

## Scenario

Use this example as a starting point when applying **akka-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Actor Basics (Typed)** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
