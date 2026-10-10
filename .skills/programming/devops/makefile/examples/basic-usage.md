# Makefile Best Practices: Basic Usage

Best practices for writing maintainable, idiomatic Makefiles. Use when creating or reviewing Makefiles for build, test, and deployment automation.

## Scenario

Use this example as a starting point when applying **makefile-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Structure & Conventions** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
