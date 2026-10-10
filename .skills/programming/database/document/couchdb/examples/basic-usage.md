# optimistic concurrency: create, then always send _rev back on update: Basic Usage

CouchDB — source-first JSON document database with HTTP API, multi-master replication, and map/reduce views.

## Scenario

Use this example as a starting point when applying **couchdb** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Access via HTTP** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
# optimistic concurrency: create, then always send _rev back on update
curl -sS -X PUT "$CB/orders" -H 'Content-Type: application/json' \
  -d '{"_id":"order:1001","status":"pending","total":99.00}'

REV=$(curl -sS "$CB/orders/order:1001" | jq -r ._rev)

curl -sS -X PUT "$CB/orders/order:1001" -H 'Content-Type: application/json' \
  -H "If-Match: $REV" \
  -d "{\"_rev\":\"$REV\",\"status\":\"paid\",\"total\":99.00}"
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
