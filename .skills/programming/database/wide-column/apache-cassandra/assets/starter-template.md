# Apache Cassandra: Starter Template

A reusable starting point derived from the **2. Data Modeling** section of [Apache Cassandra](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
