# Workflow notes

Focused reference for **activemq**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
