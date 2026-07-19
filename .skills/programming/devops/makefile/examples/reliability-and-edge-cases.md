# Makefile Best Practices: 3. Variables & Reusability

## Source guidance

This example applies the **3. Variables & Reusability** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Define variables at the top** — `CC := gcc`, `CFLAGS := -Wall -Wextra`, `BUILD_DIR := build`.
- **Use `:=` for simple expansion** — evaluates once at parse time; `=` is recursive expansion.
- **`?=` for user-overridable defaults** — `PREFIX ?= /usr/local` lets users override via `make PREFIX=/opt install`.
- **Override with environment** — `$(override ...)` to force a variable after environment import.

## Example

```makefile
CC := gcc
CFLAGS := -Wall -Wextra
BUILD_DIR := build

# Allow overriding from environment
override CFLAGS += -g
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for makefile-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
