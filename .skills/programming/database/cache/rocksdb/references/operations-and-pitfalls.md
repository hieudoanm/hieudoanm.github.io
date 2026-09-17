# 5. Operations and Pitfalls

Focused reference for **rocksdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Operations and Pitfalls

- **Backups**: `BackupEngine` allows incremental/full backups; restore with `BackupEngine.RestoreFromBackup`.
- Monitoring: `GetIntProperty` (`rocksdb.estimate-live-data-size`, `rocksdb.num-immutable-mem-table`, etc.) and **PerfContext** for fine-grained stats.
- Manual compaction: `CompactRange` (`rocksdb.deleteobsoletefiles`) to reclaim space.
- Exceptional tuning: use `PendingCompactionBytes` as a warning threshold before runaway compaction.
- **Danger**: enabling `compaction_style=kCompactionStyleFIFO` without TTL can drop data.
