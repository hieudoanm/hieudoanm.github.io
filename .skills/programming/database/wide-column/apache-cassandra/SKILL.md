---
name: "apache-cassandra"
description: "Apache Cassandra — open-source NoSQL wide-column distributed database designed for high availability and horizontal scale across many commodity servers."
tags:
  - "programming"
  - "database"
  - "wide"
  - "column"
  - "apache"
  - "cassandra"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Apache Cassandra in a project."
prerequisites:
  - "Familiarity with the application’s data model and access patterns."
  - "For implementation, access to the database environment or representative schema."
related_skills:
  - "../apache-hbase/SKILL.md"
  - "../../search/apache-solr/SKILL.md"
  - "../../cache/rocksdb/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
Apache Cassandra is a **distributed wide-column NoSQL database** built for **horizontal scalability, high availability, and tunable consistency** across many commodity servers, using a **peer-to-peer ring** architecture.

## 1. Core Concepts

- **Keyspaces** are top-level namespaces; **tables** hold rows of columns within them.
- **Primary key** = partition key + clustering columns: partitions distribute data via a token ring, clustering orders rows within a partition.
- **Peer-to-peer ring**: every node is equal; data is replicated across nodes per **replication factor**.
- **Tunable consistency**: `QUORUM`, `ONE`, `LOCAL_QUORUM`, `LOCAL_ONE`, `ALL` per read/write.
- **CQL** is the query language — SQL-like but with **no joins, no update-triggered set ops, no multi-row transactions** in general.

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

## 4. Consistency and Availability

- Choose consistency based on the access pattern: `LOCAL_QUORUM` for most production reads/writes; `ONE` for last-write-wins caches.
- Understand the **consistency vs availability** trade-off — Cassandra favors availability; `ALL` with a down replica means failed requests.
- Use `CL` per requirement: e.g., `QUORUM` writes + `LOCAL_QUORUM` reads for balance.
- Repair (`nodetool repair`) keeps replicas consistent over time — schedule it!

## 5. Operations and Capacity Planning

- Deploy in an odd number of nodes per DC; enable **rack awareness**.
- Right-size **`replication_factor`** (`RF=3` typical) and use **NetworkTopologyStrategy**.
- **`Nodetool`**: `status`, `info`, `repair`, `compaction`, `snapshot`, `tpstats`.
- **Compaction strategies**: SizeTiered (default), Leveled (for reads), TimeWindow (for time-series); tune per workload.
- Capacity: plan around disk, GC pauses, and heap; monitor `nodetool tpstats` (timeouts, dropped) and latency percentiles.

```yaml
services:
  cassandra:
    image: cassandra:6.0
    environment:
      - CASSANDRA_CLUSTER_NAME=dev
      - CASSANDRA_ENDPOINT_SNITCH=SimpleSnitch
    ports:
      - "9042:9042" # CQL - cqlsh and the native drivers
      - "7000:7000" # internode gossip
      - "7199:7199" # JMX, what nodetool talks to
    volumes:
      - cassandra_data:/var/lib/cassandra
```

Runnable: [`examples/docker/compose/databases/columns/apache-cassandra/docker-compose.yaml`](../../../devops/docker/docker-compose/SKILL.md)

## 6. Common Pitfalls

- Missing a partition key → full-partition scans that overwhelm nodes.
- `ALLOW FILTERING` on large tables → full cluster scan.
- Unbounded partitions and hot partition keys.
- Ignoring repair → silent diverging replicas.
- Assuming Cassandra provides ACID transactions like relational DBs.

## General Rules of Thumb

- Model tables per query, not per entity — denormalization is expected.
- Keep partitions bounded (A few hundred MB), spread writes, and use bucket keys for hot paths.
- Prefer `LOCAL_QUORUM` as a default; escalate consistency only where needed.
- Schedule regular `nodetool repair` and monitor compaction backlog.

## Quick-Start Checklist

- [ ] Design keyspace with `NetworkTopologyStrategy` and RF per DC.
- [ ] Design query-shaped tables with primary key + clustering key.
- [ ] Bound partition sizes; add time-bucket keys for high-write data.
- [ ] Prefer full partition-key queries; avoid `ALLOW FILTERING`.
- [ ] Configure read/write consistency (`LOCAL_QUORUM` default).
- [ ] Use LWT only where conditional writes are mandatory (higher cost).
- [ ] Schedule repairs; monitor `nodetool tpstats`, latency, and GC.
- [ ] Plan backups via snapshot + sstableloader restore path.
