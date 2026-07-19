# Vitest Best Practices: 3. Mocking

## Source guidance

This example applies the **3. Mocking** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`vi.fn`, `vi.mock`, `vi.spyOn` — boundary mocking at module seams:**
- **`mockResolvedValueOnce`/`mockRejectedValueOnce` for per-test scenarios; `vi.clearAllMocks()` in `beforeEach`.**
- **`vi.useFakeTimers()`/`advanceTimersByTime` for time logic — deterministic over sleeps.**
- **`vi.doMock`/`vi.dynamicImport` for module-level path-conditional fakes (rare).**

## Example

```ts
vi.mock("../api", () => ({ fetchUser: vi.fn(async () => userFixture) }));

it("falls back on failure", async () => {
  api.fetchUser.mockRejectedValueOnce(new Error("x"));
  await expect(loadUser(1)).rejects.toThrow(/x/);
  expect(api.fetchUser).toHaveBeenCalledWith(1);
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for vitest-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
