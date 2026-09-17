# C Best Practices: Starter Template

A reusable starting point derived from the **7. Structs & Data Design** section of [C Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```c
typedef struct {
    uint8_t  *data;
    size_t    len;     /* bytes in use */
    size_t    cap;     /* capacity */
} bytes_t;

void bytes_init(bytes_t *b);
int  bytes_reserve(bytes_t *b, size_t want);
int  bytes_append(bytes_t *b, const void *p, size_t n);
void bytes_free(bytes_t *b);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
