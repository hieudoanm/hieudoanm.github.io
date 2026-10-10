# PHP Best Practices: Basic Usage

Best practices for writing PHP — the language conventions for modern PHP 8 web applications and CLIs. Use when writing, structuring, or reviewing PHP — covers strict types, null safety, error handling, OOP design, PSR conventions, security, and tooling.

## Scenario

Use this example as a starting point when applying **php-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Strict Types & Type Safety** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
