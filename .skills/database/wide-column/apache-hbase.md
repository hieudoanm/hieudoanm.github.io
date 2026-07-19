---
name: apache-hbase
description: Apache HBase — distributed, scalable, column-oriented NoSQL database on Hadoop HDFS for real-time read/write of large tables.
---

Apache HBase is a **distributed, BigTable-style NoSQL database** running on **Hadoop HDFS**. It provides **real-time random read/write access** to very large tables with strong **row-level consistency**, horizontal scaling, and automatic fault tolerance.

## 1. Core Concepts

- **Table = row key + column families**. Column families are groups of columns stored together; individual columns within a family are dynamic.
- Cells are **versioned**: each write is timestamped; reads default to the latest version (configurable `VERSIONS`).
- **Row key design** dominates performance — HBase ranges scan rows in row-key order.
- Regions (table splits) are served by RegionServers; HMaster manages assignments and health.
- **HDFS** supplies storage; **ZooKeeper** coordinates the cluster.

## 2. Row Key Design

- Row keys define locality, range scans, and hotspot avoidance.
- **Pre-split tables** to avoid the initial single-region fork in the road.
- Avoid monotonically increasing keys (e.g., timestamps) creating a single hot region — use keys with **salting** (bucket prefix) or plain hashing.
- Keep keys short (tens of bytes) to save memory; consider compound keys (`userid:timestamp`) for ordered time-series.
- Use binary/encoding over textual hex for space and comparison efficiency where it matters.

## 3. Schema and Column Families

- Keep **column family count low** (1–3); each family = separate storage files (HFiles), so many families mean more seeks/compactions.
- Choose column families by access patterns: hot columns in one family, cold in another.
- Compression (LZO/LZ4/ZSTD) per family in `COMPRESSION` column.
- TTL per family for automatic expiry of old data (`TTL`), and `IN_MEMORY` for hot families (default off).

```bash
# hbase shell -n runs non-interactively; in 2.x every table lives in a namespace
create_namespace 'shop'
# two families, not many columns: d is the hot scalar payload, i the sparse lookup index
create 'shop.orders',
       {NAME => 'd', VERSIONS => 1, COMPRESSION => 'ZSTD', TTL => 7776000},   # 90 days
       {NAME => 'i', VERSIONS => 1, COMPRESSION => 'SNAPPY'},
       SPLITS => ['03-', '07-', '0b-']                    # pre-split on the salt prefix
# retention and compression are family properties, adjustable after creation
alter 'shop.orders', {NAME => 'd', TTL => 2592000}
```

## 4. Reads and Writes

- `get` needs row key; `scan` supports range by start/stop row; use `setFilter`/filters (`SingleColumnValueFilter`, `PrefixFilter`) for filtering.
- **Writes are fast**: append to WAL + memstore, flushed async to HFiles. Use `Batch` (async) and `CheckAndMutate`/`CheckAndPut` for atomic read-modify-write.
- **Batching**: use multi-get/multi-put to reduce RPC round trips.
- **Co-Processor**: you can add a custom observer, but mostly avoid unless needed for complex computed columns.

```java
try (Connection connection = ConnectionFactory.createConnection(conf);
     Table table = connection.getTable(TableName.valueOf("shop.orders"))) {
  // get() needs the exact row key; read only the families and columns you need
  Get byKey = new Get(Bytes.toBytes("03-7f3c1e4a")).addFamily(Bytes.toBytes("d"));
  for (Result row : table.get(byKey)) { /* ... */ }

  // scan() is a range over row-key order: the stop row is inclusive, filters run server-side
  Scan range = new Scan().withStartRow(Bytes.toBytes("03-7f3c1e4a")).withStopRow(Bytes.toBytes("03-7f3c1e4b"), true).setCaching(500);
  try (ResultScanner rows = table.getScanner(range)) { /* ... */ }

  // one RPC for many puts - BufferedMutator replaces the 1.x HTable.put(List)
  try (BufferedMutator mutator = connection.getBufferedMutator(TableName.valueOf("shop.orders"))) {
    mutator.mutate(new Put(Bytes.toBytes("03-7f3c1e4a")).addColumn(Bytes.toBytes("d"), Bytes.toBytes("total"), Bytes.toBytes("129.90")));
  }
}
```

## 5. Operations and Tuning

- **Compactions**: L0 + major compaction in the background; monitor `compactions` status; schedule idle-time major compactions.
- **Block cache**: `hbase.blockcache` and in-table `BLOCKCACHE` for hot reads; `hfile.block.cache.size` (~40% recommended) tunes cache vs memstore.
- RegionServer heap: set in `hbase-env.sh`; monitor GC and `HBase` UI for region size/regions-per-server.
- Snapshot backup: `snapshot` command provides point-in-time copy on HDFS; integrate with HDFS-level backup.

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

Runnable: [`examples/docker/compose/databases/columns/apache-hbase/docker-compose.yaml`](../../../examples/docker/compose/databases/columns/apache-hbase/docker-compose.yaml)

## 6. Common Pitfalls

- Poor row-key design (hot spot) — the #1 performance killer.
- Overusing column families or dynamic columns (leading to sparse incantations).
- Ignoring `scan` ranges and using broad scans unboundedly.
- Not planning compactions/major compaction → growing read latency.
- Assuming ACID like a traditional DB — HBase gives row-level consistency, not cross-row transactions.

## General Rules of Thumb

- Design row keys around range scans and access locality; salt to avoid hot spots.
- Keep column families minimal and column names short.
- Use TTL and compression per family for efficient storage.
- Batch get/put operations and avoid broad, unbounded scans.
- Monitor region balance, compactions, block cache, and GC regularly.

## Quick-Start Checklist

- [ ] Design row keys with pre-splits and salting to avoid hotspots.
- [ ] Define few column families; set compression, TTL, IN_MEMORY based on access.
- [ ] Pre-split table during creation for parallel writes.
- [ ] Use batch APIs for multi-row operations; prefer Get/Scan with filters.
- [ ] Balance RegionServer heap and block cache; monitor GC.
- [ ] Enable snapshot backups and automated compaction tuning.
- [ ] Schedule `major_compact` during low-traffic windows as needed.
- [ ] Monitor Hmaster/RIS status, regions per server, and queue depth.
