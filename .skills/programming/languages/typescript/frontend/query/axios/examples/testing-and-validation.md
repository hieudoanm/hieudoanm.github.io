# Axios Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Mock via `axios-mock-adapter` or intercept the adapter; assert instance-level behavior:**
- **Test interceptors in isolation (401 path, token attach); response-validation unit tests.**
- **`vi.mock("axios")` for full-mock when adapter too heavy — keep seams typed.**

## Example

```ts
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(api);
mock.onGet("/orders").reply(200, [{ id: "1" }]);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for axios-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
