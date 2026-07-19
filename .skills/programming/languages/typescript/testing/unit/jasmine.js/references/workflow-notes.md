# Workflow notes

Focused reference for **jasmine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```js
expect(cart.items).toEqual([{ amount: 2 }]);
expect(service.token).toBeInstanceOf(String);
expect(spy).toHaveBeenCalledWith(42);
```

- **`toThrow` with a specific error for error contracts:**

```js
expect(() => user.validate()).toThrowError("email required");
```

- **Compose matchers over manual asserts** — the failure messages are the point.

---

## 3. Spies & Fakes

- **`spyOn` for seam isolation — verify calls, stub returns, inject fakes:**

```js
const api = { fetchUser: () => ({ id: 1 }) };
spyOn(api, "fetchUser").and.returnValue({ id: 9 });
expect(api.fetchUser).toHaveBeenCalled();
```

- **Use `and.returnValue`, `and.throwError`, `and.callFake` for controlled dops.**
- **Spy on the object's own method** — spying on a helper without a seam couples the test to internals.

---
