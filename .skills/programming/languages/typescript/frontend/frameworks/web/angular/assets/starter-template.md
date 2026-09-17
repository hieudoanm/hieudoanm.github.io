# Angular Best Practices: Starter Template

A reusable starting point derived from the **7. Forms** section of [Angular Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```typescript
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email.includes('@')) {
      return { invalidEmail: true };
    }
    return null;
  };
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
