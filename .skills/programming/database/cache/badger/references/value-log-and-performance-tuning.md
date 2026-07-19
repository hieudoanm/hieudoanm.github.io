# 3. Value Log and Performance Tuning

Focused reference for **badger**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Value Log and Performance Tuning

- Large values stored in the vLog improve write throughput; keys stay in the LSM tree.
- `ValueThreshold` (default 1MB) determines when values go to vLog — tune based on your read/write ratio.
- Compaction: Badger compacts LSM levels automatically; set `NumLevelZeroTables` and `NumLevelZeroTablesStall` to tune memory/performance.
- Set `MaxTableSize` and `BaseTableSize` to keep LSM trees healthy.
