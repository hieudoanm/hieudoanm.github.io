# Postman: 3. Making the Collection a Test

## Source guidance

This example applies the **3. Making the Collection a Test** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Assert on status, content type, and schema, not just a 200.** A 200 returning an error body is the most common false pass in API testing.
- **Use a JSON Schema in the response test** so a shape change fails loudly. This is where a collection becomes a contract test rather than a smoke test.
- **Chain dependent requests deliberately** — create, then read the created id, then update, then delete — and make the cleanup run even when an assertion fails, or your test data leaks into staging.
- **Negative cases are the valuable half.** A collection that only tests the happy path is documentation.

## Example

```javascript
pm.test('returns the user schema', () => {
  pm.response.to.have.status(200);
  pm.response.to.be.json;
  pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
  // schema validation against the OpenAPI-derived schema
  validateResponse(pm.response.json(), 'User');
});

pm.test('rejects an unknown field', () => {
  // negative case, in the same collection
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for postman-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
