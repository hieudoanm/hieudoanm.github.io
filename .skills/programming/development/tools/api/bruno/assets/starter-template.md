# Bruno: Starter Template

A reusable starting point derived from the **3. Tests** section of [Bruno](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```javascript
// create-user.bru — test block
test('creates the user', () => {
  expect(res.getStatus()).to.equal(201);
  expect(res.getHeader('content-type')).to.include('application/json');
  const body = res.getBody();
  expect(body).to.have.property('id');
  // schema validation against the API contract
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
