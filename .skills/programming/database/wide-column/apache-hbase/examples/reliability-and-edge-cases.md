# hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: 5. Operations and Tuning

## Source guidance

This example applies the **5. Operations and Tuning** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Compactions**: L0 + major compaction in the background; monitor `compactions` status; schedule idle-time major compactions.
- **Block cache**: `hbase.blockcache` and in-table `BLOCKCACHE` for hot reads; `hfile.block.cache.size` (~40% recommended) tunes cache vs memstore.
- RegionServer heap: set in `hbase-env.sh`; monitor GC and `HBase` UI for region size/regions-per-server.
- Snapshot backup: `snapshot` command provides point-in-time copy on HDFS; integrate with HDFS-level backup.

## Example

```yaml
services:
  hbase:
    image: openeuler/hbase:2.6.5-oe2403sp3
    environment:
      - HBASE_MANAGES_ZK=true # single-container cluster runs its own ZooKeeper
    ports:
      - '16010:16010' # HMaster web UI and master RPC
      - '2181:2181' # ZooKeeper
    volumes:
      - hbase_data:/hbase-data
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for apache-hbase.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
