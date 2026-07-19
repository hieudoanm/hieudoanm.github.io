# Hexagonal Architecture Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Domain testing** — test domain logic without adapters:
- **Port testing** — test ports with mock adapters:
- **Adapter testing** — test adapters with real dependencies:

## Example

```typescript
describe('User', () => {
  it('should create user with valid data', () => {
    const user = User.create('test@example.com', 'Test User')

    expect(user.getEmail()).toBe('test@example.com')
    expect(user.getName()).toBe('Test User')
  })

  it('should update user name', () => {
    const user = User.create('test@example.com', 'Test User')
    user.updateName('Updated Name')

    expect(user.getName()).toBe('Updated Name')
  })
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for hexagonal-architecture.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
