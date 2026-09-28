---
name: makefile-best-practices
description: Best practices for writing maintainable, idiomatic Makefiles. Use when creating or reviewing Makefiles for build, test, and deployment automation.
---

# Makefile Best Practices

Make is a build automation tool that uses a syntax of tab-indented recipes. Well-written Makefiles are declarative, idempotent, and easy to extend.

---

## 1. Structure & Conventions

- **`.PHONY` for non-file targets** — mark targets that don't produce files (e.g., `clean`, `test`, `install`) as `.PHONY` so Make doesn't skip them if a file with that name exists.
- **Default target first** — the first target in the file is the default when running `make` bare; document it with a `help` target.
- **Use `.` for the current directory** — avoid absolute paths; use relative paths from the Makefile's location.
- **Tab-indented recipes** — Make requires real tab characters for recipe lines, not spaces.

```makefile
.PHONY: all clean test lint fmt

all: ## Default target: build the project
	@echo "Building project..."

clean: ## Remove build artifacts
	rm -rf build/

test: ## Run the test suite
	pnpm test

lint: ## Run the linter
	pnpm lint

fmt: ## Format the code
	pnpm format
```

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

---

## 4. Phony & Helper Targets

- **`help` target** — list all targets with `##` comments for documentation:

```makefile
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
```

- **`.DELETE_ON_ERROR`** — automatically remove partially-built targets on error.
- **`.SECONDARY`** — keep intermediate files that are not explicitly requested.

---

## 5. Common Patterns

- **Conditional logic** — use `ifeq/ifneq/else/endif` for platform- or config-specific behavior.
- **Recursive make** — use `$(MAKE)` rather than bare `make` to propagate flags and variables.
- **Parallel safety** — ensure targets don't conflict when run with `-jN`; use file locks if needed.

```makefile
ifeq ($(OS),Windows_NT)
    SHELL := cmd.exe
    RM := del /f
else
    RM := rm -rf
endif
```

---

## 6. Quick-Start Checklist

- [ ] `.PHONY` declared for non-file targets
- [ ] `help` target with `##` comments
- [ ] Variables defined at top with `:=` or `?=`
- [ ] Tab-indented recipe lines
- [ ] No reliance on implicit rules