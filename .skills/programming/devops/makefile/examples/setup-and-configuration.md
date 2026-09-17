# Makefile Best Practices: 1. Structure & Conventions

## Source guidance

This example applies the **1. Structure & Conventions** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`.PHONY` for non-file targets** — mark targets that don't produce files (e.g., `clean`, `test`, `install`) as `.PHONY` so Make doesn't skip them if a file with that name exists.
- **Default target first** — the first target in the file is the default when running `make` bare; document it with a `help` target.
- **Use `.` for the current directory** — avoid absolute paths; use relative paths from the Makefile's location.
- **Tab-indented recipes** — Make requires real tab characters for recipe lines, not spaces.

## Example

```makefile
build: $(BIN_DIR)/app $(BIN_DIR)/worker \
	$(GO) build -o $(BIN_DIR)/ ./cmd/...
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for makefile-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
