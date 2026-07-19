# Review checklist

Focused reference for **activemq**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
