# Workflow notes

Focused reference for **vitest-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Structure & Matchers

- **Jest-compatible `describe`/`it`/`expect` — same sentences, same optics:**

```ts
import { describe, it, expect } from "vitest";

describe("Cart", () => {
  it("sums item amounts", () => {
    expect(new Cart([{ amount: 2 }, { amount: 3 }]).total()).toEqual(5);
  });
});
```

- **Matchers mirror Jest** — `toEqual`/`toMatchObject` deep, `toThrow`, `toHaveBeenCalledWith`, `toContainEqual`.
- **`expect.any`, `expect.objectContaining` for partial/typed assertions.**

---

## 3. Mocking

- **`vi.fn`, `vi.mock`, `vi.spyOn` — boundary mocking at module seams:**

```ts
vi.mock("../api", () => ({ fetchUser: vi.fn(async () => userFixture) }));

it("falls back on failure", async () => {
  api.fetchUser.mockRejectedValueOnce(new Error("x"));
  await expect(loadUser(1)).rejects.toThrow(/x/);
  expect(api.fetchUser).toHaveBeenCalledWith(1);
});
```
