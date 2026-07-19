# Workflow notes

Focused reference for **mysql**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Data Modeling & Architecture

- **Normalize unless denormalization is justified**
- Use proper data types — avoid oversized `VARCHAR` and misuse of `TEXT`
- **Index based on query patterns**, not entity attributes
- Use **foreign keys intentionally** (never accidentally)
- Avoid polymorphic or ambiguous schemas
- Design schemas for the **read and write paths** together

---

## 3. Integrity, Security & Safety

- Use **transactions** to guarantee consistency; choose **isolation levels** deliberately (`REPEATABLE READ` default vs `READ COMMITTED`)
- **Handle deadlocks explicitly** — retry on `ERROR 1213`; keep transactions short
- Use **least-privilege** database users; never plaintext secrets
- Protect against **SQL injection** at the application layer (bind parameters)
- Restrict production access; **back up regularly and test restores**
