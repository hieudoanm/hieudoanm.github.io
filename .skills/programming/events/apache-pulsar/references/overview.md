# Overview

Focused reference for **apache-pulsar**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Apache Pulsar Best Practices

Pulsar is a **distributed log with cursor-based consumption** — messages are retained independently of consumption and read positions (cursors) are first-class state managed by subscribers. Best practice is tenant/namespace design for isolation and quotas, intentional subscription types (exclusive/shared/failover/key_shared), schema-based messages with safe versioning, and explicit retention/TTL management separated from consumption.

---

## 1. Core Stack & Constraints

- Assume Pulsar **2.x / 3.x**
- Pulsar is a **distributed log with cursor-based consumption** — retained independent of consumption
- **Topics are cheap; namespaces define limits** — use namespaces for quotas/isolation
- **Prefer schema-based messages**
- **Avoid treating subscriptions like ephemeral queues** — cursors persist
- **Explicitly manage retention and TTL** (storage is not free)
- **Understand BookKeeper storage costs** (replication, write amplification offload)

```sh
# tenant / namespace
pulsar-admin tenants create me
pulsar-admin namespaces create me/orders --clusters primary
pulsar-admin topics create-persistent-topic persistent://me/orders/order-events
```
