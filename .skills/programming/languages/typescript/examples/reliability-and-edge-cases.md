# TypeScript Best Practices: 10. Async & Concurrency

## Source guidance

This example applies the **10. Async & Concurrency** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`async`/`await` over `.then` chains for control flow** — flat reads as a sequence; keep exponential backoff/loops out of promise chains.
- **`Promise.all` for independent parallel work; sequential `for...of await` when order/dependency matters** — choosing the right one is a concurrency decision, not taste:
- **Never `async` constructor; build then initialize** — `await factory()` or an explicit `init()` (caller decides sequencing).
- **Timeout composition** — wrap fallible external calls with `Promise.race`/`AbortController` so a hung upstream can't hang the app.

## Example

```ts
const [users, posts] = await Promise.all([loadUsers(), loadPosts()]);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for typescript-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
