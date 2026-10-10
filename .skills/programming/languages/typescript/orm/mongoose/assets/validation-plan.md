# Mongoose Best Practices: Validation Plan

Use this plan to verify work guided by [Mongoose Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Validation at the schema layer** — required, enum, custom validate/validator for the closed rules:
- [ ] **Pre/post hooks for derived fields and cross-document concerns, kept small**:
- [ ] **Hooks are scoped to the operation type** (save, findOneAndUpdate, deleteOne) — a pre('save') won't run on updateOne bulk paths; know where validation actually fires
- [ ] **runValidators: true on updates** unless intentionally bypassing (migration scripts)
- [ ] **Never trust client documents** — sanitize/whitelist assignable fields before save
- [ ] **Lean reads, indexed writes, explicit projection** — the three knock-down wins
- [ ] **Watch for populate storms** — nested populate chains are N+1 in disguise; consider denormalizing the display field
- [ ] **Bulk operations for batch sync** (bulkWrite/insertMany with ordered: false + skipValidation only when deliberate)
- [ ] **Stream/cursor() for huge result sets** — don't .exec() a million-doc query into RAM
- [ ] **mongodb-memory-server or a per-suite drop/recreate** for isolation:

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
