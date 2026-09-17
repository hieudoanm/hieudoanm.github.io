# Workflow notes

Focused reference for **libsql**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Data Modeling & Architecture

- Prefer **stable primary keys** (UUIDs where appropriate)
- **Avoid relying on write ordering across nodes**
- Design schemas to **minimize write conflicts**
- Normalize unless denormalization is deliberate; **keep schemas simple and evolvable**
- **Version schema migrations explicitly**; avoid schema churn in highly replicated setups
- Design for **merge-friendly data models** (last-writer-wins or explicit conflict resolution)

---

## 3. Integrity & Safety

- **Rely on SQLite constraints for local correctness**
- Understand **how constraints behave under replication** (unique/checks are local, not global)
- Use **transactions for all logical write units**
- **Avoid out-of-band DB file manipulation** while syncing
- Validate assumptions under **network partitions**
- **Treat replicas as potentially stale**; never assume instant global consistency
