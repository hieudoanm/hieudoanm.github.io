# 3. Write Amplification and Tuning

Focused reference for **rocksdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Write Amplification and Tuning

- **Write amplification (WA)** comes from compaction; larger multilevel targets reduce it at the cost of RAM.
- Universal compaction is better for write-heavy/append-only workloads; level compaction better for mixed.
- Tune with `compaction_options_universal.*` and `*_compaction_concurrency`.
- Use **`WriteBatch`** to batch many key changes in one write.

```go
batch := rocksdb.NewWriteBatch()
defer batch.Destroy()

batch.Put([]byte("order:1001:status"), []byte("paid"))
batch.Put([]byte("order:1001:total"), []byte("99.00"))
batch.Delete([]byte("order:1001:note"))

wo := rocksdb.NewDefaultWriteOptions()
wo.SetSync(false) // buffered WAL; set true only for durability-critical writes
if err := db.Write(wo, batch); err != nil {
    return fmt.Errorf("write batch: %w", err)
}
```
