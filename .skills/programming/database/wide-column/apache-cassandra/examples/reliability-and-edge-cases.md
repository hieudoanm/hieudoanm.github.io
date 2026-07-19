# Apache Cassandra: 5. Operations and Capacity Planning

## Source guidance

This example applies the **5. Operations and Capacity Planning** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Deploy in an odd number of nodes per DC; enable **rack awareness**.
- Right-size **`replication_factor`** (`RF=3` typical) and use **NetworkTopologyStrategy**.
- **`Nodetool`**: `status`, `info`, `repair`, `compaction`, `snapshot`, `tpstats`.
- **Compaction strategies**: SizeTiered (default), Leveled (for reads), TimeWindow (for time-series); tune per workload.
- Capacity: plan around disk, GC pauses, and heap; monitor `nodetool tpstats` (timeouts, dropped) and latency percentiles.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for apache-cassandra.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
