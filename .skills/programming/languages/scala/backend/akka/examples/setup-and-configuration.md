# Akka Best Practices: 2. The Actor Hierarchy & Supervision

## Source guidance

This example applies the **2. The Actor Hierarchy & Supervision** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Actors form a hierarchy; supervisors apply the `SupervisorStrategy` — that IS the failure policy:**
- **`restart`/`resume`/`stop`/`escalate` chosen deliberately** — restart must re-establish consistent state.
- **Don't spawn a tree of actors per request** — long-lived actors per domain unit; request-scoped work uses `ActorContext.spawn` with stop-after-completion.
- **No supervisor, no hierarchy: decide on the strategy user by user, not globally.**

## Example

```scala
Behaviors.supervise(child())
  .onFailure[Exception](SupervisorStrategy.restartWithBackoff(minBackoff.toScala, maxBackoff.toScala, randomFactor))
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for akka-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
