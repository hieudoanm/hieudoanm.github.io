# Laravel Backend Best Practices: Starter Template

A reusable starting point derived from the **2. MVC & Layering** section of [Laravel Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
