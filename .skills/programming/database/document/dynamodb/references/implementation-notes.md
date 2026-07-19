# Implementation notes

Focused reference for **dynamodb**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ts
await client.send(
  new PutItemCommand({
    TableName: 'app',
    Item: { PK: { S: `USER#${id}` }, SK: { S: 'PROFILE' } },
    ConditionExpression: 'attribute_not_exists(PK)',
  })
);
```

---

## 4. Reliability, Scaling & Performance

- DynamoDB **scales automatically — but keys still matter**
- Monitor: **consumed capacity, throttling events, hot partitions**
- Choose **capacity mode deliberately** (On-Demand vs Provisioned + autoscaling)
- Use **adaptive capacity correctly** — don't fight it, still avoid hot keys
- Design for **burst traffic**; use **DAX only when justified**
- Plan **TTL behavior** and background deletes
- **Test access patterns with production-like volume**; explain cost trade-offs clearly

---

## 5. General Rules of Thumb
