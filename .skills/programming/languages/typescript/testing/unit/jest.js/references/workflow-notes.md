# Workflow notes

Focused reference for **jest-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`toEqual` deep; `toMatchObject` subset; `toBe` identity; `toStrictEqual` for stricter checks:**

```ts
expect(args).toMatchObject({ email: "a@b.c" });
expect(result).toEqual({ id: 1, name: "ada" });
```

- **`toHaveBeenCalledWith`, `toThrow`, `toHaveLength`, `toBeTruthy` — express intent.**
- **`expect.arrayContaining`/`objectContaining` for partial assertions.**

---

## 3. Mocking

- **`jest.mock("module")` for module fakes; `jest.spyOn(obj, "method")` at seams:**

```ts
jest.mock("../api", () => ({ fetchUser: jest.fn(async () => userFixture) }));

it("uses the fetched user", async () => {
  const res = await getUser(1);
  expect(res.email).toBe("ada@example.com");
  expect(api.fetchUser).toHaveBeenCalledWith(1);
});
```

- **`jest.fn()` with `mockResolvedValue`/`mockRejectedValue` for async seams; `mockReturnValue` for sync.**
- **Mock the boundary (`fetch`/DB/client), not the unit under test.**
- **`jest.clearAllMocks()`/`resetAllMocks` in `beforeEach`** — no state leaking between specs.

---
