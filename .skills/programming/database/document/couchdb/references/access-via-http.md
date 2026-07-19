# Access via HTTP

Focused reference for [CouchDB](../SKILL.md) HTTP access.

## Common endpoints

- Read or write a document at `/{db}/{docid}` with the corresponding HTTP method.
- Use `/{db}/_changes` for the changes feed and `/_replicate` for replication.
- Use `/_compact` for explicit database compaction and `/_all_dbs` for database discovery.

## Revision-aware update

```bash
curl --fail-with-body -sS -X PUT "$COUCH_URL/$DB/$DOC_ID" \
  -H 'Content-Type: application/json' \
  -d '{"type":"note","body":"first revision"}'
```

Keep the returned `_rev` and send it with the next update. Handle `409 Conflict` as a revision mismatch; do not blindly retry with stale data.
