# Cocos Creator Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pure logic tested without the engine** — state machines, math, balance config:
- **JS/browser functional tests for game-loop glue** where the engine is replaceable **(jsdom or headless GL with mocked cc)**.
- **Contract tests for saves, wave configs, and input mapping tables.**
- **Deterministic seeds for any procedural/RNG-driven content.**

## Example

```ts
describe("GameState", () => {
  test("addScore accumulates and dispatches", () => {
    const s = new GameState();
    const fn = vi.fn();
    s.addEventListener("score", fn);
    s.addScore(5);
    expect(s.score).toBe(5);
    expect(fn).toHaveBeenCalledWith(5);
  });
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for cocos-creator-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
