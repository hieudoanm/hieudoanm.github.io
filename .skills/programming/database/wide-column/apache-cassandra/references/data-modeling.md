# 2. Data Modeling

Focused reference for **apache-cassandra**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Data Modeling

- **Query-first**: design tables around the exact queries you will run; denormalize freely.
- Partition by the entity's natural grouping (e.g., user ID); cluster by time or attribute for ordered scans within a partition.
- Avoid unbounded partitions (a single partition key holding millions of rows) — they cause hot spots and latency spikes.
- Use **materialized views** (with care) or **secondary indexes** sparingly for lookups that do not start with the partition key.
- **Time-series**: cluster by timestamp; bucket high-write streams by hour/day to spread load.

```cql
-- NetworkTopologyStrategy keeps one replica set per DC; RF=3 tolerates two node losses per DC
CREATE KEYSPACE IF NOT EXISTS shop WITH replication = {'class': 'NetworkTopologyStrategy', 'dc1': 3, 'dc2': 3};

-- partition by the entity, cluster by time: scans stay ordered inside one partition
CREATE TABLE shop.orders_by_user (user_id uuid, ordered_at timestamp, order_id uuid, total decimal, status text,
                                  PRIMARY KEY ((user_id), ordered_at, order_id)) WITH CLUSTERING ORDER BY (ordered_at DESC);

-- bucket a high-write stream by hour so no single partition grows without bound
CREATE TABLE shop.events_by_hour (bucket_hour text, event_time timestamp, event_id uuid, kind text,
                                  PRIMARY KEY ((bucket_hour), event_time, event_id));
```
