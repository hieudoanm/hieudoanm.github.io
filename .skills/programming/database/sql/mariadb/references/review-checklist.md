# Review checklist

Focused reference for **mariadb**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## Quick-Start Checklist

- [ ] MariaDB 10.6+ targeted; engines chosen explicitly per workload
- [ ] Always-on primary key; explicit transactions; FK usage intentional
- [ ] MySQL compatibility assumptions verified; no undocumented-behavior reliance
- [ ] Indexes based on real query paths, validated with `EXPLAIN`
- [ ] Isolation levels conscious; deadlock retry handled; short transactions
- [ ] Least-privilege users; no plaintext secrets; production access restricted
- [ ] Backups tested; replication/Galera topology understood and monitored
- [ ] Failover plan; engine/config choices documented; prod-scale testing
