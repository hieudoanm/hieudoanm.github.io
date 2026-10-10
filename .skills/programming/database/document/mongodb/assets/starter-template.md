# MongoDB Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Constraints** section of [MongoDB Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
// Embed for one-to-few; reference for many-to-many / large fan-outs
{
  _id: ObjectId("..."),
  user: "alice",
  addresses: [{ type: "home", street: "..." }], // embedded
  orderIds: [ObjectId("...")]                   // referenced
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
