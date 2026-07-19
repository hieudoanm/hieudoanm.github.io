# apache-cassandra: Basic Usage

Apache Cassandra — open-source NoSQL wide-column distributed database designed for high availability and horizontal scale across many commodity servers.

## Scenario

Use this example as a starting point when applying **apache-cassandra** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Data Modeling** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
