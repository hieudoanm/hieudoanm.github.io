# CQRS Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Command testing** — test command handlers:
- **Query testing** — test query handlers:
- **Event testing** — test event handlers:

## Example

```typescript
describe('CreateUserHandler', () => {
  it('should create user and save events', async () => {
    const handler = new CreateUserHandler(eventStore, userRepository)
    const command = new CreateUserCommand({
      email: 'test@example.com',
      name: 'Test User'
    })

    await handler.handle(command)

    const events = await eventStore.getEvents(command.id)
    expect(events).toHaveLength(1)
    expect(events[0].type).toBe('UserCreated')
  })
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for cqrs-pattern.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
