---
name: dynamodb
description: Best practices for modeling and operating DynamoDB. Use when designing access patterns, keys and single-table schemas, building GSIs, handling hot partitions, or tuning capacity — treats DynamoDB as a query-driven NoSQL store, not a schemaless SQL replacement.
---

# DynamoDB Best Practices

DynamoDB scales automatically but only for the **access patterns you design for**. Best practice is access-pattern-first modeling: partition key + sort key encode relationships, GSIs are sparse and deliberate (each costs money), `Scan` is avoided, and every item has a clear query purpose.

---

## 1. Core Stack & Constraints

- **Design for queries, not tables** — model access patterns first
- **Avoid `Scan` in production** — query with keys/GSIs
- **One table unless there is a strong reason otherwise**
- **Every item must have a clear access purpose**
- Avoid **unbounded item collections** and **hot partitions**
- **Use GSIs intentionally** — each GSI costs storage + write capacity
- Be explicit about **consistency requirements**; don't rely on secondary filtering for core queries
- **Assume schema evolution over time**

---

## 2. Data Modeling & Access Patterns

- **Start with access patterns first**; encode entity type and relationships in keys
- Use **composite keys deliberately** (PK + SK)
- Prefer **sparse GSIs** (only items having the attribute) over wide indexes
- **Limit item size and attribute sprawl**
- Use **prefix-based sort keys** for range queries
- **Design pagination into access patterns** (exclusiveStartKey)
- Model **one-to-many and many-to-many explicitly**
- **Document all supported queries per table**; avoid joins — precompute or duplicate when needed

```
PK            SK                    Type        Data
USER#alice    PROFILE               profile     {name, email}
USER#alice    ORDER#2024-01-01#id   order       {total, status}
ORDER#id      GSI1PK  = "STATUS#paid"  -> GSI for status queries
```

---

## 3. Security, Consistency & Data Safety

- Use **IAM roles with least privilege**; prefer **fine-grained access (condition keys)**
- Decide **consistency per operation** — eventual (default) vs strong
- Use **conditional writes** to prevent lost updates
- Use **transactions sparingly and intentionally** (2 items max, expensive)
- Encrypt sensitive attributes when required; understand **regional/global table implications**

```ts
await client.send(
  new PutItemCommand({
    TableName: 'app',
    Item: { PK: { S: `USER#${id}` }, SK: { S: 'PROFILE' } },
    ConditionExpression: 'attribute_not_exists(PK)',
  })
);
```

---

## 4. Reliability, Scaling & Performance

- DynamoDB **scales automatically — but keys still matter**
- Monitor: **consumed capacity, throttling events, hot partitions**
- Choose **capacity mode deliberately** (On-Demand vs Provisioned + autoscaling)
- Use **adaptive capacity correctly** — don't fight it, still avoid hot keys
- Design for **burst traffic**; use **DAX only when justified**
- Plan **TTL behavior** and background deletes
- **Test access patterns with production-like volume**; explain cost trade-offs clearly

---

## 5. General Rules of Thumb

- **Keys are the schema** — entity type and access path live in PK/SK
- **One table, sparse GSIs, no scans** — the DynamoDB idiom
- **Cost is a design input** — capacity mode and GSI count are decisions
- **Be truthful about unsupported queries** — if a pattern needs a scan/join, redesign

---

## Quick-Start Checklist

- [ ] Access patterns enumerated before any table exists
- [ ] Single table; PK/SK encode type + hierarchy; every item has a purpose
- [ ] No production `Scan`; queries via keys/GSIs; pagination designed in
- [ ] Sparse, deliberate GSIs; documents of supported queries kept per table
- [ ] Conditional writes for invariants; consistency chosen per read
- [ ] Hot partitions and unbounded collections avoided; TTL planned
- [ ] Capacity mode selected deliberately; throttling/capacity metrics monitored
- [ ] Access patterns load-tested; cost trade-offs documented
