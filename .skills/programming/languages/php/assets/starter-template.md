# PHP Best Practices: Starter Template

A reusable starting point derived from the **1. Strict Types & Type Safety** section of [PHP Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```php
final class User
{
    public function __construct(
        private readonly int $id,
        private string $name,
        private ?string $email = null,
    ) {}
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
