# Review checklist

Focused reference for **akka-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
