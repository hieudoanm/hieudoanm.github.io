# Rethinkdb: 4. Changefeeds and Real-Time Model

## Source guidance

This example applies the **4. Changefeeds and Real-Time Model** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Subscribe like `table('chat').changes()`; pass `includeInitial: true` to seed state.
- Use `squash: true` or an integer interval (ms) to coalesce bursts of writes.
- Filter changefeeds to reduce payload: `changes().filter(...)` on the change object.
- For complex projections, compose changefeeds on a query, but keep the base query indexable.
- Maintain a client-side store (state) that applies change events to stay consistent.

## Example

```javascript
// feed the base query stays indexable; squash coalesces write bursts
const feed = await conn
  .table('chat')
  .between(
    { left: 'room:eng', right: r.minval },
    { left: 'room:eng', right: r.maxval },
    { index: 'room_sentAt' }
  )
  .changes({ includeInitial: true, squash: 500 })
  .filter((change) => change.new_val && change.new_val.hidden !== true);

for await (const change of feed) {
  store.apply(change); // idempotent: same client store on every reconnect
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for rethinkdb.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
