# Interaction Patterns

| Pattern | Fits when | Costs to plan |
|---|---|---|
| Synchronous request/response | Caller needs immediate outcome | Latency and availability coupling, timeout propagation |
| Asynchronous command/message | Work can be deferred and acknowledged later | Eventual consistency, retries, duplicate handling, operations |
| Event notification | Consumers react to a fact that occurred | Schema evolution, ordering, replay, ownership |
| Batch exchange | Periodic large transfers or legacy boundary | Freshness delay, reconciliation, file security |

Choose from user-visible timing, consistency, workload, failure tolerance, and operational capability. Distinguish commands (“please do”) from events (“this happened”). Avoid exposing internal database schemas as public contracts.
