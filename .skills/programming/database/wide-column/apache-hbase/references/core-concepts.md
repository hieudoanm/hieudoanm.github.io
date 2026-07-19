# 1. Core Concepts

Focused reference for **apache-hbase**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **Table = row key + column families**. Column families are groups of columns stored together; individual columns within a family are dynamic.
- Cells are **versioned**: each write is timestamped; reads default to the latest version (configurable `VERSIONS`).
- **Row key design** dominates performance — HBase ranges scan rows in row-key order.
- Regions (table splits) are served by RegionServers; HMaster manages assignments and health.
- **HDFS** supplies storage; **ZooKeeper** coordinates the cluster.
