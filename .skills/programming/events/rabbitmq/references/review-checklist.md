# Review checklist

Focused reference for **rabbitmq**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. General Rules of Thumb

- **Broker for workflows, not logs** — messages are consumed and gone
- **Explicit routing and explicit retries** — exchanges/DLX/retry queues are design, not magic
- **Idempotent consumers + manual ack** — duplicate deliveries are the default contract
- **Backpressure is real** — prefetch + monitoring over unbounded buffers

---

## Quick-Start Checklist

- [ ] Exchanges/routing explicit; queue names + routing keys stable and meaningful
- [ ] Messages modeled as commands/tasks; payloads versioned deliberately
- [ ] Manual acks with explicit success/failure handling; idempotent consumers
- [ ] Durability for critical messages; quorum queues for HA where needed
- [ ] DLQ + retry queues designed; poison messages not silently dropped
- [ ] Prefetch tuned; no unbounded queues; large messages avoided
- [ ] Queue depth, consumer rates, memory/disk alarms monitored
- [ ] Failure/recovery scenarios tested; operational limits documented
