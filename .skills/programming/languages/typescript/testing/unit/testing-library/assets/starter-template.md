# Testing Library Best Practices: Starter Template

A reusable starting point derived from the **1. Queries & the User's Eye** section of [Testing Library Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```tsx
render(<Signup />);
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText("Email");
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
