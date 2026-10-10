# Example: Context Diagram

**Illustrative model; components and actors are generic.**

```text
Customer → Product System → Payment Provider
                    ├────→ Identity Provider
                    └────→ Notification Service
Operator ────────────────→ Product System
```

For each arrow, record purpose, data, owner, trust boundary, and failure behavior. This sketch is not enough to define authentication, retries, or data authority; link detailed flow and contract views.
