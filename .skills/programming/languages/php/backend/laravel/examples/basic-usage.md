# Laravel Backend Best Practices: Basic Usage

Best practices for building web applications and APIs with Laravel (PHP). Use when creating, structuring, or reviewing a Laravel app — covers layering, Eloquent discipline, validation, queues, service container, and testing.

## Scenario

Use this example as a starting point when applying **laravel-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. MVC & Layering** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```php
class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'max:200'],
            'email' => ['required', 'email'],
        ];
    }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
