# Workflow notes

Focused reference for **apache-pulsar**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Topic, Subscription & Schema Design

- **Design topics by domain and ownership**; use **namespaces for quotas and isolation**
- **Choose subscription type intentionally:**
  - `exclusive` — strict ordering, single consumer
  - `shared` — scale-out across consumers, no ordering guarantee
  - `failover` — one active consumer + standby
  - `key_shared` — ordered sharding by message key across consumers
- **Use schemas to enforce compatibility**; **version schemas safely** (backward/forward)
- **Avoid wildcard abuse without governance**
- **Plan retention separately from consumption**; **treat cursors as first-class state**

```
persistent://me/orders/order-events
  sub: "payment-service"  (key_shared, ordered per key, scaled consumers)
```

---

## 3. Reliability & Delivery Guarantees
