# Testing Library Best Practices: Basic Usage

Best practices for React/DOM testing with Testing Library — the user-centric testing conventions. Use when writing, structuring, or reviewing Testing Library suites — covers queries, roles, userEvent/fireEvent, async, and anti-patterns.

## Scenario

Use this example as a starting point when applying **testing-library-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Queries & the User's Eye** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```tsx
render(<Signup />);
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText("Email");
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
