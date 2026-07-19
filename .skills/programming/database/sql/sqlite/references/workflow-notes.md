# Workflow notes

Focused reference for **sqlite**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Data Modeling & Architecture

- **Normalize unless denormalization is justified**
- Use proper primary keys — `INTEGER PRIMARY KEY` when appropriate, UUIDs when portability matters
- Avoid oversized tables with unindexed queries; prefer **simple schemas over clever tricks**
- Design schemas for **read patterns**
- Avoid **JSON blobs unless intentionally chosen**
- **Version schema migrations explicitly** — treat schema changes as real migrations

---

## 3. Integrity & Safety

- **Always enable foreign keys**
- Use transactions to preserve consistency; **batch writes inside transactions**
- **Never copy the DB file while it is open** — use the backup API or warm snapshot
- Understand **locking behavior** (single writer; `busy_timeout` for contention)
- Handle crashes via **journaling/WAL correctly** (`PRAGMA synchronous` deliberate)
- **Never assume concurrent writes are cheap**; validate input at the application layer
