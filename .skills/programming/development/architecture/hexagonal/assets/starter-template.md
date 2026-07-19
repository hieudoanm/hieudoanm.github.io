# Hexagonal Architecture Best Practices: Starter Template

A reusable starting point derived from the **5. Adapter Implementations** section of [Hexagonal Architecture Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```typescript
// Email service adapter
class EmailServiceAdapter implements EmailServicePort {
  constructor(private emailProvider: EmailProvider) {}

  async sendWelcomeEmail(email: string): Promise<void> {
    await this.emailProvider.send({
      to: email,
      subject: 'Welcome',
      body: 'Welcome to our platform!'
    })
  }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
