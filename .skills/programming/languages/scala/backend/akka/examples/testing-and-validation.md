# Akka Best Practices: 7. Testing

## Source guidance

This example applies the **7. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test actor behavior with `ActorTestKit`:**
- **Streams via `TestSource`/`TestSink` probes** — the pipeline contract (emit counts, completion, errors).
- **Event-sourced actors via `PersistenceTestKit`** — replay and snapshot behaviors asserted.
- **Contract cases**: message protocol, supervision trigger, timeout behavior.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for akka-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
