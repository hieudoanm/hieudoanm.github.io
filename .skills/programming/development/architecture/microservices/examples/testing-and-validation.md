# Microservices Architecture Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Contract testing** — test service contracts:
- **Integration testing** — test service integration
- **End-to-end testing** — test complete user flows

## Example

```typescript
// Contract test
describe('User Service Contract', () => {
  it('should match API contract', async () => {
    const response = await request(app)
      .get('/api/users/123')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSchema(userSchema)
  })
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for microservices-architecture.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
