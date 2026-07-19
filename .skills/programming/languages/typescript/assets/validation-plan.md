# TypeScript Best Practices: Validation Plan

Use this plan to verify work guided by [TypeScript Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **External input (network, storage, user input) is unknown until validated** — zod (or io-ts) for schema-based runtime checks; never cast JSON straight to a type you trust:
- [ ] **Validate once at the edge; trust the declared type inside** — the schema is the composition point for brands (§5) and the single source of truth for external shapes
- [ ] **Fail fast with validation errors** (parse, not parseLikesafe-defaulting unless absence is a real value)
- [ ] **Keep schemas colocated with their types** — z.infer guarantees the type can't drift from the validator
- [ ] **Vitest (or Jest) with describe/it** — it.each for table-driven cases, expect(...).toMatchObject-style partial matching over deep literal clones
- [ ] **Name tests as specifications** — it("returns 404 when user not found") reads as documentation:
- [ ] **Type your test data with the same domain types** — use as const, satisfies, or factory helpers so test fixtures can't drift from production shapes
- [ ] **Mock the boundaries (vi.fn() on HTTP/clock/storage), not the logic** — assert behaviour and outcomes
- [ ] **expect.objectContaining()/expect.any(...) for partial or optional values** — don't assert the whole shape when only part matters

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
