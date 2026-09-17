# TypeScript Best Practices: 11. Testing

## Source guidance

This example applies the **11. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Vitest (or Jest) with `describe`/`it`** — `it.each` for table-driven cases, `expect(...).toMatchObject`-style partial matching over deep literal clones.
- **Name tests as specifications** — `it("returns 404 when user not found")` reads as documentation:
- **Type your test data with the same domain types** — use `as const`, `satisfies`, or factory helpers so test fixtures can't drift from production shapes.
- **Mock the boundaries (`vi.fn()` on HTTP/clock/storage), not the logic** — assert behaviour and outcomes.

## Example

```ts
describe('getUserById', () => {
  it('returns the user when found', async () => {
    await expect(getUserById(userId)).resolves.toEqual(user);
  });
  it('throws when missing', async () => {
    await expect(getUserById(missingId)).rejects.toThrow(NotFoundError);
  });
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for typescript-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
