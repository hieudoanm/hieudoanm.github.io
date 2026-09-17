# Overview

Focused reference for **makefile-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Makefile Best Practices

Make is a build automation tool that uses a syntax of tab-indented recipes. Well-written Makefiles are declarative, idempotent, and easy to extend.

---

## 1. Structure & Conventions

- **`.PHONY` for non-file targets** — mark targets that don't produce files (e.g., `clean`, `test`, `install`) as `.PHONY` so Make doesn't skip them if a file with that name exists.
- **Default target first** — the first target in the file is the default when running `make` bare; document it with a `help` target.
- **Use `.` for the current directory** — avoid absolute paths; use relative paths from the Makefile's location.
- **Tab-indented recipes** — Make requires real tab characters for recipe lines, not spaces.
- **Break long prerequisite lists with `\`** — a trailing backslash continues a target definition onto the next line (with a tab before the continuation), keeping wide rules readable:

```makefile
build: $(BIN_DIR)/app $(BIN_DIR)/worker \
	$(GO) build -o $(BIN_DIR)/ ./cmd/...
```

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
