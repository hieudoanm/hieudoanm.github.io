# Workflow notes

Focused reference for **postman-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Variables and Scoping

- **Scopes, from widest to narrowest: global, collection, folder, request.** The same name at two scopes is a debugging nightmare; use the narrowest scope that works.
- **Initial values belong in the environment template; secrets never belong in a committed file.** A token pasted into a committed environment JSON is an incident.
- **Use `{{variable}}` interpolation sparingly and visibly** — a request with eight interpolations is unreadable and impossible to review.
- **A `pre-request` script that sets a token is a pattern worth having in exactly one place.** Duplicate it per request and you will have eight copies that drift.
- **Test scripts are where assertions live,** so a request is self-checking; scripts in a separate place are documentation that drifts from the requests.

```json
{
  "name": "Staging",
  "values": [
    { "key": "baseUrl", "value": "https://staging.example.com", "enabled": true },
    { "key": "userId", "value": "", "enabled": true }
  ]
}
```

---

## 3. Making the Collection a Test

- **Assert on status, content type, and schema, not just a 200.** A 200 returning an error body is the most common false pass in API testing.
- **Use a JSON Schema in the response test** so a shape change fails loudly. This is where a collection becomes a contract test rather than a smoke test.
- **Chain dependent requests deliberately** — create, then read the created id, then update, then delete — and make the cleanup run even when an assertion fails, or your test data leaks into staging.
- **Negative cases are the valuable half.** A collection that only tests the happy path is documentation.
- **`newman` in CI runs the collection headlessly** and is the thing that makes a collection a test rather than a manual tool. Wire it to the API's own CI, not to a laptop.

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
