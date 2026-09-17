# JWT Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Token generation testing** — test token generation:
- **Token validation testing** — test token validation:

## Example

```typescript
describe('generateAccessToken', () => {
  it('should generate valid token', () => {
    const token = generateAccessToken('123', 'test@example.com')
    const decoded = jwt.decode(token) as JwtPayload

    expect(decoded.sub).toBe('123')
    expect(decoded.email).toBe('test@example.com')
    expect(decoded.exp).toBeDefined()
  })
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for jwt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
