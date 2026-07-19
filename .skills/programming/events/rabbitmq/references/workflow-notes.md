# Workflow notes

Focused reference for **rabbitmq**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Messaging & Exchange Design

- **Model messages around commands and tasks**, not free-form events
- **Choose exchange types intentionally**: `direct` (targeted), `topic` (patterned), `fanout` (broadcast)
- Keep **routing keys meaningful and stable**
- **Prefer multiple queues over complex bindings**
- Avoid **overly broad topic patterns** (`#`) without need
- **Use DLQs for failed messages**; **separate retry queues from primary queues**
- **Version message payloads deliberately** (schema-aware, tolerant readers)

```
order.created ──► orders.direct ──► orders.created.queue (consumer)
                         └──────► orders.audit.queue     (fanout target)
```

---

## 3. Reliability & Delivery Guarantees
