# 3. Indexing and Queries

Focused reference for **apache-cassandra**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Indexing and Queries

- The **primary partition key determines distribution**; `WHERE` clauses must typically start with the partition key (or a secondary index/MV).
- **Secondary indexes** (SASI/legacy) are best for low-cardinality filters on small data; avoid for hot paths.
- **Batches**: `BEGIN BATCH ... APPLY BATCH` for atomic multi-partition writes — not for bulk loading.
- **Lightweight transactions (LWT)**: `INSERT ... IF NOT EXISTS` for compare-and-swap semantics (heavier cost).

```cql
-- UNLOGGED batch: one round trip for many rows, without the atomicity overhead
BEGIN UNLOGGED BATCH
  INSERT INTO shop.orders_by_user (user_id, ordered_at, order_id, total, status)
  VALUES (7f3c1e4a-1f0d-4a2b-9c3e-5d8b0a4f6e21, '2026-03-04T08:15:00Z', 9b2d77c4-0a31-4f7e-b2c9-6d5e1a0f3c88, 129.90, 'paid');
  INSERT INTO shop.events_by_hour (bucket_hour, event_time, event_id, kind)
  VALUES ('2026-03-04T08', '2026-03-04T08:15:00Z', 4c8e12b0-5d77-4e3a-9f10-2b6c8d4a1e05, 'order.paid');
APPLY BATCH;

-- LWT: compare-and-swap for genuine uniqueness races, priced at a paxos round
INSERT INTO shop.orders_by_user (user_id, ordered_at, order_id, total, status)
VALUES (7f3c1e4a-1f0d-4a2b-9c3e-5d8b0a4f6e21, '2026-03-04T09:00:00Z', 3e5a9c17-2b84-4f60-91d7-0a2e6c8b4f39, 45.00, 'pending')
IF NOT EXISTS;
```
