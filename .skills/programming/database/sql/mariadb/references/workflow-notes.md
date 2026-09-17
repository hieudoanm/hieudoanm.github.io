# Workflow notes

Focused reference for **mariadb**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Data Modeling & Architecture

- **Normalize unless denormalization is justified**
- Select engines per workload — **OLTP vs analytics** differ
- Use correct data types deliberately
- **Index based on real query paths**; validate after schema changes
- Use **foreign keys intentionally**; avoid ambiguous/polymorphic schemas
- Design schemas for **long-term evolution**; version and test migrations

---

## 3. Integrity, Security & Safety

- Use **transactions** to ensure consistency; select **isolation levels** consciously
- **Handle deadlocks explicitly** — retry, keep transactions short
- Apply **least-privilege** database users; never plaintext secrets
- Restrict production access paths
- **Back up regularly and test restores**; treat **replication topology as part of safety**
