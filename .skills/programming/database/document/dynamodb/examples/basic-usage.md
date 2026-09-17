# DynamoDB Best Practices: Basic Usage

Best practices for modeling and operating DynamoDB. Use when designing access patterns, keys and single-table schemas, building GSIs, handling hot partitions, or tuning capacity — treats DynamoDB as a query-driven NoSQL store, not a schemaless SQL replacement.

## Scenario

Use this example as a starting point when applying **dynamodb** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Security, Consistency & Data Safety** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
await client.send(
  new PutItemCommand({
    TableName: 'app',
    Item: { PK: { S: `USER#${id}` }, SK: { S: 'PROFILE' } },
    ConditionExpression: 'attribute_not_exists(PK)',
  })
);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
