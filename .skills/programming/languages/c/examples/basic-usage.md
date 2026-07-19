# C Best Practices: Basic Usage

Best practices for writing C — the language conventions for C11/C17 systems and embedded code. Use when writing, structuring, or reviewing C — covers memory ownership, pointer discipline, error handling, strings, modularity, concurrency, and tooling.

## Scenario

Use this example as a starting point when applying **c-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **4. Error Handling** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```c
typedef enum {
    USER_OK = 0,
    USER_EINVAL = -1,
    USER_ENOMEM = -2,
} user_rc;

user_rc user_init(user_t *u, const char *name);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
