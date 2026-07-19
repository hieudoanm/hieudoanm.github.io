# optimistic concurrency: create, then always send _rev back on update: Starter Template

A reusable starting point derived from the **2. Access via HTTP** section of [optimistic concurrency: create, then always send _rev back on update](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
# optimistic concurrency: create, then always send _rev back on update
curl -sS -X PUT "$CB/orders" -H 'Content-Type: application/json' \
  -d '{"_id":"order:1001","status":"pending","total":99.00}'

REV=$(curl -sS "$CB/orders/order:1001" | jq -r ._rev)

curl -sS -X PUT "$CB/orders/order:1001" -H 'Content-Type: application/json' \
  -H "If-Match: $REV" \
  -d "{\"_rev\":\"$REV\",\"status\":\"paid\",\"total\":99.00}"
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
