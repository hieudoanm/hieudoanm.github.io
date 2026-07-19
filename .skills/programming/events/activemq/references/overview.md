# Overview

Focused reference for **activemq**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
