# Review checklist

Focused reference for **apache-pulsar**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. General Rules of Thumb

- **Log + cursors, not queues** — retention and consumption are decoupled
- **Subscriptions are state** — type chosen by ordering/scale needs, managed explicitly
- **Storage is a real cost** — retention/TTL/tiered storage planned, not default
- **Idempotent consumers + DLQ** — the reliability contract

---

## Quick-Start Checklist

- [ ] Tenants/namespaces for isolation + quotas; domain-aligned topics
- [ ] Subscription type explicit per consumer (exclusive/shared/failover/key_shared)
- [ ] Schema-registered, safely versioned messages; no wildcard abuse
- [ ] Retention/TTL managed separately from consumption; tiered storage planned
- [ ] At-least-once understood; ack timeouts tuned; consumers idempotent
- [ ] DLQ configured for failed messages; backlog/lag monitored
- [ ] Persistent topics for durability; geo-replication policy explicit
- [ ] Broker/bookie failure tested; storage + write amplification sized; rebalancing handled
