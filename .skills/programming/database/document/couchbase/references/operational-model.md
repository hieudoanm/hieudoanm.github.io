# 4. Operational Model

Focused reference for **couchbase**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Operational Model

- **Replication**: each bucket is distributed across servers by `vBucket` (default 1024). Set replica count (1–3) per bucket.
- **Rebalance** redistributes data when nodes join/leave; avoid it during heavy traffic spikes.
- **Memory**: Couchbase is a memory-first database. Use **data-bucket quotas** to size cache per server and monitor eviction/`ep_bgm_fetched`.

```yaml
services:
  couchbase:
    image: couchbase:community
    ports:
      - '8091:8091' # Admin UI
      - '8093:8093' # Query service
      - '11210:11210' # Data service (KV/N1QL/FT)
    environment:
      COUCHBASE_ADMIN_USERNAME: admin
      COUCHBASE_ADMIN_PASSWORD: StrongPassword123!
      COUCHBASE_BUCKET: my_bucket
      COUCHBASE_BUCKET_RAMSIZE: 256 # MB quota, not total data size
      COUCHBASE_SERVICES: data,index,query,fts
```

Runnable: `examples/docker/compose/databases/documental/couchbase/docker-compose.yaml`

- **Swap-low-watermark / high-watermark** govern eviction; keep host memory allocation sane for the OS.
- Use **XDCR** (cross-datacenter replication) for disaster recovery and active-active topologies.
