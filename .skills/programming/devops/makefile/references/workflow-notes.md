# Workflow notes

Focused reference for **makefile-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Target Naming

- **Verbs for actions, nouns for assets** — `make build`, `make test`, `make clean`.
- **Generic target names** — `all`, `clean`, `test`, `install`, `uninstall` are idiomatic and expected.
- **Avoid hyphens in target names** when possible; use underscores if needed (`make fmt_check`).

---

## 3. Variables & Reusability

- **Define variables at the top** — `CC := gcc`, `CFLAGS := -Wall -Wextra`, `BUILD_DIR := build`.
- **Use `:=` for simple expansion** — evaluates once at parse time; `=` is recursive expansion.
- **`?=` for user-overridable defaults** — `PREFIX ?= /usr/local` lets users override via `make PREFIX=/opt install`.
- **Override with environment** — `$(override ...)` to force a variable after environment import.

```makefile
CC := gcc
CFLAGS := -Wall -Wextra
BUILD_DIR := build

# Allow overriding from environment
override CFLAGS += -g
```
