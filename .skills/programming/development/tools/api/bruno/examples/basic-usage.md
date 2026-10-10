# Bruno: Basic Usage

Best practices for Bruno — collections as plain files in the repository, environment variables, script-based assertions, and Git-native API testing without a cloud account. Use when designing, organising, or automating API requests and tests.

## Scenario

Use this example as a starting point when applying **bruno-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Tests** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
