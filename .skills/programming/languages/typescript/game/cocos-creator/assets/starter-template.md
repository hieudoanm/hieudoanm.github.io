# Cocos Creator Best Practices: Starter Template

A reusable starting point derived from the **9. Testing** section of [Cocos Creator Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
