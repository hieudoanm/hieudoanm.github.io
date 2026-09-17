# Fauna: 3. Data Modeling and Indexes

## Source guidance

This example applies the **3. Data Modeling and Indexes** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Indexes**: keep secondary lookups fast — create an index on the fields you query by (e.g., `by_user`, `by_status_created_at`).
- Model **relationships** explicitly using the document graph (like edges) rather than keeping arrays of ids awkwardly.
- Use **schemas** to validate shapes and create _freeform_ or _schema_ (strict) document definitions.
- **Temporal**: store the `ts` (timestamp) and version; use `DocumentVersion` / `Snapshot` to retrieve history.

## Example

```javascript
// relationships are explicit document refs — walk the graph, do not join
const orders = await client.query(FQL`
  Order.sorted()
    .filter(.customer.id == "cus_42" && .status == "paid")
    .take(20)
    .select({ id, total, ts })
`);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for fauna.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
