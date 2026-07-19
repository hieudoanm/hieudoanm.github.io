# Workflow notes

Focused reference for **bruno-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Requests and Variables

- **Declare variables in an environment file, interpolate with `{{var}}`,** and keep the scoping narrow: environment over collection over request.
- **Do not commit secrets.** The populated environment is local and ignored; the committed file is a template with placeholders.
- **Use pre-request scripts sparingly** — a token refresh in one place is a pattern; a pre-request script on every file is a maintenance problem.
- **A request file should be readable top to bottom:** method, URL, headers, body, tests. If the test block is a hundred lines, the logic belongs in a script or a shared module.
- **Reuse common headers via the environment or a collection-level file** rather than repeating an auth header in thirty files.

---

## 3. Tests

- **Assertions live in the request file's test script,** so each request is self-checking and the suite is the collection.
- **Assert on status, content type, and schema, not just a 200.** A 200 with an error body is the classic false pass, and it is the single most valuable assertion to add first.
- **Use schema validation** so a shape change fails loudly instead of silently passing a `status === 200` check.
- **Chain dependent requests deliberately** — create, read the id, update, delete — and clean up so a failed assertion does not leak data.
- **Include negative cases.** A suite of happy paths is documentation.
- **Use `bru run` (the CLI) in CI,** keeping the command in the repo, so the collection is a test rather than a manual tool.

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
