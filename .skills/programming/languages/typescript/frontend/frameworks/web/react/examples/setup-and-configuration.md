# React Best Practices: 2. Component Design

## Source guidance

This example applies the **2. Component Design** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Functional components** — use functional components with hooks, not class components:
- **Single responsibility** — each component should do one thing well
- **Props interface** — define clear prop types with TypeScript:
- **Composition over inheritance** — compose components together:

## Example

```tsx
function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for react-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
