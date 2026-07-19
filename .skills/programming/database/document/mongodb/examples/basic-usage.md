# MongoDB Best Practices: Basic Usage

Best practices for schema design and operations with MongoDB. Use when modeling documents, choosing embed vs reference, designing indexes, building aggregation pipelines, or preparing for scale — treats MongoDB as a schema-designed document database, not schemaless storage.

## Scenario

Use this example as a starting point when applying **mongodb** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
// Embed for one-to-few; reference for many-to-many / large fan-outs
{
  _id: ObjectId("..."),
  user: "alice",
  addresses: [{ type: "home", street: "..." }], // embedded
  orderIds: [ObjectId("...")]                   // referenced
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
