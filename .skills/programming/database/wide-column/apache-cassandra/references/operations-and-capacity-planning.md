# 5. Operations and Capacity Planning

Focused reference for **apache-cassandra**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

Runnable: `examples/docker/compose/databases/columns/apache-cassandra/docker-compose.yaml`
