# Postman: Starter Template

A reusable starting point derived from the **3. Making the Collection a Test** section of [Postman](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
