# Jasmine Best Practices: 3. Spies & Fakes

## Source guidance

This example applies the **3. Spies & Fakes** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`spyOn` for seam isolation — verify calls, stub returns, inject fakes:**
- **Use `and.returnValue`, `and.throwError`, `and.callFake` for controlled dops.**
- **Spy on the object's own method** — spying on a helper without a seam couples the test to internals.

## Example

```js
const api = { fetchUser: () => ({ id: 1 }) };
spyOn(api, "fetchUser").and.returnValue({ id: 9 });
expect(api.fetchUser).toHaveBeenCalled();
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for jasmine-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
