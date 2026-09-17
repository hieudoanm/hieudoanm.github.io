# Jest Best Practices: 3. Mocking

## Source guidance

This example applies the **3. Mocking** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`jest.mock("module")` for module fakes; `jest.spyOn(obj, "method")` at seams:**
- **`jest.fn()` with `mockResolvedValue`/`mockRejectedValue` for async seams; `mockReturnValue` for sync.**
- **Mock the boundary (`fetch`/DB/client), not the unit under test.**
- **`jest.clearAllMocks()`/`resetAllMocks` in `beforeEach`** — no state leaking between specs.

## Example

```ts
jest.mock("../api", () => ({ fetchUser: jest.fn(async () => userFixture) }));

it("uses the fetched user", async () => {
  const res = await getUser(1);
  expect(res.email).toBe("ada@example.com");
  expect(api.fetchUser).toHaveBeenCalledWith(1);
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for jest-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
