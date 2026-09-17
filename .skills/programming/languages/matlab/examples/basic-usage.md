# MATLAB Best Practices: Basic Usage

Best practices for writing MATLAB — the language conventions for numerical computing, data analysis, and prototyping. Use when writing, structuring, or reviewing MATLAB — covers vectorization, arrays, functions, types, error handling, plotting, performance, and tooling.

## Scenario

Use this example as a starting point when applying **matlab-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Preallocation & Memory** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```matlab
out = zeros(n, 1);
for k = 1:n
   out(k) = compute(k);
end
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
