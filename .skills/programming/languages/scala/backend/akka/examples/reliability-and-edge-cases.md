# Akka Best Practices: 3. State & Concurrency

## Source guidance

This example applies the **3. State & Concurrency** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Actor state is private, modified only by messages** (the pattern above: `run(count)` returns the next behavior):
- **Never share mutable state across actors** — the mailbox serializes per actor; cross-actor via messages.
- **Long-running work in an actor blocks its mailbox** — use `Futures`/streams/spawned workers, or the actor's dispatcher config.
- **`ask`/`perAsk` with a timeout** for request/response; no infinite waits.

## Example

```scala
private def run(count: Int): Behavior[Command] = Behaviors.receiveMessage { ... }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for akka-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
