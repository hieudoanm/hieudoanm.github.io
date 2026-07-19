# DynamoDB Best Practices: Starter Template

A reusable starting point derived from the **3. Security, Consistency & Data Safety** section of [DynamoDB Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
await client.send(
  new PutItemCommand({
    TableName: 'app',
    Item: { PK: { S: `USER#${id}` }, SK: { S: 'PROFILE' } },
    ConditionExpression: 'attribute_not_exists(PK)',
  })
);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
