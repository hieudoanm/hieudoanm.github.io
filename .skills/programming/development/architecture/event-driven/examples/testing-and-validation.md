# Event-Driven Architecture Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Event testing** — test event handlers:
- **Integration testing** — test event flow:

## Example

```typescript
describe('UserCreatedHandler', () => {
  it('should send welcome email', async () => {
    const handler = new UserCreatedHandler(emailService, profileService)
    const event = createMockEvent('UserCreated', {
      userId: '123',
      email: 'test@example.com'
    })

    await handler.handle(event)

    expect(emailService.sendWelcomeEmail).toHaveBeenCalledWith('test@example.com')
  })
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for event-driven-architecture.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
