# Mocha Best Practices: 3. Async Tests

## Source guidance

This example applies the **3. Async Tests** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Async via async/await or explicit `done` — never silently ignore:**
- **A `done` that's never called = timeout — set `this.timeout(...)` realistically; always call `done` on every path.**
- **Rejected promises fail the spec — `await expect(p).to.be.rejected` (chai-as-promised).**

## Example

```js
it("loads items", async () => {
  const items = await loader.load();
  expect(items.length).to.equal(3);
});

it("falls back on error", (done) => {
  loader.load().catch((err) => { expect(err.message).to.contain("x"); done(); });
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for mocha-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
