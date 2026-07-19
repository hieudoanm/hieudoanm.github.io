# Apache Cassandra: 2. Data Modeling

## Source guidance

This example applies the **2. Data Modeling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Query-first**: design tables around the exact queries you will run; denormalize freely.
- Partition by the entity's natural grouping (e.g., user ID); cluster by time or attribute for ordered scans within a partition.
- Avoid unbounded partitions (a single partition key holding millions of rows) — they cause hot spots and latency spikes.
- Use **materialized views** (with care) or **secondary indexes** sparingly for lookups that do not start with the partition key.
- **Time-series**: cluster by timestamp; bucket high-write streams by hour/day to spread load.

## Example

This excerpt is from the cited **2. Data Modeling** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apache-cassandra.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
