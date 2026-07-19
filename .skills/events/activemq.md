---
name: activemq
description: Best practices for JMS-compliant messaging and enterprise integration with ActiveMQ (Classic or Artemis). Use when designing queues/topics, choosing acknowledgement modes, configuring redelivery and DLQs, transactions, or tuning broker operations — treats ActiveMQ as message-oriented middleware, not a stream.
---

# ActiveMQ Best Practices

ActiveMQ (Classic or Artemis) is **message-oriented middleware** implementing JMS: messages are consumed, acknowledged, and removed. Best practice is JMS-first design — choose Queue vs Topic explicitly, prefer destination-level routing over selectors, acknowledge deliberately, use transactions for at-least-once + idempotency, and configure redelivery/DLQ as explicit design.

---

## 1. Core Stack & Constraints

- Assume **ActiveMQ Classic or Artemis (latest stable)**
- ActiveMQ is **message-oriented middleware, not a stream** — messages are **consumed, acknowledged, and removed**
- **Choose Queue vs Topic explicitly**
- **Avoid unbounded destinations** and large message payloads
- **Design for redelivery and failure**; use transactions intentionally
- **Do not hide messaging semantics behind magic abstractions**

---

## 2. Messaging Models & Destination Design

- **Queues** — point-to-point workflows with **competing consumers**
- **Topics** — publish–subscribe fan-out; **durable subscriptions when required**
- Keep **destination names stable and meaningful**
- **Avoid overusing selectors** — prefer destination-level routing
- **Separate retry destinations from primary ones**
- **Version message payloads deliberately**; **treat message schema as a contract**

```
Queue:   queue/orders.created ── competing consumers
Topic:   topic/price.changes ── fan-out to subscribers (durable where needed)
```

---

## 3. Reliability, Transactions & Delivery Semantics

- Understand **JMS acknowledgement modes**:
  - `AUTO_ACKNOWLEDGE` — auto after delivery handed to consumer
  - `CLIENT_ACKNOWLEDGE` — consumer controls the ack point
  - `DUPS_OK_ACKNOWLEDGE` — lazy, may deliver duplicates
- **Prefer explicit acknowledgement for critical flows**
- Use **transactions** for exactly-once-like semantics: **at-least-once + idempotency**
- **Expect duplicate deliveries**; **configure redelivery policies explicitly**
- **Route poison messages to DLQ** (ActiveMQ default `ActiveMQ.DLQ`)
- **Never assume "exactly once" without design support**

```java
session = connection.createSession(true, Session.SESSION_TRANSACTED); // transactional
producer.send(message);
session.commit();      // batch of sends committed atomically
// on failure: session.rollback();
```

---

## 4. Performance & Operations

- Monitor: **queue depth, consumer lag, disk usage**
- Tune: **prefetch**, persistence adapters (KahaDB/AMQ for Classic; Artemis journal)
- **Scale consumers horizontally**; avoid hot destinations
- **Test broker restart and failover**
- **Understand Classic vs Artemis operational differences** (they are different brokers)
- Document **operational limits clearly**

---

## 5. General Rules of Thumb

- **JMS is the model** — Queue/Topic, ack modes, transactions are the vocabulary
- **Explicit delivery semantics** — ack, redelivery, and DLQ are design decisions
- **Destinations over selectors** — keep routing at the destination level
- **At-least-once + idempotency** — the realistic contract unless proven otherwise

---

## Quick-Start Checklist

- [ ] Queue vs Topic chosen explicitly per use case; durable subs where needed
- [ ] Destination names stable; retry destinations separated from primary
- [ ] Acknowledgment modes deliberate (`CLIENT_ACKNOWLEDGE` for critical flows)
- [ ] Transactions for atomic multiple-send/receive; rollback handled
- [ ] Redelivery policies configured; poison messages routed to DLQ
- [ ] Message payloads versioned; schema treated as contract
- [ ] Queue depth, lag, disk monitored; prefetch/persistence tuned
- [ ] Restart/failover tested; Classic vs Artemis differences accounted for