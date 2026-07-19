# Example: Synchronous versus Asynchronous

**Illustrative trade-off.**

A user action triggers work in another component. A synchronous request simplifies immediate feedback but couples availability and latency. An asynchronous event can absorb delay and retry, but introduces eventual consistency, duplicate delivery, ordering, and operational needs.

Record the user-visible consistency requirement, failure behavior, idempotency strategy, timeout, retry policy, and owner. Select based on measured experience and recovery requirements, not a blanket preference for events.
